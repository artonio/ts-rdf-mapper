import {IRDFSerializer} from '../annotations/interfaces/IRDFSerializer';

export class ISODateSerializer implements IRDFSerializer {
    serialize(value: Date): string {
        return value.toISOString();
    }
}
