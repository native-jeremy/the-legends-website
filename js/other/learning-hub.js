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
      User: [],
      Page: null,
      HeroImage: [],
      Guides: null,
      Blogs: null,
      Tutorials: null,
    };
  },
  created() {
  Wized.request.await("Load Users Learn", (response) => {
    this.User = response.data;
  });
  Wized.request.await("Load Page", (response) => {
    this.Page = response.data[0];
    this.HeroImage = response.data[0].Hero_Image[0].url;
    //console.log('Image', response)
  });
  Wized.request.await("Load Guides - LEARN", (response) => {
    this.Guides = response.data;
  });
  Wized.request.await("Load Blogs - LEARN", (response) => {
    this.Blogs = response.data;
  });
  Wized.request.await("Load Tutorials - LEARN", (response) => {
    this.Tutorials = response.data;
  });
  },
  mounted() {
    console.log("interaction loaded");
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require("ix2").init();
    document.dispatchEvent(new Event("readystatechange"));
    document.querySelector('.loading-state-v2').style.display = "none"
  },
}).mount("#app");
// End Vue Intializer