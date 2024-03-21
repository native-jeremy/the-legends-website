anime({
  targets: '.path3',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'cubicBezier(.5, .05, .1, .3)',
  duration: 2000,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});

const { createApp } = Vue;

createApp({
  data() {
    return {
      Rounds: [],
      Workouts: [],
    };
  },
  methods: {
    // Intial Request Data Applied To Data Object
    async intialRequest() {
      Wized.request.await("Load Workout - OVERVIEW", (response) => {
        const snapshot = response.data;
        let richTextRes = snapshot.Equipment_List;
        const richText = document.getElementById("richText");
    
        if (response.status == 200) {
          // Showdown Rich Text Converter
          document.title = snapshot.Name;
          var converter = new showdown.Converter(),
            text = richTextRes,
            html = converter.makeHtml(text);
          richText.innerHTML = html;
        }
        //console.log("Workout Res", snapshot);
      });

      Wized.request.await("Load Round Info", (response) => {
        //console.log("Round Request", response.data);
        this.Rounds = response.data;
      });

      Wized.request.await("Load Completed Workouts", (response) => {
        console.log("COmpleted Workouts Request", response.data);
        this.Workouts = response.data;
      });
    },

    // Webflow Animations Reset
    WebflowAnimations() {
      console.log("interaction loaded");
      window.Webflow && window.Webflow.destroy();
      window.Webflow && window.Webflow.ready();
      window.Webflow && window.Webflow.require("ix2").init();
      document.dispatchEvent(new Event("readystatechange"));
    },
    ConvertTimes() {
      const timeConvert = document.querySelectorAll(".convert_time");
      timeConvert.forEach((time) => {
        if (time.textContent.includes("Reps")) {
          time.textContent = time.textContent;
        } else {
          if (parseInt(time.textContent) < 60) {
            const newText = time.textContent.replace("Time", "");
            time.textContent = newText + " seconds";
            //console.log("Standard Time Not Over 60 seconds", time.textContent);
          } else {
            const newText = time.textContent.replace("Time", "");
            let timer = parseInt(newText);
            let convertedTime = Math.floor(timer / 60);
            let extraSeconds = timer % 60;
            if (!extraSeconds > 0) {
              time.textContent = convertedTime + " minutes";
            } else {
              time.textContent =
                convertedTime + " minutes " + extraSeconds + " seconds";
            }
            //console.log("Correct Converted Time", convertedTime + " minutes " + extraSeconds + " seconds");
          }
        }
      });
    },
  },
  created() {
    // Intial Data Request Called
    this.intialRequest();
  },
  mounted() {
    // Webflow Animations Reset Called
    this.WebflowAnimations();

    // Converted Times Called
    setTimeout(() => {
    this.ConvertTimes();
    document.querySelector(".loading-state-v2").style.display = "none";
    sal({
      threshold: 0.5,
      once: false,
    });
  }, 5000)

    // Siren & Voice Functionailty Setup
    const sirenValue = localStorage.getItem("siren");
    const voiceValue = localStorage.getItem("voice");

    sirenEnableLoad();
    voiceEnableLoad();

    siren.addEventListener("click", sirenEnableClick);
    voice.addEventListener("click", voiceEnableClick);

    function sirenEnableClick() {
      if (sirenText.innerHTML === "Off") {
        localStorage.setItem("siren", "on");
        sirenText.innerHTML = "On";
        sirenToggleOn.classList.add("on");
      } else if (sirenText.innerHTML === "On") {
        localStorage.setItem("siren", "off");
        voiceSrc.currentTime = "0";
        sirenText.innerHTML = "Off";
        sirenToggleOn.classList.remove("on");
      }
    }

    function voiceEnableClick() {
      if (voiceText.innerHTML === "Off") {
        localStorage.setItem("voice", "on");
        voiceText.innerHTML = "On";
        voiceToggleOn.classList.add("on");
      } else if (voiceText.innerHTML === "On") {
        localStorage.setItem("voice", "off");
        voiceText.innerHTML = "Off";
        voiceToggleOn.classList.remove("on");
      }
    }

    function sirenEnableLoad() {
      // Siren Intialising On
      if (sirenValue === undefined || sirenValue === null) {
        localStorage.setItem("siren", "on");
        sirenText.innerHTML = "On";
        sirenToggleOn.classList.add("on");
      }
      // Siren On
      else if (sirenValue === "on") {
        sirenText.innerHTML = "On";
        sirenToggleOn.classList.add("on");
      }
      // Siren Off
      else if (sirenValue === "off") {
        sirenText.innerHTML = "Off";
        sirenToggleOn.classList.remove("on");
      }
    }

    function voiceEnableLoad() {
      // Voice Intialising On
      if (voiceValue == undefined || voiceValue == null) {
        localStorage.setItem("voice", "on");
        voiceText.innerHTML = "On";
        voiceToggleOn.classList.add("on");
      }
      // Voice On
      else if (voiceValue == "on") {
        voiceText.innerHTML = "On";
        voiceToggleOn.classList.add("on");
      }
      // Voice Off
      else if (voiceValue == "off") {
        voiceText.innerHTML = "Off";
        voiceToggleOn.classList.remove("on");
      }
    }
  },
}).mount("#app");
