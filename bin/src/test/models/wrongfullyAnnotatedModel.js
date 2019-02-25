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
var PersonTypeAndLang = /** @class */ (function () {
    function PersonTypeAndLang() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('person'),
        __metadata("design:type", String)
    ], PersonTypeAndLang.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:firstName', xsdType: XSDDataType_1.XSDDataType.XSD_STRING, lang: 'en' }),
        __metadata("design:type", String)
    ], PersonTypeAndLang.prototype, "firstName", void 0);
    PersonTypeAndLang = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            person: 'http://example.com/Person/'
        }),
        RdfBean_1.RdfBean('foaf:Person')
    ], PersonTypeAndLang);
    return PersonTypeAndLang;
}());
exports.PersonTypeAndLang = PersonTypeAndLang;
var PersonTypeAndIsIRI = /** @class */ (function () {
    function PersonTypeAndIsIRI() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('person'),
        __metadata("design:type", String)
    ], PersonTypeAndIsIRI.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:firstName', xsdType: XSDDataType_1.XSDDataType.XSD_STRING, isIRI: true }),
        __metadata("design:type", String)
    ], PersonTypeAndIsIRI.prototype, "firstName", void 0);
    PersonTypeAndIsIRI = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            person: 'http://example.com/Person/'
        }),
        RdfBean_1.RdfBean('foaf:Person')
    ], PersonTypeAndIsIRI);
    return PersonTypeAndIsIRI;
}());
exports.PersonTypeAndIsIRI = PersonTypeAndIsIRI;
//# sourceMappingURL=wrongfullyAnnotatedModel.js.map