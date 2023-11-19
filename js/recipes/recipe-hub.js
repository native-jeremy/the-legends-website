anime({
  targets: '.path3',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'cubicBezier(.5, .05, .1, .3)',
  duration: 2000,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});

// URL FILTERING
// Url search parameters
let params = new URL(document.location).searchParams;
let url = window.location.href;
// Object Url Search
let entries = params.keys();
let parameters = params.keys();
let paramsArray = [];
let recipeData;
let recipeNumberCheck = [];
// Checking For Parameters
if (url.includes("?")) {
  console.log("Params", parameters);
  for (key of parameters) {
    paramsArray.push(key.replace("-", " "));
    localStorage.setItem("RecipeFilters", JSON.stringify(paramsArray));
  }
} else {
  let filterURL = JSON.parse(localStorage.getItem("RecipeFilters"));
  console.log("Filter Local Storage", filterURL);
  let parameter = "?";
  if (filterURL !== null) {
    filterURL.forEach((filter, index) => {
      if (filter[index + 1] >= filterURL.length) {
        parameter = parameter + filter.replace(" ", "-");
      } else {
        parameter = parameter + filter.replace(" ", "-") + "&";
      }
      window.location.href = window.location.href + parameter;
    });
  }
  console.log("No Parameters Found!");
}
// END URL FILTERING
let recipesStoredInLocalStorage = JSON.parse(
  localStorage.getItem("recipes_stored")
);
// Start Vue Intializer
const { createApp } = Vue;
createApp({
  data() {
    return {
      User: {},
      Favourites: [],
      Breakfast: [],
      HeroImage: "",
      Lunch: [],
      Dinner: [],
      Snacks: [],
      Favourites: [],
      Filters: [],
      RecipesStored: false,
      RecipesParsed: [],
      RecipesArray: [],
      FavouritesActive: false,
      RenderRecipes: [],
    };
  },
  methods: {
    clearFilters() {
      localStorage.removeItem("RecipeFilters");
      window.location.href = "/recipe-hub";
    },
    shuffleNewRecipes() {
      window.location.href = window.location.href;
      localStorage.removeItem("recipes_stored");
    },
  },
  created() {
    let tempFilters = JSON.parse(localStorage.getItem("RecipeFilters"));
    if (tempFilters != null) {
      tempFilters.forEach((filter, index) => {
        filter.replace("-", " ");
      });
    } else {
      tempFilters = [];
    }
    if (recipesStoredInLocalStorage !== null) {
      Wized.request.await("Load Users Recipes", (response) => {
        this.User = response.data;
        // Favourites Getter
        if (!("Favourite_Recipes" in response.data)) {
          this.FavouritesActive = false;
        } else {
          this.Favourites = response.data.Favourite_Recipes;
          this.FavouritesActive = true;
        }
        // Recipe Getter
        if (recipesStoredInLocalStorage !== null) {
          let tempRecipes = JSON.parse(response.data.Recipes_Stored);
          this.RecipesParsed = JSON.parse(response.data.Recipes_Stored);
          console.log("Recipes From Airtable", tempRecipes);
          tempRecipes.forEach((type) => {
            this.RenderRecipes.push(type)
          });
          this.Breakfast = tempRecipes[0];
          this.HeroImage = this.Breakfast[0].Images[0].url.toString();
          this.Lunch = tempRecipes[1];
          this.Dinner = tempRecipes[2];
          this.Snacks = tempRecipes[3];
        } else {
          this.RecipesStored = true;
        }
      });
    } else {
      Wized.request.await("Load Users Recipes", (response) => {
        this.User = response.data;
        // Favourites Getter
        if (!("Favourite_Recipes" in response.data)) {
          this.FavouritesActive = false;
        } else {
          this.Favourites = response.data.Favourite_Recipes;
          this.FavouritesActive = true;
        }
      });
      Wized.request.await("Load Recipes - Breakfast", (response) => {
        let newArr = response.data.map((item) => {
          return {
            Name: item.Name,
            ID: item.ID,
            Images: item.Images,
            Dietary_Require: item.Dietary_Require,
            Time: item.Time,
          };
        });
        const recipeType = shuffleArray(newArr, tempFilters);
        this.RenderRecipes.push(recipeType)
        this.Breakfast = recipeType;
        this.HeroImage = recipeType[0].Images[0].url;
        this.RecipesArray.push(recipeType);
      });
      Wized.request.await("Load Recipes - Lunch", (response) => {
        let newArr = response.data.map((item) => {
          return {
            Name: item.Name,
            ID: item.ID,
            Images: item.Images,
            Dietary_Require: item.Dietary_Require,
            Time: item.Time,
          };
        });
        const recipeType = shuffleArray(newArr, tempFilters);
        this.RenderRecipes.push(recipeType)
        this.Lunch = recipeType;
        this.RecipesArray.push(recipeType);
      });
      Wized.request.await("Load Recipes - Dinner", (response) => {
        let newArr = response.data.map((item) => {
          return {
            Name: item.Name,
            ID: item.ID,
            Images: item.Images,
            Dietary_Require: item.Dietary_Require,
            Time: item.Time,
          };
        });
        const recipeType = shuffleArray(newArr, tempFilters);
        this.RenderRecipes.push(recipeType)
        this.Dinner = recipeType;
        this.RecipesArray.push(recipeType);
      });
      Wized.request.await("Load Recipes - Snacks", (response) => {
        let newArr = response.data.map((item) => {
          return {
            Name: item.Name,
            ID: item.ID,
            Images: item.Images,
            Dietary_Require: item.Dietary_Require,
            Time: item.Time,
          };
        });
        const recipeType = shuffleArray(newArr, tempFilters);
        this.RenderRecipes.push(recipeType)
        this.Snacks = recipeType;
        this.RecipesArray.push(recipeType);
      });
    }
    setTimeout(() => {
      document.querySelector('.loading-state-v2').style.display = "none";
    },4000)
    // Suffle Feature Code
    function shuffleArray(array, tempFilters) {
      let shuffleArray = [];
      let usedIndices = [];
      let i = 0;
      while (i < 7) {
        let randomIndex = Math.floor(Math.random() * array.length);
        if (tempFilters.length !== 0) {
          if (
            !usedIndices.includes(randomIndex) &&
            array[randomIndex].Dietary_Require.some((name) =>
              tempFilters.includes(name)
            )
          ) {
            shuffleArray.push(array[randomIndex]);
            usedIndices.push(randomIndex);
            i++;
          }
        } else {
          if (!usedIndices.includes(randomIndex)) {
            shuffleArray.push(array[randomIndex]);
            usedIndices.push(randomIndex);
            i++;
          }
        }
      }
      console.log("Array Updated", shuffleArray);
      return shuffleArray;
    }
  },
  mounted() {
    setTimeout(() => {
    console.log("interaction loaded");
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require("ix2").init();
    document.dispatchEvent(new Event("readystatechange"));
    sal({
      threshold: 0.25,
      once: false,
    });
    }, 3000);
    // Matching filters to checkboxes
    let check = document.querySelectorAll('[type="checkbox"]');
    let checkCustom = document.querySelectorAll(".w-checkbox-input");
    let RecipeFilters = JSON.parse(localStorage.getItem("RecipeFilters"));
    if (RecipeFilters != null) {
      // Checking filters are active
      RecipeFilters.forEach((filter) => {
        check.forEach((checkInfo, index) => {
          if (filter.includes(checkInfo.name.replace("-", " "))) {
            checkCustom[index].classList.add("w--redirected-checked");
            check[index].checked = true;
          }
        });
      });
    }
  },
  updated() {
    if (recipesStoredInLocalStorage == null && this.RecipesStored !== true) {
      let recipesSetLocalStorage = localStorage.setItem(
        "recipes_stored",
        "true"
      );
      JSON.stringify(recipesSetLocalStorage);
      setTimeout(() => {
        // Setting recipes
        //const recipes = [this.Breakfast, this.Lunch, this.Dinner, this.Snacks]
        Wized.data.setVariable(
          "recipestored",
          JSON.stringify(this.RecipesArray)
        );
      }, 3000);
    } else {
      console.log("Render Recipes Pushed", this.RenderRecipes);
      /*console.log("User updated", this.User);
      console.log("Filters updated", this.Filters);
      console.log("Breakfast image loaded", this.HeroImage);
      console.log("Breakfast loaded", this.Breakfast);
      console.log("Lunch loaded", this.Lunch);
      console.log("Dinner loaded", this.Dinner);
      console.log("Snacks loaded", this.Snacks);
      console.log("Recipes Array loaded", this.RecipesArray);
      console.log("Recipes Parsed loaded", this.RecipesParsed);*/
      return false;
    }
  },
}).mount("#app");
// End Vue Intializer
