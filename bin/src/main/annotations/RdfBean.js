"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.RdfBean = function (value) {
    return function (target) {
        // save a reference to the original constructor
        var original = target;
        // a utility function to generate instances of a class
        function construct(constructor, args) {
            var c = function () {
                return new constructor();
                // return constructor.apply(this, args);
            };
            c.prototype = constructor.prototype;
            return new c();
        }
        // the new constructor behaviour
        var f = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return construct(original, args);
        };
        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        Reflect.defineMetadata('RdfBean', value, f.prototype);
        // return new constructor (will override original)
        return f;
    };
};
//# sourceMappingURL=RdfBean.js.map