import {RdfBean} from '../../main/annotations/RdfBean';
import {RdfPrefixes} from '../../main/annotations/RdfPrefixes';
import {RdfProperty} from '../../main/annotations/RdfProperty';
import {RdfSubject} from '../../main/annotations/RdfSubject';
import {XSDDataType} from '../../main/annotations/XSDDataType';

@RdfPrefixes({
    fo: 'http://purl.org/ontology/fo/',
    ingredient: 'http://schema.org/Ingredient/'
})
@RdfBean('fo:Ingredient')
export class RdfIngredient {
    @RdfSubject('ingredient')
    public ingredientIdentifier: string;

    @RdfProperty({predicate: 'fo:ingredientName', xsdType: XSDDataType.XSD_STRING})
    public ingredientName: string;

    @RdfProperty({predicate: 'fo:quantity', xsdType: XSDDataType.XSD_FLOAT})
    public quantity: number;

    @RdfProperty({predicate: 'fo:qualifier', xsdType: XSDDataType.XSD_STRING})
    public qualifier: string;

}

@RdfPrefixes({
    fo: 'http://purl.org/ontology/fo/',
    recipe: 'http://schema.org/Recipe/'
})
@RdfBean('fo:Recipe')
export class RdfRecipe {
    @RdfSubject('recipe')
    public recipeIdentifier: string;

    @RdfProperty({predicate: 'fo:recipeName', xsdType: XSDDataType.XSD_STRING})
    public recipeName: string;

    @RdfProperty({predicate: 'fo:ingredients', clazz: RdfIngredient, isArray: true, inverseOfPredicate: 'fo:partOfRecipe'})
    public ingredients: RdfIngredient[];

}
