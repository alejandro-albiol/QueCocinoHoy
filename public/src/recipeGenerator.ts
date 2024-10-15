import Configuration, { OpenAI } from "openai";

export class RecipeGenerator {
    private openai: OpenAI;

    constructor(apiKey: string) {
        const configuration = new Configuration({
            apiKey: apiKey,
        });
        this.openai = new OpenAI({ apiKey: apiKey }); // Pass the apiKey directly as ClientOptions
    }

    async generateRecipe(ingredients: string[]): Promise<string> {
        const response = await this.openai.completions.create({
            model: "text-davinci-003",
            prompt: `Generate a three recipes using the following ingredients: ${ingredients.join(', ')}`,
            max_tokens: 150,
        });
        return response.choices[0].text.trim(); // Access choices directly from response
    }
}
