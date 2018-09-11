import * as N3 from 'n3';
import 'reflect-metadata';
import {IRdfPrefixes} from './annotations/interfaces/IRdfPrefixes';

export class Utils {
    /**
     * @hidden
     * @param instance
     * @param key
     */
    public static getType(instance: any, key: string): any {
        return Reflect.getMetadata('design:type', instance, key);
    }

    /**
     * @hidden
     * @param instance
     * @param key
     */
    public static isArrayType(instance: any, key: string): boolean {
        return Array === Utils.getType(instance, key);
    }

    public static getUriFromPrefixedName(prefixedUri: string, prefixesMap: IRdfPrefixes): string {
        let holder;
        const qualifiedNameArr: string[] = prefixedUri.split(':');
        if (qualifiedNameArr.length > 0) {
            const uri = prefixesMap[qualifiedNameArr[0]];
            if (uri) {
                holder = uri + qualifiedNameArr[1];
            }
        }
        return holder;
    }

    /**
     * @hidden
     * @param beanTypeUri
     * @param model
     */
    public static doesModelContainBeanType(beanTypeUri: string, model: N3.Quad[]): boolean {
        let holder = false;

        const ind = model.findIndex(m => {
            return m.object.value === beanTypeUri;
        });

        if (ind !== -1) {
            holder = true;
        }

        return holder;
    }

    /**
     * @hidden
     * @param instance
     */
    public static getTypeNameFromInstance(instance): string {
        return instance.toString().trim().split(/[\s\()]/g)[1];
    }

    /**
     * @hidden
     * @param type
     * @param cache
     */
    public static getCachedType(type: any, cache: Object): any {
        // tslint:disable-next-line:triple-equals
        const typeName: string = type.getJsonObjectMapperCacheKey != undefined ? type.getJsonObjectMapperCacheKey() : Utils.getTypeNameFromInstance(type);
        if (!cache[typeName]) {
            cache[typeName] = new type();
        }
        return cache[typeName];
    }

    /**
     * @hidden
     * @param subject
     * @param prefix
     * @param prefixesMap
     */
    public static getUUIDFromResourceSubject(subject: string, prefix: string, prefixesMap: IRdfPrefixes): any {
        let result = subject;
        const prefixUri: string = prefixesMap[prefix];
        if (prefixUri) {
            result = result.replace(prefixUri, '');
        }
        return result;
    }

}
