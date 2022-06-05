//let city = prompt("Enter a city");
let buttonS = document.querySelector("#buttonS");
let tempC, tempF, humidity, city;
const axios = require("axios").default;
let apiKey = "1912f8fc56e75e781c82f4724a74f76d";

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
document.getElementById("dayToday").innerHTML = days[dayToday.getDay()] + ",";
document.getElementById("timeToday").innerHTML =
  timeToday.getHours() + ":" + timeToday.getUTCMinutes();

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
    humidity = 80.2;
    myTemp.innerHTML = tempC;
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
    );
  });
  console.log(tempC);
}

let linkFar = document.querySelector("#linkFar");
let linkCel = document.querySelector("#linkCel");
function link1() {
  document.getElementById("myTemp").innerHTML = tempC;
}
function link2() {
  document.getElementById("myTemp").innerHTML = tempF;
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
