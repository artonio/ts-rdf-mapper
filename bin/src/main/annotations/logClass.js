"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
// Various examples of decorators, just some playground functions
function logClass(target) {
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
        console.log('New: ' + original.name);
        return construct(original, args);
    };
    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;
    // return new constructor (will override original)
    return f;
}
exports.logClass = logClass;
exports.logClazz = function (prop) {
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
            console.log('New: ' + original.name);
            return construct(original, args);
        };
        // copy prototype so intanceof operator still works
        f.prototype = original.prototype;
        // return new constructor (will override original)
        return f;
    };
};
var makePropertyMapper = function (prototype, key, mapper) {
    var values = new Map();
    Object.defineProperty(prototype, key, {
        set: function (firstValue) {
            Object.defineProperty(this, key, {
                get: function () {
                    return values.get(this);
                },
                set: function (value) {
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
exports.exampleDecorator = function (prop) {
    return function (target, key) {
        makePropertyMapper(target, key, function (value) {
            var s = Reflect.getMetadata('RdfProperty', target) || [];
            if (value) {
                s.push({ key: key, val: value, decoratorMetadata: prop });
                // Define or redefine metadata for current target
            }
            Reflect.defineMetadata('RdfProperty', s, target);
            return value + ' anton';
        });
    };
};
exports.logProperty = function (prop, clazz) {
    return function (target, key) {
        var values = new Map();
        var getter = function () {
            return values.get(_this);
        };
        var setter = function (newVal) {
            // console.log(`Set: ${key} => ${newVal}`);
            Object.defineProperty(_this, key, {
                get: function () {
                    return values.get(this);
                },
                set: function (value) {
                    console.log("Set: " + key + " => " + value);
                    values.set(this, value);
                },
                enumerable: true
            });
            _this[key] = newVal;
        };
        if (delete target[key]) {
            console.log('delete called');
            Reflect.defineProperty(target, key, {
                get: getter,
                set: setter,
                enumerable: true,
                configurable: true
            });
        }
    };
};
//# sourceMappingURL=logClass.js.map