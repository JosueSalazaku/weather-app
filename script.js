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

const forecast = document.querySelector("#forecast");
const locationInput = document.getElementById("input-location");
const fetchBtn = document.querySelector(".fetch-btn");

const weatherUrl =
	"https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m,rain,weather_code&daily=sunrise,sunset&timezone=Europe%2FLondon";

async function getGeoData(location) {
	const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`;
	const response = await fetch(geoUrl);
	const data = await response.json();

	return data.results[0];
}

async function getWeatherData(location) {
	const response = await fetch(weatherUrl);
	const data = await response.json();
	return data;
}

async function updateWeather() {
	const locationInputValue = locationInput.value;
	console.log(locationInputValue);

	const geo = await getGeoData(locationInputValue);
	const weatherData = await getWeatherData(locationInputValue);

	// Update the DOM with the weather data
	const forecastElement = document.getElementById("forecast");
	forecastElement.innerHTML = `Temperature: ${weatherData.hourly.temperature_2m[0]}°C`;
}

locationInput.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		updateWeather();
	}
});

fetchBtn.addEventListener("click", updateWeather);
