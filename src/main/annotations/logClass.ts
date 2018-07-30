import {IRdfProperty} from './interfaces/IRdfProperty';
import 'reflect-metadata';
import {IRdfPropertyMetadata} from './interfaces/IRdfPropertyMetadata';

export function logClass(target: any) {

    // save a reference to the original constructor
    const original = target;

    // a utility function to generate instances of a class
    function construct(constructor, args) {
        let c: any = function () {
            return constructor.apply(this, args);
        }
        c.prototype = constructor.prototype;
        return new c();
    }

    // the new constructor behaviour
    const f: any = function (...args) {
        console.log('New: ' + original.name);
        return construct(original, args);
    }

    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;

    // return new constructor (will override original)
    return f;
}

export const logClazz = (prop: string ) => {
    return (target: any) => {
        // save a reference to the original constructor
        const original = target;

        // a utility function to generate instances of a class
        function construct(constructor, args) {
            let c: any = function () {
                return constructor.apply(this, args);
            }
            c.prototype = constructor.prototype;
            return new c();
        }

        // the new constructor behaviour
        const f: any = function (...args) {
            console.log('New: ' + original.name);
            return construct(original, args);
        }

        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;

        // return new constructor (will override original)
        return f;
    };
};

const makePropertyMapper = <T>(prototype: any, key: string, mapper: (value: any) => T) => {
    const values = new Map<any, T>();
    Object.defineProperty(prototype, key, {
        set(firstValue: any) {
            Object.defineProperty(this, key, {
                get() {
                    return values.get(this);
                },
                set(value: any) {
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

export const exampleDecorator = (prop: IRdfProperty) => {
    return function(target: any, key: string) {
        makePropertyMapper(target, key, (value: any) => {
            const s: IRdfPropertyMetadata[] = Reflect.getMetadata('RdfProperty', target) || [];
            if (value) {
                s.push({key: key, val: value, decoratorMetadata: prop});
                // Define or redefine metadata for current target
            }
            Reflect.defineMetadata('RdfProperty', s, target);
            return value + ' anton';
        });
    };
};

export const logProperty = (prop: IRdfProperty, clazz: any) => {
    return (target: Object, key: string) => {
        const values = new Map<any, any>();

        const getter = () => {
            return values.get(this);
        };

        const setter = (newVal) => {
            // console.log(`Set: ${key} => ${newVal}`);
            Object.defineProperty(this, key, {
                get() {
                    return values.get(this);
                },
                set(value: any) {
                    console.log(`Set: ${key} => ${value}`);
                    values.set(this, value);
                },
                enumerable: true
            });
            this[key] = newVal;
        };

        if (delete target[key]) {
            console.log('delete called')
            Reflect.defineProperty(target, key, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }

    };
}

