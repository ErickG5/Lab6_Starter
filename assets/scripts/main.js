window.addEventListener("DOMContentLoaded", init);

function init() {
  let recipes = getRecipesFromStorage();
  addRecipesToDocument(recipes);
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. Parse what's in localStorage, defaulting to an empty array if nothing is there
  return JSON.parse(localStorage.getItem('recipes')) || [];
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. Get a reference to <main>
  const main = document.querySelector('main');

  // A11. Loop through recipes, create a card for each, and append to <main>
  recipes.forEach(recipe => {
    const card = document.createElement('recipe-card');
    card.data = recipe;
    main.appendChild(card);
  });
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // B1. Stringify and save to localStorage
  localStorage.setItem('recipes', JSON.stringify(recipes));
}

/**
 * Adds the necessary event handlers to <form> and the clear storage <button>.
 */
function initFormHandler() {
  // B2. Get a reference to the <form>
  const form = document.querySelector('form');

  // B3. Listen for form submission
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // prevent page reload on submit

    // B4. Create a FormData object from the form
    const formData = new FormData(form);

    // B5. Build the recipe object from FormData key/value pairs
    const recipeObject = {};
    formData.forEach((value, key) => {
      recipeObject[key] = value;
    });

    // B6. Create a new <recipe-card> element
    const card = document.createElement('recipe-card');

    // B7. Set its data
    card.data = recipeObject;

    // B8. Append to <main>
    document.querySelector('main').appendChild(card);

    // B9. Save the updated recipes array back to localStorage
    const recipes = getRecipesFromStorage();
    recipes.push(recipeObject);
    saveRecipesToStorage(recipes);
  });

  // B10. Get the "Clear Local Storage" button
    const clearButton = document.querySelector('button.danger');

  // B11. Listen for click on clear button
  clearButton.addEventListener('click', () => {
    // B12. Clear localStorage
    localStorage.clear();

    // B13. Clear <main>
    document.querySelector('main').innerHTML = '';
  });
}