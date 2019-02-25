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
var RdfProperty_1 = require("../../main/annotations/RdfProperty");
var RdfSubject_1 = require("../../main/annotations/RdfSubject");
var XSDDataType_1 = require("../../main/annotations/XSDDataType");
// @RdfPrefixes({
//     foaf: 'http://xmlns.com/foaf/0.1/',
//     person: 'http://example.com/Person/'
// })
var PersonNonPrefixed = /** @class */ (function () {
    function PersonNonPrefixed() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('http://example.com/Person/'),
        __metadata("design:type", String)
    ], PersonNonPrefixed.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'http://example.com/Person/name', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], PersonNonPrefixed.prototype, "name", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'http://example.com/Person/name', lang: 'en' }),
        __metadata("design:type", String)
    ], PersonNonPrefixed.prototype, "englishName", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'http://example.com/Person/gender', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], PersonNonPrefixed.prototype, "gender", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'http://example.com/Person/age', xsdType: XSDDataType_1.XSDDataType.XSD_INT }),
        __metadata("design:type", Number)
    ], PersonNonPrefixed.prototype, "age", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'http://example.com/Person/isAdult', xsdType: XSDDataType_1.XSDDataType.XSD_BOOLEAN }),
        __metadata("design:type", Boolean)
    ], PersonNonPrefixed.prototype, "isAdult", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'http://example.com/Person/weight', xsdType: XSDDataType_1.XSDDataType.XSD_DOUBLE }),
        __metadata("design:type", Number)
    ], PersonNonPrefixed.prototype, "weight", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'http://example.com/Person/height', xsdType: XSDDataType_1.XSDDataType.XSD_LONG }),
        __metadata("design:type", Number)
    ], PersonNonPrefixed.prototype, "height", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'http://example.com/Person/buoyancy', xsdType: XSDDataType_1.XSDDataType.XSD_FLOAT }),
        __metadata("design:type", Number)
    ], PersonNonPrefixed.prototype, "buoyancy", void 0);
    PersonNonPrefixed = __decorate([
        RdfBean_1.RdfBean('http://xmlns.com/foaf/0.1/Person')
    ], PersonNonPrefixed);
    return PersonNonPrefixed;
}());
exports.PersonNonPrefixed = PersonNonPrefixed;
//# sourceMappingURL=nonPrefixModels.js.map