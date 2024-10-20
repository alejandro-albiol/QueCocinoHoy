document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const recipesList = document.getElementById("recipes-list");

    form?.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const ingredients = formData.get("ingredients") as string;

        try {
            const response = await fetch('/generate-recipe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ingredients })
            });

            if (!response.ok) {
                throw new Error("Failed to fetch recipes");
            }

            const recipes = await response.json();
            if (recipesList) {
                recipesList.innerHTML = "";
                recipes.forEach((recipe: { title: string, description: string }) => {
                    const listItem = document.createElement('li');
                    listItem.innerHTML = `<h2>${recipe.title}</h2><p>${recipe.description}</p>`;
                    recipesList.appendChild(listItem);
                });
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
        }
    });
});
