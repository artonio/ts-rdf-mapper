import {IRdfProperty} from './IRdfProperty';

export interface IRdfPropertyMetadata {
    key: string;
    val: string;
    decoratorMetadata: IRdfProperty;
    target?: any;
}
