import { RecipeGenerator } from './recipeGenerator';
const apiKey: string = process.env.API_KEY || '';
// Instancia del generador de recetas
const recipeGenerator = new RecipeGenerator(apiKey);

// Función para manejar el envío del formulario
async function handleFormSubmit(event: Event) {
    event.preventDefault();

    const inputElement = document.getElementById('ingredients') as HTMLInputElement;
    const ingredients = inputElement.value.split(',').map(ingredient => ingredient.trim());

    try {
        const recipe = await recipeGenerator.generateRecipe(ingredients);
        displayRecipe(recipe);
    } catch (error) {
        console.error('Error al generar la receta:', error);
        displayError('No se pudo generar la receta. Inténtalo de nuevo.');
    }
}

// Función para mostrar la receta generada
function displayRecipe(recipe: string) {
    const recipeElement = document.getElementById('recipe');
    if (recipeElement) {
        recipeElement.textContent = recipe;
    }
}

// Función para mostrar un mensaje de error
function displayError(message: string) {
    const recipeElement = document.getElementById('recipe');
    if (recipeElement) {
        recipeElement.textContent = message;
    }
}

// Configurar el evento de envío del formulario
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ingredient-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
});
