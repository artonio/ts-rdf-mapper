import 'reflect-metadata';
import {IRdfNamespaces} from './annotations/interfaces/IRdfNamespaces';
import {SerializerProcessor} from './processors/SerializerProcessor';

export class RdfMapper {
    public static serialize(target: any) {
        const serializerProcessor: SerializerProcessor = new SerializerProcessor(target);
        return serializerProcessor.serialize(target);
    }

    public static deserialize <T>(type: { new(): T }, ttlData: string): T {
        const dtoInstance = new type();
        return dtoInstance;
    }

    public static getN3NsPrefixObject(ns: IRdfNamespaces[]) {
        const r = {};
        ns.forEach((namespace: IRdfNamespaces) => {
            r[namespace.prefix] = namespace.uri;
        });
        r['xsd'] = 'http://www.w3.org/2001/XMLSchema#';
        return r;
    }
}
