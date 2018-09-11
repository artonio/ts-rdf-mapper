import 'reflect-metadata';
import {IRdfPrefixes} from './interfaces/IRdfPrefixes';
/**
 * Responsible of defining prefixes and it's corresponding URIs
 *
 * Basic usage example:
 *
 * ```ts
 * @RdfPrefixes({
 *   foaf: 'http://xmlns.com/foaf/0.1/',
 *   person: 'http://example.com/Person/'
 * })
 * export class Person {
 *
 * }
 * ```
 */
export const RdfPrefixes = (prefixes?: IRdfPrefixes) => {
    return (target: any) => {

        // save a reference to the original constructor
        const original = target;

        // a utility function to generate instances of a class
        function construct(constructor, args) {
            const c: any = function () {
                return constructor.apply(this, args);
            };
            c.prototype = constructor.prototype;

            return new c();
        }

        // the new constructor behaviour
        const f: any = function (...args) {
            return construct(original, args);
        };

        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        Reflect.defineMetadata('RdfPrefixes', prefixes, f.prototype);
        return f;
    };
};
