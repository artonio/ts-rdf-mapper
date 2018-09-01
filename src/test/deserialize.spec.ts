import {RdfMapper} from '../main/RdfMapper';
import {Person, personTTL} from './models/models';
import {oneToOneRelationship, PersonHasAddress} from './models/oneToOneModels';

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
});
