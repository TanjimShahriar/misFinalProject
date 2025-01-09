var searchButton = document.getElementById("search-button");
var searchInput = document.getElementById("search-input");
var resultsContainer = document.getElementById("results-container");

var allResults = [];

searchButton.addEventListener("click", function () {
  var query = searchInput.value.trim();
  if (!query) return;
  fetchMeals(query);
});

function fetchMeals(query) {
  var API_URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
  fetch(API_URL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.meals) {
        allResults = data.meals;
        displayMeals(allResults.slice(0, 5), true);
      } else {
        resultsContainer.innerHTML = `<p>No meals found for "${query}".</p>`;
      }
    })
    .catch(function (error) {
      console.error("Error fetching meals:", error);
      resultsContainer.innerHTML = `<p>Failed to fetch meals. Please try again later.</p>`;
    });
}

function displayMeals(meals, showAllButton) {
  resultsContainer.innerHTML = meals
    .map(function (meal) {
      return `
    <div class="meal-card">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="meal-info">
        <h3>${meal.strMeal}</h3>
        <p><strong>Meal ID:</strong> ${meal.idMeal}</p>
        <p>${meal.strInstructions.slice(0, 100)}...</p>
      </div>
    </div>
  `;
    })
    .join("");

  if (showAllButton && allResults.length > 5) {
    resultsContainer.innerHTML += `
      <div class="show-all-btn">
        <button id="show-all-button">SHOW ALL</button>
      </div>
    `;

    document.getElementById("show-all-button").addEventListener("click", function () {
      displayMeals(allResults, false);
    });
  }
}
