import { AbstractTreeNode } from '../../main/annotations/interfaces/AbstractTreeNode';
import { IRDFSerializer } from '../../main/annotations/interfaces/IRDFSerializer';
export declare class PersonMultipleDataTypes {
    uuid: string;
    name: string;
    englishName: string;
    gender: string;
    age: number;
    isAdult: boolean;
    isChild: boolean;
    weight: number;
    height: number;
    buoyancy: number;
}
export declare class PersonHasFriend {
    uuid: string;
    name: string;
    knows: PersonHasFriend;
}
export declare class Addr {
    uuid: string;
    streetName: string;
    houseNum: number;
}
export declare class Per {
    uuid: string;
    addresses: Addr[];
}
export declare abstract class Base {
    baseProp: string;
}
export declare class SuperBase extends Base {
    uuid: string;
    extendedProp: string;
}
export declare class Person {
    uuid: string;
    firstName: string;
    name: string;
    nick: string;
    surname: string;
    title: string;
}
export declare class DaysSerializer implements IRDFSerializer {
    serialize(value: Days): string;
}
export declare enum Days {
    Sun = 0,
    Mon = 1,
    Tues = 2,
    Wed = 3,
    Thurs = 4,
    Fri = 5,
    Sat = 6
}
export declare class Calendar {
    uuid: string;
    day: Days;
}
export declare class Month {
    uuid: string;
    days: string[];
}
export declare class MonthWithIRI {
    uuid: string;
    days: string[];
}
export declare class SampleTreeNode extends AbstractTreeNode {
    uuid: string;
    children: SampleTreeNode[];
    label: string;
    _children: SampleTreeNode[];
    index: number;
}
export declare const sampleTreeNodeTTL = "\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix treeNode: <http://example.com/treeNode/>.\n\n_:n3-9 a foaf:SampleTreeNode;\n    foaf:label \"Sub Node 1\"^^xsd:string.\n_:n3-8 a foaf:SampleTreeNode;\n    foaf:hasNode _:n3-11, _:n3-9, _:n3-10;\n    foaf:label \"Top Parent\"^^xsd:string.\n_:n3-11 a foaf:SampleTreeNode;\n    treeNode:gindex \"2\"^^xsd:integer;\n    foaf:label \"Sub Node 3\"^^xsd:string.\n_:n3-10 foaf:label \"Sub Node 2\"^^xsd:string;\n    a foaf:SampleTreeNode;\n    treeNode:gindex \"1\"^^xsd:integer.\n";
export declare const invalidTTL = "\n@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix foaf:  <http://xmlns.com/foaf/0.1/> .\nprefix person: <http://example.com/Person/> .\n\nperson:1234567      a                       foaf:Person ;\n        foaf:firstName          \"David\" ;\n        foaf:name               \"David Banner\" ;\n        foaf:nick               \"hulk\" ;\n        foaf:surname            \"Banner\" ;\n        foaf:title              \"Mr\"\n";
export declare const personTTL = "\n@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix foaf:  <http://xmlns.com/foaf/0.1/> .\n@prefix person: <http://example.com/Person/> .\n\nperson:1234567      a                       foaf:Person ;\n        foaf:firstName          \"David\" ;\n        foaf:name               \"David Banner\" ;\n        foaf:nick               \"hulk\" ;\n        foaf:surname            \"Banner\" ;\n        foaf:title              \"Mr\" .\n";
export declare const ttlMultipleTypes = "\n@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix person: <http://example.com/Person/>.\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n\nperson:123345dfx a foaf:Person;\n    person:name \"Anton\"^^xsd:string;\n    person:gender \"M\"^^xsd:string;\n    person:age \"32\"^^xsd:int;\n    person:isAdult \"true\"^^xsd:boolean;\n    person:weight \"95.5\"^^xsd:double;\n    person:height \"198.5\"^^xsd:long;\n    person:buoyancy \"53.2\"^^xsd:float.\n";
export declare const recipeVideoTTL = "\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n@prefix schema: <http://schema.org/>.\n\n_:n3-1 schema:name \"Japanese Cheesecake instructions\"^^xsd:string.\n_:n3-0 a schema:Recipe;\n    schema:recipeName \"Cheesecake\"^^xsd:string;\n    schema:video _:n3-1.";
