export declare class Address {
    uuid: string;
    streetName: string;
}
export declare class PersonHasAddress {
    uuid: string;
    name: string;
    address: Address;
}
export declare const oneToOneRelationship = "\n@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix person: <http://example.com/Person/>.\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n@prefix address: <http://xmlns.com/foaf/0.1/address/>.\n\nperson:person-uuid a foaf:Person;\n    person:name \"John\"^^xsd:string.\n    person:person-uuid person:hasAddress address:address-uuid.\n\naddress:address-uuid a foaf:Address;\n    address:streetName \"Jasmine\"^^xsd:string.\n";
