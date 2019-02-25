export interface IRdfSubjectMetadata {
    /**
     * @key - Class property name
     */
    key: string;
    /**
     * @val - This value is set when the property is set
     */
    val: string;
    /**
     * @predicate - prefix or a full URI that will be prepended before the value
     */
    prop: string;
}
