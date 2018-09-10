import {RdfMapper} from '../main/RdfMapper';
import {PersonNonPrefixed} from './models/nonPrefixModels';

describe('Serialize without using prefixes', () => {
    it('Should Serialize basic types', () => {
        const p = new PersonNonPrefixed();
        p.uuid = 'Anton';
        p.name = 'Anton';
        p.englishName = 'Antony';
        p.gender = 'M';
        p.age = 32;
        p.isAdult = true;
        p.weight = 95.5;
        p.height = 198.5;
        p.buoyancy = 53.2;

        const b = RdfMapper.serialize(p);
        console.log('Serialize without using prefixes');
        console.log(b);
    });
});
