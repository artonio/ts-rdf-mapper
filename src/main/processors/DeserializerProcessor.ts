import {
    DataFactory,
    Literal,
    N3Parser,
    N3Store,
    NamedNode,
    Parser,
    Prefixes,
    Quad,
    Quad_Object,
    Quad_Subject,
    Store,
    Util
} from 'n3';
import {AbstractTreeNode} from '../annotations/interfaces/AbstractTreeNode';
import {IRdfPrefixes} from '../annotations/interfaces/IRdfPrefixes';
import {IRdfPropertyMetadata} from '../annotations/interfaces/IRdfPropertyMetadata';
import {IRdfSubjectMetadata} from '../annotations/interfaces/IRdfSubjectMetadata';
import {XSDDataType} from '../annotations/XSDDataType';
import {TurtleParseError} from '../exceptions/TurtleParseError';
import {Utils} from '../Utils';

interface QuadsAndPrefixes {
    quads: Quad[];
    prefixes: Prefixes;
}

export class DeserializerProcessor {

    private readonly xsdType = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';

    constructor() {}

    public async deserializeAsync<T>(type: { new(): T }, ttlData: string): Promise<T> {
        let qa: QuadsAndPrefixes;
        try {
            qa = await this.getQuadsAndPrefixes(ttlData);
            const store: N3Store = new Store();
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
            const store: N3Store = new Store();
            store.addQuads(qs);
            const dtoInstance: T = this.process(type, store);
            return dtoInstance;
        } catch (e) {
            throw new TurtleParseError(e);
        }
    }

    public deserializeTree<T extends AbstractTreeNode>(type: { new(): T }, ttlData: string): T {
        let qs: Quad[];
        try {
            qs = this.getQuads(ttlData);
            const store: N3Store = new Store();
            store.addQuads(qs);
            const dtoInstance: T = this.processTree(type, store);
            return dtoInstance;
        } catch (e) {
            throw new TurtleParseError(e);
        }
    }

