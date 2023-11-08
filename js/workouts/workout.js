//Element Triggers
const videoContainer = document.getElementById("videoContainer");
const loaderTrigger = document.getElementById("Trigger");
const exerciseTitle = document.getElementById("exerciseTitle");
const exerciseHeader = document.getElementById("exerciseHeader");
const roundPopup = document.getElementById("roundPopup");
const roundTitle = document.getElementById("roundTitle");
const roundNumHeader = document.getElementById("headerNumText");
const roundText = document.getElementById("roundText");
const videoChange = document.getElementById("videoChange");
const paramTest = document.getElementById("paramTest");
const paramTestBase = document.getElementById("paramTestBase");

// Element Declarations
const repText = document.getElementById("repText");
const timerText = document.getElementById("safeTimerDisplay");
const currentTest = document.getElementById("current");
const durationTest = document.getElementById("dur");
const RoundNumberText = document.getElementById("mainNumText");
const progressEl = document.querySelector('.wheel');
let loader = document.getElementById('loader');
const returnMessage = document.getElementById('return');
const recoveryMessage = document.getElementById('recoveryMessage');
const recoveryLink = document.getElementById('recoveryLink');
const workoutMessage = document.getElementById('workoutMessage');
let voiceSrc = document.getElementById("voiceSrc");
let sirenSrc = document.getElementById("sirenSrc");

// Param Int Set Variables
let setIntRoundNum;
let setIntExercisesNum;
let setIntExerciseNum;

// Param Get Variables
let getRoundNum;
let getExercisesNum;
let getExerciseNum;

// Param Set Variables
let setRoundNum;
let setExercisesNum;
let setExerciseNum;

// Temp Variables
let exerciseDiffRes;
let roundRes;
let roundResIndex;
let roundLength;
let exerciseData;
let roundRealNumber;
let audioRes;
let audioIndex;
let checkAmrapVideo;
let checkAmrapAudio;
let exerciseRes;
let diffLength;
let diffCurrent;
let diffRes;
let minutes;
let seconds;

const workoutExitButton = document.getElementById("workoutExit");

const siren = document.getElementById("siren");
const sirenText = document.getElementById("sirenText");
const sirenAudio = document.getElementById("sirenAudio");
const sirenToggleOn = document.getElementById("sirenToggleOn");

const voice = document.getElementById("voice");
const voiceText = document.getElementById("voiceText");
const voiceAudio = document.getElementById("voiceAudio");
const voiceToggleOn = document.getElementById("voiceToggleOn");

const playButton = document.getElementById("playButton");
const nextButton = document.getElementById("nextButton");
const prevButton = document.getElementById("prevButton");
const backButton = document.getElementById("backButton");

const playButtonDisabled = document.getElementById("playButtonDisabled");
const nextButtonDisabled = document.getElementById("nextButtonDisabled");
const prevButtonDisabled = document.getElementById("prevButtonDisabled");

const minusBtn = document.getElementById("minusBtn");
const currentNum = document.getElementById("currentNum");
const limitNum = document.getElementById("limitNum");
const plusBtn = document.getElementById("plusBtn");
let maxLimit;
let minLimit = 0;
let amount = 0;
currentNum.innerHTML = amount;

