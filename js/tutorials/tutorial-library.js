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
      User: {},
      Tutorials: [],
      Search: "",
      Loading: true
    };
  },
  computed: {
    filteredList() {
      //console.log("TUTORIAL", this.Tutorials);
      return this.Tutorials.filter((item) =>
        item.Tutorial.toUpperCase().includes(this.Search.toUpperCase())
      );
    },
  },methods: {
    async TutorialsRequest()
    {
      Wized.request.await("Load Tutorials Page 1", (response) => {
        this.Loading = false;
        if(response.data.length > 0) {
        const data = response.data
        data.forEach(element => {
          this.Tutorials.push(element);
        });
        //console.log('Recipes Page 1', data);
        }
      });
      Wized.request.await("Load Tutorials Page 2", (response) => {
        if(response.data.length > 0) {
        const data = response.data
        data.forEach(element => {
          this.Tutorials.push(element);
        });
        //console.log('Recipes Page 2', data);
       }
      });
      Wized.request.await("Load Tutorials Page 3", (response) => {
        if(response.data.length > 0) {
        const data = response.data
        data.forEach(element => {
          this.Tutorials.push(element);
        });
        //console.log('Recipes Page 3', data);
        }
      });
      Wized.request.await("Load Tutorials Page 4", (response) => {
        if(response.data.length > 0) {
        const data = response.data
        data.forEach(element => {
          this.Tutorials.push(element);
        });
        //console.log('Recipes Page 4', data);
        }

        Wized.request.await("Load Users Tutorials", (response) => {
          this.User = response.data;
        });
      });
    }
  },
  created() {
    this.TutorialsRequest()
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
