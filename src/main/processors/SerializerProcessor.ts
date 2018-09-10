import * as N3 from 'n3';
import {N3Writer} from 'n3';
import * as RDF from 'rdf-js';
import 'reflect-metadata';
import {IRdfNamespaces} from '../annotations/interfaces/IRdfNamespaces';
import {IRdfPropertyMetadata} from '../annotations/interfaces/IRdfPropertyMetadata';
import {IRDFSerializer} from '../annotations/interfaces/IRDFSerializer';
import {IRdfSubjectMetadata} from '../annotations/interfaces/IRdfSubjectMetadata';
import {Utils} from '../Utils';

/**
 * @ignore
 */
export class SerializerProcessor {

    // N3 writer
    private n3Writer: N3Writer;
    private quadsArr: RDF.Quad[] = [];
    private prefixes: N3.Prefixes = {};
    private serializers: any = {};

    private readonly xsdType: RDF.NamedNode = N3.DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');

    constructor() {
    }

    /**
     * Serialize object or array of objects to turtle
     * @param target - Object or Array of Objects to be serialized to turtle
     * @returns - Turtle representation of the object(s)
     */
    public serialize<T>(target: T | T[]): string {
        this.process(target);
        this.sortQuads(this.quadsArr);
        this.n3Writer = N3.Writer({prefixes: this.prefixes});
        this.n3Writer.addQuads(this.quadsArr);
        return this.getTTLString();
    }

    private process<T>(target: T | T[]): RDF.Term {
        if (Array.isArray(target)) {
            target.forEach((tar: T) => {
                this.process(tar);
            });
        } else {
            const ns: IRdfNamespaces = Reflect.getMetadata('RdfNamespaces', target);
            const beanType: string = Reflect.getMetadata('RdfBean', target);
            const rdfSubjectDecorator: IRdfSubjectMetadata = Reflect.getMetadata('RdfSubject', target);

            // ?subject ?predicate ?object
            let subject: RDF.Term;
            if (rdfSubjectDecorator) {
                subject = N3.DataFactory.namedNode(`${rdfSubjectDecorator.prop}:${rdfSubjectDecorator.val}`);
            } else {
                subject = N3.DataFactory.blankNode();
            }

            const prefixxes: N3.Prefixes = this.getN3NsPrefixObject(ns);
            this.prefixes = {...this.prefixes, ...prefixxes};
            // this.n3Writer.addPrefixes(prefixxes); waiting for DefinitelyTyped merge
            if (beanType) {
                const resourceIdentifierQuad: RDF.Quad = this.createQuad(subject, this.xsdType, N3.DataFactory.namedNode(beanType));
                this.quadsArr.push(resourceIdentifierQuad);
            }

            const properties: IRdfPropertyMetadata[] = Reflect.getMetadata('RdfProperty', target);
            if (properties) {
                properties.forEach((p: IRdfPropertyMetadata) => {
                    // If clazz property is present then it is an Object
                    const propertyClassType = p.decoratorMetadata.clazz;
                    const serializer: IRDFSerializer = p.decoratorMetadata.serializer;
                    // ?subject ?predicate ?object
                    const rdfPredicateString: string = p.decoratorMetadata.predicate;
                    let predicate: RDF.NamedNode;
                    if (rdfPredicateString) {
                        predicate = N3.DataFactory.namedNode(rdfPredicateString);
                    }
                    const xsdDataTypeString: string = p.decoratorMetadata.xsdType;
                    let xsdDataType: RDF.NamedNode;
                    if (xsdDataTypeString) {
                        xsdDataType = N3.DataFactory.namedNode(xsdDataTypeString);
                    }
                    const lang: string = p.decoratorMetadata.lang;
                    if (lang && xsdDataTypeString) {
                        throw new Error(`Key ${p.key} cannot have both lang and xsdType present inside the decorator`);
                    }

                    // If value is set for the current key, process it
                    if (p.val) {
                        // If this is an Object, clazz annotated
                        if (propertyClassType) {
                            this.processClazzAnnotatedPropertyValue(p.val, subject, predicate, xsdDataType, serializer);
                        }
                        // If not clazz annotated, then it's a literal
                        else {
                            this.processPrimitiveValue(p.val, subject, predicate, xsdDataType, lang, serializer);
                        }
                    }
                });
            }
            return subject;
        }
    }

    private processClazzAnnotatedPropertyValue(value: any | any[],
                                               subject: RDF.Term,
                                               predicate: RDF.Term,
                                               xsdDataType: RDF.NamedNode,
                                               serializer?: any): void {
        if (Array.isArray(value)) {
            this.processArrayOfObjectValues(value, subject, predicate);
        } else {
            this.processObjectValue(value, subject, predicate, xsdDataType, serializer);
        }
    }

    private processArrayOfPrimitiveValues(value: any[], subject: RDF.Term, predicate: RDF.Term, xsdDataType: RDF.NamedNode, serializer?: any): void {}

    private processPrimitiveValue(value: any, subject: RDF.Term, predicate: RDF.Term, xsdDataType: RDF.NamedNode, lang: string, serializer?: any): void {
        if (serializer)
        {
            const s: any = this.getOrCreateSerializer(serializer);
            if (s.isBnodeSerializer) {
                this.prefixes = {...this.prefixes, ...s.prefixes};
                const q = this.createQuad(subject, predicate, s.subject);
                this.quadsArr.push(...s.serialize(value));
                this.quadsArr.push(q);
            } else {
                let objectLiteral: RDF.Literal;
                if (lang) {
                    objectLiteral = this.makeLiteral(s.serialize(value), lang);
                }
                if (xsdDataType) {
                    objectLiteral = this.makeLiteral(s.serialize(value), xsdDataType);
                }
                const q = this.createQuad(subject, predicate, objectLiteral);
                this.quadsArr.push(q);

            }

        } else {
            let objectLiteral: RDF.Literal;
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

    private processObjectValue(value: any, subject: RDF.Term, predicate: RDF.Term, xsdDataType: RDF.NamedNode, serializer?: any): void {
        if (serializer)
        {
            const s: IRDFSerializer = this.getOrCreateSerializer(serializer);
            const objectLiteral: RDF.Literal = this.makeLiteral(s.serialize(value), xsdDataType);
            const q = this.createQuad(subject, predicate, objectLiteral);
            this.quadsArr.push(q);
        }
        else
        {
            const resultObject: RDF.Term = this.process(value); // returns NamedNode
            const q = this.createQuad(subject, predicate, resultObject);
            this.quadsArr.push(q);
        }
    }

    private processArrayOfObjectValues(values: any[], subject: RDF.Term, predicate: RDF.Term): void {
        values.forEach((prop: any) => {
            const resultObject: RDF.Term = this.process(prop);
            const q = this.createQuad(subject, predicate, resultObject);
            this.quadsArr.push(q);
        });
    }

    private makeLiteral(value: string | number, languageOrDatatype?: string | RDF.NamedNode): RDF.Literal {
        return N3.DataFactory.literal(value, languageOrDatatype);
    }

    private createQuad(subject: RDF.Term, predicate: RDF.Term, object: RDF.Term): RDF.Quad {
        return N3.DataFactory.quad(
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

    private getN3NsPrefixObject(ns: IRdfNamespaces): N3.Prefixes {
        const r: N3.Prefixes = {};

        const keys: string[] = Object.keys(ns);
        keys.forEach(key => {
            r[key] = N3.DataFactory.namedNode(ns[key]);
        });

        r['xsd'] = N3.DataFactory.namedNode('http://www.w3.org/2001/XMLSchema#');
        return r;
    }

    private sortQuads(arr: RDF.Quad[]) {
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
