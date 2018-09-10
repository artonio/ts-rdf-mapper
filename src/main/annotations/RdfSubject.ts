import {IRdfSubjectMetadata} from './interfaces/IRdfSubjectMetadata';

const makeRDFSubjectMapper = <T>(prototype: any, key: string, prop: any) => {
    const values = new Map<any, T>();
    const metadataValForDesirealization: IRdfSubjectMetadata = {key: key, val: null, prop: prop};
    Reflect.defineMetadata('RdfSubject-non-instance', metadataValForDesirealization, prototype);
    Object.defineProperty(prototype, key, {
        set(firstValue: any) {
            Object.defineProperty(this, key, {
                get() {
                    return values.get(this);
                },
                set(value: any) {
                    const metadataValForSirealization: IRdfSubjectMetadata = {key: key, val: value, prop: prop};
                    Reflect.defineMetadata('RdfSubject', metadataValForSirealization, this);
                    values.set(this, value);
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
 * **Optional** - Resource Identifier. If this decorator is absent then the subject will be a Blank Node
 *
 *  Basic usage and result example:
 *
 * ```ts
 * @RdfNamespaces({
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
 * @param prop
 * @constructor
 */
export const RdfSubject = (prop: string) => {
    return (target: Object, key: string) => {
        makeRDFSubjectMapper(target, key, prop);
    };
};
