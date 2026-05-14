/**
 * Live Weather App Logic
 * Integrates with OpenWeatherMap API for real-time data.
 */

const API_KEY = 'xxxxxxxxxxxxxxxxxxxx'; // ENTER_YOUR_API_KEY_HERE
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityNameDisplay = document.getElementById('city-name');
const weatherDescDisplay = document.getElementById('weather-desc');
const tempValueDisplay = document.getElementById('temp-value');
const root = document.documentElement;

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

// Allow "Enter" key to trigger search
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchWeather(cityInput.value.trim());
    }
});

async function fetchWeather(city) {
    if (!API_KEY) {
        alert("Please provide an API Key in script.js to fetch live weather data.");
        return;
    }
    console.log(`Fetching weather for: ${city}`);
    cityNameDisplay.textContent = "Loading...";
    
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
        console.log(`Request URL: ${url}`);
        
        const response = await fetch(url);
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error Response:", errorData);
            
            // Check for specific error messages from OpenWeatherMap
            if (errorData.cod === "401") {
                throw new Error("Invalid API Key. Please check your key.");
            } else if (errorData.cod === "404") {
                throw new Error(`City "${city}" not found. Try searching for a major city like "London" or "Tokyo".`);
            } else {
                throw new Error(errorData.message || 'Error fetching weather data');
            }
        }
        
        const data = await response.json();
        console.log("Weather Data received:", data);
        updateApp(data);
    } catch (error) {
        console.error("Fetch Error:", error);
        alert(error.message);
        cityNameDisplay.textContent = "Error";
        weatherDescDisplay.textContent = "Please try again";
    }
}

function updateApp(data) {
    const name = data.name;
    const temp = Math.round(data.main.temp);
    const condition = data.weather[0].main; // e.g., Clear, Clouds, Rain, Snow
    const desc = data.weather[0].description;
    
    // Day/Night calculation
    const currentTime = data.dt;
    const sunrise = data.sys.sunrise;
    const sunset = data.sys.sunset;
    const isNight = currentTime < sunrise || currentTime > sunset;

    // Update text
    cityNameDisplay.textContent = name;
    weatherDescDisplay.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
    tempValueDisplay.textContent = temp + '°C';

    // Update Visuals
    updateVisuals(temp, condition, isNight);
}

function updateVisuals(temp, condition, isNight) {
    // 1. Time of Day (Sky & Sun/Moon)
    let skyGradient;
    let sunColor;
    let sunShadow;
    let sunTop;

    if (isNight) {
        skyGradient = "linear-gradient(to bottom, #1a1a2e, #16213e)";
        sunColor = "#f0f0f0"; // Moon
        sunShadow = "0 0 40px #f0f0f0";
        sunTop = "15%"; // Lower the "moon" slightly
    } else {
        // Temperature-based sky: Blue for cold, more orange/warm for hot
        // Range 0 to 40
        const hue = 240 - (Math.min(Math.max(temp, 0), 40) / 40) * 210;
        skyGradient = `linear-gradient(to bottom, hsl(${hue}, 70%, 80%), #E0F6FF)`;
        sunColor = temp > 25 ? "#ff4500" : "#FFD700";
        sunShadow = `0 0 20px ${sunColor}`;
        sunTop = "10%";
    }

    root.style.setProperty('--sky-color', skyGradient);
    root.style.setProperty('--sun-color', sunColor);
    root.style.setProperty('--sun-shadow', sunShadow);
    const sunEl = document.querySelector('.sun');
    if (sunEl) sunEl.style.top = sunTop;

    // 2. Weather Conditions
    const isSnowy = condition === "Snow";
    const isRainy = condition === "Rain" || condition === "Drizzle" || condition === "Thunderstorm";
    const isClear = condition === "Clear";
    
    // Snow animation
    root.style.setProperty('--snow-opacity', isSnowy ? 1 : 0);
    
    // Birds only on clear/nice days
    const birdsOpacity = (isClear && !isNight && temp > 15) ? 1 : 0;
    root.style.setProperty('--birds-opacity', birdsOpacity);

    // 3. Landscape Colors (based on temp)
    const landscapeHue = 120 - (Math.min(Math.max(temp, 0), 40) / 40) * 90;
    const landscapeColor = `hsl(${landscapeHue}, 70%, 60%)`;
    root.style.setProperty('--landscape-color', landscapeColor);

    // Update Mountains
    const m1 = `hsl(${landscapeHue}, 50%, 40%)`;
    const m2 = `hsl(${landscapeHue}, 60%, 50%)`;
    root.style.setProperty('--mountain-color1', m1);
    root.style.setProperty('--mountain-color2', m2);

    // Handle Clouds
    const cloudEl = document.querySelector('.clouds');
    if (cloudEl) {
        cloudEl.style.opacity = (condition === "Clouds" || isRainy) ? "1" : "0.3";
    }
}

// Initial fetch for a default city
fetchWeather("New York");
