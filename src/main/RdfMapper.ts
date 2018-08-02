import * as N3 from 'n3';
import 'reflect-metadata';
import {IRdfNamespaces} from './annotations/interfaces/IRdfNamespaces';
import {IRdfPropertyMetadata} from './annotations/interfaces/IRdfPropertyMetadata';
import {SerializerProcessor} from './processors/SerializerProcessor';
import {Utils} from './Utils';

interface QuadsAndPrefixes {
    quads: any[];
    prefixes: any;
}

export class RdfMapper {
    public static serialize(target: any) {
        const serializerProcessor: SerializerProcessor = new SerializerProcessor(target);
        return serializerProcessor.serialize(target);
    }

    public static async deserialize <T>(type: { new(): T }, ttlData: string): Promise<T> {
        const dtoInstance = new type();
        const parser = new N3.Parser();
        const ns: IRdfNamespaces[] = Reflect.getMetadata('RdfNamespaces', type.prototype);
        const beanType: string = Reflect.getMetadata('RdfBean', type.prototype);
        const beanTypeUri: string = Utils.getUriFromPrefixedName(beanType, ns); // - this can be undefined
        console.log(`${beanType} - ${beanTypeUri}`);

        const properties: IRdfPropertyMetadata[] = Reflect.getMetadata('RdfProperty-non-instance', type.prototype);

        // properties.forEach((prop: IRdfPropertyMetadata) => {
        //     console.log(Object.keys(type.prototype));
        // });

        // console.log(properties);

        const qa: QuadsAndPrefixes = await RdfMapper.getQuadsAndPrefixes(ttlData, parser);
        // console.log(qa.quads);

        console.log(Utils.doesModelContainBeanType(beanTypeUri, qa.quads));

        qa.quads.forEach(quad => {
            console.log(`${quad.subject.id} - ${quad.predicate.id} - ${quad.object.id}`);
        })
        // return dtoInstance;
        return Promise.resolve(dtoInstance);
    }

    public static async getQuadsAndPrefixes(ttlData: string, parser: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const quads = [];
            const prefixes = [];
            parser.parse(ttlData, (e, q, p) => {
                if (e) {
                    reject(e);
                }

                if (q) {
                    quads.push(q);
                }

                if (p) {
                    prefixes.push(p);
                }
                resolve({quads: quads, prefixes: prefixes});
            });
        });
    }

}
