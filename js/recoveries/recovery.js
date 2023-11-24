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
        startDifficulty: [],
        counter: 0,
      },
      roundData: [],
      exerciseData: [],
      StatusCode200: false,
      popup: true,
      completed: false,
      loadedExercise: false,
      min: 0,
      Debug: false,
      fullyLoaded: false,
      type: "",
      timerEnded: false,
      sirenActive: false,
      sirenMuted: "",
      voiceMuted: "",
    }
  },
  computed: {
    // a computed getter
    exercise() {
      return this.workout.exercises
    },
    exerciseType() {
      if(!this.Rest)
      {
      return this.roundData[this.workout.round].Rep_Type_Linked_Exercises[this.workout.exercises]
      }
      else {
        return this.roundData[this.workout.round].Rep_Type_Linked_Exercises[1]
      }
    },
    exerciseAmount() {
      return this.workout.counter = parseInt(this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[1]) + 1
    },
    exerciseVoice() {
        return this.roundData[this.workout.round].Audio_Source_Linked_Exercises[1].url
    },
    exerciseMax() {
      return this.exerciseData[this.workout.round][this.workout.exercises].Video.length
    },
    exerciseMin() {
      return this.min
    },
    exerciseMinData() {
      return parseInt(this.workout.startDifficulty[this.exercise]) - 1
    },
    defaultDiffList()
    {
      return this.roundData[this.workout.round].Default_Diff_Level.split(", ");
    },
    defaultDiffs() {
      return parseInt(this.defaultDiffList[this.exercise]) - 1
    },
    exerciseTitle() {
      return this.exerciseData[this.workout.round][this.workout.exercises].Exercise_Category[0]
    },
    exerciseVideo() {
      return this.exerciseData[this.workout.round][this.workout.exercises].Video[this.defaultDiffs].url
    },
  },
  methods: {
    // Intial Request Data Applied To Data Object
    async intialRequest()
    {
      // Workout ID Param Search
      let workout = new URL(document.location).searchParams;
      this.workout.id = workout.get("recovery");

      Wized.request.await("Load Round Info - Recovery", (response) => {
        //console.log('Round Request', response)
        roundRes = response;
        roundInfo = roundRes.data[this.workout.round];
    
        roundSelected = roundRes.data[this.workout.round].Round_Selection; 
        this.roundData = roundRes.data

        this.workout.startDifficulty = this.roundData[this.workout.round].Default_Diff_Level.split(", ");
        this.min = parseInt(this.workout.startDifficulty[this.workout.exercises]) - 1

        this.workout.roundAmount = roundRes.data.length
        this.type = this.roundData[this.workout.round].Rep_Type_Linked_Exercises[this.workout.exercises]

        console.log('Intial Exercise Data', this.exerciseData)

        console.log('startDifficulty', this.workout.startDifficulty)
        console.log('Current Round', roundSelected)
        console.log('Round Request', this.roundData)
        console.log('Round Length', this.workout.roundAmount)
      });
      
      Wized.request.await("Load Finished Audio", (response) => {    
        this.workout.finishAudio = response.data[0].Audio[0].url
        console.log("Audio Response", response);
      })

     /* Wized.request.await("Load Exercise Diff V2", (response) => {
        console.log("Exercise DATA", response);
        this.workout.counter = parseInt(this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises])
        this.roundData.forEach((r, ri) => {

          // Added This To Intialise Exercise Data
          this.exerciseData.push([])
          
          r.Diff_ID_Linked_Exercises.forEach((id, index) => {
            response.data.forEach((e, ei) => {
              if(e.ID.includes(id))
              {
                this.exerciseData[ri].push(e);
              }
            });
          });
        });

        console.log("Exercise Data END!", this.exerciseData)
        this.StatusCode200 = true;
        this.loadedExercise = false;
        this.title(true)
        this.intialisation
      })*/
    },

    // Data Intialised in Exercise
    intialisation()
    {
      // Turns On Round Popup
      this.popup = true;

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
        if(this.exerciseType == "Time")
        {
          this.timerEnded = true;
          // Timer For Exercise
          this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren, this.timerEnded);
        }
        else {
          this.timerEnded = true;
        }
      }
    },

    // Webflow Animations Reset
    WebflowAnimations() {
      console.log("interaction loaded");
      window.Webflow && window.Webflow.destroy();
      window.Webflow && window.Webflow.ready();
      window.Webflow && window.Webflow.require("ix2").init();
      document.dispatchEvent(new Event("readystatechange"));
    },

    // Exercise Change Logic
    ChangeExercise(play, video, voice, input, siren)
    {
      this.loadedExercise = true;
      if(input == 1)
      {
        this.workout.exercises = this.workout.exercises + 1;
        voice.src = this.roundData[this.workout.round].Audio_Source_Linked_Exercises[this.workout.exercises].url
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        if(this.exerciseType == "Time")
        {
          this.timerEnded = false;
          this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren, this.timerEnded);
        }
        else {
          this.timerEnded = true;
          this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren, this.timerEnded);
        }
      }

      else if (input == 0)
      {
        // Change Exercises Number
        this.workout.exercises = this.workout.exercises - 1;
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        if(this.exerciseType == "Time")
        {
          this.timerEnded = false;
          this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren, this.timerEnded);
        }
        else {
          this.timerEnded = true;
          this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren, this.timerEnded);
        }
      }
      else if (input == 3)
      {
        // Change Exercises Number
        this.workout.exercises = this.workout.exercises - 1;
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        if(this.exerciseType == "Time")
        {
          this.timerEnded = false;
          this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren, this.timerEnded);
        }
        else {
          this.timerEnded = true;
          this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren, this.timerEnded);
        }
      }
      else if (input == 2)
      {
        // Change Round Number
        this.workout.round = this.workout.round - 1;
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        // Change Exercises Number
        this.workout.exercises = this.exerciseData[this.workout.round].length - 1;
        this.popup = false;
      }

      this.min = parseInt(this.workout.startDifficulty[this.workout.exercises]) - 1

      if(input !== 3)
      {
      // Video & Audio Delay
      setTimeout(() => {
        // Play Icon Condtion Play/Pause
        if (video.paused) {
          play.classList.toggle("pause");
        } else {
          play.classList.toggle("pause");
        }

        video.play();

        if(this.voiceMuted !== "off")
        {
          voice.play();
          this.voiceHasPlayed = true
        }
        if(this.sirenMuted !== "off")
        {
          siren.muted = true;
          siren.play();
          this.sirenActive = true
        }

        play.classList.toggle("pause");
        this.loadedExercise = false;
      },0)
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
      this.sirenMuted = sirenValue;
      this.voiceMuted = voiceValue;
      
      // Siren Intialising On
      if (sirenValue === undefined || sirenValue === null) {
        localStorage.setItem("siren", "on");
        SirenText.textContent = "On";
        SirenToggle.classList.add("on");
        this.sirenMuted = localStorage.getItem("siren");;
      }
      // Siren On
      else if (sirenValue === "on") {
        SirenText.textContent = "On";
        SirenToggle.classList.add("on");
      }
      // Siren Off
      else if (sirenValue === "off") {
        SirenText.innerHTML = "Off";
        SirenToggle.classList.remove("on");
      }
      // Voice Intialising On
      if (voiceValue == undefined || voiceValue == null) {
        localStorage.setItem("voice", "on");
        VoiceText.textContent = "On";
        VoiceToggle.classList.add("on");
        this.voiceMuted = localStorage.getItem("voice");
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

    setProgress(percent) {
      let progress = document.querySelector('.progressWheel');
      let radius = progress.r.baseVal.value;
      let circumference = radius * 2 * Math.PI;
      progress.style.strokeDasharray = circumference;
      progress.style.strokeDashoffset = circumference - (percent / 100) * circumference;
    },

    TimerConversion(time, text) {
      minutes = Math.floor(time / 60); 
      seconds = time % 60;
      text.innerHTML = minutes + ":" + seconds;
    },

    Timer(time, video, siren, end)
    {
      if(this.exerciseType == "Time")
      { 
        if (!time.classList.contains("pausetime") && !end)
        {
          timer = setInterval(() => {
            let percentage = this.workout.counter / 100 * 100;
            // Progress Wheel Value
            this.setProgress(percentage);
            this.workout.counter--;
            this.TimerConversion(this.workout.counter, time);

            // Condtion To Check If Finished
            if (this.workout.counter == 0) {
              siren.currentTime = 0;
              if(this.sirenMuted !== 'off')
              {
              siren.muted = false;
              siren.play();
              }
              video.pause();
              video.currentTime = 0;
              clearInterval(timer);
              setTimeout(() => {
              this.NextExercise();
              }, 2000);
            }
          }, 1000);
        }
        else {
          clearInterval(timer);
        }
      }
      else {
        if(this.exerciseType !== "Reps")
        {
          clearInterval(timer)
        }
      }
    },

    // Play Exercise By Click
    PlayExercise(time, play, video, voice, siren)
    {
      this.popup = false;

    // Checks If Voice Has Played Then Plays If Returns false
    if(this.voiceMuted !== "off")
    {
      if(!this.voiceHasPlayed)
      {
        // Voice Audio Condtion Play/Pause
        voice.play()
        this.voiceHasPlayed = true
      }
    }
    if(this.sirenMuted !== "off")
    {
      if(!this.sirenActive)
      {
        // Siren Audio Condtion Play/Pause
        siren.muted = true;
        siren.play();
        this.sirenActive = true
      }
    }

      // Video Condtion Play/Pause
      if (video.paused) {
        video.play();
        play.classList.toggle("pause");
        time.classList.remove("pausetime");
        if(this.exerciseType == "Time")
        {
        this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren, this.timerEnded);
        }
      } else {
        video.pause();
        play.classList.toggle("pause");
        time.classList.add("pausetime");
        if(this.exerciseType == "Time")
        {
        this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren, this.timerEnded);
        }
      }
    },

    // Previous Exercise By Click
    PrevExercise()
    {
      if(this.workout.exercises == 0)
      {
        // Round Change
        this.popup = true;
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 2, this.$refs.siren)
        this.title(true)
      }
      // Round Start
      else if(this.workout.exercises - 1 == 0)
      {
        this.popup = true;
        clearInterval(timer)
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        this.$refs.play.classList.toggle("pause")
        this.$refs.time.classList.toggle("pausetime")
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 3, this.$refs.siren)
        this.title(true)
        this.voiceHasPlayed = false
        this.sirenActive = false
      }
      else {
        // Exercise Change
        this.min = parseInt(this.workout.startDifficulty[this.workout.exercises]) - 1
        this.popup = false;
        clearInterval(timer)
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 0, this.$refs.siren)
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        console.log('Final Condition')
        this.title(true)
      }
    },

    // Next Exercise By Click
    NextExercise(siren)
    {
      this.ResetAmrapData()
      
      if(this.exerciseType == "Reps")
      {
        if(this.sirenMuted !== "off")
        {
        siren.play()
        this.sirenActive = false;
        }
      }
      else {
        this.sirenActive = false;
      }

      //this.min = parseInt(this.workout.startDifficulty[this.workout.exercises]) - 1

      // Round Change
      if(this.workout.exercises == this.exerciseData[this.workout.round].length - 1 && this.workout.round + 1 !== this.roundData.length)
      {
        this.popup = true;
        clearInterval(timer)
        this.workout.round = this.workout.round + 1;
        this.workout.exercises = 0
        this.$refs.play.classList.toggle("pause")
        console.log('First Condition')
        this.title(true)
        this.voiceHasPlayed = false
        this.sirenActive = false
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
      }
      // Finished Change
      else if(this.workout.exercises + 1 == this.exerciseData[this.workout.round].length && this.workout.round + 1 == this.roundData.length)
      {
        this.popup = true;
        this.completed = true;
        clearInterval(timer)
        this.title(false)
        console.log('Main Condition')
      }
       // Exercise Change
      else {
        this.popup = false;
        if(this.exerciseType !== "Reps")
        {
          clearInterval(timer)
        }
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 1, this.$refs.siren)
        console.log('Final Condition')
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
        this.sirenMuted = localStorage.getItem("siren");
        sirenSrc.play();
        text.textContent = "On";
        toggle.classList.add("on");
      } 
      else if (text.textContent === "On") {
        localStorage.setItem("siren", "off");
        this.sirenMuted = localStorage.getItem("siren");
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
        this.voiceMuted = localStorage.getItem("voice");
        voiceSrc.play();
        text.textContent = "On";
        toggle.classList.add("on");
      } 
      else if (voiceText.innerHTML === "On") {
        localStorage.setItem("voice", "off");
        this.voiceMuted = localStorage.getItem("voice");
        voiceSrc.pause();
        voiceSrc.currentTime = "0";
        text.textContent = "Off";
        toggle.classList.remove("on");
      }
    },

    // Single Exercise Difficulty Change
    ChangeDifficulty(input, video) {
      this.loadedExercise = true
        video.pause();
        this.$refs.play.classList.toggle("pause");
        this.$refs.time.classList.add("pausetime");
        if(this.type == "Time")
        { 
        this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren);
        }

      if(input == 0)
      {
        this.min = this.min - 1
        
        video.src = this.exerciseData[this.workout.round][this.workout.exercises].Video[this.min].url
        setTimeout(() => {
          this.loadedExercise = false;
       // Video Condtion Play/Pause
          if (video.paused) {
            video.play();
            this.$refs.play.classList.toggle("pause");
            this.$refs.time.classList.remove("pausetime");
            this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren);
          } else {
            video.pause();
            this.$refs.play.classList.toggle("pause");
            this.$refs.time.classList.add("pausetime");
            if(this.type == "Time")
            { 
            this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren);
            }
          }
        }, 1500)
      }
      else if(input == 1)
      {
        this.min = this.min + 1

        video.src = this.exerciseData[this.workout.round][this.workout.exercises].Video[this.min].url
        setTimeout(() => {
          this.loadedExercise = false;
       // Video Condtion Play/Pause
          if (video.paused) {
            video.play();
            this.$refs.play.classList.toggle("pause");
            this.$refs.time.classList.remove("pausetime");
            this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren);
          } else {
            video.pause();
            this.$refs.play.classList.toggle("pause");
            this.$refs.time.classList.add("pausetime");
            if(this.type == "Time")
            { 
            this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren);
            }
          }
        }, 1500)
      }
    },
  },
  created()
  {
    // Intial Data Request Called
    this.intialRequest()
  },
  mounted() {
    anime({
      targets: '.path2',
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'cubicBezier(.5, .05, .1, .3)',
      duration: 2000,
      delay: function(el, i) { return i * 250 },
      direction: 'alternate',
      loop: true
    });

    // Audio Enabled Method Called
    this.LoadedAudioEnabled(this.$refs.sirenText, this.$refs.sirenToggle, this.$refs.voiceText, this.$refs.voiceToggle)

    // Webflow Animations Reset Called
    this.WebflowAnimations()

    // ID Param removed
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
  },
  updated() {
    if(this.completed == true)
    {
      Wized.data.setVariable("complete", "completed");
    }
  },
}).mount('#app')