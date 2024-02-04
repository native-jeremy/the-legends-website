// Animation using Anime.js
const animatePath = () => {
  anime({
    targets: ".path3",
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: "cubicBezier(.5, .05, .1, .3)",
    duration: 2000,
    delay: (el, i) => i * 250,
    direction: "alternate",
    loop: true,
  });
};

// Load program data
const loadProgramData = () => {
  return new Promise((resolve) => {
    Wized.request.await("Load Program", (response) => {
      resolve(response.data);
    });
  });
};

// Load weeks data
const loadWeeksData = () => {
  return new Promise((resolve) => {
    Wized.request.await("Load weeks - HUB", (response) => {
      resolve(response.data);
    });
  });
};

// Process completed workouts
const processCompletedWorkouts = (currentUser, CompletedAmount) => {
  if ("Completed_Workout_Week" in currentUser) {
    CompletedAmount.forEach((week, index) => {
      const completedIcon = document.querySelectorAll(".weeks")[index].querySelectorAll(".completed-icon");

      week.WorkoutID.forEach((workout, id) => {
        if (completedIcon[id].classList.contains("completed")) {
          CompletedAmount[index].AmountCompleted++;
        }
      });
    });
  }
};

// Vue Initializer
const initializeVue = (currentUser, currentProgram, CompletedAmount) => {
  const { createApp } = Vue;
  createApp({
    data() {
      return {
        User: currentUser,
        Program: currentProgram,
        ProgramImage: currentUser.Program_Image,
        SessionAmount: currentUser.Q7[0],
        UserWeek: currentUser.User_Week_Tracker > currentUser.Count_weeks[0] ? currentUser.Count_weeks[0] : currentUser.Program_Week_Tracker,
        CurrentProgram: currentProgram,
        Recoveries: null,
        CompletedWorkouts: CompletedAmount,
        nextWorkout: false,
        nextWorkoutID: null,
        programPop: currentUser.Program_Tracker_Percentage === "100%",
        completed: 0,
      };
    },
    created() {

      const getData = async () => {
        let data = await Wized.data.get("v.response");
        this.Recoveries = data;
        return data;
      };

      getData().then((data) => console.log('Loaded'));

      Wized.request.await("Load Recoveries", (response) => {
        this.Recoveries = response.data;
      });
    },
    mounted() {
      const programLoader = document.getElementById("programLoading");
      programLoader.classList.add("hide_program_loader");
      console.log("interaction loaded");
      window.Webflow && window.Webflow.destroy();
      window.Webflow && window.Webflow.ready();
      window.Webflow && window.Webflow.require("ix2").init();
      document.dispatchEvent(new Event("readystatechange"));
      sal({ threshold: 0.5, once: false });

      const completedCheck = document.querySelectorAll(".completed-icon");
      completedCheck.forEach((week, index) => {
        if (week.classList.contains("completed")) {
          this.completed = this.completed + 1;
        }
      });

      document.querySelector('.loading-state-v2').style.display = "none";

      // Progress Wheel
      if ("Completed_Workout_Week" in currentUser) {
        const workoutEl = document.querySelectorAll(".workouts");
        let progressNum = this.completed / workoutEl.length * 100;
        const circleProgress = new CircleProgress(".circle-latest");
        circleProgress.attr({
          max: 100,
          value: progressNum,
          textFormat: "percent",
          indeterminateText: 0,
        });

        processCompletedWorkouts(currentUser, CompletedAmount);
      }
    },
  }).mount('#app');
};

// Main execution
animatePath();

Wized.request.await("Load Users Program Hub", (response) => {
  const currentUser = response.data;

  loadProgramData().then((programResponse) => {
    const program = programResponse;

    loadWeeksData().then((weeksResponse) => {
      const currentProgram = weeksResponse;

      const CompletedAmount = currentProgram.map((WeekEl) => ({
        Week: WeekEl.Week,
        WorkoutName: WeekEl.Workout_Names,
        WorkoutID: WeekEl.Workouts,
        ProgramID: WeekEl.Program_ID[0],
        AmountCompleted: 0,
      }));

      initializeVue(currentUser, currentProgram, CompletedAmount);
    });
  });
});
