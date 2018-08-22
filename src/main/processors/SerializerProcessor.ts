import * as N3 from 'n3';
import {N3Writer} from 'n3';
import * as RDF from 'rdf-js';
import 'reflect-metadata';
import {IRdfNamespaces} from '../annotations/interfaces/IRdfNamespaces';
import {IRdfPropertyMetadata} from '../annotations/interfaces/IRdfPropertyMetadata';

export class SerializerProcessor {

    objectToBeSerialized: any;
    // N3 writer
    n3Writer: N3Writer;
    quadsArr: RDF.Quad[] = [];
    prefixes: N3.Prefixes = {};

    constructor(target: any) {
        this.objectToBeSerialized = target;
    }

    public serialize(target: any) {
        this.process(target);
        this.sortQuads(this.quadsArr);
        // console.log(this.quadsArr);
        this.n3Writer = N3.Writer({prefixes: this.prefixes});
        this.n3Writer.addQuads(this.quadsArr);
        return this.getTTLString();
    }

    private process(target: any): RDF.NamedNode {
        const ns: IRdfNamespaces[] = Reflect.getMetadata('RdfNamespaces', target);
        const beanType: string = Reflect.getMetadata('RdfBean', target);
        const subject: {key: string; val: string; prop: string} = Reflect.getMetadata('RdfSubject', target);

        const prefixxes: N3.Prefixes = this.getN3NsPrefixObject(ns);
        this.prefixes = {...prefixxes};
        // this.n3Writer.addPrefixes(prefixxes); waiting for DefinitelyTyped merge

        const resourceIdentifierQuad: RDF.Quad = N3.DataFactory.quad(N3.DataFactory.namedNode(`${subject.prop}:${subject['val']}`),
            N3.DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
            N3.DataFactory.namedNode(beanType));

        this.quadsArr.push(resourceIdentifierQuad);

        const properties: IRdfPropertyMetadata[] = Reflect
                                            .getMetadata('RdfProperty', target);
        properties.forEach((p: IRdfPropertyMetadata) => {

            const propertyClassType = p.decoratorMetadata.clazz;

            if (p.val) {
                let q: RDF.Quad;
                if (propertyClassType) {
                    if (Array.isArray(p.val)) {
                        // console.log(`Value: ${p.val} is an Array`);
                        p.val.forEach((prop: any) => {
                            const r = this.process(prop); // returns NamedNode

                            q = N3.DataFactory.quad(
                                N3.DataFactory.namedNode(`${subject.prop}:${subject['val']}`),
                                N3.DataFactory.namedNode(p.decoratorMetadata.prop),
                                r
                            );
                            this.quadsArr.push(q);
                        });
                    } else {
                        const r: RDF.NamedNode = this.process(p.val); // returns NamedNode
                        q = N3.DataFactory.quad(
                            N3.DataFactory.namedNode(`${subject.prop}:${subject['val']}`),
                            N3.DataFactory.namedNode(p.decoratorMetadata.prop),
                            r
                        );
                        this.quadsArr.push(q);

                    }

                } else {
                    q = N3.DataFactory.quad(
                        N3.DataFactory.namedNode(`${subject.prop}:${subject['val']}`),
                        N3.DataFactory.namedNode(p.decoratorMetadata.prop),
                        N3.DataFactory.literal(p.val, N3.DataFactory.namedNode(p.decoratorMetadata.xsdType))
                    );
                    this.quadsArr.push(q);
                }
            }

            // console.log(q.object.datatype.value)
        });
        return N3.DataFactory.namedNode(`${subject.prop}:${subject['val']}`);
    }

    private getTTLString(): string {
        let result;
        this.n3Writer.end((error, r) => {
            result = r;
        });

        return result;
    }

    private getN3NsPrefixObject(ns: IRdfNamespaces[]): N3.Prefixes {
        const r: N3.Prefixes = {};
        ns.forEach((namespace: IRdfNamespaces) => {
            r[namespace.prefix] = N3.DataFactory.namedNode(namespace.uri);
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
}
