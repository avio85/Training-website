
/* v0.6.9 security: never allow credentials to remain in URL */
function scrubCredentialQueryFromUrl(){
  try{
    const url = new URL(window.location.href);
    const sensitive = ["password","pass","pwd","email"];
    let changed = false;
    sensitive.forEach(k=>{
      if(url.searchParams.has(k)){
        url.searchParams.delete(k);
        changed = true;
      }
    });
    if(changed){
      const clean = url.pathname + (url.searchParams.toString()?`?${url.searchParams.toString()}`:"") + url.hash;
      window.history.replaceState({}, document.title, clean);
    }
  }catch(e){}
}
scrubCredentialQueryFromUrl();
window.addEventListener("pageshow", scrubCredentialQueryFromUrl);
window.addEventListener("hashchange", scrubCredentialQueryFromUrl);

function forceSafeAuthForms(){
  ["loginForm","signupForm"].forEach(id=>{
    const box=document.getElementById(id);
    if(!box) return;
    // These are intentionally DIVs, not forms, to prevent browser GET submission.
    if(box.tagName==="FORM"){
      box.setAttribute("method","post");
      box.setAttribute("action","");
      box.setAttribute("onsubmit","return false;");
      box.addEventListener("submit", ev=>{ev.preventDefault();scrubCredentialQueryFromUrl();}, true);
    }
  });
}


const preloadedExercisePresentations = [
  {
    "title": "Exercise 1 (Part 1) - Aircraft Familiarisation",
    "filename": "Exercise_1_(Part_1)_-_Aircraft_Familiarisation.pdf",
    "original": "Exercise 1 (Part 1) - Aircraft Familiarisation.pdf",
    "url": "assets/exercises/Exercise_1_(Part_1)_-_Aircraft_Familiarisation.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 1 (Part 2) - Aircraft Familiarisation",
    "filename": "Exercise_1_(Part_2)_-_Aircraft_Familiarisation.pdf",
    "original": "Exercise 1 (Part 2) - Aircraft Familiarisation.pdf",
    "url": "assets/exercises/Exercise_1_(Part_2)_-_Aircraft_Familiarisation.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 1E (Part 1) - Emergency Drills",
    "filename": "Exercise_1E_(Part_1)_-_Emergency_Drills.pdf",
    "original": "Exercise 1E (Part 1) - Emergency Drills.pdf",
    "url": "assets/exercises/Exercise_1E_(Part_1)_-_Emergency_Drills.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 2 - Pre and Post Flight",
    "filename": "Exercise_2_-_Pre_and_Post_Flight.pdf",
    "original": "Exercise 2 - Pre and Post Flight.pdf",
    "url": "assets/exercises/Exercise_2_-_Pre_and_Post_Flight.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 3 - Air  Experience",
    "filename": "Exercise_3_-_Air__Experience.pdf",
    "original": "Exercise 3 - Air  Experience.pdf",
    "url": "assets/exercises/Exercise_3_-_Air__Experience.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 4 (Part 1) - Effects of Controls",
    "filename": "Exercise_4_(Part_1)_-_Effects_of_Controls.pdf",
    "original": "Exercise 4 (Part 1) - Effects of Controls.pdf",
    "url": "assets/exercises/Exercise_4_(Part_1)_-_Effects_of_Controls.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 4 (Part 2) - Effects of Controls",
    "filename": "Exercise_4_(Part_2)_-_Effects_of_Controls.pdf",
    "original": "Exercise 4 (Part 2) - Effects of Controls.pdf",
    "url": "assets/exercises/Exercise_4_(Part_2)_-_Effects_of_Controls.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 5 - Taxiing",
    "filename": "Exercise_5_-_Taxiing.pdf",
    "original": "Exercise 5 - Taxiing.pdf",
    "url": "assets/exercises/Exercise_5_-_Taxiing.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 6 (Part 1) - Straight and Level",
    "filename": "Exercise_6_(Part_1)_-_Straight_and_Level.pdf",
    "original": "Exercise 6 (Part 1) - Straight and Level.pdf",
    "url": "assets/exercises/Exercise_6_(Part_1)_-_Straight_and_Level.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 6 (Part 2) - Straight and Level",
    "filename": "Exercise_6_(Part_2)_-_Straight_and_Level.pdf",
    "original": "Exercise 6 (Part 2) - Straight and Level.pdf",
    "url": "assets/exercises/Exercise_6_(Part_2)_-_Straight_and_Level.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 7 (Part 1) - Climbing",
    "filename": "Exercise_7_(Part_1)_-_Climbing.pdf",
    "original": "Exercise 7 (Part 1) - Climbing.pdf",
    "url": "assets/exercises/Exercise_7_(Part_1)_-_Climbing.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 7 (Part 2) - Climbing with Flap",
    "filename": "Exercise_7_(Part_2)_-_Climbing_with_Flap.pdf",
    "original": "Exercise 7 (Part 2) - Climbing with Flap.pdf",
    "url": "assets/exercises/Exercise_7_(Part_2)_-_Climbing_with_Flap.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 8 (Part 1) - Descending",
    "filename": "Exercise_8_(Part_1)_-_Descending.pdf",
    "original": "Exercise 8 (Part 1) - Descending.pdf",
    "url": "assets/exercises/Exercise_8_(Part_1)_-_Descending.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 8 (Part2)",
    "filename": "Exercise_8_(Part2).pdf",
    "original": "Exercise 8 (Part2).pdf",
    "url": "assets/exercises/Exercise_8_(Part2).pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 9 (Part 1) - Turning",
    "filename": "Exercise_9_(Part_1)_-_Turning.pdf",
    "original": "Exercise 9 (Part 1) - Turning.pdf",
    "url": "assets/exercises/Exercise_9_(Part_1)_-_Turning.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 9 (Part 2) - Climbing and Descending Turns",
    "filename": "Exercise_9_(Part_2)_-_Climbing_and_Descending_Turns.pdf",
    "original": "Exercise 9 (Part 2) - Climbing and Descending Turns.pdf",
    "url": "assets/exercises/Exercise_9_(Part_2)_-_Climbing_and_Descending_Turns.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 10A Slow Flight",
    "filename": "Exercise_10A_Slow_Flight.pdf",
    "original": "Exercise 10A Slow Flight.pdf",
    "url": "assets/exercises/Exercise_10A_Slow_Flight.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 10B (Part 1) - Stalling",
    "filename": "Exercise_10B_(Part_1)_-_Stalling.pdf",
    "original": "Exercise 10B (Part 1) - Stalling.pdf",
    "url": "assets/exercises/Exercise_10B_(Part_1)_-_Stalling.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 10B (Part 2) Stalling New",
    "filename": "Exercise_10B_(Part_2)_Stalling_New.pdf",
    "original": "Exercise 10B (Part 2) Stalling New.pdf",
    "url": "assets/exercises/Exercise_10B_(Part_2)_Stalling_New.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 11 Spinning",
    "filename": "Exercise_11_Spinning.pdf",
    "original": "Exercise 11 Spinning.pdf",
    "url": "assets/exercises/Exercise_11_Spinning.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 12-13 Abandoned TO",
    "filename": "Exercise_12-13_Abandoned_TO.jpg",
    "original": "Exercise 12-13 Abandoned TO.jpg",
    "url": "assets/exercises/Exercise_12-13_Abandoned_TO.jpg",
    "type": "JPG"
  },
  {
    "title": "Exercise 12-13 EFATO",
    "filename": "Exercise_12-13_EFATO.jpg",
    "original": "Exercise 12-13 EFATO.jpg",
    "url": "assets/exercises/Exercise_12-13_EFATO.jpg",
    "type": "JPG"
  },
  {
    "title": "Exercise 12 (Part 1)",
    "filename": "Exercise_12_(Part_1).pdf",
    "original": "Exercise 12 (Part 1).pdf",
    "url": "assets/exercises/Exercise_12_(Part_1).pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 12 (Part 2)",
    "filename": "Exercise_12_(Part_2).pdf",
    "original": "Exercise 12 (Part 2).pdf",
    "url": "assets/exercises/Exercise_12_(Part_2).pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 13 (Part 1)",
    "filename": "Exercise_13_(Part_1).pdf",
    "original": "Exercise 13 (Part 1).pdf",
    "url": "assets/exercises/Exercise_13_(Part_1).pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 13 (Part 2)",
    "filename": "Exercise_13_(Part_2).pdf",
    "original": "Exercise 13 (Part 2).pdf",
    "url": "assets/exercises/Exercise_13_(Part_2).pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 15 Advanced Turns",
    "filename": "Exercise_15_Advanced_Turns.pdf",
    "original": "Exercise 15 Advanced Turns.pdf",
    "url": "assets/exercises/Exercise_15_Advanced_Turns.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 16",
    "filename": "Exercise_16.pdf",
    "original": "Exercise 16.pdf",
    "url": "assets/exercises/Exercise_16.pdf",
    "type": "PDF"
  },
  {
    "title": "Exercise 17 PRC Landings",
    "filename": "Exercise_17_PRC_Landings.pdf",
    "original": "Exercise 17 PRC Landings.pdf",
    "url": "assets/exercises/Exercise_17_PRC_Landings.pdf",
    "type": "PDF"
  },
  {
    "title": "Go AROUND",
    "filename": "Go_AROUND.pdf",
    "original": "Go AROUND.pdf",
    "url": "assets/exercises/Go_AROUND.pdf",
    "type": "PDF"
  },
  {
    "title": "OH Departure",
    "filename": "OH_Departure.pdf",
    "original": "OH Departure.pdf",
    "url": "assets/exercises/OH_Departure.pdf",
    "type": "PDF"
  },
  {
    "title": "Rejoin",
    "filename": "Rejoin.pdf",
    "original": "Rejoin.pdf",
    "url": "assets/exercises/Rejoin.pdf",
    "type": "PDF"
  }
];

const defaultWaveSchedule = [
  {
    "id": "f1",
    "date": "2026-05-03",
    "time": "0800",
    "aircraft": "C172",
    "student": "Nir K",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f2",
    "date": "2026-05-03",
    "time": "0800",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": "1h"
  },
  {
    "id": "f3",
    "date": "2026-05-03",
    "time": "1000",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f4",
    "date": "2026-05-03",
    "time": "1000",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f5",
    "date": "2026-05-03",
    "time": "1200",
    "aircraft": "C172",
    "student": "Nir D",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f6",
    "date": "2026-05-03",
    "time": "1200",
    "aircraft": "C152",
    "student": "Ofek",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f7",
    "date": "2026-05-03",
    "time": "1400",
    "aircraft": "C172",
    "student": "Nir K",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f8",
    "date": "2026-05-03",
    "time": "1400",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": "1h"
  },
  {
    "id": "f9",
    "date": "2026-05-03",
    "time": "1600",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": "1h"
  },
  {
    "id": "f10",
    "date": "2026-05-03",
    "time": "1600",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f11",
    "date": "2026-05-04",
    "time": "0800",
    "aircraft": "C172",
    "student": "Nir K",
    "instructor": "Avi",
    "note": "3h"
  },
  {
    "id": "f12",
    "date": "2026-05-04",
    "time": "0800",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": "1h"
  },
  {
    "id": "f13",
    "date": "2026-05-04",
    "time": "1000",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f14",
    "date": "2026-05-04",
    "time": "1200",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f15",
    "date": "2026-05-04",
    "time": "1200",
    "aircraft": "C152",
    "student": "Ofek",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f16",
    "date": "2026-05-04",
    "time": "1400",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": "1h"
  },
  {
    "id": "f17",
    "date": "2026-05-04",
    "time": "1400",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f18",
    "date": "2026-05-04",
    "time": "1600",
    "aircraft": "C172",
    "student": "Nir D",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f19",
    "date": "2026-05-04",
    "time": "1600",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f20",
    "date": "2026-05-05",
    "time": "0800",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f21",
    "date": "2026-05-05",
    "time": "0800",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f22",
    "date": "2026-05-05",
    "time": "1000",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": "1h"
  },
  {
    "id": "f23",
    "date": "2026-05-05",
    "time": "1000",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": "1h"
  },
  {
    "id": "f24",
    "date": "2026-05-05",
    "time": "1200",
    "aircraft": "C172",
    "student": "Nir K",
    "instructor": "Avi",
    "note": "3h"
  },
  {
    "id": "f25",
    "date": "2026-05-05",
    "time": "1200",
    "aircraft": "C152",
    "student": "Ofek",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f26",
    "date": "2026-05-05",
    "time": "1400",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f27",
    "date": "2026-05-05",
    "time": "1600",
    "aircraft": "C172",
    "student": "Nir D",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f28",
    "date": "2026-05-05",
    "time": "1600",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f29",
    "date": "2026-05-06",
    "time": "0800",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f30",
    "date": "2026-05-06",
    "time": "0800",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f31",
    "date": "2026-05-06",
    "time": "1000",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f32",
    "date": "2026-05-06",
    "time": "1000",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f33",
    "date": "2026-05-06",
    "time": "1200",
    "aircraft": "C172",
    "student": "Nir K",
    "instructor": "Avi",
    "note": "EXAM"
  },
  {
    "id": "f34",
    "date": "2026-05-06",
    "time": "1200",
    "aircraft": "C152",
    "student": "Ofek",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f35",
    "date": "2026-05-06",
    "time": "1400",
    "aircraft": "C172",
    "student": "Nir D",
    "instructor": "Avi",
    "note": "EXAM"
  },
  {
    "id": "f36",
    "date": "2026-05-06",
    "time": "1400",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f37",
    "date": "2026-05-06",
    "time": "1600",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f38",
    "date": "2026-05-06",
    "time": "1600",
    "aircraft": "C152",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f39",
    "date": "2026-05-07",
    "time": "0800",
    "aircraft": "C172",
    "student": "Aviad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f40",
    "date": "2026-05-07",
    "time": "0800",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f41",
    "date": "2026-05-07",
    "time": "1000",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f42",
    "date": "2026-05-07",
    "time": "1000",
    "aircraft": "C152",
    "student": "Ofek",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f43",
    "date": "2026-05-07",
    "time": "1200",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f44",
    "date": "2026-05-07",
    "time": "1200",
    "aircraft": "C152",
    "student": "Lior",
    "instructor": "Amir",
    "note": ""
  },
  {
    "id": "f45",
    "date": "2026-05-07",
    "time": "1400",
    "aircraft": "C172",
    "student": "Nir D",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f46",
    "date": "2026-05-07",
    "time": "1600",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f47",
    "date": "2026-05-08",
    "time": "0800",
    "aircraft": "C152",
    "student": "Ofek",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f48",
    "date": "2026-05-08",
    "time": "1000",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f49",
    "date": "2026-05-08",
    "time": "1200",
    "aircraft": "C172",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f50",
    "date": "2026-05-08",
    "time": "1400",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f51",
    "date": "2026-05-08",
    "time": "1600",
    "aircraft": "C172",
    "student": "Ofek",
    "instructor": "Avi",
    "note": "C172/C152"
  },
  {
    "id": "f52",
    "date": "2026-05-09",
    "time": "0800",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f53",
    "date": "2026-05-09",
    "time": "1000",
    "aircraft": "C172",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f54",
    "date": "2026-05-09",
    "time": "1200",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f55",
    "date": "2026-05-09",
    "time": "1400",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f56",
    "date": "2026-05-09",
    "time": "1600",
    "aircraft": "C172",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f57",
    "date": "2026-05-10",
    "time": "0800",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f58",
    "date": "2026-05-10",
    "time": "1000",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f59",
    "date": "2026-05-10",
    "time": "1200",
    "aircraft": "C172",
    "student": "Aviad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f60",
    "date": "2026-05-10",
    "time": "1400",
    "aircraft": "C172",
    "student": "Ahmad",
    "instructor": "Avi",
    "note": ""
  },
  {
    "id": "f61",
    "date": "2026-05-10",
    "time": "1600",
    "aircraft": "C172",
    "student": "Harel",
    "instructor": "Avi",
    "note": ""
  }
];

let token=localStorage.getItem("token")||"";
let userRole=localStorage.getItem("role")||"";
let atplAiSettings={url:"https://avioren-aviation-mvp.onrender.com/",active:false};
let waveSchedule=[];let selectedWeatherAirport="LHKA";let slotEditFlightId=null;
const pageTitles={dashboard:"Dashboard",schedule:"Training schedule",briefingroom:"Briefing Room",modular:"Modular CPL",profile:"User Profile",admin:"Admin Panel",atplai:"ATPL AI"};
const waveDays=[{date:"2026-05-03",label:"May 3"},{date:"2026-05-04",label:"May 4"},{date:"2026-05-05",label:"May 5"},{date:"2026-05-06",label:"May 6"},{date:"2026-05-07",label:"May 7"},{date:"2026-05-08",label:"May 8"},{date:"2026-05-09",label:"May 9"},{date:"2026-05-10",label:"May 10"}];
const waveTimes=["0800","1000","1200","1400","1600"];const waveAircraft=["C172","C152"];const waveStudents=["Nir K","Nir D","Ofek","Harel","Lior","Aviad","Ahmad"];
const airportCharts={
LHKA:{name:"Kalocsa Airfield",chart:"https://storage.hungarocontrol.hu/media/958/VFR_LHKA_print_5n.pdf?_gl=1*1rt6n80*_gcl_au*MjQ1MTUxNTQzLjE3Nzc1NTU3MjQ.",maps:"https://www.google.com/maps/search/?api=1&query=Kalocsa%20Airfield%20LHKA",links:[{label:"Show LHKA VFR chart",url:"https://storage.hungarocontrol.hu/media/958/VFR_LHKA_print_5n.pdf?_gl=1*1rt6n80*_gcl_au*MjQ1MTUxNTQzLjE3Nzc1NTU3MjQ."}]},
LHJK:{name:"Jakab-Csík Airport",chart:"https://ais-en.hungarocontrol.hu/vfrmanual/LHJK",maps:"https://www.google.com/maps/search/?api=1&query=LHJK%20Jakab-Csik%20Airport",links:[{label:"Open LHJK VFR manual page",url:"https://ais-en.hungarocontrol.hu/vfrmanual/LHJK"}]},
LHPP:{name:"Pécs-Pogány",chart:"https://ais-en.hungarocontrol.hu/aip/2026-04-16/2026-04-16-AIRAC/graphics/eAIP/LH_AD_2_LHPP_VAC_en.pdf",maps:"https://www.google.com/maps/search/?api=1&query=LHPP%20Pecs%20Pogany%20Airport",links:[{label:"Show LHPP VAC",url:"https://ais-en.hungarocontrol.hu/aip/2026-04-16/2026-04-16-AIRAC/graphics/eAIP/LH_AD_2_LHPP_VAC_en.pdf"},{label:"Show LHPP ADC",url:"https://ais-en.hungarocontrol.hu/aip/2026-04-16/2026-04-16-AIRAC/graphics/eAIP/LH_AD_2_LHPP_ADC_en.pdf"}]},
LHSM:{name:"Hévíz-Balaton",chart:"https://ais-en.hungarocontrol.hu/aip/2026-04-16/2026-04-16-AIRAC/graphics/eAIP/LH_AD_2_LHSM_VAC_en.pdf",maps:"https://www.google.com/maps/search/?api=1&query=LHSM%20Heviz%20Balaton%20Airport",links:[{label:"Show LHSM VAC",url:"https://ais-en.hungarocontrol.hu/aip/2026-04-16/2026-04-16-AIRAC/graphics/eAIP/LH_AD_2_LHSM_VAC_en.pdf"},{label:"Show LHSM ADC",url:"https://ais-en.hungarocontrol.hu/aip/2026-04-16/2026-04-16-AIRAC/graphics/eAIP/LH_AD_2_LHSM_ADC_en.pdf"}]}};
const weatherAirportData={LHKA:{name:"Kalocsa Airfield",metarTaf:"https://metar-taf.com/metar/LHKA"},LHBP:{name:"Budapest Liszt Ferenc International",metarTaf:"https://metar-taf.com/metar/LHBP"},LHPP:{name:"Pécs-Pogány",metarTaf:"https://metar-taf.com/metar/LHPP"},LHKE:{name:"Kecskemét",metarTaf:"https://metar-taf.com/metar/LHKE"}};
function authHeaders(){return token?{Authorization:"Bearer "+token}:{}}function toast(m){const t=document.getElementById("toast");if(!t)return;t.textContent=m;t.classList.remove("hidden");setTimeout(()=>t.classList.add("hidden"),2600)}
function escapeHtml(v){return String(v??"").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;")}
function setAuthUi(){const logged=!!token;const s=document.getElementById("loginStatus");if(s)s.textContent=logged?(userRole==="admin"?"Admin online":"Member online"):"Guest mode";document.getElementById("logoutBtn")?.classList.toggle("hidden",!logged);const top=document.querySelector(".topbar .primary-button");if(top)top.classList.toggle("hidden",logged);document.querySelectorAll(".admin-only").forEach(e=>e.classList.toggle("hidden",userRole!=="admin"));document.querySelectorAll(".member-only").forEach(e=>e.classList.toggle("hidden",!logged));document.getElementById("scheduleGuestNotice")?.classList.toggle("hidden",logged)}
function openLoginModal(){document.getElementById("loginModal")?.classList.remove("hidden")}function closeLoginModal(){document.getElementById("loginModal")?.classList.add("hidden")}function logout(){localStorage.removeItem("token");localStorage.removeItem("role");token="";userRole="";setAuthUi();showPage("dashboard");toast("Logged out")}
function formDataFromContainer(container){
  const fd=new FormData();
  container.querySelectorAll("input,select,textarea").forEach(el=>{
    if(!el.name)return;
    if((el.type==="checkbox"||el.type==="radio")&&!el.checked)return;
    fd.append(el.name,el.value);
  });
  return fd;
}
async function postForm(url,form){
  const body=(form instanceof HTMLFormElement)?new FormData(form):formDataFromContainer(form);
  const r=await fetch(url,{method:"POST",headers:authHeaders(),body});
  const d=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(d.detail||"Request failed");
  return d;
}
function showPage(id){if(id==="schedule"&&!token){openLoginModal();toast("Login required to view schedule");return}const target=document.getElementById(id);if(!target)return;document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));target.classList.add("active");const title=document.getElementById("pageTitle");if(title)title.textContent=pageTitles[id]||"Avi Oren Aviation";document.querySelectorAll(".nav-item,.mobile-nav").forEach(b=>b.classList.toggle("active",b.dataset.page===id));if(id==="schedule")loadSchedule(false);if(id==="briefingroom"){renderPreloadedExercisePresentations();selectAirport("LHKA")}if(id==="admin"){renderAdminLists();loadAtplAiSettings()}}
async function loadAtplAiSettings(){const def="https://avioren-aviation-mvp.onrender.com/";try{const r=await fetch("/api/settings/atpl-ai");const d=await r.json();if(r.ok)atplAiSettings={url:d.url||def,active:!!d.active}}catch{atplAiSettings={url:def,active:false}}const u=document.getElementById("atplAiUrlInput"),a=document.getElementById("atplAiActiveInput");if(u)u.value=atplAiSettings.url||def;if(a)a.checked=!!atplAiSettings.active}
async function saveAtplAiSettings(e){e.preventDefault();const f=e.target,fd=new FormData();fd.append("url",f.url.value||"https://avioren-aviation-mvp.onrender.com/");fd.append("active",f.active.checked?"true":"false");try{const r=await fetch("/api/settings/atpl-ai",{method:"POST",headers:authHeaders(),body:fd});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||"Could not save ATPL AI settings");atplAiSettings={url:d.url,active:!!d.active};toast("ATPL AI settings saved")}catch(err){toast(err.message)}}
async function handleAtplAiClick(e){if(e){e.preventDefault();e.stopPropagation()}await loadAtplAiSettings();if(atplAiSettings.active&&atplAiSettings.url)window.open(atplAiSettings.url,"_blank","noopener");else showPage("atplai")}
function showBriefingTab(tab){document.querySelectorAll(".briefing-tab").forEach(b=>b.classList.toggle("active",b.dataset.briefingTab===tab));document.querySelectorAll(".briefing-tab-panel").forEach(p=>p.classList.toggle("active",p.id==="briefingTab-"+tab));if(tab==="airports")selectAirport("LHKA");if(tab==="weather")loadSelectedAirportWeather();if(tab==="notam")loadNotam();if(tab==="exercises")renderPreloadedExercisePresentations()}
function showChartInViewer(url){const f=document.getElementById("chartFrame"),o=document.getElementById("chartOpenLink");if(f)f.src=url;if(o)o.href=url}
function selectAirport(code){const item=airportCharts[code];if(!item)return;document.querySelectorAll(".airport-card").forEach(b=>b.classList.toggle("active",b.dataset.airport===code||b.querySelector("strong")?.innerText===code));document.getElementById("selectedAirportChip").textContent=code;document.getElementById("selectedAirportName").textContent=item.name;showChartInViewer(item.chart);const maps=document.getElementById("googleMapsLink");if(maps)maps.href=item.maps;const extra=document.getElementById("chartExtraLinks");if(extra)extra.innerHTML=(item.links||[]).map(l=>`<button class="ghost-button" type="button" onclick="showChartInViewer('${escapeHtml(l.url)}')">${escapeHtml(l.label)}</button>`).join("")}
function renderPreloadedExercisePresentations(){const grid=document.getElementById("exercisePresentationsGrid");if(!grid)return;grid.innerHTML=preloadedExercisePresentations.map(file=>{const icon=["JPG","JPEG","PNG"].includes(file.type)?"🖼️":"📄";return `<button class="exercise-thumb-card" onclick="openFilePreview('${escapeHtml(file.title)}', '${escapeHtml(file.url)}')"><div class="exercise-thumb"><span>${icon}</span><small>${escapeHtml(file.type)}</small></div><div class="exercise-thumb-text"><strong>${escapeHtml(file.title)}</strong><span>${escapeHtml(file.original)}</span></div></button>`}).join("")}
function openFilePreview(title,url){document.getElementById("filePreviewTitle").textContent=title;document.getElementById("filePreviewOpen").href=url;document.getElementById("filePreviewFrame").src=url;document.getElementById("filePreviewModal").classList.remove("hidden")}function closeFilePreview(){document.getElementById("filePreviewFrame").src="";document.getElementById("filePreviewModal").classList.add("hidden")}
function showAircraftTopic(id){document.querySelectorAll(".aircraft-topic").forEach(e=>e.classList.remove("active"));document.getElementById("topic-"+id)?.classList.add("active");document.querySelectorAll(".study-menu button").forEach(b=>b.classList.toggle("active",b.dataset.topic===id))}
async function loadHomeWeather(){const t=document.getElementById("homeTemp"),p=document.getElementById("homePressure"),w=document.getElementById("homeWind");if(!t||!p||!w)return;try{const r=await fetch("/api/weather/airport/LHKA");const d=await r.json();if(!r.ok)throw new Error("Weather request failed");const s=d.summary||{};t.textContent=s.temperature||"N/A";p.textContent=s.pressure||"N/A";w.textContent=s.wind||"N/A"}catch{t.textContent="N/A";p.textContent="N/A";w.textContent="N/A"}}
function selectWeatherAirport(icao){selectedWeatherAirport=icao;const d=weatherAirportData[icao];document.querySelectorAll(".weather-airport-tab").forEach(tab=>tab.classList.toggle("active",tab.dataset.icao===icao));document.getElementById("weatherAirportChip").textContent=icao;document.getElementById("weatherAirportName").textContent=d?.name||icao;document.getElementById("metarTafLink").href=d?.metarTaf||`https://metar-taf.com/metar/${icao}`;loadSelectedAirportWeather()}
async function loadSelectedAirportWeather(){const icao=selectedWeatherAirport||"LHKA",m=document.getElementById("airportMetarBox"),taf=document.getElementById("airportTafBox"),sum=document.getElementById("airportWeatherSummary");if(!m||!taf||!sum)return;m.textContent="Loading METAR...";taf.textContent="Loading TAF...";sum.innerHTML="<p>Loading general weather information...</p>";try{const r=await fetch(`/api/weather/airport/${encodeURIComponent(icao)}`);const d=await r.json();if(!r.ok)throw new Error(d.detail||"Weather fetch failed");m.textContent=d.metar||`No public METAR returned for ${icao}.`;taf.textContent=d.taf||`No public TAF returned for ${icao}.`;const s=d.summary||{};sum.innerHTML=`<div class="weather-summary-item"><span>Source airport used</span><strong>${escapeHtml(d.source_airport||"N/A")}</strong></div><div class="weather-summary-item"><span>Temperature</span><strong>${escapeHtml(s.temperature||"N/A")}</strong></div><div class="weather-summary-item"><span>Pressure / QNH</span><strong>${escapeHtml(s.pressure||"N/A")}</strong></div><div class="weather-summary-item"><span>Wind</span><strong>${escapeHtml(s.wind||"N/A")}</strong></div><div class="weather-summary-item"><span>Visibility</span><strong>${escapeHtml(s.visibility||"N/A")}</strong></div><div class="weather-summary-item"><span>Clouds</span><strong>${escapeHtml(s.clouds||"N/A")}</strong></div><div class="weather-summary-item"><span>Nearby fallback</span><strong>${d.used_fallback?"Yes":"No"}</strong></div>`}catch(err){m.textContent=`Could not load METAR for ${icao}.`;taf.textContent=`Could not load TAF for ${icao}.`;sum.innerHTML=`<p>${escapeHtml(err.message)}. Open the METAR-TAF page as fallback.</p>`}}
async function loadNotam(){const sel=document.getElementById("notamAirportSelect"),out=document.getElementById("notamOutput"),title=document.getElementById("notamTitle"),official=document.getElementById("notamOfficialLink");if(!sel||!out||!title)return;const icao=sel.value||"LHKE";title.textContent=`${icao} NOTAM`;out.textContent="Loading NOTAM...";if(official)official.href=`https://notams.aim.faa.gov/notamSearch/nsapp.html#/results?searchType=0&designatorsForLocation=${encodeURIComponent(icao)}`;try{const r=await fetch(`/api/notam/${encodeURIComponent(icao)}`);const d=await r.json();if(!r.ok)throw new Error(d.detail||"NOTAM fetch failed");out.textContent=d.notams||`No automatic NOTAM text returned for ${icao}. Use the official NOTAM search link.`}catch(err){out.textContent=`${err.message}\n\nUse the official NOTAM search link.`}}
function canEditSchedule(){return userRole==="admin"}async function loadSchedule(){const guest=document.getElementById("scheduleGuestMessage"),app=document.getElementById("waveScheduleApp");if(!token){guest?.classList.remove("hidden");app?.classList.add("hidden");return}guest?.classList.add("hidden");app?.classList.remove("hidden");try{const r=await fetch("/api/wave-schedule",{headers:authHeaders()});const d=await r.json();waveSchedule=(r.ok&&Array.isArray(d.flights))?d.flights:[]}catch{waveSchedule=[]}renderWaveCalendar()}
function formatWaveDayTitle(date,label){
  const d=new Date(`${date}T12:00:00`);
  if(Number.isNaN(d.getTime())) return label || date;
  const day=d.toLocaleDateString("en-US",{weekday:"long"});
  const dd=d.toLocaleDateString("en-GB",{day:"2-digit",month:"short"});
  return `${day} ${dd}`;
}

