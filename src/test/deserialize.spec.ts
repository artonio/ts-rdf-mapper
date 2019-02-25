import {RdfMapper} from '../main/RdfMapper';
import {Person, personTTL, recipeVideoTTL} from './models/models';
import {oneToOneRelationship, PersonHasAddress} from './models/oneToOneModels';
import {Recipe, Video} from './models/recipes';

const shouldLogResult = false;

function logResult(assertName: string, result: any, logOnlyMe = false) {
    if (shouldLogResult || logOnlyMe) {
        console.log(`Expectation: ${assertName}`);
        console.log(`Result:\n${result}`);
    }
}

describe('Test TTL Deserialization', () => {
    it('Deserialize basic ttl (async)', async (done) => {
        const instance: Person = await RdfMapper.deserializeAsync(Person, personTTL);

        // console.log(JSON.stringify(instance));
        expect(instance.firstName).toEqual('David');
        expect(instance.uuid).toEqual('1234567');
        expect(instance.name).toEqual('David Banner');
        expect(instance.nick).toEqual('hulk');
        expect(instance.surname).toEqual('Banner');
        expect(instance.title).toEqual('Mr');

        done();
    });

    it('Deserialize basic ttl', () => {
        const instance: Person = RdfMapper.deserialize(Person, personTTL);

        // console.log(JSON.stringify(instance));
        expect(instance.firstName).toEqual('David');
        expect(instance.uuid).toEqual('1234567');
        expect(instance.name).toEqual('David Banner');
        expect(instance.nick).toEqual('hulk');
        expect(instance.surname).toEqual('Banner');
        expect(instance.title).toEqual('Mr');
    });

    it('Deserialize ttl with one-to-one relationship (async)', async (done) => {
        const instance: PersonHasAddress = await RdfMapper.deserializeAsync(PersonHasAddress, oneToOneRelationship);
        expect(instance.uuid).toEqual('person-uuid');
        expect(instance.name).toEqual('John');
        expect(instance.address.uuid).toEqual('address-uuid');
        expect(instance.address.streetName).toEqual('Jasmine');
        done();
    });

    it('Deserialize ttl with one-to-one relationship', () => {
        const instance: PersonHasAddress = RdfMapper.deserialize(PersonHasAddress, oneToOneRelationship);
        expect(instance.uuid).toEqual('person-uuid');
        expect(instance.name).toEqual('John');
        expect(instance.address.uuid).toEqual('address-uuid');
        expect(instance.address.streetName).toEqual('Jasmine');
    });

    it('Deserialize blank nodes (async)', async (done) => {
       const recipe: Recipe = await RdfMapper.deserializeAsync(Recipe, recipeVideoTTL);
       expect(recipe instanceof Recipe).toBeTruthy();
       expect(recipe.video).toBeDefined();
       expect(recipe.video instanceof Video).toBeTruthy();
       expect(recipe.recipeName).toEqual('Cheesecake');
       expect(recipe.video.name).toEqual('Japanese Cheesecake instructions');
       // console.log(JSON.stringify(recipe));
       done();
    });

    it('Deserialize blank nodes',  () => {
        const recipe: Recipe = RdfMapper.deserialize(Recipe, recipeVideoTTL);
        expect(recipe instanceof Recipe).toBeTruthy();
        expect(recipe.video).toBeDefined();
        expect(recipe.video instanceof Video).toBeTruthy();
        expect(recipe.recipeName).toEqual('Cheesecake');
        expect(recipe.video.name).toEqual('Japanese Cheesecake instructions');
        // console.log(JSON.stringify(recipe));
    });

});
