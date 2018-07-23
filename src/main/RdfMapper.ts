import * as N3 from 'n3';
import 'reflect-metadata';
import {IRdfNamespaces} from './annotations/interfaces/IRdfNamespaces';
import {consoleTestResultHandler} from 'tslint/lib/test';

export class RdfMapper {
    public static serialize(target: any) {
        const ns: IRdfNamespaces[] = Reflect.getMetadata('RdfNamespaces', target);
        const beanType: string = Reflect.getMetadata('RdfBean', target);
        const subject: string = Reflect.getMetadata('RdfSubject', target);
        // console.log(ns);
        // console.log(target);
        const prefixxes = RdfMapper.getN3NsPrefixObject(ns);
        const writer = N3.Writer({ prefixes: prefixxes });

        const { DataFactory } = N3;
        const { namedNode, literal, defaultGraph, quad } = DataFactory;
        writer.addQuad(
            namedNode(`person:${subject['val']}`),
            namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
            namedNode(beanType)
        );

        const properties: Array<any> = Reflect.getMetadata('RdfProperty', target);
        properties.forEach(p => {

            const q = quad(
                namedNode(`person:${subject['val']}`),
                namedNode(p.prop.prop),
                literal(p.val, {value: p.prop.xsdType})
            );

            writer.addQuad(
               q
            );

            console.log(q.object.datatype.value)
        });


        let result;
        writer.end((error, r) => {
            result = r;
        });

        return result;
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
