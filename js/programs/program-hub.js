anime({
  targets: ".path3",
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: "cubicBezier(.5, .05, .1, .3)",
  duration: 2000,
  delay: function (el, i) {
    return i * 250;
  },
  direction: "alternate",
  loop: true,
});
Wized.request.await("Load Users Program Hub", (response) => {
  const currentUser = response.data;
  let currentWeek;
  let programDone;
  if (currentUser.User_Week_Tracker > currentUser.Count_weeks[0]) {
    //currentWeek = currentUser.Count_weeks[0]
    currentWeek = currentUser.Program_Week_Tracker;
  } else {
    //currentWeek = currentUser.User_Week_Tracker
    currentWeek = currentUser.Program_Week_Tracker;
  }
  if (currentUser.Program_Tracker_Percentage == "100%") {
    programDone = true;
  }
  // Console.log Request
  //console.log("User Request:", currentUser);
  Wized.request.await("Load Program", (response) => {
    const program = response.data;
    // Console.log Request
    //console.log("Current Program Request:", program);
    Wized.request.await("Load weeks - HUB", (response) => {
      const currentProgram = response.data;
      let programs = [];
      let workouts = [];
      let weeks = [];
      let workoutsCompleted = [];
      let nonPrograms

      currentProgram.forEach((w, index) => {
      if('Completed_Workouts_ID_Program' in currentUser)
      {
        workoutsCompleted.push(
          {
            programs: currentUser.Completed_Workouts_ID_Program[index], 
            workouts: currentUser.Completed_Workouts[index],
            weeks: currentUser.Completed_Workout_Week[index]
        });
      }
      else {
        workoutsCompleted.push(
          {
            programs: false, 
            workouts: false,
            weeks: false
        });
      }
      });

      //console.log("Current Completed:", workoutsCompleted);


      // New Code 12/02/2024 - Fixing the progress on program hub
      function checkProgress ()
      {
        if("Completed_Workout_Week" in currentUser)
        {
        let programData = []
        let completedData = []

        // Program Data loop
        currentProgram.forEach((w, index) => {
          programData.push({
            programName: program.Title,
            programID: program.ID,
            programWeek: currentProgram[index].Week,
            programWorkouts: currentProgram[index].Workouts,
            completeIndices: Array(currentProgram[index].Workouts.length).fill(false),
            completedCount: 0
          });
        });
        //console.log("ProgramData:", programData);

        // User Completed Data loop
        currentUser.Completed_Workouts.forEach((w, index) => {
          completedData.push({
            programName: currentUser.Completed_Workouts_Title_Program[index],
            programID: currentUser.Completed_Workouts_ID_Program[index],
            programWeek: currentUser.Completed_Workout_Week[index],
            programWorkout: currentUser.Completed_Workout_ID[index]
          });
        });
        //console.log("CompletedData:", completedData);

        programData.forEach((w, index) => {
          completedData.forEach((wc, ii) => {
            if(w.programName == wc.programName)
            {
              if(w.programID == wc.programID)
              {
                if(w.programWeek == wc.programWeek)
                {
                  if(w.programWorkouts.includes(wc.programWorkout))
                  {
                    //console.log("It has this workout", "Week:", w.programWeek, "Program Workout:", w.programWorkouts.indexOf(wc.programWorkout), "Completed Workout:", wc.programWorkout);
                     // Find index of wc.programWorkout in w.completeIndices
                    const workoutIndex = w.programWorkouts.indexOf(wc.programWorkout);
                    // Set the value at workoutIndex to true
                    w.completeIndices[workoutIndex] = true;
                    w.completedCount += 1;
                  }
                }
              }
            }
          });
        });
        
        return programData;
        }
        else {
            this.startedNone = true;
            return false;
        }
      }
      

      // Console.log Request
      //console.log("Program Request:", currentProgram);
      const CompletedAmount = [];
      let nextWorkoutStatic = false;
      let nextWorkoutIDStatic = null;
      currentProgram.forEach((WeekEl, index) => {
        CompletedAmount.push({
          Week: WeekEl.Week,
          WorkoutName: WeekEl.Workout_Names,
          WorkoutID: WeekEl.Workouts,
          ProgramID: WeekEl.Program_ID[0],
          AmountCompleted: 0,
        });
      });

      let completedWorkouts = checkProgress();

      // Start Vue Intializer
      const { createApp } = Vue
      createApp({
      data() {
          return {
          User: currentUser,
          Program: currentProgram,
          ProgramImage: currentUser.Program_Image,
          SessionAmount: currentUser.Q7[0],
          UserWeek: currentWeek,
          CurrentProgram: program,
          Recoveries: null,
          CompletedWorkouts: completedWorkouts,
          nextWorkout: false,
          nextWorkoutID: null,
          programPop: programDone,
          completed: 0,
          startedNone: false,
          }
      },
      created() {
          const programLoader = document.getElementById("programLoading");
          programLoader.classList.add("hide_program_loader")
          //this.CompletedWorkouts = CompletedAmount;
          this.nextWorkout = nextWorkoutStatic;
          this.nextWorkoutID = nextWorkoutIDStatic;
          const getData = async () => {
              let data = await Wized.data.get("v.response");
              this.Recoveries = data;
              return data;
          }
          getData().then(data => console.log('Loaded'));
          /*Wized.request.await("Load Recoveries", (response) => {    
              this.Recoveries = response.data
          });*/
      },
      mounted() {
        // console.log('Recoveries', this.Recoveries)
          console.log("interaction loaded");
          window.Webflow && window.Webflow.destroy();
          window.Webflow && window.Webflow.ready();
          window.Webflow && window.Webflow.require("ix2").init();
          document.dispatchEvent(new Event("readystatechange"));
          //console.log("Completed Array", this.CompletedWorkouts)
          //console.log("Next Workout", this.nextWorkoutID)
          //console.log("Progress", this.ProgramCompleted)
          sal({
            threshold: 0.5,
            once: false,
          });
          const completedCheck = document.querySelectorAll(".completed-icon");
          completedCheck.forEach((week, index) => {
                if(week.classList.contains("completed"))
                {
                    this.completed = this.completed + 1;
                }
            })
          document.querySelector('.loading-state-v2').style.display = "none"
          if("Completed_Workout_Week" in currentUser)
          {
          // Progress Wheel
          const workoutEl = document.querySelectorAll(".workouts");
          let progressNum = this.completed / workoutEl.length * 100;
          const circleProgress = new CircleProgress(".circle-latest");
          circleProgress.attr({
          max: 100,
          value: progressNum,
          textFormat: "percent",
          indeterminateText: 0,
          });
          
          CompletedAmount.forEach((week, index) => {
            const weeks = document.querySelectorAll(".weeks");
            const completedIcon = weeks[index].querySelectorAll(".completed-icon");
            week.WorkoutID.forEach((workout, id) => {
                if(completedIcon[id].classList.contains("completed"))
                {
                    CompletedAmount[index].AmountCompleted++;
                }
            })
          });
          //setTimeout(() => {document.querySelector('.loading-state-v2').style.display = "none"}, 3000);
          }
      },
      }).mount('#app')
      // End Vue Intializer
    });
  });
});
