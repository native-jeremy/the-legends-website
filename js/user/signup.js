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
