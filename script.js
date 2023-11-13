/** TODO:
In the home page the user can enter the city of his/her choice (think of the right HTML elements here)
On clicking the SUBMIT button or pressing ENTER:
Use an api to define the city geo-location data from the user-input
Use an api to get the weather data for at least the next 5 days
Manipulate your DOM in order to display the weather for the next 5 days in your application.
Find a way to make those API calls asynchronous.
The application must be responsive, accessible and mobile friendly
💡 Not sure where to start? Split this features into multiple smaller todos (in your code, sketch, ...)

TODO:
Display a line graph of temperature over time using a library such as Chart.js
Remember the user choice on subsequent visits
Allow the user to compare the weather in two cities
Use the API of https://unsplash.com/ to show a photo of the city they entered in the form */
const locationInput = document.querySelector("#location-input");
const display = document.querySelector("#display");
const extraInfo = document.querySelector("#extra-info");
const forecast = document.querySelector("#forecast");


let geoCoding = {"results":[{"id":2797656,"name":"Ghent","latitude":51.05,"longitude":3.71667,"elevation":10.0,"feature_code":"PPL","country_code":"BE","admin1_id":3337388,"admin2_id":2789733,"admin3_id":2797655,"admin4_id":2797657,"timezone":"Europe/Brussels","population":231493,"postcodes":["9000"],"country_id":2802361,"country":"Belgium","admin1":"Flanders","admin2":"East Flanders","admin3":"Arrondissement of Ghent","admin4":"Gent"}],"generationtime_ms":0.2220869};
// console.log(geoCoding);

function getWeather() {
    const locationInput = document.getElementById('location').value;
    console.log(locationInput);

    fetchWeatherData(locationInput)
}