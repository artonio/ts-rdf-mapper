"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Utils = /** @class */ (function () {
    function Utils() {
    }
    /**
     * @hidden
     * @param instance
     * @param key
     */
    Utils.getType = function (instance, key) {
        return Reflect.getMetadata('design:type', instance, key);
    };
    /**
     * @hidden
     * @param instance
     * @param key
     */
    Utils.isArrayType = function (instance, key) {
        return Array === Utils.getType(instance, key);
    };
    Utils.getUriFromPrefixedName = function (prefixedUri, prefixesMap) {
        var holder;
        var qualifiedNameArr = prefixedUri.split(':');
        if (qualifiedNameArr.length > 0) {
            var uri = prefixesMap[qualifiedNameArr[0]];
            if (uri) {
                holder = uri + qualifiedNameArr[1];
            }
        }
        return holder;
    };
    /**
     * @hidden
     * @param beanTypeUri
     * @param model
     */
    Utils.doesModelContainBeanType = function (beanTypeUri, model) {
        var holder = false;
        var ind = model.findIndex(function (m) {
            return m.object.value === beanTypeUri;
        });
        if (ind !== -1) {
            holder = true;
        }
        return holder;
    };
    /**
     * @hidden
     * @param instance
     */
    Utils.getTypeNameFromInstance = function (instance) {
        return instance.toString().trim().split(/[\s\()]/g)[1];
    };
    /**
     * @hidden
     * @param type
     * @param cache
     */
    Utils.getCachedType = function (type, cache) {
        // tslint:disable-next-line:triple-equals
        var typeName = type.getJsonObjectMapperCacheKey != undefined ? type.getJsonObjectMapperCacheKey() : Utils.getTypeNameFromInstance(type);
        if (!cache[typeName]) {
            cache[typeName] = new type();
        }
        return cache[typeName];
    };
    /**
     * @hidden
     * @param subject
     * @param prefix
     * @param prefixesMap
     */
    Utils.getUUIDFromResourceSubject = function (subject, prefix, prefixesMap) {
        var result = subject;
        var prefixUri = prefixesMap[prefix];
        if (prefixUri) {
            result = result.replace(prefixUri, '');
        }
        return result;
    };
    return Utils;
}());
exports.Utils = Utils;
//# sourceMappingURL=Utils.js.map