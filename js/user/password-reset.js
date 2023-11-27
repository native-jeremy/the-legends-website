anime({
  targets: '.path3',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'cubicBezier(.5, .05, .1, .3)',
  duration: 2000,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});

const send = document.getElementById("Send");
const reset = document.getElementById("Reset");
const message = document.getElementById("Message");
const sendButton = document.getElementById("sendButton");
// Url search parameters
let params = new URL(document.location).searchParams;
let url = window.location.href;
// Object Url Search
let entries = params.keys();
let parameters = params.keys();
let time = document.getElementById("time");
let timer = 10;
time.textContent = timer + " seconds";
sendButton.addEventListener("click", () => {
  message.classList.add("show_message");
  send.style.display = "none";
  reset.style.display = "none";
});
// Checking For Parameters
if (url.includes("reset-token")) {
  send.style.display = "none";
  reset.style.display = "flex";
} else {
  send.style.display = "flex";
  reset.style.display = "none";
}

setTimeout(() => {document.querySelector('.loading-state-v2').style.display = "none"}, 2000);
