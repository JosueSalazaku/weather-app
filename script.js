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

const card = document.querySelector("#card");
const locationInput = document.querySelector("#location-input");
const display = document.querySelector("#display");
const extraInfo = document.querySelector("#extra-info");
const forecast = document.querySelector("#forecast");

let geoData = {
	results: [
		{
			id: 2797656,
			name: "Ghent",
			latitude: 51.05,
			longitude: 3.71667,
			elevation: 10.0,
			feature_code: "PPL",
			country_code: "BE",
			admin1_id: 3337388,
			admin2_id: 2789733,
			admin3_id: 2797655,
			admin4_id: 2797657,
			timezone: "Europe/Brussels",
			population: 231493,
			postcodes: ["9000"],
			country_id: 2802361,
			country: "Belgium",
			admin1: "Flanders",
			admin2: "East Flanders",
			admin3: "Arrondissement of Ghent",
			admin4: "Gent",
		},
	],
	generationtime_ms: 0.2220869,
};
let geoUrl;
console.log("Initial geoData:", geoData);

async function getWeather() {
	const locationInput = document.getElementById("location").value;
	// console.log(locationInput);

	fetchWeatherData(locationInput);
}
console.log();
async function getGeoData(location) {
	const geoUrl =
		"https://geocoding-api.open-meteo.com/v1/search?name=ghent&count=1&language=en&format=json";
	try {
		const response = await fetch(geoUrl);
		const data = await response.json();

		if (data.results && data.results.length > 0) {
			const locationData = data.results[0].geometry.location;

			geoData.latitude = locationData.lat;
			geoData.longitude = locationData.lng;
			geoUrl = geoUrl;

			console.log("Updated geoData in getGeoData:", geoData);
			console.log("Updated geoUrl in getGeoData:", geoUrl);
		} else {
			throw new Error("Location not found");
		}
	} catch (error) {
		console.error("Error getting geolocation data:", error);
		throw error;
	}
	console.log(geoUrl);
}

async function fetchWeatherData(location) {
	const apiUrl =
		"https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,is_day,rain&hourly=temperature_2m&daily=weather_code,temperature_2m_max,sunrise&timezone=Europe%2FLondon";
	const response = await fetch(apiUrl);
	const getData = await response.json();
}
