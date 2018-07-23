import * as N3 from 'n3';
import 'reflect-metadata';
import {IRdfProperty} from './interfaces/IRdfProperty';

export const RdfProperty = (prop: IRdfProperty) => {
    return (target: Object, key: string) => {
        let value = target[key];

        const getter = () => {
            // console.log(`Get => ${key}`);
            return value;
        };

        const setter = (newVal) => {
            // console.log(`Set: ${key} => ${newVal}`);
            value = newVal;
            // We can build information about our object when it's properties are set
            // Multiple class fields can have decorators with same name. as we loop through them
            // we attempt to get the metadata for current target if no metadata available, we create empty array
            const s = Reflect.getMetadata('RdfProperty', target) || [];
            // build metadata object which includes field value and push to the empty array or previously defined
            // metadata from previous field
            s.push({key: key, val: value, prop: prop});
            // Define or redefine metadata for current target
            Reflect.defineMetadata('RdfProperty', s, target);
            // const writer = N3.Writer({ prefixes: { c: 'http://example.org/cartoons#' } });
            // const { DataFactory } = N3;
            // const { namedNode, literal, defaultGraph, quad } = DataFactory;
            // writer.addQuad(
            //     namedNode('http://example.org/cartoons#Tom'),
            //     namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
            //     namedNode('http://example.org/cartoons#Cat')
            // );
            // writer.end((error, result) => console.log(result));
        };

        if (delete target[key]) {
            Object.defineProperty(target, key, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }

    };
}
