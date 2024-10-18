export class AvailableIngredients {
    #ingredients: string;

    constructor(ingredients: string) {
        this.#ingredients = ingredients;
    }
    
    get ingredients(): string {
        return this.#ingredients;
    }
}