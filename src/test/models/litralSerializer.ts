import {IRDFSerializer} from '../../main/annotations/interfaces/IRDFSerializer';
import {RdfBean} from '../../main/annotations/RdfBean';
import {RdfNamespaces} from '../../main/annotations/RdfNamespaces';
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

@RdfNamespaces({
    foaf: 'http://xmlns.com/foaf/0.1/',
    user: 'http://example.com/User/'
})
@RdfBean('foaf:User')
export class User {
    @RdfSubject('user')
    public uuid: string;

    @RdfProperty({prop: 'user:registrationDate', xsdType: XSDDataType.XSD_DATE_TIME, serializer: RegistrationDateSerializer})
    public regDate: number;

    @RdfProperty({prop: 'user:birthday', xsdType: XSDDataType.XSD_DATE_TIME, serializer: BirthDateSerializer, clazz: Date})
    public birthDate: Date;
}
