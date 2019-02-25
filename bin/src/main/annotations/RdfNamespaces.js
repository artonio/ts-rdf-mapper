"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
/**
 * Responsible of defining prefixes and it's corresponding URIs
 *
 * Basic usage example:
 *
 * ```ts
 * @RdfNamespaces({
 *   foaf: 'http://xmlns.com/foaf/0.1/',
 *   person: 'http://example.com/Person/'
 * })
 * export class Person {
 *
 * }
 * ```
 */
exports.RdfNamespaces = function (prefixes) {
    return function (target) {
        // save a reference to the original constructor
        var original = target;
        // a utility function to generate instances of a class
        function construct(constructor, args) {
            var c = function () {
                return constructor.apply(this, args);
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
        Reflect.defineMetadata('RdfNamespaces', prefixes, f.prototype);
        return f;
    };
};
//# sourceMappingURL=RdfNamespaces.js.map