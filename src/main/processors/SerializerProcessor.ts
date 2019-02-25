// import * as N3 from 'n3';
// import {N3Writer} from 'n3';
// import * as RDF from 'rdf-js';
import {
    DataFactory,
    Literal,
    N3Writer,
    NamedNode,
    Prefixes,
    Quad, Quad_Object,
    Quad_Predicate,
    Quad_Subject,
    Term,
    Writer
} from 'n3';
import 'reflect-metadata';
import {IRdfPrefixes} from '../annotations/interfaces/IRdfPrefixes';
import {IRdfPropertyMetadata} from '../annotations/interfaces/IRdfPropertyMetadata';
import {IRDFSerializer} from '../annotations/interfaces/IRDFSerializer';
import {IRdfSubjectMetadata} from '../annotations/interfaces/IRdfSubjectMetadata';
import {IllegalArgumentError} from '../exceptions/IllegalArgumentError';
import {ISODateSerializer} from '../RDFSerializers/ISODateSerializer';
import {Utils} from '../Utils';

export class SerializerProcessor {

    // N3 writer
    private n3Writer: N3Writer;
    private quadsArr: Quad[] = [];
    private prefixes: Prefixes = {};
    private serializers: any = {};

    private readonly xsdType: NamedNode = DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');

    constructor() {
        this.prefixes = {xsd: DataFactory.namedNode('http://www.w3.org/2001/XMLSchema#')};
    }

    /**
     * Serialize object or array of objects to turtle
     * @param target - Object or Array of Objects to be serialized to turtle
     * @returns - Turtle representation of the object(s)
     */
    public serialize<T>(target: T | T[]): string {
        this.process(target);
        this.sortQuads(this.quadsArr);
        this.n3Writer = new Writer({prefixes: this.prefixes});
        this.n3Writer.addQuads(this.quadsArr);
        return this.getTTLString();
    }

    private process<T>(target: T | T[], previousSubject?: Quad_Subject, pointBackPredicate?: string): Quad_Subject {
        if (Array.isArray(target)) {
            target.forEach((tar: T) => {
                this.process(tar);
            });
        } else {
            const ns: IRdfPrefixes = Reflect.getMetadata('RdfPrefixes', target);
            const beanType: string = Reflect.getMetadata('RdfBean', target);
            const rdfSubjectDecorator: IRdfSubjectMetadata = Reflect.getMetadata('RdfSubject', target);

            // ?subject ?predicate ?object
            const subject: Term = this.makeSubject(rdfSubjectDecorator);

            if (ns) {
                const prefixxes: Prefixes = this.getN3NsPrefixObject(ns);
                this.prefixes = {...this.prefixes, ...prefixxes};
            }
            // If @RdfBean is present, we create at triple in form of ?subject a ?object
            if (beanType) {
                const resourceIdentifierQuad: Quad = this.createQuad(subject, this.xsdType, DataFactory.namedNode(beanType));
                this.quadsArr.push(resourceIdentifierQuad);
            }

            if (previousSubject && pointBackPredicate) {
                const pointBackQuad: Quad = this.createQuad(subject, this.makePredicate(pointBackPredicate), previousSubject);
                this.quadsArr.push(pointBackQuad);
            }

            const properties: IRdfPropertyMetadata[] = Reflect.getMetadata('RdfProperty', target);
            if (!ns && !beanType && !properties) {
                throw new Error('No decorators found');
            }
            if (properties) {
                properties.forEach((p: IRdfPropertyMetadata) => {
                    // If clazz property is present then it is an Object
                    const propertyClassType = p.decoratorMetadata.clazz;

                    const inversedPredicate = p.decoratorMetadata.inverseOfPredicate;

                    const serializer: IRDFSerializer = p.decoratorMetadata.serializer;
                    // ?subject ?predicate ?object
                    const rdfPredicateString: string = p.decoratorMetadata.predicate;
                    const predicate: NamedNode = this.makePredicate(rdfPredicateString);

                    const xsdDataTypeString: string = p.decoratorMetadata.xsdType;
                    let xsdDataType: NamedNode;
                    if (xsdDataTypeString) {
                        xsdDataType = DataFactory.namedNode(xsdDataTypeString);
                    }
                    const lang: string = p.decoratorMetadata.lang;
                    const isIRI: boolean = p.decoratorMetadata.isIRI;
                    if (lang && xsdDataTypeString) {
                        throw new IllegalArgumentError(`Key ${p.key} cannot have both lang and xsdType present inside the decorator`);
                    }
                    if ( lang && xsdDataTypeString && isIRI || lang && isIRI || xsdDataTypeString && isIRI) {
                        throw new IllegalArgumentError(`Key ${p.key} cannot have both lang or xsdType present when isIRI is set to true inside the decorator`);
                    }

                    // If value is set for the current key, process it
                    if (p.val !== undefined) {
                        // If this is an Object, clazz annotated
                        if (propertyClassType) {
                            this.processClazzAnnotatedPropertyValue(p.val, subject, predicate, xsdDataType, inversedPredicate, serializer);
                        }
                        // If not clazz annotated, then it's a literal
                        else {
                            this.processPrimitiveValue(p.val, subject, predicate, xsdDataType, lang, isIRI, serializer);
                        }
                    }
                });
            }
            return subject;
        }
    }

