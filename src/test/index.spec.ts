import 'reflect-metadata';
import {RdfBean} from '../main/annotations/RdfBean';
import {RdfPrefixes} from '../main/annotations/RdfPrefixes';
import {RdfProperty} from '../main/annotations/RdfProperty';
import {RdfSubject} from '../main/annotations/RdfSubject';
import {XSDDataType} from '../main/annotations/XSDDataType';
import {RdfMapper} from '../main/RdfMapper';
import {User} from './models/litralSerializer';
import {
    Addr,
    Calendar,
    Days,
    Month,
    MonthWithIRI,
    Per,
    PersonHasFriend,
    PersonMultipleDataTypes,
    SuperBase
} from './models/models';
import {Address} from './models/oneToOneModels';
import {Recipe, Video} from './models/recipes';
import {RdfIngredient, RdfRecipe} from './models/recipesManyToMany';
import {Recipe1, Video1} from './models/serializeIsIRI';
import {UserJsonObject} from './models/serializeJsonObj';

const SERIALIZE_BASIC_TYPES = 'Should serialize basic types';
const SERIALIZE_BASIC_TYPES_CHANGE_VALUE = 'Should serialize basic types, change property values';
const SERIALIZE_ONE_TO_ONE = 'Serialize one to one relationship';
const SERIALIZE_PERSON_HAS_FRIEND = 'Serialize person has friend person';

const SERIALIZE_ONE_TO_MANY = 'Serialize one to many relationship';
const SERIALIZE_ONE_TO_MANY_AND_INVERSEOF = 'Serialize Recipe has many ingredients and inverseof';

const SERIALIZE_BASIC_INHERITANCE = 'Serialize basic inheritance';
const SERIALIZE_ENUMS = 'Serialize Enums';

const SERIALIZE_ARRAY_OF_LITERALS = 'Should serialize array of literals';
const SERIALIZE_ARRAY_OF_IRIs = 'Should serialize array of IRIs';
const SERIALIZE_ARRAY_OF_OBJECTS = 'Serialize Array of objects';

const SERIALIZE_LITERALS_CUSTOM_SERIALIZER = 'Serialize literal with customs serializer';
const SERIALIZE_INTO_BLANK_NODE = 'Should serialize into a blank node';
const SERIALIZE_INTO_BLANK_NODE_ISIRI = 'Serialize into blank node with isIRI';
const SERIALIZE_JSON_USING_DYNAMIC_SERIALIZER = 'Serialize json with dynamic serializer';

const shouldLogResult = false;

function logResult(assertName: string, result: any, logOnlyMe?: boolean) {
    if (shouldLogResult || logOnlyMe) {
        console.log(`Expectation: ${assertName}`);
        console.log(`Result:\n${result}`);
    }
}

