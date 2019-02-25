"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var RdfMapper_1 = require("../main/RdfMapper");
var models_1 = require("./models/models");
var oneToOneModels_1 = require("./models/oneToOneModels");
var recipes_1 = require("./models/recipes");
var shouldLogResult = false;
function logResult(assertName, result, logOnlyMe) {
    if (logOnlyMe === void 0) { logOnlyMe = false; }
    if (shouldLogResult || logOnlyMe) {
        console.log("Expectation: " + assertName);
        console.log("Result:\n" + result);
    }
}
describe('Test TTL Deserialization', function () {
    it('Deserialize basic ttl (async)', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var instance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RdfMapper_1.RdfMapper.deserializeAsync(models_1.Person, models_1.personTTL)];
                case 1:
                    instance = _a.sent();
                    // console.log(JSON.stringify(instance));
                    expect(instance.firstName).toEqual('David');
                    expect(instance.uuid).toEqual('1234567');
                    expect(instance.name).toEqual('David Banner');
                    expect(instance.nick).toEqual('hulk');
                    expect(instance.surname).toEqual('Banner');
                    expect(instance.title).toEqual('Mr');
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Deserialize basic ttl', function () {
        var instance = RdfMapper_1.RdfMapper.deserialize(models_1.Person, models_1.personTTL);
        // console.log(JSON.stringify(instance));
        expect(instance.firstName).toEqual('David');
        expect(instance.uuid).toEqual('1234567');
        expect(instance.name).toEqual('David Banner');
        expect(instance.nick).toEqual('hulk');
        expect(instance.surname).toEqual('Banner');
        expect(instance.title).toEqual('Mr');
    });
    it('Deserialize ttl with one-to-one relationship (async)', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var instance;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RdfMapper_1.RdfMapper.deserializeAsync(oneToOneModels_1.PersonHasAddress, oneToOneModels_1.oneToOneRelationship)];
                case 1:
                    instance = _a.sent();
                    expect(instance.uuid).toEqual('person-uuid');
                    expect(instance.name).toEqual('John');
                    expect(instance.address.uuid).toEqual('address-uuid');
                    expect(instance.address.streetName).toEqual('Jasmine');
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Deserialize ttl with one-to-one relationship', function () {
        var instance = RdfMapper_1.RdfMapper.deserialize(oneToOneModels_1.PersonHasAddress, oneToOneModels_1.oneToOneRelationship);
        expect(instance.uuid).toEqual('person-uuid');
        expect(instance.name).toEqual('John');
        expect(instance.address.uuid).toEqual('address-uuid');
        expect(instance.address.streetName).toEqual('Jasmine');
    });
    it('Deserialize blank nodes (async)', function (done) { return __awaiter(_this, void 0, void 0, function () {
        var recipe;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, RdfMapper_1.RdfMapper.deserializeAsync(recipes_1.Recipe, models_1.recipeVideoTTL)];
                case 1:
                    recipe = _a.sent();
                    expect(recipe instanceof recipes_1.Recipe).toBeTruthy();
                    expect(recipe.video).toBeDefined();
                    expect(recipe.video instanceof recipes_1.Video).toBeTruthy();
                    expect(recipe.recipeName).toEqual('Cheesecake');
                    expect(recipe.video.name).toEqual('Japanese Cheesecake instructions');
                    // console.log(JSON.stringify(recipe));
                    done();
                    return [2 /*return*/];
            }
        });
    }); });
    it('Deserialize blank nodes', function () {
        var recipe = RdfMapper_1.RdfMapper.deserialize(recipes_1.Recipe, models_1.recipeVideoTTL);
        expect(recipe instanceof recipes_1.Recipe).toBeTruthy();
        expect(recipe.video).toBeDefined();
        expect(recipe.video instanceof recipes_1.Video).toBeTruthy();
        expect(recipe.recipeName).toEqual('Cheesecake');
        expect(recipe.video.name).toEqual('Japanese Cheesecake instructions');
        // console.log(JSON.stringify(recipe));
    });
});
//# sourceMappingURL=deserialize.spec.js.map