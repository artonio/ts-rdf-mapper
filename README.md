# ts-rdf-mapper

Typescript RDF Turtle ISerializer/IDeserializer

Library written in typescript using reflect-metadata. Decorators for classes which allows serialization/deserialization
of objects to RDF Turtle format using N3.js.

1. Clone
2. npm install
3. npm run build-test

look in test folder for tests


Sample annotation example

```
@RdfNamespaces([
            {prefix: 'foaf', uri: 'http://xmlns.com/foaf/0.1/'},
            {prefix: 'person', uri: 'http://example.com/Person/'}
        ])
        @RdfBean('foaf:Person')
        class Person {

            @RdfSubject('person')
            public uuid: string;

            @RdfProperty({prop: 'person:name', xsdType: XSDDataType.XSD_STRING})
            public name: string;

            @RdfProperty({prop: 'person:gender', xsdType: XSDDataType.XSD_STRING})
            public gender: string;

        }
```
