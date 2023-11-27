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
  Wized.request.await("Signup Check", (response) => {
    const snapshot = response.data;
    const email = document.getElementById("Email-Signup");
    const emailErr = document.querySelector(".email_tooltip");
    email.addEventListener("keyup", () => {
      snapshot.forEach((user) => {
        if (snapshot.find((user) => user.Email == email.value)) {
          emailErr.classList.remove("hide_tooltip");
        } else {
          emailErr.classList.add("hide_tooltip");
        }
      });
    });
  });
};

setTimeout(() => {document.querySelector('.loading-state-v2').style.display = "none"}, 2000);
