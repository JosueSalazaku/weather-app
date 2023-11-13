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