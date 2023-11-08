window.onload = async () => {
    //Element Variables
    const sliderControls = document.querySelector(".slider-controls");
    const errorModal = document.getElementById("errorModal");
    //let triggerLoader = document.getElementById("trigger");
    const wrapper = document.querySelector(".swiper-wrapper");
    const stateLoader = document.querySelector('.loading-state')
    const filterState = document.getElementById("filterState");
  
    //Global Variables
    let user;
    let programData;
    let programArray = new Array();
    let IdEl = [];
    let TitleEl = [];
    let ImageEl = [];
    let DescriptionEl = [];
    let WeeksEl = [];
    let FAQSArray = [];
    let num = 0;
    /*const value = await Wized.data.get("v.date");
       // Get current date
      let date = new Date();
      // Add five days to current date
      date.setDate(date.getDate() + 14);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let fullDate = year + "/" + month + "/" + day;
      console.log(fullDate);
      Wized.data.setVariable("date", fullDate);*/
  
    // Program Selection Request
    Wized.request.await("Load Users Program", (response) => {
      user = response.data;
      //console.log(user);
      if (user.Questionnaire == "Not Completed")
      {
          errorModal.style.display = "flex";
          //console.log("Selected!")
      }
  
      Wized.request.await("Load Program Selection", (response) => {
        programData = response.data;
        //console.log(programData);
        const dateButton = document.getElementById("dateButton");
        dateButton.addEventListener("click", () => {
          // Get current date
          /*let date = new Date();
          date.setDate(date.getDate() + 14);
          let year = date.getFullYear();
          let month = date.getMonth() + 1;
          let day = date.getDate();
          let fullDate = day + "/" + month + "/" + year;
          console.log(day + "/" + month + "/" + year);*/
        });
  
        for (let i = 0; i < programData.length; i++) {
          const program = programData[i];
          //console.log("Q3 Answer:", program.Q3)
          //console.log("User Answer:", user.Q3)
          if (program.Q2.includes(user.Q2)) {
            ////////////////////////////////////////////////////////////////
            if (program.Q3.includes(user.Q3)) {
              //////////////////////////////////////////////////////////
              if (program.Q4.some((item) => user.Q4.includes(item))) {
                //console.log("Found A Match! Continuing With Conditional Match");
                ////////////////////////////////////////////////////
                if (program.Q5.includes(user.Q5)) {
                  //////////////////////////////////////////////
                  if (program.Q6.some((item) => user.Q6.includes(item))) {
                    function match(ID, Title, Image) {
                      this.ID = program.ID;
                      this.Weeks = program.Count_weeks;
                      this.Title = program.Title;
                      this.Description = program.Description;
                      this.Key_Points = program.Key_Points;
                      this.Image = program.Image[0].url;
                      this.FAQS = program.FAQS;
                      this.Heading_FAQS = program.Heading_FAQS;
                      this.Description_FAQS = program.Description_FAQS;
                    }
  
                    //programObject.push(program);
                    programArray.push(
                      new match(
                        program.ID,
                        program.Weeks,
                        program.Title,
                        program.Description,
                        program.Key_Points = program.Key_Points,
                        program.Image,
                        program.FAQS,
                        program.Heading_FAQS,
                        program.Description_FAQS,
                      )
                    );
                    /*console.log(
                      "Found A Match Here Is Your Program! =",
                      `[ ${programArray} ]`
                    );*/
  
                    for (let i = 0; i < programArray.length; i++) {
                      IdEl.push(programArray[i].ID);
                      TitleEl.push(programArray[i].Title);
                      ImageEl.push(programArray[i].Image);
                      DescriptionEl.push(programArray[i].Description);
                      if (programArray[i].Weeks !== undefined) {
                        WeeksEl.push(programArray[i].Weeks);
                      } else {
                        WeeksEl.push(0);
                      }
                      FAQSArray.push({ID: programArray[i].FAQS, Title: programArray[i].Heading_FAQS, Description: programArray[i].Description_FAQS});
                    }
                    /////////////////////////////////////////
                  }
                }
              }
            }
          }
        }
        if (programArray.length > 0) {
          let programMatch = programArray;
          sliderControls.style.display = "flex";
  
          programArray.forEach((item, index) => {
            const Image = programArray[index].Image;
            num++;
            item = document.createElement("div");
            item.classList.add("swiper-slide");
            item.innerHTML = `
                <div class="app-slide-image no-margin" style="background-image: url('${Image}') !important;">
                        <div class="app-block fixed overlay full-height">
                            <div class="app-block-content">
                                <div class="info-block auto-margin">
                                    <div class="info-block-header">
                                        <div class="split-dynamic-text center">
                                            <div w-el="program_slide_weeks"
                                                class="generic-text-style-2 margin-right-split-dnyamic-text">${programArray[index].Weeks}</div>
                                            <div class="generic-text-style-2 center-align">wEEK program</div>
                                        </div>
                                        <div class="main-heading-style-6 center-align slide-title">${programArray[index].Title}</div>
                                    </div><a data-w-id="5c806ac3-c34a-bc93-6409-9da4edc693c2" href="#"
                                        class="button-style-1 half w-button">Program Details</a><a href="/questionnaire-update"
                                        class="button-style-4 w-button">Back to Questionnaire</a>
                                    <link rel="prerender" href="/questionnaire">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style="transform: translate3d(0px, 0%, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"
                        class="app-view-animation">
                        <div class="app-body">
                            <div class="content">
                                <div class="content-headings margin-bottom">
                                    <div class="split-dynamic-text">
                                        <div
                                            class="generic-text-style-6 margin-right-split-dnyamic-text">${WeeksEl[index]}</div>
                                        <div class="generic-text-style-6">wEEK program</div>
                                    </div>
                                    <h2 class="main-heading-style-1">${programArray[index].Title}</h2>
                                </div>
                                <div class="content-block base-block">
                                    <div class="content-block-header">
                                        <h2 class="main-heading-style-2">Overview</h2>
                                    </div>
                                    <div class="content-block-body">
                                        <p class="body-copy-text-style-1">${programArray[index].Description}</p>
                                    </div>
                                </div>
                                <div class="content-block">
                                    <div class="content-block-header">
                                        <h2 class="main-heading-style-2">Key points</h2>
                                    </div>
                                    <div class="content-block-body">
                                        <div class="content-block-body-copy">
                                            <p class="body-copy-text-style-1">${programArray[index].Key_Points}</p>
                                        </div>
                                    </div>
                                </div>
                                <!--<div class="content-block">
                                    <div class="content-block-header">
                                        <h2 class="main-heading-style-2">Workout Structure (Weekly)</h2>
                                    </div>
                                    <div class="content-block-body">
                                        <div class="content-block-body-header">
                                            <h3 class="generic-text-style-6 non-caps">Core Workouts</h3>
                                        </div>
                                        <div class="content-block-body-copy">
                                            <p class="body-copy-text-style-1">${programArray[index].Title}</p>
                                        </div>
                                    </div>
                                    <div class="content-block-body margin-top">
                                        <div class="content-block-body-header">
                                            <h3 class="generic-text-style-6 non-caps">Recommended</h3>
                                        </div>
                                        <div class="content-block-body-copy">
                                            <p class="body-copy-text-style-1">${programArray[index].Title}</p>
                                        </div>
                                    </div>
                                </div>-->
                                <div class="content-block faqs_render">
                                    <div class="content-block-header">
                                        <h2 class="main-heading-style-2">FAQs</h2>
                                    </div>
                                </div>
                                <a data-w-id="318dd5d4-e2e9-7095-276c-a871128f0341" href="#" w-el="program_add" class="button-style-1 w-button selection_button">Let’s get started</a>
                                <a href="/questionnaire" class="button-style-5 w-button">back to questionnaire</a>
                                <link rel="prerender" href="/questionnaire">
                            </div>
                        </div>
                    </div>
                    `;
            wrapper.append(item);
          });

          const renderLength = programArray[0].FAQS.length;

          setTimeout(() => {
            const contentWrapper = document.querySelectorAll('.faqs_render');
            contentWrapper.forEach(render => {
                for (let i = 0; i < renderLength; i++) {
                    let createElement = document.createElement("div");
                    createElement.innerHTML = 
                    `<div class="accordion style-2">
                        <div data-w-id="318dd5d4-e2e9-7095-276c-a871128f0316" class="accordion-header style-2">
                            <h2 class="generic-text-style-6 non-caps">${FAQSArray[0].Title[i]}</h2>
                            <div class="accordion-header-arrow">
                                <div class="accordion-arrow-icon"></div>
                            </div>
                        </div>
                        <div class="accordion-body style-2">
                            <p class="body-copy-text-style-1">${FAQSArray[0].Description[i]}</p>
                        </div>
                    </div>`
                    render.append(createElement);
                }
                Webflow.require("ix2").init();
            });
          }, 2000);
  
          setTimeout(() => {
            let selectionButton = document.querySelectorAll(".selection_button");
            selectionButton.forEach((button, num) => {
              button.addEventListener("click", () => {
                //console.log("Clicked This Button!", button + " " + num);
                Wized.data.setVariable("programid", `${programArray[num].ID}`);
                const checkSelection = Wized.data.get("v.program");
                  //console.log("Selected Program id", checkSelection);
              });
            });
          }, 1000);
  
          Wized.data.listen("v.programid", async () => {
            const changedId = await Wized.data.get("v.programid");
            //console.log("Program Selection changed to: ", changedId);
          });
  
          Wized.data.setVariable("program", programMatch);
            const id = Wized.data.get("v.program");
            //console.log("Program Variable! =", id);
          setTimeout(() => {
            filterState.remove();
            stateLoader.remove();
          }, 1000);
  
          setTimeout(() => {
            /////////////////////////////////////////
            //console.log("Programs", programArray)
  
            const swiper = new Swiper(".swiper", {
              // Optional parameters
              speed: 1000,
              rewind: true,
              observer: true,
              observeParents: true,
              slidesPerView: 1,
              shortSwipes: true,
              watchSlidesProgress: true,
              initialSlide: 0,
              // Navigation arrows
              navigation: {
                nextEl: ".right-slide-arrow-button",
                prevEl: ".left-slide-arrow-button",
              },
            });
            Webflow.require("ix2").init();
            /////////////////////////////////////////
            swiper.on("slideChange", function () {
              Webflow.require("ix2").init();
              /*slideBtn_Left.classList.remove("swiper-button-lock");
                slideBtn_Right.classList.remove("swiper-button-lock");*/
            });
          }, 2000);

          setTimeout(() => {
            console.clear();
          }, 3000)
  
          Wized.data.listen("v.programMatch", async () => {
            const programMatch = await Wized.data.get("v.program"); // Get new value
            //console.log("Program Match: ", programMatch); // Console log new value
          });
        }
      });
    });
  };
