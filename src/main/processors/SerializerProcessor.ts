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

    objectToBeSerialized: Object;
    // N3 writer
    n3Writer: N3Writer;
    quadsArr: RDF.Quad[] = [];
    prefixes: N3.Prefixes = {};
    serializers: any = {};

    private readonly xsdType = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';

    constructor(target: Object) {
        this.objectToBeSerialized = target;
    }

    public serialize(target: Object) {
        this.process(target);
        this.sortQuads(this.quadsArr);
        // console.log(this.quadsArr);
        this.n3Writer = N3.Writer({prefixes: this.prefixes});
        this.n3Writer.addQuads(this.quadsArr);
        return this.getTTLString();
    }

    private process(target: Object): RDF.NamedNode {
        const ns: IRdfNamespaces = Reflect.getMetadata('RdfNamespaces', target);
        const beanType: string = Reflect.getMetadata('RdfBean', target);
        const subject: IRdfSubjectMetadata = Reflect.getMetadata('RdfSubject', target);

        const prefixxes: N3.Prefixes = this.getN3NsPrefixObject(ns);
        this.prefixes = {...prefixxes};
        // this.n3Writer.addPrefixes(prefixxes); waiting for DefinitelyTyped merge

        const resourceIdentifierQuad: RDF.Quad = N3.DataFactory.quad(N3.DataFactory.namedNode(`${subject.prop}:${subject['val']}`),
            N3.DataFactory.namedNode(this.xsdType),
            N3.DataFactory.namedNode(beanType));

        this.quadsArr.push(resourceIdentifierQuad);

        const properties: IRdfPropertyMetadata[] = Reflect
                                            .getMetadata('RdfProperty', target);
        properties.forEach((p: IRdfPropertyMetadata) => {

            const propertyClassType = p.decoratorMetadata.clazz;
            const enumTypeOpt = p.decoratorMetadata.enumOptions;

            // If value is set for the current key, process it
            if (p.val) {
                let q: RDF.Quad;
                if (propertyClassType) {
                    if (Array.isArray(p.val)) {
                        // console.log(`Value: ${p.val} is an Array`);
                        p.val.forEach((prop: any) => {
                            const r: RDF.NamedNode = this.process(prop); // returns NamedNode

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

                } else if (enumTypeOpt) {
                    const s: ISerializer = this.getOrCreateSerializer(enumTypeOpt.serializer);
                    q = N3.DataFactory.quad(
                        N3.DataFactory.namedNode(`${subject.prop}:${subject['val']}`),
                        N3.DataFactory.namedNode(p.decoratorMetadata.prop),
                        N3.DataFactory.literal(s.serialize(p.val), N3.DataFactory.namedNode(p.decoratorMetadata.xsdType))
                    );
                    this.quadsArr.push(q);

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