    private processTree<T extends AbstractTreeNode>(type: { new(): T }, store: N3Store, object?: Quad_Object): T {
        const dtoInstance = new type();

        const ns: IRdfPrefixes = Reflect.getMetadata('RdfPrefixes', type.prototype);
        ns['xsd'] = 'http://www.w3.org/2001/XMLSchema#';
        const beanType: string = Reflect.getMetadata('RdfBean', type.prototype);
        const properties: IRdfPropertyMetadata[] = Reflect.getMetadata('RdfProperty-non-instance', type.prototype);
        const subject: IRdfSubjectMetadata = Reflect.getMetadata('RdfSubject-non-instance', type.prototype);

        const isRootNodeTrue: Literal = this.makeLiteral('true', DataFactory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'));
        const isRootNotePredicate: NamedNode = DataFactory.namedNode('http://ts-rdf-mapper.com#isRootNode');

        const subs: Quad_Subject[] = store.getSubjects(isRootNotePredicate, isRootNodeTrue, null);
        if (subs.length > 0 ) {
            const rootSubject = subs[0];
            if (subject) {
                dtoInstance[subject.key] = Utils.getUUIDFromResourceSubject(rootSubject.value, subject.prop, ns);
            }
            properties.forEach((rdfProp: IRdfPropertyMetadata) => {
                let objects: Quad_Object[];
                const rdfPredicateString: string = rdfProp.decoratorMetadata.predicate;
                const predicate: NamedNode = this.makePredicate(rdfPredicateString, ns);
                if (predicate) {
                    if (object) {
                        objects = store.getObjects(object, predicate, null);
                    } else {
                        objects = store.getObjects(rootSubject, predicate, null);
                    }
                    if (objects.length > 0) {
                        const ob: Quad_Object = objects[0];
                        let holder = [];
                        if (Util.isLiteral(ob)) {
                            if (rdfProp.decoratorMetadata.isArray) {
                                holder = objects.map(o => this.processPrimitiveByXSDType(o.value, rdfProp.decoratorMetadata.xsdType));
                                dtoInstance[rdfProp.key] = holder;
                            } else {
                                const r = this.processPrimitiveByXSDType(ob.value, rdfProp.decoratorMetadata.xsdType);
                                dtoInstance[rdfProp.key] = r;
                            }
                        }

                        if (Util.isNamedNode(ob) || Util.isBlankNode(ob)) {
                            if (rdfProp.decoratorMetadata.isArray) {
                                objects.forEach(o => {
                                    const res = this.processTree(rdfProp.decoratorMetadata.clazz, store, o);
                                    holder.push(res);
                                });
                                dtoInstance[rdfProp.key] = holder;
                            } else {
                                const res = this.processTree(rdfProp.decoratorMetadata.clazz, store, ob);
                                dtoInstance[rdfProp.key] = res;
                            }
                        }
                    }

                }
            });

        }
        return dtoInstance;
    }

    private process<T>(type: { new(): T }, store: N3Store, object?: Quad_Object): T {
        const dtoInstance = new type();

        const ns: IRdfPrefixes = Reflect.getMetadata('RdfPrefixes', type.prototype);
        const beanType: string = Reflect.getMetadata('RdfBean', type.prototype);
        const properties: IRdfPropertyMetadata[] = Reflect.getMetadata('RdfProperty-non-instance', type.prototype);
        const subject: IRdfSubjectMetadata = Reflect.getMetadata('RdfSubject-non-instance', type.prototype);

        const numTriples: Quad[] = this.getNumTriplesByBeanType(beanType, store, ns);
        if (numTriples.length > 0) {
            const triple: Quad = numTriples[0];
            // Get URI and set the value for key which contains @RdfSubject annotation
            if (subject) {
                dtoInstance[subject.key] = Utils.getUUIDFromResourceSubject(triple.subject.value, subject.prop, ns);
            }
            properties.forEach((rdfProp: IRdfPropertyMetadata) => {
                let objects: Quad_Object[];
                const predicateURI = Utils.getUriFromPrefixedName(rdfProp.decoratorMetadata.predicate, ns);
                if (object) {
                    objects = store.getObjects(object, DataFactory.namedNode(predicateURI), null);
                } else {
                    objects = store.getObjects(triple.subject, DataFactory.namedNode(predicateURI), null);
                }

                if (objects.length > 0) {
                    const ob: Quad_Object = objects[0];
                    let holder = [];
                    if (Util.isLiteral(ob)) {
                        if (rdfProp.decoratorMetadata.isArray) {
                            holder = objects.map(o => this.processPrimitiveByXSDType(o.value, rdfProp.decoratorMetadata.xsdType));
                            dtoInstance[rdfProp.key] = holder;
                        } else {
                            const r = this.processPrimitiveByXSDType(ob.value, rdfProp.decoratorMetadata.xsdType);
                            dtoInstance[rdfProp.key] = r;
                        }
                    }

                    if (Util.isNamedNode(ob) || Util.isBlankNode(ob)) {
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
                result = value === 'true';
                break;
            default:
                result = value;
        }
        return result;
    }

    private getNumTriplesByBeanType(beanType: string, store: N3Store, ns: IRdfPrefixes): Quad[] {
        let numTriples: Quad[];
        if (beanType) {
            const beanTypeUri = Utils.getUriFromPrefixedName(beanType, ns);
            numTriples = store.getQuads(null, DataFactory.namedNode(this.xsdType), DataFactory.namedNode(beanTypeUri), null);
        } else {
            numTriples = store.getQuads(null, null, null, null);
        }

        return numTriples;
    }

    private async getQuadsAndPrefixes(ttlData: string): Promise<QuadsAndPrefixes> {
        const parser: N3Parser = new Parser();
        return new Promise<QuadsAndPrefixes>((resolve, reject) => {
            const quads: Quad[] = [];
            parser.parse(ttlData, (e: Error, q: Quad, p: Prefixes) => {
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
        const parser: N3Parser = new Parser();
        const r: Quad[] = parser.parse(ttlData);
        return r;
    }

    private makeLiteral(value: string | number, languageOrDatatype?: string | NamedNode): Literal {
        return DataFactory.literal(value, languageOrDatatype);
    }

    private makePredicate(rdfPredicateString: string, prefixes: IRdfPrefixes): NamedNode {
        let predicate: NamedNode;
        if (rdfPredicateString) {
            if (/^(http|https):\/\/?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*|(#.*))?$/
                .test(rdfPredicateString)) {
                predicate = DataFactory.namedNode(rdfPredicateString);
            } else {
                predicate = DataFactory.namedNode(Utils.getUriFromPrefixedName(rdfPredicateString, prefixes));
            }
            return predicate;
        } else {
            throw new Error('predicate is a mandatory property');
        }
    }

}
