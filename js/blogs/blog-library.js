// Start Vue Intializer
const { createApp } = Vue;
createApp({
  data() {
    return {
      User: {},
      Blogs: [],
      Search: '',
    };
  },
    computed: {
    filteredList() {
        return this.Blogs.filter(item => item.Name.toUpperCase().includes(this.Search.toUpperCase()))
    }
    },
  created() {
  Wized.request.await("Load Blogs", (response) => {
    this.Blogs = response.data;
  });
  Wized.request.await("Load Users Blogs", (response) => {
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