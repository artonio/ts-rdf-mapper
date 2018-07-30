import * as N3 from 'n3';
import 'reflect-metadata';
import {IRdfNamespaces} from '../annotations/interfaces/IRdfNamespaces';
import {IRdfPropertyMetadata} from '../annotations/interfaces/IRdfPropertyMetadata';
import {Utils} from '../Utils';

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
        return this.getTTLString();
    }

    private process(target: any) {
        const ns: IRdfNamespaces[] = Reflect.getMetadata('RdfNamespaces', target);
        const beanType: string = Reflect.getMetadata('RdfBean', target);
        const subject: {key: string; val: string; prop: string} = Reflect.getMetadata('RdfSubject', target);
        // console.log('process')
        // console.log(target[subject.key]);

        const prefixxes = this.getN3NsPrefixObject(ns);
        // const writer = N3.Writer({ prefixes: prefixxes });
        this.n3Writer.addPrefixes(prefixxes);

        const { DataFactory } = N3;
        const { namedNode, literal, defaultGraph, quad } = DataFactory;
        this.n3Writer.addQuad(
            namedNode(`${subject.prop}:${subject['val']}`),
            // namedNode(`${target[subject.key]}`),
            namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
            namedNode(beanType)
        );

        const properties: IRdfPropertyMetadata[] = Reflect
                                            .getMetadata('RdfProperty', target);
        properties.forEach((p: IRdfPropertyMetadata) => {

            const propertyClassType = p.decoratorMetadata.clazz;

            if (p.decoratorMetadata.clazz) {
                // console.log(p.decoratorMetadata.clazz.prototype.constructor.name);
            }
            // console.log(p.decoratorMetadata.clazz);

            if (p.val) {
                let q;
                if (propertyClassType) {
                    if (Array.isArray(p.val)) {
                        // console.log(`Value: ${p.val} is an Array`);
                        p.val.forEach((prop: any) => {
                            const r = this.process(prop); // returns NamedNode
                            q = quad(
                                namedNode(`${subject.prop}:${subject['val']}`),
                                // namedNode(`${target[subject.key]}`),
                                namedNode(p.decoratorMetadata.prop),
                                r
                            );
                            this.n3Writer.addQuad(q);
                        });
                    } else {
                        const r = this.process(p.val); // returns NamedNode
                        q = quad(
                            namedNode(`${subject.prop}:${subject['val']}`),
                            // namedNode(`${target[subject.key]}`),
                            namedNode(p.decoratorMetadata.prop),
                            r
                        );
                        this.n3Writer.addQuad(q);

                    }

                } else {
                    q = quad(
                        namedNode(`${subject.prop}:${subject['val']}`),
                        // namedNode(`${target[subject.key]}`),
                        namedNode(p.decoratorMetadata.prop),
                        literal(p.val, {value: p.decoratorMetadata.xsdType})
                    );
                    this.n3Writer.addQuad(
                        q
                    );
                }
            }

            // console.log(q.object.datatype.value)
        });
        return namedNode(`${subject.prop}:${subject['val']}`);
        // return  namedNode(`${target[subject.key]}`);
    }

    private getTTLString(): string {
        let result;
        this.n3Writer.end((error, r) => {
            result = r;
        });

        return result;
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
