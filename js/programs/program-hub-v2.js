// 14/01/2024 - Code updates v1.1
// Start Vue Intializer
const { createApp } = Vue;
createApp({
  data() {
    return {
      User: [],
      Program: null,
      ProgramImage: null,
      SessionAmount: null,
      UserWeek: null,
      CurrentProgram: null,
      Recoveries: null,
      CompletedWorkouts: null,
      nextWorkout: false,
      nextWorkoutID: null,
      programPop: null,
      completed: null,
    };
  },
  computed: {
    ProgramData() {
    return this.Program;
    }
  },
  methods: {
    // Fetch Wized Data
    async fetchData()
    {
      // Load User
      Wized.request.await("Load Users Program Hub", (response) => {
        const currentUser = response.data;
        console.log("Current User Request:", currentUser);
        let currentWeek;
        let programDone;
        if (currentUser.User_Week_Tracker > currentUser.Count_weeks[0]) {
          currentWeek = currentUser.Count_weeks[0]
          currentWeek = currentUser.Program_Week_Tracker;
        } else {
          currentWeek = currentUser.User_Week_Tracker
          currentWeek = currentUser.Program_Week_Tracker;
        }
        if (currentUser.Program_Tracker_Percentage == "100%") {
          programDone = true;
        }
      });
      
      // Load Program
      Wized.request.await("Load Program", (response) => {
        const program = response.data;
        this.Program = program

        // Console.log Request
        console.log("Current Program Request:", program);
      });

      // Load Weeks
      Wized.request.await("Load weeks - HUB", (response) => {
        const currentWeeks = response.data;
        // Console.log Request
        console.log("Weeks Request:", currentWeeks);
        const CompletedAmount = [];
        let nextWorkoutStatic = false;
        let nextWorkoutIDStatic = null;

        // Looping through Weeks
        /*currentProgram.forEach((WeekEl, index) => {
          CompletedAmount.push({
            Week: WeekEl.Week,
            WorkoutName: WeekEl.Workout_Names,
            WorkoutID: WeekEl.Workouts,
            ProgramID: WeekEl.Program_ID[0],
            AmountCompleted: 0,
          });
        });*/
      });
    },
    
    // Reset Webflow Animations
    WebflowAnimations()
    {
      console.log("interaction loaded");
      window.Webflow && window.Webflow.destroy();
      window.Webflow && window.Webflow.ready();
      window.Webflow && window.Webflow.require("ix2").init();
      document.dispatchEvent(new Event("readystatechange"));
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {
    // console.log('Recoveries', this.Recoveries)
    this.WebflowAnimations();
    //console.log("Completed Array", this.CompletedWorkouts)
    //console.log("Next Workout", this.nextWorkoutID)
    //console.log("Progress", this.ProgramCompleted)
    //setTimeout(() => {document.querySelector('.loading-state-v2').style.display = "none"}, 3000);
  },
}).mount("#app");
// End Vue Intializer
