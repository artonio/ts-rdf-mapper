import {IRDFSerializer} from '../../main/annotations/interfaces/IRDFSerializer';
import {RdfBean} from '../../main/annotations/RdfBean';
import {RdfPrefixes} from '../../main/annotations/RdfPrefixes';
import {RdfProperty} from '../../main/annotations/RdfProperty';
import {RdfSubject} from '../../main/annotations/RdfSubject';
import {XSDDataType} from '../../main/annotations/XSDDataType';

export class RegistrationDateSerializer implements IRDFSerializer {
    serialize(value: number): string {
        return new Date(value).toISOString();
    }
}

export class BirthDateSerializer implements IRDFSerializer {
    serialize(value: Date): string {
        return value.toISOString();
    }
}

@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    user: 'http://example.com/User/'
})
@RdfBean('foaf:User')
export class User {
    @RdfSubject('user')
    public uuid: string;

    @RdfProperty({predicate: 'user:registrationDate', xsdType: XSDDataType.XSD_DATE_TIME, serializer: RegistrationDateSerializer})
    public regDate: number;

    @RdfProperty({predicate: 'user:birthday', xsdType: XSDDataType.XSD_DATE_TIME})
    public birthDate: Date;
}
