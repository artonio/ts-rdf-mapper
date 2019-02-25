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
var RegistrationDateSerializer = /** @class */ (function () {
    function RegistrationDateSerializer() {
    }
    RegistrationDateSerializer.prototype.serialize = function (value) {
        return new Date(value).toISOString();
    };
    return RegistrationDateSerializer;
}());
exports.RegistrationDateSerializer = RegistrationDateSerializer;
var BirthDateSerializer = /** @class */ (function () {
    function BirthDateSerializer() {
    }
    BirthDateSerializer.prototype.serialize = function (value) {
        return value.toISOString();
    };
    return BirthDateSerializer;
}());
exports.BirthDateSerializer = BirthDateSerializer;
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('user'),
        __metadata("design:type", String)
    ], User.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'user:registrationDate', xsdType: XSDDataType_1.XSDDataType.XSD_DATE_TIME, serializer: RegistrationDateSerializer }),
        __metadata("design:type", Number)
    ], User.prototype, "regDate", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'user:birthday', xsdType: XSDDataType_1.XSDDataType.XSD_DATE_TIME }),
        __metadata("design:type", Date)
    ], User.prototype, "birthDate", void 0);
    User = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            user: 'http://example.com/User/'
        }),
        RdfBean_1.RdfBean('foaf:User')
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=litralSerializer.js.map