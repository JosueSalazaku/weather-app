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

const currentTemp = document.querySelector("#currentTemp");
const country = document.querySelector("#country");
const locationInput = document.getElementById("input-location");
const fetchBtn = document.querySelector(".fetch-btn");
const forecast = document.querySelector("#forecast");

async function getGeoData(location) {
	const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`;
	const response = await fetch(geoUrl);
	const data = await response.json();

	return data.results[0];
}

async function getWeatherData(latitude, longitude) {
	const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m&hourly=temperature_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,wind_speed_10m_max&timeformat=unixtime&timezone=Europe%2FLondon`;
	const response = await fetch(weatherUrl);
	const data = await response.json();
	return data;
}

async function appWeather() {
	const locationInputValue = locationInput.value;
	console.log(locationInputValue);

	try {
		const geo = await getGeoData(locationInputValue);
		console.log(geo);

		if (geo) {
			const weatherData = await getWeatherData(geo.latitude, geo.longitude);

			console.log("Weather data:", weatherData);

			country.innerHTML = `${geo.country}`;
			currentTemp.innerHTML = `Temperature: ${weatherData.hourly.temperature_2m[0]}°C,
			`;
		} else {
			console.error("not getting geolocation data:", geo);
		}
	} catch (error) {
		console.error("not weather:", error);
	}
}

locationInput.addEventListener("keyup", (event) => {
	if (event.key === "Enter") {
		appWeather();
	}
});

fetchBtn.addEventListener("click", appWeather);
