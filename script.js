"use strict";

import WMO_CODES from "./wmo_codes.mjs";
console.log(WMO_CODES);

const currentTemp = document.querySelector("#currentTemp");
const country = document.querySelector("#country");
const locationInput = document.getElementById("input-location");
const fetchBtn = document.querySelector(".fetch-btn");
const forecast = document.querySelector("#forecast");

const daysOfTheWeek = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday",
];

const icons = {
	"0_day": "icons/day-code-0.png",
	3: "icons/code-3.png",
	"80_day": "icons/code-80-82.png",
	"85_day": "icons/code-85-86.png",
	"95_day": "icons/code-95-99.png",
};

async function getGeoData(location) {
	const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`;
	const response = await fetch(geoUrl);
	const data = await response.json();

	return data.results[0];
}

async function getWeatherData(latitude, longitude) {
	const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,is_day,rain,weather_code&hourly=temperature_2m,rain,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FLondon`;
	const response = await fetch(weatherUrl);
	const data = await response.json();
	return data;
}

function getWeatherImg() {
	const cardImg = document.createElement("img");
	WMO_CODES["name"];
	cardImg.src = WMO_CODES[result.daily.weather_code[i]].day.image;
	imageBox.appendChild(cardImg);
}

function updateForecastItem(
	forecastItem,
	day,
	maxTemp,
	minTemp,
	weather_code,
	is_day
) {
	const dayAndTempElement = document.createElement("p");
	dayAndTempElement.innerHTML = `<b>${day}<b> <br> Max Temp: ${maxTemp}°C<br> Min Temp: ${minTemp}°C`;

	const weatherImg = document.createElement("img");
	weatherImg.src = getWeatherImg(weather_code, is_day);
	weatherImg.alt = "Weather Icon";
	dayAndTempElement.appendChild(weatherImg);

	forecastItem.appendChild(dayAndTempElement);
}

async function appWeather() {
	const locationInputValue = locationInput.value;

	try {
		const geo = await getGeoData(locationInputValue);
		console.log("Geo data bro", geo);
		console.log(daysOfTheWeek);

		if (geo) {
			const weatherData = await getWeatherData(geo.latitude, geo.longitude);
			console.log("Weather data bro:", weatherData);

			country.innerHTML = `${geo.country}`;
			currentTemp.innerHTML = `Temperature: ${weatherData.hourly.temperature_2m[0]}°C <br> 
		  	Max Temp: ${weatherData.daily.temperature_2m_max[0]}°C  <br> 
		 	Min Temp: ${weatherData.daily.temperature_2m_min[0]}°C`;
			forecast.innerHTML = "";
			for (let i = 0; i < 7; i++) {
				const dayIndex = (new Date().getDay() + i) % 7;
				const day = daysOfTheWeek[dayIndex];
				const maxTemp = weatherData.daily.temperature_2m_max[i];
				const minTemp = weatherData.daily.temperature_2m_min[i];
				const forecastItem = document.createElement("div");

				const dayAndTempElement = document.createElement("p");
				dayAndTempElement.innerHTML = `<b>${day}<b> <br> Max Temp: ${maxTemp}°C<br> Min Temp: ${minTemp}°C`;
				forecastItem.appendChild(dayAndTempElement);
				forecast.appendChild(forecastItem);
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