describe('Testing basic serialization functions', () => {
    it(SERIALIZE_BASIC_TYPES, () => {
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

        logResult(SERIALIZE_BASIC_TYPES, b);
    });

    it(SERIALIZE_BASIC_TYPES_CHANGE_VALUE, () => {
        const p = new PersonMultipleDataTypes();
        p.gender = 'M';
        p.uuid = '123345dfx';
        p.name = 'Anton';
        p.name = 'Ant';
        p.name = 'John';

        const r = RdfMapper.serialize(p);
        expect(r).toContain(`person:123345dfx a foaf:Person;`);
        expect(r).toContain(`person:name "John"`);
        expect(r).toContain(`person:gender "M"^^xsd:string;`);

        logResult(SERIALIZE_BASIC_TYPES_CHANGE_VALUE, r);
    });

    it(SERIALIZE_ONE_TO_ONE, () => {
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

        const r = RdfMapper.serialize(p);
        expect(r).toContain(`person:person-uuid a foaf:Person;`);
        expect(r).toContain(`person:name "John"^^xsd:string;`);
        expect(r).toContain(`person:hasAddress address:address-uuid.`);
        expect(r).toContain(`address:address-uuid a foaf:Address;`);
        expect(r).toContain(`address:streetName "Jasmine"^^xsd:string.`);

        logResult(SERIALIZE_ONE_TO_ONE, r);
    });

    it(SERIALIZE_PERSON_HAS_FRIEND, () => {
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

        logResult(SERIALIZE_PERSON_HAS_FRIEND, r);
    });

    it(SERIALIZE_ONE_TO_MANY, () => {
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

        const r = RdfMapper.serialize(p);
        // console.log(b);
        expect(r).toContain(`person:person-uuid a foaf:Person;`);
        expect(r).toContain(`address:uuid2 a foaf:Address;`);
        expect(r).toContain(`address:uuid1 a foaf:Address;`);

        expect(r).toContain(`person:hasAddress address:uuid1, address:uuid2.`);

        expect(r).toContain(`address:houseNum "223"^^xsd:string`);
        expect(r).toContain(`address:streetName "Joseph"^^xsd:string`);

        expect(r).toContain(`address:houseNum "223"^^xsd:string`);
        expect(r).toContain(`address:streetName "Jasmine"^^xsd:string`);

        logResult(SERIALIZE_ONE_TO_MANY, r);

    });

    it(SERIALIZE_ONE_TO_MANY_AND_INVERSEOF, () => {
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

        logResult(SERIALIZE_ONE_TO_MANY_AND_INVERSEOF, r);
    });

    it(SERIALIZE_BASIC_INHERITANCE, () => {
        const sb = new SuperBase();
        sb.uuid = 'inheritance-uuid';
        sb.baseProp = 'baseValue';
        sb.extendedProp = 'extendedValue';

        const r = RdfMapper.serialize(sb);
        expect(r).toContain(`foaf:inheritance-uuid a foaf:SuperBase;`);
        expect(r).toContain(`foaf:baseProp "baseValue"^^xsd:string;`);
        expect(r).toContain(`foaf:extendedProp "extendedValue"^^xsd:string.`);

        logResult(SERIALIZE_BASIC_INHERITANCE, r);
    });

    it(SERIALIZE_ENUMS, () => {
        const cal = new Calendar();
        cal.uuid = 'cal-uuid';
        cal.day = Days.Mon;

        const r = RdfMapper.serialize(cal);

        expect(r).toContain(`calendar:cal-uuid a foaf:Calendar;`);
        expect(r).toContain(`foaf:day "Mon"^^xsd:string.`);

        logResult(SERIALIZE_ENUMS, r);
    });

    it(SERIALIZE_ARRAY_OF_LITERALS, () => {
        const month: Month = new Month();
        month.uuid = 'month-uuid';
        month.days = ['Mon', 'Tue', 'Wed'];

        const r = RdfMapper.serialize(month);
        expect(r).toContain(`month:month-uuid a foaf:Month;`);
        expect(r).toContain(`foaf:day "Mon"^^xsd:string, "Tue"^^xsd:string, "Wed"^^xsd:string.`);

        logResult(SERIALIZE_ARRAY_OF_LITERALS, r);
    });

    it(SERIALIZE_ARRAY_OF_IRIs, () => {
       const month: MonthWithIRI = new MonthWithIRI();
        month.uuid = 'monthWithIRIDays-uuid';
        month.days = ['http://example.com/Mon', 'http://example.com/Tue', 'http://example.com/Wed'];

        const r = RdfMapper.serialize(month);
        expect(r).toContain(`month:monthWithIRIDays-uuid a foaf:Month;`);
        expect(r).toContain(`foaf:day <http://example.com/Mon>, <http://example.com/Tue>, <http://example.com/Wed>.`);
        logResult(SERIALIZE_ARRAY_OF_IRIs, r, true);
    });

    it(SERIALIZE_ARRAY_OF_OBJECTS, () => {
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

        logResult(SERIALIZE_ARRAY_OF_OBJECTS, r);
    });

    it(SERIALIZE_LITERALS_CUSTOM_SERIALIZER, () => {
        const u: User = new User();
        u.uuid = 'anton';
        u.regDate = new Date().getTime();
        u.birthDate = new Date('1995-12-17T03:24:00');

        const r = RdfMapper.serialize(u);
        logResult(SERIALIZE_LITERALS_CUSTOM_SERIALIZER, r);
    });

    it(SERIALIZE_INTO_BLANK_NODE, () => {
        const recipe: Recipe = new Recipe();
        recipe.recipeName = 'Cheesecake';

        const video: Video = new Video();
        video.name = 'Japanese Cheesecake instructions';
        recipe.video = video;
        const r = RdfMapper.serialize(recipe);
        logResult(SERIALIZE_INTO_BLANK_NODE, r);
    });

    it(SERIALIZE_INTO_BLANK_NODE_ISIRI, () => {
        const recipe: Recipe1 = new Recipe1();
        recipe.recipeName = 'Cheesecake';
        const video: Video1 = new Video1();
        video.url = 'http://example.com/Video1';
        recipe.video = video;
        const r = RdfMapper.serialize(recipe);
        logResult(SERIALIZE_INTO_BLANK_NODE_ISIRI, r);
    });

    it(SERIALIZE_JSON_USING_DYNAMIC_SERIALIZER, () => {
        const u: UserJsonObject = new UserJsonObject();
        u.name = 'Anton';
        u.address = {streetName: 'St Clair', streetNumber: 223, isRegistered: true};
        const r = RdfMapper.serialize(u);
        logResult(SERIALIZE_JSON_USING_DYNAMIC_SERIALIZER, r);
    });

});
