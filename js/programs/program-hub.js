const { createApp } = Vue;

createApp({
  data() {
    return {
      User: {
        SessionAmount: 0,
        CompletedAmount: 0,
        CurrentWeek: 0,
        NextWorkout: "",
        Completed: [],
        CompletedRecoveries: [],
        Program: {
          RecomendedProgram: "",
          ID: 0,
          Weeks: [],
          Image: "",
        },
        Recoveries: [],
      },
      Loaded: false,
      programPop: false,
      finishedProgram: null,
    };
  },
  methods: {
    async loadUser() {
      await Wized.request.execute('Load Users Program Hub');
      const response = await Wized.data.get('r.72.d');
      const {Q7, Program_Week_Tracker, Add_Program, Completed_Workouts_ID_Program, Completed_Workout_Week, Completed_Workout_ID, Completed_Recovery_Record_ID} = response;

      const sessionAmount = parseInt(Q7)

      let programIDs = [...Completed_Workouts_ID_Program];
      let weeks = [...Completed_Workout_Week];
      let workoutIDs = [...Completed_Workout_ID];

      for (let i = programIDs.length - 1; i >= 0; i--) {
        if (Add_Program.indexOf(programIDs[i]) === -1) {
          programIDs.splice(i, 1);
          weeks.splice(i, 1);
          workoutIDs.splice(i, 1);
        }
      }

      let completed = [];
      programIDs.forEach((id, index) => {
        completed.push({id: id, week: weeks[index], workout: workoutIDs[index]});
      });

      this.User.SessionAmount = parseInt(sessionAmount);
      this.User.Completed = completed
      this.User.CompletedRecoveries = Completed_Recovery_Record_ID;
      this.User.CurrentWeek = parseInt(Program_Week_Tracker);
      this.loadProgram();
    },
    async loadProgram() {
      await Wized.request.execute('Load Program');
      const response = await Wized.data.get('r.1.d');
      const {Recommend_Program_ID, ID, Image} = response;
      this.Program = response;
      this.User.Program.RecomendedProgram = Recommend_Program_ID
      this.User.Program.ID = ID;
      this.User.Program.Image = Image[0].url;

      this.loadWeeks();
    },
    async loadWeeks() {
      await Wized.request.execute('Load weeks - HUB');
      const response = await Wized.data.get('r.16.d');
      const Weeks = response;
      let weeksRaw = Weeks.map(week => {
        const { Week, Workouts, Workout_Names, Image, Time, Type } = week;
        // Only loop the amount of this.User.SessionAmount
        const sessionAmount = this.User.SessionAmount;
        const workouts = Workouts.slice(0, sessionAmount).map((workout, index) => ({
          ID: workout,
          Image: Image[index].url,
          Name: Workout_Names[index],
          Time: Time[index],
          Type: Type[index],
          Completed: false
        }));
        return {
          Week: Week,
          Workouts: workouts,
          CompletedAmount: 0,
        };
      });
      
      this.User.Program.Weeks = weeksRaw;
      this.checkForCompleted()
      this.loadRecoveries();
      return this.User;
      
    },
    async loadRecoveries() {
      await Wized.request.execute('Load Recoveries');
      const response = await Wized.data.get('r.136.d');
      const recoveries = response;
      let recoveriesRaw = recoveries.map(recovery => {
        const { ID, Name, Image, Time, Type } = recovery;
        return {
          ID: ID,
          Image: Image[0].url, // assuming you want the first image URL
          Name: Name,
          Time: Time,
          Type: Type,
          Completed: false
        };
      });
      this.User.Recoveries = recoveriesRaw;
      this.checkRecoveries();
      return this.User;
    },    
    checkForCompleted() {
      const completedWorkouts = this.User.Completed;
      const programWeeks = this.User.Program.Weeks;
      const programID = this.User.Program.ID;
      let completedTotalAmount = 0;
      let nextWorkoutSet = false;

      // Loop through each week in the program
      programWeeks.forEach((week, weekIndex) => {
        const { Week, Workouts } = week;

        // Loop through each workout in the week
        Workouts.forEach(workout => {
          const { ID } = workout;

          // Check if there's a matching completed workout
          const completed = completedWorkouts.find(completedWorkout =>
            completedWorkout.id === programID && completedWorkout.week === Week && completedWorkout.workout === ID
          );

          // If a match is found, mark the workout as completed
          if (completed) {
            workout.Completed = true;
            week.CompletedAmount += 1;
            completedTotalAmount += 1;
          }
          else if (!nextWorkoutSet) {
            nextWorkoutSet = true;
            this.User.NextWorkout = ID;
          }
        });
      });

      this.User.Program.Weeks = programWeeks;

      this.User.CompletedAmount = completedTotalAmount;

      return this.User.Program.Weeks
    },
    checkRecoveries() {
      const completedRecoveries = this.User.CompletedRecoveries;
      const recoveries = this.User.Recoveries;
      recoveries.forEach(recovery => {
        // Check if there's a matching completed recovery
        const completed = completedRecoveries.find(completedRecovery =>
          completedRecovery === recovery.ID
        );
        // If a match is found, mark the workout as completed
        if (completed) {
          recovery.Completed = true;
        }
      });

      this.User.Recoveries = recoveries;

      return this.User;
    },
    ProgressWheel() {
      const workoutEl = document.querySelectorAll(".workouts");
      let progressNum = this.User.CompletedAmount / workoutEl.length * 100;
          const circleProgress = new CircleProgress(".circle-latest");
          circleProgress.attr({
          max: 100,
          value: progressNum,
          textFormat: "percent",
          indeterminateText: 0,
      });
    },
    popupOff() {
      this.programPop = !this.programPop;
    },
    async completeProgram(e, option) {
      this.Loaded = false;
      e.currentTarget.textContent = "Loading...";

      if (option === "questionnare") {
        await Wized.request.execute('Complete Program');
        setTimeout(() => {
          window.location.href = "/questionnaire-update";
        }, 3000);
      } else if (option === 'recommended') {
        await Wized.request.execute('Complete Program Recommended');
        setTimeout(() => {
          window.location.href = "/program-hub";
        }, 3000);
      }
    },
    async addProgram(e, option) {
      this.Loaded = false;
      e.currentTarget.textContent = "Loading...";

      if (option === "questionnare") {
        setTimeout(() => {
          window.location.href = "/questionnaire-update";
        }, 3000);
      } else if (option === 'recommended') {
        await Wized.request.execute('Add New Program');
        setTimeout(() => {
          window.location.href = "/program-hub";
        }, 3000);
      }
    },
    async getCompletedPrograms() {
      await Wized.request.execute('Read Completed Programs');
      const response = await Wized.data.get('r.182.d');
      const data = response;

      data.forEach((data) => {
        this.finishedProgram = data.Completed_Record_ID === this.User.Program.ID;
      });
    },
    animeSetup() {
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
    },
    appSetup() {
      this.animeSetup();
      setTimeout(() => {
        this.ProgressWheel();
        console.log("interaction loaded");
        window.Webflow && window.Webflow.destroy();
        window.Webflow && window.Webflow.ready();
        window.Webflow && window.Webflow.require("ix2").init();
        document.dispatchEvent(new Event("readystatechange"));
        this.Loaded = true;
        if(this.Loaded) {
          document.body.style.overflow = "visible";
        }
        sal({
          threshold: 0.5,
          once: false,
        });
      }, 10000)
    }
  },
  created() {
    this.loadUser();
  },
  mounted() {
    if(!this.Loaded)
    {
      document.body.style.overflow = "hidden";
    }
    this.appSetup();
  },
}).mount('#app');

