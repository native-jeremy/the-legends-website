setTimeout(() =>{
  anime({
    targets: '.path3',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'cubicBezier(.5, .05, .1, .3)',
    duration: 2000,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  });
  }, 2000)
//----------------------------------------------------------------
//  HOME PAGE REQUEST | FROM WIZED
//----------------------------------------------------------------
Wized.request.await("Load About Page", (response) => {
  const snapshot = response.data;
  console.log(snapshot);
//----------------------------------------------------------------
//  VUE JS CONFIGURATION
//----------------------------------------------------------------
  const { createApp } = Vue
  createApp({
      data() {
      return {
          HeroImage: snapshot.Hero_Image[0].url,
          IntroHeading: snapshot.Intro_Heading,
          IntroDescription: snapshot.Intro_Description,
          S1Description: snapshot.S_1_Description,
          S1Image: snapshot.S_1_Image[0].url,
          S2Description: snapshot.S_2_Description,
          S2DisplayHeading: snapshot.S_2_Display_Heading,
          TrainerSectionHeading: snapshot.Trainer_Section_Heading,
          TrainerSectionSubHeading: snapshot.Trainer_Section_Sub_Heading,
          TrainerImage: snapshot.Trainer_Image[0].url,
          TrainerName: snapshot.Trainer_Name,
          TrainerRole: snapshot.Trainer_Role,
          TrainerDescription: snapshot.Trainer_Description,
          TrainerImage2: snapshot.Trainer_Image_2[0].url,
          TrainerName2: snapshot.Trainer_Name_2,
          TrainerRole2: snapshot.Trainer_Role_2,
          TrainerDescription2: snapshot.Trainer_Description_2,
          S2Heading: snapshot.S_2_Heading,
          S2SubHeading: snapshot.S_2_Sub_Heading,
          S3Heading: snapshot.S_3_Heading,
          S3SubHeading: snapshot.S_3_Sub_Heading,
          S4Heading: snapshot.S_4_Heading,
          S4SubHeading: snapshot.S_4_Sub_Heading,
          /*
          CTAHeading1: snapshot.CTA_Heading[0],
          CTASubHeading1: snapshot.CTA_Sub_Heading[0],
          CTAButtonLink1: snapshot.CTA_Button_Link[0],
          CTAButtonText1: snapshot.CTA_Button_Text[0],
          CTAHeading2: snapshot.CTA_Heading_2[0],
          CTASubHeading2: snapshot.CTA_Sub_Heading_2[0],
          CTAButtonLink2: snapshot.CTA_Button_Link_2[0],
          CTAButtonText2: snapshot.CTA_Button_Text_2[0],
          */
      }
      },
          mounted(){
          console.log("interaction loaded");
          window.Webflow && window.Webflow.destroy();
          window.Webflow && window.Webflow.ready();
          window.Webflow && window.Webflow.require("ix2").init();
          document.dispatchEvent(new Event("readystatechange"));
        function delayedSelection() {
          const scrollBtnNext = document.querySelectorAll(".show_next_toggle")
          const scrollBtnPrev = document.querySelectorAll(".show_prev_toggle")
          const scrollContent = document.querySelectorAll(".card_scroll_content")
          const demoCard = document.getElementById("demoCard")
          let distance = demoCard.offsetWidth + 25;
          if(distance > 1)
          {
            demoCard.remove();
          }
           scrollContent.forEach((scroll, index) => {
            scroll.style.scrollBehavior = "smooth"
            scrollBtnNext[index].addEventListener("click", function (event) {
            scroll.scrollBy(distance, 0);
           });
           scrollBtnPrev[index].addEventListener("click", function (event) {
            scroll.scrollBy(-distance, 0);
           });
           console.log("Offset Width", distance)
          });
          }
          setTimeout(delayedSelection, 3000);
          setTimeout(() => {document.querySelector('.loading-state-v2').style.display = "none"}, 2000);
      }
  }).mount('#app')
//----------------------------------------------------------------
//  END VUE JS CONFIGURATION
//----------------------------------------------------------------
//  HOME PAGE REQUEST END | FROM WIZED
//----------------------------------------------------------------
});