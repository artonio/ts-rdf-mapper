import {RdfBean} from '../../main/annotations/RdfBean';
import {RdfNamespaces} from '../../main/annotations/RdfNamespaces';
import {RdfProperty} from '../../main/annotations/RdfProperty';
import {XSDDataType} from '../../main/annotations/XSDDataType';

@RdfNamespaces({
    schema: 'http://schema.org/'
})
@RdfBean('schema:Recipe')
export class Recipe {
    @RdfProperty({prop: 'schema:recipeName', xsdType: XSDDataType.XSD_STRING})
    public recipeName: string;
}
