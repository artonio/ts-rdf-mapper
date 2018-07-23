import * as N3 from 'n3';
import 'reflect-metadata';
import {IRdfProperty} from './interfaces/IRdfProperty';
import {IRdfPropertyMetadata} from './interfaces/IRdfPropertyMetadata';

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
            const s: IRdfPropertyMetadata[] = Reflect.getMetadata('RdfProperty', target) || [];
            // build metadata object which includes field value and push to the empty array or previously defined
            // metadata from previous field
            s.push({key: key, val: value, decoratorMetadata: prop});
            // Define or redefine metadata for current target
            Reflect.defineMetadata('RdfProperty', s, target);
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
