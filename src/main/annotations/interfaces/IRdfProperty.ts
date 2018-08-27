export interface IRdfProperty {
    // can be used to identify type of object at runtime
    clazz?: Function;
    /**
     * @prop - Predicate in the form of prefix:somename or a full URI
     */
    prop: string;
    /**
     * XSDDataType class must be used, maybe switch to enum in the future
     */
    xsdType?: string;

    enumOptions?: {enumType: any; serializer?: any; deserializer?: any};
}