function renderWaveCalendar(){
  const cal=document.getElementById("waveCalendar");
  if(!cal)return;
  const admin=canEditSchedule();
  cal.innerHTML=waveDays.map(day=>`<section class="wave-day-card" data-date="${day.date}">
    <div class="wave-day-header">
      <span>${formatWaveDayTitle(day.date,day.label)}</span>
    </div>
    <div class="wave-day-grid">${waveTimes.map(time=>`<div class="wave-time-row"><div class="wave-time-label">${time}</div><div class="wave-slot-pair">${waveAircraft.map(ac=>renderWaveSlot(day.date,time,ac,admin)).join("")}</div></div>`).join("")}</div>
  </section>`).join("");
  if(admin)attachScheduleDragHandlers();
}


function openShareDailyScheduleModal(){
  const modal=document.getElementById("dailyScheduleShareModal");
  const select=document.getElementById("dailyScheduleShareDate");
  if(!modal||!select)return;
  select.innerHTML=waveDays.map(day=>`<option value="${day.date}">${escapeHtml(formatWaveDayTitle(day.date,day.label))}</option>`).join("");
  const firstWithFlights=waveDays.find(day=>waveSchedule.some(f=>f.date===day.date));
  if(firstWithFlights)select.value=firstWithFlights.date;
  modal.classList.remove("hidden");
}

function closeShareDailyScheduleModal(){
  document.getElementById("dailyScheduleShareModal")?.classList.add("hidden");
}

async function shareSelectedDailySchedule(){
  const select=document.getElementById("dailyScheduleShareDate");
  if(!select||!select.value)return toast("Choose a day");
  const day=waveDays.find(d=>d.date===select.value);
  const label=formatWaveDayTitle(select.value,day?.label||select.value);
  closeShareDailyScheduleModal();
  await createDayScheduleImage(select.value,label);
}


async function createDayScheduleImage(date,label){
  try{
    toast("Creating daily schedule image...");
    const canvas=buildTwoColumnDayCanvas(date,label);
    await shareOrDownloadCanvas(canvas,date,label);
  }catch(err){
    console.error(err);
    toast("Could not create daily image.");
  }
}

async function exportFullWaveImage(){
  try{
    toast("Creating full wave image...");
    const canvas=buildFullWaveCanvas();
    await shareOrDownloadCanvas(canvas,"full_wave","June Training Wave");
  }catch(err){
    console.error(err);
    toast("Could not create full wave image.");
  }
}

function instructorColor(name){
  const n=String(name||"").toLowerCase();
  if(n.includes("amir"))return "#0f7a37";
  if(n.includes("vlad"))return "#7d4bd6";
  if(n.includes("avi"))return "#075da8";
  if(n.includes("exam"))return "#c0392b";
  return "#344256";
}

function aircraftMeta(ac){
  const n=String(ac||"").toLowerCase();
  if(n.includes("2"))return {title:"Aircraft 2", color:"#9a5b00", bg:"#fff5e7", border:"#f0d3a0"};
  if(n.includes("3"))return {title:"Aircraft 3", color:"#6c2eb9", bg:"#f3ecff", border:"#d9c5ff"};
  return {title:"Aircraft 1", color:"#075da8", bg:"#edf6ff", border:"#b8dff8"};
}

function flightDisplayStudent(f){
  return String(f?.student||"").trim();
}

function flightDisplayInstructor(f){
  const instr=String(f?.instructor||"").trim();
  const note=String(f?.note||"").toUpperCase();
  if(note.includes("EXAM") || flightDisplayStudent(f).toUpperCase().includes("EXAM")) return "EXAM";
  return instr || "Solo";
}

function isExamFlight(f){
  return String(f?.note||"").toUpperCase().includes("EXAM") || String(f?.student||"").toUpperCase().includes("EXAM");
}

function normalizedExportTime(t){
  return String(t||"").replace(/^(\d{2})(\d{2})$/,"$1:$2");
}

function getExportDays(){
  const days = Array.isArray(waveDays) && waveDays.length ? waveDays : [];
  const byDate = new Map(days.map(d=>[d.date,d]));
  waveSchedule.forEach(f=>{
    if(f.date && !byDate.has(f.date)){
      byDate.set(f.date,{date:f.date,label:f.date});
    }
  });
  return [...byDate.values()].sort((a,b)=>String(a.date).localeCompare(String(b.date)));
}

function getExportTimesForDay(date){
  const configured = Array.isArray(waveTimes) && waveTimes.length ? waveTimes : [];
  const fromFlights = waveSchedule.filter(f=>f.date===date).map(f=>String(f.time||""));
  return [...new Set([...configured,...fromFlights])].filter(Boolean).sort();
}

function getFlightFor(date,time,aircraft){
  return waveSchedule.find(f=>f.date===date && String(f.time||"")===String(time) && String(f.aircraft||"")===String(aircraft));
}

function buildTwoColumnDayCanvas(date,label){
  const aircrafts=[...new Set(["Aircraft 1","Aircraft 2",...waveSchedule.filter(f=>f.date===date).map(f=>String(f.aircraft||""))])]
    .filter(Boolean)
    .slice(0,3);
  const times=getExportTimesForDay(date);
  const cols=aircrafts.length;
  const width=cols===3?1500:1200;
  const left=58;
  const timeW=118;
  const gap=22;
  const colW=Math.floor((width-left*2-timeW-gap*(cols-1))/cols);
  const rowH=116;
  const height=Math.max(620,220+times.length*rowH+80);
  const canvas=document.createElement("canvas");
  canvas.width=width;canvas.height=height;
  const ctx=canvas.getContext("2d");

  drawExportBackground(ctx,width,height,`Training Schedule · ${label}`,`Generated ${new Date().toLocaleString()}`);

  ctx.fillStyle="#102033";
  ctx.font="bold 24px Arial";
  ctx.fillText("Time",left,205);
  aircrafts.forEach((ac,i)=>{
    const meta=aircraftMeta(ac);
    drawColumnHeader(ctx,left+timeW+i*(colW+gap),180,colW,48,meta.title,meta.color,meta.bg);
  });

  let y=242;
  times.forEach(time=>{
    ctx.fillStyle="#075da8";
    ctx.font="bold 28px Arial";
    ctx.fillText(normalizedExportTime(time),left,y+65);
    aircrafts.forEach((ac,i)=>{
      const x=left+timeW+i*(colW+gap);
      drawExportSlotCard(ctx,x,y,colW,92,getFlightFor(date,time,ac),aircraftMeta(ac));
    });
    y+=rowH;
  });
  return canvas;
}

function buildFullWaveCanvas(){
  const days=getExportDays();
  const cardW=565;
  const cardH=650;
  const margin=40;
  const gap=30;
  const cols=3;
  const rows=Math.max(1,Math.ceil(days.length/cols));
  const width=cols*cardW+(cols-1)*gap+margin*2;
  const height=180+rows*cardH+(rows-1)*gap+80;
  const canvas=document.createElement("canvas");
  canvas.width=width;canvas.height=height;
  const ctx=canvas.getContext("2d");

  drawExportBackground(ctx,width,height,"Avi Oren Aviation · Full Training Wave",`Generated ${new Date().toLocaleString()}`);

  days.forEach((day,idx)=>{
    const col=idx%cols;
    const row=Math.floor(idx/cols);
    const x=margin+col*(cardW+gap);
    const y=180+row*(cardH+gap);
    drawWaveDayCard(ctx,x,y,cardW,cardH,day);
  });

  return canvas;
}

function drawExportBackground(ctx,width,height,title,subtitle){
  ctx.fillStyle="#eef4fb";
  ctx.fillRect(0,0,width,height);
  const grad=ctx.createLinearGradient(0,0,width,0);
  grad.addColorStop(0,"#0877d9");
  grad.addColorStop(1,"#34a8eb");
  ctx.fillStyle=grad;
  roundRect(ctx,34,30,width-68,120,28,true,false);
  ctx.fillStyle="#ffffff";
  ctx.font="bold 38px Arial";
  ctx.fillText(title,62,82);
  ctx.font="20px Arial";
  ctx.fillText(subtitle,62,120);
}

function drawWaveDayCard(ctx,x,y,w,h,day){
  ctx.fillStyle="#ffffff";
  roundRect(ctx,x,y,w,h,24,true,false);
  ctx.strokeStyle="#c6d8ea";
  ctx.lineWidth=3;
  roundRect(ctx,x,y,w,h,24,false,true);

  ctx.fillStyle="#12385c";
  roundRect(ctx,x,y,w,56,24,true,false);
  ctx.fillStyle="#ffffff";
  ctx.font="bold 21px Arial";
  ctx.fillText(formatWaveDayTitle(day.date,day.label),x+20,y+36);

  const aircrafts=["Aircraft 1","Aircraft 2"];
  const times=getExportTimesForDay(day.date).slice(0,5);
  ctx.fillStyle="#102033";
  ctx.font="bold 17px Arial";
  ctx.fillText("Time",x+16,y+86);
  ctx.fillStyle=aircraftMeta("Aircraft 1").color;
  ctx.fillText("Aircraft 1",x+116,y+86);
  ctx.fillStyle=aircraftMeta("Aircraft 2").color;
  ctx.fillText("Aircraft 2",x+345,y+86);

  let yy=y+110;
  times.forEach(time=>{
    ctx.fillStyle="#102033";
    ctx.font="bold 18px Arial";
    ctx.fillText(String(time).replace(/^(\d{2})(\d{2})$/,"$1:$2"),x+16,yy+48);
    drawMiniSlotCard(ctx,x+98,yy,210,80,getFlightFor(day.date,time,"Aircraft 1"),aircraftMeta("Aircraft 1"));
    drawMiniSlotCard(ctx,x+326,yy,210,80,getFlightFor(day.date,time,"Aircraft 2"),aircraftMeta("Aircraft 2"));
    yy+=100;
  });
}

function drawColumnHeader(ctx,x,y,w,h,title,color,bg){
  ctx.fillStyle=bg;
  roundRect(ctx,x,y,w,h,18,true,false);
  ctx.fillStyle=color;
  ctx.font="bold 24px Arial";
  ctx.fillText(title,x+22,y+32);
}

function drawExportSlotCard(ctx,x,y,w,h,flight,meta){
  ctx.fillStyle=flight && isExamFlight(flight) ? "#fff0f0" : meta.bg;
  roundRect(ctx,x,y,w,h,20,true,false);
  ctx.strokeStyle=flight && isExamFlight(flight) ? "#ffb4b4" : meta.border;
  ctx.lineWidth=2;
  roundRect(ctx,x,y,w,h,20,false,true);

  if(!flight){
    ctx.fillStyle="#9aa9b8";
    ctx.font="24px Arial";
    ctx.fillText("—",x+w/2-8,y+56);
    return;
  }
  ctx.fillStyle=meta.color;
  ctx.fillRect(x+14,y+18,7,h-36);

  ctx.fillStyle="#102033";
  ctx.font="bold 25px Arial";
  ctx.fillText(flightDisplayStudent(flight),x+34,y+38);

  const fi=flightDisplayInstructor(flight);
  ctx.fillStyle=instructorColor(fi);
  ctx.font="bold 22px Arial";
  ctx.fillText(fi,x+34,y+70);

  const note=String(flight.note||"").trim();
  if(note && !note.toUpperCase().includes("EXAM")){
    ctx.fillStyle="#60738a";
    ctx.font="18px Arial";
    ctx.fillText(note,x+180,y+70);
  }
}

function drawMiniSlotCard(ctx,x,y,w,h,flight,meta){
  ctx.fillStyle=flight && isExamFlight(flight) ? "#fff0f0" : meta.bg;
  roundRect(ctx,x,y,w,h,16,true,false);
  ctx.strokeStyle=flight && isExamFlight(flight) ? "#ffb4b4" : meta.border;
  ctx.lineWidth=1.5;
  roundRect(ctx,x,y,w,h,16,false,true);
  if(!flight){
    ctx.fillStyle="#9aa9b8";
    ctx.font="18px Arial";
    ctx.fillText("—",x+w/2-5,y+48);
    return;
  }
  ctx.fillStyle="#102033";
  ctx.font="bold 17px Arial";
  ctx.fillText(flightDisplayStudent(flight),x+10,y+28);
  const fi=flightDisplayInstructor(flight);
  ctx.fillStyle=instructorColor(fi);
  ctx.font="bold 16px Arial";
  ctx.fillText(fi,x+10,y+55);
}

async function shareOrDownloadCanvas(canvas,date,label){
  return new Promise(resolve=>{
    canvas.toBlob(async blob=>{
      if(!blob){
        toast("Image creation failed");
        resolve();
        return;
      }
      const safeLabel=String(label||date).replace(/[^a-z0-9]+/gi,"_").replace(/^_|_$/g,"");
      const file=new File([blob],`AOA_schedule_${safeLabel||date}.png`,{type:"image/png"});

      if(navigator.canShare&&navigator.canShare({files:[file]})){
        try{
          await navigator.share({files:[file],title:`Schedule ${label}`,text:`Avi Oren Aviation schedule - ${label}`});
          resolve();
          return;
        }catch(e){
          // user cancelled or browser blocked. Fall back to download.
        }
      }

      const a=document.createElement("a");
      const url=URL.createObjectURL(blob);
      a.href=url;
      a.download=file.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(()=>URL.revokeObjectURL(url),1200);
      toast("Schedule image created");
      resolve();
    },"image/png",0.95);
  });
}

function buildFallbackDayCanvas(date,label){
  const flights=waveSchedule
    .filter(f=>f.date===date)
    .sort((a,b)=>String(a.time||"").localeCompare(String(b.time||"")) || String(a.aircraft||"").localeCompare(String(b.aircraft||"")));
  const width=1080;
  const rowH=88;
  const height=Math.max(520,180+Math.max(1,flights.length)*rowH+80);
  const canvas=document.createElement("canvas");
  canvas.width=width; canvas.height=height;
  const ctx=canvas.getContext("2d");
  ctx.fillStyle="#f5f9fd";ctx.fillRect(0,0,width,height);
  const grad=ctx.createLinearGradient(0,0,width,0);
  grad.addColorStop(0,"#0877d9");grad.addColorStop(1,"#34a8eb");
  ctx.fillStyle=grad;ctx.fillRect(0,0,width,132);
  ctx.fillStyle="#ffffff";ctx.font="bold 42px Arial";ctx.fillText("Avi Oren Aviation",48,54);
  ctx.font="bold 34px Arial";ctx.fillText(`Training Schedule · ${label}`,48,104);
  ctx.fillStyle="#102033";ctx.font="bold 24px Arial";ctx.fillText("Time",58,175);
  ctx.fillText("Aircraft",188,175);
  ctx.fillText("Student",345,175);
  ctx.fillText("FI",620,175);
  ctx.fillText("Notes",770,175);
  let y=200;
  if(!flights.length){
    ctx.fillStyle="#60738a";ctx.font="26px Arial";ctx.fillText("No flights scheduled for this day.",58,y+45);
  }else{
    flights.forEach((f,i)=>{
      ctx.fillStyle=i%2===0?"#ffffff":"#eef8ff";
      roundRect(ctx,40,y,width-80,68,18,true,false);
      ctx.fillStyle="#102033";ctx.font="bold 24px Arial";ctx.fillText(String(f.time||"").replace(/(\d{2})(\d{2})/,"$1:$2"),58,y+42);
      ctx.fillStyle=f.aircraft==="C152"?"#9a5b00":"#075da8";ctx.font="bold 24px Arial";ctx.fillText(f.aircraft||"",188,y+42);
      ctx.fillStyle="#102033";ctx.font="bold 24px Arial";ctx.fillText(f.student||"",345,y+42);
      ctx.fillStyle="#0f7a37";ctx.font="bold 24px Arial";ctx.fillText(f.instructor||"Solo",620,y+42);
      ctx.fillStyle="#60738a";ctx.font="22px Arial";ctx.fillText(f.note||"",770,y+42);
      y+=rowH;
    });
  }
  ctx.fillStyle="#60738a";ctx.font="18px Arial";ctx.fillText(`Generated ${new Date().toLocaleString()}`,48,height-36);
  return canvas;
}

