import {RdfBean} from '../../main/annotations/RdfBean';
import {RdfPrefixes} from '../../main/annotations/RdfPrefixes';
import {RdfProperty} from '../../main/annotations/RdfProperty';
import {RdfSubject} from '../../main/annotations/RdfSubject';
import {XSDDataType} from '../../main/annotations/XSDDataType';

@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    person: 'http://example.com/Person/'
})
@RdfBean('foaf:Person')
export class PersonTypeAndLang {
    @RdfSubject('person')
    public uuid: string;

    @RdfProperty({predicate: 'foaf:firstName', xsdType: XSDDataType.XSD_STRING, lang: 'en'})
    firstName: string;

}

@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    person: 'http://example.com/Person/'
})
@RdfBean('foaf:Person')
export class PersonTypeAndIsIRI {
    @RdfSubject('person')
    public uuid: string;

    @RdfProperty({predicate: 'foaf:firstName', xsdType: XSDDataType.XSD_STRING, isIRI: true})
    firstName: string;

}
