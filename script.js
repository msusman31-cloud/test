const slider = document.getElementById('temp-slider');
const tempValue = document.getElementById('temp-value');
const root = document.documentElement;

slider.addEventListener('input', updateTemperature);

function updateTemperature() {
    const value = slider.value;
    const temp = (value - 50) * 2; // -100 to 100, but display as -50 to 50 or something, but user said 0-100 for slider, but display as °C, maybe map to -50 to 50.

    // Display temperature, assuming 0 is cold, 100 is hot, display as 0°C to 100°C
    tempValue.textContent = value + '°C';

    // Calculate hue for colors
    // For sky: blue (240) to orange (30)
    const skyHue = 240 - (value / 100) * 210; // 240 to 30
    const skyColor = `hsl(${skyHue}, 70%, 80%)`;

    // Sun: yellow (60) to red (0)
    const sunHue = 60 - (value / 100) * 60;
    const sunColor = `hsl(${sunHue}, 100%, 60%)`;

    // Mountains: green to brown
    const mountainHue1 = 120 - (value / 100) * 60; // 120 to 60
    const mountainColor1 = `hsl(${mountainHue1}, 50%, 40%)`;
    const mountainHue2 = 120 - (value / 100) * 60;
    const mountainColor2 = `hsl(${mountainHue2}, 60%, 50%)`;

    // Landscape: green to yellow
    const landscapeHue = 120 - (value / 100) * 90; // 120 to 30
    const landscapeColor = `hsl(${landscapeHue}, 70%, 60%)`;

    // Update CSS variables
    root.style.setProperty('--sky-color', `linear-gradient(to bottom, ${skyColor}, #E0F6FF)`);
    root.style.setProperty('--sun-color', sunColor);
    root.style.setProperty('--mountain-color1', mountainColor1);
    root.style.setProperty('--mountain-color2', mountainColor2);
    root.style.setProperty('--landscape-color', landscapeColor);

    // Extra fun: snow for cold, birds for hot
    const snowOpacity = value < 30 ? 1 : 0;
    const birdsOpacity = value > 70 ? 1 : 0;

    root.style.setProperty('--snow-opacity', snowOpacity);
    root.style.setProperty('--birds-opacity', birdsOpacity);
}

// Initial update
updateTemperature();