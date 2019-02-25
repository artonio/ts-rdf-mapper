"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var RdfBean_1 = require("../../main/annotations/RdfBean");
var RdfPrefixes_1 = require("../../main/annotations/RdfPrefixes");
var RdfProperty_1 = require("../../main/annotations/RdfProperty");
var RdfSubject_1 = require("../../main/annotations/RdfSubject");
var XSDDataType_1 = require("../../main/annotations/XSDDataType");
var Address = /** @class */ (function () {
    function Address() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('address'),
        __metadata("design:type", String)
    ], Address.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'address:streetName', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], Address.prototype, "streetName", void 0);
    Address = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            address: 'http://xmlns.com/foaf/0.1/address/'
        }),
        RdfBean_1.RdfBean('foaf:Address')
    ], Address);
    return Address;
}());
exports.Address = Address;
var PersonHasAddress = /** @class */ (function () {
    function PersonHasAddress() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('person'),
        __metadata("design:type", String)
    ], PersonHasAddress.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'person:name', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], PersonHasAddress.prototype, "name", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'person:hasAddress', clazz: Address }),
        __metadata("design:type", Address)
    ], PersonHasAddress.prototype, "address", void 0);
    PersonHasAddress = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            person: 'http://example.com/Person/'
        }),
        RdfBean_1.RdfBean('foaf:Person')
    ], PersonHasAddress);
    return PersonHasAddress;
}());
exports.PersonHasAddress = PersonHasAddress;
exports.oneToOneRelationship = "\n@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix person: <http://example.com/Person/>.\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n@prefix address: <http://xmlns.com/foaf/0.1/address/>.\n\nperson:person-uuid a foaf:Person;\n    person:name \"John\"^^xsd:string.\n    person:person-uuid person:hasAddress address:address-uuid.\n\naddress:address-uuid a foaf:Address;\n    address:streetName \"Jasmine\"^^xsd:string.\n";
//# sourceMappingURL=oneToOneModels.js.map