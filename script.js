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

const weatherSvgs = {
	clear: "/weather svgs/day.svg",
	cloudy: "/weather svgs/cloudy.svg",
	rainy: "/weather svgs/rainy.svg",
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
		console.log("Geo data bro", geo);
		console.log(daysOfTheWeek);

		if (geo) {
			const weatherData = await getWeatherData(geo.latitude, geo.longitude);

			console.log("Weather data:", weatherData);
			console.log(forecast);
			//weather info
			country.innerHTML = `${geo.name}, ${geo.country}`;
			currentTemp.innerHTML = `Temperature: ${weatherData.hourly.temperature_2m[0]}°C <br> 
			Max Temp: ${weatherData.daily.temperature_2m_max[0]}°C  <br> 
          	Min Temp: ${weatherData.daily.temperature_2m_min[0]}°C`;
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
