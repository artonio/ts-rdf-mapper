# ts-rdf-mapper

Typescript RDF Turtle Serializer/Deserializer

Library written in typescript using reflect-metadata. Decorators are used to annotate classes and properties.

1. Clone
2. npm install
3. npm run build-test

look in test folder for tests

[Typescript Docs and Examples](https://antonsuhovatkin.bitbucket.io/)

- [Features](#features)
- [Examples And Usage](#examples-and-usage)
    * [Decorators](#decorators)
        + [RdfPrefixes](#rdfprefixes)
        + [RdfBean](#rdfbean)
        + [RdfSubject](#rdfsubject)
        + [RdfProperty](#rdfproperty)
    * [Serialize](#serialize)
    * [Deserialize](#deserialize)


# Features

* Map Typescript primitives to standard XML-Schema literals
* Serialize Typescript Date objects with built-in ISO Date Serializer
* Implement IRDFSerializer interface to serialize Date objects or primitives however you want
* Serialize strings with a xsd datatype or a lang tag i.e 'Pineapple'@en, 'Ananas'@ru
* Recursive data structures support
* Inheritance Support
* Serialize/Deserialize Blank Nodes
* Serialize/Deserialize plain json objects by extending AbstractBNodeSerializer
* Proven javascript library N3.js under the hood

# Examples And Usage
## Decorators
### RdfPrefixes
> decorator specifies one or more RDF namespace prefixes in the format *[key: string]: string*. i.e 

```ts
@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    person: 'http://example.com/Person/'
})
class Person {}
```
### RdfBean
> **OPTIONAL** - Defines the type (xsd:type) of Resource

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

@RdfBean should be present on the parent class for proper deserialization

### RdfSubject
> **Optional** - Resource Identifier. If this decorator is absent then the subject will be a Blank Node
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

or if @RdfSubject is not present on class Person:

```
@prefix foaf: <http://xmlns.com/foaf/0.1/>.
@prefix person: <http://example.com/Person/>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.

_:b1 a foaf:Person;
```

### RdfProperty
> Used to annotate object properties. Can also be used to annotate typescript setters
## Serialize
Let's take a simple example of Friend Has Friend
```ts
@RdfPrefixes({
    foaf: 'http://xmlns.com/foaf/0.1/',
    person: 'http://example.com/Person/'
})
@RdfBean('foaf:Person')
export class PersonHasFriend {
    @RdfSubject('person')
    public uuid: string;

    @RdfProperty({predicate: 'foaf:name', xsdType: XSDDataType.XSD_STRING})
    public name: string;

    @RdfProperty({predicate: 'foaf:knows', clazz: PersonHasFriend, inverseOfPredicate: 'foaf:knows'})
    public knows: PersonHasFriend;
}
```
Let's break it down. First we define prefixes in order to shorten the URI identifiers.

Next we will include an @RdfBean decorator. RdfBean is used to identify the xsd:type of the Resource. 
This property is optional.

Now onto @RdfSubject decorator. This decorator is used to create an URI identifier for your object. If this decorator is
absent, the resulting resource will be a blank node. You can pass a namespace prefix name that we defined in @RdfPrefixes
or a url. The @RdfSubject parameter and the variable value will be concatenated to create a resource identifier.

```ts
const antonPerson: PersonHasFriend = new PersonHasFriend();
antonPerson.uuid = 'Anton';
antonPerson.name = 'Anton S';

const johnDoePerson: PersonHasFriend = new PersonHasFriend();
johnDoePerson.uuid = 'John';
johnDoePerson.name = 'John Doe';
antonPerson.knows = johnDoePerson;

const r = RdfMapper.serialize(antonPerson);
``` 

which should produce the following TTL (TURTLE) output

```$xslt
person:John a foaf:Person;
    foaf:knows person:Anton;
    foaf:name "John Doe"^^xsd:string.
person:Anton a foaf:Person;
    foaf:name "Anton S"^^xsd:string;
    foaf:knows person:John.
```

We can see that Anton knows John, but also that John knows Anton even though we did not explicitly specify it.

@RdfProperty has a special inverseOfPredicate property which allows us to point backwards to the previous object.
## Deserialize

See deserialize.spec.ts file for more examples
