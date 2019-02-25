"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var makeRDFPropertyMapper = function (prototype, key, prop) {
    var values = new Map();
    var rdfPropertyMetaData = Reflect.getMetadata('RdfProperty-non-instance', prototype) || [];
    rdfPropertyMetaData.push({ key: key, val: null, decoratorMetadata: prop });
    Reflect.defineMetadata('RdfProperty-non-instance', rdfPropertyMetaData, prototype);
    Object.defineProperty(prototype, key, {
        set: function (firstValue) {
            Object.defineProperty(this, key, {
                get: function () {
                    return values.get(this);
                },
                set: function (value) {
                    values.set(this, value);
                    var s = Reflect.getMetadata('RdfProperty', this) || [];
                    if (value !== undefined) {
                        if (s.length > 0) {
                            var existingValueIndex = s.findIndex(function (v) {
                                return v.key === key;
                            });
                            if (existingValueIndex > -1) {
                                s.splice(existingValueIndex, 1);
                            }
                        }
                        s.push({ key: key, val: value, decoratorMetadata: prop });
                    }
                    // Define or redefine metadata for current instance
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
/**
 * Used to annotate object properties
 * @param prop
 * @constructor
 */
exports.RdfProperty = function (prop) {
    return function (target, key) {
        makeRDFPropertyMapper(target, key, prop);
    };
};
//# sourceMappingURL=RdfProperty.js.map