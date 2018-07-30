import 'reflect-metadata';
import {IRdfProperty} from './interfaces/IRdfProperty';
import {IRdfPropertyMetadata} from './interfaces/IRdfPropertyMetadata';

// export const RdfProperty = (prop: IRdfProperty) => {
//     return (target: Object, key: string) => {
//         let value = target[key];
//
//         const getter = () => {
//             // console.log(`Get => ${key} - ${value}`);
//             return value;
//         };
//
//         const setter = (newVal) => {
//             // console.log(`Set: ${key} => ${newVal}`);
//             // console.log(this.prototype);
//             value = newVal;
//             // We can build information about our object when it's properties are set
//             // Multiple class fields can have decorators with same name. as we loop through them
//             // we attempt to get the metadata for current target if no metadata available, we create empty array
//             const s: IRdfPropertyMetadata[] = Reflect.getMetadata('RdfProperty', target) || [];
//             // build metadata object which includes field value and push to the empty array or previously defined
//             // metadata from previous field
//             s.push({key: key, val: value, decoratorMetadata: prop});
//             // s.push({key: key, val: newVal, decoratorMetadata: prop});
//             // Define or redefine metadata for current target
//             Reflect.defineMetadata('RdfProperty', s, target);
//             // console.log(Array === Reflect.getMetadata('design:type', target, key));
//             // console.log(Reflect.getOwnMetadata('design:type', target, key));
//         };
//
//         if (delete target[key]) {
//             Object.defineProperty(target, key, {
//                 get: getter,
//                 set: setter,
//                 enumerable: true,
//                 configurable: true
//             });
//         }
//
//     };
// }

const makeRDFPropertyMapper = <T>(prototype: any, key: string, prop: any, mapper: (value: any) => T) => {
    const values = new Map<any, T>();
    Object.defineProperty(prototype, key, {
        set(firstValue: any) {
            Object.defineProperty(this, key, {
                get() {
                    return values.get(this);
                },
                set(value: any) {
                    values.set(this, mapper(value));
                    const s: IRdfPropertyMetadata[] = Reflect.getMetadata('RdfProperty', this) || [];
                    if (value) {
                        s.push({key: key, val: value, decoratorMetadata: prop, target: this});
                        // Define or redefine metadata for current target
                    }
                    // console.log('define metadata')
                    Reflect.defineMetadata('RdfProperty', s, this);
                },
                enumerable: true,
            });
            this[key] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
};

export const RdfProperty = (prop: IRdfProperty) => {
    return (target: Object, key: string) => {
        makeRDFPropertyMapper(target, key, prop, (value: any) => {

            return value;
        });
    };
}

