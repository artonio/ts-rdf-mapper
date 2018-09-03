import * as N3 from 'n3';
import {N3Writer} from 'n3';
import * as RDF from 'rdf-js';
import 'reflect-metadata';
import {IRdfNamespaces} from '../annotations/interfaces/IRdfNamespaces';
import {IRdfPropertyMetadata} from '../annotations/interfaces/IRdfPropertyMetadata';
import {IRdfSubjectMetadata} from '../annotations/interfaces/IRdfSubjectMetadata';
import {ISerializer} from '../annotations/interfaces/ISerializer';
import {Utils} from '../Utils';

export class SerializerProcessor {

    // N3 writer
    n3Writer: N3Writer;
    quadsArr: RDF.Quad[] = [];
    prefixes: N3.Prefixes = {};
    serializers: any = {};

    private readonly xsdType: RDF.NamedNode = N3.DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');

    constructor() {
    }

    public serialize<T>(target: T | T[]): string {
        this.process(target);
        this.sortQuads(this.quadsArr);
        this.n3Writer = N3.Writer({prefixes: this.prefixes});
        this.n3Writer.addQuads(this.quadsArr);
        return this.getTTLString();
    }

    private process<T>(target: T | T[]): RDF.NamedNode {
        if (Array.isArray(target)) {
            target.forEach((tar: T) => {
                this.process(tar);
            });
        } else {
            const ns: IRdfNamespaces = Reflect.getMetadata('RdfNamespaces', target);
            const beanType: string = Reflect.getMetadata('RdfBean', target);
            const rdfSubjectDecorator: IRdfSubjectMetadata = Reflect.getMetadata('RdfSubject', target);

            // ?subject ?predicate ?object
            const subject: RDF.NamedNode = N3.DataFactory.namedNode(`${rdfSubjectDecorator.prop}:${rdfSubjectDecorator.val}`);

            const prefixxes: N3.Prefixes = this.getN3NsPrefixObject(ns);
            this.prefixes = {...prefixxes};
            // this.n3Writer.addPrefixes(prefixxes); waiting for DefinitelyTyped merge

            const resourceIdentifierQuad: RDF.Quad = this.createQuad(subject, this.xsdType, N3.DataFactory.namedNode(beanType));
            this.quadsArr.push(resourceIdentifierQuad);

            const properties: IRdfPropertyMetadata[] = Reflect.getMetadata('RdfProperty', target);
            properties.forEach((p: IRdfPropertyMetadata) => {

                // If clazz property is present then it is an Object
                const propertyClassType = p.decoratorMetadata.clazz;
                const serializer: { new(): ISerializer } = p.decoratorMetadata.serializer;
                // ?subject ?predicate ?object
                const predicate: RDF.NamedNode = N3.DataFactory.namedNode(p.decoratorMetadata.prop);
                const xsdDataType: RDF.NamedNode = N3.DataFactory.namedNode(p.decoratorMetadata.xsdType);

                // If value is set for the current key, process it
                if (p.val) {
                    let q: RDF.Quad;
                    // If this is an Object
                    if (propertyClassType)
                    {
                        if (Array.isArray(p.val))
                        {
                            p.val.forEach((prop: any) => {
                                const resultObject: RDF.NamedNode = this.process(prop);
                                q = this.createQuad(subject, predicate, resultObject);
                                this.quadsArr.push(q);
                            });
                        }
                        else
                        {
                            if (serializer)
                            {
                                const s: ISerializer = this.getOrCreateSerializer(serializer);
                                const object: RDF.Literal = N3.DataFactory.literal(s.serialize(p.val), xsdDataType);
                                q = this.createQuad(subject, predicate, object);
                                this.quadsArr.push(q);
                            }
                            else
                            {
                                const resultObject: RDF.NamedNode = this.process(p.val); // returns NamedNode
                                q = this.createQuad(subject, predicate, resultObject);
                                this.quadsArr.push(q);
                            }
                        }

                    }
                    // If not clazz annotated, then it's a literal
                    else {
                        if (serializer)
                        {
                            const s: ISerializer = this.getOrCreateSerializer(serializer);
                            const objectLiteral: RDF.Literal = this.makeLiteral(s.serialize(p.val), xsdDataType);
                            q = this.createQuad(subject, predicate, objectLiteral);
                            this.quadsArr.push(q);
                        } else {
                            const objectLiteral: RDF.Literal = this.makeLiteral(p.val, xsdDataType);
                            q = this.createQuad(subject, predicate, objectLiteral);
                            this.quadsArr.push(q);

                        }
                    }
                }

            });

        return N3.DataFactory.namedNode(`${rdfSubjectDecorator.prop}:${rdfSubjectDecorator['val']}`);
        }
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
