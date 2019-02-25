import 'reflect-metadata';
import { IRdfPrefixes } from './interfaces/IRdfPrefixes';
/**
 * Responsible of defining prefixes and it's corresponding URIs
 *
 * Basic usage example:
 *
 * ```ts
 * @RdfPrefixes({
 *   foaf: 'http://xmlns.com/foaf/0.1/',
 *   person: 'http://example.com/Person/'
 * })
 * export class Person {
 *
 * }
 * ```
 */
export declare const RdfPrefixes: (prefixes?: IRdfPrefixes) => (target: any) => any;
