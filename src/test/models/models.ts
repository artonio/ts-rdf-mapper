import {RdfNamespaces} from '../../main/annotations/RdfNamespaces';
import {RdfBean} from '../../main/annotations/RdfBean';
import {RdfSubject} from '../../main/annotations/RdfSubject';
import {RdfProperty} from '../../main/annotations/RdfProperty';
import {XSDDataType} from '../../main/annotations/XSDDataType';

@RdfNamespaces([
    {prefix: 'foaf', uri: 'http://xmlns.com/foaf/0.1/'},
    {prefix: 'person', uri: 'http://example.com/Person/'},
    {prefix: 'address', uri: 'http://xmlns.com/foaf/0.1/address/'}
])
@RdfBean('foaf:Address')
export class Addr {
    @RdfSubject('address')
    public uuid: string;

    @RdfProperty({prop: 'address:streetName', xsdType: XSDDataType.XSD_STRING})
    public streetName: string;

    @RdfProperty({prop: 'address:houseNum', xsdType: XSDDataType.XSD_STRING})
    public houseNum: number;
}

@RdfNamespaces([
    {prefix: 'foaf', uri: 'http://xmlns.com/foaf/0.1/'},
    {prefix: 'person', uri: 'http://example.com/Person/'}
])
@RdfBean('foaf:Person')
export class Per {
    @RdfSubject('person')
    public uuid: string;

    @RdfProperty({prop: 'person:hasAddress', clazz: Addr})
    public addresses: Addr[];
}