function roundRect(ctx,x,y,w,h,r,fill,stroke){
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);ctx.lineTo(x+r,y+h);
  ctx.quadraticCurveTo(x,y+h,x,y+h-r);ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();
  if(fill)ctx.fill();if(stroke)ctx.stroke();
}
function renderWaveSlot(date,time,aircraft,admin){const flights=waveSchedule.filter(f=>f.date===date&&f.time===time&&f.aircraft===aircraft);return `<div class="wave-slot ${aircraft==="C172"?"slot-c172":"slot-c152"}" data-date="${date}" data-time="${time}" data-aircraft="${aircraft}"><div class="slot-aircraft">${aircraft}</div>${flights.map(f=>renderFlightCard(f,admin)).join("")||'<div class="empty-slot">—</div>'}</div>`}
function renderFlightCard(f,admin){const exam=String(f.note||"").toUpperCase().includes("EXAM");return `<div class="flight-card ${f.aircraft==="C172"?"flight-c172":"flight-c152"} ${exam?"exam-flight":""}" draggable="${admin?"true":"false"}" data-id="${escapeHtml(f.id)}" oncontextmenu="openSlotEditMenu(event, '${escapeHtml(f.id)}')"><strong>${escapeHtml(f.student)}</strong><div class="flight-tags"><span class="instructor-tag ${f.instructor==="Amir"?"tag-amir":"tag-avi"}">${escapeHtml(f.instructor)}</span><span class="aircraft-tag">${escapeHtml(f.aircraft)}</span>${f.note?`<span class="note-tag">${escapeHtml(f.note)}</span>`:""}</div></div>`}
function attachScheduleDragHandlers(){document.querySelectorAll(".flight-card").forEach(card=>{card.addEventListener("dragstart",e=>{e.dataTransfer.setData("text/plain",card.dataset.id);card.classList.add("dragging")});card.addEventListener("dragend",()=>card.classList.remove("dragging"))});document.querySelectorAll(".wave-slot").forEach(slot=>{slot.addEventListener("dragover",e=>{e.preventDefault();slot.classList.add("drop-target")});slot.addEventListener("dragleave",()=>slot.classList.remove("drop-target"));slot.addEventListener("drop",e=>{e.preventDefault();slot.classList.remove("drop-target");const id=e.dataTransfer.getData("text/plain"),flight=waveSchedule.find(f=>f.id===id);if(!flight)return;flight.date=slot.dataset.date;flight.time=slot.dataset.time;flight.aircraft=slot.dataset.aircraft;renderWaveCalendar();toast("Schedule changed. Press Save changes.")})})}
function openSlotEditMenu(e,id){if(!canEditSchedule())return;e.preventDefault();e.stopPropagation();const f=waveSchedule.find(x=>x.id===id);if(!f)return;slotEditFlightId=id;const menu=document.getElementById("slotEditMenu"),stu=document.getElementById("slotEditStudent"),ins=document.getElementById("slotEditInstructor");if(!menu||!stu||!ins)return;stu.innerHTML=waveStudents.map(s=>`<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`).join("");stu.value=f.student;ins.value=f.instructor;menu.style.left=Math.min(e.clientX,window.innerWidth-300)+"px";menu.style.top=Math.min(e.clientY,window.innerHeight-260)+"px";menu.classList.remove("hidden")}
function closeSlotEditMenu(){document.getElementById("slotEditMenu")?.classList.add("hidden");slotEditFlightId=null}function applySlotEdit(){if(!canEditSchedule())return toast("Admin only");const f=waveSchedule.find(x=>x.id===slotEditFlightId);if(!f)return closeSlotEditMenu();f.student=document.getElementById("slotEditStudent").value;f.instructor=document.getElementById("slotEditInstructor").value;closeSlotEditMenu();renderWaveCalendar();toast("Flight updated. Press Save changes.")}
async function saveWaveSchedule(){if(!canEditSchedule())return toast("Admin only");try{const r=await fetch("/api/wave-schedule",{method:"POST",headers:{...authHeaders(),"Content-Type":"application/json"},body:JSON.stringify({flights:waveSchedule})});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||"Could not save schedule");toast("Training wave schedule saved")}catch(err){toast(err.message)}}async function resetWaveSchedule(){if(!canEditSchedule())return toast("Admin only");waveSchedule=JSON.parse(JSON.stringify(defaultWaveSchedule));renderWaveCalendar();await saveWaveSchedule()}
let adminFis=JSON.parse(localStorage.getItem("adminFis")||'["Avi","Amir"]');let adminAirplanes=JSON.parse(localStorage.getItem("adminAirplanes")||'[{"type":"C172","number":"C172"},{"type":"C152","number":"C152"}]');
function renderAdminLists(){const fi=document.getElementById("fiAdminList");if(fi)fi.innerHTML=adminFis.map(x=>`<span>${escapeHtml(x)}</span>`).join("");const ap=document.getElementById("airplaneAdminList");if(ap)ap.innerHTML=adminAirplanes.map(a=>`<span>${escapeHtml(a.type)}${a.number?" · "+escapeHtml(a.number):""}</span>`).join("")}
function addFiFromAdmin(){const i=document.getElementById("fiNameInput"),name=(i?.value||"").trim();if(!name)return toast("Enter FI name");if(!adminFis.includes(name))adminFis.push(name);localStorage.setItem("adminFis",JSON.stringify(adminFis));i.value="";renderAdminLists();toast("FI added")}function addAirplaneFromAdmin(){const type=document.getElementById("airplaneTypeInput")?.value||"C172",number=(document.getElementById("airplaneNumberInput")?.value||"").trim();adminAirplanes.push({type,number});localStorage.setItem("adminAirplanes",JSON.stringify(adminAirplanes));const i=document.getElementById("airplaneNumberInput");if(i)i.value="";renderAdminLists();toast("Airplane added")}function saveTrainingWaveSettings(){const name=document.getElementById("trainingWaveName")?.value||"Training wave",start=document.getElementById("trainingWaveStart")?.value||"2026-05-03",end=document.getElementById("trainingWaveEnd")?.value||"2026-05-10";localStorage.setItem("trainingWaveSettings",JSON.stringify({name,start,end}));toast("Training wave dates saved")}
async function loadUsers(){const list=document.getElementById("usersList");if(!list)return;list.innerHTML="<p>Loading users...</p>";try{const r=await fetch("/api/users",{headers:authHeaders()}),users=await r.json();if(!r.ok)throw new Error(users.detail||"Could not load users");list.innerHTML=users.map(u=>`<div class="user-row"><strong>${escapeHtml(u.email)}</strong><span>${escapeHtml(u.role)} · ${u.approved?"approved":"pending"}</span>${!u.approved?`<button class="ghost-button" onclick="approveUser('${escapeHtml(u.id)}')">Approve</button>`:""}</div>`).join("")}catch(err){list.innerHTML=`<p>${escapeHtml(err.message)}</p>`}}async function approveUser(id){try{const r=await fetch(`/api/users/${encodeURIComponent(id)}/approve`,{method:"POST",headers:authHeaders()}),d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.detail||"Could not approve user");toast("User approved");loadUsers()}catch(err){toast(err.message)}}

async function submitLoginForm(){
  scrubCredentialQueryFromUrl();
  const form=document.getElementById("loginForm");
  if(!form) return;
  try{
    const d=await postForm("/api/login",form);
    token=d.token;userRole=d.role;
    localStorage.setItem("token",token);
    localStorage.setItem("role",userRole);
    scrubCredentialQueryFromUrl();
    setAuthUi();
    closeLoginModal();
    toast(d.approved?"Logged in":"Logged in, waiting for approval");
    if(userRole==="admin")showPage("admin");
  }catch(err){
    toast(err.message||"Login failed");
  }
}

async function submitSignupForm(){
  scrubCredentialQueryFromUrl();
  const form=document.getElementById("signupForm");
  if(!form) return;
  try{
    const d=await postForm("/api/signup",form);
    scrubCredentialQueryFromUrl();
    toast(d.message||"Signup created");
    closeLoginModal();
  }catch(err){
    toast(err.message||"Signup failed");
  }
}



function wireAuthEnterKeys(){
  const login=document.getElementById("loginForm");
  const signup=document.getElementById("signupForm");
  login?.querySelectorAll("input").forEach(i=>i.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submitLoginForm();}}));
  signup?.querySelectorAll("input").forEach(i=>i.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submitSignupForm();}}));
}


document.addEventListener("DOMContentLoaded",()=>{forceSafeAuthForms();wireAuthEnterKeys();scrubCredentialQueryFromUrl();setAuthUi();loadHomeWeather();loadAtplAiSettings();renderAdminLists();document.getElementById("logoutBtn")?.addEventListener("click",logout);document.getElementById("loginForm")?.addEventListener("submit",async e=>{e.preventDefault();try{const d=await postForm("/api/login",e.target);token=d.token;userRole=d.role;localStorage.setItem("token",token);localStorage.setItem("role",userRole);scrubCredentialQueryFromUrl();setAuthUi();closeLoginModal();toast(d.approved?"Logged in":"Logged in, waiting for approval");if(userRole==="admin")showPage("admin")}catch(err){toast(err.message)}});document.getElementById("signupForm")?.addEventListener("submit",async e=>{e.preventDefault();try{const d=await postForm("/api/signup",e.target);scrubCredentialQueryFromUrl();toast(d.message||"Signup created");closeLoginModal()}catch(err){toast(err.message||"Signup failed")}});document.getElementById("studentForm")?.addEventListener("submit",async e=>{e.preventDefault();try{await postForm("/api/students",e.target);e.target.reset();toast("Student added")}catch(err){toast(err.message)}});document.getElementById("atplAiSettingsForm")?.addEventListener("submit",saveAtplAiSettings);document.querySelectorAll(".nav-item,.mobile-nav").forEach(btn=>btn.addEventListener("click",e=>{if(btn.dataset.page==="atplai")return handleAtplAiClick(e);showPage(btn.dataset.page)}));document.addEventListener("click",e=>{const menu=document.getElementById("slotEditMenu");if(menu&&!menu.classList.contains("hidden")&&!menu.contains(e.target))closeSlotEditMenu()});document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSlotEditMenu()});selectAirport("LHKA")});

/* v0.1.25 stable overrides: NOTAM, wave switcher, mobile polish */
function scrollToLatestAssistantTop(){
  window.scrollTo({top:0, behavior:"smooth"});
}

function parseLocalDate(value){
  const parts=String(value||"").split("-").map(Number);
  if(parts.length!==3||parts.some(isNaN)) return null;
  return new Date(parts[0],parts[1]-1,parts[2]);
}
function ymdFromDate(d){
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}
function shortDateLabel(d){
  return d.toLocaleDateString("en-US",{month:"short",day:"numeric"});
}
function getTrainingWaveSettings(){
  const saved=JSON.parse(localStorage.getItem("trainingWaveSettings")||"null");
  const name=saved?.name||document.getElementById("trainingWaveName")?.value||"May 3–10 training wave";
  const start=saved?.start||document.getElementById("trainingWaveStart")?.value||"2026-05-03";
  const end=saved?.end||document.getElementById("trainingWaveEnd")?.value||"2026-05-10";
  return {name,start,end};
}
function getActiveWaveDays(){
  const {start,end}=getTrainingWaveSettings();
  const s=parseLocalDate(start), e=parseLocalDate(end);
  if(!s||!e||e<s) return [{date:"2026-05-03",label:"May 3"},{date:"2026-05-04",label:"May 4"},{date:"2026-05-05",label:"May 5"},{date:"2026-05-06",label:"May 6"},{date:"2026-05-07",label:"May 7"},{date:"2026-05-08",label:"May 8"},{date:"2026-05-09",label:"May 9"},{date:"2026-05-10",label:"May 10"}];
  const days=[];
  for(const d=new Date(s); d<=e && days.length<21; d.setDate(d.getDate()+1)){
    days.push({date:ymdFromDate(d),label:shortDateLabel(d)});
  }
  return days;
}
function updateWaveLabel(){
  const settings=getTrainingWaveSettings();
  const label=document.getElementById("activeWaveLabel");
  if(label) label.textContent=settings.name || `${settings.start} to ${settings.end}`;
  const nameInput=document.getElementById("trainingWaveName");
  const startInput=document.getElementById("trainingWaveStart");
  const endInput=document.getElementById("trainingWaveEnd");
  if(nameInput) nameInput.value=settings.name;
  if(startInput) startInput.value=settings.start;
  if(endInput) endInput.value=settings.end;
}

renderWaveCalendar=function(){
  const cal=document.getElementById("waveCalendar");
  if(!cal)return;
  updateWaveLabel();
  const admin=canEditSchedule();
  const days=getActiveWaveDays();
  cal.innerHTML=days.map(day=>`<section class="wave-day-card"><div class="wave-day-header">${day.label}</div><div class="wave-day-grid">${waveTimes.map(time=>`<div class="wave-time-row"><div class="wave-time-label">${time}</div><div class="wave-slot-pair">${waveAircraft.map(ac=>renderWaveSlot(day.date,time,ac,admin)).join("")}</div></div>`).join("")}</div></section>`).join("");
  if(admin)attachScheduleDragHandlers();
};

saveTrainingWaveSettings=function(){
  const name=document.getElementById("trainingWaveName")?.value||"Training wave";
  const start=document.getElementById("trainingWaveStart")?.value||"2026-05-03";
  const end=document.getElementById("trainingWaveEnd")?.value||"2026-05-10";
  const s=parseLocalDate(start), e=parseLocalDate(end);
  if(!s||!e||e<s){toast("Check wave dates");return;}
  localStorage.setItem("trainingWaveSettings",JSON.stringify({name,start,end}));
  updateWaveLabel();
  renderWaveCalendar();
  toast("Training wave dates saved");
};

handleAtplAiClick=async function(e){
  if(e){e.preventDefault();e.stopPropagation()}
  await loadAtplAiSettings();
  if(atplAiSettings.active&&atplAiSettings.url){
    window.open(atplAiSettings.url,"_blank","noopener,noreferrer");
    return;
  }
  showPage("atplai");
};

loadNotam=async function(){
  const sel=document.getElementById("notamAirportSelect"),out=document.getElementById("notamOutput"),title=document.getElementById("notamTitle"),official=document.getElementById("notamOfficialLink");
  if(!sel||!out||!title)return;
  const icao=sel.value||"LHKE";
  const officialUrl=`https://notams.aim.faa.gov/notamSearch/nsapp.html#/results?searchType=0&designatorsForLocation=${encodeURIComponent(icao)}`;
  title.textContent=`${icao} NOTAM`;
  out.textContent="Loading NOTAM...";
  if(official)official.href=officialUrl;
  try{
    const r=await fetch(`/api/notam/${encodeURIComponent(icao)}`);
    const d=await r.json();
    if(!r.ok)throw new Error(d.detail||"NOTAM fetch failed");
    const source=d.source?`\n\nSource: ${d.source}`:"";
    const openLine=d.official_url?`\nOfficial verification: ${d.official_url}`:`\nOfficial verification: ${officialUrl}`;
    out.textContent=(d.notams||`No automatic NOTAM text returned for ${icao}.`)+source+openLine;
  }catch(err){
    out.textContent=`Automatic NOTAM loading failed for ${icao}.\n\n${err.message}\n\nUse official verification: ${officialUrl}`;
  }
};


async function submitLoginForm(){
  scrubCredentialQueryFromUrl();
  const form=document.getElementById("loginForm");
  if(!form) return;
  try{
    const d=await postForm("/api/login",form);
    token=d.token;userRole=d.role;
    localStorage.setItem("token",token);
    localStorage.setItem("role",userRole);
    scrubCredentialQueryFromUrl();
    setAuthUi();
    closeLoginModal();
    toast(d.approved?"Logged in":"Logged in, waiting for approval");
    if(userRole==="admin")showPage("admin");
  }catch(err){
    toast(err.message||"Login failed");
  }
}

async function submitSignupForm(){
  scrubCredentialQueryFromUrl();
  const form=document.getElementById("signupForm");
  if(!form) return;
  try{
    const d=await postForm("/api/signup",form);
    scrubCredentialQueryFromUrl();
    toast(d.message||"Signup created");
    closeLoginModal();
  }catch(err){
    toast(err.message||"Signup failed");
  }
}



function wireAuthEnterKeys(){
  const login=document.getElementById("loginForm");
  const signup=document.getElementById("signupForm");
  login?.querySelectorAll("input").forEach(i=>i.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submitLoginForm();}}));
  signup?.querySelectorAll("input").forEach(i=>i.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submitSignupForm();}}));
}


document.addEventListener("DOMContentLoaded",()=>{forceSafeAuthForms();wireAuthEnterKeys();scrubCredentialQueryFromUrl();
  updateWaveLabel();
  const version=document.querySelector(".version");
  if(version) version.style.display="flex";
});

/* v0.1.26 emergency stabilization patch */
const AOA_MAY_WAVE_SETTINGS={name:"May 3–10 training wave",start:"2026-05-03",end:"2026-05-10"};
function setWaveChoiceActive(key){
  document.querySelectorAll('.wave-choice').forEach(b=>b.classList.toggle('active', b.getAttribute('onclick')?.includes(`'${key}'`)));
}
function selectTrainingWave(key){
  if(key==='may3'){
    localStorage.setItem('trainingWaveSettings', JSON.stringify(AOA_MAY_WAVE_SETTINGS));
    setWaveChoiceActive('may3');
  }else{
    const name=document.getElementById('trainingWaveName')?.value || 'Custom training wave';
    const start=document.getElementById('trainingWaveStart')?.value || '2026-05-03';
    const end=document.getElementById('trainingWaveEnd')?.value || '2026-05-10';
    localStorage.setItem('trainingWaveSettings', JSON.stringify({name,start,end}));
    setWaveChoiceActive('custom');
  }
  updateWaveLabel();
  renderWaveCalendar();
}
function openWaveManager(){
  showPage('admin');
  setTimeout(()=>document.getElementById('trainingWaveForm')?.scrollIntoView({behavior:'smooth',block:'center'}),80);
}
function ensureWaveHasVisibleFlights(){
  const days=getActiveWaveDays().map(d=>d.date);
  const hasVisible=(waveSchedule||[]).some(f=>days.includes(f.date));
  if(!hasVisible && Array.isArray(waveSchedule) && waveSchedule.some(f=>String(f.date||'').startsWith('2026-05-'))){
    localStorage.setItem('trainingWaveSettings', JSON.stringify(AOA_MAY_WAVE_SETTINGS));
    setWaveChoiceActive('may3');
  }
}
const AOA_originalLoadSchedule=loadSchedule;
loadSchedule=async function(){
  const guest=document.getElementById('scheduleGuestMessage'), app=document.getElementById('waveScheduleApp');
  if(!token){guest?.classList.remove('hidden');app?.classList.add('hidden');return}
  guest?.classList.add('hidden');app?.classList.remove('hidden');
  try{
    const r=await fetch('/api/wave-schedule',{headers:authHeaders()});
    const d=await r.json();
    waveSchedule=(r.ok&&Array.isArray(d.flights)&&d.flights.length>0)?d.flights:JSON.parse(JSON.stringify(defaultWaveSchedule));
  }catch{
    waveSchedule=JSON.parse(JSON.stringify(defaultWaveSchedule));
  }
  ensureWaveHasVisibleFlights();
  renderWaveCalendar();
};

const AOA_originalLoadHomeWeather=loadHomeWeather;
loadHomeWeather=async function(){
  const t=document.getElementById('homeTemp'), p=document.getElementById('homePressure'), w=document.getElementById('homeWind'), sun=document.getElementById('homeSunTimes');
  try{ await AOA_originalLoadHomeWeather(); }catch{}
  if(sun){
    try{
      const r=await fetch('/api/sun/LHKA');
      const d=await r.json();
      if(!r.ok) throw new Error(d.detail||'Sun data failed');
      sun.textContent=`${d.sunrise} / ${d.sunset}`;
    }catch{
      sun.textContent='06:00 / 19:35';
    }
  }
};

loadAtplAiSettings=async function(){
  const def='https://avioren-aviation-mvp.onrender.com/';
  const localUrl=localStorage.getItem('atplAiUrl')||def;
  const localActive=localStorage.getItem('atplAiActive')==='true';
  atplAiSettings={url:localUrl,active:localActive};
  try{
    const r=await fetch('/api/settings/atpl-ai',{cache:'no-store'});
    const d=await r.json();
    if(r.ok){
      atplAiSettings={url:d.url||localUrl,active:!!d.active};
      localStorage.setItem('atplAiUrl', atplAiSettings.url);
      localStorage.setItem('atplAiActive', atplAiSettings.active?'true':'false');
    }
  }catch{}
  const u=document.getElementById('atplAiUrlInput'), a=document.getElementById('atplAiActiveInput');
  if(u)u.value=atplAiSettings.url||def;
  if(a)a.checked=!!atplAiSettings.active;
};
saveAtplAiSettings=async function(e){
  if(e)e.preventDefault();
  const form=e?.target||document.getElementById('atplAiSettingsForm');
  const url=(form?.url?.value||document.getElementById('atplAiUrlInput')?.value||'https://avioren-aviation-mvp.onrender.com/').trim();
  const active=!!(form?.active?.checked ?? document.getElementById('atplAiActiveInput')?.checked);
  localStorage.setItem('atplAiUrl',url);
  localStorage.setItem('atplAiActive',active?'true':'false');
  atplAiSettings={url,active};
  try{
    const r=await fetch('/api/settings/atpl-ai',{method:'POST',headers:{...authHeaders(),'Content-Type':'application/json'},body:JSON.stringify({url,active})});
    const d=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(d.detail||'Saved locally, but backend save failed');
    atplAiSettings={url:d.url||url,active:!!d.active};
    localStorage.setItem('atplAiUrl',atplAiSettings.url);
    localStorage.setItem('atplAiActive',atplAiSettings.active?'true':'false');
    toast('ATPL AI settings saved');
  }catch(err){
    toast(err.message || 'ATPL AI saved locally');
  }
};
handleAtplAiClick=async function(e){
  if(e){e.preventDefault();e.stopPropagation()}
  await loadAtplAiSettings();
  if(atplAiSettings.active && atplAiSettings.url){
    window.open(atplAiSettings.url,"_blank","noopener,noreferrer");
    return;
  }
  showPage('atplai');
};

document.addEventListener('DOMContentLoaded',()=>{
  const saved=JSON.parse(localStorage.getItem('trainingWaveSettings')||'null');
  setWaveChoiceActive(saved?.start==='2026-05-03' && saved?.end==='2026-05-10' ? 'may3' : 'custom');
  loadHomeWeather();
  const form=document.getElementById('atplAiSettingsForm');
  if(form){
    form.removeEventListener('submit', saveAtplAiSettings);
    form.addEventListener('submit', saveAtplAiSettings);
  }
});

/* v0.1.28 stabilization: fixed May wave, English dates, dashboard LHKA, chart buttons, ATPL new tab */
function aoaEnglishMayDays(){
  return [
    {date:"2026-05-03",label:"May 3"},{date:"2026-05-04",label:"May 4"},
    {date:"2026-05-05",label:"May 5"},{date:"2026-05-06",label:"May 6"},
    {date:"2026-05-07",label:"May 7"},{date:"2026-05-08",label:"May 8"},
    {date:"2026-05-09",label:"May 9"},{date:"2026-05-10",label:"May 10"}
  ];
}
getActiveWaveDays=function(){ return aoaEnglishMayDays(); };
updateWaveLabel=function(){
  const label=document.getElementById("activeWaveLabel");
  if(label) label.textContent="May 3–10 training wave";
};

showChartInViewer=function(url){
  if(!url)return;
  const f=document.getElementById("chartFrame"), o=document.getElementById("chartOpenLink");
  if(f)f.src=url;
  if(o)o.href=url;
};
selectAirport=function(code){
  const item=airportCharts[code];
  if(!item)return;
  document.querySelectorAll(".airport-card").forEach(b=>b.classList.toggle("active",b.dataset.airport===code||b.querySelector("strong")?.innerText===code));
  const chip=document.getElementById("selectedAirportChip"), name=document.getElementById("selectedAirportName");
  if(chip)chip.textContent=code;
  if(name)name.textContent=item.name;
  showChartInViewer(item.chart);
  const maps=document.getElementById("googleMapsLink");
  if(maps)maps.href=item.maps;
  const extra=document.getElementById("chartExtraLinks");
  if(extra){
    extra.innerHTML=(item.links||[]).map(l=>`<button class="ghost-button chart-link-button" type="button" data-url="${escapeHtml(l.url)}">${escapeHtml(l.label)}</button>`).join("");
  }
};

document.addEventListener("click",function(e){
  const btn=e.target.closest(".chart-link-button");
  if(btn){
    e.preventDefault();
    showChartInViewer(btn.dataset.url);
  }
});

loadHomeWeather=async function(){
  const t=document.getElementById("homeTemp"), p=document.getElementById("homePressure"), w=document.getElementById("homeWind"), sun=document.getElementById("homeSunTimes");
  if(t)t.textContent="Loading...";
  if(w)w.textContent="Loading...";
  if(p)p.textContent="Loading...";
  if(sun)sun.textContent="Loading...";
  try{
    const r=await fetch("/api/weather/airport/LHKA",{cache:"no-store"});
    const d=await r.json();
    if(!r.ok)throw new Error(d.detail||"Weather failed");
    const s=d.summary||{};
    if(t)t.textContent=s.temperature||"N/A";
    if(w)w.textContent=s.wind||"N/A";
    if(p)p.textContent=s.pressure||"N/A";
  }catch{
    if(t)t.textContent="N/A";
    if(w)w.textContent="N/A";
    if(p)p.textContent="N/A";
  }
  if(sun){
    try{
      const r=await fetch("/api/sun/LHKA",{cache:"no-store"});
      const d=await r.json();
      if(!r.ok)throw new Error(d.detail||"Sun failed");
      sun.textContent=`${d.sunrise} / ${d.sunset}`;
    }catch{
      sun.textContent="—";
    }
  }
};