    private processClazzAnnotatedPropertyValue(value: any | any[],
                                               subject: Quad_Subject,
                                               predicate: Quad_Predicate,
                                               xsdDataType: NamedNode,
                                               inversedPredicate: string,
                                               serializer: any): void {
        if (Array.isArray(value)) {
            this.processArrayOfObjectValues(value, subject, predicate, inversedPredicate);
        } else {
            this.processClazzAnnotatedObjectValue(value, subject, predicate, xsdDataType, inversedPredicate, serializer);
        }
    }

    private processPrimitiveValue(value: any, subject: Quad_Subject, predicate: Quad_Predicate, xsdDataType: NamedNode, lang: string, isIRI: boolean, serializer?: any): void {
        if (serializer) {
            this.processPrimiteValueWithAnnotatedSerializer(value, subject, predicate, xsdDataType, lang, serializer);
        } else {
            if (value instanceof Date) {
                this.processValueOfDateTypeWithDefaultSerializer(value, subject, predicate, xsdDataType);
            }
            else if (Array.isArray(value)) {
                this.processArrayOfPrimitiveValues(value, subject, predicate, xsdDataType, lang, isIRI);
            }
            else if (isIRI) {
                const objectResource: NamedNode = DataFactory.namedNode(value);
                const q = this.createQuad(subject, predicate, objectResource);
                this.quadsArr.push(q);
            }
            else {
                let objectLiteral: Literal;
                if (lang) {
                    objectLiteral = this.makeLiteral(value, lang);
                }
                if (xsdDataType) {
                    objectLiteral = this.makeLiteral(value, xsdDataType);
                }
                const q = this.createQuad(subject, predicate, objectLiteral);
                this.quadsArr.push(q);
            }
        }
    }

    private processClazzAnnotatedObjectValue(value: any,
                                             subject: Quad_Subject,
                                             predicate: Quad_Predicate,
                                             xsdDataType: NamedNode,
                                             inversedPredicate: string,
                                             serializer: any): void {
        if (serializer)
        {
            const s: IRDFSerializer = this.getOrCreateSerializer(serializer);
            const objectLiteral: Literal = this.makeLiteral(s.serialize(value), xsdDataType);
            const q = this.createQuad(subject, predicate, objectLiteral);
            this.quadsArr.push(q);
        }
        else
        {
            if (value instanceof Date) {
                this.processValueOfDateTypeWithDefaultSerializer(value, subject, predicate, xsdDataType);
            } else {
                if (inversedPredicate) {
                    const resultObject: Term = this.process(value, subject, inversedPredicate); // returns NamedNode
                    const q = this.createQuad(subject, predicate, resultObject);
                    this.quadsArr.push(q);
                } else {
                    const resultObject: Term = this.process(value); // returns NamedNode
                    const q = this.createQuad(subject, predicate, resultObject);
                    this.quadsArr.push(q);
                }
            }
        }
    }

    private processPrimiteValueWithAnnotatedSerializer(value: any, subject: Quad_Subject, predicate: Quad_Predicate, xsdDataType: NamedNode, lang: string, serializer: any) {
        const s: any = this.getOrCreateSerializer(serializer);
        if (s.isBnodeSerializer) {
            this.prefixes = {...this.prefixes, ...s.prefixes};
            const q = this.createQuad(subject, predicate, s.subject);
            this.quadsArr.push(...s.serialize(value));
            this.quadsArr.push(q);
        } else {
            let objectLiteral: Literal;
            if (lang) {
                objectLiteral = this.makeLiteral(s.serialize(value), lang);
            }
            if (xsdDataType) {
                objectLiteral = this.makeLiteral(s.serialize(value), xsdDataType);
            }
            const q = this.createQuad(subject, predicate, objectLiteral);
            this.quadsArr.push(q);
        }
    }

