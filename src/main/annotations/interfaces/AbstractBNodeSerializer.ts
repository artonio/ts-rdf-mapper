import * as N3 from 'n3';
import * as RDF from 'rdf-js';

export type RDFQuad = RDF.Quad;
export type RDFLiteral = RDF.Literal;
export type RDFResourceIRI = RDF.NamedNode;
export type RDFBlankNode = RDF.BlankNode;

export abstract class AbstractBNodeSerializer {

    protected prefixes: N3.Prefixes = {xsd: this.makeResourceIRI('http://www.w3.org/2001/XMLSchema#')};
    protected subject: RDFBlankNode = this.makeBlankNode();
    protected readonly isBnodeSerializer = true;

    abstract serialize(value: Object): RDFQuad[];

    protected createQuad(subject: RDF.Term, predicate: RDF.Term, object: RDF.Term): RDFQuad {
        return N3.DataFactory.quad(
            subject,
            predicate,
            object
        );
    }

    protected makePredicate(value: string): RDFResourceIRI {
        return this.makeResourceIRI(value);
    }

    protected makeLiteralWithDataType(value: string | number, xsdDataType: string): RDFLiteral {
        return this.makeLiteral(value, this.makeResourceIRI(xsdDataType));
    }

    protected makeLangLiteral(value: string | number, lang: string): RDFLiteral {
        return this.makeLiteral(value, lang);
    }

    private makeLiteral(value: string | number, languageOrDatatype?: string | RDFResourceIRI): RDFLiteral {
        return N3.DataFactory.literal(value, languageOrDatatype);
    }

    protected makeResourceIRI(value: string): RDFResourceIRI {
        return N3.DataFactory.namedNode(value);
    }

    protected makeBlankNode(value?: string): RDFBlankNode {
        return N3.DataFactory.blankNode(value);
    }

    protected addPrefix(prefix: string, iri: string): void {
        if (/[#/]$/.test(iri)) {
            this.prefixes[prefix] = this.makeResourceIRI(iri);
        } else {
            throw new Error('Prefix IRI must end with # or / symbol');
        }
    }
}
