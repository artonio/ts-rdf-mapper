import * as N3 from 'n3';

describe('Testing basic serialization functions', () => {
    // it('test blank nodes', () => {
    //     const writer = N3.Writer({ prefixes: { c: 'http://example.org/cartoons#',
    //             foaf: 'http://xmlns.com/foaf/0.1/' } });
    //     writer.addQuad(
    //         writer.blank(
    //             N3.DataFactory.namedNode('http://xmlns.com/foaf/0.1/givenName'),
    //             N3.DataFactory.literal('Tom', 'en')),
    //         N3.DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    //         N3.DataFactory.namedNode('http://example.org/cartoons#Cat')
    //     );
    //     writer.addQuad(N3.DataFactory.quad(
    //         N3.DataFactory.namedNode('http://example.org/cartoons#Jerry'),
    //         N3.DataFactory.namedNode('http://xmlns.com/foaf/0.1/knows'),
    //         writer.blank([{
    //             predicate: N3.DataFactory.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    //             object:    N3.DataFactory.namedNode('http://example.org/cartoons#Cat'),
    //         }, {
    //             predicate: N3.DataFactory.namedNode('http://xmlns.com/foaf/0.1/givenName'),
    //             object:    N3.DataFactory.literal('Tom', 'en'),
    //         }])
    //     ));
    //     writer.addQuad(
    //         N3.DataFactory.namedNode('http://example.org/cartoons#Mammy'),
    //         N3.DataFactory.namedNode('http://example.org/cartoons#hasPets'),
    //         writer.list([
    //             N3.DataFactory.namedNode('http://example.org/cartoons#Tom'),
    //             N3.DataFactory.namedNode('http://example.org/cartoons#Jerry'),
    //         ])
    //     );
    //     writer.end((error, result) => console.log(result));
    //
    // });
});
