// https://stackoverflow.com/questions/39622778/what-is-new-in-typescript
import {ISerializer} from './ISerializer';

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

    serializer?: any;

    deserializer?: any;

}
