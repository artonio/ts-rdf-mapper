import {IRDFSerializer} from '../../main/annotations/interfaces/IRDFSerializer';
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
export class PersonMultipleDataTypes {

    @RdfSubject('person')
    public uuid: string;

    @RdfProperty({predicate: 'person:name', xsdType: XSDDataType.XSD_STRING})
    public name: string;

    @RdfProperty({predicate: 'person:name', lang: 'en'})
    public englishName: string;

    @RdfProperty({predicate: 'person:gender', xsdType: XSDDataType.XSD_STRING})
    public gender: string;

    @RdfProperty({predicate: 'person:age', xsdType: XSDDataType.XSD_INT})
    public age: number;

    @RdfProperty({predicate: 'person:isAdult', xsdType: XSDDataType.XSD_BOOLEAN})
    public isAdult: boolean;

    @RdfProperty({predicate: 'person:weight', xsdType: XSDDataType.XSD_DOUBLE})
    public weight: number;

    @RdfProperty({predicate: 'person:height', xsdType: XSDDataType.XSD_LONG})
    public height: number;

    @RdfProperty({predicate: 'person:buoyancy', xsdType: XSDDataType.XSD_FLOAT})
    public buoyancy: number;

}

@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    person: 'http://example.com/Person/'
})
@RdfBean('foaf:Person')
export class PersonHasFriend {
    @RdfSubject('person')
    public uuid: string;

    @RdfProperty({predicate: 'foaf:name', xsdType: XSDDataType.XSD_STRING})
    public name: string;

    @RdfProperty({predicate: 'foaf:knows', clazz: PersonHasFriend, inverseOfPredicate: 'foaf:knows'})
    public knows: PersonHasFriend;
}

@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    person: 'http://example.com/Person/',
    address: 'http://xmlns.com/foaf/0.1/address/'
})
@RdfBean('foaf:Address')
export class Addr {
    @RdfSubject('address')
    public uuid: string;

    @RdfProperty({predicate: 'address:streetName', xsdType: XSDDataType.XSD_STRING})
    public streetName: string;

    @RdfProperty({predicate: 'address:houseNum', xsdType: XSDDataType.XSD_STRING})
    public houseNum: number;
}

@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    person: 'http://example.com/Person/'
})
@RdfBean('foaf:Person')
export class Per {
    @RdfSubject('person')
    public uuid: string;

    @RdfProperty({predicate: 'person:hasAddress', clazz: Addr})
    public addresses: Addr[];
}

export abstract class Base {
    @RdfProperty({predicate: 'foaf:baseProp', xsdType: XSDDataType.XSD_STRING})
    baseProp: string;
}

@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    person: 'http://example.com/Person/'
})
@RdfBean('foaf:SuperBase')
export class SuperBase extends Base {
    @RdfSubject('foaf')
    public uuid: string;

    @RdfProperty({predicate: 'foaf:extendedProp', xsdType: XSDDataType.XSD_STRING})
    extendedProp: string;
}

@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    person: 'http://example.com/Person/'
})
@RdfBean('foaf:Person')
export class Person {
    @RdfSubject('person')
    public uuid: string;

    @RdfProperty({predicate: 'foaf:firstName', xsdType: XSDDataType.XSD_STRING})
    firstName: string;

    @RdfProperty({predicate: 'foaf:name', xsdType: XSDDataType.XSD_STRING})
    name: string;

    @RdfProperty({predicate: 'foaf:nick', xsdType: XSDDataType.XSD_STRING})
    nick: string;

    @RdfProperty({predicate: 'foaf:surname', xsdType: XSDDataType.XSD_STRING})
    surname: string;

    @RdfProperty({predicate: 'foaf:title', xsdType: XSDDataType.XSD_STRING})
    title: string;

}

export class DaysSerializer implements IRDFSerializer {
    serialize(value: Days): string {
        return `${Days[value]}`;
    }
}

export enum Days {
    Sun, Mon, Tues, Wed, Thurs, Fri, Sat
}

@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    calendar: 'http://example.com/Calendar/'
})
@RdfBean('foaf:Calendar')
export class Calendar {
    @RdfSubject('calendar')
    public uuid: string;

    @RdfProperty({predicate: 'foaf:day', xsdType: XSDDataType.XSD_STRING, clazz: Days, serializer: DaysSerializer})
    public day: Days;

}

@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    month: 'http://example.com/Month/'
})
@RdfBean('foaf:Month')
export class Month {
    @RdfSubject('month')
    public uuid: string;

    @RdfProperty({predicate: 'foaf:day', xsdType: XSDDataType.XSD_STRING})
    public days: string[];
}

@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    month: 'http://example.com/Month/'
})
@RdfBean('foaf:Month')
export class MonthWithIRI {
    @RdfSubject('month')
    public uuid: string;

    @RdfProperty({predicate: 'foaf:day', isIRI: true})
    public days: string[];
}

@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    treeNode: 'http://example.com/treeNode/'
})
@RdfBean('foaf:SampleTreeNode')
export class SampleTreeNode {

    @RdfProperty({predicate: 'foaf:hasNode', clazz: SampleTreeNode, isArray: true})
    public children: SampleTreeNode[];

    @RdfProperty({predicate: 'foaf:label', xsdType: XSDDataType.XSD_STRING})
    public label: string;

    @RdfProperty({predicate: 'foaf:hasNode', clazz: SampleTreeNode, isArray: true})
    set _children(value: SampleTreeNode[]) {
        value.sort((a, b) => {
            return a.index - b.index;
        });
        this.children = value;
    }

    @RdfProperty({predicate: 'treeNode:gindex', xsdType: XSDDataType.XSD_INTEGER})
    index: number;
}

export const sampleTreeNodeTTL = `
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix treeNode: <http://example.com/treeNode/>.

_:n3-9 a foaf:SampleTreeNode;
    foaf:label "Sub Node 1"^^xsd:string.
_:n3-8 a foaf:SampleTreeNode;
    foaf:hasNode _:n3-11, _:n3-9, _:n3-10;
    foaf:label "Top Parent"^^xsd:string.
_:n3-11 a foaf:SampleTreeNode;
    treeNode:gindex "2"^^xsd:integer;
    foaf:label "Sub Node 3"^^xsd:string.
_:n3-10 foaf:label "Sub Node 2"^^xsd:string;
    a foaf:SampleTreeNode;
    treeNode:gindex "1"^^xsd:integer.
`;

export const invalidTTL = `
@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .
@prefix foaf:  <http://xmlns.com/foaf/0.1/> .
prefix person: <http://example.com/Person/> .

person:1234567      a                       foaf:Person ;
        foaf:firstName          "David" ;
        foaf:name               "David Banner" ;
        foaf:nick               "hulk" ;
        foaf:surname            "Banner" ;
        foaf:title              "Mr"
`
;

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

export const ttlMultipleTypes = `
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix person: <http://example.com/Person/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

person:123345dfx a foaf:Person;
    person:name "Anton"^^xsd:string;
    person:gender "M"^^xsd:string;
    person:age "32"^^xsd:int;
    person:isAdult "true"^^xsd:boolean;
    person:weight "95.5"^^xsd:double;
    person:height "198.5"^^xsd:long;
    person:buoyancy "53.2"^^xsd:float.
`;

export const recipeVideoTTL = `
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix schema: <http://schema.org/>.

_:n3-1 schema:name "Japanese Cheesecake instructions"^^xsd:string.
_:n3-0 a schema:Recipe;
    schema:recipeName "Cheesecake"^^xsd:string;
    schema:video _:n3-1.`;
