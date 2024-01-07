const apiKey = "22e91cc56e15569d93ff8afa5012bd4b";

const weatherData1 = document.getElementById("weather-data");
const cityInput1 = document.getElementById("city-input");
const form = document.querySelector("form");
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description')
const details = document.querySelector('.details')

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const cityValue = cityInput1.value;
  getWeatherData(cityValue);
});

let data;

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}`
    );
    if (!response.ok) {
      throw new error("Network response not found");
    }
    data = await response.json();
    console.log(data)
    displayData()
  } catch (error) {
    console.log("Data not recieved");
  }
}

function displayData(){
  const tempDisplay = Math.round(data.main.temp)
  let tempCelsius = Math.round(tempDisplay - 273.15); 
  
  description.innerHTML = data.weather[0].description;
  temperature.innerHTML = `${tempCelsius}°C`;
  details.children[0].innerHTML = `Feels like : ${tempCelsius + 2}°C`;
  details.children[1].innerHTML = `Humidity : ${data.main.humidity}`;
  details.children[2].innerHTML = `Wind speed : ${data.wind.speed}`;
}