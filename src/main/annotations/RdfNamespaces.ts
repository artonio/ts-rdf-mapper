import 'reflect-metadata';
import {IRdfNamespaces} from './interfaces/IRdfNamespaces';

export const RdfNamespaces = (prefixValuePairs?: IRdfNamespaces[]) => {
    return (target: any) => {

        // save a reference to the original constructor
        const original = target;

        // a utility function to generate instances of a class
        function construct(constructor, args) {
            const c: any = function () {
                // return constructor.apply(this, args);
                return constructor.apply(this, args);
            };
            c.prototype = constructor.prototype;

            return new c();
        }

        // the new constructor behaviour
        const f: any = function (...args) {
            // console.log(`New: ${original.name}`);

            // console.log('Namespaces');
            // console.log(prefixValuePairs);

            return construct(original, args);
        };

        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        Reflect.defineMetadata('RdfNamespaces', prefixValuePairs, f.prototype);

        // return new constructor (will override original)
        return f;
    };
};
