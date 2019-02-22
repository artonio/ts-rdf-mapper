import {
    BlankNode,
    DataFactory,
    Literal,
    NamedNode,
    Prefixes,
    Triple
} from 'n3';
/**
 * Convenience alias type for Triple from 'n3'
 */
export type RDFTriple = Triple;
/**
 * Convenience alias type for Literal from 'n3'
 */
export type RDFLiteral = Literal;
/**
 * Convenience alias type for NamedNode from 'n3'
 */
export type RDFResourceIRI = NamedNode;
/**
 * Convenience alias type for BlankNode from 'n3'
 */
export type RDFBlankNode = BlankNode;

export type Triple_Subject = RDFResourceIRI | RDFBlankNode;

export type Triple_Predicate = RDFResourceIRI;

export type Triple_Object = RDFResourceIRI | RDFLiteral | RDFBlankNode;

export interface RDFPrefixes extends Prefixes {}

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
export abstract class AbstractBNodeSerializer {

    /**
     * xsd prefix is created when this class is extended
     *
     * more prefixes can be added by calling *this.addPrefix(prefix: string, iri: string)*
     */
    protected prefixes: RDFPrefixes;
    /**
     * Blank node is created when a developer extends this class. Identifies the *subject* in triple
     *
     * ```
     * subject predicate object
     * ```
     *
     * This can be overridden in the constructor after calling super(); by calling *this.makeBlankNode(id?: string)*
     * with optional id of the blank node
     *
     */
    protected subject: RDFBlankNode;

    /**
     * Used to create a triple with a resource identifier
     * i.e ?subject a ?object
     */
    protected readonly xsdType: RDFResourceIRI = DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type');
    /**
     * @hidden
     */
    protected readonly isBnodeSerializer = true;

    /**
     * @hidden
     */
    protected constructor() {
        this.subject = this.makeBlankNode();
        this.prefixes = {xsd: this.makeResourceIRI('http://www.w3.org/2001/XMLSchema#')};
    }

    /**
     * This method must create a triple for each key:value pair in the provided json object
     *
     * Example:
     *
     * Provided the following was called in constructor *this.addPrefix('address', 'http://example.com/Address/');*
     *
     * ```ts
     * const triples: RDFTriple[] = [];
     *
     *     Object.keys(value).forEach(key => {
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
     *        });
     *
     *     return triples;
     * ```
     * @param value - json object passed i.e.
     *
     * ```ts
     * {
     *     streetName: 'Queen St',
     *     streetNumber: 223,
     *     isRegistered: true
     * }
     * ```
     *
     * @returns An array of triples where each triple in the array corresponds to key:value pairs of the provided json
     */
    abstract serialize(value: Object): RDFTriple[];

    /**
     * Create a triple by providing subject predicate object
     *
     * @param subject - must be of type [[Triple_Subject]]
     * @param predicate - must be of type [[Triple_Predicate]]
     * @param object - must be of type [[Triple_Object]]
     */
    protected createTriple(subject: Triple_Subject, predicate: Triple_Predicate, object: Triple_Object): RDFTriple {
        return DataFactory.quad(
            subject,
            predicate,
            object
        );
    }

    /**
     * Convenience method to make predicate
     * @param value - *in the form of IRI or prefixed IRI (e.g. xsd:type)*
     */
    protected makePredicate(value: string): RDFResourceIRI {
        return this.makeResourceIRI(value);
    }

    /**
     * Create a literal with provided xsdDataType
     * @param value
     * @param xsdDataType - a string or [[XSDDataType]] can be used
     */
    protected makeLiteralWithDataType(value: any, xsdDataType: string): RDFLiteral {
        return this.makeLiteral(value, this.makeResourceIRI(xsdDataType));
    }

    protected makeLangLiteral(value: string | number, lang: string): RDFLiteral {
        return this.makeLiteral(value, lang);
    }

    private makeLiteral(value: string | number, languageOrDatatype?: string | RDFResourceIRI): RDFLiteral {
        return DataFactory.literal(value, languageOrDatatype);
    }

    /**
     * Convenience method to create [[RDFResourceIRI]]
     * @param value
     */
    protected makeResourceIRI(value: string): RDFResourceIRI {
        return DataFactory.namedNode(value);
    }

    protected makeBlankNode(value?: string): RDFBlankNode {
        return DataFactory.blankNode(value);
    }

    /**
     * Add a prefix to the model, **must** be called in the constructor after calling super();
     *
     * Throws an exception if the IRI does not end in '#' or '/' symbol
     * @param prefix - *e.g. 'foaf'*
     * @param iri - *e.g. http://xmlns.com/foaf/0.1/*
     */
    protected addPrefix(prefix: string, iri: string): void {
        if (/[#/]$/.test(iri)) {
            this.prefixes[prefix] = this.makeResourceIRI(iri);
        } else {
            throw new Error('Prefix IRI must end with # or / symbol');
        }
    }
}
