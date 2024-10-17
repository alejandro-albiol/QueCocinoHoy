import { OpenAI } from "openai";

export class RecipeGenerator {
    private openai: OpenAI;

    constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey: apiKey });
    }

    async generateRecipe(ingredients: string): Promise<string[]> {
        const response = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant that generates recipes based on available ingredients."
                },
                {
                    role: "user",
                    content: `Generate three recipes using the following ingredients: ${ingredients}. Each recipe should include a name, list of ingredients, and steps. Provide the recipes as an array of strings.`
                }
            ],
            temperature: 0.7,
            max_tokens: 1000,
        });

        const content = response.choices?.[0]?.message?.content?.trim() ?? '';
        return content ? JSON.parse(content) : [];
    }
}
