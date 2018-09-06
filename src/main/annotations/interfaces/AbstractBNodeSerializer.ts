import * as N3 from 'n3';
import * as RDF from 'rdf-js';

export type RDFQuad = RDF.Quad;

export abstract class AbstractBNodeSerializer {

    protected prefixes: N3.Prefixes = {xsd: this.makeIRINamedNode('http://www.w3.org/2001/XMLSchema#')};
    protected subject: RDF.BlankNode = this.makeBlankNode();
    protected readonly isBnodeSerializer = true;

    abstract serialize(value: Object): RDFQuad[];

    protected createQuad(subject: RDF.Term, predicate: RDF.Term, object: RDF.Term): RDFQuad {
        return N3.DataFactory.quad(
            subject,
            predicate,
            object
        );
    }

    protected makePredicate(value: string): RDF.NamedNode {
        return this.makeIRINamedNode(value);
    }

    protected makeLiteralWithDataType(value: string | number, xsdDataType: string): RDF.Literal {
        return this.makeLiteral(value, this.makeIRINamedNode(xsdDataType));
    }

    protected makeLangLiteral(value: string | number, lang: string): RDF.Literal {
        return this.makeLiteral(value, lang);
    }

    private makeLiteral(value: string | number, languageOrDatatype?: string | RDF.NamedNode): RDF.Literal {
        return N3.DataFactory.literal(value, languageOrDatatype);
    }

    protected makeIRINamedNode(value: string): RDF.NamedNode {
        return N3.DataFactory.namedNode(value);
    }

    protected makeBlankNode(value?: string): RDF.BlankNode {
        return N3.DataFactory.blankNode(value);
    }

    protected addPrefix(prefix: string, iri: string): void {
        if (/[#/]$/.test(iri)) {
            this.prefixes[prefix] = N3.DataFactory.namedNode(iri);
        } else {
            throw new Error('Prefix IRI must end with # or / symbol');
        }
    }
}
