import {RdfBean} from '../../main/annotations/RdfBean';
import {RdfNamespaces} from '../../main/annotations/RdfNamespaces';
import {RdfProperty} from '../../main/annotations/RdfProperty';
import {XSDDataType} from '../../main/annotations/XSDDataType';

@RdfNamespaces({
    schema: 'http://schema.org/'
})
export class Video {
    @RdfProperty({predicate: 'schema:name', xsdType: XSDDataType.XSD_STRING})
    public name: string;
}

@RdfNamespaces({
    schema: 'http://schema.org/'
})
@RdfBean('schema:Recipe')
export class Recipe {
    @RdfProperty({predicate: 'schema:recipeName', xsdType: XSDDataType.XSD_STRING})
    public recipeName: string;
    @RdfProperty({predicate: 'schema:video', clazz: Video})
    public video: Video;
}
