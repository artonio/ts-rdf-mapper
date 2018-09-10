export interface IRdfProperty {
    /**
     * used to identify type of object at runtime (needed for deserialization)
     */
    clazz?: any;
    /**
     * @predicate - Predicate in the form of prefix:somename or a full URI
     */
    predicate: string;
    /**
     * [[XSDDataType]] can be used or a string
     */
    xsdType?: string;

    /**
     * language tag e.g. "someString"@en
     */
    lang?: string;

    /**
     * Is RDF List
     */
    isRDFList?: boolean;

    /**
     * Serializer must either extend [[AbstractBNodeSerializer]] class or implement the [[IRDFSerializer]] interface
     */
    serializer?: any;

    deserializer?: any;
}
