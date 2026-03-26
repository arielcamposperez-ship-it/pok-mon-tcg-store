// weather-script.js

const apiKey = '8f3434fd567bdb951f813b5d887f8769';

// Function to fetch weather data
async function getWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    if (!response.ok) {
        throw new Error('Weather data not found');
    }
    const data = await response.json();
    return data;
}

// Function to update the dashboard
function updateDashboard(weatherData) {
    const dashboard = document.getElementById('weather-dashboard');
    dashboard.innerHTML = `<h2>${weatherData.name}</h2>
                           <p>Temperature: ${weatherData.main.temp}°K</p>
                           <p>Weather: ${weatherData.weather[0].description}</p>`;
}

// Event listener for the form submission
const form = document.getElementById('weather-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value;
    try {
        const weatherData = await getWeather(city);
        updateDashboard(weatherData);
    } catch (error) {
        console.error(error);
        alert('Could not fetch weather data. Please try again.');
    }
});
