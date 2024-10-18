import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { RecipeGenerator } from "./recipeGenerator.js";
import { AvailableIngredients } from "./AvailableIngredients.js";
import fs from 'fs';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../public");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

app.post("/generate-recipe", async (req, res) => {  
  const ingredientsList = req.body.ingredients.split(',').map((ingredient: string) => ingredient.trim());
  const apiKey = process.env.GROQ_API_KEY as string;
  const ingredients = new AvailableIngredients(ingredientsList.join(', '));
  const recipeGenerator = new RecipeGenerator(apiKey, ingredients);

  try {
    const recipes = await recipeGenerator.generateRecipe();
    let recipesHtml = '';
    recipes.forEach((recipe: { title: string, description: string }) => {
      recipesHtml += `<li><h2>${recipe.title}</h2><p>${recipe.description}</p></li>`;
    });

    const recipesPagePath = path.join(publicPath, "recipes.html");
    let recipesPage = await fs.promises.readFile(recipesPagePath, "utf-8");
    recipesPage = recipesPage.replace('<!-- Los elementos de la lista se llenarán dinámicamente -->', recipesHtml);

    res.send(recipesPage);
  } catch (error) {
    console.error("Error generating recipe:", error);
    res.status(500).send("Error generating recipe");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
