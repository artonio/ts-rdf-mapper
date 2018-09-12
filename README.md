# ts-rdf-mapper

Typescript RDF Turtle Serializer/Deserializer

Library written in typescript using reflect-metadata. Decorators are used to annotate classes and properties.

1. Clone
2. npm install
3. npm run build-test

look in test folder for tests

- [Features](#features)
- [Examples And Usage](#examples-and-usage)
    * [Decorators](#decorators)
        + [RdfPrefixes](#@rdfprefixes)
        + [RdfBean](#@rdfbean)
        + [RdfSubject](#@rdfsubject)
        + [RdfProperty](#@rdfproperty)
    * [Serialize](#serialize)
    * [Deserialize](#deserialize)


# Features

* Map Typescript primitives to standard XML-Schema literals
* Serialize Typescript Date objects with built-in ISO Date Serializer
* Implement IRDFSerializer interface to serialize Date objects or primitives however you want
* Serialize strings with a xsd datatype or a lang tag i.e 'Pineapple'@en, 'Ananas'@ru
* Supports recursive data structures
* Inheritance Support
* Serialize/Deserialize Blank Nodes
* Serialize/Deserialize plain json objects by extending AbstractBNodeSerializer
* Proven javascript library N3.js under the hood

# Examples And Usage
## Decorators
### @RdfPrefixes
> decorator specifies one or more RDF namespace prefixes in the format *[key: string]: string*. i.e 

```ts
@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    person: 'http://example.com/Person/'
})
class Person {}
```
### @RdfBean
> **OPTIONAL** - Defines the type (xsd:type) of Resource. If this decorator is not present, a blank node will be created

Example:

```ts
@RdfPrefixes({
  foaf: 'http://xmlns.com/foaf/0.1/',
  person: 'http://example.com/Person/'
})
@RdfBean('foaf:Person')
export class Person {
 @RdfSubject('person')
 public name: string;
}

const p = new Person();
p.name = 'John';
RdfMapper.serialize(p)
```
produces the following TURTLE:
```
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix person: <http://example.com/Person/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

person:John a foaf:Person;
```

or if @RdfBean is not present on class Person:

```
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix person: <http://example.com/Person/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

_:b1 a foaf:Person;
```

@RdfBean should be present on the parent class for proper deserialization

### @RdfSubject
###@RdfProperty

## Serialize

## Deserialize


```ts
@RdfPrefixes([
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
