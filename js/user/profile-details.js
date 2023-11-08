const inputField = document.querySelectorAll("input");
const inputIcon = document.querySelectorAll(".form-edit-icon");
for (let i = 0; i < inputField.length; i++) {
    const input = inputField[i];
    input.addEventListener("focus", () => {
        inputIcon.forEach((input) => {
            input.classList.remove("active_icon");
        });
            inputIcon[i].classList.add("active_icon");
    });
}