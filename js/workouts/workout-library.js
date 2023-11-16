// Intialisation Of Static Elements
let check = document.querySelectorAll('[type="checkbox"]');
let checkCustom = document.querySelectorAll(".w-checkbox-input");
const form = document.querySelector(".filter-form");
const resetBtn = document.getElementById("reset");
const headingBlock = document.querySelectorAll(".capsule-header-text");
const backBtn = document.getElementById("back");
let filterValues = [];
// Filters Active From Form Values
form.addEventListener("submit", function (event) {
  // Intialisation Of Rendered Elements
  let capsule = document.querySelectorAll(".capsule-filter");
  let capsuleValue = capsule;
  // Prevent Default - Which Refreshes The Page
  event.preventDefault();
  for (let i = 0; i < check.length; i++) {
    const filterBtn = check[i];
    if (filterBtn.checked == true) {
      let updateName = filterBtn.name.replace("-", " ");
      filterValues.push(updateName);
    }
  }
  // Forloop Through All Recipes
  for (let i = 0; i < capsule.length; i++) {
    const filterCap = capsule[i];
    const filterCapValue = capsuleValue[i];
    //console.log("Filter Capsule Title", filterCapValue.textContent.toLowerCase());
    //console.log("Filter Button Checked", updateName.toLowerCase());
    for (let i = 0; i < filterValues.length; i++) {
      const filterResults = filterValues[i];
      if (filterCapValue.textContent.includes(filterResults)) {
        filterCap.classList.remove("hide");
      } else {
        filterCap.classList.add("hide");
      }
    }
  }
  backBtn.click();
  console.log("Filter Button Checked", filterValues);
  console.log("Form Submitted");
});
// Filters Reset From Reset Button
resetBtn.addEventListener("click", () => {
  // Intialisation Of Rendered Elements
  let capsule = document.querySelectorAll(".capsule-filter");
  form.reset();
  filterValues = [];
  // Forloop Through All Checkboxes
  for (let i = 0; i < check.length; i++) {
    const filterBtn = checkCustom[i];
    filterBtn.classList.remove("w--redirected-checked");
  }
  for (let i = 0; i < capsule.length; i++) {
    const filterCap = capsule[i];
    if (filterCap.classList.contains("hide")) {
      filterCap.classList.remove("hide");
    }
  }
  console.log("Form Values Reset");
});
searchBar.addEventListener("keyup", function () {
  filterList();
});
function filterList() {
  let capsule = document.querySelectorAll(".capsule-filter");
  let capsuleTitle = document.querySelectorAll(".capsule-title");
  let capsuleTime = document.querySelectorAll(".capsule-time");
  let value = document.getElementById("searchBar").value;
  for (let i = 0; i < capsule.length; i++) {
    if (capsule[i].textContent.toLowerCase().includes(value.toLowerCase())) {
      capsule[i].classList.remove("hide");
      //capsule[i].setAttribute("style", "display: flex !important;");
    } else {
      capsule[i].classList.add("hide");
      //capsule[i].setAttribute("style", "display: none !important;");
    }
  }
}

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
