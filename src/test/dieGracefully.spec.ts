import {IllegalArgumentError} from '../main/exceptions/IllegalArgumentError';
import {TurtleParseError} from '../main/exceptions/TurtleParseError';
import {RdfMapper} from '../main/RdfMapper';
import {invalidTTL, Person} from './models/models';
import {PersonTypeAndIsIRI, PersonTypeAndLang} from './models/wrongfullyAnnotatedModel';

describe('Meaningful Exceptions should be thrown', () => {
    it('Should throw TurtleParseError when turtle is invalid', async (done) => {
        try {
            const instance: Person = await RdfMapper.deserialize(Person, invalidTTL);
        } catch (e) {
            expect(e instanceof TurtleParseError).toBeTruthy();
            expect(e.name).toEqual('TurtleParseError');
        }
        done();
    });

    it('Should throw IllegalArgumentError when xsdType and lang are both present', () => {
        const p: PersonTypeAndLang = new PersonTypeAndLang();
        p.firstName = 'John';
        try {
            RdfMapper.serialize(p);
        } catch (e) {
            expect(e instanceof IllegalArgumentError).toBeTruthy();
            expect(e.name).toEqual('IllegalArgumentError');
            expect(e.message).toEqual('Key firstName cannot have both lang and xsdType present inside the decorator');
        }
    });

    it('Should throw IllegalArgumentError when xsdType and isIRI are both present', () => {
        const p: PersonTypeAndIsIRI = new PersonTypeAndIsIRI();
        p.firstName = 'John';
        try {
            RdfMapper.serialize(p);
        } catch (e) {
            expect(e instanceof IllegalArgumentError).toBeTruthy();
            expect(e.name).toEqual('IllegalArgumentError');
            expect(e.message).toEqual('Key firstName cannot have both lang or xsdType present when isIRI is set to true inside the decorator');
        }
    });
});
