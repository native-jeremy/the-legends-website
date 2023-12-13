anime({
  targets: '.path3',
  strokeDashoffset: [anime.setDashoffset, 0],
  easing: 'cubicBezier(.5, .05, .1, .3)',
  duration: 2000,
  delay: function(el, i) { return i * 250 },
  direction: 'alternate',
  loop: true
});

  // Start Vue Intializer
  const { createApp } = Vue;
  createApp({
    data() {
      return {
        User: null,
        Workouts: null,
        Exercise: null,
        Strength: null,
        Cardio: null,
        Recovery: null,
        Running: null,
        Awards: null,
        CompletedPrograms: null,
      };
    },
    methods: {
        async progressRequest()
        {
          Wized.request.await("Load Users", (response) => {
            const currentUser = response.data;
            this.User = currentUser
            if (("Completed_Workouts" in currentUser)) {
              this.Workouts = currentUser.Completed_Workouts.length;
              this.Exercise = parseFloat(currentUser.Exercise_Progress / 60).toFixed(2);
              this.Strength = parseFloat(currentUser.Strength_Progress / 60).toFixed(2);
              this.Cardio = parseFloat(currentUser.Cardio_Progress / 60).toFixed(2);
              this.Recovery = parseFloat(currentUser.Recovery_Progress / 60).toFixed(2);
              this.Running = parseFloat(currentUser.Running_Progress / 60).toFixed(2);
              this.Awards = currentUser.Awards;
              this.CompletedPrograms = currentUser.Programs_Completed;
            }
          });
        }
    },
    created()
    {
      this.progressRequest()
    },
    mounted() {
      console.log("interaction loaded");
      window.Webflow && window.Webflow.destroy();
      window.Webflow && window.Webflow.ready();
      window.Webflow && window.Webflow.require("ix2").init();
      document.dispatchEvent(new Event("readystatechange"));
      setTimeout(() => {
        document.querySelector('.loading-state-v2').style.display = "none"
      }, 4000)
    },
  }).mount("#app");
  // End Vue Intializer
