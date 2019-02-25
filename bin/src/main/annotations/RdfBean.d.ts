/**
 * **Optional** - Defines the type (xsd:type) of Resource,
 *
 * Basic usage and result example:
 *
 * ```ts
 * @RdfPrefixes({
 *   foaf: 'http://xmlns.com/foaf/0.1/',
 *   person: 'http://example.com/Person/'
 * })
 * @RdfBean('foaf:Person')
 * export class Person {
 *  @RdfSubject('person')
 *  public name: string;
 * }
 *
 * const p = new Person();
 * p.name = 'John';
 * RdfMapper.serialize(p)
 * ```
 * produces the following TURTLE:
 *
 * ```
 * @prefix foaf: <http://xmlns.com/foaf/0.1/>.
 * @prefix person: <http://example.com/Person/>.
 * @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
 *
 * person:John a foaf:Person;
 * ```
 *
 * @param value - a IRI in the form of 'http(s)://schema.org/Person or prefixed version e.g. 'schema:Person'
 * @constructor
 */
export declare const RdfBean: (value: string) => (target: any) => any;
