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
var AbstractTreeNode_1 = require("../../main/annotations/interfaces/AbstractTreeNode");
var RdfBean_1 = require("../../main/annotations/RdfBean");
var RdfPrefixes_1 = require("../../main/annotations/RdfPrefixes");
var RdfProperty_1 = require("../../main/annotations/RdfProperty");
var RdfSubject_1 = require("../../main/annotations/RdfSubject");
var XSDDataType_1 = require("../../main/annotations/XSDDataType");
var PersonMultipleDataTypes = /** @class */ (function () {
    function PersonMultipleDataTypes() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('person'),
        __metadata("design:type", String)
    ], PersonMultipleDataTypes.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'person:name', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], PersonMultipleDataTypes.prototype, "name", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'person:name', lang: 'en' }),
        __metadata("design:type", String)
    ], PersonMultipleDataTypes.prototype, "englishName", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'person:gender', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], PersonMultipleDataTypes.prototype, "gender", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'person:age', xsdType: XSDDataType_1.XSDDataType.XSD_INT }),
        __metadata("design:type", Number)
    ], PersonMultipleDataTypes.prototype, "age", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'person:isAdult', xsdType: XSDDataType_1.XSDDataType.XSD_BOOLEAN }),
        __metadata("design:type", Boolean)
    ], PersonMultipleDataTypes.prototype, "isAdult", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'person:isChild', xsdType: XSDDataType_1.XSDDataType.XSD_BOOLEAN }),
        __metadata("design:type", Boolean)
    ], PersonMultipleDataTypes.prototype, "isChild", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'person:weight', xsdType: XSDDataType_1.XSDDataType.XSD_DOUBLE }),
        __metadata("design:type", Number)
    ], PersonMultipleDataTypes.prototype, "weight", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'person:height', xsdType: XSDDataType_1.XSDDataType.XSD_LONG }),
        __metadata("design:type", Number)
    ], PersonMultipleDataTypes.prototype, "height", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'person:buoyancy', xsdType: XSDDataType_1.XSDDataType.XSD_FLOAT }),
        __metadata("design:type", Number)
    ], PersonMultipleDataTypes.prototype, "buoyancy", void 0);
    PersonMultipleDataTypes = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            person: 'http://example.com/Person/'
        }),
        RdfBean_1.RdfBean('foaf:Person')
    ], PersonMultipleDataTypes);
    return PersonMultipleDataTypes;
}());
exports.PersonMultipleDataTypes = PersonMultipleDataTypes;
var PersonHasFriend = /** @class */ (function () {
    function PersonHasFriend() {
    }
    PersonHasFriend_1 = PersonHasFriend;
    var PersonHasFriend_1;
    __decorate([
        RdfSubject_1.RdfSubject('person'),
        __metadata("design:type", String)
    ], PersonHasFriend.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:name', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], PersonHasFriend.prototype, "name", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:knows', clazz: PersonHasFriend_1, inverseOfPredicate: 'foaf:knows' }),
        __metadata("design:type", PersonHasFriend)
    ], PersonHasFriend.prototype, "knows", void 0);
    PersonHasFriend = PersonHasFriend_1 = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            person: 'http://example.com/Person/'
        }),
        RdfBean_1.RdfBean('foaf:Person')
    ], PersonHasFriend);
    return PersonHasFriend;
}());
exports.PersonHasFriend = PersonHasFriend;
var Addr = /** @class */ (function () {
    function Addr() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('address'),
        __metadata("design:type", String)
    ], Addr.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'address:streetName', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], Addr.prototype, "streetName", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'address:houseNum', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", Number)
    ], Addr.prototype, "houseNum", void 0);
    Addr = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            person: 'http://example.com/Person/',
            address: 'http://xmlns.com/foaf/0.1/address/'
        }),
        RdfBean_1.RdfBean('foaf:Address')
    ], Addr);
    return Addr;
}());
exports.Addr = Addr;
var Per = /** @class */ (function () {
    function Per() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('person'),
        __metadata("design:type", String)
    ], Per.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'person:hasAddress', clazz: Addr }),
        __metadata("design:type", Array)
    ], Per.prototype, "addresses", void 0);
    Per = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            person: 'http://example.com/Person/'
        }),
        RdfBean_1.RdfBean('foaf:Person')
    ], Per);
    return Per;
}());
exports.Per = Per;
var Base = /** @class */ (function () {
    function Base() {
    }
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:baseProp', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], Base.prototype, "baseProp", void 0);
    return Base;
}());
exports.Base = Base;
var SuperBase = /** @class */ (function (_super) {
    __extends(SuperBase, _super);
    function SuperBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        RdfSubject_1.RdfSubject('foaf'),
        __metadata("design:type", String)
    ], SuperBase.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:extendedProp', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], SuperBase.prototype, "extendedProp", void 0);
    SuperBase = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            person: 'http://example.com/Person/'
        }),
        RdfBean_1.RdfBean('foaf:SuperBase')
    ], SuperBase);
    return SuperBase;
}(Base));
exports.SuperBase = SuperBase;
var Person = /** @class */ (function () {
    function Person() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('person'),
        __metadata("design:type", String)
    ], Person.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:firstName', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], Person.prototype, "firstName", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:name', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], Person.prototype, "name", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:nick', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], Person.prototype, "nick", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:surname', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], Person.prototype, "surname", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:title', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], Person.prototype, "title", void 0);
    Person = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            person: 'http://example.com/Person/'
        }),
        RdfBean_1.RdfBean('foaf:Person')
    ], Person);
    return Person;
}());
exports.Person = Person;
var DaysSerializer = /** @class */ (function () {
    function DaysSerializer() {
    }
    DaysSerializer.prototype.serialize = function (value) {
        return "" + Days[value];
    };
    return DaysSerializer;
}());
exports.DaysSerializer = DaysSerializer;
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tues"] = 2] = "Tues";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thurs"] = 4] = "Thurs";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days = exports.Days || (exports.Days = {}));
var Calendar = /** @class */ (function () {
    function Calendar() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('calendar'),
        __metadata("design:type", String)
    ], Calendar.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:day', xsdType: XSDDataType_1.XSDDataType.XSD_STRING, clazz: Days, serializer: DaysSerializer }),
        __metadata("design:type", Number)
    ], Calendar.prototype, "day", void 0);
    Calendar = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            calendar: 'http://example.com/Calendar/'
        }),
        RdfBean_1.RdfBean('foaf:Calendar')
    ], Calendar);
    return Calendar;
}());
exports.Calendar = Calendar;
var Month = /** @class */ (function () {
    function Month() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('month'),
        __metadata("design:type", String)
    ], Month.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:day', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", Array)
    ], Month.prototype, "days", void 0);
    Month = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            month: 'http://example.com/Month/'
        }),
        RdfBean_1.RdfBean('foaf:Month')
    ], Month);
    return Month;
}());
exports.Month = Month;
var MonthWithIRI = /** @class */ (function () {
    function MonthWithIRI() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('month'),
        __metadata("design:type", String)
    ], MonthWithIRI.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:day', isIRI: true }),
        __metadata("design:type", Array)
    ], MonthWithIRI.prototype, "days", void 0);
    MonthWithIRI = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            month: 'http://example.com/Month/'
        }),
        RdfBean_1.RdfBean('foaf:Month')
    ], MonthWithIRI);
    return MonthWithIRI;
}());
exports.MonthWithIRI = MonthWithIRI;
var SampleTreeNode = /** @class */ (function (_super) {
    __extends(SampleTreeNode, _super);
    function SampleTreeNode() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SampleTreeNode_1 = SampleTreeNode;
    Object.defineProperty(SampleTreeNode.prototype, "_children", {
        set: function (value) {
            value.sort(function (a, b) {
                return a.index - b.index;
            });
            this.children = value;
        },
        enumerable: true,
        configurable: true
    });
    var SampleTreeNode_1;
    __decorate([
        RdfSubject_1.RdfSubject('foaf'),
        __metadata("design:type", String)
    ], SampleTreeNode.prototype, "uuid", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:children', clazz: SampleTreeNode_1, isArray: true }),
        __metadata("design:type", Array)
    ], SampleTreeNode.prototype, "children", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:label', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], SampleTreeNode.prototype, "label", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'foaf:children', clazz: SampleTreeNode_1, isArray: true }),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], SampleTreeNode.prototype, "_children", null);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'treeNode:gindex', xsdType: XSDDataType_1.XSDDataType.XSD_INT }),
        __metadata("design:type", Number)
    ], SampleTreeNode.prototype, "index", void 0);
    SampleTreeNode = SampleTreeNode_1 = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            treeNode: 'http://example.com/treeNode/'
        }),
        RdfBean_1.RdfBean('foaf:SampleTreeNode')
    ], SampleTreeNode);
    return SampleTreeNode;
}(AbstractTreeNode_1.AbstractTreeNode));
exports.SampleTreeNode = SampleTreeNode;
exports.sampleTreeNodeTTL = "\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix treeNode: <http://example.com/treeNode/>.\n\n_:n3-9 a foaf:SampleTreeNode;\n    foaf:label \"Sub Node 1\"^^xsd:string.\n_:n3-8 a foaf:SampleTreeNode;\n    foaf:hasNode _:n3-11, _:n3-9, _:n3-10;\n    foaf:label \"Top Parent\"^^xsd:string.\n_:n3-11 a foaf:SampleTreeNode;\n    treeNode:gindex \"2\"^^xsd:integer;\n    foaf:label \"Sub Node 3\"^^xsd:string.\n_:n3-10 foaf:label \"Sub Node 2\"^^xsd:string;\n    a foaf:SampleTreeNode;\n    treeNode:gindex \"1\"^^xsd:integer.\n";
exports.invalidTTL = "\n@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix foaf:  <http://xmlns.com/foaf/0.1/> .\nprefix person: <http://example.com/Person/> .\n\nperson:1234567      a                       foaf:Person ;\n        foaf:firstName          \"David\" ;\n        foaf:name               \"David Banner\" ;\n        foaf:nick               \"hulk\" ;\n        foaf:surname            \"Banner\" ;\n        foaf:title              \"Mr\"\n";
exports.personTTL = "\n@prefix rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#> .\n@prefix foaf:  <http://xmlns.com/foaf/0.1/> .\n@prefix person: <http://example.com/Person/> .\n\nperson:1234567      a                       foaf:Person ;\n        foaf:firstName          \"David\" ;\n        foaf:name               \"David Banner\" ;\n        foaf:nick               \"hulk\" ;\n        foaf:surname            \"Banner\" ;\n        foaf:title              \"Mr\" .\n";
exports.ttlMultipleTypes = "\n@prefix foaf: <http://xmlns.com/foaf/0.1/>.\n@prefix person: <http://example.com/Person/>.\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n\nperson:123345dfx a foaf:Person;\n    person:name \"Anton\"^^xsd:string;\n    person:gender \"M\"^^xsd:string;\n    person:age \"32\"^^xsd:int;\n    person:isAdult \"true\"^^xsd:boolean;\n    person:weight \"95.5\"^^xsd:double;\n    person:height \"198.5\"^^xsd:long;\n    person:buoyancy \"53.2\"^^xsd:float.\n";
exports.recipeVideoTTL = "\n@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.\n@prefix schema: <http://schema.org/>.\n\n_:n3-1 schema:name \"Japanese Cheesecake instructions\"^^xsd:string.\n_:n3-0 a schema:Recipe;\n    schema:recipeName \"Cheesecake\"^^xsd:string;\n    schema:video _:n3-1.";
//# sourceMappingURL=models.js.map