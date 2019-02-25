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
var RdfIngredient = /** @class */ (function () {
    function RdfIngredient() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('ingredient'),
        __metadata("design:type", String)
    ], RdfIngredient.prototype, "ingredientIdentifier", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'fo:ingredientName', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], RdfIngredient.prototype, "ingredientName", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'fo:quantity', xsdType: XSDDataType_1.XSDDataType.XSD_FLOAT }),
        __metadata("design:type", Number)
    ], RdfIngredient.prototype, "quantity", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'fo:qualifier', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], RdfIngredient.prototype, "qualifier", void 0);
    RdfIngredient = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            fo: 'http://purl.org/ontology/fo/',
            ingredient: 'http://schema.org/Ingredient/'
        }),
        RdfBean_1.RdfBean('fo:Ingredient')
    ], RdfIngredient);
    return RdfIngredient;
}());
exports.RdfIngredient = RdfIngredient;
var RdfRecipe = /** @class */ (function () {
    function RdfRecipe() {
    }
    __decorate([
        RdfSubject_1.RdfSubject('recipe'),
        __metadata("design:type", String)
    ], RdfRecipe.prototype, "recipeIdentifier", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'fo:recipeName', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], RdfRecipe.prototype, "recipeName", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'fo:ingredients', clazz: RdfIngredient, isArray: true, inverseOfPredicate: 'fo:partOfRecipe' }),
        __metadata("design:type", Array)
    ], RdfRecipe.prototype, "ingredients", void 0);
    RdfRecipe = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            fo: 'http://purl.org/ontology/fo/',
            recipe: 'http://schema.org/Recipe/'
        }),
        RdfBean_1.RdfBean('fo:Recipe')
    ], RdfRecipe);
    return RdfRecipe;
}());
exports.RdfRecipe = RdfRecipe;
//# sourceMappingURL=recipesManyToMany.js.map