import 'reflect-metadata';
import {IRdfNamespaces} from './annotations/interfaces/IRdfNamespaces';

export class Utils {
    public static getType(instance: any, key: string): any {
        return Reflect.getMetadata('design:type', instance, key);
    }

    public static isArrayType(instance: any, key: string): boolean {
        return Array === Utils.getType(instance, key);
    }

    public static getUriFromPrefixedName(prefixedUri: string, prefixesMap: IRdfNamespaces[]): string {
        let holder;
        const qualifiedNameArr: string[] = prefixedUri.split(':');
        if (qualifiedNameArr.length > 0) {
            const prefixUriMap: IRdfNamespaces = prefixesMap.find((e: IRdfNamespaces) => {
                return e.prefix === qualifiedNameArr[0];
            });
            if (prefixUriMap) {
                holder = prefixUriMap.uri + qualifiedNameArr[1];
            }
        }
        return holder;
    }

    public static doesModelContainBeanType(beanTypeUri: string, model: any[]): boolean {
        let holder = false;

        const ind = model.findIndex(m => {
            return m.object.id === beanTypeUri;
        });

        if (ind !== -1) {
            holder = true;
        }

        return holder;
    }
}