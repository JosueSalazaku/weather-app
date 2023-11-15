"use strict";

const currentTemp = document.querySelector("#currentTemp");
const country = document.querySelector("#country");
const locationInput = document.getElementById("input-location");
const fetchBtn = document.querySelector(".fetch-btn");
const forecast = document.querySelector("#forecast");

const daysOfTheWeek = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];

const weatherSvgs = {
	clear: "/weather svgs/day.svg",
	cloudy: "/weather svgs/cloudy.svg",
	rain: "/weather svgs/rainy.svg",
	snow: "/weather svgs/snowy-6.svg",
	thunder: "/weather svgs/thunder.svg",
};

async function getGeoData(location) {
	const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`;
	const response = await fetch(geoUrl);
	const data = await response.json();

	return data.results[0];
}

async function getWeatherData(latitude, longitude) {
	const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,rain,weather_code&hourly=temperature_2m,relative_humidity_2m,rain,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FLondon&past_days=5`;
	const response = await fetch(weatherUrl);
	const data = await response.json();
	return data;
}

async function appWeather() {
	const locationInputValue = locationInput.value;
	console.log(locationInputValue);

	try {
		const geo = await getGeoData(locationInputValue);
		console.log("Geo data bro", geo);
		console.log(daysOfTheWeek);

		if (geo) {
			const weatherData = await getWeatherData(geo.latitude, geo.longitude);

			console.log("Weather data:", weatherData);

			// Display country and current temperature
			country.innerHTML = `${geo.country}`;
			currentTemp.innerHTML = `Temperature: ${weatherData.hourly.temperature_2m[0]}°C <br> 
		  	Max Temp: ${weatherData.daily.temperature_2m_max[0]}°C  <br> 
		 	Min Temp: ${weatherData.daily.temperature_2m_min[0]}°C`;

			forecast.innerHTML = ""; // Clear previous content

			// ...

			for (let i = 0; i < 7; i++) {
				const dayIndex = (new Date().getDay() + i) % 7;
				const day = daysOfTheWeek[dayIndex];
				const maxTemp = weatherData.daily.temperature_2m_max[i];
				const minTemp = weatherData.daily.temperature_2m_min[i];

				const forecastInfo = `${day}: Max Temp: ${maxTemp}°C, Min Temp: ${minTemp}°C`;
				forecast.innerHTML += forecastInfo;
			}
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
