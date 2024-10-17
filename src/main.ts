document.getElementById('ingredient-form')?.addEventListener('submit', async function(event) {
    event.preventDefault();
    const ingredients = (document.getElementById('ingredients') as HTMLInputElement).value;
    try {
        const response = await fetch('/generate-recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ingredients })
        });
        const data = await response.json();
        displayRecipes(data.recipes);
    } catch (error) {
        console.error('Error generating recipes:', error);
    }
});

function displayRecipes(recipes: string[]) {
    const recipeContainer = document.getElementById('recipe');
    if (recipeContainer) {
        recipeContainer.innerHTML = '';
        recipes.forEach(recipe => {
            const recipeElement = document.createElement('div');
            recipeElement.textContent = recipe;
            recipeContainer.appendChild(recipeElement);
        });
    }
}
