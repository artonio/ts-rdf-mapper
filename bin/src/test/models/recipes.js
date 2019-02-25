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
var XSDDataType_1 = require("../../main/annotations/XSDDataType");
var Video = /** @class */ (function () {
    function Video() {
    }
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'schema:name', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], Video.prototype, "name", void 0);
    Video = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            schema: 'http://schema.org/'
        })
    ], Video);
    return Video;
}());
exports.Video = Video;
var Recipe = /** @class */ (function () {
    function Recipe() {
    }
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'schema:recipeName', xsdType: XSDDataType_1.XSDDataType.XSD_STRING }),
        __metadata("design:type", String)
    ], Recipe.prototype, "recipeName", void 0);
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'schema:video', clazz: Video }),
        __metadata("design:type", Video)
    ], Recipe.prototype, "video", void 0);
    Recipe = __decorate([
        RdfPrefixes_1.RdfPrefixes({
            schema: 'http://schema.org/'
        }),
        RdfBean_1.RdfBean('schema:Recipe')
    ], Recipe);
    return Recipe;
}());
exports.Recipe = Recipe;
//# sourceMappingURL=recipes.js.map