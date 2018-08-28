import * as N3 from 'n3';
import * as RDF from 'rdf-js';
import 'reflect-metadata';
import {IRdfNamespaces} from './annotations/interfaces/IRdfNamespaces';

export class Utils {
    public static getType(instance: any, key: string): any {
        return Reflect.getMetadata('design:type', instance, key);
    }

    public static isArrayType(instance: any, key: string): boolean {
        return Array === Utils.getType(instance, key);
    }

    public static getUriFromPrefixedName(prefixedUri: string, prefixesMap: IRdfNamespaces): string {
        let holder;
        const qualifiedNameArr: string[] = prefixedUri.split(':');
        if (qualifiedNameArr.length > 0) {
            // const prefixUriMap: IRdfNamespaces = prefixesMap.find((e: IRdfNamespaces) => {
            //     return e.prefix === qualifiedNameArr[0];
            // });
            const uri = prefixesMap[qualifiedNameArr[0]];
            if (uri) {
                holder = uri + qualifiedNameArr[1];
            }
        }
        return holder;
    }

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

    public static getTypeNameFromInstance(instance): string {
        return instance.toString().trim().split(/[\s\()]/g)[1];
    }

    public static getCachedType(type: any, cache: Object): any {
        // tslint:disable-next-line:triple-equals
        const typeName: string = type.getJsonObjectMapperCacheKey != undefined ? type.getJsonObjectMapperCacheKey() : Utils.getTypeNameFromInstance(type);
        if (!cache[typeName]) {
            cache[typeName] = new type();
        }
        return cache[typeName];
    }

    public static getUUIDFromResourceSubject(subject: string, prefix: string, prefixesMap: IRdfNamespaces): any {
        let result = subject;
        const prefixUri: string = prefixesMap[prefix];
        if (prefixUri) {
            result = result.replace(prefixUri, '');
        }
        return result;
    }

}
