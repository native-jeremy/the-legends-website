anime({
    targets: '.path3',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'cubicBezier(.5, .05, .1, .3)',
    duration: 2000,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  });


const userId = getCookie("wized_userid"); // Get the user ID from the cookie
console.log("Wized User ID:", userId);

let res = null;

const favouriteBtn1 = document.getElementById("favourite-button1");
const favouriteBtn2 = document.getElementById("favourite-button2");
const favouriteBtn3 = document.getElementById("favourite-button3");
const addedRecipe = document.getElementById("addedRecipe");

// Get the query string from the URL
const queryString = window.location.search;

// Parse the query string
const urlParams = new URLSearchParams(queryString);

// Get the 'recipe' parameter
const recipeId = urlParams.get("recipe");
console.log("Recipe ID:", recipeId);

if (recipeId && userId) {
  checkUser(recipeId, userId);
} else {
  console.error("Recipe ID or User ID is missing.");
  window.location.href = "../login"; // Redirect if either value is missing
}

function checkUser(recordId, userId) {
    fetch(`/api/recipe?recordId=${encodeURIComponent(recordId)}&userId=${encodeURIComponent(userId)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        const user = data.user;  // Accessing user data from the response
        const recipes = data.recipes;  // Accessing recipes data from the response
  
        const methodText = document.getElementById("method");
        const ingredientsText = document.getElementById("ingredients");
        const foodInfo = recipes.Food_Info;  // Assuming this structure
        let foodInfoCol = foodInfo.split("," + "\n");
  
        document.title = recipes.Name;
  
        // Convert ingredients and method to HTML
        const converter = new showdown.Converter();
        ingredientsText.innerHTML = converter.makeHtml(recipes.Ingredients);
        methodText.innerHTML = converter.makeHtml(recipes.Method);
  
        // Get the current URL's query string
        const urlParams = new URLSearchParams(window.location.search);
        const currentRecipe = urlParams.get("recipe");
  
        // Check if the user has already added the current recipe to their favourites
        if (user.Favourites_ID && user.Favourites_ID.includes(currentRecipe)) {
          favouriteBtn1.style.display = "none";
          favouriteBtn2.style.display = "none";
          favouriteBtn3.style.display = "none";
        }

        favouriteBtn1.addEventListener("click", () => {
            favouriteBtn1.style.display = "none";
            favouriteBtn2.style.display = "none";
            favouriteBtn3.style.display = "none";
            addedRecipe.click();
        });
        favouriteBtn2.addEventListener("click", () => {
            favouriteBtn1.style.display = "none";
            favouriteBtn2.style.display = "none";
            favouriteBtn3.style.display = "none";
            addedRecipe.click();
        });
        favouriteBtn3.addEventListener("click", () => {
            favouriteBtn1.style.display = "none";
            favouriteBtn2.style.display = "none";
            favouriteBtn3.style.display = "none";
            addedRecipe.click();
        });
  
        // Populate recipe info
        let stop = setTimeout(RecipeInfo, 1000);
  
        function RecipeInfo() {
          let time = document.querySelectorAll(".recipe-info");
          let heroTime = document.getElementById("recipe_time");
          heroTime.innerHTML = foodInfoCol[0];
  
          for (let i = 0; i < time.length; i++) {
            time[i].innerHTML = foodInfoCol[i];
          }
  
          clearTimeout(stop);
        }
      })
      .catch((error) => {
        console.error("Fetch operation failed:", error.message);
      });

    setTimeout(() => {document.querySelector('.loading-state-v2').style.display = "none"}, 4000);

}

function getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [key, value] = cookies[i].split("=");
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null; // Return null if the cookie is not found
  }
  