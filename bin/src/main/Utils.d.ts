import * as N3 from 'n3';
import 'reflect-metadata';
import { IRdfPrefixes } from './annotations/interfaces/IRdfPrefixes';
export declare class Utils {
    /**
     * @hidden
     * @param instance
     * @param key
     */
    static getType(instance: any, key: string): any;
    /**
     * @hidden
     * @param instance
     * @param key
     */
    static isArrayType(instance: any, key: string): boolean;
    static getUriFromPrefixedName(prefixedUri: string, prefixesMap: IRdfPrefixes): string;
    /**
     * @hidden
     * @param beanTypeUri
     * @param model
     */
    static doesModelContainBeanType(beanTypeUri: string, model: N3.Quad[]): boolean;
    /**
     * @hidden
     * @param instance
     */
    static getTypeNameFromInstance(instance: any): string;
    /**
     * @hidden
     * @param type
     * @param cache
     */
    static getCachedType(type: any, cache: Object): any;
    /**
     * @hidden
     * @param subject
     * @param prefix
     * @param prefixesMap
     */
    static getUUIDFromResourceSubject(subject: string, prefix: string, prefixesMap: IRdfPrefixes): any;
}
