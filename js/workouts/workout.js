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
    }
  },
  computed: {
    // a computed getter
    exerciseTitle() {
      return this.exerciseData[this.workout.round][this.workout.exercises].Exercise_Category[0]
    },
    exerciseType() {
      return this.roundData[this.workout.round].Rep_Type_Linked_Exercises[this.workout.exercises]
    },
    exerciseAmount() {
      return this.workout.counter = parseInt(this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises])
    },
    amrapActive() {
      return this.roundData[this.workout.round].Amrap_Linked_Exercises[this.workout.exercises]
    },
    amrapAmounts() {
      return this.roundData[this.workout.round].Amrap_Exercise_Amount_Linked_Exercises
    },
    exerciseVideo() {
      return this.exerciseData[this.workout.round][this.workout.exercises].Video[this.min].url
    },
    exerciseVoice() {
      return this.roundData[this.workout.round].Audio_Source_Linked_Exercises[this.workout.exercises].url
    },
    exerciseMax() {
      return this.exerciseData[this.workout.round][this.workout.exercises].Video.length
    },
    exerciseMin() {
      return this.min
    },
    exerciseDiffs() {
      return this.amrapData.currentIndices
    },
    exerciseNext() {
      return this.amrapData.nextExercise
    }
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

        this.isAmrap = this.roundData[this.workout.round].Amrap_Linked_Exercises[this.workout.exercises]

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
        console.log("Exercise DATA", response);
        this.workout.counter = parseInt(this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises])
        /*response.data.forEach((e, ei) => {
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
        })*/
        this.roundData.forEach((r, ri) => {
          r.Diff_ID_Linked_Exercises.forEach((id, index) => {
            response.data.forEach((e, ei) => {
              if(e.ID.includes(id))
              {
                this.exerciseData[ri].push(e);
              }
            });
          });
        });

        /*this.exerciseData.forEach((e, ei) => {
          e.forEach((id, index) => {
            if(this.roundData[ei].Diff_ID_Linked_Exercises.indexOf(id.ID))
            {
              const newIndex = this.roundData[ei].Diff_ID_Linked_Exercises.indexOf(id.ID)
              this.exerciseData[ei][newIndex] = id;
            }
            //exerciseData[ei][newIndex] = id;
            console.log('ID:', this.roundData[ei].Diff_ID_Linked_Exercises.indexOf(id.ID))
          });
        });*/

        /*this.roundData.forEach((e, ei) => {
          e.Diff_ID_Linked_Exercises.forEach((id, index) => {
            if(this.exerciseData[ei][index].ID.includes(id))
            {
              tempData.push([this.exerciseData[ei][index]])
              console.log('Found ID Exercises:', e.Diff_ID_Linked_Exercises.indexOf(this.exerciseData[ei][index].ID))
              console.log('Found ID Round:', index);
              console.log('ID:', id)
              console.log('DATA:', tempData)
            }
            //exerciseData[ei][newIndex] = id;
            //console.log('ID:', this.exerciseData[ei][index].ID.includes(id))
          });
        });*/


        // Stagger Loading assets
        //setTimeout(() => {
        //this.StatusCode200 = true;
        //this.loadedExercise = false;
        //this.title(true)
        //}, 4000);

        console.log("Exercise Data", this.exerciseData)

        this.StatusCode200 = true;
        this.loadedExercise = false;
        this.title(true)
        let params = new URL(document.location).searchParams;
        let round = parseInt(params.get("round"));
    
        if(window.location.href.includes("round"))
        {
          this.workout.round = round
        }
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
    ChangeExercise(play, video, voice, input)
    {
      this.loadedExercise = true;
      if(input == 1)
      {
        // Change Exercises Number
        this.workout.exercises = this.workout.exercises + 1;
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        if(this.type == "Time")
        {
        this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren);
        }
      }
      else if (input == 0)
      {
        // Change Exercises Number
        this.workout.exercises = this.workout.exercises - 1;
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        if(this.type == "Time")
        {
        this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren);
        }
      }
      else if (input == 3)
      {
        // Change Exercises Number
        this.workout.exercises = this.workout.exercises - 1;
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        if(this.type == "Time")
        {
        this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren);
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

    Timer(time, video, siren)
    {
      if(this.type == "Time")
      { 
        if (!time.classList.contains("pausetime"))
        {
          timer = setInterval(() => {
            let percentage = this.workout.counter / 100 * 100;
            // Progress Wheel Value
            this.setProgress(percentage);
            this.workout.counter--;
            this.TimerConversion(this.workout.counter, time);

            // Condtion To Check If Finished
            if (this.workout.counter == 0) {
              siren.play();
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
    },

    // Play Exercise By Click
    PlayExercise(time, play, video, voice)
    {
      this.popup = false;
      this.AmrapVideo(this.$refs.video)
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
        if(this.type == "Time")
        {
        this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren);
        }
      } else {
        video.pause();
        play.classList.toggle("pause");
        time.classList.add("pausetime");
        if(this.type == "Time")
        {
        this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren);
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
        this.min = 0
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 2)
        this.CustomAnimations(0)
        this.title(true)
      }
      // Round Start
      else if(this.workout.exercises - 1 == 0)
      {
        this.popup = true;
        this.min = 0
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        this.$refs.play.classList.toggle("pause")
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 3)
        this.CustomAnimations(0)
        this.title(true)
        this.voiceHasPlayed = false
      }
      else {
        // Exercise Change
        this.min = 0
        this.popup = false;
        clearInterval(timer)
        this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 0)
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        console.log('Final Condition')
        // Calling Custom Animations
        this.CustomAnimations(0)
        this.title(true)
      }
    },

    // Next Exercise By Click
    NextExercise()
    {
      // Round Change
      if(this.workout.exercises == this.exerciseData[this.workout.round].length - 1 && this.workout.round + 1 !== this.roundData.length && this.amrapActive !== "True")
      {
        this.popup = true;
        clearInterval(timer)
        this.workout.round = this.workout.round + 1;
        this.workout.exercises = 0
        this.$refs.play.classList.toggle("pause")
        console.log('First Condition')
        this.title(true)
        this.voiceHasPlayed = false
        this.min = 0
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
      }
      // Finished Change
      else if(this.workout.exercises + 1 == this.exerciseData[this.workout.round].length && this.workout.round + 1 == this.roundData.length)
      {
        this.popup = true;
        this.completed = true;
        this.min = 0
        clearInterval(timer)
        //this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 0)
        this.title(false)
        console.log('Main Condition')
      }
      else if(this.amrapActive == "True" && this.workout.round + 1 == this.roundData.length) {
        this.popup = true;
        this.completed = true;
        this.min = 0
        clearInterval(timer)
        //this.ChangeExercise(this.$refs.play, this.$refs.video, this.$refs.voice, 0)
        this.title(false)
        console.log('Amrap Finish Condition')
      }
      else if(this.amrapActive == "True" && this.workout.round + 1 !== this.roundData.length)
      {
        this.popup = true;
        clearInterval(timer)
        this.workout.round = this.workout.round + 1;
        this.workout.exercises = 0
        this.min = 0
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
        this.$refs.play.classList.toggle("pause")
        console.log('Armap Condition')
        this.title(true)
        this.voiceHasPlayed = false
      }
      else if (this.amrapActive == "False") {
        // Exercise Change
        this.popup = false;
        if(timer !== 'undefined')
        {
        clearInterval(timer)
        }
        this.min = 0
        this.workout.counter = this.roundData[this.workout.round].Amounts_Name_Linked_Exercises[this.workout.exercises]
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

    ChangeDifficulty(input, video) {
      this.loadedExercise = true
        video.pause();
        this.$refs.play.classList.toggle("pause");
        this.$refs.time.classList.add("pausetime");
        if(this.type == "Time")
        { 
        this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren);
        }

      this.CustomAnimations(2)

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

    ChangeAmrapDifficulty(input, video, index, number) {
      this.loadedExercise = true
        video.pause();
        this.$refs.play.classList.toggle("pause");
        this.$refs.time.classList.add("pausetime");
        if(this.type == "Time")
        { 
        this.Timer(this.$refs.time, this.$refs.video, this.$refs.siren);
        }

      this.CustomAnimations(2)

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
    AmrapVideo(video)
    {
      let videoLoop;
      if(this.amrapActive == 'True' && this.amrapPlayed !== true)
      {
        this.AmrapDiffs()
        this.amrapPlayed = true;
        srcIndex = 0;
        trackerTime = 0;
        const index =  this.amrapData.currentIndices[srcIndex]
        video.src = this.exerciseData[this.workout.round][srcIndex].Video[this.amrapData.diff[srcIndex][index]].url
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
        console.log('New Data: ', this.amrapData.amraps)
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
              this.VideoLoopAnimation()
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
    AmrapDiffs()
    {
      // Converts String Number to Integer
      // &&
      // Creates Starting Indices For AmrapDiffs
      this.exerciseData[this.workout.round].forEach((item, index) => {
        let convertedNumbers = []
        let startIndex = 0
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
  updated() {
    this.type = this.roundData[this.workout.round].Rep_Type_Linked_Exercises[this.workout.exercises]
    if(this.completed == true)
    {
      Wized.data.setVariable("complete", "completed");
    }
  },
}).mount('#app')

// Wized.data.setVariable("complete", "completed");
