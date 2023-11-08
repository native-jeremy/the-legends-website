// Start Vue Intializer
const { createApp } = Vue;
createApp({
  data() {
    return {
      User: {},
      Tutorials: [],
      Search: "",
    };
  },
  computed: {
    filteredList() {
      console.log("TUTORIAL", this.Tutorials);
      return this.Tutorials.filter((item) =>
        item.Tutorial.toUpperCase().includes(this.Search.toUpperCase())
      );
    },
  },
  created() {
    Wized.request.await("Load Tutorials", (response) => {
      this.Tutorials = response.data;
    });
    Wized.request.await("Load Users Tutorials", (response) => {
      this.User = response.data;
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
