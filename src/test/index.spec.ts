import * as N3 from 'n3';
import 'reflect-metadata';
import {RdfBean} from '../main/annotations/RdfBean';
import {RdfNamespaces} from '../main/annotations/RdfNamespaces';
import {RdfProperty} from '../main/annotations/RdfProperty';
import {RdfSubject} from '../main/annotations/RdfSubject';
import {XSDDataType} from '../main/annotations/XSDDataType';
import {RdfMapper} from '../main/RdfMapper';
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

        const b = RdfMapper.serialize(p);
        console.log(b);

        // const parser = new N3.Parser();
        // parser.parse(b, (error, quad, prefixes) => {
        //     if (quad)
        //         console.log(quad);
        //     else
        //         console.log('# That\'s all, folks!', prefixes);
        // });

    });

});
