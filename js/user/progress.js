anime({
  targets: '.path3',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'cubicBezier(.5, .05, .1, .3)',
  duration: 2000,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});

Wized.request.await("Load Users", (response) => {
  const currentUser = response.data;
  const WorkoutsCompleted = currentUser.Completed_Workouts.length;
  const ExerciseProgress = Math.floor(currentUser.Exercise_Progress / 3600);
  const StrengthProgress = Math.floor(currentUser.Strength_Progress / 3600);
  const CardioProgress = Math.floor(currentUser.Cardio_Progress / 3600);
  const RecoveryProgress = Math.floor(currentUser.Recovery_Progress / 3600);
  const RunningProgress = Math.floor(currentUser.Running_Progress / 3600);
  const awards = currentUser.Awards;
  const completedPrograms = currentUser.Programs_Completed;
  // Console.log Request
  console.log("User Request:", currentUser);
  // Start Vue Intializer
  const { createApp } = Vue;
  createApp({
    data() {
      return {
        User: currentUser,
        Workouts: WorkoutsCompleted,
        Exercise: ExerciseProgress,
        Strength: StrengthProgress,
        Cardio: CardioProgress,
        Recovery: RecoveryProgress,
        Running: RunningProgress,
        Awards: awards,
        CompletedPrograms: completedPrograms,
      };
    },
    mounted() {
      console.log("interaction loaded");
      window.Webflow && window.Webflow.destroy();
      window.Webflow && window.Webflow.ready();
      window.Webflow && window.Webflow.require("ix2").init();
      document.dispatchEvent(new Event("readystatechange"));
      setTimeout(() => {document.querySelector('.loading-state-v2').style.display = "none"}, 3000);
    },
  }).mount("#app");
  // End Vue Intializer
});
