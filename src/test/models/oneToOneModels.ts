import {RdfBean} from '../../main/annotations/RdfBean';
import {RdfNamespaces} from '../../main/annotations/RdfNamespaces';
import {RdfProperty} from '../../main/annotations/RdfProperty';
import {RdfSubject} from '../../main/annotations/RdfSubject';
import {XSDDataType} from '../../main/annotations/XSDDataType';

@RdfNamespaces({
    foaf: 'http://xmlns.com/foaf/0.1/',
    address: 'http://xmlns.com/foaf/0.1/address/'
})
@RdfBean('foaf:Address')
export class Address {
    @RdfSubject('address')
    public uuid: string;

    @RdfProperty({prop: 'address:streetName', xsdType: XSDDataType.XSD_STRING})
    public streetName: string;
}

@RdfNamespaces({
    foaf: 'http://xmlns.com/foaf/0.1/',
    person: 'http://example.com/Person/'
})
@RdfBean('foaf:Person')
export class PersonHasAddress {

    @RdfSubject('person')
    public uuid: string;

    @RdfProperty({prop: 'person:name', xsdType: XSDDataType.XSD_STRING})
    public name: string;

    @RdfProperty({prop: 'person:hasAddress', clazz: Address})
    public address: Address;

}

export const oneToOneRelationship = `
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix person: <http://example.com/Person/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix address: <http://xmlns.com/foaf/0.1/address/>.

person:person-uuid a foaf:Person;
    person:name "John"^^xsd:string.
    person:person-uuid person:hasAddress address:address-uuid.

address:address-uuid a foaf:Address;
    address:streetName "Jasmine"^^xsd:string.
`;
