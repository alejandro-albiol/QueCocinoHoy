export class AvailableIngredients {
    private ingredients: string;

    constructor() {
        this.ingredients = '';
    }

    setIngredients(ingredientsString: string): void {
        this.ingredients = ingredientsString.trim();
    }

    clearIngredients(): void {
        this.ingredients = '';
    }

    getIngredients(): string {
        return this.ingredients;
    }
}

