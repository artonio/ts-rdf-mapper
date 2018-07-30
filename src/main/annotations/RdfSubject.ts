// export const RdfSubject = (prop: string) => {
//     return (target: Object, key: string) => {
//         let value = target[key];
//
//         const getter = () => {
//             // console.log(`Get => ${key}`);
//             return value;
//         };
//
//         const setter = (newVal) => {
//             // console.log(`Set: ${key} => ${newVal}`);
//             value = newVal;
//             Reflect.defineMetadata('RdfSubject', {key: key, val: value, prop: prop}, target);
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
// };

import {IRdfPropertyMetadata} from './interfaces/IRdfPropertyMetadata';

const makeRDFSubjectMapper = <T>(prototype: any, key: string, prop: any, mapper: (value: any) => T) => {
    const values = new Map<any, T>();
    Object.defineProperty(prototype, key, {
        set(firstValue: any) {
            Object.defineProperty(this, key, {
                get() {
                    return values.get(this);
                },
                set(value: any) {
                    Reflect.defineMetadata('RdfSubject', {key: key, val: value, prop: prop}, this);
                    values.set(this, mapper(value));
                },
                enumerable: true,
            });
            this[key] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
};

export const RdfSubject = (prop: string) => {
    return (target: Object, key: string) => {
        makeRDFSubjectMapper(target, key, prop, (value: any) => {

            // const s: any = Reflect.getMetadata('RdfSubject', target) || [];
            // if (value) {
            //     s.push({key: key, val: value, prop: prop});
            //     // Define or redefine metadata for current target
            // }
            // Reflect.defineMetadata('RdfSubject', s, target);
            return value;
        });
    };
};
