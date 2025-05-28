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
        console.log(data)
        this.response = data;
        document.title = data.Name;
        this.generateSlides();
        //setTimeout(this.SlideSetup(data), 2000);
      document.querySelector('.loading-state-v2').style.display = "none"
      });
  },
  async updateCollectionItem(collectionName, ID) {
      fetch(`/api/collection-single?collection=${encodeURIComponent(collectionName)}&recordId=${encodeURIComponent(ID)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: "example" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data)
        this.response = data;
        document.title = data.Name;
        this.generateSlides();
        //setTimeout(this.SlideSetup(data), 2000);
      document.querySelector('.loading-state-v2').style.display = "none"
      });
  },
  generateCompletedGuide() {
    const guide = {
      id: this.response.ID,
      name: this.response.Name,
      user: null
    }
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
        swiper.on("reachEnd", function () {
          this.completed = true;
        });
        swiper.on("slideChange", function (e) {
          if (swiper.activeIndex == swiper.slides.length - 1) {
            this.completed = true;
          } else {
            this.completed = false;
          }
        });
  },
  async readGuide() {
    console.log("Data", response)
    await Wized.request.execute('Read Guide');
    const response = await Wized.data.get('r.128.d'); // Get request response
    if(response) {
      setTimeout(() => {
        history.back();
      }, 3000);
    }
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
  }
  },
  mounted() {

    // Get the query string from the URL
    const queryString = window.location.search;

    // Parse the query string
    const params = new URLSearchParams(queryString);

    // Get the 'guide' parameter
    const ID = params.get("guide");
    console.log("ID:", ID);
    this.fetchCollectionItem("Guides", ID);
    this.getCookie("wized_userid");

    setTimeout(() => {
      console.log("Slides: ", this.slides)
    console.log("interaction loaded");
    window.Webflow && window.Webflow.destroy();
    window.Webflow && window.Webflow.ready();
    window.Webflow && window.Webflow.require("ix2").init();
    document.dispatchEvent(new Event("readystatechange"));
    }, 3000);
  },
}).mount("#app");
// End Vue Intializer