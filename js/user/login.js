window.onload = async () => {
  const email = document.getElementById("Email-Login");
  const password = document.getElementById("Password-Login");
  const emailErr = document.querySelector(".email_tooltip");
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
