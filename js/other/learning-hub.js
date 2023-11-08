// Start Vue Intializer
const { createApp } = Vue;
createApp({
  data() {
    return {
      User: null,
      Page: null,
      HeroImage: null,
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
  },
}).mount("#app");
// End Vue Intializer