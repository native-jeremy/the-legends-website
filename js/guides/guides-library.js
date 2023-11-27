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
      Guides: [],
      Search: '',
    };
  },
    computed: {
    filteredList() {
        return this.Guides.filter(item => item.Name.toUpperCase().includes(this.Search.toUpperCase()))
    }
    },
  created() {
  Wized.request.await("Load Guides", (response) => {
    this.Guides = response.data;
  });
  Wized.request.await("Load Users Guides", (response) => {
  	this.User = response.data;
  });
  },
  mounted() {
    console.log("interaction loaded");
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require("ix2").init();
    document.dispatchEvent(new Event("readystatechange"));
    setTimeout(() => {document.querySelector('.loading-state-v2').style.display = "none"}, 2000);
  },
}).mount("#app");
// End Vue Intializer