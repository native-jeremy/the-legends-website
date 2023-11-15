const { createApp } = Vue

createApp({
  data() {
    return {
      workout: {
        id: "",
        finishAudio: "",
        round: 0,
        exercises: 0,
        exercise: 0,
        roundAmount: 0,
        exercisesAmount: 0,
        voiceHasPlayed: false,
        startDifficulty: []
      },
      roundData: [],
      exerciseData: [],
      StatusCode200: false,
      popup: true,
      completed: false,
      loadedExercise: false,
      min: 0,
      Debug: false,
    }
  },
  computed: {
    // a computed getter
    exerciseTitle() {
      if(this.StatusCode200 == true)
      {
      return this.exerciseData[this.workout.round][this.workout.exercises].Exercise_Category[0]
      }
    },
    exerciseType() {
      if(this.StatusCode200 == true)
      {
      return this.roundData[this.workout.round].Rep_Type_Linked_Exercises[this.workout.exercises]
      }
    },
    exerciseAmount() {
      if(this.StatusCode200 == true)
      {
      return this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
      }
    },
    exerciseVideo() {
      if(this.StatusCode200 == true)
      {
      return this.exerciseData[this.workout.round][this.workout.exercises].Video[this.min].url
      }
    },
    exerciseVoice() {
      if(this.StatusCode200 == true)
      {
      return this.roundData[this.workout.round].Audio_Source_Linked_Exercises[this.workout.exercises].url
      }
    },
    exerciseMax() {
      if(this.StatusCode200 == true)
      {
      return this.exerciseData[this.workout.round][this.workout.exercises].Video.length
      }
    },
    exerciseMin() {
      if(this.StatusCode200 == true)
      {
      return this.min
      }
    },
  },
  methods: {
    // Intial Request Data Applied To Data Object
    async intialRequest()
    {
      // Workout ID Param Search
      let workout = new URL(document.location).searchParams;
      this.workout.id = workout.get("workout");

      Wized.request.await("Load Round Info", (response) => {
        //console.log('Round Request', response)
        roundRes = response;
        roundInfo = roundRes.data[this.workout.round];
    
        this.startDifficulty = roundInfo.Default_Diff_Level.split(", ");
        roundSelected = roundRes.data[this.workout.round].Round_Selection;

        this.roundData = roundRes.data
        this.workout.roundAmount = roundRes.data.length

        roundRes.data.forEach((round) => {
          this.exerciseData.push([])
        });

        console.log('Intial Exercise Data', this.exerciseData)

        console.log('startDifficulty', this.startDifficulty)
        console.log('Current Round', roundSelected)
        console.log('Round Request', this.roundData)
        console.log('Round Length', this.workout.roundAmount)
      });
      
      Wized.request.await("Load Finished Audio", (response) => {    
        this.workout.finishAudio = response.data[0].Audio[0].url
        console.log("Audio Response", response);
      })

      Wized.request.await("Load Exercise Diff V2", (response) => {
        //console.log("Exercise Response", response);
        response.data.forEach((e, ei) => {
          this.roundData.forEach((r, ri) => {
            r.ID_Linked_Exercises.forEach((id, index) => {
              if(e.Exercise_ID.includes(id))
              {
                //console.log("MATCH!");
                //console.log("Exercise Name", e);
                this.exerciseData[ri].push(e);
              }
            });
          });
        })

        // Stagger Loading assets
        setTimeout(() => {
        this.StatusCode200 = true;
        this.loadedExercise = false;
        this.title(true)
        }, 4000);

        console.log("Exercise Data", this.exerciseData)
      })
    },

    // Webflow Animations Reset
    WebflowAnimations() {
      console.log("interaction loaded");
      window.Webflow && window.Webflow.destroy();
      window.Webflow && window.Webflow.ready();
      window.Webflow && window.Webflow.require("ix2").init();
      document.dispatchEvent(new Event("readystatechange"));
    },

    // Custom Animations For Video Source Changing
    CustomAnimations(input) {
      // Prev Exercise Animation
      if(input == 1)
      {
        anime({
          targets: '.app-fullscreen-video',
          translateX: ['100vw', '0vw'],
          borderRadius: ['100%', '0%'],
          easing: 'easeInOutQuad',
          duration: 1500,
          opacity: [0, 1],
        });
      }

      // Next Exercise Animation
      else if(input == 0)
      {
        anime({
          targets: '.app-fullscreen-video',
          translateX: ['-100vw', '0vw'],
          borderRadius: ['100%', '0%'],
          opacity: [0, 1],
          easing: 'easeInOutQuad',
          duration: 1500
        });
      }  

      else if(input == 2)
      {
        anime({
          targets: '.app-fullscreen-video',
          translateY: ['100vh', '0vh'],
          borderRadius: ['50%', '0%'],
          opacity: [0, 1],
          easing: 'easeInOutQuad',
          duration: 1500
        });
      }
    },

    // Exercise Change Logic
    ChangeExercise(play, video, voice, input)
    {
      this.loadedExercise = true;
      if(input == 1)
      {
        // Change Exercises Number
        this.workout.exercises = this.workout.exercises + 1;
      }
      else if (input == 0)
      {
        // Change Exercises Number
        this.workout.exercises = this.workout.exercises - 1;
      }
      else if (input == 3)
      {
        // Change Exercises Number
        this.workout.exercises = this.workout.exercises - 1;
      }
      else if (input == 2)
      {
        // Change Round Number
        this.workout.round = this.workout.round - 1;
        // Change Exercises Number
        this.workout.exercises = this.exerciseData[this.workout.round].length - 1;
        this.popup = false;
      }

      if(input !== 3)
      {
      // Video & Audio Delay
      setTimeout(() => {
        // Timer For Exercise
        //this.Timer(time, play, video, voice, siren)
  
        // Play Icon Condtion Play/Pause
        if (video.paused) {
          play.classList.toggle("pause");
          //timerText.classList.remove("pausetime");
        } else {
          play.classList.toggle("pause");
          //timerText.classList.add("pausetime");
        }
  
        // Play Video/Audio
        voice.play();
        video.play();
        play.classList.toggle("pause");
        this.loadedExercise = false;
      },1750)
      }
      else if(input == 3)
      {
        this.loadedExercise = false;
      }
    },

    // Siren & Voice Enabled
    LoadedAudioEnabled(SirenText, SirenToggle, VoiceText, VoiceToggle) {

      // Local Storage Audio Values
      const sirenValue = localStorage.getItem("siren");
      const voiceValue = localStorage.getItem("voice");
      
      // Siren Intialising On
      if (sirenValue === undefined || sirenValue === null) {
        localStorage.setItem("siren", "on");
        SirenText.textContent = "On";
        sirenToggleOn.classList.add("on");
      }
      // Siren On
      else if (sirenValue === "on") {
        SirenText.textContent = "On";
        SirenToggle.classList.add("on");
      }
      // Siren Off
      else if (sirenValue === "off") {
        sirenText.innerHTML = "Off";
        SirenToggle.classList.remove("on");
      }
      // Voice Intialising On
      if (voiceValue == undefined || voiceValue == null) {
        localStorage.setItem("voice", "on");
        VoiceText.textContent = "On";
        VoiceToggle.classList.add("on");
      }
      // Voice On
      else if (voiceValue == "on") {
        VoiceText.textContent = "On";
        VoiceToggle.classList.add("on");
      }
      // Voice Off
      else if (voiceValue == "off") {
        VoiceText.textContent = "Off";
        VoiceToggle.classList.remove("on");
      }
    },

    TimerConversion(time, text) {
      minutes = Math.floor(time / 60); 
      seconds = time % 60;
      text.innerHTML = minutes + ":" + seconds;
    },

     // Exercise Timer
    Timer(time, video, siren) {
      let counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises];
      //let percentage = counter / 100 * 100;

      // Progress Wheel Value
      //setProgress(percentage);

      // Timer To Run Exercise
      let timer = setInterval(() => {
        //setProgress(counter);

        // Condtion To Check If Paused
        if (!time.classList.contains("pausetime")) {
          this.TimerConversion(counter, time);
          counter--;
          // Condtion To Check If Finished
          if (counter < 0) {
            siren.play();
          setTimeout(() => {
          this.NextExercise(timer);
          }, 2000);

          clearInterval(timer);
          //clearInterval(checkAmrap);
          }
        }
      }, 1000);
    },

    // Play Exercise By Click
    PlayExercise(time, play, video, voice)
    {
      this.popup = false;
      // Timer For Exercise
      //this.Timer(time, play, video, voice, siren)

      // Checks If Voice Has Played Then Plays If Returns false
      if(!this.voiceHasPlayed)
      {
        // Audio Condtion Play/Pause
        if (voice.paused) {
          voice.play();
        } 
        else {
          voice.pause();
        }

        this.voiceHasPlayed = true
      }

      // Video Condtion Play/Pause
      if (video.paused) {
        video.play();
        play.classList.toggle("pause");
        time.classList.remove("pausetime");
        this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren);
      } else {
        video.pause();
        play.classList.toggle("pause");
        time.classList.add("pausetime");
        this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren, this.$refs.realAmount)
      }
    },

    // Previous Exercise By Click
    PrevExercise()
    {
      if(this.workout.exercises == 0)
      {
        // Round Change
        this.popup = true;
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 2)
        this.CustomAnimations(0)
        this.title(true)
      }
      // Round Start
      else if(this.workout.exercises - 1 == 0)
      {
        this.popup = true;
        this.$refs.play.classList.toggle("pause")
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 3)
        this.CustomAnimations(0)
        this.title(true)
        this.voiceHasPlayed = false
      }
      else {
        // Exercise Change
        this.popup = false;
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 0)
        // Calling Custom Animations
        this.CustomAnimations(0)
        this.title(true)
      }
    },

    // Next Exercise By Click
    NextExercise(timer)
    {
      clearInterval(timer);
      // Round Change
      if(this.workout.exercises == this.exerciseData[this.workout.round].length - 1 && this.workout.round + 1 !== this.roundData.length)
      {
        this.popup = true;
        this.workout.round = this.workout.round + 1;
        this.workout.exercises = 0
        this.$refs.play.classList.toggle("pause")
        console.log('First Condition')
        this.title(true)
        this.voiceHasPlayed = false
      }
      // Finished Change
      else if(this.workout.exercises + 1 == this.exerciseData[this.workout.round].length && this.workout.round + 1 == this.roundData.length)
      {
        this.popup = true;
        this.completed = true;
        //this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 0)
        this.title(false)
        console.log('Main Condition')
      }
      else {
        // Exercise Change
        this.popup = false;
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 1)
        console.log('Final Condition')
        // Calling Custom Animations
        this.CustomAnimations(1)
        this.title(true)
      }
    },

    title(input)
    {
      if(input == true) {
      document.title = this.exerciseTitle
      }
      else if (input == false) {
        document.title = 'Completed Workout!'
      }
    },

    // Siren Enabled By Click
    SirenEnableClick(text, toggle) {
      if (text.innerHTML === "Off") {
        localStorage.setItem("siren", "on");
        sirenSrc.play();
        text.textContent = "On";
        toggle.classList.add("on");
      } 
      else if (text.textContent === "On") {
        localStorage.setItem("siren", "off");
        sirenSrc.pause();
        sirenSrc.currentTime = "0";
        text.textContent = "Off";
        toggle.classList.remove("on");
      }
    },
  
    // Voice Enabled By Click
    VoiceEnableClick(text, toggle) {
      if (text.textContent === "Off") {
        localStorage.setItem("voice", "on");
        voiceSrc.play();
        text.textContent = "On";
        toggle.classList.add("on");
      } 
      else if (voiceText.innerHTML === "On") {
        localStorage.setItem("voice", "off");
        voiceSrc.pause();
        voiceSrc.currentTime = "0";
        text.textContent = "Off";
        toggle.classList.remove("on");
      }
    },

    ChangeDifficulty(input, video, difficulty) {
      if (video.paused) {
        video.play();
        this.$refs.play.classList.toggle("pause");
        //time.classList.remove("pausetime");
      } else {
        video.pause();
        this.$refs.play.classList.toggle("pause");
        //time.classList.add("pausetime");
      }

      this.CustomAnimations(2)

      if(input == 0)
      {
        this.min = this.min - 1
        
        video.src = this.exerciseData[this.workout.round][this.workout.exercises].Video[this.min].url
        setTimeout(() => {
          // Video Condtion Play/Pause
          if (video.paused) {
            video.play();
            this.$refs.play.classList.toggle("pause");
            //time.classList.remove("pausetime");
          } else {
            video.pause();
            this.$refs.play.classList.toggle("pause");
            //time.classList.add("pausetime");
          }
        }, 1500)
      }
      else if(input == 1)
      {
        this.min = this.min + 1

        //this.workout.startDifficulty[difficulty] = this.workout.startDifficulty[difficulty] + 1

        video.src = this.exerciseData[this.workout.round][this.workout.exercises].Video[this.min].url
        setTimeout(() => {
       // Video Condtion Play/Pause
          if (video.paused) {
            video.play();
            this.$refs.play.classList.toggle("pause");
            //time.classList.remove("pausetime");
          } else {
            video.pause();
            this.$refs.play.classList.toggle("pause");
            //time.classList.add("pausetime");
          }
        }, 1500)
      }
    }
  },
  mounted() {
    // Intial Data Request Called
    this.intialRequest()
    anime({
      targets: '.path2',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'cubicBezier(.5, .05, .1, .3)',
      duration: 2000,
      delay: function(el, i) { return i * 250 },
      direction: 'alternate',
      loop: true
    });
    //console.log("mounted element", this.$refs.siren);

    // Audio Enabled Method Called
    this.LoadedAudioEnabled(this.$refs.sirenText, this.$refs.sirenToggle, this.$refs.voiceText, this.$refs.voiceToggle)

    // Webflow Animations Reset Called
    this.WebflowAnimations()
  },
}).mount('#app')

