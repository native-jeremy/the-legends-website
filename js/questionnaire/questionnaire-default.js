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
  Wized.request.await("Load Questionnaire", (response) => {
    const snapshot = response.data;
    const email = document.getElementById("Email");
    const emailErr = document.querySelector(".email_tooltip");
    const emailValid = document.getElementById("emailValid");
    const emailNotValid = document.getElementById("emailNotValid");
    email.addEventListener("keyup", () => {
      snapshot.forEach((user) => {
        if (snapshot.find((user) => user.Email == email.value)) {
          emailErr.classList.remove("hide_tooltip");
          emailValid.classList.add("hide");
          emailNotValid.classList.remove("hide");
        } else {
          emailErr.classList.add("hide_tooltip");
          emailValid.classList.remove("hide");
          emailNotValid.classList.add("hide");
        }
      });
    });
  });
  // Checked arrays created to hold data
  let question4CheckedArray = [];
  let question6CheckedArray = [];
  // Checkbox element declaration
  const checkboxesQ4 = document
    .getElementById("question-4")
    .querySelectorAll('input[type="checkbox"]');
  const labelsQ4 = document
    .getElementById("question-4")
    .querySelectorAll(".checkbox_text");
  const checkboxesQ6 = document
    .getElementById("question-6")
    .querySelectorAll('input[type="checkbox"]');
  const labelsQ6 = document
    .getElementById("question-6")
    .querySelectorAll(".checkbox_text");
  // Checkbox event listener for change event
  for (let i = 0; i < checkboxesQ4.length; i++) {
    const checkbox = checkboxesQ4[i];
    const label = labelsQ4[i];
    checkbox.addEventListener("change", () => {
      if (checkbox.checked === true) {
        question4CheckedArray.push(label.textContent);
        Wized.data.setVariable("Question4", question4CheckedArray);
      } else {
        const findIndex = question4CheckedArray.indexOf(label.textContent);
        if (findIndex > -1) {
          question4CheckedArray.splice(findIndex, 1);
          Wized.data.setVariable("Question4", question4CheckedArray);
        }
      }
    });
  }
  for (let i = 0; i < checkboxesQ6.length; i++) {
    const checkbox = checkboxesQ6[i];
    const label = labelsQ6[i];
    checkbox.addEventListener("change", () => {
      if (checkbox.checked === true) {
        question6CheckedArray.push(label.textContent);
        Wized.data.setVariable("Question6", question6CheckedArray);
      } else {
        const findIndex = question6CheckedArray.indexOf(label.textContent);
        if (findIndex > -1) {
          question6CheckedArray.splice(findIndex, 1);
          Wized.data.setVariable("Question6", question6CheckedArray);
        }
      }
    });
  }
  Wized.data.listen("v.Question4", async () => {
    const question4Applied = await Wized.data.get("v.Question4"); // Get new value
  });
  Wized.data.listen("v.Question6", async () => {
    const question6Applied = await Wized.data.get("v.Question6"); // Get new value
  });
};

document.querySelector('.loading-state-v2').style.display = "none"

//
$(document).ready(function () {
  // get the anchor link buttons
  const menuBtn = $(".button-style-4");
  const menuBtn2 = $(".button-style-2-2");
  const menuBtn3 = $(".button-style-1-2");
  const iconBtn = $(".form-indicator-icon");
  // when each button is clicked
  menuBtn.click(() => {
    // set a short timeout before taking action
    // so as to allow hash to be set
    setTimeout(() => {
      // call removeHash function after set timeout
      removeHash();
    }, 0);
  });
  menuBtn2.click(() => {
    // set a short timeout before taking action
    // so as to allow hash to be set
    setTimeout(() => {
      // call removeHash function after set timeout
      removeHash();
    }, 0); // 5 millisecond timeout in this case
  });
  menuBtn3.click(() => {
    // set a short timeout before taking action
    // so as to allow hash to be set
    setTimeout(() => {
      // call removeHash function after set timeout
      removeHash();
    }, 0); // 5 millisecond timeout in this case
  });
  iconBtn.click(() => {
    // set a short timeout before taking action
    // so as to allow hash to be set
    setTimeout(() => {
      // call removeHash function after set timeout
      removeHash();
    }, 0);
  });
  // removeHash function
  // uses HTML5 history API to manipulate the location bar
  function removeHash() {
    history.replaceState(
      "",
      document.title,
      window.location.origin + window.location.pathname + window.location.search
    );
  }
});
