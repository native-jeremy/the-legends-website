anime({
  targets: '.path3',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'cubicBezier(.5, .05, .1, .3)',
  duration: 2000,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});

window.onload = async () => {
  const favouriteBtn1 = document.getElementById("favourite-button1");
  const favouriteBtn2 = document.getElementById("favourite-button2");
  const favouriteBtn3 = document.getElementById("favourite-button3");
  const addedRecipe = document.getElementById("addedRecipe");
  Wized.request.await("Load Users Recipe", (response) => {
    const user = response.data.Favourites_ID;
    const snapshot = response.data;
    console.log("Snapshot1:", snapshot);
    if (snapshot.Stripe == "Not Verified") {
      window.location.href = "/program-selection";
    }
    let params = window.location.href;
    let url = new URL(params);
    let checkurl = url.searchParams;
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
    let currentRecipe = checkurl.get("recipe");
    if (user.includes(currentRecipe)) {
      favouriteBtn1.style.display = "none";
      favouriteBtn2.style.display = "none";
      favouriteBtn3.style.display = "none";
    }
  });
  Wized.request.await("Load Recipe", (response) => {
    const snapshot = response.data;
    console.log("Snapshot2:", snapshot);
    let method = snapshot.Method;
    let Ingredients = snapshot.Ingredients;
    const methodText = document.getElementById("method");
    const ingredientsText = document.getElementById("ingredients");
    const foodInfo = snapshot.Food_Info;
    let foodInfoCol = foodInfo.split("," + "\n");
    //setTimeout(RecipeInfo, 500);
    if (response.status == 200) {
      let stop = setTimeout(RecipeInfo, 1000);
      document.title = snapshot.Name;
      var converter = new showdown.Converter(),
        text = Ingredients,
        html = converter.makeHtml(text);
      ingredientsText.innerHTML = html;
      var converter = new showdown.Converter(),
        text = method,
        html = converter.makeHtml(text);
      methodText.innerHTML = html;
    }
    function RecipeInfo() {
      let time = document.querySelectorAll(".recipe-info");
      let heroTime = document.getElementById("recipe_time");
      heroTime.innerHTML = foodInfoCol[0];
      //let time = document.getElementById("time");
      //let serves = document.getElementById("serves");
      //let calories = document.getElementById("calories");
      //let carbohydrate = document.getElementById("carbohydrate");
      //let fatTotal = document.getElementById("fatTotal");
      //let protein = document.getElementById("protein");
      for (let i = 0; i < time.length; i++) {
        time[i].innerHTML = foodInfoCol[i];
        //serves.innerHTML = foodInfoCol[i]
        //calories.innerHTML = foodInfoCol[i]
        //carbohydrate.innerHTML = foodInfoCol[i]
        //fatTotal.innerHTML = foodInfoCol[i]
        //protein.innerHTML = foodInfoCol[i]
      }
      clearTimeout(stop);
    }
  });
  setTimeout(() => {document.querySelector('.loading-state-v2').style.display = "none"}, 4000);
};