// Wized.data.setVariable("complete", "completed");

/*const videoContainer = document.getElementById("videoContainer");
const loaderTrigger = document.getElementById("Trigger");
const exerciseTitle = document.getElementById("exerciseTitle");
const exerciseHeader = document.getElementById("exerciseHeader");
const roundPopup = document.getElementById("roundPopup");
const roundTitle = document.getElementById("roundTitle");
const roundNumHeader = document.getElementById("headerNumText");
const roundText = document.getElementById("roundText");
const videoChange = document.getElementById("videoChange");


const repText = document.getElementById("repText");
const timerText = document.getElementById("safeTimerDisplay");
const currentTest = document.getElementById("current");
const durationTest = document.getElementById("dur");
const RoundNumberText = document.getElementById("mainNumText");
const progressEl = document.querySelector('.wheel');
let loader = document.getElementById('loader');
const returnMessage = document.getElementById('return');
const recoveryMessage = document.getElementById('recoveryMessage');
const recoveryLink = document.getElementById('recoveryLink');
const workoutMessage = document.getElementById('workoutMessage');
let voiceSrc = document.getElementById("voiceSrc");
let sirenSrc = document.getElementById("sirenSrc");


let setIntRoundNum;
let setIntExercisesNum;
let setIntExerciseNum;


let getRoundNum;
let getExercisesNum;
let getExerciseNum;

let setRoundNum;
let setExercisesNum;
let setExerciseNum;

let exerciseDiffRes;
let roundRes;
let roundResIndex;
let roundLength;
let exerciseData;
let roundRealNumber;
let audioRes;
let audioIndex;
let checkAmrapVideo;
let checkAmrapAudio;
let exerciseRes;
let diffLength;
let diffCurrent;
let diffRes;
let minutes;
let seconds;


const minusBtn = document.getElementById("minusBtn");
const currentNum = document.getElementById("currentNum");
const limitNum = document.getElementById("limitNum");
const plusBtn = document.getElementById("plusBtn");
let maxLimit;
let minLimit = 0;
let amount = 0;
currentNum.innerHTML = amount;

let refreshNum = 0;
window.onload = async () => {

  Wized.request.await("Load Round Info", (response) => {
    const mainResponse = response;
    const repDataInt = response;
    let repAmount;
    let repType;
    let newcookieIndex;
    let amrapBool;
    const amrapResponse = response;
    let checkAmrap;


    if (repDataInt.status === 200) {
      loaderTrigger.click();
      videoContainer.style.opacity = "1";
    }

    let audioSrc = document.getElementById("voiceSrc");
    let audioIndex = exercise;
    let vidSrc = document.getElementById("video");
    let videoIndex = exercise;

      repAmount = mainResponse.data[round].Amounts_Name_Linked_Exercises[exercises];
      repType = mainResponse.data[round].Rep_Type_Linked_Exercises[exercises]
      amrapBool = mainResponse.data[round].Amrap_Linked_Exercises[exercises];
 
      timerConversion(repAmount)

      function timerConversion(time) {
        minutes = Math.floor(time / 60); 
        seconds = time % 60;
      }

      if (amrapBool == "True") {        
        async function loadAmrapData() {

          Wized.request.await("Load Exercise Diff", (response) => {
            const singleBlock = document.querySelector('.single_heading_block');
            const amrapBlock = document.querySelector('.amrap_heading_block');
            singleBlock.remove();
            
            secondaryResponse = response;


            exerciseDiffRes = diffRes;

            let amrapLength = mainResponse.data[parseInt(roundParam)].Amrap_Exercise_Amount_Linked_Exercises.length;

            diffLength = secondaryResponse.data[parseInt(videoIndex)].Video.length
            let diffRealLength = secondaryResponse.data[0].Video.length 
            maxLimit = diffLength;
            limitNum.innerHTML = maxLimit;
            newcookieIndex =
            secondaryResponse.data[parseInt(videoIndex)].Video.length;

            let currentNumber = 0;
            let currentNumberText = currentNumber;

            let controlPlusNumber = [];
            let controlMinusNumber = [];
            let videoSrcIndex = [];
            
            const exerciseNames = mainResponse.data[parseInt(roundParam)].Exercise_Category_Linked_Exercises
            const exerciseDiffNames = secondaryResponse.data

            let videoOrderList = [];

            exerciseNames.forEach((name, index) => {
              exerciseDiffNames.forEach((diff, current) => {
              if(exerciseDiffNames[current].Exercise_Category.includes(name))
              {
                videoOrderList.push(exerciseDiffNames[current]);
              }});
            });

            removeDuplicates(videoOrderList)

            function removeDuplicates(arr) { 
            videoOrderList = arr.reduce(function (acc, curr) { 
            if (!acc.includes(curr)) 
              acc.push(curr); 
            return acc; 
            }, []); 
            return videoOrderList; 
            } 

            secondaryResponse.data = videoOrderList;
            if (videoSrcIndex.length  <= 0) {
              
              for (let i = 0; i < amrapLength; i++)
              {
                let defaultDiff = roundDiffLevel[i];
                videoSrcIndex.push(defaultDiff);
              }

              for (let i = 0; i < amrapLength; i++)
              {
                const amrapRenderAmount = mainResponse.data[parseInt(roundParam)].Amrap_Exercise_Amount_Linked_Exercises[i]
                const amrapRenderName = videoOrderList[i].Exercise_Name
                const renderHeadings = `
                <div class = "render_headings_block"> 
                <div class="generic-text-style-3 amrap-amount">${amrapRenderAmount}</div>
                <div class="main-heading-style-6 center-align amrap-title">${amrapRenderName}</div>
                </div>
                `
                amrapBlock.innerHTML = amrapBlock.innerHTML + renderHeadings
              }

            }

            if (videoSrcIndex.length > 0) {
              for (let i = 0; i < amrapLength; i++) {
                let content = document.querySelector("#controls");
                let sortedAmrapTitle = secondaryResponse.data[i].Exercise_Name;
                let amrapResTitle = sortedAmrapTitle;

                let amrapMaxLimit = secondaryResponse.data[i].Video.length

                let amrapControl;
                let amrapHeader;
                let amrapHeaderText;
                let amrapHeaderTop;
                let amrapTitle;
                let amrapTrigger;
                let amrapCounter;
                let amrapDivider;
                let amrapLimit;
                let amrapPlus;
                let amrapPlusArrow;
                let amrapMinus;
                let amrapMinusArrow;
                let amrapMinNumm = 0;
                let ammrapLimitNumm = maxLimit;

                const amrapControlName = videoOrderList[i].Exercise_Name;

                amrapControl = document.createElement("div");
                amrapControl.classList.add(
                  "accordion",
                  "style-1",
                  "amrap-diff-controls"
                );

                `<div class="accordion style-1">`

                content.append(amrapControl);

                if (localStorage.getItem("diffStart") !== null)
                {
                  currentNumber = localStorage.getItem("diffStart");
                }
                else {
                  currentNumber = videoSrcIndex[i] + 1;
                }

                currentNumberText = currentNumber;
                amrapHeader = document.createElement("div");
                amrapHeader.classList.add("accordion-header", "style-3");
                amrapControl.appendChild(amrapHeader);
                amrapHeaderText = document.createElement("div");
                amrapHeaderText.classList.add("accordion-header-text", "style-2");

                amrapHeader.appendChild(amrapHeaderText);

                amrapHeaderTop = document.createElement("div");
                amrapHeaderTop.classList.add("accordion-header-top-content");

                amrapHeaderText.appendChild(amrapHeaderTop);

                amrapTitle = document.createElement("h2");
                amrapTitle.classList.add("main-sub-heading-style-1");
                amrapTitle.innerHTML = amrapControlName;
                amrapHeaderTop.appendChild(amrapTitle);
                amrapTrigger = document.createElement("div");
                amrapTrigger.classList.add("diff-trigger");
                amrapHeader.appendChild(amrapTrigger);
                amrapMinus = document.createElement("div");
                amrapMinus.classList.add("counter-btn", "minus-btn");
                amrapTrigger.appendChild(amrapMinus);
                amrapMinusArrow = document.createElement("div");
                amrapMinusArrow.classList.add("counter-arrow", "left");
                amrapMinus.appendChild(amrapMinusArrow);
                amrapCounter = document.createElement("div");
                amrapCounter.classList.add("num", "current", "current-num");

                amrapCounter.innerHTML = videoSrcIndex[i];

                amrapTrigger.appendChild(amrapCounter);

                amrapDivider = document.createElement("div");
                amrapDivider.classList.add("num", "divider");
                amrapDivider.innerHTML = "/";
                amrapTrigger.appendChild(amrapDivider);
                amrapLimit = document.createElement("div");
                amrapLimit.classList.add("num", "limit", "limit-num");
                amrapLimit.innerHTML = amrapMaxLimit;
                amrapTrigger.appendChild(amrapLimit);
                amrapPlus = document.createElement("div");
                amrapPlus.classList.add("counter-btn", "Plus-btn");
                amrapTrigger.appendChild(amrapPlus);
                amrapPlusArrow = document.createElement("div");
                amrapPlusArrow.classList.add("counter-arrow", "right");
                amrapPlus.appendChild(amrapPlusArrow);
                controlPlusNumber.push(amrapPlus);
                controlMinusNumber.push(amrapMinus);

                controlPlusNumber[i].addEventListener("click", () => {
                  if (videoSrcIndex[i] < amrapMaxLimit) {
                    videoSrcIndex[i]++;
                    localStorage.setItem("diffStart", videoSrcIndex[i]);
                    currentNumberText = videoSrcIndex[i] + 1
                    amrapCounter.innerHTML = currentNumberText;
                  }
                });

                controlMinusNumber[i].addEventListener("click", () => {
                  if (videoSrcIndex[i] > amrapMinNumm) {
                    videoSrcIndex[i]--;
                    localStorage.setItem("diffStart", videoSrcIndex[i]);
                    currentNumberText = videoSrcIndex[i] + 1
                    amrapCounter.innerHTML = currentNumberText;
                  }
                });

                let srcIndex = 0;
                let trackerTime = 0;
                vidSrc.src = secondaryResponse.data[srcIndex].Video[videoSrcIndex[srcIndex] - 1].url;

                checkAmrapVideo = setInterval(() => {

                  if(!vidSrc.paused)
                  {       
                  if (trackerTime === 5) 
                  {
                    changeVideo = true;
                    if (changeVideo == true)
                    {
                      videoSource();
                      trackerTime = 0
                    } 
                  }
                  else {
                    trackerTime = trackerTime + 1
                  }
                  }
                  else if (vidSrc.paused) {
                    trackerTime = trackerTime;
                  }
                }, 1000);

                function videoSource()
                {
                    srcIndex++;
                    if (srcIndex < amrapLength) {
                      vidSrc.src = secondaryResponse.data[srcIndex].Video[videoSrcIndex[srcIndex] - 1].url;
 
                      let playPromise = vidSrc.play();

                      if (playPromise !== undefined) {
                        playPromise.then(_ => {
                          vidSrc.play();
                        })
                        .catch(error => {
                          console.log = function() {} 
                        });
                      }
                    }
                    else if (srcIndex >= amrapLength)
                    {
                      srcIndex = 0;
                      vidSrc.src = secondaryResponse.data[srcIndex].Video[videoSrcIndex[srcIndex] - 1].url;    
                      let playPromise = vidSrc.play();

                      if (playPromise !== undefined) {
                        playPromise.then(_ => {
                          vidSrc.play();
                        })
                        .catch(error => {
                          console.log = function() {} 
                        });
                      }
                    }
                }
              }
            }
          });
        }
      } else {

        clearInterval(checkAmrapVideo);
        
        async function loadSingleData() {

          Wized.request.await("Load Exercise Diff", (response) => {
            const amrapBlock = document.querySelector('.amrap_heading_block');
            amrapBlock.remove();
            
            secondaryResponse = response;
            let defaultDiff;
            
            if(mainResponse.data[parseInt(roundParam)].Amrap_Linked_Exercises.includes("True"))
            {
              defaultDiff = roundDiffLevel[mainResponse.data[parseInt(roundParam)].Amrap_Linked_Exercises.length + 1];
            }
            else {
              defaultDiff = roundDiffLevel[parseInt(exercisesParam)];
            }
            diffCurrent = defaultDiff - 1;
            currentNum.innerHTML = defaultDiff;

            diffLength =
            secondaryResponse.data[0].Video.length;
            maxLimit = diffLength;
            limitNum.innerHTML = maxLimit;

            DiffControlsSingle();
            vidSrc.src =
            secondaryResponse.data[0].Video[diffCurrent].url
            
            function DiffControlsSingle() {
              const singleTitle = document.querySelector('.single-title');
              singleTitle.textContent = secondaryResponse.data[0].Exercise_Name
              plusBtn.addEventListener("click", function () {
                if (diffCurrent + 1 < maxLimit) {
                  diffCurrent++;
                  amount++;
                  localStorage.setItem("diffStart", diffCurrent);
                  currentNum.innerHTML = diffCurrent + 1;
                  enableDisabledStates();
                  playVideoDiff();
                  vidSrc.src =
                  secondaryResponse.data[0].Video[
                      diffCurrent
                    ].url;
                  setTimeout(enableActiveStates, 1500);
                  setTimeout(autoPlayVideo, 2000);
                } else {
                  return false;
                }
              });

              minusBtn.addEventListener("click", function () {
                if (diffCurrent > minLimit) {
                  diffCurrent--;
                  amount--;
                  localStorage.setItem("diffStart", diffCurrent);
                  currentNum.innerHTML = diffCurrent + 1;
                  enableDisabledStates();
                  playVideoDiff();
                  vidSrc.src =
                    secondaryResponse.data[0].Video[
                      diffCurrent
                    ].url;
                  setTimeout(enableActiveStates, 1500);
                  setTimeout(autoPlayVideo, 2000);
                } else {
                  return false;
                }
              });
            }

          });
        }
      }

      audioSrc.src = mainResponse.data[parseInt(roundParam)].Audio_Source_Linked_Exercises[parseInt(exercisesParam)].url;

      workoutExitButton.addEventListener("click", exitParams);

      function exitParams() {
        workoutExitButton.href = "/workout-overview?workout=" + workoutParam;
      }

    function roundType() {
      if (repType === "Time") {
        timer();
      } else if (repType === "Reps") {
        repCount();
      }
    }

    function timer() {
      let counter = repAmount;
      let percentage = counter / 100 * 100;
      repText.innerHTML = repType;
      setProgress(percentage);
      let timer = setInterval(function () {
        timerConversion(counter);
        timerText.innerHTML = minutes + ":" + seconds;
        if (!timerText.classList.contains("pausetime")) {
          counter--;
          setProgress(counter);
          if (counter < 0) {
              playSiren();
              nextButton.click();
            clearInterval(timer);
            clearInterval(checkAmrap);
          }
        }
      }, 1000);
    }

    function setProgress(percent) {
      let progress = document.querySelector('.progressWheel');
      let radius = progress.r.baseVal.value;
      let circumference = radius * 2 * Math.PI;
      progress.style.strokeDasharray = circumference;
      progress.style.strokeDashoffset = circumference - (percent / 100) * circumference;
    }

    function repCount() {
      progressEl.style.display = "none";
      let counter = repAmount;
      repText.innerHTML = repType;
      timerText.innerHTML = counter;
    }

    function playVideo() {
      let video = document.getElementById("video");
      if (video.paused) {
        video.play();
        playButton.classList.toggle("pause");
        timerText.classList.remove("pausetime");
      } else {
        video.pause();
        playButton.classList.toggle("pause");
        timerText.classList.add("pausetime");
      }
    }

    function playVideoDiff() {
      let video = document.getElementById("video");
      if (!video.paused) {
        video.pause();
        playButton.classList.toggle("pause");
        timerText.classList.add("pausetime");
      }
    }
  });

  $(document).ready(function () {
    const scrollBtn = $(".panel-button");

    scrollBtn.click(() => {
      setTimeout(() => {
        removeHash();
      }, 0);
    });
    function removeHash() {
      history.replaceState(
        "",
        document.title,
        window.location.origin +
          window.location.pathname +
          window.location.search
      );
    }
  });
};*/