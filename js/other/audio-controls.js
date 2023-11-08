// Siren = Define - Intialisation
const siren = document.getElementById("siren");
const sirenText = document.getElementById("sirenText");
const sirenAudio = document.getElementById("sirenAudio");
const sirenToggleOn = document.getElementById("sirenToggleOn");

// Voice = Define - Intialisation
const voice = document.getElementById("voice");
const voiceText = document.getElementById("voiceText");
const voiceAudio = document.getElementById("voiceAudio");
const voiceToggleOn = document.getElementById("voiceToggleOn");

window.onload = async () => {
  const sirenCookieInt = await Wized.data.get("c.sirenmute");
  const voiceCookieInt = await Wized.data.get("c.voicemute");


    sirenEnableLoad();
    voiceEnableLoad();

    siren.addEventListener("click", sirenEnableClick);
    voice.addEventListener("click", voiceEnableClick);

    // Siren Condtionals Click On/Off
    function sirenEnableClick() {
    if (sirenText.innerHTML === "Off") {
        Wized.data.setCookie("sirenmute", "on");
        sirenText.innerHTML = "On";
        sirenToggleOn.classList.toggle("on");
    } else if (sirenText.innerHTML === "On") {
        Wized.data.setCookie("sirenmute", "muted");
        sirenText.innerHTML = "Off";
        sirenToggleOn.classList.toggle("on");
    }

    // Development Purposes (DEBUGGING)
    let sirenUpdatedCookie = Wized.data.get("c.sirenmute");
    console.log("---------------------------------------");
    console.log("mute cookie changed to: ", sirenUpdatedCookie);
    console.log("---------------------------------------");
    }

    // Voice Condtionals Click On/Off
    function voiceEnableClick() {
    if (voiceText.innerHTML === "Off") {
        Wized.data.setCookie("voicemute", "on");
        voiceText.innerHTML = "On";
        voiceToggleOn.classList.toggle("on");
    } else if (voiceText.innerHTML === "On") {
        Wized.data.setCookie("voicemute", "muted");
        voiceText.innerHTML = "Off";
        voiceToggleOn.classList.toggle("on");
    }

    // Development Purposes (DEBUGGING)
    const voiceUpdatedCookie = Wized.data.get("c.voicemute");
    console.log("---------------------------------------");
    console.log("mute cookie changed to: ", voiceUpdatedCookie);
    console.log("---------------------------------------");
    }

    // Siren Condtionals On Page Load On/Off
    function sirenEnableLoad() {
    // Siren Cookie Intialising On
    if (sirenCookieInt === "undefined" || sirenCookieInt === undefined) {
        Wized.data.setCookie("sirenmute", "on");
        sirenText.innerHTML = "On";
        sirenToggleOn.classList.toggle("on");
    }
    // Siren Cookie On
    else if (sirenCookieInt === "on") {
        sirenText.innerHTML = "On";
        sirenToggleOn.classList.toggle("on");
    }
    // Siren Cookie Off
    else if (sirenCookieInt === "off") {
        sirenText.innerHTML = "Off";
        sirenToggleOn.classList.toggle("on");
    }
    }

    // Voice Condtionals On Page Load On/Off
    function voiceEnableLoad() {
    // Voice Cookie Intialising On
    if (voiceCookieInt === "undefined" || voiceCookieInt === undefined) {
        Wized.data.setCookie("voicemute", "on");
        voiceText.innerHTML = "On";
        voiceToggleOn.classList.toggle("on");
    }
    // Voice Cookie On
    else if (voiceCookieInt === "on") {
        voiceText.innerHTML = "On";
        voiceToggleOn.classList.toggle("on");
    }
    // Voice Cookie Off
    else if (voiceCookieInt === "off") {
        voiceText.innerHTML = "Off";
        voiceToggleOn.classList.toggle("on");
    }
    }
};