handleAtplAiClick=async function(e){
  if(e){e.preventDefault();e.stopPropagation()}
  await loadAtplAiSettings();
  if(atplAiSettings.active && atplAiSettings.url){
    window.open(atplAiSettings.url,"_blank","noopener,noreferrer");
    return;
  }
  showPage("atplai");
};


async function submitLoginForm(){
  scrubCredentialQueryFromUrl();
  const form=document.getElementById("loginForm");
  if(!form) return;
  try{
    const d=await postForm("/api/login",form);
    token=d.token;userRole=d.role;
    localStorage.setItem("token",token);
    localStorage.setItem("role",userRole);
    scrubCredentialQueryFromUrl();
    setAuthUi();
    closeLoginModal();
    toast(d.approved?"Logged in":"Logged in, waiting for approval");
    if(userRole==="admin")showPage("admin");
  }catch(err){
    toast(err.message||"Login failed");
  }
}

async function submitSignupForm(){
  scrubCredentialQueryFromUrl();
  const form=document.getElementById("signupForm");
  if(!form) return;
  try{
    const d=await postForm("/api/signup",form);
    scrubCredentialQueryFromUrl();
    toast(d.message||"Signup created");
    closeLoginModal();
  }catch(err){
    toast(err.message||"Signup failed");
  }
}



function wireAuthEnterKeys(){
  const login=document.getElementById("loginForm");
  const signup=document.getElementById("signupForm");
  login?.querySelectorAll("input").forEach(i=>i.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submitLoginForm();}}));
  signup?.querySelectorAll("input").forEach(i=>i.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submitSignupForm();}}));
}


document.addEventListener("DOMContentLoaded",()=>{forceSafeAuthForms();wireAuthEnterKeys();scrubCredentialQueryFromUrl();
  updateWaveLabel();
  loadHomeWeather();
  selectAirport("LHKA");
});


/* v0.2.10 auth/profile/mobile hotfix */
function clearAuthState(){
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  token=""; userRole="";
  setAuthUi();
}
function handleAuthFailure(message){
  clearAuthState();
  showPage("dashboard");
  openLoginModal();
  toast(message||"Session expired. Please login again.");
}
const AOA_OLD_setAuthUi=setAuthUi;
setAuthUi=function(){
  AOA_OLD_setAuthUi();
  const logged=!!token;
  document.getElementById("mobileLogoutBtn")?.classList.toggle("hidden",!logged);
  document.querySelectorAll('.member-only').forEach(e=>e.classList.toggle('hidden',!logged));
};
const AOA_OLD_logout=logout;
logout=function(){
  clearAuthState();
  showPage("dashboard");
  toast("Logged out");
};
async function apiJson(url, options={}){
  const r=await fetch(url,options);
  const d=await r.json().catch(()=>({}));
  if(r.status===401){
    handleAuthFailure(d.detail||"Invalid token. Please login again.");
    throw new Error(d.detail||"Invalid token");
  }
  if(!r.ok) throw new Error(d.detail||"Request failed");
  return d;
}
loadProfile=async function(){
  const box=document.getElementById("profileStatus");
  if(!token){openLoginModal();return;}
  if(box)box.textContent="Loading profile...";
  try{
    const d=await apiJson("/api/me",{headers:authHeaders(),cache:"no-store"});
    if(box){
      box.innerHTML=`<div class="profile-line"><strong>Email:</strong> ${escapeHtml(d.email||"")}</div>
      <div class="profile-line"><strong>Role:</strong> ${escapeHtml(d.role||"")}</div>
      <div class="profile-line"><strong>Status:</strong> ${d.approved?"Approved":"Waiting for approval"}</div>
      <div class="profile-line"><strong>Created:</strong> ${escapeHtml(d.created_at||"")}</div>`;
    }
    const set=(id,val)=>{const el=document.getElementById(id); if(el)el.value=val||"";};
    set("profileFullName",d.full_name); set("profilePhone",d.phone); set("profileLicense",d.license_info); set("profileNotes",d.notes);
  }catch(err){ if(box)box.textContent=err.message; }
};
const AOA_OLD_showPage=showPage;
showPage=function(id){
  if(id==="profile"&&!token){openLoginModal();toast("Login required");return;}
  AOA_OLD_showPage(id);
  if(id==="profile")loadProfile();
};
loadUsers=async function(){
  const list=document.getElementById("usersList");if(!list)return;
  list.innerHTML="<p>Loading users...</p>";
  try{
    const users=await apiJson("/api/users",{headers:authHeaders(),cache:"no-store"});
    list.innerHTML=users.map(u=>`<div class="user-row"><strong>${escapeHtml(u.email)}</strong><span>${escapeHtml(u.role)} · ${u.approved?"approved":"pending"}</span>${!u.approved?`<button class="ghost-button" onclick="approveUser('${escapeHtml(u.id)}')">Approve</button>`:""}</div>`).join("")||"<p>No users found.</p>";
  }catch(err){list.innerHTML=`<p>${escapeHtml(err.message)}</p>`;}
};
approveUser=async function(id){
  try{await apiJson(`/api/users/${encodeURIComponent(id)}/approve`,{method:"POST",headers:authHeaders()});toast("User approved");loadUsers();}
  catch(err){toast(err.message)}
};
saveAtplAiSettings=async function(e){
  if(e)e.preventDefault();
  const form=e?.target||document.getElementById('atplAiSettingsForm');
  const url=(form?.url?.value||document.getElementById('atplAiUrlInput')?.value||'https://avioren-aviation-mvp.onrender.com/').trim();
  const active=!!(form?.active?.checked ?? document.getElementById('atplAiActiveInput')?.checked);
  try{
    const d=await apiJson('/api/settings/atpl-ai',{method:'POST',headers:{...authHeaders(),'Content-Type':'application/json'},body:JSON.stringify({url,active})});
    atplAiSettings={url:d.url||url,active:!!d.active};
    localStorage.setItem('atplAiUrl',atplAiSettings.url);
    localStorage.setItem('atplAiActive',atplAiSettings.active?'true':'false');
    toast('ATPL AI settings saved');
  }catch(err){toast(err.message)}
};

async function submitLoginForm(){
  scrubCredentialQueryFromUrl();
  const form=document.getElementById("loginForm");
  if(!form) return;
  try{
    const d=await postForm("/api/login",form);
    token=d.token;userRole=d.role;
    localStorage.setItem("token",token);
    localStorage.setItem("role",userRole);
    scrubCredentialQueryFromUrl();
    setAuthUi();
    closeLoginModal();
    toast(d.approved?"Logged in":"Logged in, waiting for approval");
    if(userRole==="admin")showPage("admin");
  }catch(err){
    toast(err.message||"Login failed");
  }
}

async function submitSignupForm(){
  scrubCredentialQueryFromUrl();
  const form=document.getElementById("signupForm");
  if(!form) return;
  try{
    const d=await postForm("/api/signup",form);
    scrubCredentialQueryFromUrl();
    toast(d.message||"Signup created");
    closeLoginModal();
  }catch(err){
    toast(err.message||"Signup failed");
  }
}



function wireAuthEnterKeys(){
  const login=document.getElementById("loginForm");
  const signup=document.getElementById("signupForm");
  login?.querySelectorAll("input").forEach(i=>i.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submitLoginForm();}}));
  signup?.querySelectorAll("input").forEach(i=>i.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submitSignupForm();}}));
}


document.addEventListener("DOMContentLoaded",()=>{forceSafeAuthForms();wireAuthEnterKeys();scrubCredentialQueryFromUrl();
  setAuthUi();
  const pf=document.getElementById("profileForm");
  if(pf){
    pf.addEventListener("submit",async e=>{
      e.preventDefault();
      try{await apiJson('/api/me',{method:'POST',headers:authHeaders(),body:new FormData(e.target)});toast('Profile saved');loadProfile();}
      catch(err){toast(err.message)}
    });
  }
  const form=document.getElementById('atplAiSettingsForm');
  if(form){
    form.addEventListener('submit',saveAtplAiSettings);
  }
});

/* v0.2.11 token-safe schedule + signup/auth recovery */
saveWaveSchedule=async function(){
  if(!canEditSchedule())return toast("Admin only");
  try{
    await apiJson("/api/wave-schedule",{method:"POST",headers:{...authHeaders(),"Content-Type":"application/json"},body:JSON.stringify({flights:waveSchedule})});
    toast("Training wave schedule saved");
  }catch(err){toast(err.message)}
};

// Capture signup before older listeners, so it submits once only.

async function submitLoginForm(){
  scrubCredentialQueryFromUrl();
  const form=document.getElementById("loginForm");
  if(!form) return;
  try{
    const d=await postForm("/api/login",form);
    token=d.token;userRole=d.role;
    localStorage.setItem("token",token);
    localStorage.setItem("role",userRole);
    scrubCredentialQueryFromUrl();
    setAuthUi();
    closeLoginModal();
    toast(d.approved?"Logged in":"Logged in, waiting for approval");
    if(userRole==="admin")showPage("admin");
  }catch(err){
    toast(err.message||"Login failed");
  }
}

async function submitSignupForm(){
  scrubCredentialQueryFromUrl();
  const form=document.getElementById("signupForm");
  if(!form) return;
  try{
    const d=await postForm("/api/signup",form);
    scrubCredentialQueryFromUrl();
    toast(d.message||"Signup created");
    closeLoginModal();
  }catch(err){
    toast(err.message||"Signup failed");
  }
}



function wireAuthEnterKeys(){
  const login=document.getElementById("loginForm");
  const signup=document.getElementById("signupForm");
  login?.querySelectorAll("input").forEach(i=>i.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submitLoginForm();}}));
  signup?.querySelectorAll("input").forEach(i=>i.addEventListener("keydown",e=>{if(e.key==="Enter"){e.preventDefault();submitSignupForm();}}));
}


document.addEventListener("DOMContentLoaded",()=>{forceSafeAuthForms();wireAuthEnterKeys();scrubCredentialQueryFromUrl();
  const sf=document.getElementById("signupForm");
  if(sf){
    sf.addEventListener("submit",async e=>{
      e.preventDefault();
      e.stopImmediatePropagation();
      try{
        const d=await postForm("/api/signup",e.target);
        toast(d.message||"Signup created. Waiting for admin approval.");
        e.target.reset();
      }catch(err){toast(err.message||"Signup failed")}
    }, true);
  }
});

/* v0.3.0 Schedule Manager + User Management */
function scheduleTimes(){
  const times=new Set([...(Array.isArray(waveTimes)?waveTimes:[])]);
  (waveSchedule||[]).forEach(f=>{if(f.time)times.add(String(f.time).replace(':','').padStart(4,'0'))});
  return Array.from(times).sort();
}

function openFlightModal(id){
  if(!canEditSchedule())return toast('Admin only');
  const f=id ? (waveSchedule||[]).find(x=>String(x.id)===String(id)) : null;
  const title=document.getElementById('flightModalTitle');
  if(title)title.textContent=f?'Edit flight':'Add flight';
  const set=(id2,val)=>{const el=document.getElementById(id2); if(el)el.value=val||'';};
  set('flightEditId', f?.id || '');
  set('flightDateInput', f?.date || getActiveWaveDays()[0]?.date || '2026-05-03');
  set('flightTimeInput', f?.time || '0800');
  set('flightAircraftInput', f?.aircraft || 'C172');
  set('flightStudentInput', f?.student || '');
  set('flightInstructorInput', f?.instructor || 'Avi');
  set('flightNoteInput', f?.note || '');
  document.getElementById('flightModal')?.classList.remove('hidden');
}
function closeFlightModal(){document.getElementById('flightModal')?.classList.add('hidden')}
function normalizeFlightTime(v){
  const t=String(v||'').replace(/[^0-9]/g,'').padStart(4,'0').slice(0,4);
  return /^\d{4}$/.test(t)?t:'';
}
function saveFlightFromModal(){
  const editId=document.getElementById('flightEditId')?.value||'';
  const flight={
    id: editId || ('sf_'+Date.now().toString(36)),
    date: document.getElementById('flightDateInput')?.value||'',
    time: normalizeFlightTime(document.getElementById('flightTimeInput')?.value),
    aircraft: document.getElementById('flightAircraftInput')?.value||'C172',
    student: (document.getElementById('flightStudentInput')?.value||'').trim(),
    instructor: document.getElementById('flightInstructorInput')?.value||'Avi',
    note: (document.getElementById('flightNoteInput')?.value||'').trim()
  };
  if(!flight.date||!flight.time||!flight.student)return toast('Enter date, time and student');
  if(!['C172','C152'].includes(flight.aircraft))return toast('Aircraft must be C172 or C152');
  const idx=(waveSchedule||[]).findIndex(f=>String(f.id)===String(flight.id));
  if(idx>=0)waveSchedule[idx]=flight; else waveSchedule.push(flight);
  closeFlightModal();
  renderWaveCalendar();
  toast('Flight updated. Press Save changes.');
}
function deleteFlight(id){
  if(!canEditSchedule())return toast('Admin only');
  const f=(waveSchedule||[]).find(x=>String(x.id)===String(id));
  if(!f)return;
  if(!confirm(`Delete flight for ${f.student} at ${f.time}?`))return;
  waveSchedule=waveSchedule.filter(x=>String(x.id)!==String(id));
  renderWaveCalendar();
  toast('Flight deleted. Press Save changes.');
}

renderWaveCalendar=function(){
  const cal=document.getElementById('waveCalendar');
  if(!cal)return;
  updateWaveLabel?.();
  const admin=canEditSchedule();
  const days=getActiveWaveDays();
  const times=scheduleTimes();
  cal.innerHTML=days.map(day=>`<section class="wave-day-card"><div class="wave-day-header">${day.label}</div><div class="wave-day-grid">${times.map(time=>`<div class="wave-time-row"><div class="wave-time-label">${time}</div><div class="wave-slot-pair">${waveAircraft.map(ac=>renderWaveSlot(day.date,time,ac,admin)).join('')}</div></div>`).join('')}</div></section>`).join('');
  if(admin)attachScheduleDragHandlers();
};

renderFlightCard=function(f,admin){
  const exam=String(f.note||'').toUpperCase().includes('EXAM');
  const safeId=escapeHtml(f.id);
  return `<div class="flight-card ${f.aircraft==='C172'?'flight-c172':'flight-c152'} ${exam?'exam-flight':''}" draggable="${admin?'true':'false'}" data-id="${safeId}" oncontextmenu="openFlightModal('${safeId}');return false;"><strong>${escapeHtml(f.student)}</strong><div class="flight-tags"><span class="instructor-tag ${f.instructor==='Amir'?'tag-amir':'tag-avi'}">${escapeHtml(f.instructor)}</span><span class="aircraft-tag">${escapeHtml(f.aircraft)}</span>${f.note?`<span class="note-tag">${escapeHtml(f.note)}</span>`:''}</div>${admin?`<div class="flight-card-actions"><button type="button" onclick="event.stopPropagation();openFlightModal('${safeId}')">Edit</button><button type="button" class="danger" onclick="event.stopPropagation();deleteFlight('${safeId}')">Delete</button></div>`:''}</div>`;
};

// Override the old right-click editor so full flight edit opens instead of the small student/FI menu.
openSlotEditMenu=function(e,id){if(e){e.preventDefault();e.stopPropagation()}openFlightModal(id)};

saveWaveSchedule=async function(){
  if(!canEditSchedule())return toast('Admin only');
  try{
    const d=await apiJson('/api/wave-schedule',{method:'POST',headers:{...authHeaders(),'Content-Type':'application/json'},body:JSON.stringify({flights:waveSchedule})});
    if(Array.isArray(d.flights))waveSchedule=d.flights;
    renderWaveCalendar();
    toast('Training wave schedule saved to database');
  }catch(err){toast(err.message)}
};

loadUsers=async function(){
  const list=document.getElementById('usersList');if(!list)return;
  list.innerHTML='<p>Loading users...</p>';
  try{
    const users=await apiJson('/api/users',{headers:authHeaders(),cache:'no-store'});
    list.innerHTML=users.map(u=>`<div class="user-row"><strong>${escapeHtml(u.email)}</strong><span>${escapeHtml(u.role)} · ${u.approved?'approved':'suspended/pending'}</span><div class="user-actions"><select onchange="updateUserRole('${escapeHtml(u.id)}',this.value)"><option value="student" ${u.role==='student'?'selected':''}>student</option><option value="instructor" ${u.role==='instructor'?'selected':''}>instructor</option><option value="admin" ${u.role==='admin'?'selected':''}>admin</option></select>${!u.approved?`<button class="ghost-button" onclick="approveUser('${escapeHtml(u.id)}')">Approve</button>`:`<button class="ghost-button" onclick="suspendUser('${escapeHtml(u.id)}')">Suspend</button>`}<button class="ghost-button" onclick="deleteUser('${escapeHtml(u.id)}')">Delete</button></div></div>`).join('')||'<p>No users found.</p>';
  }catch(err){list.innerHTML=`<p>${escapeHtml(err.message)}</p>`;}
};
async function suspendUser(id){try{await apiJson(`/api/users/${encodeURIComponent(id)}/suspend`,{method:'POST',headers:authHeaders()});toast('User suspended');loadUsers()}catch(err){toast(err.message)}}
async function deleteUser(id){if(!confirm('Delete this user?'))return;try{await apiJson(`/api/users/${encodeURIComponent(id)}`,{method:'DELETE',headers:authHeaders()});toast('User deleted');loadUsers()}catch(err){toast(err.message)}}
async function updateUserRole(id,role){try{await apiJson(`/api/users/${encodeURIComponent(id)}/role`,{method:'POST',headers:{...authHeaders(),'Content-Type':'application/json'},body:JSON.stringify({role})});toast('Role updated');loadUsers()}catch(err){toast(err.message)}}

// Seed/verify the schedule database from the admin page if needed.
async function verifyScheduleDb(){
  try{const d=await apiJson('/api/wave-schedule/verify',{method:'POST',headers:authHeaders()});toast(`Schedule DB verified: ${d.count} flights`);loadSchedule();}
  catch(err){toast(err.message)}
}

document.addEventListener('DOMContentLoaded',()=>{
  const ff=document.getElementById('flightForm');
  if(ff){ff.addEventListener('submit',e=>{e.preventDefault();saveFlightFromModal();});}
});

/* v0.3.1 people DB, my-flights filter, admin UX, NOTAM honesty */
let scheduleStudents=[];
let scheduleInstructors=[];
let currentUserProfile=null;

async function loadPeopleForSchedule(){
  try{
    const students=await apiJson('/api/students',{headers:authHeaders(),cache:'no-store'});
    scheduleStudents=Array.isArray(students)?students:[];
  }catch(err){
    scheduleStudents=[];
  }
  try{
    const instructors=await apiJson('/api/instructors',{headers:authHeaders(),cache:'no-store'});
    scheduleInstructors=Array.isArray(instructors)?instructors:[];
  }catch(err){
    scheduleInstructors=[{name:'Avi'},{name:'Amir'}];
  }
}

async function loadCurrentUserProfile(){
  if(!token)return null;
  try{
    currentUserProfile=await apiJson('/api/me',{headers:authHeaders(),cache:'no-store'});
  }catch(err){currentUserProfile=null;}
  return currentUserProfile;
}

function populateFlightPeopleSelects(selectedStudent='', selectedInstructor=''){
  const stu=document.getElementById('flightStudentInput');
  if(stu){
    const names=(scheduleStudents||[]).map(s=>s.name).filter(Boolean);
    const unique=[...new Set(names.length?names:waveStudents)];
    stu.innerHTML='<option value="">Choose student</option>'+unique.map(n=>`<option value="${escapeHtml(n)}" ${n===selectedStudent?'selected':''}>${escapeHtml(n)}</option>`).join('');
  }
  const ins=document.getElementById('flightInstructorInput');
  if(ins){
    const names=(scheduleInstructors||[]).map(i=>i.name).filter(Boolean);
    const unique=[...new Set(names.length?names:['Avi','Amir'])];
    ins.innerHTML=unique.map(n=>`<option value="${escapeHtml(n)}" ${n===selectedInstructor?'selected':''}>${escapeHtml(n)}</option>`).join('');
  }
}

const AOA_031_oldShowPage = showPage;
showPage = function(id){
  AOA_031_oldShowPage(id);
  if(id==='schedule'){
    loadCurrentUserProfile().then(()=>renderWaveCalendar());
    loadPeopleForSchedule();
  }
  if(id==='admin'){
    showAdminTab('users');
    loadPeopleForSchedule();
  }
};

const AOA_031_oldLoadSchedule = loadSchedule;
loadSchedule = async function(){
  await loadPeopleForSchedule();
  await loadCurrentUserProfile();
  return AOA_031_oldLoadSchedule();
};

function filteredScheduleFlights(){
  const mode=document.getElementById('scheduleViewFilter')?.value||'all';
  const flights=Array.isArray(waveSchedule)?waveSchedule:[];
  const myName=(currentUserProfile?.student_name||'').trim();
  const hint=document.getElementById('scheduleFilterHint');
  if(mode==='mine'){
    if(hint)hint.textContent=myName?`Showing flights linked to: ${myName}`:'No student profile is linked to your user yet. Ask admin to link you.';
    if(!myName)return [];
    return flights.filter(f=>String(f.student||'').trim().toLowerCase()===myName.toLowerCase());
  }
  if(hint)hint.textContent='My flights require admin to link your user to a student profile.';
  return flights;
}

renderWaveSlot=function(date,time,aircraft,admin){
  const flights=filteredScheduleFlights().filter(f=>f.date===date&&f.time===time&&f.aircraft===aircraft);
  return `<div class="wave-slot ${aircraft==='C172'?'slot-c172':'slot-c152'}" data-date="${date}" data-time="${time}" data-aircraft="${aircraft}"><div class="slot-aircraft">${aircraft}</div>${flights.map(f=>renderFlightCard(f,admin)).join('')||'<div class="empty-slot">—</div>'}</div>`;
};

const AOA_031_oldOpenFlightModal = openFlightModal;
openFlightModal = async function(id){
  if(!canEditSchedule())return toast('Admin only');
  await loadPeopleForSchedule();
  const f=id ? (waveSchedule||[]).find(x=>String(x.id)===String(id)) : null;
  AOA_031_oldOpenFlightModal(id);
  populateFlightPeopleSelects(f?.student||'', f?.instructor||'Avi');
};

function showAdminTab(tab){
  document.querySelectorAll('.admin-tab').forEach(b=>b.classList.toggle('active',b.dataset.adminTab===tab));
  document.querySelectorAll('.admin-panel-card').forEach(c=>c.classList.toggle('active-admin-panel',c.dataset.adminPanel===tab));
  if(tab==='users')loadUsers();
  if(tab==='people')loadPeopleAdminLists();
}

async function loadPeopleAdminLists(){
  await loadPeopleForSchedule();
  const stuPreview=document.querySelector('#studentForm')?.parentElement?.querySelector('.admin-list-preview');
  if(stuPreview)stuPreview.innerHTML=(scheduleStudents||[]).map(s=>`<span>${escapeHtml(s.name)}</span>`).join('')||'<span>No students</span>';
  const fi=document.getElementById('fiAdminList');
  if(fi)fi.innerHTML=(scheduleInstructors||[]).map(x=>`<span>${escapeHtml(x.name)}</span>`).join('')||'<span>No instructors</span>';
}

addFiFromAdmin=async function(){
  const i=document.getElementById('fiNameInput'),name=(i?.value||'').trim();
  if(!name)return toast('Enter FI name');
  const fd=new FormData();fd.append('name',name);fd.append('email','');fd.append('phone','');fd.append('notes','');
  try{await apiJson('/api/instructors',{method:'POST',headers:authHeaders(),body:fd});i.value='';toast('FI added');loadPeopleAdminLists();}
  catch(err){toast(err.message)}
};

const AOA_031_oldStudentSubmit = document.getElementById('studentForm');
document.addEventListener('DOMContentLoaded',()=>{
  const lf=document.querySelector('#loginForm input[name="email"]');
  if(lf){
    const saved=localStorage.getItem('lastLoginEmail')||'';
    if(saved&&!lf.value)lf.value=saved;
  }
  const loginForm=document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit',()=>{
      const email=loginForm.querySelector('input[name="email"]')?.value||'';
      if(email)localStorage.setItem('lastLoginEmail',email);
    },true);
  }
  const sf=document.getElementById('studentForm');
  if(sf){
    sf.addEventListener('submit',()=>setTimeout(loadPeopleAdminLists,500));
  }
});

