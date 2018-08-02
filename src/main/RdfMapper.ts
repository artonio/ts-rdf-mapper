import 'reflect-metadata';
import {SerializerProcessor} from './processors/SerializerProcessor';
import * as N3 from 'n3';

export class RdfMapper {
    public static serialize(target: any) {
        const serializerProcessor: SerializerProcessor = new SerializerProcessor(target);
        return serializerProcessor.serialize(target);
    }

    public static async deserialize <T>(type: { new(): T }, ttlData: string) {
        const dtoInstance = new type();
        const parser = new N3.Parser();
        // parser.parse(ttlData, (e, q, p) => {
        //     console.log(i);
        //     console.log(typeof q);
        // })

        // parser.parse(ttlData, (error, quad) => {
        //     console.log(quad);
        // }, (prefixes, uri) => {
        //     console.log(prefixes);
        //     console.log(uri.id);
        // });

        // parser.parse(ttlData, console.log);

        // const r = parser.parse(ttlData, (q) => {});
        // console.log(r)

        const qa = await RdfMapper.getQuadsAndPrefixes(ttlData, parser);
        console.log(qa);
        // qa.forEach(something => {
        //     console.log(something);
        // })
        return dtoInstance;
    }

    public static async getQuadsAndPrefixes(ttlData: string, parser: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const quads = [];
            const prefixes = [];x
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
