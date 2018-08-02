import {RdfBean} from '../../main/annotations/RdfBean';
import {RdfNamespaces} from '../../main/annotations/RdfNamespaces';
import {RdfProperty} from '../../main/annotations/RdfProperty';
import {RdfSubject} from '../../main/annotations/RdfSubject';
import {XSDDataType} from '../../main/annotations/XSDDataType';

@RdfNamespaces([
    {prefix: 'foaf', uri: 'http://xmlns.com/foaf/0.1/'},
    {prefix: 'person', uri: 'http://example.com/Person/'},
    {prefix: 'address', uri: 'http://xmlns.com/foaf/0.1/address/'}
])
@RdfBean('foaf:Address')
export class Addr {
    @RdfSubject('address')
    public uuid: string;

    @RdfProperty({prop: 'address:streetName', xsdType: XSDDataType.XSD_STRING})
    public streetName: string;

    @RdfProperty({prop: 'address:houseNum', xsdType: XSDDataType.XSD_STRING})
    public houseNum: number;
}

@RdfNamespaces([
    {prefix: 'foaf', uri: 'http://xmlns.com/foaf/0.1/'},
    {prefix: 'person', uri: 'http://example.com/Person/'}
])
@RdfBean('foaf:Person')
export class Per {
    @RdfSubject('person')
    public uuid: string;

    @RdfProperty({prop: 'person:hasAddress', clazz: Addr})
    public addresses: Addr[];
}

export abstract class Base {
    @RdfProperty({prop: 'foaf:baseProp', xsdType: XSDDataType.XSD_STRING})
    baseProp: string;
}

@RdfNamespaces([
    {prefix: 'foaf', uri: 'http://xmlns.com/foaf/0.1/'},
    {prefix: 'person', uri: 'http://example.com/Person/'}
])
@RdfBean('foaf:SuperBase')
export class SuperBase extends Base {
    @RdfSubject('foaf')
    public uuid: string;

    @RdfProperty({prop: 'foaf:extendedProp', xsdType: XSDDataType.XSD_STRING})
    extendedProp: string;
}

@RdfNamespaces([
    {prefix: 'foaf', uri: 'http://xmlns.com/foaf/0.1/'},
    {prefix: 'person', uri: 'http://example.com/Person/'}
])
@RdfBean('foaf:Person')
export class Person {
    @RdfSubject('person')
    public uuid: string;

    @RdfProperty({prop: 'foaf:firstName', xsdType: XSDDataType.XSD_STRING})
    firstName: string;

    @RdfProperty({prop: 'foaf:name', xsdType: XSDDataType.XSD_STRING})
    name: string;

    @RdfProperty({prop: 'foaf:nick', xsdType: XSDDataType.XSD_STRING})
    nick: string;

    @RdfProperty({prop: 'foaf:surname', xsdType: XSDDataType.XSD_STRING})
    surname: string;

    @RdfProperty({prop: 'foaf:title', xsdType: XSDDataType.XSD_STRING})
    title: string;

}

export const personTTL = `
@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix foaf:  <http://xmlns.com/foaf/0.1/> .
@prefix person: <http://example.com/Person/> .

person:1234567      a                       foaf:Person ;
        foaf:firstName          "David" ;
        foaf:name               "David Banner" ;
        foaf:nick               "hulk" ;
        foaf:surname            "Banner" ;
        foaf:title              "Mr" .
`;
