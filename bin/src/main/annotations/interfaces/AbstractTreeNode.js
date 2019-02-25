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
var RdfProperty_1 = require("../RdfProperty");
var XSDDataType_1 = require("../XSDDataType");
var AbstractTreeNode = /** @class */ (function () {
    function AbstractTreeNode() {
    }
    __decorate([
        RdfProperty_1.RdfProperty({ predicate: 'http://ts-rdf-mapper.com#isRootNode', xsdType: XSDDataType_1.XSDDataType.XSD_BOOLEAN }),
        __metadata("design:type", Object)
    ], AbstractTreeNode.prototype, "isRoot", void 0);
    return AbstractTreeNode;
}());
exports.AbstractTreeNode = AbstractTreeNode;
//# sourceMappingURL=AbstractTreeNode.js.map