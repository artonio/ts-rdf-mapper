import {RdfMapper} from '../main/RdfMapper';
import {Person, personTTL, recipeVideoTTL} from './models/models';
import {oneToOneRelationship, PersonHasAddress} from './models/oneToOneModels';
import {Recipe, Video} from './models/recipes';
import {QaTemplate, QaTemplateElement, templateTTL} from './models/templateModels';

describe('Test TTL Deserialization', () => {
    it('Deserialize basic ttl', async (done) => {
        const instance: Person = await RdfMapper.deserialize(Person, personTTL);

        // console.log(JSON.stringify(instance));
        expect(instance.firstName).toEqual('David');
        expect(instance.uuid).toEqual('1234567');
        expect(instance.name).toEqual('David Banner');
        expect(instance.nick).toEqual('hulk');
        expect(instance.surname).toEqual('Banner');
        expect(instance.title).toEqual('Mr');

        done();
    });

    it('Deserialize ttl with one-to-one relationship', async (done) => {
        const instance: PersonHasAddress = await RdfMapper.deserialize(PersonHasAddress, oneToOneRelationship);
        expect(instance.uuid).toEqual('person-uuid');
        expect(instance.name).toEqual('John');
        expect(instance.address.uuid).toEqual('address-uuid');
        expect(instance.address.streetName).toEqual('Jasmine');
        done();
    });

    it('Deserialize blank nodes', async (done) => {
       const recipe: Recipe = await RdfMapper.deserialize(Recipe, recipeVideoTTL);
       expect(recipe instanceof Recipe).toBeTruthy();
       expect(recipe.video).toBeDefined();
       expect(recipe.video instanceof Video).toBeTruthy();
       expect(recipe.recipeName).toEqual('Cheesecake');
       expect(recipe.video.name).toEqual('Japanese Cheesecake instructions');
       // console.log(JSON.stringify(recipe));
       done();
    });

    it('Deserialize recursive template', async (done) => {
        const template: QaTemplate = await RdfMapper.deserialize(QaTemplate, templateTTL);
        expect(template instanceof QaTemplate).toBeTruthy();
        expect(template.patientInformation instanceof QaTemplateElement).toBeTruthy();
        expect(template.patientInformation.elements.length).toEqual(2);
        expect(template.patientInformation.elements[0].index).toEqual(0);
        expect(template.patientInformation.elements[0].label).toEqual('Demographics');
        expect(template.patientInformation.elements[0].tag).toEqual('demographics');
        // console.log(JSON.stringify(template));
        done();
    });
});
