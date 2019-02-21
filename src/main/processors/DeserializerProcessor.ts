import * as N3 from 'n3';
import {Quad} from 'n3';
import {BaseQuad} from 'n3';
import * as RDF from 'rdf-js';
import {IRdfPrefixes} from '../annotations/interfaces/IRdfPrefixes';
import {IRdfPropertyMetadata} from '../annotations/interfaces/IRdfPropertyMetadata';
import {IRdfSubjectMetadata} from '../annotations/interfaces/IRdfSubjectMetadata';
import {XSDDataType} from '../annotations/XSDDataType';
import {TurtleParseError} from '../exceptions/TurtleParseError';
import {Utils} from '../Utils';

interface QuadsAndPrefixes {
    quads: N3.Quad[];
    prefixes: N3.Prefixes;
}

export class DeserializerProcessor {

    private readonly xsdType = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';

    constructor() {}

    public async deserializeAsync<T>(type: { new(): T }, ttlData: string): Promise<T> {
        let qa: QuadsAndPrefixes;
        try {
            qa = await this.getQuadsAndPrefixes(ttlData);
            const store: N3.N3Store = N3.Store();
            store.addQuads(qa.quads);
            const dtoInstance = this.process(type, store);

            return Promise.resolve(dtoInstance);
        } catch (e) {
            throw new TurtleParseError(e);
        }
    }

    public deserialize<T>(type: { new(): T }, ttlData: string): T {
        let qs: Quad[];
        try {
            qs = this.getQuads(ttlData);
            const store: N3.N3Store = N3.Store();
            store.addQuads(qs);
            const dtoInstance: T = this.process(type, store);
            return dtoInstance;
        } catch (e) {
            throw new TurtleParseError(e);
        }
    }

    private process<T>(type: { new(): T }, store: N3.N3Store, object?: RDF.Term): T {
        const dtoInstance = new type();

        const ns: IRdfPrefixes = Reflect.getMetadata('RdfPrefixes', type.prototype);
        const beanType: string = Reflect.getMetadata('RdfBean', type.prototype);
        const properties: IRdfPropertyMetadata[] = Reflect.getMetadata('RdfProperty-non-instance', type.prototype);
        const subject: IRdfSubjectMetadata = Reflect.getMetadata('RdfSubject-non-instance', type.prototype);

        const numTriples: N3.Quad[] = this.getNumTriplesByBeanType(beanType, store, ns);
        if (numTriples.length > 0) {
            const triple: N3.Quad = numTriples[0];
            // Get URI and set the value for key which contains @RdfSubject annotation
            if (subject) {
                dtoInstance[subject.key] = Utils.getUUIDFromResourceSubject(triple.subject.value, subject.prop, ns);
            }
            properties.forEach((rdfProp: IRdfPropertyMetadata) => {
                let objects: RDF.Term[];
                if (object) {
                    objects = store.getObjects(object, N3.DataFactory.namedNode(Utils.getUriFromPrefixedName(rdfProp.decoratorMetadata.predicate, ns)), null);
                } else {
                    objects = store.getObjects(triple.subject, N3.DataFactory.namedNode(Utils.getUriFromPrefixedName(rdfProp.decoratorMetadata.predicate, ns)), null);
                }

                if (objects.length > 0) {
                    const ob: RDF.Term = objects[0];
                    let holder = [];
                    if (N3.Util.isLiteral(ob)) {
                        if (rdfProp.decoratorMetadata.isArray) {
                            holder = objects.map(o => this.processPrimitiveByXSDType(o.value, rdfProp.decoratorMetadata.xsdType));
                            dtoInstance[rdfProp.key] = holder;
                        } else {
                            const r = this.processPrimitiveByXSDType(ob.value, rdfProp.decoratorMetadata.xsdType);
                            dtoInstance[rdfProp.key] = r;
                        }
                    }

                    if (N3.Util.isNamedNode(ob) || N3.Util.isBlankNode(ob)) {
                        if (rdfProp.decoratorMetadata.isArray) {
                            objects.forEach(o => {
                                const res = this.process(rdfProp.decoratorMetadata.clazz, store, o);
                                holder.push(res);
                            });
                            dtoInstance[rdfProp.key] = holder;
                        } else {
                            const res = this.process(rdfProp.decoratorMetadata.clazz, store, ob);
                            dtoInstance[rdfProp.key] = res;
                        }
                    }
                }
            });

        }

        return dtoInstance;

    }

    private processPrimitiveByXSDType(value: string, xsdType: string): any {
        let result;
        switch (xsdType) {
            case XSDDataType.XSD_INTEGER:
            case XSDDataType.XSD_INT:
            case XSDDataType.XSD_NON_NEGATIVE_INTEGER:
            case XSDDataType.XSD_NON_POSITIVE_INTEGER:
            case XSDDataType.XSD_POSITIVE_INTEGER:
            case XSDDataType.XSD_NON_POSITIVE_INTEGER:
            case XSDDataType.XSD_NEGATIVE_INTEGER:
                result = parseInt(value);
                break;
            case XSDDataType.XSD_DOUBLE:
            case XSDDataType.XSD_DECIMAL:
            case XSDDataType.XSD_FLOAT:
                result = parseFloat(value);
                break;
            case XSDDataType.XSD_BOOLEAN:
                if (value === 'true') {
                    result = true;
                } else {
                    result = false;
                }
                break;
            default:
                result = value;
        }
        return result;
    }

    private getNumTriplesByBeanType(beanType: string, store: N3.N3Store, ns: IRdfPrefixes): Quad[] {
        let numTriples: Quad[];
        if (beanType) {
            const beanTypeUri = Utils.getUriFromPrefixedName(beanType, ns);
            numTriples = store.getQuads(null, N3.DataFactory.namedNode(this.xsdType), N3.DataFactory.namedNode(beanTypeUri), null);
        } else {
            numTriples = store.getQuads(null, null, null, null);
        }

        return numTriples;
    }

    private async getQuadsAndPrefixes(ttlData: string): Promise<QuadsAndPrefixes> {
        const parser: N3.N3Parser = new N3.Parser();
        return new Promise<QuadsAndPrefixes>((resolve, reject) => {
            const quads: N3.Quad[] = [];
            parser.parse(ttlData, (e: Error, q: N3.Quad, p: N3.Prefixes) => {
                if (e) {
                    reject(e);
                }

                if (q) {
                    quads.push(q);
                } else {
                    resolve({quads: quads, prefixes: p});
                }
            });
        });
    }

    private getQuads(ttlData: string): Quad[] {
        const parser: N3.N3Parser = new N3.Parser();
        const r: Quad[] = parser.parse(ttlData);
        return r;
    }

}
