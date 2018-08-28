import {RdfMapper} from '../main/RdfMapper';
import {Person, personTTL} from './models/models';

describe('Test TTL Deserialization', () => {
    it('Deserialize basic ttl', async (done) => {
        const instance = await RdfMapper.deserialize(Person, personTTL);

        console.log(JSON.stringify(instance));
        expect(instance.firstName).toEqual('David');
        expect(instance.uuid).toEqual('1234567');
        expect(instance.name).toEqual('David Banner');
        expect(instance.nick).toEqual('hulk');
        expect(instance.surname).toEqual('Banner');
        expect(instance.title).toEqual('Mr');

        done();
    });
});
