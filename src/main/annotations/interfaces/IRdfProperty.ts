export interface IRdfProperty {
    // can be used to identify type of object at runtime (needed for deserialization)
    clazz?: any;
    /**
     * @prop - Predicate in the form of prefix:somename or a full URI
     */
    prop: string;
    /**
     * XSDDataType class must be used, maybe switch to enum in the future
     */
    xsdType?: string;

    /**
     * language tag e.g. "someString"@en
     */
    lang?: string;

    /**
     * Serializer must either extend AbstractBNodeSerializer class or implement the IRDFSerializer interface
     */

    serializer?: any;

    deserializer?: any;

}
