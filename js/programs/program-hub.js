anime({targets:".path3",strokeDashoffset:[anime.setDashoffset,0],easing:"cubicBezier(.5, .05, .1, .3)",duration:2e3,delay:function(e,o){return 250*o},direction:"alternate",loop:!0}),Wized.request.await("Load Users Program Hub",(e=>{const o=e.data;let r;
  //currentWeek = currentUser.Count_weeks[0]
  r=(o.User_Week_Tracker,o.Count_weeks[0],o.Program_Week_Tracker),
  // Console.log Request
  //console.log("User Request:", currentUser);
  Wized.request.await("Load Program",(e=>{const t=e.data;console.log("Program:",t.ID),
  // Console.log Request
  //console.log("Current Program Request:", program);
  Wized.request.await("Load weeks - HUB",(e=>{const a=e.data;let s=[];a.forEach(((e,r)=>{"Completed_Workouts_ID_Program"in o?s.push({programs:o.Completed_Workouts_ID_Program[r],workouts:o.Completed_Workouts[r],weeks:o.Completed_Workout_Week[r]}):s.push({programs:!1,workouts:!1,weeks:!1})}));
  // Console.log Request
  //console.log("Program Request:", currentProgram);
  const n=[];a.forEach(((e,o)=>{n.push({Week:e.Week,WorkoutName:e.Workout_Names,WorkoutID:e.Workouts,ProgramID:e.Program_ID[0],AmountCompleted:0})}));let m=
  //console.log("Current Completed:", workoutsCompleted);
  // New Code 12/02/2024 - Fixing the progress on program hub
  function checkProgress(){if("Completed_Workout_Week"in o){let e=[],r=[];
  // Program Data loop
  return a.forEach(((o,r)=>{e.push({programName:t.Title,programID:t.ID,programWeek:a[r].Week,programWorkouts:a[r].Workouts,completeIndices:Array(a[r].Workouts.length).fill(!1),completedCount:0})})),
  //console.log("ProgramData:", programData);
  // User Completed Data loop
  o.Completed_Workouts.forEach(((e,t)=>{r.push({programName:o.Completed_Workouts_Title_Program[t],programID:o.Completed_Workouts_ID_Program[t],programWeek:o.Completed_Workout_Week[t],programWorkout:o.Completed_Workout_ID[t]})})),
  //console.log("CompletedData:", completedData);
  e.forEach(((e,o)=>{r.forEach(((o,r)=>{if(e.programName==o.programName&&e.programID==o.programID&&e.programWeek==o.programWeek&&e.programWorkouts.includes(o.programWorkout)){
  //console.log("It has this workout", "Week:", w.programWeek, "Program Workout:", w.programWorkouts.indexOf(wc.programWorkout), "Completed Workout:", wc.programWorkout);
  // Find index of wc.programWorkout in w.completeIndices
  const r=e.programWorkouts.indexOf(o.programWorkout);
  // Set the value at workoutIndex to true
  e.completeIndices[r]=!0,e.completedCount+=1}}))})),e}return this.startedNone=!0,!1}();
  // Start Vue Intializer
  const{createApp:d}=Vue;d({data:()=>({User:o,Program:a,ProgramImage:o.Program_Image,SessionAmount:o.Q7[0],UserWeek:r,CurrentProgram:t,Recoveries:null,CompletedWorkouts:m,nextWorkout:!1,nextWorkoutID:null,programPop:!1,completed:0,startedNone:!1,recomendedProgram:null,finishedProgram:null}),methods:{popupOff(){this.programPop=!this.programPop},async completeProgram(e,o){document.querySelector(".loading-state-v2").style.display="flex",e.currentTarget.textContent="Loading...","questionnare"===o?(await Wized.request.execute("Complete Program"),setTimeout((()=>{window.location.href="/questionnaire-update"}),3e3)):"recommended"===o&&(await Wized.request.execute("Complete Program Recommended"),setTimeout((()=>{window.location.href="/program-hub"}),3e3))},async addProgram(e,o){document.querySelector(".loading-state-v2").style.display="flex",e.currentTarget.textContent="Loading...","questionnare"===o?setTimeout((()=>{window.location.href="/questionnaire-update"}),3e3):"recommended"===o&&(await Wized.request.execute("Add New Program"),setTimeout((()=>{window.location.href="/program-hub"}),3e3))},async getCompletedPrograms(){await Wized.request.execute("Read Completed Programs");
  //console.log("Read Completed: ", data)
  //console.log("Completed: ", response)
  (await Wized.data.get("r.182.d")).forEach((e=>{e.Completed_Record_ID===o.Add_Program[0]?this.finishedProgram=!0:this.finishedProgram=!1}))}},created(){document.getElementById("programLoading").classList.add("hide_program_loader"),
  //this.CompletedWorkouts = CompletedAmount;
  this.nextWorkout=false,this.nextWorkoutID=null;(async()=>{let e=await Wized.data.get("v.response");return this.Recoveries=e,e})().then((e=>console.log("Loaded")))},mounted(){this.recomendedProgram=t.Recommend_Program_ID,this.getCompletedPrograms(),
  /*if ('Program_Tracker_Percentage' in currentUser) { const programProgress = parseInt(currentUser.Program_Tracker_Percentage) if(programProgress >= 100) { this.programPop = true; } //console.log("Program: ", programProgress); //console.log("Program Finished Status: ", this.programPop) }*/
  // console.log('Recoveries', this.Recoveries)
  console.log("interaction loaded"),window.Webflow&&window.Webflow.destroy(),window.Webflow&&window.Webflow.ready(),window.Webflow&&window.Webflow.require("ix2").init(),document.dispatchEvent(new Event("readystatechange")),
  //console.log("Completed Array", this.CompletedWorkouts)
  //console.log("Next Workout", this.nextWorkoutID)
  //console.log("Progress", this.ProgramCompleted)
  sal({threshold:.5,once:!1});if(document.querySelectorAll(".completed-icon").forEach(((e,o)=>{e.classList.contains("completed")&&(this.completed=this.completed+1)})),document.querySelector(".loading-state-v2").style.display="none","Completed_Workout_Week"in o){
  // Progress Wheel
  const e=document.querySelectorAll(".workouts");let o=this.completed/e.length*100;new CircleProgress(".circle-latest").attr({max:100,value:o,textFormat:"percent",indeterminateText:0}),n.forEach(((e,o)=>{const r=document.querySelectorAll(".weeks")[o].querySelectorAll(".completed-icon");e.WorkoutID.forEach(((e,t)=>{r[t].classList.contains("completed")&&n[o].AmountCompleted++}))}))}}}).mount("#app");
  // End Vue Intializer
  }))}))}));