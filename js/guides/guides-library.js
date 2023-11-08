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
  },
}).mount("#app");
// End Vue Intializer