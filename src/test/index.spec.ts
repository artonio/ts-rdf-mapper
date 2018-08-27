import 'reflect-metadata';
import {RdfBean} from '../main/annotations/RdfBean';
import {RdfNamespaces} from '../main/annotations/RdfNamespaces';
import {RdfProperty} from '../main/annotations/RdfProperty';
import {RdfSubject} from '../main/annotations/RdfSubject';
import {XSDDataType} from '../main/annotations/XSDDataType';
import {RdfMapper} from '../main/RdfMapper';
import {Addr, Calendar, Days, Per, personTTL, SuperBase} from './models/models';

describe('Testing basic serialization functions', () => {
    it('Should serialize basic types', () => {

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

            @RdfProperty({prop: 'person:age', xsdType: XSDDataType.XSD_INT})
            public age: number;

            @RdfProperty({prop: 'person:isAdult', xsdType: XSDDataType.XSD_BOOLEAN})
            public isAdult: boolean;

            @RdfProperty({prop: 'person:weight', xsdType: XSDDataType.XSD_DOUBLE})
            public weight: number;

            @RdfProperty({prop: 'person:height', xsdType: XSDDataType.XSD_LONG})
            public height: number;

            @RdfProperty({prop: 'person:buoyancy', xsdType: XSDDataType.XSD_FLOAT})
            public buoyancy: number;

        }

        const p = new Person();
        p.uuid = '123345dfx';
        p.name = 'Anton';
        p.gender = 'M';
        p.age = 32;
        p.isAdult = true;
        p.weight = 95.5;
        p.height = 198.5;
        p.buoyancy = 53.2;

        // const b = RdfMapper.serialize(p);
        // console.log(b);

        // const parser = new N3.Parser();
        // parser.parse(b, (error, quad, prefixes) => {
        //     if (quad)
        //         console.log(quad);
        //     else
        //         console.log('# That\'s all, folks!', prefixes);
        // });

    });

    it('Serialize one to one relationship', () => {
        @RdfNamespaces([
            {prefix: 'foaf', uri: 'http://xmlns.com/foaf/0.1/'},
            {prefix: 'person', uri: 'http://example.com/Person/'},
            {prefix: 'address', uri: 'http://xmlns.com/foaf/0.1/address/'}
        ])
        @RdfBean('foaf:Address')
        class Address {
            @RdfSubject('address')
            public uuid: string;

            @RdfProperty({prop: 'address:streetName', xsdType: XSDDataType.XSD_STRING})
            public streetName: string;

        }

        @RdfNamespaces([
            {prefix: 'foaf', uri: 'http://xmlns.com/foaf/0.1/'},
            {prefix: 'person', uri: 'http://example.com/Person/'}
        ])
        @RdfBean('foaf:Person')
        class Person1 {
            @RdfSubject('person')
            public uuid: string;

            @RdfProperty({prop: 'person:name', xsdType: XSDDataType.XSD_STRING})
            public name: string;

            @RdfProperty({prop: 'person:hasAddress', clazz: Address})
            public address: Address;
        }

        const a = new Address();
        a.uuid = 'address-uuid';
        a.streetName = 'Jasmine';

        const p = new Person1();
        p.uuid = 'person-uuid';
        p.name = 'John';
        p.address = a;

        // const b = RdfMapper.serialize(p);
        // console.log(b);

    });

    it('Serialize one to many relationship', () => {
        const a1 = new Addr();
        a1.uuid = 'uuid1';
        a1.houseNum = 10;
        a1.streetName = 'Jasmine';

        const a2 = new Addr();
        a2.uuid = 'uuid2';
        a2.houseNum = 223;
        a2.streetName = 'Joseph';

        const p = new Per();
        p.uuid = 'person-uuid';
        p.addresses = [a1, a2];

        const b = RdfMapper.serialize(p);
        // console.log(b);
        expect(b).toContain(`person:person-uuid a foaf:Person;`);
        expect(b).toContain(`address:uuid2 a foaf:Address;`);
        expect(b).toContain(`address:uuid1 a foaf:Address;`);

        expect(b).toContain(`person:hasAddress address:uuid1, address:uuid2.`);

        expect(b).toContain(`address:houseNum "223"^^xsd:string`);
        expect(b).toContain(`address:streetName "Joseph"^^xsd:string`);

        expect(b).toContain(`address:houseNum "223"^^xsd:string`);
        expect(b).toContain(`address:streetName "Jasmine"^^xsd:string`);

    });

    it('Serialize basic inheritance', () => {
        const sb = new SuperBase();
        sb.uuid = 'inheritance-uuid';
        sb.baseProp = 'baseValue';
        sb.extendedProp = 'extendedValue';

        // const b = RdfMapper.serialize(sb);
        // console.log(b);
    });

    it('Serialize Enums', () => {
       const cal = new Calendar();
       cal.uuid = 'cal-uuid';
       cal.day = Days.Mon;

        const b = RdfMapper.serialize(cal);
        console.log(b);
    });

    // it('Deserialize basic ttl', async (done) => {
    //     const instance = await RdfMapper.deserialize(Person, personTTL);
    //
    //     console.log(JSON.stringify(instance));
    //     expect(instance.firstName).toEqual('David');
    //     expect(instance.name).toEqual('David Banner');
    //     expect(instance.nick).toEqual('hulk');
    //     expect(instance.surname).toEqual('Banner');
    //     expect(instance.title).toEqual('Mr');
    //
    //     done();
    // });

});
