anime({
    targets: '.path3',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'cubicBezier(.5, .05, .1, .3)',
    duration: 2000,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  });
Wized.request.await("Load Users Program Hub", (response) => {
  const currentUser = response.data;
  let currentWeek;
  let programDone;
  if(currentUser.User_Week_Tracker > currentUser.Count_weeks[0])
  {
    //currentWeek = currentUser.Count_weeks[0]
    currentWeek = currentUser.Program_Week_Tracker
  }
  else {
    //currentWeek = currentUser.User_Week_Tracker
    currentWeek = currentUser.Program_Week_Tracker
  }
  if(currentUser.Program_Tracker_Percentage == '100%')
  {
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
          // Console.log Request
          //console.log("Program Request:", currentProgram);
          const CompletedAmount = [];
          let nextWorkoutStatic = false;
          let nextWorkoutIDStatic = null;
          currentProgram.forEach((WeekEl, index) => {
                  CompletedAmount.push({Week: WeekEl.Week, WorkoutName: WeekEl.Workout_Names, WorkoutID: WeekEl.Workouts, AmountCompleted: 0});
          });
          if("Completed_Workout_Week" in currentUser)
          {
              CompletedAmount.forEach((total, index) => {
                  if(currentUser.Completed_Workout_ID.some((id) => CompletedAmount[index].WorkoutID.includes(id)) && currentUser.Completed_Workout_Week.some((item) => CompletedAmount[index].Week.includes(item)))
                  {
                      CompletedAmount[index].AmountCompleted = CompletedAmount[index].AmountCompleted + 1;
                  }
                  else
                  {
                      CompletedAmount[index].WorkoutID.forEach((workout, id) => {
                          if(currentUser.Completed_Workout_ID.some((item) => item !== workout))
                          {
                              if(nextWorkoutStatic == false)
                              {
                                  nextWorkoutStatic = true;
                                  nextWorkoutIDStatic = workout;
                              }
                              else {
                                  return false;
                              }
                          }
                      });
                  }
              });
          }
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
          CompletedWorkouts: null,
          nextWorkout: false,
          nextWorkoutID: null,
          programPop: programDone,
          }
      },
      created() {
          const programLoader = document.getElementById("programLoading");
          programLoader.classList.add("hide_program_loader")
          this.CompletedWorkouts = CompletedAmount;
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
          if("Completed_Workout_Week" in currentUser)
          {
          // Progress Wheel
          const workoutEl = document.querySelectorAll(".workouts");
          let progressNum = this.User.Completed_Workouts.length / workoutEl.length * 100;
          const circleProgress = new CircleProgress(".circle-latest");
          circleProgress.attr({
          max: 100,
          value: progressNum,
          textFormat: "percent",
          indeterminateText: 0,
          });
          setTimeout(() => {document.querySelector('.loading-state-v2').style.display = "none"}, 3000);
          }
      },
      }).mount('#app')
      // End Vue Intializer
      });
  });
});