const staticBtn = document.getElementById("staticBtn");
const staticBtns = document.getElementById("staticBtns");
const dynamicBtn = document.getElementById("dynamicBtn");
const dynamicBtns = document.getElementById("dynamicBtns");
const workoutCore = document.getElementById("workoutCore");
const workoutText = document.getElementById("workoutText");
const recText = document.getElementById("recText");
// Checking Parameters
let params = new URL(document.location).searchParams;
if (params.has("signedin")) {
  staticBtn.remove();
  staticBtns.remove();
} else {
  dynamicBtn.remove();
  dynamicBtns.remove();
}
setTimeout(() => {
  if (
    workoutText.textContent.includes("undefined") &&
    recText.textContent.includes("undefined")
  ) {
    workoutCore.remove();
  }
  console.log("interaction loaded");
  window.Webflow && window.Webflow.destroy();
  window.Webflow && window.Webflow.ready();
  window.Webflow && window.Webflow.require("ix2").init();
  document.dispatchEvent(new Event("readystatechange"));
}, 3000);
