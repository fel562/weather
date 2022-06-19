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
    myTemp.innerHTML = tempC;
    let mainimg=document.querySelector("#mainimg");    
    mainimg.setAttribute(
      "src",
      `https://raw.githubusercontent.com/fel562/weather/451b8802ac5eb43a243d99f67c0a6f208c06609d/images/icons/${response.data.weather[0].icon}.svg`
    ); 
  let coordLon=response.data.coord.lon;
  let coordLat=response.data.coord.lat;
  console.log(coordLon, coordLat);
  let url2 =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    coordLat +
    "&lon=" +
    coordLon +
    "&units=metric&appid=" +
    apiKey;
  showForecast(url2);
  }); 


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
 
 
  goUrl(url);
  
}
function showForecast (url){
  console.log(url);
axios.get(url).then(function forecastTemp(response) {
  let forecastDay=response.data.daily;
  console.log(forecastDay);
  
let forecast=document.querySelector("#forecast");
 let forecastHTML="";
forecastDay.forEach(function dayShorts(dayShort, index){    
  if (index<5){
  let maxTemp=Math.round(dayShort.temp.max);
  let minTemp=Math.round(dayShort.temp.min);
  let dayFor = new Date();
  
  // "https://raw.githubusercontent.com/fel562/weather/451b8802ac5eb43a243d99f67c0a6f208c06609d/images/icons/${dayShort.weather[0].icon}.svg"
  //http://openweathermap.org/img/wn/${dayShort.weather[0].icon}@2x.png
  forecastHTML=forecastHTML+`
    <div class="col">
    
    <p><span class="day">${formatDay(dayShort.dt)}</span><br /><img src="https://raw.githubusercontent.com/fel562/weather/451b8802ac5eb43a243d99f67c0a6f208c06609d/images/icons/${dayShort.weather[0].icon}.svg" > 
    <span class="tempMax">${maxTemp}°</span><span class="tempMin">${minTemp}°</span></p>
    </div>`; 
  console.log(dayShort);
}
//${response.data.weather[0].icon}  
});
forecast.innerHTML=forecastHTML;
});}

function formatDay(timestamp){
  let dayFor=new Date(timestamp*1000);
  let dayForecast= dayFor.getDay();
  let daysShorts = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
  return daysShorts[dayForecast];
}
