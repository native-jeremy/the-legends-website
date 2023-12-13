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
  const email = document.getElementById("Email-Login");
  const password = document.getElementById("Password-Login");
  const emailErr = document.querySelector(".email_tooltip");
  
  await Wized.data.setCookie('userid', ''); // Set value of "c.accesstoken"
  await Wized.data.setCookie('authtoken', '');

  loginButton.addEventListener("click", () => {
    Wized.request.await("Login user", (response) => {
      if (response.status == 500) {
        emailErr.classList.remove("hide_tooltip");
      } else {
        emailErr.classList.add("hide_tooltip");
      }
    });
  });
  email.addEventListener("focus", () => {
    emailErr.classList.add("hide_tooltip");
  });
  password.addEventListener("focus", () => {
    emailErr.classList.add("hide_tooltip");
  });
};

document.querySelector('.loading-state-v2').style.display = "none"
