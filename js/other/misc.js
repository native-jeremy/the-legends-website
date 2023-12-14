/*setTimeout(removeBadge, 400);
function removeBadge() {
  let findLink = document.querySelectorAll("a");
  for (let i = 0; i < findLink.length; i++) {
    if (findLink[i].href === "https://wized.com/?utm_campaign=badge") {
      findLink[i].remove();
    }
  }
}
setTimeout(addBadge, 2000);
function addBadge() {
  let badge = document.createElement("div");
  badge.innerHTML = `<div class="the-legends-dev-banner"><img src="https://assets.website-files.com/6474932b31758d71131214b7/6474932b31758d71131214a3_the_legends-logo-green.svg" loading="lazy" alt="" class="img_full"></div>`;
  document.body.append(badge);
}*/

//document.body.setAttribute("oncontextmenu", "return false")
if (document.body.contains(document.querySelector(".top-level"))) {
  let backBtn = document.querySelectorAll(".top-level");
  backBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      history.back();
    });
  });
}
