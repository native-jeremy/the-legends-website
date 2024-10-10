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
let data;
let checkData;
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
      typeActive: false,
      AllRecipes : [],
      stored: false,
    };
  },
  methods: {
    clearFilters() {
      Wized.data.setVariable("complete", true);
      localStorage.removeItem("RecipeFilters");
      setTimeout(() => {
        window.location.href = "/recipe-hub.html";
      }, 3000)
    },
    shuffleNewRecipes() {
      Wized.data.setVariable("complete", true);
      setTimeout(() => {
        window.location.href = window.location.href;
      }, 3000)
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
    Wized.request.await("Load Users Recipes", (response) => {
      this.User = response.data;
      // Favourites Getter
      if (!("Favourite_Recipes" in response.data)) {
        this.FavouritesActive = false;
      } else {
        this.Favourites = response.data.Favourite_Recipes;
        this.FavouritesActive = true;
      }
      console.log("Does this user have recipes? ", this.User.Stored_Recipes)
    if (this.User.Stored_Recipes == "False") {
      Wized.request.await("Load Recipes - Breakfast", (response) => {
        let newArr = response.data.map((item) => {
          return {
            Name: item.Name,
            ID: item.ID,
            RecipeGroups: item.Recipe_Group_Names,
            type: item.Recipe_Group_Names[0],
            Images: item.Images,
            Dietary_Require: item.Dietary_Require,
            Time: item.Time,
          };
        });
        const recipeType = shuffleArray(newArr, tempFilters, 'Breakfast');
        this.RenderRecipes.push(recipeType)
        this.Breakfast = recipeType;
        this.HeroImage = recipeType[0].Images[0].url;
        this.RecipesArray.push(recipeType);
        this.AllRecipes.push(recipeType);
      });
      Wized.request.await("Load Recipes - Lunch", (response) => {
        let newArr = response.data.map((item) => {
          return {
            Name: item.Name,
            ID: item.ID,
            RecipeGroups: item.Recipe_Group_Names,
            type: item.Recipe_Group_Names[0],
            Images: item.Images,
            Dietary_Require: item.Dietary_Require,
            Time: item.Time,
          };
        });
        const recipeType = shuffleArray(newArr, tempFilters, 'Lunch');
        this.RenderRecipes.push(recipeType)
        this.Lunch = recipeType;
        this.RecipesArray.push(recipeType);
        this.AllRecipes.push(recipeType);
      });
      Wized.request.await("Load Recipes - Dinner", (response) => {
        let newArr = response.data.map((item) => {
          return {
            Name: item.Name,
            ID: item.ID,
            RecipeGroups: item.Recipe_Group_Names,
            type: item.Recipe_Group_Names[0],
            Images: item.Images,
            Dietary_Require: item.Dietary_Require,
            Time: item.Time,
          };
        });
        const recipeType = shuffleArray(newArr, tempFilters, 'Dinner');
        this.RenderRecipes.push(recipeType)
        this.Dinner = recipeType;
        this.RecipesArray.push(recipeType);
        this.AllRecipes.push(recipeType);
      });
      Wized.request.await("Load Recipes - Snacks", (response) => {
        let newArr = response.data.map((item) => {
          return {
            Name: item.Name,
            ID: item.ID,
            RecipeGroups: item.Recipe_Group_Names,
            type: item.Recipe_Group_Names[0],
            Images: item.Images,
            Dietary_Require: item.Dietary_Require,
            Time: item.Time,
          };
        });
        const recipeType = shuffleArray(newArr, tempFilters, 'Snacks');
        this.RenderRecipes.push(recipeType)
        this.Snacks = recipeType;
        this.RecipesArray.push(recipeType);
        this.AllRecipes.push(recipeType);
      });
    } 
    else {
      this.stored = true;
        //console.log("Recipes From Airtable", response.data.RecipeLinker);
        let randomHeroImage = Math.floor(Math.random() * response.data.Images_RecipeLinker.length);
        this.HeroImage = response.data.Images_RecipeLinker[randomHeroImage].url;
        response.data.RecipeLinker.forEach((recipeData, index) => {
          if(response.data.Recipe_Type_RecipeLinker[index] == 'Breakfast')
          {
            this.Breakfast.push({
              type: response.data.Recipe_Type_RecipeLinker[index],  
              Images: response.data.Images_RecipeLinker[index], 
              Time: response.data.Time_RecipeLinker[index],    
              ID: response.data.RecipeLinker[index],
              Name: response.data.Name_RecipeLinker[index],
      
            })
          }
          if(response.data.Recipe_Type_RecipeLinker[index] == 'Lunch')
          {
            this.Lunch.push({
              type: response.data.Recipe_Type_RecipeLinker[index],  
              Images: response.data.Images_RecipeLinker[index], 
              Time: response.data.Time_RecipeLinker[index],    
              ID: response.data.RecipeLinker[index],
              Name: response.data.Name_RecipeLinker[index],
      
            })
          }
          if(response.data.Recipe_Type_RecipeLinker[index] == 'Dinner')
          {
            this.Dinner.push({
              type: response.data.Recipe_Type_RecipeLinker[index],  
              Images: response.data.Images_RecipeLinker[index], 
              Time: response.data.Time_RecipeLinker[index],    
              ID: response.data.RecipeLinker[index],
              Name: response.data.Name_RecipeLinker[index],
            })
          }
          if(response.data.Recipe_Type_RecipeLinker[index] == 'Snacks')
          {
            this.Snacks.push({
              type: response.data.Recipe_Type_RecipeLinker[index],  
              Images: response.data.Images_RecipeLinker[index], 
              Time: response.data.Time_RecipeLinker[index],    
              ID: response.data.RecipeLinker[index],
              Name: response.data.Name_RecipeLinker[index],
            })
          }
        });

       // console.log("Breakfast loaded", this.Breakfast);
        //console.log("Lunch loaded", this.Lunch);
        //console.log("Dinner loaded", this.Dinner);
        //console.log("Snacks loaded", this.Snacks);

        if(this.RenderRecipes.length == 0)
        {
          this.RenderRecipes.push(this.Breakfast)
        }
        if(this.RenderRecipes.length == 1)
        {
          this.RenderRecipes.push(this.Lunch)
        }
        if(this.RenderRecipes.length == 2)
        {
          this.RenderRecipes.push(this.Dinner)
        }
        if(this.RenderRecipes.length == 3)
        {
          this.RenderRecipes.push(this.Snacks)
        }

        //console.log("Added Recipes", this.RenderRecipes);


      //console.log("Types", response.data.Recipe_Type_RecipeLinker) 
      //console.log("Images",response.data.Images_RecipeLinker) 
      //console.log("Time",response.data.Time_RecipeLinker)   
      //console.log("ID", response.data.RecipeLinker)
    }
    });
    setTimeout(() => {
      document.querySelector('.loading-state-v2').style.display = "none";
    },4000)
    // Suffle Feature Code
    function shuffleArray(array, tempFilters, type) {
      let shuffleArray = [];
      let usedIndices = [];
      let i = 0;
      while (i < 7) {
        let randomIndex = Math.floor(Math.random() * array.length);

        if(array[randomIndex].type == type)
        {
          if (tempFilters.length !== 0) {

            if (!usedIndices.includes(randomIndex) &&
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
        else {
          randomIndex = Math.floor(Math.random() * array.length);
        }
      }
      //console.log("Array Updated", shuffleArray);
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
    if (this.User.Stored_Recipes == "False") {
      setTimeout(() => {
        let itemsArray = [];
        this.AllRecipes.forEach((item, index) => {
          item.forEach((itemID, i) => { 
          itemsArray.push(itemID.ID)
          });
        });
        //console.log("Recipes IDs:", items)
        Wized.data.setVariable(
          "array",
          JSON.stringify(itemsArray)
          )
        Wized.data.setVariable(
          "recipestored",
          'True'
        );
      }, 10000);
    } else {
      return false;
    }
    let scroller = sal();
    scroller.update();
  },
}).mount("#app");
// End Vue Intializer
