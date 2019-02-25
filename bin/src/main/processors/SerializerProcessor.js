"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as N3 from 'n3';
// import {N3Writer} from 'n3';
// import * as RDF from 'rdf-js';
var n3_1 = require("n3");
require("reflect-metadata");
var IllegalArgumentError_1 = require("../exceptions/IllegalArgumentError");
var ISODateSerializer_1 = require("../RDFSerializers/ISODateSerializer");
var Utils_1 = require("../Utils");
var SerializerProcessor = /** @class */ (function () {
    function SerializerProcessor() {
        this.quadsArr = [];
        this.prefixes = {};
        this.serializers = {};
        this.xsdType = n3_1.DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
        this.prefixes = { xsd: n3_1.DataFactory.namedNode('http://www.w3.org/2001/XMLSchema#') };
    }
    /**
     * Serialize object or array of objects to turtle
     * @param target - Object or Array of Objects to be serialized to turtle
     * @returns - Turtle representation of the object(s)
     */
    SerializerProcessor.prototype.serialize = function (target) {
        this.process(target);
        this.sortQuads(this.quadsArr);
        this.n3Writer = new n3_1.Writer({ prefixes: this.prefixes });
        this.n3Writer.addQuads(this.quadsArr);
        return this.getTTLString();
    };
    SerializerProcessor.prototype.process = function (target, previousSubject, pointBackPredicate) {
        var _this = this;
        if (Array.isArray(target)) {
            target.forEach(function (tar) {
                _this.process(tar);
            });
        }
        else {
            var ns = Reflect.getMetadata('RdfPrefixes', target);
            var beanType = Reflect.getMetadata('RdfBean', target);
            var rdfSubjectDecorator = Reflect.getMetadata('RdfSubject', target);
            // ?subject ?predicate ?object
            var subject_1 = this.makeSubject(rdfSubjectDecorator);
            if (ns) {
                var prefixxes = this.getN3NsPrefixObject(ns);
                this.prefixes = __assign({}, this.prefixes, prefixxes);
            }
            // If @RdfBean is present, we create at triple in form of ?subject a ?object
            if (beanType) {
                var resourceIdentifierQuad = this.createQuad(subject_1, this.xsdType, n3_1.DataFactory.namedNode(beanType));
                this.quadsArr.push(resourceIdentifierQuad);
            }
            if (previousSubject && pointBackPredicate) {
                var pointBackQuad = this.createQuad(subject_1, this.makePredicate(pointBackPredicate), previousSubject);
                this.quadsArr.push(pointBackQuad);
            }
            var properties = Reflect.getMetadata('RdfProperty', target);
            if (!ns && !beanType && !properties) {
                throw new Error('No decorators found');
            }
            if (properties) {
                properties.forEach(function (p) {
                    // If clazz property is present then it is an Object
                    var propertyClassType = p.decoratorMetadata.clazz;
                    var inversedPredicate = p.decoratorMetadata.inverseOfPredicate;
                    var serializer = p.decoratorMetadata.serializer;
                    // ?subject ?predicate ?object
                    var rdfPredicateString = p.decoratorMetadata.predicate;
                    var predicate = _this.makePredicate(rdfPredicateString);
                    var xsdDataTypeString = p.decoratorMetadata.xsdType;
                    var xsdDataType;
                    if (xsdDataTypeString) {
                        xsdDataType = n3_1.DataFactory.namedNode(xsdDataTypeString);
                    }
                    var lang = p.decoratorMetadata.lang;
                    var isIRI = p.decoratorMetadata.isIRI;
                    if (lang && xsdDataTypeString) {
                        throw new IllegalArgumentError_1.IllegalArgumentError("Key " + p.key + " cannot have both lang and xsdType present inside the decorator");
                    }
                    if (lang && xsdDataTypeString && isIRI || lang && isIRI || xsdDataTypeString && isIRI) {
                        throw new IllegalArgumentError_1.IllegalArgumentError("Key " + p.key + " cannot have both lang or xsdType present when isIRI is set to true inside the decorator");
                    }
                    // If value is set for the current key, process it
                    if (p.val !== undefined) {
                        // If this is an Object, clazz annotated
                        if (propertyClassType) {
                            _this.processClazzAnnotatedPropertyValue(p.val, subject_1, predicate, xsdDataType, inversedPredicate, serializer);
                        }
                        // If not clazz annotated, then it's a literal
                        else {
                            _this.processPrimitiveValue(p.val, subject_1, predicate, xsdDataType, lang, isIRI, serializer);
                        }
                    }
                });
            }
            return subject_1;
        }
    };
    SerializerProcessor.prototype.processClazzAnnotatedPropertyValue = function (value, subject, predicate, xsdDataType, inversedPredicate, serializer) {
        if (Array.isArray(value)) {
            this.processArrayOfObjectValues(value, subject, predicate, inversedPredicate);
        }
        else {
            this.processClazzAnnotatedObjectValue(value, subject, predicate, xsdDataType, inversedPredicate, serializer);
        }
    };
    SerializerProcessor.prototype.processPrimitiveValue = function (value, subject, predicate, xsdDataType, lang, isIRI, serializer) {
        if (serializer) {
            this.processPrimiteValueWithAnnotatedSerializer(value, subject, predicate, xsdDataType, lang, serializer);
        }
        else {
            if (value instanceof Date) {
                this.processValueOfDateTypeWithDefaultSerializer(value, subject, predicate, xsdDataType);
            }
            else if (Array.isArray(value)) {
                this.processArrayOfPrimitiveValues(value, subject, predicate, xsdDataType, lang, isIRI);
            }
            else if (isIRI) {
                var objectResource = n3_1.DataFactory.namedNode(value);
                var q = this.createQuad(subject, predicate, objectResource);
                this.quadsArr.push(q);
            }
            else {
                var objectLiteral = void 0;
                if (lang) {
                    objectLiteral = this.makeLiteral(value, lang);
                }
                if (xsdDataType) {
                    objectLiteral = this.makeLiteral(value, xsdDataType);
                }
                var q = this.createQuad(subject, predicate, objectLiteral);
                this.quadsArr.push(q);
            }
        }
    };
    SerializerProcessor.prototype.processClazzAnnotatedObjectValue = function (value, subject, predicate, xsdDataType, inversedPredicate, serializer) {
        if (serializer) {
            var s = this.getOrCreateSerializer(serializer);
            var objectLiteral = this.makeLiteral(s.serialize(value), xsdDataType);
            var q = this.createQuad(subject, predicate, objectLiteral);
            this.quadsArr.push(q);
        }
        else {
            if (value instanceof Date) {
                this.processValueOfDateTypeWithDefaultSerializer(value, subject, predicate, xsdDataType);
            }
            else {
                if (inversedPredicate) {
                    var resultObject = this.process(value, subject, inversedPredicate); // returns NamedNode
                    var q = this.createQuad(subject, predicate, resultObject);
                    this.quadsArr.push(q);
                }
                else {
                    var resultObject = this.process(value); // returns NamedNode
                    var q = this.createQuad(subject, predicate, resultObject);
                    this.quadsArr.push(q);
                }
            }
        }
    };
    SerializerProcessor.prototype.processPrimiteValueWithAnnotatedSerializer = function (value, subject, predicate, xsdDataType, lang, serializer) {
        var _a;
        var s = this.getOrCreateSerializer(serializer);
        if (s.isBnodeSerializer) {
            this.prefixes = __assign({}, this.prefixes, s.prefixes);
            var q = this.createQuad(subject, predicate, s.subject);
            (_a = this.quadsArr).push.apply(_a, s.serialize(value));
            this.quadsArr.push(q);
        }
        else {
            var objectLiteral = void 0;
            if (lang) {
                objectLiteral = this.makeLiteral(s.serialize(value), lang);
            }
            if (xsdDataType) {
                objectLiteral = this.makeLiteral(s.serialize(value), xsdDataType);
            }
            var q = this.createQuad(subject, predicate, objectLiteral);
            this.quadsArr.push(q);
        }
    };
    SerializerProcessor.prototype.processValueOfDateTypeWithDefaultSerializer = function (value, subject, predicate, xsdDataType) {
        var s = new ISODateSerializer_1.ISODateSerializer();
        var objectLiteral = this.makeLiteral(s.serialize(value), xsdDataType);
        var qq = this.createQuad(subject, predicate, objectLiteral);
        this.quadsArr.push(qq);
    };
    SerializerProcessor.prototype.processArrayOfObjectValues = function (values, subject, predicate, inversedPredicate) {
        var _this = this;
        values.forEach(function (prop) {
            if (inversedPredicate) {
                var resultObject = _this.process(prop, subject, inversedPredicate);
                var q = _this.createQuad(subject, predicate, resultObject);
                _this.quadsArr.push(q);
            }
            else {
                var resultObject = _this.process(prop);
                var q = _this.createQuad(subject, predicate, resultObject);
                _this.quadsArr.push(q);
            }
        });
    };
    SerializerProcessor.prototype.processArrayOfPrimitiveValues = function (values, subject, predicate, xsdDataType, lang, isIRI, serializer) {
        var _this = this;
        values.forEach(function (val) {
            var objectLiteral;
            if (isIRI) {
                var objectResource = n3_1.DataFactory.namedNode(val);
                var q = _this.createQuad(subject, predicate, objectResource);
                _this.quadsArr.push(q);
            }
            else {
                if (xsdDataType) {
                    objectLiteral = _this.makeLiteral(val, xsdDataType);
                }
                if (lang) {
                    objectLiteral = _this.makeLiteral(val, lang);
                }
                var q = _this.createQuad(subject, predicate, objectLiteral);
                _this.quadsArr.push(q);
            }
        });
    };
    SerializerProcessor.prototype.makeLiteral = function (value, languageOrDatatype) {
        return n3_1.DataFactory.literal(value, languageOrDatatype);
    };
    SerializerProcessor.prototype.makeSubject = function (rdfSubjectDecorator) {
        var subject;
        if (rdfSubjectDecorator) {
            if (/^(http|https):\/\/?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
                .test(rdfSubjectDecorator.prop) || rdfSubjectDecorator.prop === 'http://') {
                subject = n3_1.DataFactory.namedNode("" + rdfSubjectDecorator.prop + rdfSubjectDecorator.val);
            }
            else {
                subject = n3_1.DataFactory.namedNode(rdfSubjectDecorator.prop + ":" + rdfSubjectDecorator.val);
            }
        }
        else {
            subject = n3_1.DataFactory.blankNode();
        }
        return subject;
    };
    SerializerProcessor.prototype.makePredicate = function (rdfPredicateString) {
        var predicate;
        if (rdfPredicateString) {
            predicate = n3_1.DataFactory.namedNode(rdfPredicateString);
            return predicate;
        }
        else {
            throw new Error('predicate is a mandatory property');
        }
    };
    SerializerProcessor.prototype.createQuad = function (subject, predicate, object) {
        return n3_1.DataFactory.quad(subject, predicate, object);
    };
    SerializerProcessor.prototype.getTTLString = function () {
        var result;
        this.n3Writer.end(function (error, r) {
            result = r;
        });
        return result;
    };
    SerializerProcessor.prototype.getN3NsPrefixObject = function (ns) {
        var r = {};
        var keys = Object.keys(ns);
        keys.forEach(function (key) {
            r[key] = n3_1.DataFactory.namedNode(ns[key]);
        });
        r['tsRdfMapper'] = n3_1.DataFactory.namedNode('http://ts-rdf-mapper.com#');
        return r;
    };
    SerializerProcessor.prototype.sortQuads = function (arr) {
        arr.sort(function (a, b) {
            if (a.subject.value < b.subject.value) {
                return 1;
            }
            if (a.subject.value > b.subject.value) {
                return -1;
            }
            return 0;
        });
    };
    /**
     * Checks to see if the serializer already exists or not.
     * If not, creates a new one and caches it, returns the
     * cached instance otherwise.
     */
    SerializerProcessor.prototype.getOrCreateSerializer = function (type) {
        return Utils_1.Utils.getCachedType(type, this.serializers);
    };
    return SerializerProcessor;
}());
exports.SerializerProcessor = SerializerProcessor;
//# sourceMappingURL=SerializerProcessor.js.map