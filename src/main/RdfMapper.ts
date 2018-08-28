import * as N3 from 'n3';
import 'reflect-metadata';
import {IRdfNamespaces} from './annotations/interfaces/IRdfNamespaces';
import {IRdfPropertyMetadata} from './annotations/interfaces/IRdfPropertyMetadata';
import {IRdfSubjectMetadata} from './annotations/interfaces/IRdfSubjectMetadata';
import {SerializerProcessor} from './processors/SerializerProcessor';
import {Utils} from './Utils';

interface QuadsAndPrefixes {
    quads: N3.Quad[];
    prefixes: N3.Prefixes;
}

export class RdfMapper {
    public static serialize(target: any) {
        const serializerProcessor: SerializerProcessor = new SerializerProcessor(target);
        return serializerProcessor.serialize(target);
    }

    public static async deserialize <T>(type: { new(): T }, ttlData: string): Promise<T> {
        const dtoInstance = new type();
        const parser: N3.N3Parser = new N3.Parser();
        const ns: IRdfNamespaces[] = Reflect.getMetadata('RdfNamespaces', type.prototype);
        const beanType: string = Reflect.getMetadata('RdfBean', type.prototype);
        const beanTypeUri: string = Utils.getUriFromPrefixedName(beanType, ns); // - this can be undefined
        console.log(`${beanType} - ${beanTypeUri}`);

        const properties: IRdfPropertyMetadata[] = Reflect.getMetadata('RdfProperty-non-instance', type.prototype);
        const subject: IRdfSubjectMetadata = Reflect.getMetadata('RdfSubject-non-instance', type.prototype);

        // properties.forEach((prop: IRdfPropertyMetadata) => {
        //     console.log(Object.keys(type.prototype));
        // });

        // console.log(properties);

        const qa: QuadsAndPrefixes = await RdfMapper.getQuadsAndPrefixes(ttlData, parser);
        const store: N3.N3Store = N3.Store();
        store.addQuads(qa.quads);

        const numResources: N3.Quad[] = store.getQuads(null, N3.DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), N3.DataFactory.namedNode(beanTypeUri), null);
        if (numResources.length > 0) {
            const triple: N3.Quad = numResources[0];
            // dtoInstance[subject.key] = Utils.getUUIDFromResourceSubject(triple.subject, subject.prop);
            console.log(triple);
            const subjectRelatedTriples: N3.Quad[] = store.getQuads(triple.subject, null, null, null);
            console.log(subjectRelatedTriples);
        }

        // console.log(qa.quads);

        console.log(Utils.doesModelContainBeanType(beanTypeUri, qa.quads)); // No need because we can use N3 Store

        qa.quads.forEach(quad => {
            // console.log(`${quad.subject.value} - ${quad.predicate.value} - ${quad.object.value}`);

            const foundProp: IRdfPropertyMetadata = properties.find((prop: IRdfPropertyMetadata) => {
                return quad.predicate.value === Utils.getUriFromPrefixedName(prop.decoratorMetadata.prop, ns);
            });

            if (foundProp) {
                dtoInstance[foundProp.key] = quad.object.value.replace(/['"]+/g, '');
            }

        });
        // return dtoInstance;
        return Promise.resolve(dtoInstance);
    }

    public static async getQuadsAndPrefixes(ttlData: string, parser: N3.N3Parser): Promise<any> {
        return new Promise((resolve, reject) => {
            const quads: N3.Quad[] = [];
            // const prefixes: N3.Prefixes[] = [];
            parser.parse(ttlData, (e: Error, q: N3.Quad, p: N3.Prefixes) => {
                if (e) {
                    reject(e);
                }

                if (q) {
                    quads.push(q);
                } else {
                    resolve({quads: quads, prefixes: p});
                }

                // if (p) {
                //     prefixes.push(p);
                // }
            });
        });
    }

}
