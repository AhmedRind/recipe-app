fetchRandomRecipes();


document.getElementById('searchButton').addEventListener('click', valueSearch);

async function valueSearch() {
  const query = document.getElementById('searchBar').value.trim();
  const data = await fetchRecipes(query);
  if (data) {
    displayRecipes(data);
  }
}

async function fetchRecipes(query) {
  const cashedData = localStorage.getItem(query);
  if (cashedData) {
    console.log('Fetching data please wait.');
    return JSON.parse(cashedData);
  }
  const apiKey = 'ce9a0691534b4720bd674b4bf189421d';
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    localStorage.setItem(query, JSON.stringify(data));
    console.log('data fetched from API and stored in localstorage');
    return data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    alert(`Failed to fatch recipe details`)
    return null;
  }
}

async function fetchRandomRecipes() {
  const cashedData = localStorage.getItem('meat');
  
  if (cashedData) {
    console.log('Fetching data please wait.');
    displayRecipes(JSON.parse(cashedData));
  }
  const apiKey = 'ce9a0691534b4720bd674b4bf189421d';
  const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=meat`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayRecipes(data);
  } catch (error) {
    alert('Failed to fetch random recipes');
  }
}

function displayRecipes(data) {
  const container = document.getElementById('recipeContainer');
  container.innerHTML = '';

  data.results.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
      <h2>${recipe.title}</h2>
      <img src="${recipe.image}" alt="${recipe.title}">
      <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
      `;
    container.appendChild(card);
  });
}

async function viewRecipe(id) {
  const apiKey = 'ce9a0691534b4720bd674b4bf189421d';
  const apiUrl = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const recipe = await response.json();
    console.log(recipe);
    displayRecipeDetails(recipe);
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return null;
  }
}

function displayRecipeDetails(recipe) {
  const container = document.getElementById('recipeContainer');
  container.innerHTML = '';

  const details = document.createElement('div');
  details.className = 'recipe-details';
  details.innerHTML = `
    <h2>${recipe.title}</h2>
    <img src="${recipe.image}" alt="${recipe.title}">
    <h3>Ingredients</h3>
    <ul>
      ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
    </ul>
    <h3>Instructions</h3>
    <p>${recipe.instructions}</p>
  `;
  container.appendChild(details);
}

