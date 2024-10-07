const { createApp } = Vue

createApp({
  data() {
    return {
      workout: {
        id: "",
        recoveryLink: "",
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
      amrapData: {
        time: 0,
        amounts: null,
        titles: null,
        videos: null,
        amraps: [],
        diff: [],
        currentIndices: [],
        nextExercise: 0,
        hasRest: false,
      },
      StatusCode200: false,
      popup: true,
      completed: false,
      loadedExercise: false,
      min: 0,
      Debug: false,
      fullyLoaded: false,
      type: "",
      isAmrap: "",
      volume: false,
      amrapPlayed: false,
      roundSkipped: false,
      timerEnded: false,
      sirenActive: false,
      sirenMuted: "",
      voiceMuted: "",
      Rest: false,
      RestPlayed: false,
      isCompleted: null,
    }
  },
  computed: {
    // a computed getter
    exercise() {
      return this.workout.exercises
    },
    /*recoveryLink()
    {
      this.workout.recoveryLink = this.roundData[this.workout.round].ID_Recovery
    },*/
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
    if(!this.Rest)
      if(this.exerciseType == "Time")
      {
        return this.workout.counter = parseInt(this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]) + 1
      }
      else {
        return this.workout.counter = parseInt(this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises])
      }
    else {
      return this.workout.counter = parseInt(this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[1]) + 1
    }
    },
    amrapActive() {
      return this.roundData[this.workout.round].Amrap_Linked_Exercises[this.workout.exercises]
    },
    amrapAmounts() {
      return this.roundData[this.workout.round].Amrap_Exercise_Amount_Linked_Exercises
    },
    exerciseVoice() {
      if(!this.Rest)
      {
      return this.roundData[this.workout.round].Audio_Source_Linked_Exercises[this.workout.exercises].url
      }
      else {
        return this.roundData[this.workout.round].Audio_Source_Linked_Exercises[1].url
      }
    },
    exerciseMax() {
      return this.exerciseData[this.workout.round][this.workout.exercises].Video.length
    },
    exerciseMin() {
      return isNaN(this.min) ? 0 : this.min;
    },    
    exerciseMinData() {
      return isNaN(parseInt(this.workout.startDifficulty[this.exercise]) - 1) ? 0 : this.min;
    },
    exerciseDiffs() {
      return this.amrapData.currentIndices
    },
    defaultDiffList()
    {
      return this.roundData[this.workout.round].Default_Diff_Level.split(", ");
    },
    defaultDiffs() {
      return parseInt(this.defaultDiffList[this.exercise]) - 1
    },
    exerciseNext() {
      return this.amrapData.nextExercise
    },
    exerciseTitle() {
      return this.exerciseData[this.workout.round][this.workout.exercises].Exercise_Category[0]
    },
    exerciseVideo() {
      return this.exerciseData[this.workout.round][this.workout.exercises].Video[this.defaultDiffs].url
    },
    exerciseIndex() {
      return this.workout.exercise
    }
  },
  methods: {
    // Intial Request Data Applied To Data Object
    async intialRequest()
    {
      // Workout ID Param Search
      let workout = new URL(document.location).searchParams;
      this.workout.id = workout.get("workout");
      this.workout.recoveryLink = workout.get("recovery");
      //this.isCompleted = workout.get("done");

      Wized.request.await("Load Round Info", (response) => {
        //console.log('Round Request', response)
        roundRes = response;
        roundInfo = roundRes.data[this.workout.round];
        
    
        roundSelected = roundRes.data[this.workout.round].Round_Selection; 
        this.roundData = roundRes.data

        this.workout.startDifficulty = this.roundData[this.workout.round].Default_Diff_Level.split(", ");
        this.min = this.defaultDiffs

        this.workout.roundAmount = roundRes.data.length
        this.type = this.roundData[this.workout.round].Rep_Type_Linked_Exercises[this.workout.exercises]
        this.isAmrap = this.roundData[this.workout.round].Amrap_Linked_Exercises[this.workout.exercises]

        //console.log("Workout Data: ", this.workout)

        //console.log('Intial Exercise Data', this.exerciseData)

        //console.log('startDifficulty', this.workout.startDifficulty)
        //console.log('Current Round', roundSelected)
        //console.log('Round Request', this.roundData)
        //console.log('Round Length', this.workout.roundAmount)
      });

      // Load the audio first
      Wized.request.await("Load Finished Audio", (response) => {    
        this.workout.finishAudio = response.data[0].Audio[0].url
        console.log("Audio Response", response);
      })
      
      // Load workouts from both pages
      let rawWorkouts = [];

      // Load workouts from both pages
      Wized.request.await("Load Diffculties Page 1", (response1) => {    
        let page1Workouts = response1.data.filter(workout => 
          Array.isArray(workout.Workout_ID) && workout.Workout_ID.includes(this.workout.id));
        
        console.log("After Page 1");
      
        // Nested request for Page 2
        Wized.request.await("Load Diffculties Page 2", (response2) => {    
          let page2Workouts = response2.data.filter(workout => 
            Array.isArray(workout.Workout_ID) && workout.Workout_ID.includes(this.workout.id));
        
          console.log("After Page 2");
      
          // Combine workouts after both responses
          rawWorkouts = [...page1Workouts, ...page2Workouts];
        
          console.log("Complete Workouts: ", rawWorkouts);
      
          // Ensure exerciseData array is initialized
          if (!Array.isArray(this.exerciseData)) {
            this.exerciseData = [];
          }
      
          // Map roundData to exerciseData
          this.roundData.forEach((r, ri) => {
            // Initialize exerciseData for each round
            if (!Array.isArray(this.exerciseData[ri])) {
              this.exerciseData[ri] = [];
            }
      
            // Loop through linked exercises and map them from rawWorkouts
            r.Diff_ID_Linked_Exercises.forEach((id) => {
              rawWorkouts.forEach((e) => {
                if (e.ID.includes(id)) {
                  this.exerciseData[ri].push(e);
                }
              });
            });
          });
      
          console.log("Exercise Data: ", this.exerciseData);
        });
      });
      

      // Filter the workouts by checking if the Workout_ID array includes the workout.id
     /* const newList = freshData.filter(workout => 
          Array.isArray(workout.Workout_ID) && workout.Workout_ID.includes(this.workout.id)
      );*/

      // Log the new list of filtered workouts
      //console.log("New Workouts List: ", newList);

     // await Wized.request.execute('Load Exercise Diff V2');

     // Wized.request.await("Load Exercise Diff V2", (response) => {
        //console.log("Exercise DATA", response);
        //this.workout.counter = parseInt(this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises])
  

        //console.log("Exercise Data END!", this.exerciseData)
        this.StatusCode200 = true;
        this.loadedExercise = false;
        this.title(true)
        this.intialisation
      //})
    },

    // Data Intialised in Exercise
    intialisation()
    {
      // Turns On Round Popup
      this.popup = true;

      // Checks If Exercise Is An Amrap
      this.AmrapVideo(this.$refs.video)

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
        this.loadedExercise = true
        anime({
          targets: '.app-fullscreen-video',
          translateY: ['100vh', '0vh'],
          borderRadius: ['100%', '0%'],
          opacity: [0, 1],
          easing: 'easeInOutQuad',
          duration: 1500
        });
      }
    },

    amrapRest()
    {
      this.roundData[this.workout.round].Exercise_Title_Linked_Exercises.forEach((value, index) => {
        if(value.includes('Rest'))
        {
          this.amrapData.nextExercise = index
          this.amrapData.hasRest = true
          console.log('Value: ', index)
        }
        else {
          this.amrapData.amraps.push(value)
        }
      });
    },

    // Custom Animation For Video Loop
    VideoLoopAnimation() {
      anime({
        targets: '.app-fullscreen-video',
        easing: 'easeInOutQuad',
        duration: 750,
        opacity: [0, 1],
      });
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
      else if (input == -1)
      {
        this.workout.exercises = this.amrapData.nextExercise;
        //voice.src = this.roundData[this.workout.round].Audio_Source_Linked_Exercises[1].url
        this.workout.counter = parseInt(this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[1])
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

      this.min = parseInt(this.defaultDiffs)

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
        //voice.play();
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
          //setTimeout(() => {
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
        //}, 1000)
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
      this.AmrapVideo(this.$refs.video)
      // Timer For Exercise
      //this.Timer(time, play, video, voice, siren)

      // Checks If Voice Has Played Then Plays If Returns false
      //setTimeout(() => {
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
      //}, 2000);

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
        //this.min = parseInt(this.workout.startDifficulty[this.workout.exercises]) - 1
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 2, this.$refs.siren)
        this.CustomAnimations(0)
        this.title(true)
      }
      // Round Start
      else if(this.workout.exercises - 1 == 0)
      {
        this.popup = true;
        //this.min = parseInt(this.workout.startDifficulty[this.workout.exercises]) - 1
        clearInterval(timer)
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        this.$refs.play.classList.toggle("pause")
        this.$refs.time.classList.toggle("pausetime")
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 3, this.$refs.siren)
        this.CustomAnimations(0)
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
        // Calling Custom Animations
        this.CustomAnimations(0)
        this.title(true)
      }
    },

    ResetAmrapData()
    {
      if(this.Rest)
      {
        this.amrapData.time = 0
        this.amrapData.amounts = null
        this.amrapData.titles = null
        this.amrapData.videos = null
        this.amrapData.amraps = []
        this.amrapData.diff = []
        this.amrapData.currentIndices = []
        this.amrapData.nextExercise = 0
        this.amrapData.hasRest = false
        this.amrapPlayed = false
        this.roundSkipped = false
        this.Rest = false
        this.RestPlayed = false
      }
    },

    // Next Exercise By Click
    NextExercise(siren, amrap)
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
      if(this.workout.exercises == this.exerciseData[this.workout.round].length - 1 && this.workout.round + 1 !== this.roundData.length && this.amrapActive !== "True")
      {
        this.roundSkipped = false;
        this.popup = true;
        clearInterval(timer)
        this.workout.round = this.workout.round + 1;
        this.workout.exercises = 0
        this.min = parseInt(this.defaultDiffs);
        this.$refs.play.classList.toggle("pause")
        console.log('First Condition')
        this.title(true)
        this.voiceHasPlayed = false
        this.sirenActive = false
        //this.min = parseInt(this.workout.startDifficulty[this.workout.exercises]) - 1
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
      }
      // Finished Change
      else if(this.workout.exercises + 1 == this.exerciseData[this.workout.round].length && this.workout.round + 1 == this.roundData.length)
      {
        this.popup = true;
        this.completed = true;
        //this.min = parseInt(this.workout.startDifficulty[this.workout.exercises]) - 1
        clearInterval(timer)
        //this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 0)
        this.title(false)
        //console.log('Main Condition')
      }
      else if(this.amrapActive == "True" && this.workout.round + 1 == this.roundData.length) {
        this.popup = true;
        this.completed = true;
        this.Rest = false;
        //this.min = parseInt(this.workout.startDifficulty[this.workout.exercises]) - 1
        clearInterval(timer)
        //this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 0)
        this.title(false)
        //console.log('Amrap Finish Condition')
      }
      else if (this.amrapActive == "True" && this.amrapData.hasRest == true)
      {
        this.Rest = true;
        clearInterval(timer)
        //this.min = parseInt(this.workout.startDifficulty[this.workout.exercises]) - 1
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, -1, this.$refs.siren)
        //console.log('Rest Condition')
        // Calling Custom Animations
        //this.CustomAnimations(1)
        this.title(true)
      }
      else {
        // Exercise Change
        this.popup = false;
        if(this.exerciseType !== "Reps")
        {
          clearInterval(timer)
        }
        //clearInterval(timer)
        //this.min = parseInt(this.workout.startDifficulty[this.workout.exercises]) - 1
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 1, this.$refs.siren)
        //console.log('Final Condition')
        // Calling Custom Animations
        //this.CustomAnimations(1)
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

      //this.CustomAnimations(2)

      if(input == 0)
      {
        this.min = this.min - 1;
        
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

        this.min = this.min + 1;

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

    // Amrap Exercise Difficulty Change
    ChangeAmrapDifficulty(input, video, index, number) {
      this.loadedExercise = true
        video.pause();
        this.$refs.play.classList.toggle("pause");
        this.$refs.time.classList.add("pausetime");
        if(this.type == "Time")
        { 
        this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren);
        }

      //this.CustomAnimations(2)

      if(input == 0)
      {
        this.amrapData.currentIndices[number] = this.amrapData.currentIndices[number] - 1;
        const newDiff = this.amrapData.currentIndices[number]
        index[number].innerHTML = newDiff;
        
        video.src = this.exerciseData[this.workout.round][srcIndex].Video[newDiff].url
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
        this.amrapData.currentIndices[number] = this.amrapData.currentIndices[number] + 1;
        const newDiff = this.amrapData.currentIndices[number]
        index[number].innerHTML = newDiff;
        
        video.src = this.exerciseData[this.workout.round][srcIndex].Video[this.amrapData.diff[srcIndex][newDiff]].url
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

    // Amrap Exercise Video Check
    AmrapVideo(video)
    {
      let videoLoop;
      if(this.amrapActive == 'True' && this.amrapPlayed !== true)
      {
        this.AmrapDiffs()
        this.amrapRest()
        this.amrapPlayed = true;
        srcIndex = 0;
        trackerTime = 0;
        const index =  this.amrapData.currentIndices[srcIndex]
        video.src = this.exerciseData[this.workout.round][srcIndex].Video[this.amrapData.diff[srcIndex][index]].url
        /*this.roundData[this.workout.round].Exercise_Title_Linked_Exercises.forEach((value, index) => {
          if(value.includes('Rest'))
          {
            this.amrapData.nextExercise = index
            this.amrapData.hasRest = true
            console.log('Value: ', index)
          }
          else {
            this.amrapData.amraps.push(value)
          }
        });*/
       // console.log('New Data: ', this.amrapData.amraps)
        videoLoop = setInterval(() => {
        if(this.amrapActive == 'True')
        {
        if(!video.paused)
          {       
          if (trackerTime === 5) 
          {
            changeVideo = true;
            if(changeVideo == true)
            {
              //this.VideoLoopAnimation()
              srcIndex++;
              if (srcIndex < this.amrapData.amraps.length) {
                const index = this.amrapData.currentIndices[srcIndex]
                video.src = this.exerciseData[this.workout.round][srcIndex].Video[this.amrapData.diff[srcIndex][index]].url;
    
                let playPromise = video.play();
    
                if (playPromise !== undefined) {
                  playPromise.then(_ => {
                    video.play();
                  })
                  .catch(error => {
                    console.log = function() {} 
                  });
                }
              }
              else if (srcIndex >= this.amrapData.amraps.length)
              {
                srcIndex = 0;
                const index = parseInt(this.$refs.min[srcIndex].innerHTML)
                video.src = this.exerciseData[this.workout.round][srcIndex].Video[this.amrapData.diff[srcIndex][index]].url;    
                let playPromise = video.play();
    
                if (playPromise !== undefined) {
                  playPromise.then(_ => {
                    video.play();
                  })
                  .catch(error => {
                    console.log = function() {} 
                  });
                }
              }
              trackerTime = 0
            } 
          }
          else {
            trackerTime = trackerTime + 1
          }
          }
        else if (video.paused) {
          trackerTime = trackerTime;
        }
        }
        else {
          this.amrapPlayed = false;
          clearInterval(videoLoop)
        }
        }, 1000);
      }
    else {
      clearInterval(videoLoop)
    }
    },

    // Amrap Exercise Difficulty Values Created
    AmrapDiffs()
    {
      // Converts String Number to Integer
      // &&
      // Creates Starting Indices For AmrapDiffs
      this.exerciseData[this.workout.round].forEach((item, index) => {
        let convertedNumbers = []
        let startIndex = parseInt(this.workout.startDifficulty[index]) - 1
        item.Diff_Level.forEach((diff) => {
          let stringNumber = parseInt(diff) - 1
          convertedNumbers.push(stringNumber)
        });
        this.amrapData.diff.push(convertedNumbers);
        this.amrapData.currentIndices.push(startIndex);
      });
    }
  },
  created()
  {
    // Intial Data Request Called
    //this.intialRequest()
  },
  mounted() {
    let params = new URL(document.location).searchParams;
    let round = parseInt(params.get("round"));
    setTimeout(() => {
      this.intialRequest()
    }, 2000);
  
    if(window.location.href.includes("round"))
    {
      this.roundSkipped = true;
      this.workout.round = round
    }
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
  watch: {
    completed(newVal) {
      if (newVal === true) {
        // Perform actions when completed status becomes true
        Wized.data.setVariable("complete", "completed");
      }
    }
  }
}).mount('#app')

// Wized.data.setVariable("complete", "completed");
