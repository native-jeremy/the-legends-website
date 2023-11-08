//----------------------------------------------------------------
//  HOME PAGE REQUEST | FROM WIZED
//----------------------------------------------------------------
Wized.request.await("Load Home Page", (response) => {
  const snapshot = response.data;
  console.log(snapshot);
//----------------------------------------------------------------
//  VUE JS CONFIGURATION
//----------------------------------------------------------------
  const { createApp } = Vue
  createApp({
      data() {
      return {
          IntroHeading: snapshot.Intro_Heading,
          IntroDescription: snapshot.Intro_Description,
          ButtonText: snapshot.Intro_Button_Text,
          ButtonLink: snapshot.Intro_Button_Link,
          IntroSmallText: snapshot.Intro_Small_Text,
          S1Heading: snapshot.S_1_Heading,
          S1SubHeading: snapshot.S_1_Sub_Heading,
          ActionHeading: snapshot.Action_Heading,
          ActionSubHeading: snapshot.Action_Sub_Heading,
          TrainerSectionHeading: snapshot.Trainer_Section_Heading,
          TrainerSectionSubHeading: snapshot.Trainer_Section_Sub_Heading,
          TrainerImage: snapshot.Trainer_Image[0].url,
          TrainerName: snapshot.Trainer_Name,
          TrainerDescription: snapshot.Trainer_Description,
          TrainerImage2: snapshot.Trainer_Image_2[0].url,
          TrainerName2: snapshot.Trainer_Name_2,
          TrainerDescription2: snapshot.Trainer_Description_2,
          S2Heading: snapshot.S_2_Heading,
          S2SubHeading: snapshot.S_2_Sub_Heading,
          S3Heading: snapshot.S_3_Heading,
          S3SubHeading: snapshot.S_3_Sub_Heading,
          PricingHeading1: snapshot.S_3_Pricing_Heading_1,
          PricingSubHeading1: snapshot.S_3_Pricing_Sub_Heading_1,
          PricingHeading2: snapshot.S_3_Pricing_Heading_2,
          PricingSubHeading2: snapshot.S_3_Pricing_Sub_Heading_2,
          PricingHeading3: snapshot.S_3_Pricing_Heading_3,
          PricingSubHeading3: snapshot.S_3_Pricing_Sub_Heading_3,
          S4Heading: snapshot.S_4_Heading,
          S4SubHeading: snapshot.S_4_Sub_Heading,
          S5Heading: snapshot.S_5_Heading,
          S5SubHeading: snapshot.S_5_Sub_Heading,
          isLoading: true,
          FAQS: snapshot.FAQS,
          FAQSID: snapshot.ID_FAQS,
          FAQSHeading: snapshot.Heading_FAQS,
          FAQSDescription: snapshot.Description_FAQS,
          IphoneImageExercise: snapshot.Iphone_Image_Exercise[0].url,
          IphoneHeadingExercise: snapshot.Iphone_Heading_Exercise,
          IphoneSubHeadingExercise: snapshot.Iphone_Sub_Heading_Exercise,        				
          IphoneDescriptionExercise: snapshot.Iphone_Description_Exercise,
          IphoneImageNourishment: snapshot.Iphone_Image_Nourishment[0].url,
          IphoneHeadingNourishment: snapshot.Iphone_Heading_Nourishment,
          IphoneSubHeadingNourishment: snapshot.Iphone_Sub_Heading_Nourishment,
          IphoneDescriptionNourishment: snapshot.Iphone_Description_Nourishment,
          IphoneImageRecovery: snapshot.Iphone_Image_Recovery[0].url,
          IphoneHeadingRecovery: snapshot.Iphone_Heading_Recovery,
          IphoneSubHeadingRecovery: snapshot.Iphone_Sub_Heading_Recovery,   
          IphoneDescriptionRecovery: snapshot.Iphone_Description_Recovery,            
          IphoneImageMindset: snapshot.Iphone_Image_Mindset[0].url,
          IphoneHeadingMindset: snapshot.Iphone_Heading_Mindset,
          IphoneSubHeadingMindset: snapshot.Iphone_Sub_Heading_Mindset,
          IphoneDescriptionMindset: snapshot.Iphone_Description_Mindset,   
      }
      },
      mounted(){
      function delayedSelection() {
          console.log("interaction loaded");
          window.Webflow && window.Webflow.destroy();
          window.Webflow && window.Webflow.ready();
          window.Webflow && window.Webflow.require("ix2").init();
          document.dispatchEvent(new Event("readystatechange"));
          const scrollBtnNext = document.querySelectorAll(".show_next_toggle")
          const scrollBtnPrev = document.querySelectorAll(".show_prev_toggle")
          const scrollContent = document.querySelectorAll(".card_scroll_content")
          const demoCard = document.getElementById("demoCard")
          let distance = demoCard.offsetWidth;
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
          setTimeout(delayedSelection, 1000);
      //Custom Slider Dots || Arrows || Elements / Event Listener Applied
          //Webflow Arrows | Buttons
          const currentLeft = document.getElementById("currentLeft");
          const currentRight = document.getElementById("currentRight");
          //Custom Arrows | Buttons
          const newLeft = document.getElementById("newLeft");
          const newRight = document.getElementById("newRight");
          newLeft.addEventListener("click", () => {
            currentLeft.click();
            applyCustomDots();
          });
          newRight.addEventListener("click", () => {
            currentRight.click();
            applyCustomDots();
          });
          function applyCustomDots() {
            //Slider Dots
            const webflowDot = document.querySelectorAll(".w-slider-dot");
            const customDot = document.querySelectorAll(".dot");
            for (let i = 0; i < webflowDot.length; i++) {
              if (webflowDot[i].classList.contains("w-active")) {
                customDot.forEach((dot) => {
                  if (dot.classList.contains("dot_active")) {
                    dot.classList.remove("dot_active");
                  }
                });
                customDot[i].classList.add("dot_active");
              }
            }
          }
      }
  }).mount('#app')
//----------------------------------------------------------------
//  END VUE JS CONFIGURATION
//----------------------------------------------------------------
//  HOME PAGE REQUEST END | FROM WIZED
//----------------------------------------------------------------
});