loadUsers=async function(){
  const list=document.getElementById('usersList');if(!list)return;
  list.innerHTML='<p>Loading users...</p>';
  try{
    await loadPeopleForSchedule();
    const users=await apiJson('/api/users',{headers:authHeaders(),cache:'no-store'});
    const studentOptions=(selected)=>'<option value="">No student link</option>'+(scheduleStudents||[]).map(s=>`<option value="${escapeHtml(s.id)}" ${String(s.id)===String(selected||'')?'selected':''}>${escapeHtml(s.name)}</option>`).join('');
    list.innerHTML=users.map(u=>`<div class="user-row compact-user-row"><div><strong>${escapeHtml(u.email)}</strong><span>${escapeHtml(u.full_name||'')} ${u.phone?(' · '+escapeHtml(u.phone)):''}</span></div><span>${escapeHtml(u.role)} · ${u.approved?'approved':'suspended/pending'}</span><div class="user-actions"><select onchange="updateUserRole('${escapeHtml(u.id)}',this.value)"><option value="student" ${u.role==='student'?'selected':''}>student</option><option value="instructor" ${u.role==='instructor'?'selected':''}>instructor</option><option value="admin" ${u.role==='admin'?'selected':''}>admin</option></select><select onchange="updateUserStudentLink('${escapeHtml(u.id)}',this.value)">${studentOptions(u.student_id)}</select>${!u.approved?`<button class="ghost-button" onclick="approveUser('${escapeHtml(u.id)}')">Approve</button>`:`<button class="ghost-button" onclick="suspendUser('${escapeHtml(u.id)}')">Suspend</button>`}<button class="ghost-button" onclick="deleteUser('${escapeHtml(u.id)}')">Delete</button></div></div>`).join('')||'<p>No users found.</p>';
  }catch(err){list.innerHTML=`<p>${escapeHtml(err.message)}</p>`;}
};
async function updateUserStudentLink(id,student_id){
  try{await apiJson(`/api/users/${encodeURIComponent(id)}/student-link`,{method:'POST',headers:{...authHeaders(),'Content-Type':'application/json'},body:JSON.stringify({student_id})});toast('Student link updated');}
  catch(err){toast(err.message)}
}

loadNotam=async function(){
  const sel=document.getElementById('notamAirportSelect'),out=document.getElementById('notamOutput'),title=document.getElementById('notamTitle'),official=document.getElementById('notamOfficialLink');
  if(!sel||!out||!title)return;
  const icao=sel.value||'LHKE';
  title.textContent=`${icao} NOTAM`;
  out.textContent='Loading official NOTAM links...';
  try{
    const d=await apiJson(`/api/notam/${encodeURIComponent(icao)}`,{cache:'no-store'});
    if(official)official.href=d.official_url||`https://notams.aim.faa.gov/notamSearch/nsapp.html#/results?searchType=0&designatorsForLocation=${encodeURIComponent(icao)}`;
    out.textContent=d.notams||'Use official briefing source.';
  }catch(err){out.textContent=`${err.message}\n\nUse official NOTAM briefing source.`;}
};

/* v0.3.2 student filter, editable students, improved NOTAM source */
function userCanFilterByStudent(){
  return userRole==='admin' || userRole==='instructor';
}

