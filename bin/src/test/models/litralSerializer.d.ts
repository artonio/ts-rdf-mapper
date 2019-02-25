import { IRDFSerializer } from '../../main/annotations/interfaces/IRDFSerializer';
export declare class RegistrationDateSerializer implements IRDFSerializer {
    serialize(value: number): string;
}
export declare class BirthDateSerializer implements IRDFSerializer {
    serialize(value: Date): string;
}
export declare class User {
    uuid: string;
    regDate: number;
    birthDate: Date;
}
