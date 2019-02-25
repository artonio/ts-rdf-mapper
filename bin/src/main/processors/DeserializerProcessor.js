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
Object.defineProperty(exports, "__esModule", { value: true });
var n3_1 = require("n3");
var XSDDataType_1 = require("../annotations/XSDDataType");
var TurtleParseError_1 = require("../exceptions/TurtleParseError");
var Utils_1 = require("../Utils");
var DeserializerProcessor = /** @class */ (function () {
    function DeserializerProcessor() {
        this.xsdType = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
    }
    DeserializerProcessor.prototype.deserializeAsync = function (type, ttlData) {
        return __awaiter(this, void 0, void 0, function () {
            var qa, store, dtoInstance, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.getQuadsAndPrefixes(ttlData)];
                    case 1:
                        qa = _a.sent();
                        store = new n3_1.Store();
                        store.addQuads(qa.quads);
                        dtoInstance = this.process(type, store);
                        return [2 /*return*/, Promise.resolve(dtoInstance)];
                    case 2:
                        e_1 = _a.sent();
                        throw new TurtleParseError_1.TurtleParseError(e_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    DeserializerProcessor.prototype.deserialize = function (type, ttlData) {
        var qs;
        try {
            qs = this.getQuads(ttlData);
            var store = new n3_1.Store();
            store.addQuads(qs);
            var dtoInstance = this.process(type, store);
            return dtoInstance;
        }
        catch (e) {
            throw new TurtleParseError_1.TurtleParseError(e);
        }
    };
    DeserializerProcessor.prototype.deserializeTree = function (type, ttlData) {
        var qs;
        try {
            qs = this.getQuads(ttlData);
            var store = new n3_1.Store();
            store.addQuads(qs);
            var dtoInstance = this.processTree(type, store);
            return dtoInstance;
        }
        catch (e) {
            throw new TurtleParseError_1.TurtleParseError(e);
        }
    };
    DeserializerProcessor.prototype.processTree = function (type, store, object) {
        var _this = this;
        var dtoInstance = new type();
        var ns = Reflect.getMetadata('RdfPrefixes', type.prototype);
        ns['xsd'] = 'http://www.w3.org/2001/XMLSchema#';
        var beanType = Reflect.getMetadata('RdfBean', type.prototype);
        var properties = Reflect.getMetadata('RdfProperty-non-instance', type.prototype);
        var subject = Reflect.getMetadata('RdfSubject-non-instance', type.prototype);
        var isRootNodeTrue = this.makeLiteral('true', n3_1.DataFactory.namedNode('http://www.w3.org/2001/XMLSchema#boolean'));
        var isRootNotePredicate = n3_1.DataFactory.namedNode('http://ts-rdf-mapper.com#isRootNode');
        var subs = store.getSubjects(isRootNotePredicate, isRootNodeTrue, null);
        if (subs.length > 0) {
            var rootSubject_1 = subs[0];
            if (subject) {
                dtoInstance[subject.key] = Utils_1.Utils.getUUIDFromResourceSubject(rootSubject_1.value, subject.prop, ns);
            }
            properties.forEach(function (rdfProp) {
                var objects;
                var rdfPredicateString = rdfProp.decoratorMetadata.predicate;
                var predicate = _this.makePredicate(rdfPredicateString, ns);
                if (predicate) {
                    if (object) {
                        objects = store.getObjects(object, predicate, null);
                    }
                    else {
                        objects = store.getObjects(rootSubject_1, predicate, null);
                    }
                    if (objects.length > 0) {
                        var ob = objects[0];
                        var holder_1 = [];
                        if (n3_1.Util.isLiteral(ob)) {
                            if (rdfProp.decoratorMetadata.isArray) {
                                holder_1 = objects.map(function (o) { return _this.processPrimitiveByXSDType(o.value, rdfProp.decoratorMetadata.xsdType); });
                                dtoInstance[rdfProp.key] = holder_1;
                            }
                            else {
                                var r = _this.processPrimitiveByXSDType(ob.value, rdfProp.decoratorMetadata.xsdType);
                                dtoInstance[rdfProp.key] = r;
                            }
                        }
                        if (n3_1.Util.isNamedNode(ob) || n3_1.Util.isBlankNode(ob)) {
                            if (rdfProp.decoratorMetadata.isArray) {
                                objects.forEach(function (o) {
                                    var res = _this.processTree(rdfProp.decoratorMetadata.clazz, store, o);
                                    holder_1.push(res);
                                });
                                dtoInstance[rdfProp.key] = holder_1;
                            }
                            else {
                                var res = _this.processTree(rdfProp.decoratorMetadata.clazz, store, ob);
                                dtoInstance[rdfProp.key] = res;
                            }
                        }
                    }
                }
            });
        }
        return dtoInstance;
    };
    DeserializerProcessor.prototype.process = function (type, store, object) {
        var _this = this;
        var dtoInstance = new type();
        var ns = Reflect.getMetadata('RdfPrefixes', type.prototype);
        var beanType = Reflect.getMetadata('RdfBean', type.prototype);
        var properties = Reflect.getMetadata('RdfProperty-non-instance', type.prototype);
        var subject = Reflect.getMetadata('RdfSubject-non-instance', type.prototype);
        var numTriples = this.getNumTriplesByBeanType(beanType, store, ns);
        if (numTriples.length > 0) {
            var triple_1 = numTriples[0];
            // Get URI and set the value for key which contains @RdfSubject annotation
            if (subject) {
                dtoInstance[subject.key] = Utils_1.Utils.getUUIDFromResourceSubject(triple_1.subject.value, subject.prop, ns);
            }
            properties.forEach(function (rdfProp) {
                var objects;
                var predicateURI = Utils_1.Utils.getUriFromPrefixedName(rdfProp.decoratorMetadata.predicate, ns);
                if (object) {
                    objects = store.getObjects(object, n3_1.DataFactory.namedNode(predicateURI), null);
                }
                else {
                    objects = store.getObjects(triple_1.subject, n3_1.DataFactory.namedNode(predicateURI), null);
                }
                if (objects.length > 0) {
                    var ob = objects[0];
                    var holder_2 = [];
                    if (n3_1.Util.isLiteral(ob)) {
                        if (rdfProp.decoratorMetadata.isArray) {
                            holder_2 = objects.map(function (o) { return _this.processPrimitiveByXSDType(o.value, rdfProp.decoratorMetadata.xsdType); });
                            dtoInstance[rdfProp.key] = holder_2;
                        }
                        else {
                            var r = _this.processPrimitiveByXSDType(ob.value, rdfProp.decoratorMetadata.xsdType);
                            dtoInstance[rdfProp.key] = r;
                        }
                    }
                    if (n3_1.Util.isNamedNode(ob) || n3_1.Util.isBlankNode(ob)) {
                        if (rdfProp.decoratorMetadata.isArray) {
                            objects.forEach(function (o) {
                                var res = _this.process(rdfProp.decoratorMetadata.clazz, store, o);
                                holder_2.push(res);
                            });
                            dtoInstance[rdfProp.key] = holder_2;
                        }
                        else {
                            var res = _this.process(rdfProp.decoratorMetadata.clazz, store, ob);
                            dtoInstance[rdfProp.key] = res;
                        }
                    }
                }
            });
        }
        return dtoInstance;
    };
    DeserializerProcessor.prototype.processPrimitiveByXSDType = function (value, xsdType) {
        var result;
        switch (xsdType) {
            case XSDDataType_1.XSDDataType.XSD_INTEGER:
            case XSDDataType_1.XSDDataType.XSD_INT:
            case XSDDataType_1.XSDDataType.XSD_NON_NEGATIVE_INTEGER:
            case XSDDataType_1.XSDDataType.XSD_POSITIVE_INTEGER:
            case XSDDataType_1.XSDDataType.XSD_NON_POSITIVE_INTEGER:
            case XSDDataType_1.XSDDataType.XSD_NEGATIVE_INTEGER:
                result = parseInt(value);
                break;
            case XSDDataType_1.XSDDataType.XSD_DOUBLE:
            case XSDDataType_1.XSDDataType.XSD_DECIMAL:
            case XSDDataType_1.XSDDataType.XSD_FLOAT:
                result = parseFloat(value);
                break;
            case XSDDataType_1.XSDDataType.XSD_BOOLEAN:
                result = value === 'true';
                break;
            default:
                result = value;
        }
        return result;
    };
    DeserializerProcessor.prototype.getNumTriplesByBeanType = function (beanType, store, ns) {
        var numTriples;
        if (beanType) {
            var beanTypeUri = Utils_1.Utils.getUriFromPrefixedName(beanType, ns);
            numTriples = store.getQuads(null, n3_1.DataFactory.namedNode(this.xsdType), n3_1.DataFactory.namedNode(beanTypeUri), null);
        }
        else {
            numTriples = store.getQuads(null, null, null, null);
        }
        return numTriples;
    };
    DeserializerProcessor.prototype.getQuadsAndPrefixes = function (ttlData) {
        return __awaiter(this, void 0, void 0, function () {
            var parser;
            return __generator(this, function (_a) {
                parser = new n3_1.Parser();
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var quads = [];
                        parser.parse(ttlData, function (e, q, p) {
                            if (e) {
                                reject(e);
                            }
                            if (q) {
                                quads.push(q);
                            }
                            else {
                                resolve({ quads: quads, prefixes: p });
                            }
                        });
                    })];
            });
        });
    };
    DeserializerProcessor.prototype.getQuads = function (ttlData) {
        var parser = new n3_1.Parser();
        var r = parser.parse(ttlData);
        return r;
    };
    DeserializerProcessor.prototype.makeLiteral = function (value, languageOrDatatype) {
        return n3_1.DataFactory.literal(value, languageOrDatatype);
    };
    DeserializerProcessor.prototype.makePredicate = function (rdfPredicateString, prefixes) {
        var predicate;
        if (rdfPredicateString) {
            if (/^(http|https):\/\/?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*|(#.*))?$/
                .test(rdfPredicateString)) {
                predicate = n3_1.DataFactory.namedNode(rdfPredicateString);
            }
            else {
                predicate = n3_1.DataFactory.namedNode(Utils_1.Utils.getUriFromPrefixedName(rdfPredicateString, prefixes));
            }
            return predicate;
        }
        else {
            throw new Error('predicate is a mandatory property');
        }
    };
    return DeserializerProcessor;
}());
exports.DeserializerProcessor = DeserializerProcessor;
//# sourceMappingURL=DeserializerProcessor.js.map