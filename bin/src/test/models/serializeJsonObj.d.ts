import { Triple } from 'n3';
import { AbstractBNodeSerializer } from '../../main/annotations/interfaces/AbstractBNodeSerializer';
export interface UAddress {
    streetName: string;
    streetNumber: number;
    isRegistered: boolean;
}
export declare class AddressSerializer extends AbstractBNodeSerializer {
    constructor();
    serialize(value: Object): Triple[];
}
export declare class UserJsonObject {
    name: string;
    address: UAddress;
}
