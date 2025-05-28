// Start Vue Intializer
const { createApp } = Vue;
createApp({
  data() {
    return {
      response: null,
      slides: [],
      completed: false
    };
  },
  methods: {
  async fetchCollectionItem(collectionName, ID) {
      fetch(`/api/collection-single?collection=${encodeURIComponent(collectionName)}&recordId=${encodeURIComponent(ID)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        this.response = data;
        document.title = data.Name;
        this.generateSlides();
        document.querySelector('.loading-state-v2').style.display = "none"
      });
  },
  async updateCollectionItem(collectionName, ID) {
      fetch(`/api/collection-single?collection=${encodeURIComponent(collectionName)}&recordId=${encodeURIComponent(ID)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.generateCompletedGuide()),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
      });
  },
  async createCollectionItem(collectionName, ID) {
      fetch(`/api/collection-single?collection=${encodeURIComponent(collectionName)}&recordId=${encodeURIComponent(ID)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.generateCompletedGuide()),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          history.back();
        }, 3000);
      });
  },
  checkRoute() {
    if(this.completed) {
        const currentUrl = window.location.href;
        const referrer = document.referrer;
        if (!referrer || referrer === currentUrl) {
        // No previous page or same as current
         window.location.href = "/learning-hub";
        } else {
         history.back();
        }
    }  else {
      this.createCollectionItem('Guides Read');
    }
  },
  generateCompletedGuide() {
    const userid = this.getCookie("wized_userid");
    console.log("userid: ", userid)
    const newGuide = {
      Guide_Referenced: this.response.ID,
      User: userid
    }
    return newGuide;
  },
  generateSlides() {
    const titles = this.formatStringToArray(',', this.response.Slides_Titles);
    const descriptions = this.formatStringToArray(',', this.response.Slides_Descriptions);
      for (let i = 0; i < this.response.Slides.length; i++) {
        const slide = {
          image: this.response.Slides_Images[i].url,
          title: titles[i],
          description: descriptions[i]
        }
        this.slides.push(slide);
      }
     setTimeout(this.slideSetup(), 2000);   
  },
  formatStringToArray (seperator, data) {
      let Array = [];
      if(data) {
        Array = data.split(`${seperator}` + "\n");
      }
      return Array;
  },
  slideSetup() {
        const swiper = new Swiper(".guide-slider", {
          speed: 1000,
          loop: false,
          observer: true,
          autoHeight: true,
          observeParents: true,
          slidesPerView: 1,
          shortSwipes: true,
          watchSlidesProgress: true,
          initialSlide: 0,
          navigation: {
            nextEl: ".right-slide-arrow-button",
            prevEl: ".left-slide-arrow-button",
          },
        });
        swiper.on("reachEnd", () => {
            document.querySelector(".complete_guide").style.display = "block";
        });
  },
  getCookie(name) {
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const [key, value] = cookies[i].split("=");
      if (key === name) {
        return decodeURIComponent(value);
      }
    }
    return null; // Return null if the cookie is not found
  },
  setCompleted() {
    // Get the query string from the URL
    const queryString = window.location.search;
    // Parse the query string
    const urlParams = new URLSearchParams(queryString);
    // Get the 'recipe' parameter
    this.completed = true ? urlParams.get("completed") : false;
    console.log("Completed: ", this.completed)
  }
  },
  mounted() {
    // Get the query string from the URL
    const queryString = window.location.search;
    // Parse the query string
    const params = new URLSearchParams(queryString);
    // Get the 'guide' parameter
    const ID = params.get("guide");
    this.fetchCollectionItem("Guides", ID);
    this.setCompleted();

    setTimeout(() => {
    console.log("interaction loaded");
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require("ix2").init();
    document.dispatchEvent(new Event("readystatechange"));
    }, 3000);
  },
}).mount("#app");
// End Vue Intializer