"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var makeRDFSubjectMapper = function (prototype, key, prop) {
    var values = new Map();
    var metadataValForDesirealization = { key: key, val: null, prop: prop };
    Reflect.defineMetadata('RdfSubject-non-instance', metadataValForDesirealization, prototype);
    Object.defineProperty(prototype, key, {
        set: function (firstValue) {
            Object.defineProperty(this, key, {
                get: function () {
                    return values.get(this);
                },
                set: function (value) {
                    var metadataValForSirealization = { key: key, val: value, prop: prop };
                    Reflect.defineMetadata('RdfSubject', metadataValForSirealization, this);
                    values.set(this, value);
                },
                enumerable: true,
            });
            this[key] = firstValue;
        },
        enumerable: true,
        configurable: true,
    });
};
/**
 * **Optional** - Resource Identifier. If this decorator is absent then the subject will be a Blank Node
 *
 *  Basic usage and result example:
 *
 * ```ts
 * @RdfNamespaces({
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
 * @param prop
 * @constructor
 */
exports.RdfSubject = function (prop) {
    return function (target, key) {
        makeRDFSubjectMapper(target, key, prop);
    };
};
//# sourceMappingURL=RdfSubject.js.map