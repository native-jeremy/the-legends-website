window.onload = async () => {


    await Wized.request.execute('Load Guide');
    const response = await Wized.data.get('r.40.d');
    console.log("Data: ", response)
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
};
