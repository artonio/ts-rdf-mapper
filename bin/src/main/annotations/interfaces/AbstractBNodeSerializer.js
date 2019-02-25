"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var n3_1 = require("n3");
/**
 * This class can be extended whenever you may want to serialize a value that is a json object
 *
 * The value will be passed to the class that will extend AbstractBNodeSerializer
 *
 * * Example:
 *
 * ```ts
 * export interface UAddress {
 *    streetName: string;
 *    streetNumber: number;
 *    isRegistered: boolean;
 *  }
 *
 *  export class AddressSerializer extends AbstractBNodeSerializer {
 *
 *    constructor() {
 *        super();
 *        this.addPrefix('address', 'http://example.com/Address/');
 *    }
 *
 *    serialize(value: Object): RDFTriple[] {
 *      const triples: RDFTriple[] = [];
 *
 *      Object.keys(value).forEach(key => {
 *            const predicate: RDFResourceIRI = this.makePredicate(`address:${key}`);
 *            let obj: RDFLiteral;
 *            // if value is a string
 *            if (typeof (value[key]) === 'string') {
 *                obj = this.makeLiteralWithDataType(value[key], 'xsd:string');
 *            }
 *            // If value is boolean
 *            if (typeof (value[key]) === 'boolean') {
 *                obj = this.makeLiteralWithDataType(value[key], 'xsd:boolean');
 *            }
 *            // if value is number
 *            if (typeof (value[key]) === 'number') {
 *                obj = this.makeLiteralWithDataType(value[key], 'xsd:integer');
 *            }
 *            triples.push(this.createTriple(this.subject, predicate, obj));
 *       });
 *
 *     return triples;
 *    }
 *  }
 *
 *  @RdfPrefixes({
 *    foaf: 'http://xmlns.com/foaf/0.1/',
 *    user: 'http://example.com/User/'
 *  })
 *  @RdfBean('foaf:User')
 *  export class User {
 *
 *    @RdfSubject('user')
 *    public name: string;
 *
 *    @RdfProperty({predicate: 'user:address', serializer: AddressSerializer})
 *    public address: UAddress;
 *  }
 *
 *  const u: User = new User();
 *  u.name = 'Anton';
 *  u.address = {streetName: 'Queen St', streetNumber: 223, isRegistered: true};
 *  const r = RdfMapper.serialize(u);
 *
 * ```
 *
 * Resulting turtle:
 *
 * ```
 * @prefix foaf: <http://xmlns.com/foaf/0.1/>.
 * @prefix user: <http://example.com/User/>.
 *  @prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
 * @prefix address: <http://example.com/Address/>.
 *
 * user:Anton a foaf:User;
 * user:address _:n3-2.
 * _:n3-2 address:streetName "Queen St"^^xsd:string;
 * address:streetNumber "223"^^xsd:integer;
 * address:isRegistered "true"^^xsd:boolean.
 * ```
 */
var AbstractBNodeSerializer = /** @class */ (function () {
    /**
     * @hidden
     */
    function AbstractBNodeSerializer() {
        /**
         * Used to create a triple with a resource identifier
         * i.e ?subject a ?object
         */
        this.xsdType = n3_1.DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
        /**
         * @hidden
         */
        this.isBnodeSerializer = true;
        this.subject = this.makeBlankNode();
        this.prefixes = { xsd: this.makeResourceIRI('http://www.w3.org/2001/XMLSchema#') };
    }
    /**
     * Create a triple by providing subject predicate object
     *
     * @param subject - must be of type [[Triple_Subject]]
     * @param predicate - must be of type [[Triple_Predicate]]
     * @param object - must be of type [[Triple_Object]]
     */
    AbstractBNodeSerializer.prototype.createTriple = function (subject, predicate, object) {
        return n3_1.DataFactory.quad(subject, predicate, object);
    };
    /**
     * Convenience method to make predicate
     * @param value - *in the form of IRI or prefixed IRI (e.g. xsd:type)*
     */
    AbstractBNodeSerializer.prototype.makePredicate = function (value) {
        return this.makeResourceIRI(value);
    };
    /**
     * Create a literal with provided xsdDataType
     * @param value
     * @param xsdDataType - a string or [[XSDDataType]] can be used
     */
    AbstractBNodeSerializer.prototype.makeLiteralWithDataType = function (value, xsdDataType) {
        return this.makeLiteral(value, this.makeResourceIRI(xsdDataType));
    };
    AbstractBNodeSerializer.prototype.makeLangLiteral = function (value, lang) {
        return this.makeLiteral(value, lang);
    };
    AbstractBNodeSerializer.prototype.makeLiteral = function (value, languageOrDatatype) {
        return n3_1.DataFactory.literal(value, languageOrDatatype);
    };
    /**
     * Convenience method to create [[RDFResourceIRI]]
     * @param value
     */
    AbstractBNodeSerializer.prototype.makeResourceIRI = function (value) {
        return n3_1.DataFactory.namedNode(value);
    };
    AbstractBNodeSerializer.prototype.makeBlankNode = function (value) {
        return n3_1.DataFactory.blankNode(value);
    };
    /**
     * Add a prefix to the model, **must** be called in the constructor after calling super();
     *
     * Throws an exception if the IRI does not end in '#' or '/' symbol
     * @param prefix - *e.g. 'foaf'*
     * @param iri - *e.g. http://xmlns.com/foaf/0.1/*
     */
    AbstractBNodeSerializer.prototype.addPrefix = function (prefix, iri) {
        if (/[#/]$/.test(iri)) {
            this.prefixes[prefix] = this.makeResourceIRI(iri);
        }
        else {
            throw new Error('Prefix IRI must end with # or / symbol');
        }
    };
    return AbstractBNodeSerializer;
}());
exports.AbstractBNodeSerializer = AbstractBNodeSerializer;
//# sourceMappingURL=AbstractBNodeSerializer.js.map