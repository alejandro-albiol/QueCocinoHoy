import { AvailableIngredients } from "./AvailableIngredients.js";
import { getGroqChatCompletion } from "./groqApi.js";

export class RecipeGenerator {

    #apiKey: string;
    #ingredients: AvailableIngredients;

    constructor(apiKey: string, ingredients: AvailableIngredients) {
        this.#apiKey = apiKey;
        this.#ingredients = ingredients;
    }

    get apiKey() {
        return this.#apiKey;
    }

    get ingredients() {
        return this.#ingredients;
    }

    async generateRecipe() {
        // Log the ingredients to see what is being sent
        console.log("Ingredients input:", this.#ingredients.ingredients);

        const chatCompletion = await getGroqChatCompletion(this.#ingredients.ingredients);
        const recipesJson = chatCompletion.choices[0]?.message?.content || "[]";
        
        // Log the JSON string to inspect it
        console.log("Received JSON string:", recipesJson);
        
        try {
            // Attempt to parse the JSON directly
            const parsedRecipes = JSON.parse(recipesJson);
            
            if (!Array.isArray(parsedRecipes)) {
                throw new Error("Parsed JSON is not an array");
            }
            
            return parsedRecipes;
        } catch (error) {
            console.error("Error parsing JSON:", error);
            throw error;
        }
    }

}
