anime({
    targets: '.path3',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'cubicBezier(.5, .05, .1, .3)',
    duration: 2000,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
});

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

setTimeout(() => {document.querySelector('.loading-state-v2').style.display = "none"}, 2000);