"use strict";
// Wrote this on a whim, not used and NOT TESTED
Object.defineProperty(exports, "__esModule", { value: true });
var List = /** @class */ (function () {
    function List(elements) {
        this.items = [];
        if (elements) {
            this.items = elements;
        }
    }
    List.prototype.size = function () {
        return this.items.length;
    };
    List.prototype.add = function (value) {
        this.items.push(value);
        return this;
    };
    List.prototype.remove = function (value) {
        var index = -1;
        while (this.items
            && this.items.length > 0
            && (index = this.items.indexOf(value)) > -1) {
            this.items.splice(index, 1);
        }
        return this;
    };
    List.prototype.isEmpty = function () {
        return this.items.length === 0;
    };
    List.prototype.indexOf = function (value) {
        return this.items.indexOf(value);
    };
    List.prototype.contains = function (value) {
        return this.indexOf(value) !== -1;
    };
    List.prototype.toArray = function () {
        return this.items;
    };
    List.prototype.toIterator = function () {
        return this.items.entries();
    };
    List.prototype.forEach = function (func) {
        this.items.forEach(func);
    };
    List.prototype.reverse = function () {
        this.items.reverse();
        return this;
    };
    List.prototype.toString = function () {
        return this.items.toString();
    };
    return List;
}());
exports.List = List;
//# sourceMappingURL=List.js.map