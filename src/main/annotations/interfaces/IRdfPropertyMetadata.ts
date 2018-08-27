import {IRdfProperty} from './IRdfProperty';

export interface IRdfPropertyMetadata {
    /**
     * @key - Class property name
     */
    key: string;
    /**
     * @val - This value is set when the property is set
     */
    val: string;
    /**
     * @decoratorMetadata - actual decorator metadata
     */
    decoratorMetadata: IRdfProperty;
}
