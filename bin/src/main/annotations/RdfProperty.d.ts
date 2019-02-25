import 'reflect-metadata';
import { IRdfProperty } from './interfaces/IRdfProperty';
/**
 * Used to annotate object properties
 * @param prop
 * @constructor
 */
export declare const RdfProperty: (prop: IRdfProperty) => (target: Object, key: string) => void;
