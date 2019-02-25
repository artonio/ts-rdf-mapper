import 'reflect-metadata';
export declare class SerializerProcessor {
    private n3Writer;
    private quadsArr;
    private prefixes;
    private serializers;
    private readonly xsdType;
    constructor();
    /**
     * Serialize object or array of objects to turtle
     * @param target - Object or Array of Objects to be serialized to turtle
     * @returns - Turtle representation of the object(s)
     */
    serialize<T>(target: T | T[]): string;
    private process;
    private processClazzAnnotatedPropertyValue;
    private processPrimitiveValue;
    private processClazzAnnotatedObjectValue;
    private processPrimiteValueWithAnnotatedSerializer;
    private processValueOfDateTypeWithDefaultSerializer;
    private processArrayOfObjectValues;
    private processArrayOfPrimitiveValues;
    private makeLiteral;
    private makeSubject;
    private makePredicate;
    private createQuad;
    private getTTLString;
    private getN3NsPrefixObject;
    private sortQuads;
    /**
     * Checks to see if the serializer already exists or not.
     * If not, creates a new one and caches it, returns the
     * cached instance otherwise.
     */
    private getOrCreateSerializer;
}
