"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var AbstractBNodeSerializer_1 = require("../../main/annotations/interfaces/AbstractBNodeSerializer");
var RdfBean_1 = require("../../main/annotations/RdfBean");
var RdfPrefixes_1 = require("../../main/annotations/RdfPrefixes");
var RdfProperty_1 = require("../../main/annotations/RdfProperty");
var RdfSubject_1 = require("../../main/annotations/RdfSubject");
var AddressSerializer = /** @class */ (function (_super) {
    __extends(AddressSerializer, _super);
    function AddressSerializer() {
        var _this = _super.call(this) || this;
        _this.addPrefix('address', 'http://example.com/Address/');
        return _this;
    }
    AddressSerializer.prototype.serialize = function (value) {
        var _this = this;
        var triples = [];
        triples.push(this.createTriple(this.subject, this.xsdType, this.makeResourceIRI('address:1234')));
        Object.keys(value).forEach(function (key) {
            var predicate = _this.makePredicate("address:" + key);
            var obj;
            // if value is a string
            if (typeof (value[key]) === 'string') {
                obj = _this.makeLiteralWithDataType(value[key], 'xsd:string');
            }
            // If value is boolean
            if (typeof (value[key]) === 'boolean') {
                obj = _this.makeLiteralWithDataType(value[key], 'xsd:boolean');
            }
            // if value is number
            if (typeof (value[key]) === 'number') {
                obj = _this.makeLiteralWithDataType(value[key], 'xsd:integer');
            }
            triples.push(_this.createTriple(_this.subject, predicate, obj));
        });
        return triples;
    };
    return AddressSerializer;
}(AbstractBNodeSerializer_1.AbstractBNodeSerializer));
exports.AddressSerializer = AddressSerializer;
var UserJsonObject = /** @class */ (function () {
    function UserJsonObject() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('user'),
        __metadata("design:type", String)
    ], UserJsonObject.prototype, "name", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'user:address', serializer: AddressSerializer }),
        __metadata("design:type", Object)
    ], UserJsonObject.prototype, "address", void 0);
    UserJsonObject = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            user: 'http://example.com/User/'
        }),
        RdfBean_1.RdfBean('foaf:User')
    ], UserJsonObject);
    return UserJsonObject;
}());
exports.UserJsonObject = UserJsonObject;
//# sourceMappingURL=serializeJsonObj.js.map