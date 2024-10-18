import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function main() {
  const ingredients = process.argv.slice(2).join(", ");
  const chatCompletion = await getGroqChatCompletion(ingredients);
  
  // Directly use the JSON string from the API response
  const rawJson = chatCompletion.choices[0]?.message?.content || "";
  console.log("Received JSON string:", rawJson);

  try {
    // Attempt to parse the JSON string as is
    const recipes = JSON.parse(rawJson);
    console.log("Parsed recipes:", recipes);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}

export async function getGroqChatCompletion(ingredients: string) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Send only three recipes easy to cook and tasty that contain the following ingredients: ${ingredients}. Return the recipes in JSON format with fields 'title', 'description'. Send only the JSON, without any other text or markup. In title use the name of the recipe, in description explain how to cook it.`,
      },
    ],
    model: "llama3-8b-8192",
  });
}
  
