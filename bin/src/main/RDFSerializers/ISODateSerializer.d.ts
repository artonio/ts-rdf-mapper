import { IRDFSerializer } from '../annotations/interfaces/IRDFSerializer';
export declare class ISODateSerializer implements IRDFSerializer {
    serialize(value: Date): string;
}
