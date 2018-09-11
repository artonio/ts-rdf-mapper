/**
 * **Optional** - Defines the type (xsd:type) of Resource,
 *
 * Basic usage and result example:
 *
 * ```ts
 * @RdfPrefixes({
 *   foaf: 'http://xmlns.com/foaf/0.1/',
 *   person: 'http://example.com/Person/'
 * })
 * @RdfBean('foaf:Person')
 * export class Person {
 *  @RdfSubject('person')
 *  public name: string;
 * }
 *
 * const p = new Person();
 * p.name = 'John';
 * RdfMapper.serialize(p)
 * ```
 * produces the following TURTLE:
 *
 * ```
 * @prefix foaf: <http://xmlns.com/foaf/0.1/>.
 * @prefix person: <http://example.com/Person/>.
 * @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
 *
 * person:John a foaf:Person;
 * ```
 *
 * @param value - a IRI in the form of 'http(s)://schema.org/Person or prefixed version e.g. 'schema:Person'
 * @constructor
 */
export const RdfBean = (value: string) => {
    return (target: any) => {
        // save a reference to the original constructor
        const original = target;

        // a utility function to generate instances of a class
        function construct(constructor, args) {
            const c: any = function () {
                return new constructor();
                // return constructor.apply(this, args);
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
        Reflect.defineMetadata('RdfBean', value, f.prototype);

        // return new constructor (will override original)
        return f;
    };
};
