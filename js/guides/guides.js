window.onload = async () => {
  anime({
    targets: '.path3',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'cubicBezier(.5, .05, .1, .3)',
    duration: 2000,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  });

  /*Wized.request.await("Load Guide", (response) => {
    setTimeout(SlideInfo, 2000);
    function SlideInfo() {
      const snapshot = response.data;
      const titles = snapshot.Slides_Titles;
      const descs = snapshot.Slides_Descriptions;
      const completeButton = document.querySelector(".complete_guide");
      let titlesCol = titles.split("," + "\n");
      let descsCol = descs.split("," + "\n");
      document.title = snapshot.Name;
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
        completeButton.style.display = "flex";
      });
      swiper.on("slideChange", function (e) {
        if (swiper.activeIndex == swiper.slides.length - 1) {
          completeButton.style.display = "flex";
        } else {
          completeButton.style.display = "none";
        }
      });
      completeButton.addEventListener("click", () => {
        setTimeout(() => {
          history.back();
        }, 3000);
      });
      let slide = document.querySelectorAll(".swiper-slide");
      let heading = document.querySelectorAll(".slide-heading");
      let bodyCopy = document.querySelectorAll(".slide-body-copy");
      for (let i = 0; i < slide.length; i++) {
        heading[i].innerHTML = titlesCol[i];
        bodyCopy[i].innerHTML = descsCol[i];
      }
    }
    document.querySelector('.loading-state-v2').style.display = "none"
  });*/

    // Get the query string from the URL
  const queryString = window.location.search;

  // Parse the query string
  const params = new URLSearchParams(queryString);

  // Get the 'recipe' parameter
  const ID = params.get("guide");
  console.log("ID:", ID);

  fetchCollectionItem("Guides", collectionItem);

  async function fetchCollectionItem(collectionName, ID) {
        fetch(`/api/collectionItem?collection=${encodeURIComponent(collectionName)}&recordId=${encodeURIComponent(ID)}`, {
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
      setTimeout(SlideInfo(data), 2000);
      function SlideInfo(response) {
        const snapshot = response.data;
        const titles = snapshot.Slides_Titles;
        const descs = snapshot.Slides_Descriptions;
        const completeButton = document.querySelector(".complete_guide");
        let titlesCol = titles.split("," + "\n");
        let descsCol = descs.split("," + "\n");
        document.title = snapshot.Name;
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
          completeButton.style.display = "flex";
        });
        swiper.on("slideChange", function (e) {
          if (swiper.activeIndex == swiper.slides.length - 1) {
            completeButton.style.display = "flex";
          } else {
            completeButton.style.display = "none";
          }
        });
        completeButton.addEventListener("click", () => {
          setTimeout(() => {
            history.back();
          }, 3000);
        });
        let slide = document.querySelectorAll(".swiper-slide");
        let heading = document.querySelectorAll(".slide-heading");
        let bodyCopy = document.querySelectorAll(".slide-body-copy");
        for (let i = 0; i < slide.length; i++) {
          heading[i].innerHTML = titlesCol[i];
          bodyCopy[i].innerHTML = descsCol[i];
        }
      }
      document.querySelector('.loading-state-v2').style.display = "none"
      });
  }
};
