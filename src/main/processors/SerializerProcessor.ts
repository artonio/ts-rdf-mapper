import * as N3 from 'n3';
import 'reflect-metadata';
import {IRdfNamespaces} from '../annotations/interfaces/IRdfNamespaces';
import {IRdfPropertyMetadata} from '../annotations/interfaces/IRdfPropertyMetadata';

export class SerializerProcessor {

    objectToBeSerialized: any;
    // N3 writer
    n3Writer: any;

    constructor(target: any) {
        this.objectToBeSerialized = target;
        this.n3Writer = N3.Writer();
    }

    public serialize(target: any) {
        this.process(target);
        let result;
        this.n3Writer.end((error, r) => {
            result = r;
        });

        return result;
    }

    private process(target: any) {
        const ns: IRdfNamespaces[] = Reflect.getMetadata('RdfNamespaces', target);
        const beanType: string = Reflect.getMetadata('RdfBean', target);
        const subject: string = Reflect.getMetadata('RdfSubject', target);

        const prefixxes = this.getN3NsPrefixObject(ns);
        // const writer = N3.Writer({ prefixes: prefixxes });
        this.n3Writer.addPrefixes(prefixxes);

        const { DataFactory } = N3;
        const { namedNode, literal, defaultGraph, quad } = DataFactory;
        this.n3Writer.addQuad(
            namedNode(`person:${subject['val']}`),
            namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
            namedNode(beanType)
        );

        const properties: IRdfPropertyMetadata[] = Reflect
                                            .getMetadata('RdfProperty', target);
        properties.forEach((p: IRdfPropertyMetadata) => {
            const q = quad(
                namedNode(`person:${subject['val']}`),
                namedNode(p.decoratorMetadata.prop),
                literal(p.val, {value: p.decoratorMetadata.xsdType})
            );

            if (typeof  p.val === 'object') {
                // const r = RdfMapper.serialize(p.val);
                // console.log(r);
            }

            this.n3Writer.addQuad(
                q
            );

            // console.log(q.object.datatype.value)
        });


    }

    private getN3NsPrefixObject(ns: IRdfNamespaces[]) {
        const r = {};
        ns.forEach((namespace: IRdfNamespaces) => {
            r[namespace.prefix] = namespace.uri;
        });
        r['xsd'] = 'http://www.w3.org/2001/XMLSchema#';
        return r;
    }
}
