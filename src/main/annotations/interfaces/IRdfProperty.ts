export interface IRdfProperty {
    /**
     * Used to identify type of object at runtime.
     *
     * **MUST** be used if the property extends Object i.e Person {}
     *
     *
     * ```ts
     * class Person {
     *     @RdfProperty({predicate: 'schema:hasFriend', clazz: Person})
     *     friend: Person;
     * }
     * ```
     *
     * this property is required for instances to be created when deserializing turtle to objects
     */
    clazz?: any;
    /**
     * @predicate - Predicate in the form of *prefix:somename* or a full *IRI*
     *
     *
     *
     *  **NOTE:** @[[RdfPrefixes]] defining schema must be present for the following example
     *
     *```ts
     *  class Person {
     *      @RdfProperty({predicate: 'schema:name', lang: 'en'})
     *      name: string;
     *  }
     *```
     *
     * or if @[[RdfPrefixes]] were not defined
     *
     *
     *```ts
     *  class Person {
     *      @RdfProperty({predicate: 'http://schema.org/name', lang: 'en'})
     *      name: string;
     *  }
     *```
     *
     */
    predicate: string;
    /**
     * [[XSDDataType]] can be used or a string
     *
     *```ts
     * class Person {
     *     @RdfProperty({predicate: 'schema:name', xsdType: XSDDataType.XSD_STRING})
     *     name: string;
     * }
     * ```
     */
    xsdType?: string;

    /**
     * language tag, i.e. 'en' or 'de' or 'ru', etc
     *
     * ```ts
     * class Person {
     *     @RdfProperty({predicate: 'schema:name', lang: 'en'})
     *     name: string;
     * }
     * ```
     */
    lang?: string;

    /**
     * Specify if this is an array
     *
     * this property is required for deserializing from turtle
     *
     * ```ts
     * class Person {
     *     @RdfProperty({predicate: 'schema:hasFriend', clazz: Person, isArray: true})
     *     friend: Person[];
     * }
     * ```
     *
     * or
     *
     * ```ts
     * class Person {
     *     @RdfProperty({predicate: 'schema:name', isArray: true})
     *     name: string[];
     * }
     * ```
     */
    isArray?: boolean;

    /**
     * Treat a string as IRI Resource
     */
    isIRI?: boolean;

    inverseOfPredicate?: string;

    /**
     * Serializer must either extend [[AbstractBNodeSerializer]] class or implement the [[IRDFSerializer]] interface
     */
    serializer?: any;

    deserializer?: any;
}
