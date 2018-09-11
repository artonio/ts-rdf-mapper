import {RdfBean} from '../../main/annotations/RdfBean';
import {RdfPrefixes} from '../../main/annotations/RdfPrefixes';
import {RdfProperty} from '../../main/annotations/RdfProperty';
import {RdfSubject} from '../../main/annotations/RdfSubject';
import {XSDDataType} from '../../main/annotations/XSDDataType';

// @RdfPrefixes({
//     foaf: 'http://xmlns.com/foaf/0.1/',
//     person: 'http://example.com/Person/'
// })
@RdfBean('http://xmlns.com/foaf/0.1/Person')
export class PersonNonPrefixed {

    @RdfSubject('http://example.com/Person/')
    public uuid: string;

    @RdfProperty({predicate: 'http://example.com/Person/name', xsdType: XSDDataType.XSD_STRING})
    public name: string;

    @RdfProperty({predicate: 'http://example.com/Person/name', lang: 'en'})
    public englishName: string;

    @RdfProperty({predicate: 'http://example.com/Person/gender', xsdType: XSDDataType.XSD_STRING})
    public gender: string;

    @RdfProperty({predicate: 'http://example.com/Person/age', xsdType: XSDDataType.XSD_INT})
    public age: number;

    @RdfProperty({predicate: 'http://example.com/Person/isAdult', xsdType: XSDDataType.XSD_BOOLEAN})
    public isAdult: boolean;

    @RdfProperty({predicate: 'http://example.com/Person/weight', xsdType: XSDDataType.XSD_DOUBLE})
    public weight: number;

    @RdfProperty({predicate: 'http://example.com/Person/height', xsdType: XSDDataType.XSD_LONG})
    public height: number;

    @RdfProperty({predicate: 'http://example.com/Person/buoyancy', xsdType: XSDDataType.XSD_FLOAT})
    public buoyancy: number;

}