    private processValueOfDateTypeWithDefaultSerializer(value: Date, subject: Quad_Subject, predicate: Quad_Predicate, xsdDataType: NamedNode) {
        const s: IRDFSerializer = new ISODateSerializer();
        const objectLiteral: Literal = this.makeLiteral(s.serialize(value), xsdDataType);
        const qq = this.createQuad(subject, predicate, objectLiteral);
        this.quadsArr.push(qq);
    }

    private processArrayOfObjectValues(values: any[], subject: Quad_Subject, predicate: Quad_Predicate, inversedPredicate: string): void {
        values.forEach((prop: any) => {
            if (inversedPredicate) {
                const resultObject: Term = this.process(prop, subject, inversedPredicate);
                const q = this.createQuad(subject, predicate, resultObject);
                this.quadsArr.push(q);
            } else {
                const resultObject: Quad_Subject = this.process(prop);
                const q = this.createQuad(subject, predicate, resultObject);
                this.quadsArr.push(q);
            }
        });
    }

    private processArrayOfPrimitiveValues(values: any[], subject: Quad_Subject, predicate: Quad_Predicate, xsdDataType: NamedNode, lang: string, isIRI: boolean, serializer?: any): void {
        values.forEach((val: any) => {
            let objectLiteral: Literal;
            if (isIRI) {
                const objectResource: NamedNode = DataFactory.namedNode(val);
                const q = this.createQuad(subject, predicate, objectResource);
                this.quadsArr.push(q);
            } else {
                if (xsdDataType) {
                    objectLiteral = this.makeLiteral(val, xsdDataType);
                }
                if (lang) {
                    objectLiteral = this.makeLiteral(val, lang);
                }
                const q = this.createQuad(subject, predicate, objectLiteral);
                this.quadsArr.push(q);
            }
        });
    }

    private makeLiteral(value: string | number, languageOrDatatype?: string | NamedNode): Literal {
        return DataFactory.literal(value, languageOrDatatype);
    }

    private makeSubject(rdfSubjectDecorator?: IRdfSubjectMetadata): Quad_Subject {
        let subject: Quad_Subject;
        if (rdfSubjectDecorator) {
            if (
                /^(http|https):\/\/?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
                .test(rdfSubjectDecorator.prop) || rdfSubjectDecorator.prop === 'http://')
            {
                subject = DataFactory.namedNode(`${rdfSubjectDecorator.prop}${rdfSubjectDecorator.val}`);
            }
            else {
                subject = DataFactory.namedNode(`${rdfSubjectDecorator.prop}:${rdfSubjectDecorator.val}`);
            }
        } else {
            subject = DataFactory.blankNode();
        }
        return subject;
    }

    private makePredicate(rdfPredicateString?: string): NamedNode {
        let predicate: NamedNode;
        if (rdfPredicateString) {
            predicate = DataFactory.namedNode(rdfPredicateString);
            return predicate;
        } else {
            throw new Error('predicate is a mandatory property');
        }
    }

    private createQuad(subject: Quad_Subject, predicate: Quad_Predicate, object: Quad_Object): Quad {
        return DataFactory.quad(
            subject,
            predicate,
            object
        );
    }

    private getTTLString(): string {
        let result;
        this.n3Writer.end((error, r) => {
            result = r;
        });

        return result;
    }

    private getN3NsPrefixObject(ns: IRdfPrefixes): Prefixes {
        const r: Prefixes = {};

        const keys: string[] = Object.keys(ns);
        keys.forEach(key => {
            r[key] = DataFactory.namedNode(ns[key]);
        });

        r['tsRdfMapper'] = DataFactory.namedNode('http://ts-rdf-mapper.com#');
        return r;
    }

    private sortQuads(arr: Quad[]) {
        arr.sort((a, b) => {
            if (a.subject.value < b.subject.value) {
                return 1;
            }
            if (a.subject.value > b.subject.value) {
                return -1;
            }
            return 0;
        });
    }

    /**
     * Checks to see if the serializer already exists or not.
     * If not, creates a new one and caches it, returns the
     * cached instance otherwise.
     */
    private getOrCreateSerializer(type: any): any {
        return Utils.getCachedType(type, this.serializers);
    }
}