let refreshNum = 0;
window.onload = async () => {
  const cookieIndex = await Wized.data.get("c.cookieindex");
  const dataIndex = await Wized.data.get("v.dataindex");
  const statusNum = await Wized.data.get("v.statusnum");
  const roundLengthCookie = await Wized.data.get("c.roundlength");
  const exerciseIndex = await Wized.data.get("c.exerciseindex");
  const typeParam = await Wized.data.get("n.parameter.type");
  const exerciseParam = await Wized.data.get("n.parameter.exercise");
  const exercisesParam = await Wized.data.get("n.parameter.exercises");
  const roundParam = await Wized.data.get("n.parameter.round");
  const workoutParam = await Wized.data.get("n.parameter.workout");
  const sirenCookieInt = await Wized.data.get("c.sirenmute");
  const voiceCookieInt = await Wized.data.get("c.voicemute");
  const recoveryID = await Wized.data.get("c.recoveryid");
  const sirenValue = localStorage.getItem("siren");
  const voiceValue = localStorage.getItem("voice");

  let params = window.location.href;
  let url = new URL(params);
  let checkurl = url.searchParams;

  let recoveryData;

  window.history.replaceState(null, null, url.toString());

  enableDisabledStates();

  if (parseInt(roundParam) < 0 && parseInt(exercisesParam) === 0) {
    roundPopup.style.display = "flex";
    roundText.style.display = "flex";
    RoundNumberText.innerHTML = "Redirecting..";
    enableDisabledStates();
    window.location.href = "/workout-overview.html?workout=" + workoutParam;
  } else if (
    window.location.href == "https://the-legends-web-app.webflow.io/workout"
  ) {
    roundPopup.style.display = "flex";
    roundText.style.display = "flex";
    RoundNumberText.innerHTML = "Redirecting..";
    enableDisabledStates();
    window.location.href = "/program-hub";
  }

  if (parseInt(roundLengthCookie) === parseInt(roundParam))
  {
    RoundNumberText.innerHTML = "Workout Completed";
    roundTitle.innerHTML = "Congratulations!";
    roundNumHeader.innerHTML = "";
    Wized.data.setVariable("complete", "completed");
    returnMessage.click();
    roundPopup.style.display = "flex";
    roundText.style.display = "flex";
    recoveryLink.href = `/recovery.html?recovery=${recoveryID}&exercises=0`
  }

  Wized.request.await("Load Round Info", (response) => {
    
    roundRes = response;
    roundInfo = roundRes.data[parseInt(roundParam)];

    roundDiffLevel = roundInfo.Default_Diff_Level.split(", ");

    roundSelected = roundRes.data[parseInt(roundParam)].Round_Selection;
  });

  Wized.request.await("Load Audio", (response) => {    
    console.log("Audio Response", response);

    audioRes = response;
    console.log("Audio Response", audioRes);
  })

  Wized.request.await("Load Round Info", (response) => {
    //setTimeout(() => {console.clear();}, 2000);
    const mainResponse = response;
    const repDataInt = response;
    let repAmount;
    let repType;
    let newcookieIndex;
    let amrapBool;
    const amrapResponse = response;
    let checkAmrap;

    if (repDataInt.status === 200) {
      loaderTrigger.click();
      videoContainer.style.opacity = "1";
    }
    //----------------------------------------------------------------
    if (parseInt(exercisesParam) < 0) {
      getRoundNum = checkurl.get("round");
      getRoundNum = parseInt(getRoundNum) - 1;
      setRoundNum = checkurl.set("round", getRoundNum.toString());
      getExercisesNum = checkurl.get("exercises");
      getExercisesNum = 0;
      setExercisesNum = checkurl.set("exercises", getExercisesNum.toString());

      window.location.href = url.toString();
    }

    if (parseInt(exercisesParam) > mainResponse.data[parseInt(roundParam)].Diff_ID_Linked_Exercises.length - 1) {
      getRoundNum = checkurl.get("round");
      getRoundNum = parseInt(getRoundNum) + 1;
      setRoundNum = checkurl.set("round", getRoundNum.toString());
      getExercisesNum = checkurl.get("exercises");
      getExercisesNum = 0;
      setExercisesNum = checkurl.set("exercises", getExercisesNum.toString());

      window.location.href = url.toString();
    }
    
     else if (parseInt(roundParam) !== 0) {
      RoundNumberText.innerHTML = parseInt(roundParam);
      roundNumHeader.innerHTML = parseInt(roundParam);
    } else if (parseInt(roundParam) === 0 && roundSelected !== "Round 0"){
      RoundNumberText.innerHTML = parseInt(roundParam + 1);
      roundNumHeader.innerHTML = parseInt(roundParam + 1);
    }

    roundLength = roundRes.data.length;
    roundRealNumber = parseInt(roundParam) + 1;

    if (parseInt(exercisesParam) !== 0 ) {
      roundPopup.style.display = "none";
      roundText.style.display = "none";
    }

    if (roundRealNumber > roundLength) {
      RoundNumberText.innerHTML = "Workout Completed";
      roundTitle.innerHTML = "Congratulations!";
      roundNumHeader.innerHTML = "";
      Wized.data.setVariable("complete", "completed");
      enableDisabledStates();
    } else if (parseInt(roundParam) !== 0) {
      RoundNumberText.innerHTML = parseInt(roundParam);
      roundNumHeader.innerHTML = parseInt(roundParam);
    } else if (parseInt(roundParam) === 0 && roundSelected !== "Round 0"){
      RoundNumberText.innerHTML = parseInt(roundParam + 1);
      roundNumHeader.innerHTML = parseInt(roundParam + 1);
    }
    else if (parseInt(roundParam) === 0 && roundSelected === "Round 0"){
      RoundNumberText.innerHTML = "Warm Up";
      roundTitle.innerHTML = "";
      roundNumHeader.innerHTML = "";
    }

      //----------------------------------------------------------------

    exerciseData = mainResponse.data[parseInt(exercisesParam)];

    /*console.log("---------------------------------------");
    console.log("All Rounds:", mainResponse);
    console.log("---------------------------------------");
    console.log("Current Round:", mainResponse.data[parseInt(roundParam)]);
    console.log("---------------------------------------");
    console.log("Current Exercise Amount:", mainResponse.data[parseInt(roundParam)].Amounts_Name_Linked_Exercises[parseInt(exercisesParam)]);*/

    let audioSrc = document.getElementById("voiceSrc");
    let audioIndex = parseInt(exerciseParam);
    let vidSrc = document.getElementById("video");
    let videoIndex = parseInt(exerciseParam);

    //if (exerciseData !== undefined) {
      repAmount = mainResponse.data[parseInt(roundParam)].Amounts_Name_Linked_Exercises[parseInt(exercisesParam)];
      repType = mainResponse.data[parseInt(roundParam)].Rep_Type_Linked_Exercises[parseInt(exercisesParam)]
      amrapBool = mainResponse.data[parseInt(roundParam)].Amrap_Linked_Exercises[parseInt(exercisesParam)];
 
      timerConversion(repAmount)

      function timerConversion(time) {
        minutes = Math.floor(time / 60); 
        seconds = time % 60;
      }

      if (amrapBool == "True") {
        loadAmrapData();
        
        async function loadAmrapData() {

          Wized.request.await("Load Exercise Diff", (response) => {
            const singleBlock = document.querySelector('.single_heading_block');
            const amrapBlock = document.querySelector('.amrap_heading_block');
            singleBlock.remove();
            
            secondaryResponse = response;
            
            //console.log("---------------------------------------");
            //console.log("Exercise Diff Info Response TEMP! ", secondaryResponse);


            exerciseDiffRes = diffRes;

            let amrapLength = mainResponse.data[parseInt(roundParam)].Amrap_Exercise_Amount_Linked_Exercises.length;

            diffLength = secondaryResponse.data[parseInt(videoIndex)].Video.length // This will keep throwing an error if the video length is more
            let diffRealLength = secondaryResponse.data[0].Video.length 
            maxLimit = diffLength;
            limitNum.innerHTML = maxLimit;
            newcookieIndex =
            secondaryResponse.data[parseInt(videoIndex)].Video.length;

            let currentNumber = 0;
            let currentNumberText = currentNumber;

            let controlPlusNumber = [];
            let controlMinusNumber = [];
            let videoSrcIndex = [];
            
            const exerciseNames = mainResponse.data[parseInt(roundParam)].Exercise_Category_Linked_Exercises
            const exerciseDiffNames = secondaryResponse.data

            let videoOrderList = [];

            exerciseNames.forEach((name, index) => {
              exerciseDiffNames.forEach((diff, current) => {
              if(exerciseDiffNames[current].Exercise_Category.includes(name))
              {
                videoOrderList.push(exerciseDiffNames[current]);
              }});
            });

            removeDuplicates(videoOrderList)

            function removeDuplicates(arr) { 
            videoOrderList = arr.reduce(function (acc, curr) { 
            if (!acc.includes(curr)) 
              acc.push(curr); 
            return acc; 
            }, []); 
            return videoOrderList; 
            } 

            secondaryResponse.data = videoOrderList;
            //console.log("Video Order", videoOrderList);
            if (videoSrcIndex.length  <= 0) {
              
              for (let i = 0; i < amrapLength; i++)
              {
                let defaultDiff = roundDiffLevel[i];
                videoSrcIndex.push(defaultDiff);
              }

              for (let i = 0; i < amrapLength; i++)
              {
                const amrapRenderAmount = mainResponse.data[parseInt(roundParam)].Amrap_Exercise_Amount_Linked_Exercises[i]
                const amrapRenderName = videoOrderList[i].Exercise_Name
                const renderHeadings = `
                <div class = "render_headings_block"> 
                <div class="generic-text-style-3 amrap-amount">${amrapRenderAmount}</div>
                <div class="main-heading-style-6 center-align amrap-title">${amrapRenderName}</div>
                </div>
                `
                amrapBlock.innerHTML = amrapBlock.innerHTML + renderHeadings
              }

              //console.log("Default Video Length",videoSrcIndex);
              //console.log("Default Res Level: ", videoSrcIndex)
              //console.log("amrapLength: ", amrapLength)
            }

            if (videoSrcIndex.length > 0) {
              for (let i = 0; i < amrapLength; i++) {
                //controlNumber.push(currentNumber);----------------------------------------------------------------
                let content = document.querySelector("#controls");
                /*let sortedAmrapTitle = repDataInt.data[ parseInt(exercisesParam)].Diff_Exercise_Lookup.reverse();----------------------------------------------------------------*/
                let sortedAmrapTitle = secondaryResponse.data[i].Exercise_Name;
                let amrapResTitle = sortedAmrapTitle;

                let amrapMaxLimit = secondaryResponse.data[i].Video.length

                let amrapControl;
                let amrapHeader;
                let amrapHeaderText;
                let amrapHeaderTop;
                let amrapTitle;
                let amrapTrigger;
                let amrapCounter;
                let amrapDivider;
                let amrapLimit;
                let amrapPlus;
                let amrapPlusArrow;
                let amrapMinus;
                let amrapMinusArrow;
                let amrapMinNumm = 0;
                let ammrapLimitNumm = maxLimit;

                const amrapControlName = videoOrderList[i].Exercise_Name;

                //Amrap Control Div "body"----------------------------------------------------------------
                amrapControl = document.createElement("div");
                amrapControl.classList.add(
                  "accordion",
                  "style-1",
                  "amrap-diff-controls"
                );

                content.append(amrapControl);

                if (localStorage.getItem("diffStart") !== null)
                {
                  currentNumber = localStorage.getItem("diffStart");
                }
                else {
                  currentNumber = videoSrcIndex[i] + 1;
                }
                //currentNumber = videoSrcIndex[i];

                currentNumberText = currentNumber;
                //Amrap Header Content - Content Div----------------------------------------------------------------
                amrapHeader = document.createElement("div");
                amrapHeader.classList.add("accordion-header", "style-3");
                amrapControl.appendChild(amrapHeader);
                //Amrap Header Text Content - Content Div----------------------------------------------------------------
                amrapHeaderText = document.createElement("div");
                amrapHeaderText.classList.add("accordion-header-text", "style-2");

                amrapHeader.appendChild(amrapHeaderText);

                //Amrap Header Top Content - Content Div----------------------------------------------------------------
                amrapHeaderTop = document.createElement("div");
                amrapHeaderTop.classList.add("accordion-header-top-content");

                amrapHeaderText.appendChild(amrapHeaderTop);

                //Amrap Exercise Title Text----------------------------------------------------------------
                amrapTitle = document.createElement("h2");
                amrapTitle.classList.add("main-sub-heading-style-1");
                amrapTitle.innerHTML = amrapControlName;
                amrapHeaderTop.appendChild(amrapTitle);
                //Counter Content Div----------------------------------------------------------------
                amrapTrigger = document.createElement("div");
                amrapTrigger.classList.add("diff-trigger");
                amrapHeader.appendChild(amrapTrigger);
                //Minus Button----------------------------------------------------------------
                amrapMinus = document.createElement("div");
                amrapMinus.classList.add("counter-btn", "minus-btn");
                amrapTrigger.appendChild(amrapMinus);
                //Minus Button > Left Arrow----------------------------------------------------------------
                amrapMinusArrow = document.createElement("div");
                amrapMinusArrow.classList.add("counter-arrow", "left");
                amrapMinus.appendChild(amrapMinusArrow);
                //Current Diffculty Text "1" - example----------------------------------------------------------------
                amrapCounter = document.createElement("div");
                amrapCounter.classList.add("num", "current", "current-num");
                
                /*if (localStorage.getItem("diffStart") !== null)
                {
                  amrapCounter.innerHTML = localStorage.getItem("diffStart");
                }
                else {
                  amrapCounter.innerHTML = videoSrcIndex[i];
                }*/

                amrapCounter.innerHTML = videoSrcIndex[i];

                amrapTrigger.appendChild(amrapCounter);

                //Divider "/" Text----------------------------------------------------------------
                amrapDivider = document.createElement("div");
                amrapDivider.classList.add("num", "divider");
                amrapDivider.innerHTML = "/";
                amrapTrigger.appendChild(amrapDivider);
                //Limit Text
                amrapLimit = document.createElement("div");
                amrapLimit.classList.add("num", "limit", "limit-num");
                amrapLimit.innerHTML = amrapMaxLimit;
                amrapTrigger.appendChild(amrapLimit);
                //Plus Button----------------------------------------------------------------
                amrapPlus = document.createElement("div");
                amrapPlus.classList.add("counter-btn", "Plus-btn");
                amrapTrigger.appendChild(amrapPlus);
                //Plus Button > Right Arrow----------------------------------------------------------------
                amrapPlusArrow = document.createElement("div");
                amrapPlusArrow.classList.add("counter-arrow", "right");
                amrapPlus.appendChild(amrapPlusArrow);
                //Push Both Controls----------------------------------------------------------------
                controlPlusNumber.push(amrapPlus);
                controlMinusNumber.push(amrapMinus);

                controlPlusNumber[i].addEventListener("click", () => {
                  if (videoSrcIndex[i] < amrapMaxLimit) {
                    videoSrcIndex[i]++;
                    localStorage.setItem("diffStart", videoSrcIndex[i]);
                    currentNumberText = videoSrcIndex[i] + 1
                    amrapCounter.innerHTML = currentNumberText;
                  }
                });

                controlMinusNumber[i].addEventListener("click", () => {
                  if (videoSrcIndex[i] > amrapMinNumm) {
                    videoSrcIndex[i]--;
                    localStorage.setItem("diffStart", videoSrcIndex[i]);
                    currentNumberText = videoSrcIndex[i] + 1
                    amrapCounter.innerHTML = currentNumberText;
                  }
                });

                let srcIndex = 0;
                let trackerTime = 0;
                vidSrc.src = secondaryResponse.data[srcIndex].Video[videoSrcIndex[srcIndex] - 1].url;

                checkAmrapVideo = setInterval(() => {

                  if(!vidSrc.paused)
                  {       
                  if (/*Math.floor(vidSrc.currentTime)*/ trackerTime === 5 /*Math.floor(vidSrc.duration)*/) 
                  {
                    changeVideo = true;
                    if (changeVideo == true)
                    {
                      videoSource();
                      trackerTime = 0
                    } 
                  }
                  else {
                    trackerTime = trackerTime + 1
                  }
                  }
                  else if (vidSrc.paused) {
                    trackerTime = trackerTime;
                  }
                }, 1000);

                function videoSource()
                {
                    srcIndex++;
                    if (srcIndex < amrapLength) {
                      vidSrc.src = secondaryResponse.data[srcIndex].Video[videoSrcIndex[srcIndex] - 1].url;
 
                      let playPromise = vidSrc.play();

                      if (playPromise !== undefined) {
                        playPromise.then(_ => {
                          vidSrc.play();
                        })
                        .catch(error => {
                          console.log = function() {} 
                        });
                      }
                    }
                    else if (srcIndex >= amrapLength)
                    {
                      srcIndex = 0;
                      vidSrc.src = secondaryResponse.data[srcIndex].Video[videoSrcIndex[srcIndex] - 1].url;    
                      let playPromise = vidSrc.play();

                      if (playPromise !== undefined) {
                        playPromise.then(_ => {
                          vidSrc.play();
                        })
                        .catch(error => {
                          console.log = function() {} 
                        });
                      }
                    }
                }
              }
            }
            //console.log("---------------------------------------");
            //console.log("Current Diff:", secondaryResponse);
          });
        }
      } else {

        clearInterval(checkAmrapVideo);
        loadSingleData();
        
        async function loadSingleData() {

          Wized.request.await("Load Exercise Diff", (response) => {
            const amrapBlock = document.querySelector('.amrap_heading_block');
            amrapBlock.remove();
            
            secondaryResponse = response;
            let defaultDiff;
            
            if(mainResponse.data[parseInt(roundParam)].Amrap_Linked_Exercises.includes("True"))
            {
              defaultDiff = roundDiffLevel[mainResponse.data[parseInt(roundParam)].Amrap_Linked_Exercises.length + 1];
            }
            else {
              defaultDiff = roundDiffLevel[parseInt(exercisesParam)];
            }
            diffCurrent = defaultDiff - 1;
            currentNum.innerHTML = defaultDiff;

            /*newcookieIndex =
            secondaryResponse.data[0].Video.length*/

            diffLength =
            secondaryResponse.data[0].Video.length;
            maxLimit = diffLength;
            limitNum.innerHTML = maxLimit;

            DiffControlsSingle();
            vidSrc.src =
            secondaryResponse.data[0].Video[diffCurrent].url
            
            // Diff Increase Click Controls - Single Exercise
            function DiffControlsSingle() {
              const singleTitle = document.querySelector('.single-title');
              singleTitle.textContent = secondaryResponse.data[0].Exercise_Name
              plusBtn.addEventListener("click", function () {
                if (diffCurrent + 1 < maxLimit) {
                  diffCurrent++;
                  amount++;
                  localStorage.setItem("diffStart", diffCurrent);
                  currentNum.innerHTML = diffCurrent + 1;
                  enableDisabledStates();
                  playVideoDiff();
                  vidSrc.src =
                  secondaryResponse.data[0].Video[
                      diffCurrent
                    ].url;
                  setTimeout(enableActiveStates, 1500);
                  setTimeout(autoPlayVideo, 2000);
                } else {
                  return false;
                }
              });

              // Diff Decrease Click Controls - Single Exercise
              minusBtn.addEventListener("click", function () {
                if (diffCurrent > minLimit) {
                  diffCurrent--;
                  amount--;
                  localStorage.setItem("diffStart", diffCurrent);
                  currentNum.innerHTML = diffCurrent + 1;
                  enableDisabledStates();
                  playVideoDiff();
                  vidSrc.src =
                    secondaryResponse.data[0].Video[
                      diffCurrent
                    ].url;
                  setTimeout(enableActiveStates, 1500);
                  setTimeout(autoPlayVideo, 2000);
                } else {
                  return false;
                }
              });
            }

            //console.log("---------------------------------------");
            //console.log("Current Diff:", secondaryResponse);
          });
        }
      }

      audioSrc.src = mainResponse.data[parseInt(roundParam)].Audio_Source_Linked_Exercises[parseInt(exercisesParam)].url;

      let clearStates = setTimeout(() => {
        enableActiveStates();
        clearTimeout(clearStates);
      }, 1500);

      nextButton.addEventListener("click", () => {
        updateParams();
      });

      prevButton.addEventListener("click", backTrackParams);

      workoutExitButton.addEventListener("click", exitParams);

      function exitParams() {
        workoutExitButton.href = "/workout-overview?workout=" + workoutParam;
      }

      function updateParams() {
        setTimeout(() => {
        if(mainResponse.data[parseInt(roundParam)].Amrap_Linked_Exercises.includes("True"))
        {
          if(parseInt(exercisesParam) < mainResponse.data[parseInt(roundParam)].Amrap_Linked_Exercises.length - 1)
          {
            getExercisesNum = checkurl.get("exercises");
            getExercisesNum = parseInt(getExercisesNum) + 1;
            setExercisesNum = checkurl.set("exercises", getExercisesNum.toString());
            window.location.href = url.toString();
          }
          else {
            getRoundNum = checkurl.get("round");
            getRoundNum = parseInt(getRoundNum) + 1;
            setRoundNum = checkurl.set("round", getRoundNum.toString());
            getExercisesNum = checkurl.get("exercises");
            getExercisesNum = 0;
            setExercisesNum = checkurl.set("exercises", getExercisesNum.toString());
      
            window.location.href = url.toString();
          }
        }
        else {
        getExercisesNum = checkurl.get("exercises");
        getExercisesNum = parseInt(getExercisesNum) + 1;
        setExercisesNum = checkurl.set("exercises", getExercisesNum.toString());
        window.location.href = url.toString();
        }
        }, 1000);
      }

      function backTrackParams() {
        setTimeout(() => {
        if (parseInt(exercisesParam) < mainResponse.data[parseInt(roundParam)].Diff_ID_Linked_Exercises.length - 1) {
        getExercisesNum = checkurl.get("exercises");
        getExercisesNum = parseInt(getExercisesNum) - 1;
        setExercisesNum = checkurl.set("exercises", getExercisesNum.toString());
        }

        window.location.href = url.toString();
        //window.history.replaceState(null, null, url.toString());
        //checkParam()
      }, 1000);
      }

      //AUTOPLAYER
      if ((parseInt(exercisesParam) > 0 && amrapBool == "False") || (parseInt(exercisesParam) > 0 && amrapBool == "True" && videoIndex === 0)) 
      {
        setTimeout(autoPlayVideo, 3000);
      } else if ((parseInt(exercisesParam) > 0 && amrapBool == "True" && videoIndex === 0) || exerciseParam === 0) {
        setTimeout(autoPlayVideo, 3000);
      }

      //let counter = repAmount;
      let clickNum = 0;

      playButton.addEventListener("click", function () {
        if (clickNum < 1) {
          //playVoice();

          if(voiceValue !== "off")
          {
            let promise = document.querySelector('#voiceSrc').play();
            if (promise !== undefined) {
                promise.then(_ => {
                voiceSrc.play();
                }).catch(error => {
                  voiceSrc.play();
              });
            }
          } 
          //Conditions
          roundType();
        }
        playVideo();
        clickNum = clickNum + 1;
      });
    //} 

    function roundType() {
      if (repType === "Time") {
        timer();
      } else if (repType === "Reps") {
        repCount();
      }
      //console.log("---------------------------------------");
      //console.log(repType, "Applied To The Exercise");
    }

    function timer() {
      let counter = repAmount;
      let percentage = counter / 100 * 100;
      repText.innerHTML = repType;
      setProgress(percentage);
      let timer = setInterval(function () {
        timerConversion(counter);
        timerText.innerHTML = minutes + ":" + seconds;
        if (!timerText.classList.contains("pausetime")) {
          counter--;
          setProgress(counter);
          if (counter < 0) {
              playSiren();
              nextButton.click();
            clearInterval(timer);
            clearInterval(checkAmrap);
            //console.log("---------------------------------------");
            //console.log("Completed");
          }
        }
      }, 1000);
    }

    function setProgress(percent) {
      let progress = document.querySelector('.progressWheel');
      let radius = progress.r.baseVal.value;
      let circumference = radius * 2 * Math.PI;
      progress.style.strokeDasharray = circumference;
      progress.style.strokeDashoffset = circumference - (percent / 100) * circumference;
    }

    function repCount() {
      progressEl.style.display = "none";
      let counter = repAmount;
      repText.innerHTML = repType;
      timerText.innerHTML = counter;
    }

    function playVideo() {
      let video = document.getElementById("video");
      if (video.paused) {
        video.play();
        playButton.classList.toggle("pause");
        timerText.classList.remove("pausetime");
        //console.log("---------------------------------------");
        //console.log("Video Duration", video.duration + "s");
      } else {
        video.pause();
        playButton.classList.toggle("pause");
        timerText.classList.add("pausetime");
      }
    }

    function playVideoDiff() {
      let video = document.getElementById("video");
      if (!video.paused) {
        video.pause();
        playButton.classList.toggle("pause");
        timerText.classList.add("pausetime");
        //console.log("---------------------------------------");
        //console.log("Video Duration", video.duration + "s");
      }
    }

    function playSiren() {
      if (sirenSrc.paused) {
        sirenSrc.play();
      } else {
        sirenSrc.pause();
      }
    }

    function playVoice() {
        if (voiceSrc.pause) {
          voiceSrc.play();
        } else {
          voiceSrc.pause();
        }
    }
  });
  
  //roundEnableLoad();
  //setTimeout(nextPage, 2000);
  sirenEnableLoad();
  voiceEnableLoad();

  siren.addEventListener("click", function () {
    sirenEnableClick();
  });

  voice.addEventListener("click", function () {
    voiceEnableClick();
  });

  function enableDisabledStates() {
    playButton.style.display = "none";
    playButtonDisabled.style.display = "flex";
    //
    nextButton.style.display = "none";
    nextButtonDisabled.style.display = "flex";
    //
    prevButton.style.display = "none";
    prevButtonDisabled.style.display = "flex";
    progressEl.style.display = "none";
  }

  function enableActiveStates() {
    playButton.style.display = "flex";
    playButtonDisabled.style.display = "none";
    //
    nextButton.style.display = "flex";
    nextButtonDisabled.style.display = "none";
    //
    prevButton.style.display = "flex";
    prevButtonDisabled.style.display = "none";
    progressEl.style.display = "flex";
  }

  function autoPlayVideo() {
    playButton.click();
  }

  function nextPage() {
    if (exerciseParam === undefined || exerciseParam === "undefined") {
      if (refreshNum < 1) {
        nextButton.click();
      }
      playButton.style.display = "none";
      playButtonDisabled.style.display = "flex";
      //
      nextButton.style.display = "none";
      nextButtonDisabled.style.display = "flex";
      //
      prevButton.style.display = "none";
      prevButtonDisabled.style.display = "flex";
    }
    refreshNum = refreshNum + 1;
  }

  function sirenEnableClick() {
    if (sirenText.innerHTML === "Off") {
      localStorage.setItem("siren", "on");
      voiceSrc.play();
      sirenText.innerHTML = "On";
      sirenToggleOn.classList.add("on");
    } 
    else if (sirenText.innerHTML === "On") {
      localStorage.setItem("siren", "off");
      voiceSrc.pause();
      voiceSrc.currentTime = "0";
      sirenText.innerHTML = "Off";
      sirenToggleOn.classList.remove("on");
    }
  }

  function voiceEnableClick() {
    if (voiceText.innerHTML === "Off") {
      localStorage.setItem("voice", "on");
      voiceSrc.play();
      voiceText.innerHTML = "On";
      voiceToggleOn.classList.add("on");
    } 
    else if (voiceText.innerHTML === "On") {
      localStorage.setItem("voice", "off");
      voiceSrc.pause();
      voiceSrc.currentTime = "0";
      voiceText.innerHTML = "Off";
      voiceToggleOn.classList.remove("on");
    }
  }

  function sirenEnableLoad() {
    // Siren Intialising On
    if (sirenValue === undefined || sirenValue === null) {
      localStorage.setItem("siren", "on");
      sirenText.innerHTML = "On";
      sirenToggleOn.classList.add("on");
    }
    // Siren On
    else if (sirenValue === "on") {
      sirenText.innerHTML = "On";
      sirenToggleOn.classList.add("on");
    }
    // Siren Off
    else if (sirenValue === "off") {
      sirenText.innerHTML = "Off";
      sirenToggleOn.classList.remove("on");
    }
  }

  function voiceEnableLoad() {
    // Voice Intialising On
    if (voiceValue == undefined || voiceValue == null) {
      localStorage.setItem("voice", "on");
      voiceText.innerHTML = "On";
      voiceToggleOn.classList.add("on");
    }
    // Voice On
    else if (voiceValue == "on") {
      voiceText.innerHTML = "On";
      voiceToggleOn.classList.add("on");
    }
    // Voice Off
    else if (voiceValue == "off") {
      voiceText.innerHTML = "Off";
      voiceToggleOn.classList.remove("on");
    }
  }

  $(document).ready(function () {
    const scrollBtn = $(".panel-button");

    scrollBtn.click(() => {
      setTimeout(() => {
        removeHash();
      }, 0);
    });
    function removeHash() {
      history.replaceState(
        "",
        document.title,
        window.location.origin +
          window.location.pathname +
          window.location.search
      );
    }
  });
};