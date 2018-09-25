import 'reflect-metadata';
import {RdfBean} from '../main/annotations/RdfBean';
import {RdfPrefixes} from '../main/annotations/RdfPrefixes';
import {RdfProperty} from '../main/annotations/RdfProperty';
import {RdfSubject} from '../main/annotations/RdfSubject';
import {XSDDataType} from '../main/annotations/XSDDataType';
import {RdfMapper} from '../main/RdfMapper';
import {User} from './models/litralSerializer';
import {Addr, Calendar, Days, Per, PersonHasFriend, PersonMultipleDataTypes, SuperBase} from './models/models';
import {Address} from './models/oneToOneModels';
import {Recipe, Video} from './models/recipes';
import {RdfIngredient, RdfRecipe} from './models/recipesManyToMany';
import {Recipe1, Video1} from './models/serializeIsIRI';
import {UserJsonObject} from './models/serializeJsonObj';

describe('Testing basic serialization functions', () => {
    it('Should serialize basic types', () => {
        const p = new PersonMultipleDataTypes();
        p.uuid = '123345dfx';
        p.name = 'Anton';
        p.englishName = 'Antony';
        p.gender = 'M';
        p.age = 32;
        p.isAdult = true;
        p.weight = 95.5;
        p.height = 198.5;
        p.buoyancy = 53.2;

        const b = RdfMapper.serialize(p);
        expect(b).toContain(`person:123345dfx a foaf:Person;`);
        expect(b).toContain(`person:name "Anton"^^xsd:string, "Antony"@en;`);
        expect(b).toContain(`person:gender "M"^^xsd:string;`);
        expect(b).toContain(`person:age "32"^^xsd:int;`);
        expect(b).toContain(`person:isAdult "true"^^xsd:boolean;`);
        expect(b).toContain(`person:weight "95.5"^^xsd:double;`);
        expect(b).toContain(`person:height "198.5"^^xsd:long;`);
        expect(b).toContain(`person:buoyancy "53.2"^^xsd:float.`);
        // console.log(b);

    });

    it('Should serialize basic, change properties', () => {
        const p = new PersonMultipleDataTypes();
        p.gender = 'M';
        p.uuid = '123345dfx';
        p.name = 'Anton';
        p.name = 'Ant';
        p.name = 'John';

        const b = RdfMapper.serialize(p);
        expect(b).toContain(`person:123345dfx a foaf:Person;`);
        expect(b).toContain(`person:name "John"`);
        expect(b).toContain(`person:gender "M"^^xsd:string;`);
        console.log(b);
    });

    it('Serialize one to one relationship', () => {
        @RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            person: 'http://example.com/Person/',
            address: 'http://xmlns.com/foaf/0.1/address/'
        })
        @RdfBean('foaf:Address')
        class Address1 {
            @RdfSubject('address')
            public uuid: string;

            @RdfProperty({predicate: 'address:streetName', xsdType: XSDDataType.XSD_STRING})
            public streetName: string;

        }

        @RdfPrefixes({
            foaf: 'http://xmlns.com/foaf/0.1/',
            person: 'http://example.com/Person/'
        })
        @RdfBean('foaf:Person')
        class Person1 {
            @RdfSubject('person')
            public uuid: string;

            @RdfProperty({predicate: 'person:name', xsdType: XSDDataType.XSD_STRING})
            public name: string;

            @RdfProperty({predicate: 'person:hasAddress', clazz: Address})
            public address: Address1;
        }

        const a = new Address1();
        a.uuid = 'address-uuid';
        a.streetName = 'Jasmine';

        const p = new Person1();
        p.uuid = 'person-uuid';
        p.name = 'John';
        p.address = a;

        const b = RdfMapper.serialize(p);
        expect(b).toContain(`person:person-uuid a foaf:Person;`);
        expect(b).toContain(`person:name "John"^^xsd:string;`);
        expect(b).toContain(`person:hasAddress address:address-uuid.`);
        expect(b).toContain(`address:address-uuid a foaf:Address;`);
        expect(b).toContain(`address:streetName "Jasmine"^^xsd:string.`);

        // console.log(b);

    });

    it('Serialize person has friend person', () => {
        const antonPerson: PersonHasFriend = new PersonHasFriend();
        antonPerson.uuid = 'Anton';
        antonPerson.name = 'Anton S';

        const oscarPerson: PersonHasFriend = new PersonHasFriend();
        oscarPerson.uuid = 'Oscar';
        oscarPerson.name = 'Oscar Sisek';
        antonPerson.knows = oscarPerson;

        const r = RdfMapper.serialize(antonPerson);
        expect(r).toContain(`person:Oscar a foaf:Person;`);
        expect(r).toContain(`foaf:knows person:Anton;`);
        expect(r).toContain(`foaf:name "Oscar Sisek"^^xsd:string.`);
        expect(r).toContain(`person:Anton a foaf:Person;`);
        expect(r).toContain(`foaf:name "Anton S"^^xsd:string;`);
        expect(r).toContain(`foaf:knows person:Oscar.`);
        console.log(r);

    });

    it('Serialize Recipe has many ingredients and inverseof', () => {
        const recipe: RdfRecipe = new RdfRecipe();
        recipe.recipeIdentifier = 'Lasagna';
        recipe.recipeName = 'Lasagna';

        const beefIngredient: RdfIngredient = new RdfIngredient();
        beefIngredient.ingredientIdentifier = 'beef';
        beefIngredient.ingredientName = 'Ground Beef';
        beefIngredient.quantity = 200;
        beefIngredient.qualifier = 'grams';

        const spaghettiSauce: RdfIngredient = new RdfIngredient();
        spaghettiSauce.ingredientIdentifier = 'spag';
        spaghettiSauce.ingredientName = 'Spaghetti Sauce';
        spaghettiSauce.quantity = 800;
        spaghettiSauce.qualifier = 'grams';

        recipe.ingredients = [beefIngredient, spaghettiSauce];

        const r = RdfMapper.serialize(recipe);
        console.log(r);
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

        const r = RdfMapper.serialize(sb);
        expect(r).toContain(`foaf:inheritance-uuid a foaf:SuperBase;`);
        expect(r).toContain(`foaf:baseProp "baseValue"^^xsd:string;`);
        expect(r).toContain(`foaf:extendedProp "extendedValue"^^xsd:string.`);
        // console.log(r);
    });

    it('Serialize Enums', () => {
       const cal = new Calendar();
       cal.uuid = 'cal-uuid';
       cal.day = Days.Mon;

        const r = RdfMapper.serialize(cal);
        // console.log(r);

        expect(r).toContain(`calendar:cal-uuid a foaf:Calendar;`);
        expect(r).toContain(`foaf:day "Mon"^^xsd:string.`);
    });

    it('Serialize Array', () => {
        const addr1: Address = new Address();
        addr1.uuid = 'addr1-uuid';
        addr1.streetName = 'Zigg';

        const addr2: Address = new Address();
        addr2.uuid = 'addr2-uuid';
        addr2.streetName = 'St Clair';

        const r = RdfMapper.serialize([addr1, addr2]);
        expect(r).toContain(`address:addr2-uuid a foaf:Address;`);
        expect(r).toContain(`address:streetName "St Clair"^^xsd:string.`);
        expect(r).toContain(`address:addr1-uuid a foaf:Address;`);
        expect(r).toContain(`address:streetName "Zigg"^^xsd:string.`);
        // console.log(r);
    });

    it('Serialize literal with customs serializer', () => {
        const u: User = new User();
        u.uuid = 'anton';
        u.regDate = new Date().getTime();
        u.birthDate = new Date('1995-12-17T03:24:00');

        const r = RdfMapper.serialize(u);
        console.log(r);
    });

    it('Should serialize into a blank node', () => {
        const recipe: Recipe = new Recipe();
        recipe.recipeName = 'Cheesecake';

        const video: Video = new Video();
        video.name = 'Japanese Cheesecake instructions';
        recipe.video = video;
        const r = RdfMapper.serialize(recipe);
        console.log(r);
    });

    it('Serialize into blank node with isIRI', () => {
        const recipe: Recipe1 = new Recipe1();
        recipe.recipeName = 'Cheesecake';
        const video: Video1 = new Video1();
        video.url = 'http://example.com/Video1';
        recipe.video = video;
        const r = RdfMapper.serialize(recipe);
        console.log(r);
    });

    it('Serialize json with dynamic serializer', () => {
        const u: UserJsonObject = new UserJsonObject();
        u.name = 'Anton';
        u.address = {streetName: 'St Clair', streetNumber: 223, isRegistered: true};
        const r = RdfMapper.serialize(u);
        console.log(r);
    });

});
