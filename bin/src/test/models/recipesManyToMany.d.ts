export declare class RdfIngredient {
    ingredientIdentifier: string;
    ingredientName: string;
    quantity: number;
    qualifier: string;
}
export declare class RdfRecipe {
    recipeIdentifier: string;
    recipeName: string;
    ingredients: RdfIngredient[];
}