function populateScheduleStudentFilter(){
  const wrap=document.getElementById('scheduleStudentFilterWrap');
  const sel=document.getElementById('scheduleStudentFilter');
  if(!wrap||!sel)return;
  const allowed=userCanFilterByStudent();
  wrap.classList.toggle('hidden',!allowed || (document.getElementById('scheduleViewFilter')?.value!=='student'));
  const current=sel.value;
  const names=[...new Set((scheduleStudents||[]).map(s=>s.name).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
  sel.innerHTML='<option value="">Choose student</option>'+names.map(n=>`<option value="${escapeHtml(n)}" ${n===current?'selected':''}>${escapeHtml(n)}</option>`).join('');
}

function onScheduleFilterChange(){
  const mode=document.getElementById('scheduleViewFilter')?.value||'all';
  if(mode==='student' && !userCanFilterByStudent()){
    document.getElementById('scheduleViewFilter').value='all';
    toast('Student filter is available for admin/instructor only');
  }
  populateScheduleStudentFilter();
  renderWaveCalendar();
}

const AOA_032_oldLoadPeopleForSchedule = loadPeopleForSchedule;
loadPeopleForSchedule = async function(){
  await AOA_032_oldLoadPeopleForSchedule();
  populateScheduleStudentFilter();
};

const AOA_032_oldFilteredScheduleFlights = filteredScheduleFlights;
filteredScheduleFlights = function(){
  const mode=document.getElementById('scheduleViewFilter')?.value||'all';
  const flights=Array.isArray(waveSchedule)?waveSchedule:[];
  const hint=document.getElementById('scheduleFilterHint');
  populateScheduleStudentFilter();
  if(mode==='student'){
    if(!userCanFilterByStudent()){
      if(hint)hint.textContent='Student filter is available for admin/instructor only.';
      return flights;
    }
    const selected=(document.getElementById('scheduleStudentFilter')?.value||'').trim();
    if(hint)hint.textContent=selected?`Showing flights for: ${selected}`:'Choose a student to filter the schedule.';
    if(!selected)return flights;
    return flights.filter(f=>String(f.student||'').trim().toLowerCase()===selected.toLowerCase());
  }
  return AOA_032_oldFilteredScheduleFlights();
};

const AOA_032_oldSetAuthUi = setAuthUi;
setAuthUi=function(){
  AOA_032_oldSetAuthUi();
  if(!userCanFilterByStudent() && document.getElementById('scheduleViewFilter')?.value==='student'){
    document.getElementById('scheduleViewFilter').value='all';
  }
  populateScheduleStudentFilter();
};

function studentCard(s){
  return `<div class="student-admin-row">
    <div><strong>${escapeHtml(s.name)}</strong><span>${escapeHtml(s.email||'')} ${s.program?(' · '+escapeHtml(s.program)):''}</span></div>
    <div class="user-actions">
      <button class="ghost-button" type="button" onclick="openStudentEditModal('${escapeHtml(s.id)}')">Edit</button>
      <button class="ghost-button danger" type="button" onclick="deleteStudent('${escapeHtml(s.id)}')">Delete</button>
    </div>
  </div>`;
}

const AOA_032_oldLoadPeopleAdminLists = loadPeopleAdminLists;
loadPeopleAdminLists = async function(){
  await loadPeopleForSchedule();
  const stuPreview=document.querySelector('#studentForm')?.parentElement?.querySelector('.admin-list-preview');
  if(stuPreview)stuPreview.innerHTML=(scheduleStudents||[]).map(studentCard).join('')||'<span>No students</span>';
  const fi=document.getElementById('fiAdminList');
  if(fi)fi.innerHTML=(scheduleInstructors||[]).map(x=>`<span>${escapeHtml(x.name)}</span>`).join('')||'<span>No instructors</span>';
};

function openStudentEditModal(id){
  const s=(scheduleStudents||[]).find(x=>String(x.id)===String(id));
  if(!s)return toast('Student not found');
  document.getElementById('studentEditId').value=s.id||'';
  document.getElementById('studentEditName').value=s.name||'';
  document.getElementById('studentEditEmail').value=s.email||'';
  document.getElementById('studentEditProgram').value=s.program||'PPL(A)';
  document.getElementById('studentEditNotes').value=s.notes||'';
  document.getElementById('studentEditModal')?.classList.remove('hidden');
}
function closeStudentEditModal(){document.getElementById('studentEditModal')?.classList.add('hidden');}
async function saveStudentEdit(){
  const id=document.getElementById('studentEditId')?.value;
  const payload={
    name:document.getElementById('studentEditName')?.value||'',
    email:document.getElementById('studentEditEmail')?.value||'',
    program:document.getElementById('studentEditProgram')?.value||'PPL(A)',
    notes:document.getElementById('studentEditNotes')?.value||''
  };
  if(!id)return toast('Missing student id');
  try{
    await apiJson(`/api/students/${encodeURIComponent(id)}`,{method:'PUT',headers:{...authHeaders(),'Content-Type':'application/json'},body:JSON.stringify(payload)});
    toast('Student updated');
    closeStudentEditModal();
    await loadPeopleAdminLists();
    renderWaveCalendar();
  }catch(err){toast(err.message)}
}
async function deleteStudent(id){
  if(!confirm('Delete this student record? Existing schedule flights keep the student name as history.'))return;
  try{
    await apiJson(`/api/students/${encodeURIComponent(id)}`,{method:'DELETE',headers:authHeaders()});
    toast('Student deleted');
    await loadPeopleAdminLists();
    renderWaveCalendar();
  }catch(err){toast(err.message)}
}

document.addEventListener('DOMContentLoaded',()=>{
  const f=document.getElementById('studentEditForm');
  if(f)f.addEventListener('submit',e=>{e.preventDefault();saveStudentEdit();});
});

const AOA_032_oldLoadNotam = loadNotam;
loadNotam=async function(){
  const sel=document.getElementById('notamAirportSelect'),out=document.getElementById('notamOutput'),title=document.getElementById('notamTitle'),official=document.getElementById('notamOfficialLink');
  if(!sel||!out||!title)return;
  const icao=sel.value||'LHKE';
  title.textContent=`${icao} NOTAM`;
  out.textContent='Loading raw NOTAM source...';
  try{
    const d=await apiJson(`/api/notam/${encodeURIComponent(icao)}`,{cache:'no-store'});
    if(official)official.href=d.ead_url||d.official_url||`https://notams.aim.faa.gov/notamSearch/nsapp.html#/results?searchType=0&designatorsForLocation=${encodeURIComponent(icao)}`;
    out.textContent=d.notams||'No NOTAM text returned. Use official briefing source.';
  }catch(err){out.textContent=`${err.message}\n\nUse EAD Basic / HungaroControl NetBriefing / FAA NOTAM Search.`;}
};

/* v0.3.3 canonical student aliases + solo Time Building/CPL flights */
const STUDENT_CANONICAL_ALIASES = {
  'harel t':'Harel','harel':'Harel',
  'lior a':'Lior','lior':'Lior',
  'ofek l':'Ofek','ofek':'Ofek',
  'aviad k':'Aviad','aviad':'Aviad',
  'ahmad z':'Ahmad','ahmad':'Ahmad'
};
function canonicalStudentName(name){
  const clean=String(name||'').trim().replace(/\s+/g,' ');
  return STUDENT_CANONICAL_ALIASES[clean.toLowerCase()] || clean;
}
function isSoloProgram(program){
  const p=String(program||'').toLowerCase();
  return (p.includes('time')&&p.includes('building')) || p.includes('hour building') || p.includes('cpl');
}
function studentRecordByAnyName(name){
  const target=canonicalStudentName(name).toLowerCase();
  return (scheduleStudents||[]).find(s=>canonicalStudentName(s.name).toLowerCase()===target) || null;
}
function selectedFlightStudentRecord(){
  const student=document.getElementById('flightStudentInput')?.value||'';
  return studentRecordByAnyName(student);
}
function updateInstructorRequirementHint(){
  const ins=document.getElementById('flightInstructorInput');
  const note=document.getElementById('flightInstructorHint');
  if(!ins)return;
  const rec=selectedFlightStudentRecord();
  const allowed=!!(rec && (rec.solo_allowed || isSoloProgram(rec.program)));
  if(note){
    note.textContent=allowed?'This student is Time Building/CPL: FI may be left empty.':'FI required unless student program is Time Building/CPL.';
  }
}

const AOA_033_oldPopulateFlightPeopleSelects = populateFlightPeopleSelects;
populateFlightPeopleSelects = function(selectedStudent='', selectedInstructor=''){
  const stu=document.getElementById('flightStudentInput');
  if(stu){
    const students=(scheduleStudents||[]).length?scheduleStudents:waveStudents.map(n=>({name:n,program:'PPL(A)'}));
    const seen=new Set();
    const opts=[];
    students.forEach(s=>{
      const name=String(s.name||'').trim();
      if(!name)return;
      const key=name.toLowerCase();
      if(seen.has(key))return;
      seen.add(key);
      const program=s.program?` · ${s.program}`:'';
      const alias=canonicalStudentName(name)!==name?` = ${canonicalStudentName(name)}`:'';
      opts.push(`<option value="${escapeHtml(name)}" ${name===selectedStudent?'selected':''}>${escapeHtml(name+alias+program)}</option>`);
    });
    stu.innerHTML='<option value="">Choose student</option>'+opts.join('');
    stu.onchange=updateInstructorRequirementHint;
  }
  const ins=document.getElementById('flightInstructorInput');
  if(ins){
    const names=(scheduleInstructors||[]).map(i=>i.name).filter(Boolean);
    const unique=[...new Set(names.length?names:['Avi','Amir'])];
    ins.innerHTML='<option value="">No FI / solo flight</option>'+unique.map(n=>`<option value="${escapeHtml(n)}" ${n===selectedInstructor?'selected':''}>${escapeHtml(n)}</option>`).join('');
    ins.value=selectedInstructor||'';
  }
  let hint=document.getElementById('flightInstructorHint');
  if(!hint && ins){
    hint=document.createElement('div');
    hint.id='flightInstructorHint';
    hint.className='field-hint';
    ins.parentElement?.appendChild(hint);
  }
  updateInstructorRequirementHint();
};

const AOA_033_oldFilteredScheduleFlights = filteredScheduleFlights;
filteredScheduleFlights = function(){
  const mode=document.getElementById('scheduleViewFilter')?.value||'all';
  const flights=Array.isArray(waveSchedule)?waveSchedule:[];
  const hint=document.getElementById('scheduleFilterHint');
  const studentFilter=document.getElementById('scheduleStudentFilter')?.value||'';
  if(studentFilter && (userRole==='admin'||userRole==='instructor')){
    const wanted=canonicalStudentName(studentFilter).toLowerCase();
    if(hint)hint.textContent=`Showing flights for ${studentFilter}.`;
    return flights.filter(f=>canonicalStudentName(f.student).toLowerCase()===wanted);
  }
  if(mode==='mine'){
    const myName=(currentUserProfile?.student_name||'').trim();
    if(hint)hint.textContent=myName?`Showing flights linked to: ${myName}`:'No student profile is linked to your user yet. Ask admin to link you.';
    if(!myName)return [];
    const wanted=canonicalStudentName(myName).toLowerCase();
    return flights.filter(f=>canonicalStudentName(f.student).toLowerCase()===wanted);
  }
  if(hint)hint.textContent='My flights require admin to link your user to a student profile.';
  return flights;
};

const AOA_033_oldSaveFlightFromModal = saveFlightFromModal;
saveFlightFromModal = function(){
  const student=(document.getElementById('flightStudentInput')?.value||'').trim();
  const instructor=(document.getElementById('flightInstructorInput')?.value||'').trim();
  const rec=studentRecordByAnyName(student);
  if(student && !instructor && !(rec && (rec.solo_allowed || isSoloProgram(rec.program)))){
    return toast('Instructor is required unless this student is Time Building/CPL.');
  }
  return AOA_033_oldSaveFlightFromModal();
};

const AOA_033_oldRenderFlightCard = renderFlightCard;
renderFlightCard = function(f,admin){
  const card = AOA_033_oldRenderFlightCard(f,admin);
  if(String(f.instructor||'').trim()) return card;
  return card.replace('<span class="aircraft-tag">', '<span class="instructor-tag tag-solo">No FI</span><span class="aircraft-tag">');
};


/* v0.6.9 schedule day names, robust all/student/FI filters, conflict marking */
function aoa035DateLabel(dateStr){
  const parts=String(dateStr||'').split('-').map(Number);
  const d=parts.length===3?new Date(parts[0],parts[1]-1,parts[2]):new Date(dateStr);
  if(isNaN(d.getTime()))return String(dateStr||'');
  const day=d.toLocaleDateString('en-US',{weekday:'long'});
  const date=d.toLocaleDateString('en-GB',{day:'2-digit',month:'short'});
  return `${day} ${date}`;
}
function userCanUseAdminScheduleFilters(){return userRole==='admin'||userRole==='instructor';}
function populateScheduleInstructorFilter(){
  const wrap=document.getElementById('scheduleInstructorFilterWrap');
  const sel=document.getElementById('scheduleInstructorFilter');
  if(!wrap||!sel)return;
  const mode=document.getElementById('scheduleViewFilter')?.value||'all';
  const allowed=userCanUseAdminScheduleFilters();
  wrap.classList.toggle('hidden',!allowed || mode!=='instructor');
  const current=sel.value;
  const names=[...new Set([...(scheduleInstructors||[]).map(i=>i.name),...(waveSchedule||[]).map(f=>f.instructor)].filter(Boolean))].sort((a,b)=>a.localeCompare(b));
  sel.innerHTML='<option value="">Choose FI</option>'+names.map(n=>`<option value="${escapeHtml(n)}" ${n===current?'selected':''}>${escapeHtml(n)}</option>`).join('');
}
const AOA_035_oldPopulateScheduleStudentFilter = typeof populateScheduleStudentFilter==='function'?populateScheduleStudentFilter:null;
populateScheduleStudentFilter=function(){
  if(AOA_035_oldPopulateScheduleStudentFilter)AOA_035_oldPopulateScheduleStudentFilter();
  populateScheduleInstructorFilter();
};

onScheduleFilterChange=function(){
  const filter=document.getElementById('scheduleViewFilter');
  let mode=filter?.value||'all';
  if((mode==='student'||mode==='instructor')&&!userCanUseAdminScheduleFilters()){
    if(filter)filter.value='all';
    mode='all';
    toast('Student/FI filters are available for admin or instructor only');
  }
  const stu=document.getElementById('scheduleStudentFilter');
  const ins=document.getElementById('scheduleInstructorFilter');
  if(mode!=='student'&&stu)stu.value='';
  if(mode!=='instructor'&&ins)ins.value='';
  populateScheduleStudentFilter();
  renderWaveCalendar();
};

filteredScheduleFlights=function(){
  const mode=document.getElementById('scheduleViewFilter')?.value||'all';
  const flights=Array.isArray(waveSchedule)?waveSchedule:[];
  const hint=document.getElementById('scheduleFilterHint');
  if(mode==='student'){
    if(!userCanUseAdminScheduleFilters()){
      if(hint)hint.textContent='Student filter is available for admin/instructor only.';
      return flights;
    }
    const selected=(document.getElementById('scheduleStudentFilter')?.value||'').trim();
    if(!selected){if(hint)hint.textContent='Choose a student to filter the schedule.';return flights;}
    const wanted=canonicalStudentName(selected).toLowerCase();
    if(hint)hint.textContent=`Showing flights for ${selected}.`;
    return flights.filter(f=>canonicalStudentName(f.student).toLowerCase()===wanted);
  }
  if(mode==='instructor'){
    if(!userCanUseAdminScheduleFilters()){
      if(hint)hint.textContent='FI filter is available for admin/instructor only.';
      return flights;
    }
    const selected=(document.getElementById('scheduleInstructorFilter')?.value||'').trim();
    if(!selected){if(hint)hint.textContent='Choose an FI to filter the schedule.';return flights;}
    if(hint)hint.textContent=`Showing flights with FI: ${selected}.`;
    return flights.filter(f=>String(f.instructor||'').trim().toLowerCase()===selected.toLowerCase());
  }
  if(mode==='mine'){
    const myName=(currentUserProfile?.student_name||'').trim();
    if(hint)hint.textContent=myName?`Showing flights linked to: ${myName}`:'No student profile is linked to your user yet. Ask admin to link you.';
    if(!myName)return [];
    const wanted=canonicalStudentName(myName).toLowerCase();
    return flights.filter(f=>canonicalStudentName(f.student).toLowerCase()===wanted);
  }
  if(hint)hint.textContent='Showing all flights.';
  return flights;
};

function aoa035FlightConflictReasons(f){
  const list=Array.isArray(waveSchedule)?waveSchedule:[];
  const sameSlot=list.filter(x=>String(x.id)!==String(f.id)&&x.date===f.date&&x.time===f.time);
  const reasons=[];
  if(f.aircraft && sameSlot.some(x=>x.aircraft===f.aircraft))reasons.push('aircraft overlap');
  if(f.instructor && sameSlot.some(x=>String(x.instructor||'').trim() && String(x.instructor).trim().toLowerCase()===String(f.instructor).trim().toLowerCase()))reasons.push('FI overlap');
  if(f.student && sameSlot.some(x=>canonicalStudentName(x.student).toLowerCase()===canonicalStudentName(f.student).toLowerCase()))reasons.push('student overlap');
  return reasons;
}
const AOA_035_oldRenderFlightCard = renderFlightCard;
renderFlightCard=function(f,admin){
  let card=AOA_035_oldRenderFlightCard(f,admin);
  const reasons=aoa035FlightConflictReasons(f);
  if(reasons.length){
    card=card.replace('</div></div>', `<span class="conflict-pill">Conflict: ${escapeHtml(reasons.join(', '))}</span></div></div>`);
  }
  return card;
};

renderWaveCalendar=function(){
  const cal=document.getElementById('waveCalendar');
  if(!cal)return;
  populateScheduleStudentFilter();
  const admin=canEditSchedule();
  const days=getActiveWaveDays();
  const times=scheduleTimes();
  cal.innerHTML=days.map(day=>`<section class="wave-day-card"><div class="wave-day-header">${aoa035DateLabel(day.date)}</div><div class="wave-day-grid">${times.map(time=>`<div class="wave-time-row"><div class="wave-time-label">${time}</div><div class="wave-slot-pair">${waveAircraft.map(ac=>renderWaveSlot(day.date,time,ac,admin)).join('')}</div></div>`).join('')}</div></section>`).join('');
  if(admin)attachScheduleDragHandlers();
};

const AOA_035_oldLoadSchedule = loadSchedule;
loadSchedule=async function(){
  await AOA_035_oldLoadSchedule();
  populateScheduleStudentFilter();
  populateScheduleInstructorFilter();
};


/* ===== 0.6.9 multi-wave system ===== */
let currentTrainingWave = localStorage.getItem("aoa_active_wave") || "legacy";

function initializeTrainingWaveSystem(){
  try{
    const selector=document.getElementById("waveSelector");
    if(selector){
      selector.value=currentTrainingWave;
    }
    migrateLegacyWaveData();
    loadWaveSchedule();
  }catch(err){
    console.error("wave init failed",err);
  }
}

function migrateLegacyWaveData(){
  try{
    const existing=localStorage.getItem("schedule");
    const legacy=localStorage.getItem("schedule_legacy");
    if(existing && !legacy){
      localStorage.setItem("schedule_legacy", existing);
    }
  }catch(err){
    console.error(err);
  }
}

function getWaveScheduleKey(){
  return "schedule_" + currentTrainingWave;
}

function switchTrainingWave(){
  const selector=document.getElementById("waveSelector");
  if(!selector)return;
  currentTrainingWave=selector.value;
  localStorage.setItem("aoa_active_wave", currentTrainingWave);
  loadWaveSchedule();
  toast("Switched to " + selector.options[selector.selectedIndex].text);
}

function createTrainingWave(){
  const name=prompt("Wave ID (example: july_2026)");
  if(!name)return;
  const selector=document.getElementById("waveSelector");
  const option=document.createElement("option");
  option.value=name;
  option.textContent=name.replace(/_/g," ");
  selector.appendChild(option);
  selector.value=name;
  currentTrainingWave=name;
  localStorage.setItem("aoa_active_wave", currentTrainingWave);

  const waves=JSON.parse(localStorage.getItem("aoa_wave_list")||"[]");
  if(!waves.includes(name)){
    waves.push(name);
    localStorage.setItem("aoa_wave_list", JSON.stringify(waves));
  }

  localStorage.setItem(getWaveScheduleKey(), JSON.stringify([]));
  loadWaveSchedule();
}

function loadWaveSchedule(){
  try{
    const raw=localStorage.getItem(getWaveScheduleKey()) || "[]";
    window.waveSchedule=JSON.parse(raw);
    if(typeof renderSchedule === "function"){
      renderSchedule();
    }
  }catch(err){
    console.error(err);
  }
}

function saveCurrentWaveSchedule(){
  try{
    localStorage.setItem(getWaveScheduleKey(), JSON.stringify(window.waveSchedule || []));
  }catch(err){
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", ()=>{
  setTimeout(initializeTrainingWaveSystem,300);
});
/* ===== end 0.6.9 ===== */


/* ===== 0.6.9 real wave switcher override ===== */
const AOA_WAVES = {
  legacy: {
    id:"legacy",
    name:"Legacy Wave",
    start:"2026-05-03",
    end:"2026-05-10",
    aircraft:["C172","C152"]
  },
  may_2026: {
    id:"may_2026",
    name:"May 3–10",
    start:"2026-05-03",
    end:"2026-05-10",
    aircraft:["C172","C152"]
  },
  june_2026: {
    id:"june_2026",
    name:"June 3–8",
    start:"2026-06-03",
    end:"2026-06-08",
    aircraft:["Aircraft 1","Aircraft 2"]
  }
};

function getCurrentWaveConfig(){
  return AOA_WAVES[currentTrainingWave] || AOA_WAVES.legacy;
}

function getWaveScheduleKey(){
  return "aoa_wave_schedule_" + currentTrainingWave;
}

function setActiveWaveLabel(){
  const label=document.getElementById("activeWaveLabel");
  const cfg=getCurrentWaveConfig();
  if(label) label.textContent=cfg.name;
}

function getWaveDaysForCurrentWave(){
  const cfg=getCurrentWaveConfig();
  const out=[];
  const start=new Date(`${cfg.start}T12:00:00`);
  const end=new Date(`${cfg.end}T12:00:00`);
  for(let d=new Date(start); d<=end; d.setDate(d.getDate()+1)){
    const y=d.getFullYear();
    const m=String(d.getMonth()+1).padStart(2,"0");
    const day=String(d.getDate()).padStart(2,"0");
    const date=`${y}-${m}-${day}`;
    out.push({date,label:d.toLocaleDateString("en-US",{month:"short",day:"numeric"})});
  }
  return out;
}

function getWaveAircraftForCurrentWave(){
  return getCurrentWaveConfig().aircraft || ["C172","C152"];
}

function migrateCurrentDbScheduleIntoWaveIfNeeded(){
  try{
    const key=getWaveScheduleKey();
    if(localStorage.getItem(key)) return;
    if(currentTrainingWave==="legacy" || currentTrainingWave==="may_2026"){
      localStorage.setItem(key, JSON.stringify(waveSchedule || []));
    }else{
      localStorage.setItem(key, JSON.stringify([]));
    }
  }catch(e){}
}

function switchTrainingWave(){
  const selector=document.getElementById("waveSelector");
  if(!selector)return;
  currentTrainingWave=selector.value;
  localStorage.setItem("aoa_active_wave",currentTrainingWave);
  setActiveWaveLabel();
  loadSchedule();
  toast("Switched to " + selector.options[selector.selectedIndex].text);
}

async function loadSchedule(){
  const guest=document.getElementById("scheduleGuestMessage"),app=document.getElementById("waveScheduleApp");
  if(!token){
    guest?.classList.remove("hidden");
    app?.classList.add("hidden");
    return;
  }
  guest?.classList.add("hidden");
  app?.classList.remove("hidden");
  setActiveWaveLabel();

  try{
    if(currentTrainingWave==="legacy" && !localStorage.getItem(getWaveScheduleKey())){
      const r=await fetch("/api/wave-schedule",{headers:authHeaders()});
      const d=await r.json();
      waveSchedule=(r.ok&&Array.isArray(d.flights))?d.flights:[];
      localStorage.setItem(getWaveScheduleKey(),JSON.stringify(waveSchedule));
    }else{
      const raw=localStorage.getItem(getWaveScheduleKey());
      waveSchedule=raw?JSON.parse(raw):[];
    }
  }catch(err){
    console.error(err);
    waveSchedule=[];
  }
  renderWaveCalendar();
}

async function saveWaveSchedule(){
  if(!canEditSchedule())return toast("Admin only");
  try{
    localStorage.setItem(getWaveScheduleKey(),JSON.stringify(waveSchedule||[]));
    if(currentTrainingWave==="legacy"){
      const r=await fetch("/api/wave-schedule",{method:"POST",headers:{...authHeaders(),"Content-Type":"application/json"},body:JSON.stringify({flights:waveSchedule})});
      const d=await r.json().catch(()=>({}));
      if(!r.ok)throw new Error(d.detail||"Could not save schedule");
    }
    toast("Training wave schedule saved");
  }catch(err){
    toast(err.message||"Could not save schedule");
  }
}

async function resetWaveSchedule(){
  if(!canEditSchedule())return toast("Admin only");
  waveSchedule=[];
  localStorage.setItem(getWaveScheduleKey(),JSON.stringify(waveSchedule));
  renderWaveCalendar();
  toast("Wave cleared");
}

function renderWaveCalendar(){
  const cal=document.getElementById("waveCalendar");
  if(!cal)return;
  const admin=canEditSchedule();
  const days=getWaveDaysForCurrentWave();
  const aircraft=getWaveAircraftForCurrentWave();
  cal.innerHTML=days.map(day=>`<section class="wave-day-card" data-date="${day.date}">
    <div class="wave-day-header"><span>${formatWaveDayTitle(day.date,day.label)}</span></div>
    <div class="wave-day-grid">${waveTimes.map(time=>`<div class="wave-time-row"><div class="wave-time-label">${time}</div><div class="wave-slot-pair">${aircraft.map(ac=>renderWaveSlot(day.date,time,ac,admin)).join("")}</div></div>`).join("")}</div>
  </section>`).join("");
  if(admin)attachScheduleDragHandlers();
}

function renderWaveSlot(date,time,aircraft,admin){
  const flights=waveSchedule.filter(f=>f.date===date&&String(f.time)===String(time)&&String(f.aircraft)===String(aircraft));
  const acClass=(String(aircraft).includes("2")||aircraft==="C152")?"slot-c152":"slot-c172";
  return `<div class="wave-slot ${acClass}" data-date="${date}" data-time="${time}" data-aircraft="${escapeHtml(aircraft)}"><div class="slot-aircraft">${escapeHtml(aircraft)}</div>${flights.map(f=>renderFlightCard(f,admin)).join("")||'<div class="empty-slot">—</div>'}</div>`;
}

function initializeTrainingWaveSystem(){
  const selector=document.getElementById("waveSelector");
  if(selector){
    selector.value=currentTrainingWave;
    if(!selector.value){selector.value="legacy";currentTrainingWave="legacy";}
  }
  setActiveWaveLabel();
}
/* ===== end 0.6.9 real wave switcher override ===== */


/* ===== 0.6.9 verified backend-driven multi-wave override ===== */
const AOA_WAVES_062 = {
  legacy: {id:"legacy", name:"Legacy Wave", start:"2026-05-03", end:"2026-05-10", aircraft:["C172","C152"]},
  may_2026: {id:"may_2026", name:"May 3–10", start:"2026-05-03", end:"2026-05-10", aircraft:["C172","C152"]},
  june_2026: {id:"june_2026", name:"June 3–8", start:"2026-06-03", end:"2026-06-08", aircraft:["Aircraft 1","Aircraft 2"]}
};

function getCurrentWaveConfig(){
  return AOA_WAVES_062[currentTrainingWave] || AOA_WAVES_062.legacy;
}

function activeWaveQuery(){
  return `wave_id=${encodeURIComponent(currentTrainingWave || "legacy")}`;
}

function setActiveWaveLabel(){
  const cfg=getCurrentWaveConfig();
  const label=document.getElementById("activeWaveLabel");
  if(label) label.textContent=cfg.name;
  const selector=document.getElementById("waveSelector");
  if(selector && selector.value!==currentTrainingWave) selector.value=currentTrainingWave;
}

function getWaveDaysForCurrentWave(){
  const cfg=getCurrentWaveConfig();
  const out=[];
  const start=new Date(`${cfg.start}T12:00:00`);
  const end=new Date(`${cfg.end}T12:00:00`);
  for(let d=new Date(start); d<=end; d.setDate(d.getDate()+1)){
    const date=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    out.push({date,label:d.toLocaleDateString("en-US",{month:"short",day:"numeric"})});
  }
  return out;
}

function getWaveAircraftForCurrentWave(){
  return getCurrentWaveConfig().aircraft || ["Aircraft 1","Aircraft 2"];
}

async function switchTrainingWave(){
  const selector=document.getElementById("waveSelector");
  if(!selector)return;
  currentTrainingWave=selector.value || "legacy";
  localStorage.setItem("aoa_active_wave",currentTrainingWave);
  setActiveWaveLabel();
  await loadSchedule();
  toast("Switched to " + selector.options[selector.selectedIndex].text);
}

async function loadSchedule(){
  const guest=document.getElementById("scheduleGuestMessage"),app=document.getElementById("waveScheduleApp");
  if(!token){
    guest?.classList.remove("hidden");
    app?.classList.add("hidden");
    return;
  }
  guest?.classList.add("hidden");
  app?.classList.remove("hidden");
  setActiveWaveLabel();
  try{
    const r=await fetch(`/api/wave-schedule?${activeWaveQuery()}`,{headers:authHeaders()});
    const d=await r.json();
    if(!r.ok) throw new Error(d.detail || "Could not load wave");
    waveSchedule=Array.isArray(d.flights)?d.flights:[];
  }catch(err){
    console.error(err);
    waveSchedule=[];
    toast(err.message || "Could not load wave");
  }
  renderWaveCalendar();
}

async function saveWaveSchedule(){
  if(!canEditSchedule())return toast("Admin only");
  try{
    const r=await fetch(`/api/wave-schedule?${activeWaveQuery()}`,{
      method:"POST",
      headers:{...authHeaders(),"Content-Type":"application/json"},
      body:JSON.stringify({flights:waveSchedule})
    });
    const d=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(d.detail||"Could not save schedule");
    toast("Training wave schedule saved");
  }catch(err){
    toast(err.message||"Could not save schedule");
  }
}

async function verifyScheduleDb(){
  if(!canEditSchedule())return toast("Admin only");
  try{
    const r=await fetch(`/api/wave-schedule/verify?${activeWaveQuery()}`,{method:"POST",headers:authHeaders()});
    const d=await r.json();
    if(!r.ok)throw new Error(d.detail||"Verify failed");
    waveSchedule=Array.isArray(d.flights)?d.flights:waveSchedule;
    renderWaveCalendar();
    toast(`Verified ${d.count} flights in ${getCurrentWaveConfig().name}`);
  }catch(err){
    toast(err.message||"Verify failed");
  }
}

async function resetWaveSchedule(){
  if(!canEditSchedule())return toast("Admin only");
  if(!confirm(`Clear all flights from ${getCurrentWaveConfig().name}?`))return;
  waveSchedule=[];
  renderWaveCalendar();
  await saveWaveSchedule();
}

function renderWaveCalendar(){
  const cal=document.getElementById("waveCalendar");
  if(!cal)return;
  const admin=canEditSchedule();
  const days=getWaveDaysForCurrentWave();
  const aircraft=getWaveAircraftForCurrentWave();
  cal.innerHTML=days.map(day=>`<section class="wave-day-card" data-date="${day.date}">
    <div class="wave-day-header"><span>${formatWaveDayTitle(day.date,day.label)}</span></div>
    <div class="wave-day-grid">${waveTimes.map(time=>`<div class="wave-time-row"><div class="wave-time-label">${time}</div><div class="wave-slot-pair">${aircraft.map(ac=>renderWaveSlot(day.date,time,ac,admin)).join("")}</div></div>`).join("")}</div>
  </section>`).join("");
  if(admin)attachScheduleDragHandlers();
}

function renderWaveSlot(date,time,aircraft,admin){
  const flights=waveSchedule.filter(f=>f.date===date&&String(f.time)===String(time)&&String(f.aircraft)===String(aircraft));
  const acClass=(String(aircraft).includes("2")||aircraft==="C152")?"slot-c152":"slot-c172";
  return `<div class="wave-slot ${acClass}" data-date="${date}" data-time="${time}" data-aircraft="${escapeHtml(aircraft)}"><div class="slot-aircraft">${escapeHtml(aircraft)}</div>${flights.map(f=>renderFlightCard(f,admin)).join("")||'<div class="empty-slot">—</div>'}</div>`;
}

function initializeTrainingWaveSystem(){
  currentTrainingWave=localStorage.getItem("aoa_active_wave") || "legacy";
  const selector=document.getElementById("waveSelector");
  if(selector){
    selector.value=currentTrainingWave;
    if(!selector.value){
      currentTrainingWave="legacy";
      selector.value="legacy";
    }
  }
  setActiveWaveLabel();
}
/* ===== end 0.6.9 verified backend-driven multi-wave override ===== */


/* ===== 0.6.9 HARD VERIFIED WAVE SYSTEM ===== */
window.AOA_JUNE_2026_SEED = [{"id": "june_2026_20260603_0800_aircraft1", "date": "2026-06-03", "time": "0800", "aircraft": "Aircraft 1", "student": "Nadav L", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260603_0800_aircraft2", "date": "2026-06-03", "time": "0800", "aircraft": "Aircraft 2", "student": "Ahmad Z", "instructor": "Vlad", "note": ""}, {"id": "june_2026_20260603_1000_aircraft1", "date": "2026-06-03", "time": "1000", "aircraft": "Aircraft 1", "student": "Sharon C", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260603_1000_aircraft2", "date": "2026-06-03", "time": "1000", "aircraft": "Aircraft 2", "student": "Harel T", "instructor": "Vlad", "note": ""}, {"id": "june_2026_20260603_1200_aircraft1", "date": "2026-06-03", "time": "1200", "aircraft": "Aircraft 1", "student": "Aviv E", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260603_1200_aircraft2", "date": "2026-06-03", "time": "1200", "aircraft": "Aircraft 2", "student": "Lior A", "instructor": "Vlad", "note": ""}, {"id": "june_2026_20260603_1400_aircraft1", "date": "2026-06-03", "time": "1400", "aircraft": "Aircraft 1", "student": "Lior A", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260603_1400_aircraft2", "date": "2026-06-03", "time": "1400", "aircraft": "Aircraft 2", "student": "Sharon C", "instructor": "Vlad", "note": ""}, {"id": "june_2026_20260603_1600_aircraft1", "date": "2026-06-03", "time": "1600", "aircraft": "Aircraft 1", "student": "Harel T", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260603_1600_aircraft2", "date": "2026-06-03", "time": "1600", "aircraft": "Aircraft 2", "student": "Aviv E", "instructor": "Vlad", "note": ""}, {"id": "june_2026_20260604_0800_aircraft1", "date": "2026-06-04", "time": "0800", "aircraft": "Aircraft 1", "student": "Nadav L EXAM", "instructor": "", "note": "EXAM"}, {"id": "june_2026_20260604_0800_aircraft2", "date": "2026-06-04", "time": "0800", "aircraft": "Aircraft 2", "student": "Ahmad Z", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260604_1000_aircraft1", "date": "2026-06-04", "time": "1000", "aircraft": "Aircraft 1", "student": "Harel T", "instructor": "Vlad", "note": ""}, {"id": "june_2026_20260604_1000_aircraft2", "date": "2026-06-04", "time": "1000", "aircraft": "Aircraft 2", "student": "Sharon C", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260604_1200_aircraft1", "date": "2026-06-04", "time": "1200", "aircraft": "Aircraft 1", "student": "Aviv E", "instructor": "Vlad", "note": ""}, {"id": "june_2026_20260604_1200_aircraft2", "date": "2026-06-04", "time": "1200", "aircraft": "Aircraft 2", "student": "Harel T", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260604_1400_aircraft1", "date": "2026-06-04", "time": "1400", "aircraft": "Aircraft 1", "student": "Ahmad Z", "instructor": "Vlad", "note": ""}, {"id": "june_2026_20260604_1400_aircraft2", "date": "2026-06-04", "time": "1400", "aircraft": "Aircraft 2", "student": "Lior A", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260604_1600_aircraft1", "date": "2026-06-04", "time": "1600", "aircraft": "Aircraft 1", "student": "Aviv E", "instructor": "Vlad", "note": ""}, {"id": "june_2026_20260604_1600_aircraft2", "date": "2026-06-04", "time": "1600", "aircraft": "Aircraft 2", "student": "Sharon C", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260605_0800_aircraft1", "date": "2026-06-05", "time": "0800", "aircraft": "Aircraft 1", "student": "Ahmad Z", "instructor": "Amir", "note": "3h block"}, {"id": "june_2026_20260605_0800_aircraft2", "date": "2026-06-05", "time": "0800", "aircraft": "Aircraft 2", "student": "Sharon C", "instructor": "Vlad", "note": ""}, {"id": "june_2026_20260605_1000_aircraft1", "date": "2026-06-05", "time": "1000", "aircraft": "Aircraft 1", "student": "Ahmad Z", "instructor": "Amir", "note": "CONT"}, {"id": "june_2026_20260605_1000_aircraft2", "date": "2026-06-05", "time": "1000", "aircraft": "Aircraft 2", "student": "Lior A", "instructor": "Vlad", "note": ""}, {"id": "june_2026_20260605_1200_aircraft1", "date": "2026-06-05", "time": "1200", "aircraft": "Aircraft 1", "student": "Harel T", "instructor": "Amir", "note": ""}, {"id": "june_2026_20260605_1200_aircraft2", "date": "2026-06-05", "time": "1200", "aircraft": "Aircraft 2", "student": "Aviv E", "instructor": "Vlad", "note": ""}, {"id": "june_2026_20260605_1400_aircraft1", "date": "2026-06-05", "time": "1400", "aircraft": "Aircraft 1", "student": "Sharon C", "instructor": "Amir", "note": ""}, {"id": "june_2026_20260605_1400_aircraft2", "date": "2026-06-05", "time": "1400", "aircraft": "Aircraft 2", "student": "Lior A", "instructor": "Vlad", "note": ""}, {"id": "june_2026_20260605_1600_aircraft1", "date": "2026-06-05", "time": "1600", "aircraft": "Aircraft 1", "student": "Aviv E", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260605_1600_aircraft2", "date": "2026-06-05", "time": "1600", "aircraft": "Aircraft 2", "student": "Harel T", "instructor": "Vlad", "note": ""}, {"id": "june_2026_20260606_0800_aircraft1", "date": "2026-06-06", "time": "0800", "aircraft": "Aircraft 1", "student": "Ahmad Z", "instructor": "Amir", "note": "3h block"}, {"id": "june_2026_20260606_0800_aircraft2", "date": "2026-06-06", "time": "0800", "aircraft": "Aircraft 2", "student": "Aviv E", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260606_1000_aircraft1", "date": "2026-06-06", "time": "1000", "aircraft": "Aircraft 1", "student": "Ahmad Z", "instructor": "Amir", "note": "CONT"}, {"id": "june_2026_20260606_1000_aircraft2", "date": "2026-06-06", "time": "1000", "aircraft": "Aircraft 2", "student": "Harel T", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260606_1200_aircraft1", "date": "2026-06-06", "time": "1200", "aircraft": "Aircraft 1", "student": "Sharon C", "instructor": "Amir", "note": "3h block"}, {"id": "june_2026_20260606_1200_aircraft2", "date": "2026-06-06", "time": "1200", "aircraft": "Aircraft 2", "student": "Lior A", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260606_1400_aircraft1", "date": "2026-06-06", "time": "1400", "aircraft": "Aircraft 1", "student": "Sharon C", "instructor": "Amir", "note": "CONT"}, {"id": "june_2026_20260606_1400_aircraft2", "date": "2026-06-06", "time": "1400", "aircraft": "Aircraft 2", "student": "Aviv E", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260606_1600_aircraft1", "date": "2026-06-06", "time": "1600", "aircraft": "Aircraft 1", "student": "Lior A", "instructor": "Amir", "note": ""}, {"id": "june_2026_20260606_1600_aircraft2", "date": "2026-06-06", "time": "1600", "aircraft": "Aircraft 2", "student": "Harel T", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260607_0800_aircraft1", "date": "2026-06-07", "time": "0800", "aircraft": "Aircraft 1", "student": "Sharon C", "instructor": "Amir", "note": "3h block"}, {"id": "june_2026_20260607_0800_aircraft2", "date": "2026-06-07", "time": "0800", "aircraft": "Aircraft 2", "student": "Lior A", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260607_1000_aircraft1", "date": "2026-06-07", "time": "1000", "aircraft": "Aircraft 1", "student": "Sharon C", "instructor": "Amir", "note": "CONT"}, {"id": "june_2026_20260607_1000_aircraft2", "date": "2026-06-07", "time": "1000", "aircraft": "Aircraft 2", "student": "Ahmad Z", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260607_1200_aircraft1", "date": "2026-06-07", "time": "1200", "aircraft": "Aircraft 1", "student": "Harel T", "instructor": "Amir", "note": ""}, {"id": "june_2026_20260607_1200_aircraft2", "date": "2026-06-07", "time": "1200", "aircraft": "Aircraft 2", "student": "Aviv E", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260607_1400_aircraft1", "date": "2026-06-07", "time": "1400", "aircraft": "Aircraft 1", "student": "Lior A", "instructor": "Amir", "note": ""}, {"id": "june_2026_20260607_1400_aircraft2", "date": "2026-06-07", "time": "1400", "aircraft": "Aircraft 2", "student": "Harel T", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260607_1600_aircraft1", "date": "2026-06-07", "time": "1600", "aircraft": "Aircraft 1", "student": "Ahmad Z", "instructor": "Amir", "note": ""}, {"id": "june_2026_20260607_1600_aircraft2", "date": "2026-06-07", "time": "1600", "aircraft": "Aircraft 2", "student": "Aviv E", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260608_0800_aircraft1", "date": "2026-06-08", "time": "0800", "aircraft": "Aircraft 1", "student": "Harel T", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260608_0800_aircraft2", "date": "2026-06-08", "time": "0800", "aircraft": "Aircraft 2", "student": "Ahmad Z EXAM", "instructor": "", "note": "EXAM"}, {"id": "june_2026_20260608_1000_aircraft1", "date": "2026-06-08", "time": "1000", "aircraft": "Aircraft 1", "student": "Lior A", "instructor": "Amir", "note": ""}, {"id": "june_2026_20260608_1000_aircraft2", "date": "2026-06-08", "time": "1000", "aircraft": "Aircraft 2", "student": "Sharon C EXAM", "instructor": "", "note": "EXAM"}, {"id": "june_2026_20260608_1200_aircraft1", "date": "2026-06-08", "time": "1200", "aircraft": "Aircraft 1", "student": "Aviv E", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260608_1200_aircraft2", "date": "2026-06-08", "time": "1200", "aircraft": "Aircraft 2", "student": "Harel T", "instructor": "Amir", "note": ""}, {"id": "june_2026_20260608_1400_aircraft1", "date": "2026-06-08", "time": "1400", "aircraft": "Aircraft 1", "student": "Lior A", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260608_1400_aircraft2", "date": "2026-06-08", "time": "1400", "aircraft": "Aircraft 2", "student": "Aviv E", "instructor": "Amir", "note": ""}, {"id": "june_2026_20260608_1600_aircraft1", "date": "2026-06-08", "time": "1600", "aircraft": "Aircraft 1", "student": "Harel T", "instructor": "Avi", "note": ""}, {"id": "june_2026_20260608_1600_aircraft2", "date": "2026-06-08", "time": "1600", "aircraft": "Aircraft 2", "student": "Lior A", "instructor": "Amir", "note": ""}];

window.AOA_WAVES_063 = {
  legacy: {id:"legacy", name:"Legacy Wave", start:"2026-05-03", end:"2026-05-10", aircraft:["C172","C152"]},
  may_2026: {id:"may_2026", name:"May 3–10", start:"2026-05-03", end:"2026-05-10", aircraft:["C172","C152"]},
  june_2026: {id:"june_2026", name:"June 3–8", start:"2026-06-03", end:"2026-06-08", aircraft:["Aircraft 1","Aircraft 2"]}
};

window.getCurrentWaveConfig = function(){
  return window.AOA_WAVES_063[currentTrainingWave] || window.AOA_WAVES_063.legacy;
};

window.activeWaveQuery = function(){
  return `wave_id=${encodeURIComponent(currentTrainingWave || "legacy")}`;
};

window.setActiveWaveLabel = function(){
  const cfg=window.getCurrentWaveConfig();
  const label=document.getElementById("activeWaveLabel");
  if(label) label.textContent=cfg.name;
  const selector=document.getElementById("waveSelector");
  if(selector && selector.value!==currentTrainingWave) selector.value=currentTrainingWave;
  const status=document.getElementById("waveDebugStatus");
  if(status) status.textContent=`${cfg.name} · ${(window.waveSchedule||[]).length} flights`;
};

window.getWaveDaysForCurrentWave = function(){
  const cfg=window.getCurrentWaveConfig();
  const out=[];
  const start=new Date(`${cfg.start}T12:00:00`);
  const end=new Date(`${cfg.end}T12:00:00`);
  for(let d=new Date(start); d<=end; d.setDate(d.getDate()+1)){
    const date=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
    out.push({date,label:d.toLocaleDateString("en-US",{month:"short",day:"numeric"})});
  }
  return out;
};

window.getWaveAircraftForCurrentWave = function(){
  return window.getCurrentWaveConfig().aircraft || ["Aircraft 1","Aircraft 2"];
};

window.renderWaveCalendar = function(){
  const cal=document.getElementById("waveCalendar");
  if(!cal)return;
  const admin=canEditSchedule();
  const days=window.getWaveDaysForCurrentWave();
  const aircraft=window.getWaveAircraftForCurrentWave();
  cal.innerHTML=days.map(day=>`<section class="wave-day-card" data-date="${day.date}">
    <div class="wave-day-header"><span>${formatWaveDayTitle(day.date,day.label)}</span></div>
    <div class="wave-day-grid">${waveTimes.map(time=>`<div class="wave-time-row"><div class="wave-time-label">${time}</div><div class="wave-slot-pair">${aircraft.map(ac=>window.renderWaveSlot(day.date,time,ac,admin)).join("")}</div></div>`).join("")}</div>
  </section>`).join("");
  window.setActiveWaveLabel();
  if(admin)attachScheduleDragHandlers();
};

window.renderWaveSlot = function(date,time,aircraft,admin){
  const flights=(window.waveSchedule||[]).filter(f=>f.date===date&&String(f.time)===String(time)&&String(f.aircraft)===String(aircraft));
  const acClass=(String(aircraft).includes("2")||aircraft==="C152")?"slot-c152":"slot-c172";
  return `<div class="wave-slot ${acClass}" data-date="${date}" data-time="${time}" data-aircraft="${escapeHtml(aircraft)}"><div class="slot-aircraft">${escapeHtml(aircraft)}</div>${flights.map(f=>renderFlightCard(f,admin)).join("")||'<div class="empty-slot">—</div>'}</div>`;
};

window.loadSchedule = async function(){
  const guest=document.getElementById("scheduleGuestMessage"),app=document.getElementById("waveScheduleApp");
  if(!token){
    guest?.classList.remove("hidden");
    app?.classList.add("hidden");
    return;
  }
  guest?.classList.add("hidden");
  app?.classList.remove("hidden");
  try{
    const r=await fetch(`/api/wave-schedule?${window.activeWaveQuery()}`,{headers:authHeaders()});
    const d=await r.json();
    if(!r.ok) throw new Error(d.detail || "Could not load wave");
    window.waveSchedule=Array.isArray(d.flights)?d.flights:[];
    if(currentTrainingWave==="june_2026" && window.waveSchedule.length===0){
      window.waveSchedule=JSON.parse(JSON.stringify(AOA_JUNE_2026_SEED));
      // push the seed into backend immediately for persistence
      try{
        await fetch(`/api/wave-schedule?${window.activeWaveQuery()}`,{
          method:"POST",
          headers:{...authHeaders(),"Content-Type":"application/json"},
          body:JSON.stringify({flights:window.waveSchedule})
        });
      }catch(e){console.warn("seed save failed", e);}
    }
  }catch(err){
    console.error("loadSchedule failed",err);
    if(currentTrainingWave==="june_2026"){
      window.waveSchedule=JSON.parse(JSON.stringify(AOA_JUNE_2026_SEED));
      toast("Loaded June seed locally");
    }else{
      window.waveSchedule=[];
      toast(err.message || "Could not load wave");
    }
  }
  window.renderWaveCalendar();
};

window.switchTrainingWave = async function(){
  const selector=document.getElementById("waveSelector");
  if(!selector)return;
  currentTrainingWave=selector.value || "legacy";
  localStorage.setItem("aoa_active_wave",currentTrainingWave);
  window.setActiveWaveLabel();
  await window.loadSchedule();
  toast("Switched to " + selector.options[selector.selectedIndex].text);
};

window.saveWaveSchedule = async function(){
  if(!canEditSchedule())return toast("Admin only");
  try{
    const r=await fetch(`/api/wave-schedule?${window.activeWaveQuery()}`,{
      method:"POST",
      headers:{...authHeaders(),"Content-Type":"application/json"},
      body:JSON.stringify({flights:window.waveSchedule||[]})
    });
    const d=await r.json().catch(()=>({}));
    if(!r.ok)throw new Error(d.detail||"Could not save schedule");
    toast(`Saved ${(window.waveSchedule||[]).length} flights to ${window.getCurrentWaveConfig().name}`);
    window.setActiveWaveLabel();
  }catch(err){
    toast(err.message||"Could not save schedule");
  }
};

window.verifyScheduleDb = async function(){
  if(!canEditSchedule())return toast("Admin only");
  try{
    const r=await fetch(`/api/wave-schedule/verify?${window.activeWaveQuery()}`,{method:"POST",headers:authHeaders()});
    const d=await r.json();
    if(!r.ok)throw new Error(d.detail||"Verify failed");
    window.waveSchedule=Array.isArray(d.flights)?d.flights:(window.waveSchedule||[]);
    if(currentTrainingWave==="june_2026" && window.waveSchedule.length===0){
      window.waveSchedule=JSON.parse(JSON.stringify(AOA_JUNE_2026_SEED));
      await window.saveWaveSchedule();
    }
    window.renderWaveCalendar();
    toast(`Verified ${window.waveSchedule.length} flights in ${window.getCurrentWaveConfig().name}`);
  }catch(err){
    toast(err.message||"Verify failed");
  }
};

window.initializeTrainingWaveSystem = function(){
  currentTrainingWave=localStorage.getItem("aoa_active_wave") || "legacy";
  const selector=document.getElementById("waveSelector");
  if(selector){
    selector.value=currentTrainingWave;
    if(!selector.value){currentTrainingWave="legacy";selector.value="legacy";}
    selector.onchange=window.switchTrainingWave;
  }
  window.setActiveWaveLabel();
};

document.addEventListener("DOMContentLoaded",()=>{
  window.initializeTrainingWaveSystem();
  setTimeout(()=>{
    const selector=document.getElementById("waveSelector");
    if(selector) selector.onchange=window.switchTrainingWave;
    if(document.getElementById("schedule")?.classList.contains("active")) window.loadSchedule();
  },500);
});

/* export functions must use selected wave days/aircraft */
window.getExportDays = function(){
  return window.getWaveDaysForCurrentWave();
};
window.getExportTimesForDay = function(date){
  const configured = Array.isArray(waveTimes) && waveTimes.length ? waveTimes : [];
  const fromFlights = (window.waveSchedule||[]).filter(f=>f.date===date).map(f=>String(f.time||""));
  return [...new Set([...configured,...fromFlights])].filter(Boolean).sort();
};
/* ===== END 0.6.9 HARD VERIFIED WAVE SYSTEM ===== */


/* ===== 0.6.9 export/legend/color/db verification fixes ===== */
window.AOA_FI_COLORS = {
  "Avi":"#0a6fd6",
  "Amir":"#0f8b44",
  "Vlad":"#7d4bd6",
  "Examiner":"#c0392b",
  "EXAM":"#c0392b",
  "Solo":"#344256"
};

window.fiColor = function(name){
  return window.AOA_FI_COLORS[String(name||"").trim()] || "#344256";
};

window.aircraftClass = function(ac){
  const v=String(ac||"").toLowerCase();
  if(v.includes("1") || v==="c172") return "flight-c172";
  if(v.includes("2") || v==="c152") return "flight-c152";
  if(v.includes("3")) return "flight-aircraft3";
  return "flight-c172";
};

window.aircraftSlotClass = function(ac){
  const v=String(ac||"").toLowerCase();
  if(v.includes("1") || v==="c172") return "slot-c172";
  if(v.includes("2") || v==="c152") return "slot-c152";
  if(v.includes("3")) return "slot-aircraft3";
  return "slot-c172";
};

window.flightDisplayInstructor = function(f){
  const note=String(f?.note||"").toUpperCase();
  const student=String(f?.student||"").toUpperCase();
  if(note.includes("EXAM") || student.includes("EXAM")) return "Examiner";
  return String(f?.instructor||"").trim() || "Solo";
};

window.isExamFlight = function(f){
  return String(f?.note||"").toUpperCase().includes("EXAM") || String(f?.student||"").toUpperCase().includes("EXAM");
};

window.renderFlightCard = function(f,admin){
  const exam=window.isExamFlight(f);
  const fi=window.flightDisplayInstructor(f);
  const acClass=window.aircraftClass(f.aircraft);
  const fiStyle=`style="color:${window.fiColor(fi)}"`;
  return `<div class="flight-card ${acClass} ${exam?"exam-flight":""}" draggable="${admin?"true":"false"}" data-id="${escapeHtml(f.id)}" oncontextmenu="openSlotEditMenu(event, '${escapeHtml(f.id)}')">
    <strong>${escapeHtml(f.student)}</strong>
    <div class="flight-tags">
      <span class="instructor-tag" ${fiStyle}>${escapeHtml(fi)}</span>
      <span class="aircraft-tag">${escapeHtml(f.aircraft)}</span>
      ${f.note?`<span class="note-tag">${escapeHtml(f.note)}</span>`:""}
    </div>
  </div>`;
};

window.renderWaveSlot = function(date,time,aircraft,admin){
  const flights=(window.waveSchedule||[]).filter(f=>f.date===date&&String(f.time)===String(time)&&String(f.aircraft)===String(aircraft));
  const acClass=window.aircraftSlotClass(aircraft);
  return `<div class="wave-slot ${acClass}" data-date="${date}" data-time="${time}" data-aircraft="${escapeHtml(aircraft)}"><div class="slot-aircraft">${escapeHtml(aircraft)}</div>${flights.map(f=>window.renderFlightCard(f,admin)).join("")||'<div class="empty-slot">—</div>'}</div>`;
};

window.updateWaveLegend = function(){
  const legend=document.getElementById("waveLegend");
  if(!legend)return;
  const aircraft=window.getWaveAircraftForCurrentWave?window.getWaveAircraftForCurrentWave():["Aircraft 1","Aircraft 2"];
  const fis=[...new Set(["Avi","Amir","Vlad","Examiner",...(window.waveSchedule||[]).map(f=>window.flightDisplayInstructor(f)).filter(Boolean)])];
  legend.innerHTML = [
    ...aircraft.map(ac=>`<span class="legend-pill ${window.aircraftSlotClass(ac)==="slot-c172"?"aircraft-1":window.aircraftSlotClass(ac)==="slot-c152"?"aircraft-2":"aircraft-3"}">${escapeHtml(ac)}</span>`),
    ...fis.map(fi=>`<span class="legend-pill instructor-dynamic" style="color:${window.fiColor(fi)};border-color:${window.fiColor(fi)}">${escapeHtml(fi)}</span>`),
    `<span class="legend-pill exam-pill">EXAM</span>`
  ].join("");
};

const _aoa064RenderWaveCalendar = window.renderWaveCalendar;
window.renderWaveCalendar = function(){
  const cal=document.getElementById("waveCalendar");
  if(!cal)return;
  const admin=canEditSchedule();
  const days=window.getWaveDaysForCurrentWave();
  const aircraft=window.getWaveAircraftForCurrentWave();
  cal.innerHTML=days.map(day=>`<section class="wave-day-card" data-date="${day.date}">
    <div class="wave-day-header"><span>${formatWaveDayTitle(day.date,day.label)}</span></div>
    <div class="wave-day-grid">${waveTimes.map(time=>`<div class="wave-time-row"><div class="wave-time-label">${time}</div><div class="wave-slot-pair">${aircraft.map(ac=>window.renderWaveSlot(day.date,time,ac,admin)).join("")}</div></div>`).join("")}</div>
  </section>`).join("");
  window.setActiveWaveLabel?.();
  window.updateWaveLegend();
  if(admin)attachScheduleDragHandlers();
};

window.aircraftMeta = function(ac){
  const n=String(ac||"").toLowerCase();
  if(n.includes("2") || n==="c152")return {title:ac, color:"#9a5b00", bg:"#fff5e7", border:"#f0d3a0"};
  if(n.includes("3"))return {title:ac, color:"#6c2eb9", bg:"#f3ecff", border:"#d9c5ff"};
  return {title:ac, color:"#075da8", bg:"#edf6ff", border:"#b8dff8"};
};

window.getExportDays = function(){
  return window.getWaveDaysForCurrentWave ? window.getWaveDaysForCurrentWave() : [];
};

window.getExportTimesForDay = function(date){
  const configured=Array.isArray(waveTimes)&&waveTimes.length?waveTimes:[];
  const fromFlights=(window.waveSchedule||[]).filter(f=>f.date===date).map(f=>String(f.time||""));
  return [...new Set([...configured,...fromFlights])].filter(Boolean).sort();
};

window.getFlightFor = function(date,time,aircraft){
  return (window.waveSchedule||[]).find(f=>f.date===date&&String(f.time)===String(time)&&String(f.aircraft)===String(aircraft));
};

window.exportFullWaveImage = async function(){
  try{
    if((window.waveSchedule||[]).length===0 && currentTrainingWave==="june_2026" && Array.isArray(window.AOA_JUNE_2026_SEED)){
      window.waveSchedule=JSON.parse(JSON.stringify(window.AOA_JUNE_2026_SEED));
      window.renderWaveCalendar();
    }
    toast("Creating full wave image...");
    const canvas=buildFullWaveCanvas();
    await shareOrDownloadCanvas(canvas,"full_wave",window.getCurrentWaveConfig().name);
  }catch(err){
    console.error(err);
    toast("Could not create full wave image.");
  }
};

window.checkDbConnection = async function(){
  try{
    const r=await fetch("/api/debug/db",{headers:authHeaders()});
    const d=await r.json();
    console.log("DB DEBUG",d);
    return d;
  }catch(e){
    console.error("DB DEBUG FAILED",e);
    return {connected:false,error:String(e)};
  }
};

const _aoa064LoadSchedule = window.loadSchedule;
window.loadSchedule = async function(){
  await _aoa064LoadSchedule();
  // Normalize exams and push June seed if needed.
  if(currentTrainingWave==="june_2026" && (window.waveSchedule||[]).length===0 && Array.isArray(window.AOA_JUNE_2026_SEED)){
    window.waveSchedule=JSON.parse(JSON.stringify(window.AOA_JUNE_2026_SEED));
    await window.saveWaveSchedule();
  }
  (window.waveSchedule||[]).forEach(f=>{
    if(window.isExamFlight(f)) f.instructor="Examiner";
  });
  window.renderWaveCalendar();
  window.checkDbConnection();
};
/* ===== end 0.6.9 fixes ===== */


/* ===== 0.6.9 edit/filter/aircraft/FI stripes fixes ===== */
window.AOA_065_STUDENTS = ["Ahmad Z","Aviv E","Sharon C","Nadav L","Harel T","Lior A"];
window.AOA_065_FIS = ["Avi","Amir","Vlad","Examiner"];

function normalizeExamName(name){return String(name||"").replace(/\s+EXAM$/i,"").trim();}

function ensureJunePeopleInMemory(){
  if(!Array.isArray(window.scheduleStudents)) window.scheduleStudents=[];
  window.AOA_065_STUDENTS.forEach((name)=>{
    if(!window.scheduleStudents.some(s=>String(s.name||"").toLowerCase()===name.toLowerCase())){
      window.scheduleStudents.push({id:`seed_${name.replace(/\W+/g,'_').toLowerCase()}`,name,email:"",program:name==="Nadav L"?"CPL":"PPL(A)",notes:"June wave seed"});
    }
  });
  if(!Array.isArray(window.scheduleInstructors)) window.scheduleInstructors=[];
  window.AOA_065_FIS.forEach(name=>{
    if(!window.scheduleInstructors.some(s=>String(s.name||"").toLowerCase()===name.toLowerCase())){
      window.scheduleInstructors.push({id:`seed_fi_${name.toLowerCase()}`,name,email:"",phone:"",notes:name==="Examiner"?"External examiner":"June wave FI"});
    }
  });
}

window.fiColor=function(name){
  const n=String(name||"").trim().toLowerCase();
  if(n==="amir")return "#0f8b44";
  if(n==="vlad")return "#7d4bd6";
  if(n==="examiner"||n==="exam")return "#c0392b";
  if(n==="avi")return "#0a6fd6";
  return "#344256";
};

window.aircraftClass=function(ac){
  const v=String(ac||"").toLowerCase();
  if(v==="aircraft 1"||v==="c172"||v.endsWith("1")) return "flight-c172";
  if(v==="aircraft 2"||v==="c152"||v.endsWith("2")) return "flight-c152";
  if(v==="aircraft 3"||v.endsWith("3")) return "flight-aircraft3";
  return "flight-c172";
};
window.aircraftSlotClass=function(ac){
  const v=String(ac||"").toLowerCase();
  if(v==="aircraft 1"||v==="c172"||v.endsWith("1")) return "slot-c172";
  if(v==="aircraft 2"||v==="c152"||v.endsWith("2")) return "slot-c152";
  if(v==="aircraft 3"||v.endsWith("3")) return "slot-aircraft3";
  return "slot-c172";
};
window.flightDisplayInstructor=function(f){
  const note=String(f?.note||"").toUpperCase();
  const student=String(f?.student||"").toUpperCase();
  if(note.includes("EXAM")||student.includes("EXAM"))return "Examiner";
  return String(f?.instructor||"").trim()||"Solo";
};
window.isExamFlight=function(f){
  return String(f?.note||"").toUpperCase().includes("EXAM")||String(f?.student||"").toUpperCase().includes("EXAM");
};

window.filteredScheduleFlights=function(){
  const mode=document.getElementById('scheduleViewFilter')?.value||'all';
  const flights=Array.isArray(window.waveSchedule)?window.waveSchedule:[];
  const hint=document.getElementById('scheduleFilterHint');
  if(mode==='student'){
    const selected=(document.getElementById('scheduleStudentFilter')?.value||'').trim();
    if(!selected){if(hint)hint.textContent='Choose a student to filter the schedule.';return flights;}
    const wanted=(typeof canonicalStudentName==="function"?canonicalStudentName(selected):selected).toLowerCase();
    if(hint)hint.textContent=`Showing flights for ${selected}.`;
    return flights.filter(f=>(typeof canonicalStudentName==="function"?canonicalStudentName(normalizeExamName(f.student)):normalizeExamName(f.student)).toLowerCase()===wanted);
  }
  if(mode==='instructor'){
    const selected=(document.getElementById('scheduleInstructorFilter')?.value||'').trim();
    if(!selected){if(hint)hint.textContent='Choose an FI to filter the schedule.';return flights;}
    if(hint)hint.textContent=`Showing flights with FI: ${selected}.`;
    return flights.filter(f=>window.flightDisplayInstructor(f).toLowerCase()===selected.toLowerCase());
  }
  if(mode==='mine'){
    const myName=(currentUserProfile?.student_name||'').trim();
    if(hint)hint.textContent=myName?`Showing flights linked to: ${myName}`:'No student profile is linked to your user yet. Ask admin to link you.';
    if(!myName)return [];
    const wanted=(typeof canonicalStudentName==="function"?canonicalStudentName(myName):myName).toLowerCase();
    return flights.filter(f=>(typeof canonicalStudentName==="function"?canonicalStudentName(normalizeExamName(f.student)):normalizeExamName(f.student)).toLowerCase()===wanted);
  }
  if(hint)hint.textContent='Showing all flights.';
  return flights;
};

window.populateScheduleStudentFilter=function(){
  ensureJunePeopleInMemory();
  const select=document.getElementById('scheduleStudentFilter'); if(!select)return;
  const current=select.value;
  const names=[...new Set([...(window.scheduleStudents||[]).map(s=>s.name),...(window.waveSchedule||[]).map(f=>normalizeExamName(f.student))].filter(Boolean))].sort();
  select.innerHTML='<option value="">Choose student</option>'+names.map(n=>`<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('');
  if(names.includes(current))select.value=current;
};
window.populateScheduleInstructorFilter=function(){
  ensureJunePeopleInMemory();
  const select=document.getElementById('scheduleInstructorFilter'); if(!select)return;
  const current=select.value;
  const names=[...new Set([...(window.scheduleInstructors||[]).map(s=>s.name),...(window.waveSchedule||[]).map(f=>window.flightDisplayInstructor(f))].filter(Boolean))].sort();
  select.innerHTML='<option value="">Choose FI</option>'+names.map(n=>`<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join('');
  if(names.includes(current))select.value=current;
};
window.onScheduleFilterChange=function(){
  const mode=document.getElementById('scheduleViewFilter')?.value||'all';
  document.getElementById('scheduleStudentFilterWrap')?.classList.toggle('hidden',mode!=='student');
  document.getElementById('scheduleInstructorFilterWrap')?.classList.toggle('hidden',mode!=='instructor');
  window.populateScheduleStudentFilter(); window.populateScheduleInstructorFilter(); window.renderWaveCalendar();
};

window.renderFlightCard=function(f,admin){
  const exam=window.isExamFlight(f), fi=window.flightDisplayInstructor(f), acClass=window.aircraftClass(f.aircraft), fiColor=window.fiColor(fi);
  const editButtons=admin?`<div class="flight-actions"><button type="button" class="mini-edit-btn" onclick="event.stopPropagation();openFlightModal('${escapeHtml(f.id)}')">Edit</button><button type="button" class="mini-delete-btn" onclick="event.stopPropagation();deleteFlight('${escapeHtml(f.id)}')">Delete</button></div>`:"";
  return `<div class="flight-card ${acClass} ${exam?"exam-flight":""}" draggable="${admin?"true":"false"}" data-id="${escapeHtml(f.id)}" oncontextmenu="openSlotEditMenu(event,'${escapeHtml(f.id)}')" style="--fi-color:${fiColor}"><div class="fi-stripe" style="background:${fiColor}"></div><strong>${escapeHtml(f.student)}</strong><div class="flight-tags"><span class="instructor-tag" style="color:${fiColor}">${escapeHtml(fi)}</span><span class="aircraft-tag">${escapeHtml(f.aircraft)}</span>${f.note?`<span class="note-tag">${escapeHtml(f.note)}</span>`:""}</div>${editButtons}</div>`;
};

window.renderWaveSlot=function(date,time,aircraft,admin){
  const flights=window.filteredScheduleFlights().filter(f=>f.date===date&&String(f.time)===String(time)&&String(f.aircraft)===String(aircraft));
  const acClass=window.aircraftSlotClass(aircraft);
  return `<div class="wave-slot ${acClass}" data-date="${date}" data-time="${time}" data-aircraft="${escapeHtml(aircraft)}"><div class="slot-aircraft">${escapeHtml(aircraft)}</div>${flights.map(f=>window.renderFlightCard(f,admin)).join("")||'<div class="empty-slot">—</div>'}</div>`;
};

window.updateWaveLegend=function(){
  const legend=document.getElementById("waveLegend"); if(!legend)return;
  const aircraft=window.getWaveAircraftForCurrentWave?window.getWaveAircraftForCurrentWave():["Aircraft 1","Aircraft 2"];
  const fis=[...new Set(["Avi","Amir","Vlad","Examiner",...(window.waveSchedule||[]).map(f=>window.flightDisplayInstructor(f)).filter(Boolean)])];
  legend.innerHTML=[...aircraft.map(ac=>`<span class="legend-pill ${window.aircraftSlotClass(ac)==="slot-c172"?"aircraft-1":window.aircraftSlotClass(ac)==="slot-c152"?"aircraft-2":"aircraft-3"}">${escapeHtml(ac)}</span>`),...fis.map(fi=>`<span class="legend-pill instructor-dynamic" style="color:${window.fiColor(fi)};border-color:${window.fiColor(fi)}">${escapeHtml(fi)}</span>`),`<span class="legend-pill exam-pill">EXAM</span>`].join("");
};

const AOA_065_originalLoadSchedule=window.loadSchedule;
window.loadSchedule=async function(){
  await AOA_065_originalLoadSchedule();
  ensureJunePeopleInMemory();
  (window.waveSchedule||[]).forEach(f=>{if(window.isExamFlight(f))f.instructor='Examiner';});
  window.populateScheduleStudentFilter(); window.populateScheduleInstructorFilter(); window.updateWaveLegend(); window.renderWaveCalendar();
};

window.renderWaveCalendar=function(){
  const cal=document.getElementById("waveCalendar"); if(!cal)return;
  const admin=canEditSchedule(), days=window.getWaveDaysForCurrentWave(), aircraft=window.getWaveAircraftForCurrentWave();
  cal.innerHTML=days.map(day=>`<section class="wave-day-card" data-date="${day.date}"><div class="wave-day-header"><span>${formatWaveDayTitle(day.date,day.label)}</span></div><div class="wave-day-grid">${waveTimes.map(time=>`<div class="wave-time-row"><div class="wave-time-label">${time}</div><div class="wave-slot-pair">${aircraft.map(ac=>window.renderWaveSlot(day.date,time,ac,admin)).join("")}</div></div>`).join("")}</div></section>`).join("");
  window.setActiveWaveLabel?.(); window.updateWaveLegend(); if(admin)attachScheduleDragHandlers();
};
/* ===== end 0.6.9 fixes ===== */


/* ===== 0.6.9 edit modal / aircraft names / no FI stripe ===== */
function aircraftNamesKey(){
  return `aoa_aircraft_names_${currentTrainingWave||"legacy"}`;
}

window.getAircraftNameMap = function(){
  const defaults = { "Aircraft 1":"Aircraft 1", "Aircraft 2":"Aircraft 2", "Aircraft 3":"Aircraft 3", "C172":"C172", "C152":"C152" };
  try{
    return {...defaults, ...JSON.parse(localStorage.getItem(aircraftNamesKey())||"{}")};
  }catch(e){
    return defaults;
  }
};

window.aircraftDisplayName = function(ac){
  return window.getAircraftNameMap()[ac] || ac;
};

window.saveAircraftNames = function(){
  const current = window.getAircraftNameMap();
  current["Aircraft 1"] = document.getElementById("aircraft1NameInput")?.value?.trim() || "Aircraft 1";
  current["Aircraft 2"] = document.getElementById("aircraft2NameInput")?.value?.trim() || "Aircraft 2";
  localStorage.setItem(aircraftNamesKey(), JSON.stringify(current));
  window.renderWaveCalendar();
  window.updateWaveLegend?.();
  toast("Aircraft names saved");
};

window.loadAircraftNameInputs = function(){
  const map = window.getAircraftNameMap();
  const a1=document.getElementById("aircraft1NameInput"), a2=document.getElementById("aircraft2NameInput");
  if(a1)a1.value=map["Aircraft 1"]||"Aircraft 1";
  if(a2)a2.value=map["Aircraft 2"]||"Aircraft 2";
};

function populateFlightModalOptions(selectedStudent="", selectedInstructor="", selectedAircraft=""){
  ensureJunePeopleInMemory?.();

  const studentSelect=document.getElementById("flightStudentInput");
  if(studentSelect){
    const names=[...new Set([...(window.scheduleStudents||[]).map(s=>s.name),...(window.waveSchedule||[]).map(f=>normalizeExamName(f.student))].filter(Boolean))].sort();
    studentSelect.innerHTML = names.map(n=>`<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join("");
    if(selectedStudent && !names.includes(selectedStudent)){
      studentSelect.insertAdjacentHTML("afterbegin",`<option value="${escapeHtml(selectedStudent)}">${escapeHtml(selectedStudent)}</option>`);
    }
    studentSelect.value = selectedStudent || names[0] || "";
  }

  const fiSelect=document.getElementById("flightInstructorInput");
  if(fiSelect){
    const fis=[...new Set(["","Avi","Amir","Vlad","Examiner",...(window.scheduleInstructors||[]).map(x=>x.name),...(window.waveSchedule||[]).map(f=>window.flightDisplayInstructor?window.flightDisplayInstructor(f):f.instructor)].filter(v=>v!==undefined))];
    fiSelect.innerHTML = fis.map(fi=>fi?`<option value="${escapeHtml(fi)}">${escapeHtml(fi)}</option>`:`<option value="">No FI / solo flight</option>`).join("");
    fiSelect.value = selectedInstructor || "";
  }

  const acSelect=document.getElementById("flightAircraftInput");
  if(acSelect){
    const aircraft = window.getWaveAircraftForCurrentWave ? window.getWaveAircraftForCurrentWave() : ["Aircraft 1","Aircraft 2"];
    const all=[...new Set([...aircraft,"Aircraft 3","C172","C152"])];
    acSelect.innerHTML = all.map(ac=>`<option value="${escapeHtml(ac)}">${escapeHtml(window.aircraftDisplayName(ac))}</option>`).join("");
    acSelect.value = selectedAircraft || all[0] || "Aircraft 1";
  }
}

window.openFlightModal = function(id){
  if(!canEditSchedule())return toast("Admin only");
  const f=id ? (window.waveSchedule||[]).find(x=>String(x.id)===String(id)) : null;
  const title=document.getElementById('flightModalTitle');
  if(title)title.textContent=f?'Edit flight':'Add flight';

  populateFlightModalOptions(normalizeExamName(f?.student||""), f ? window.flightDisplayInstructor(f) : "Avi", f?.aircraft || (window.getWaveAircraftForCurrentWave?.()[0] || "Aircraft 1"));

  const set=(id2,val)=>{const el=document.getElementById(id2); if(el)el.value=val||'';};
  set('flightEditId', f?.id || '');
  set('flightDateInput', f?.date || (window.getWaveDaysForCurrentWave?.()[0]?.date) || '2026-06-03');
  set('flightTimeInput', f?.time || '0800');
  set('flightNoteInput', f?.note || '');
  document.getElementById('flightModal')?.classList.remove('hidden');
};

window.saveFlightFromModal = function(){
  if(!canEditSchedule())return toast("Admin only");
  const editId=document.getElementById('flightEditId')?.value||'';
  const student=(document.getElementById('flightStudentInput')?.value||'').trim();
  const note=(document.getElementById('flightNoteInput')?.value||'').trim();
  let instructor=document.getElementById('flightInstructorInput')?.value||'';
  if(note.toUpperCase().includes("EXAM") || student.toUpperCase().includes("EXAM")) instructor="Examiner";

  const flight={
    id: editId || ('sf_'+Date.now().toString(36)),
    date: document.getElementById('flightDateInput')?.value||'',
    time: normalizeFlightTime(document.getElementById('flightTimeInput')?.value),
    aircraft: document.getElementById('flightAircraftInput')?.value||'Aircraft 1',
    student,
    instructor,
    note
  };
  if(!flight.date||!flight.time||!flight.student)return toast('Enter date, time and student');

  const allowed=[...(window.getWaveAircraftForCurrentWave?.()||[]),"Aircraft 1","Aircraft 2","Aircraft 3","C172","C152"];
  if(!allowed.includes(flight.aircraft))return toast('Invalid aircraft for this wave');

  const idx=(window.waveSchedule||[]).findIndex(f=>String(f.id)===String(flight.id));
  if(idx>=0) window.waveSchedule[idx]=flight; else window.waveSchedule.push(flight);

  closeFlightModal();
  window.renderWaveCalendar();
  toast('Flight updated. Press Save changes.');
};

window.renderFlightCard = function(f,admin){
  const exam=window.isExamFlight(f);
  const fi=window.flightDisplayInstructor(f);
  const acClass=window.aircraftClass(f.aircraft);
  const fiColor=window.fiColor(fi);
  const editButtons=admin ? `<div class="flight-actions">
      <button type="button" class="mini-edit-btn" onclick="event.stopPropagation();openFlightModal('${escapeHtml(f.id)}')">Edit</button>
      <button type="button" class="mini-delete-btn" onclick="event.stopPropagation();deleteFlight('${escapeHtml(f.id)}')">Delete</button>
    </div>` : "";
  return `<div class="flight-card ${acClass} ${exam?"exam-flight":""}" draggable="${admin?"true":"false"}" data-id="${escapeHtml(f.id)}" oncontextmenu="openSlotEditMenu(event,'${escapeHtml(f.id)}')">
    <strong>${escapeHtml(f.student)}</strong>
    <div class="flight-tags">
      <span class="instructor-tag" style="color:${fiColor}">${escapeHtml(fi)}</span>
      <span class="aircraft-tag">${escapeHtml(window.aircraftDisplayName(f.aircraft))}</span>
      ${f.note?`<span class="note-tag">${escapeHtml(f.note)}</span>`:""}
    </div>
    ${editButtons}
  </div>`;
};

window.renderWaveSlot = function(date,time,aircraft,admin){
  const flights=window.filteredScheduleFlights().filter(f=>f.date===date&&String(f.time)===String(time)&&String(f.aircraft)===String(aircraft));
  const acClass=window.aircraftSlotClass(aircraft);
  return `<div class="wave-slot ${acClass}" data-date="${date}" data-time="${time}" data-aircraft="${escapeHtml(aircraft)}"><div class="slot-aircraft">${escapeHtml(window.aircraftDisplayName(aircraft))}</div>${flights.map(f=>window.renderFlightCard(f,admin)).join("")||'<div class="empty-slot">—</div>'}</div>`;
};

const AOA_066_originalUpdateWaveLegend = window.updateWaveLegend;
window.updateWaveLegend = function(){
  const legend=document.getElementById("waveLegend");
  if(!legend)return;
  const aircraft=window.getWaveAircraftForCurrentWave?window.getWaveAircraftForCurrentWave():["Aircraft 1","Aircraft 2"];
  const fis=[...new Set(["Avi","Amir","Vlad","Examiner",...(window.waveSchedule||[]).map(f=>window.flightDisplayInstructor(f)).filter(Boolean)])];
  legend.innerHTML=[
    ...aircraft.map(ac=>`<span class="legend-pill ${window.aircraftSlotClass(ac)==="slot-c172"?"aircraft-1":window.aircraftSlotClass(ac)==="slot-c152"?"aircraft-2":"aircraft-3"}">${escapeHtml(window.aircraftDisplayName(ac))}</span>`),
    ...fis.map(fi=>`<span class="legend-pill instructor-dynamic" style="color:${window.fiColor(fi)};border-color:${window.fiColor(fi)}">${escapeHtml(fi)}</span>`),
    `<span class="legend-pill exam-pill">EXAM</span>`
  ].join("");
};

const AOA_066_originalLoadSchedule = window.loadSchedule;
window.loadSchedule = async function(){
  await AOA_066_originalLoadSchedule();
  window.loadAircraftNameInputs();
  populateFlightModalOptions();
  window.renderWaveCalendar();
};

// Ensure the form submit uses the new save logic.
document.addEventListener("DOMContentLoaded",()=>{
  document.getElementById("flightForm")?.addEventListener("submit",e=>{
    e.preventDefault();
    window.saveFlightFromModal();
  },true);
  window.loadAircraftNameInputs?.();
});
/* ===== end 0.6.9 fixes ===== */


/* ===== 0.6.9 Nir Kohol / full student-list edit / DB verification ===== */
window.AOA_067_STUDENT_PROGRAMS = {"Nir Kohol":"Time Building"};

function replaceLiorWithNirInJuneSeed(){
  if(!Array.isArray(window.AOA_JUNE_2026_SEED))return;
  window.AOA_JUNE_2026_SEED.forEach(f=>{
    if(f.date>="2026-06-04" && String(f.student||"").trim()==="Lior A"){
      f.student="Nir Kohol";
      f.program="Time Building";
    }
    if(f.date==="2026-06-03" && f.time==="1200" && f.aircraft==="Aircraft 2" && f.student==="Lior A") f.student="Ahmad Z";
    if(f.date==="2026-06-03" && f.time==="1400" && f.aircraft==="Aircraft 1" && f.student==="Lior A") f.student="Nadav L";
  });
}
replaceLiorWithNirInJuneSeed();

function ensureNirInPeopleMemory(){
  if(!Array.isArray(window.scheduleStudents))window.scheduleStudents=[];
  if(!window.scheduleStudents.some(s=>String(s.name||"").toLowerCase()==="nir kohol")){
    window.scheduleStudents.push({id:"seed_nir_kohol",name:"Nir Kohol",email:"",program:"Time Building",notes:"June wave"});
  }
}

async function loadAllStudentsForEdit(){
  ensureNirInPeopleMemory();
  try{
    const r=await fetch("/api/students",{headers:authHeaders()});
    const d=await r.json();
    const rows=Array.isArray(d.students)?d.students:Array.isArray(d)?d:[];
    if(rows.length){
      window.scheduleStudents=rows;
      ensureNirInPeopleMemory();
    }
  }catch(e){
    console.warn("Could not load full DB student list, using local list",e);
  }
  return window.scheduleStudents||[];
}

async function populateFlightModalOptionsFull(selectedStudent="", selectedInstructor="", selectedAircraft=""){
  await loadAllStudentsForEdit();
  ensureJunePeopleInMemory?.();
  ensureNirInPeopleMemory();

  const studentSelect=document.getElementById("flightStudentInput");
  if(studentSelect){
    const names=[...new Set([...(window.scheduleStudents||[]).map(s=>s.name),...(window.waveSchedule||[]).map(f=>normalizeExamName(f.student))].filter(Boolean))].sort();
    studentSelect.innerHTML=names.map(n=>`<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join("");
    if(selectedStudent && !names.includes(selectedStudent)){
      studentSelect.insertAdjacentHTML("afterbegin",`<option value="${escapeHtml(selectedStudent)}">${escapeHtml(selectedStudent)}</option>`);
    }
    studentSelect.value=selectedStudent || names[0] || "";
  }

  const fiSelect=document.getElementById("flightInstructorInput");
  if(fiSelect){
    const fis=[...new Set(["","Avi","Amir","Vlad","Examiner",...(window.scheduleInstructors||[]).map(x=>x.name),...(window.waveSchedule||[]).map(f=>window.flightDisplayInstructor?window.flightDisplayInstructor(f):f.instructor)].filter(v=>v!==undefined))];
    fiSelect.innerHTML=fis.map(fi=>fi?`<option value="${escapeHtml(fi)}">${escapeHtml(fi)}</option>`:`<option value="">No FI / solo flight</option>`).join("");
    fiSelect.value=selectedInstructor || "";
  }

  const acSelect=document.getElementById("flightAircraftInput");
  if(acSelect){
    const aircraft=window.getWaveAircraftForCurrentWave?window.getWaveAircraftForCurrentWave():["Aircraft 1","Aircraft 2"];
    const all=[...new Set([...aircraft,"Aircraft 3","C172","C152"])];
    acSelect.innerHTML=all.map(ac=>`<option value="${escapeHtml(ac)}">${escapeHtml(window.aircraftDisplayName?window.aircraftDisplayName(ac):ac)}</option>`).join("");
    acSelect.value=selectedAircraft || all[0] || "Aircraft 1";
  }
}

window.openFlightModal = async function(id){
  if(!canEditSchedule())return toast("Admin only");
  const f=id ? (window.waveSchedule||[]).find(x=>String(x.id)===String(id)) : null;
  const title=document.getElementById('flightModalTitle');
  if(title)title.textContent=f?'Edit flight':'Add flight';
  await populateFlightModalOptionsFull(normalizeExamName(f?.student||""), f ? window.flightDisplayInstructor(f) : "Avi", f?.aircraft || (window.getWaveAircraftForCurrentWave?.()[0] || "Aircraft 1"));
  const set=(id2,val)=>{const el=document.getElementById(id2); if(el)el.value=val||'';};
  set('flightEditId', f?.id || '');
  set('flightDateInput', f?.date || (window.getWaveDaysForCurrentWave?.()[0]?.date) || '2026-06-03');
  set('flightTimeInput', f?.time || '0800');
  set('flightNoteInput', f?.note || '');
  document.getElementById('flightModal')?.classList.remove('hidden');
};

const AOA_067_originalLoadSchedule = window.loadSchedule;
window.loadSchedule = async function(){
  await AOA_067_originalLoadSchedule();
  ensureNirInPeopleMemory();
  let changed=false;
  if(currentTrainingWave==="june_2026"){
    (window.waveSchedule||[]).forEach(f=>{
      if(f.date>="2026-06-04" && String(f.student||"").trim()==="Lior A"){f.student="Nir Kohol";changed=true;}
      if(f.date==="2026-06-03" && f.time==="1200" && f.aircraft==="Aircraft 2" && f.student==="Lior A"){f.student="Ahmad Z";changed=true;}
      if(f.date==="2026-06-03" && f.time==="1400" && f.aircraft==="Aircraft 1" && f.student==="Lior A"){f.student="Nadav L";changed=true;}
    });
    if(changed){
      try{await window.saveWaveSchedule();}catch(e){console.warn("Could not auto-save Nir replacement",e);}
    }
  }
  window.populateScheduleStudentFilter?.();
  window.renderWaveCalendar?.();
};

window.verifyCurrentDbFlights = async function(){
  try{
    const r=await fetch(`/api/wave-schedule?${window.activeWaveQuery()}`,{headers:authHeaders()});
    const d=await r.json();
    console.log("CURRENT DB FLIGHTS",d);
    return d;
  }catch(e){
    console.error("CURRENT DB FLIGHTS FAILED",e);
    return null;
  }
};
/* ===== end 0.6.9 fixes ===== */


/* ===== 0.6.9 hard DB student list + persisted Lior replacement ===== */
async function loadAllDbStudents(){
  try{
    const r=await fetch("/api/students",{headers:authHeaders()});
    const d=await r.json();
    const rows=Array.isArray(d)?d:(Array.isArray(d.students)?d.students:[]);
    if(rows.length){
      window.scheduleStudents=rows;
    }
  }catch(e){
    console.warn("DB students load failed",e);
  }
  if(!Array.isArray(window.scheduleStudents)) window.scheduleStudents=[];
  if(!window.scheduleStudents.some(s=>String(s.name||"").toLowerCase()==="nir kohol")){
    window.scheduleStudents.push({id:"seed_nir_kohol",name:"Nir Kohol",email:"",program:"Time Building",notes:"June wave"});
  }
  return window.scheduleStudents;
}

async function populateFlightModalOptionsFull(selectedStudent="", selectedInstructor="", selectedAircraft=""){
  const dbStudents=await loadAllDbStudents();
  const studentSelect=document.getElementById("flightStudentInput");
  if(studentSelect){
    const names=[...new Set(dbStudents.map(s=>s.name).filter(Boolean))].sort();
    studentSelect.innerHTML=names.map(n=>`<option value="${escapeHtml(n)}">${escapeHtml(n)}</option>`).join("");
    if(selectedStudent && !names.includes(selectedStudent)){
      studentSelect.insertAdjacentHTML("afterbegin",`<option value="${escapeHtml(selectedStudent)}">${escapeHtml(selectedStudent)}</option>`);
    }
    studentSelect.value=selectedStudent || names[0] || "";
  }

  const fiSelect=document.getElementById("flightInstructorInput");
  if(fiSelect){
    const fis=[...new Set(["","Avi","Amir","Vlad","Examiner",...(window.scheduleInstructors||[]).map(x=>x.name),...(window.waveSchedule||[]).map(f=>window.flightDisplayInstructor?window.flightDisplayInstructor(f):f.instructor)].filter(v=>v!==undefined))];
    fiSelect.innerHTML=fis.map(fi=>fi?`<option value="${escapeHtml(fi)}">${escapeHtml(fi)}</option>`:`<option value="">No FI / solo flight</option>`).join("");
    fiSelect.value=selectedInstructor || "";
  }

  const acSelect=document.getElementById("flightAircraftInput");
  if(acSelect){
    const aircraft=window.getWaveAircraftForCurrentWave?window.getWaveAircraftForCurrentWave():["Aircraft 1","Aircraft 2"];
    const all=[...new Set([...aircraft,"Aircraft 3","C172","C152"])];
    acSelect.innerHTML=all.map(ac=>`<option value="${escapeHtml(ac)}">${escapeHtml(window.aircraftDisplayName?window.aircraftDisplayName(ac):ac)}</option>`).join("");
    acSelect.value=selectedAircraft || all[0] || "Aircraft 1";
  }
}

window.openFlightModal = async function(id){
  if(!canEditSchedule())return toast("Admin only");
  const f=id ? (window.waveSchedule||[]).find(x=>String(x.id)===String(id)) : null;
  const title=document.getElementById('flightModalTitle');
  if(title)title.textContent=f?'Edit flight':'Add flight';
  await populateFlightModalOptionsFull(normalizeExamName(f?.student||""), f ? window.flightDisplayInstructor(f) : "Avi", f?.aircraft || (window.getWaveAircraftForCurrentWave?.()[0] || "Aircraft 1"));
  const set=(id2,val)=>{const el=document.getElementById(id2); if(el)el.value=val||'';};
  set('flightEditId', f?.id || '');
  set('flightDateInput', f?.date || (window.getWaveDaysForCurrentWave?.()[0]?.date) || '2026-06-03');
  set('flightTimeInput', f?.time || '0800');
  set('flightNoteInput', f?.note || '');
  document.getElementById('flightModal')?.classList.remove('hidden');
};

async function replaceLiorInPersistedJuneWave(){
  if(currentTrainingWave!=="june_2026") return;
  try{
    const r=await fetch("/api/wave-schedule/june-replace-lior",{method:"POST",headers:authHeaders()});
    const d=await r.json();
    if(r.ok && Array.isArray(d.flights)){
      window.waveSchedule=d.flights;
      toast(`June updated: ${d.changed} Lior slots replaced`);
    }
  }catch(e){
    console.warn("backend Lior replace failed, doing client-side replacement",e);
  }

  let changed=false;
  (window.waveSchedule||[]).forEach(f=>{
    if(String(f.student||"").trim()==="Lior A"){
      if(f.date>="2026-06-04"){f.student="Nir Kohol";changed=true;}
      if(f.date==="2026-06-03" && f.time==="1200" && f.aircraft==="Aircraft 2"){f.student="Ahmad Z";changed=true;}
      if(f.date==="2026-06-03" && f.time==="1400" && f.aircraft==="Aircraft 1"){f.student="Nadav L";changed=true;}
    }
  });
  if(changed){
    await window.saveWaveSchedule();
  }
}

const AOA_068_originalLoadSchedule = window.loadSchedule;
window.loadSchedule = async function(){
  await AOA_068_originalLoadSchedule();
  await loadAllDbStudents();
  await replaceLiorInPersistedJuneWave();
  window.populateScheduleStudentFilter?.();
  window.renderWaveCalendar?.();
};

window.fixJuneLiorNow = async function(){
  await replaceLiorInPersistedJuneWave();
  window.renderWaveCalendar?.();
  return (window.waveSchedule||[]).filter(f=>String(f.student||"").toLowerCase().includes("lior"));
};
/* ===== end 0.6.9 ===== */


/* ===== 0.6.9 hard no-Lior June normalization ===== */
window.normalizeJuneNoLior = function(){
  let changed=false;
  if(currentTrainingWave==="june_2026" && Array.isArray(window.waveSchedule)){
    window.waveSchedule.forEach(f=>{
      if(String(f.student||"").trim()==="Lior A"){
        if(String(f.date||"")>="2026-06-04"){f.student="Nir Kohol";changed=true;}
        else if(f.date==="2026-06-03" && f.time==="1200" && f.aircraft==="Aircraft 2"){f.student="Ahmad Z";changed=true;}
        else if(f.date==="2026-06-03" && f.time==="1400" && f.aircraft==="Aircraft 1"){f.student="Nadav L";changed=true;}
      }
    });
  }
  if(changed) console.warn("0.6.9 normalized June wave: Lior removed", window.waveSchedule.filter(f=>String(f.student||"").includes("Lior")));
  return changed;
};

const AOA_069_loadSchedule = window.loadSchedule;
window.loadSchedule = async function(){
  await AOA_069_loadSchedule();
  if(window.normalizeJuneNoLior()){
    try{await window.saveWaveSchedule();}catch(e){console.warn("0.6.9 save after normalize failed",e);}
  }
  window.renderWaveCalendar?.();
};

const AOA_069_exportFullWaveImage = window.exportFullWaveImage;
window.exportFullWaveImage = async function(){
  if(window.normalizeJuneNoLior()){
    try{await window.saveWaveSchedule();}catch(e){}
  }
  return AOA_069_exportFullWaveImage();
};

window.findLiorInCurrentWave = function(){
  return (window.waveSchedule||[]).filter(f=>String(f.student||"").toLowerCase().includes("lior"));
};
/* ===== end 0.6.9 ===== */
