//let city = prompt("Enter a city");
let buttonS = document.querySelector("#buttonS");
let tempC, tempF, humidity, wind, city, description;
//const axios = require("axios").default;
let apiKey = "1912f8fc56e75e781c82f4724a74f76d";

goUrl("https://api.openweathermap.org/data/2.5/weather?q=London&units=metric&appid="+apiKey);

let dayToday = new Date();
let timeToday = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];


document.getElementById("dayToday").innerHTML =  days[dayToday.getDay()]+", ";
if (timeToday.getUTCMinutes()<10){
document.getElementById("timeToday").innerHTML =  timeToday.getHours() + ":0" + timeToday.getUTCMinutes();
}
else {document.getElementById("timeToday").innerHTML =  timeToday.getHours() + ":" + timeToday.getUTCMinutes();}


document
  .getElementById("cityInput")
  .addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.key === "Enter") {
      document.getElementById("buttonS").click();
    }
  });

function clickButS() {
  city = document.getElementById("cityInput").value;

  let url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&units=metric&appid=" +
    apiKey;
  goUrl(url);
}

function goUrl(url) {
  axios.get(url).then(function showTemp(response) {
    city = response.data.name;
    document.getElementById("placeToday").innerHTML = city;
    let myTemp = document.querySelector("#myTemp");
    tempC = Math.round(response.data.main.temp);
    tempF = Math.round((tempC * 9) / 5 + 32);
    humidity = document.querySelector("#humidity");
    humidity.innerHTML=response.data.main.humidity;
    wind = document.querySelector("#wind");
    wind.innerHTML=Math.round(response.data.wind.speed);
    description=document.querySelector("#description");    
    description.innerHTML=response.data.weather[0].description;
    console.log(response.data.main.temp);
     myTemp.innerHTML = tempC;
     let mainimg=document.querySelector("#mainimg");
     mainimg.setAttribute(
      "src",
      `images/icons/${response.data.weather[0].icon}.svg`
    ); 
  //mainimg.setAttribute("src", "images/icons/"+response.data.weather[0].icon+".svg");   //Question1!!!
   // mainimg.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);  //this works
   


    //mainimg.setAttribute("src", "https://raw.githubusercontent.com/fel562/weather/56e2bd5a9b90cbd211633f869c5a9b94dce6c2d3/images/icons/"+response.data.weather[0].icon+".svg?token=AZPWORRIN752M5CD2HFNYFDCUIM2U");  
   /* let iconDay2=document.querySelector("#iconDay2");
    iconDay2.setAttribute("src", "http://openweathermap.org/img/wn/10d@2x.png");
    let iconDay3=document.querySelector("#iconDay3");
    iconDay3.setAttribute("src", "http://openweathermap.org/img/wn/10d@2x.png");
    let iconDay4=document.querySelector("#iconDay4");
    iconDay4.setAttribute("src", "http://openweathermap.org/img/wn/10d@2x.png");
    let iconDay5=document.querySelector("#iconDay5");
    iconDay5.setAttribute("src", "http://openweathermap.org/img/wn/10d@2x.png");
    let iconDay6=document.querySelector("#iconDay6");
    iconDay6.setAttribute("src", "http://openweathermap.org/img/wn/10d@2x.png");
   
  alert(
      "It is currently " +
        tempC +
        "°C (" +
        tempF +
        "°F) in " +
        city +
        ", with a humidity of " +
        Math.round(humidity) +
        " %"
    );*/
  });
  console.log(tempC);
}

let linkFar = document.querySelector("#linkFar");
let linkCel = document.querySelector("#linkCel");

function link1() {
  document.getElementById("myTemp").innerHTML = tempC;
linkFar.classList.remove("active");   //Question2
linkCel.classList.add("active");
}
function link2() {
  document.getElementById("myTemp").innerHTML = tempF;
linkFar.classList.add("active");
linkCel.classList.remove("active")
}
linkCel.addEventListener("click", link1);
linkFar.addEventListener("click", link2);
buttonS.addEventListener("click", clickButS);

let buttonC = document.querySelector("#buttonC");
buttonC.addEventListener("click", pressButC);
function pressButC() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  console.log(lat);
  console.log(long);
  let url =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    long +
    "&units=metric&appid=" +
    apiKey;

  //city = "current";
  console.log(url);
  /* let url =
    "https://api.openweathermap.org/data/2.5/weather?lat=50.3742464&lon=7.2548352&appid=1912f8fc56e75e781c82f4724a74f76d";
  console.log(url);*/
  goUrl(url);
}
