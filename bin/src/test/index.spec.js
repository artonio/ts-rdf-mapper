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
require("reflect-metadata");
var AbstractTreeNode_1 = require("../main/annotations/interfaces/AbstractTreeNode");
var RdfBean_1 = require("../main/annotations/RdfBean");
var RdfPrefixes_1 = require("../main/annotations/RdfPrefixes");
var RdfProperty_1 = require("../main/annotations/RdfProperty");
var RdfSubject_1 = require("../main/annotations/RdfSubject");
var XSDDataType_1 = require("../main/annotations/XSDDataType");
var RdfMapper_1 = require("../main/RdfMapper");
var litralSerializer_1 = require("./models/litralSerializer");
var models_1 = require("./models/models");
var oneToOneModels_1 = require("./models/oneToOneModels");
var recipes_1 = require("./models/recipes");
var recipesManyToMany_1 = require("./models/recipesManyToMany");
var serializeIsIRI_1 = require("./models/serializeIsIRI");
var serializeJsonObj_1 = require("./models/serializeJsonObj");
var SERIALIZE_BASIC_TYPES = 'Should serialize basic types';
var SERIALIZE_BASIC_TYPES_CHANGE_VALUE = 'Should serialize basic types, change property values';
var SERIALIZE_ONE_TO_ONE = 'Serialize one to one relationship';
var SERIALIZE_PERSON_HAS_FRIEND = 'Serialize person has friend person';
var SERIALIZE_ONE_TO_MANY = 'Serialize one to many relationship';
var SERIALIZE_ONE_TO_MANY_AND_INVERSEOF = 'Serialize Recipe has many ingredients and inverseof';
var SERIALIZE_BASIC_INHERITANCE = 'Serialize basic inheritance';
var SERIALIZE_ENUMS = 'Serialize Enums';
var SERIALIZE_ARRAY_OF_LITERALS = 'Should serialize array of literals';
var SERIALIZE_ARRAY_OF_IRIs = 'Should serialize array of IRIs';
var SERIALIZE_ARRAY_OF_OBJECTS = 'Serialize Array of objects';
var SERIALIZE_LITERALS_CUSTOM_SERIALIZER = 'Serialize literal with customs serializer';
var SERIALIZE_INTO_BLANK_NODE = 'Should serialize into a blank node';
var SERIALIZE_INTO_BLANK_NODE_ISIRI = 'Serialize into blank node with isIRI';
var SERIALIZE_JSON_USING_DYNAMIC_SERIALIZER = 'Serialize json with dynamic serializer';
var SERIALIZE_DESERIALIZE_RECURSIVE_TREE = 'Serialize recursive tree into blank nodes';
var shouldLogResult = false;
function logResult(assertName, result, logOnlyMe) {
    if (logOnlyMe === void 0) { logOnlyMe = false; }
    if (shouldLogResult || logOnlyMe) {
        console.log("Expectation: " + assertName);
        console.log("Result:\n" + result);
    }
}
describe('Testing basic serialization functions', function () {
    it(SERIALIZE_BASIC_TYPES, function () {
        var p = new models_1.PersonMultipleDataTypes();
        p.uuid = '123345dfx';
        p.name = 'Anton';
        p.englishName = 'Antony';
        p.gender = 'M';
        p.age = 32;
        p.isAdult = true;
        p.isChild = false;
        p.weight = 95.5;
        p.height = 198.5;
        p.buoyancy = 53.2;
        var b = RdfMapper_1.RdfMapper.serialize(p);
        expect(b).toContain("person:123345dfx a foaf:Person;");
        expect(b).toContain("person:name \"Anton\"^^xsd:string, \"Antony\"@en;");
        expect(b).toContain("person:gender \"M\"^^xsd:string;");
        expect(b).toContain("person:age \"32\"^^xsd:int;");
        expect(b).toContain("person:isAdult \"true\"^^xsd:boolean;");
        expect(b).toContain("person:isChild \"false\"^^xsd:boolean;");
        expect(b).toContain("person:weight \"95.5\"^^xsd:double;");
        expect(b).toContain("person:height \"198.5\"^^xsd:long;");
        expect(b).toContain("person:buoyancy \"53.2\"^^xsd:float.");
        logResult(SERIALIZE_BASIC_TYPES, b);
    });
    it(SERIALIZE_BASIC_TYPES_CHANGE_VALUE, function () {
        var p = new models_1.PersonMultipleDataTypes();
        p.gender = 'M';
        p.uuid = '123345dfx';
        p.name = 'Anton';
        p.name = 'Ant';
        p.name = 'John';
        var r = RdfMapper_1.RdfMapper.serialize(p);
        expect(r).toContain("person:123345dfx a foaf:Person;");
        expect(r).toContain("person:name \"John\"");
        expect(r).toContain("person:gender \"M\"^^xsd:string;");
        logResult(SERIALIZE_BASIC_TYPES_CHANGE_VALUE, r);
    });
    it(SERIALIZE_ONE_TO_ONE, function () {
        var Address1 = /** @class */ (function () {
            function Address1() {
            }
            __decorate([
                RdfSubject_1.RdfSubject('address'),
                __metadata("design:type", String)
            ], Address1.prototype, "uuid", void 0);
            __decorate([
                RdfProperty_1.RdfProperty({ predicate: 'address:streetName', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
                __metadata("design:type", String)
            ], Address1.prototype, "streetName", void 0);
            Address1 = __decorate([
                RdfPrefixes_1.RdfPrefixes({
                    foaf: 'http://xmlns.com/foaf/0.1/',
                    person: 'http://example.com/Person/',
                    address: 'http://xmlns.com/foaf/0.1/address/'
                }),
                RdfBean_1.RdfBean('foaf:Address')
            ], Address1);
            return Address1;
        }());
        var Person1 = /** @class */ (function () {
            function Person1() {
            }
            __decorate([
                RdfSubject_1.RdfSubject('person'),
                __metadata("design:type", String)
            ], Person1.prototype, "uuid", void 0);
            __decorate([
                RdfProperty_1.RdfProperty({ predicate: 'person:name', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
                __metadata("design:type", String)
            ], Person1.prototype, "name", void 0);
            __decorate([
                RdfProperty_1.RdfProperty({ predicate: 'person:hasAddress', clazz: oneToOneModels_1.Address }),
                __metadata("design:type", Address1)
            ], Person1.prototype, "address", void 0);
            Person1 = __decorate([
                RdfPrefixes_1.RdfPrefixes({
                    foaf: 'http://xmlns.com/foaf/0.1/',
                    person: 'http://example.com/Person/'
                }),
                RdfBean_1.RdfBean('foaf:Person')
            ], Person1);
            return Person1;
        }());
        var a = new Address1();
        a.uuid = 'address-uuid';
        a.streetName = 'Jasmine';
        var p = new Person1();
        p.uuid = 'person-uuid';
        p.name = 'John';
        p.address = a;
        var r = RdfMapper_1.RdfMapper.serialize(p);
        expect(r).toContain("person:person-uuid a foaf:Person;");
        expect(r).toContain("person:name \"John\"^^xsd:string;");
        expect(r).toContain("person:hasAddress address:address-uuid.");
        expect(r).toContain("address:address-uuid a foaf:Address;");
        expect(r).toContain("address:streetName \"Jasmine\"^^xsd:string.");
        logResult(SERIALIZE_ONE_TO_ONE, r);
    });
    it(SERIALIZE_PERSON_HAS_FRIEND, function () {
        var antonPerson = new models_1.PersonHasFriend();
        antonPerson.uuid = 'Anton';
        antonPerson.name = 'Anton S';
        var johnDoePerson = new models_1.PersonHasFriend();
        johnDoePerson.uuid = 'John';
        johnDoePerson.name = 'John Doe';
        antonPerson.knows = johnDoePerson;
        var r = RdfMapper_1.RdfMapper.serialize(antonPerson);
        expect(r).toContain("person:John a foaf:Person;");
        expect(r).toContain("foaf:knows person:Anton;");
        expect(r).toContain("foaf:name \"John Doe\"^^xsd:string.");
        expect(r).toContain("person:Anton a foaf:Person;");
        expect(r).toContain("foaf:name \"Anton S\"^^xsd:string;");
        expect(r).toContain("foaf:knows person:John.");
        logResult(SERIALIZE_PERSON_HAS_FRIEND, r);
    });
    it(SERIALIZE_ONE_TO_MANY, function () {
        var a1 = new models_1.Addr();
        a1.uuid = 'uuid1';
        a1.houseNum = 10;
        a1.streetName = 'Jasmine';
        var a2 = new models_1.Addr();
        a2.uuid = 'uuid2';
        a2.houseNum = 223;
        a2.streetName = 'Joseph';
        var p = new models_1.Per();
        p.uuid = 'person-uuid';
        p.addresses = [a1, a2];
        var r = RdfMapper_1.RdfMapper.serialize(p);
        // console.log(b);
        expect(r).toContain("person:person-uuid a foaf:Person;");
        expect(r).toContain("address:uuid2 a foaf:Address;");
        expect(r).toContain("address:uuid1 a foaf:Address;");
        expect(r).toContain("person:hasAddress address:uuid1, address:uuid2.");
        expect(r).toContain("address:houseNum \"223\"^^xsd:string");
        expect(r).toContain("address:streetName \"Joseph\"^^xsd:string");
        expect(r).toContain("address:houseNum \"223\"^^xsd:string");
        expect(r).toContain("address:streetName \"Jasmine\"^^xsd:string");
        logResult(SERIALIZE_ONE_TO_MANY, r);
    });
    it(SERIALIZE_ONE_TO_MANY_AND_INVERSEOF, function () {
        var recipe = new recipesManyToMany_1.RdfRecipe();
        recipe.recipeIdentifier = 'Lasagna';
        recipe.recipeName = 'Lasagna';
        var beefIngredient = new recipesManyToMany_1.RdfIngredient();
        beefIngredient.ingredientIdentifier = 'beef';
        beefIngredient.ingredientName = 'Ground Beef';
        beefIngredient.quantity = 200;
        beefIngredient.qualifier = 'grams';
        var spaghettiSauce = new recipesManyToMany_1.RdfIngredient();
        spaghettiSauce.ingredientIdentifier = 'spag';
        spaghettiSauce.ingredientName = 'Spaghetti Sauce';
        spaghettiSauce.quantity = 800;
        spaghettiSauce.qualifier = 'grams';
        recipe.ingredients = [beefIngredient, spaghettiSauce];
        var r = RdfMapper_1.RdfMapper.serialize(recipe);
        logResult(SERIALIZE_ONE_TO_MANY_AND_INVERSEOF, r);
    });
    it(SERIALIZE_BASIC_INHERITANCE, function () {
        var sb = new models_1.SuperBase();
        sb.uuid = 'inheritance-uuid';
        sb.baseProp = 'baseValue';
        sb.extendedProp = 'extendedValue';
        var r = RdfMapper_1.RdfMapper.serialize(sb);
        expect(r).toContain("foaf:inheritance-uuid a foaf:SuperBase;");
        expect(r).toContain("foaf:baseProp \"baseValue\"^^xsd:string;");
        expect(r).toContain("foaf:extendedProp \"extendedValue\"^^xsd:string.");
        logResult(SERIALIZE_BASIC_INHERITANCE, r);
    });
    it(SERIALIZE_ENUMS, function () {
        var cal = new models_1.Calendar();
        cal.uuid = 'cal-uuid';
        cal.day = models_1.Days.Mon;
        var r = RdfMapper_1.RdfMapper.serialize(cal);
        expect(r).toContain("calendar:cal-uuid a foaf:Calendar;");
        expect(r).toContain("foaf:day \"Mon\"^^xsd:string.");
        logResult(SERIALIZE_ENUMS, r);
    });
    it(SERIALIZE_ARRAY_OF_LITERALS, function () {
        var month = new models_1.Month();
        month.uuid = 'month-uuid';
        month.days = ['Mon', 'Tue', 'Wed'];
        var r = RdfMapper_1.RdfMapper.serialize(month);
        expect(r).toContain("month:month-uuid a foaf:Month;");
        expect(r).toContain("foaf:day \"Mon\"^^xsd:string, \"Tue\"^^xsd:string, \"Wed\"^^xsd:string.");
        logResult(SERIALIZE_ARRAY_OF_LITERALS, r);
    });
    it(SERIALIZE_ARRAY_OF_IRIs, function () {
        var month = new models_1.MonthWithIRI();
        month.uuid = 'monthWithIRIDays-uuid';
        month.days = ['http://example.com/Mon', 'http://example.com/Tue', 'http://example.com/Wed'];
        var r = RdfMapper_1.RdfMapper.serialize(month);
        expect(r).toContain("month:monthWithIRIDays-uuid a foaf:Month;");
        expect(r).toContain("foaf:day <http://example.com/Mon>, <http://example.com/Tue>, <http://example.com/Wed>.");
        logResult(SERIALIZE_ARRAY_OF_IRIs, r);
    });
    it(SERIALIZE_ARRAY_OF_OBJECTS, function () {
        var addr1 = new oneToOneModels_1.Address();
        addr1.uuid = 'addr1-uuid';
        addr1.streetName = 'Zigg';
        var addr2 = new oneToOneModels_1.Address();
        addr2.uuid = 'addr2-uuid';
        addr2.streetName = 'St Clair';
        var r = RdfMapper_1.RdfMapper.serialize([addr1, addr2]);
        expect(r).toContain("address:addr2-uuid a foaf:Address;");
        expect(r).toContain("address:streetName \"St Clair\"^^xsd:string.");
        expect(r).toContain("address:addr1-uuid a foaf:Address;");
        expect(r).toContain("address:streetName \"Zigg\"^^xsd:string.");
        logResult(SERIALIZE_ARRAY_OF_OBJECTS, r);
    });
    it(SERIALIZE_LITERALS_CUSTOM_SERIALIZER, function () {
        var u = new litralSerializer_1.User();
        u.uuid = 'anton';
        u.regDate = new Date().getTime();
        u.birthDate = new Date('1995-12-17T03:24:00');
        var r = RdfMapper_1.RdfMapper.serialize(u);
        expect(r).toContain("user:anton a foaf:User;");
        expect(r).toContain("user:birthday \"1995-12-17T08:24:00.000Z\"^^xsd:dateTime.");
        expect(r).toContain("user:registrationDate \"" + new Date(u.regDate).toISOString() + "\"^^xsd:dateTime;");
        logResult(SERIALIZE_LITERALS_CUSTOM_SERIALIZER, r);
    });
    it(SERIALIZE_INTO_BLANK_NODE, function () {
        var recipe = new recipes_1.Recipe();
        recipe.recipeName = 'Cheesecake';
        var video = new recipes_1.Video();
        video.name = 'Japanese Cheesecake instructions';
        recipe.video = video;
        var r = RdfMapper_1.RdfMapper.serialize(recipe);
        expect(r).toContain("schema:name \"Japanese Cheesecake instructions\"^^xsd:string.");
        expect(r).toContain("a schema:Recipe;");
        expect(r).toContain("schema:recipeName \"Cheesecake\"^^xsd:string;");
        logResult(SERIALIZE_INTO_BLANK_NODE, r);
    });
    it(SERIALIZE_INTO_BLANK_NODE_ISIRI, function () {
        var recipe = new serializeIsIRI_1.Recipe1();
        recipe.recipeName = 'Cheesecake';
        var video = new serializeIsIRI_1.Video1();
        video.url = 'http://example.com/Video1';
        recipe.video = video;
        var r = RdfMapper_1.RdfMapper.serialize(recipe);
        expect(r).toContain("schema:videoURL <http://example.com/Video1>.");
        expect(r).toContain("a schema:Recipe;");
        expect(r).toContain("schema:recipeName \"Cheesecake\"^^xsd:string;");
        expect(r).toContain("schema:video");
        logResult(SERIALIZE_INTO_BLANK_NODE_ISIRI, r);
    });
    it(SERIALIZE_JSON_USING_DYNAMIC_SERIALIZER, function () {
        var u = new serializeJsonObj_1.UserJsonObject();
        u.name = 'Anton';
        u.address = { streetName: 'St Clair', streetNumber: 223, isRegistered: true };
        var r = RdfMapper_1.RdfMapper.serialize(u);
        expect(r).toContain("user:Anton a foaf:User;");
        expect(r).toContain("user:address");
        expect(r).toContain("a address:1234;");
        expect(r).toContain("address:streetName \"St Clair\"^^xsd:string;");
        expect(r).toContain("address:streetNumber \"223\"^^xsd:integer;");
        expect(r).toContain("address:isRegistered \"true\"^^xsd:boolean.");
        logResult(SERIALIZE_JSON_USING_DYNAMIC_SERIALIZER, r);
    });
    it(SERIALIZE_DESERIALIZE_RECURSIVE_TREE, function () {
        var topNode = new models_1.SampleTreeNode();
        topNode.uuid = 'topNode';
        topNode.isRoot = true;
        topNode.index = 0;
        topNode.label = 'Top Parent';
        var subNodeOne = new models_1.SampleTreeNode();
        subNodeOne.index = 0;
        subNodeOne.label = 'Sub Node 1';
        var subNodeTwo = new models_1.SampleTreeNode();
        subNodeTwo.index = 1;
        subNodeTwo.label = 'Sub Node 2';
        var subNodeThree = new models_1.SampleTreeNode();
        subNodeThree.index = 2;
        subNodeThree.label = 'Sub Node 3';
        var subNodeThreeOne = new models_1.SampleTreeNode();
        subNodeThreeOne.index = 0;
        subNodeThreeOne.label = 'Sub Node 3.1';
        subNodeThree.children = [subNodeThreeOne];
        // topNode.children = [subNodeOne, subNodeTwo, subNodeThree];
        topNode._children = [subNodeOne, subNodeTwo, subNodeThree];
        var r = RdfMapper_1.RdfMapper.serialize(topNode);
        var deserializedNode = RdfMapper_1.RdfMapper.deserializeTree(models_1.SampleTreeNode, r);
        expect(deserializedNode instanceof models_1.SampleTreeNode).toBeTruthy();
        expect(deserializedNode instanceof AbstractTreeNode_1.AbstractTreeNode).toBeTruthy();
        expect(deserializedNode.children.length).toBe(3);
        expect(deserializedNode.label).toEqual('Top Parent');
        expect(deserializedNode.index).toEqual(0);
        expect(deserializedNode.children[0].label).toEqual('Sub Node 1');
        expect(deserializedNode.children[1].label).toEqual('Sub Node 2');
        expect(deserializedNode.children[2].label).toEqual('Sub Node 3');
        expect(deserializedNode.children[2].children.length).toBe(1);
        expect(deserializedNode.children[2].children[0].label).toEqual('Sub Node 3.1');
        logResult(SERIALIZE_DESERIALIZE_RECURSIVE_TREE, r);
    });
});
//# sourceMappingURL=index.spec.js.map