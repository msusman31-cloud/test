/**
 * Temperature Adventure - Interactive Cartoon
 * A kid-friendly interactive webpage where moving a slider changes the environment
 * based on temperature (cold to hot)
 */

const slider = document.getElementById('temperature-slider');
const tempValue = document.getElementById('temp-value');
const sky = document.querySelector('.sky');
const sun = document.querySelector('.sun');
const sunRays = document.querySelectorAll('.sun-rays line');
const mountains = document.querySelectorAll('.mountain');
const snowcaps = document.querySelectorAll('.snowcap');
const landscape = document.querySelector('.landscape');
const cloudsContainer = document.querySelector('.clouds-container');
const birdsContainer = document.getElementById('birds-container');
const snowflakesContainer = document.getElementById('snowflakes');
const root = document.documentElement;

// Temperature range: 0 (cold) to 100 (hot)
// Represents -20°C to 40°C
slider.addEventListener('input', (e) => {
    const sliderValue = parseInt(e.target.value);
    updateScene(sliderValue);
});

function updateScene(sliderValue) {
    // Convert slider value (0-100) to temperature in Celsius (-20 to 40)
    const tempCelsius = (sliderValue / 100) * 60 - 20;
    const displayTemp = Math.round(tempCelsius);
    tempValue.textContent = displayTemp + '°C';

    // Update Sky Color based on temperature
    updateSkyColor(sliderValue);

    // Update Sun Color and Glow
    updateSun(sliderValue);

    // Update Mountain Colors
    updateMountains(sliderValue);

    // Update Landscape Color
    updateLandscape(sliderValue);

    // Show/Hide Elements based on temperature
    updateElements(sliderValue);
}

function updateSkyColor(sliderValue) {
    let skyGradient;

    if (sliderValue < 20) {
        // Very Cold (Blue/Purple tones)
        const intensity = (20 - sliderValue) / 20;
        skyGradient = `linear-gradient(to bottom, 
            rgb(${100 + intensity * 55}, ${140 + intensity * 25}, ${220}) 0%,
            rgb(${200 + intensity * 55}, ${220 + intensity * 35}, ${255}) 100%)`;
    } else if (sliderValue < 50) {
        // Cool to Warm (Blue to Yellow transition)
        const intensity = (sliderValue - 20) / 30;
        const r = Math.round(100 + intensity * 155);
        const g = Math.round(150 + intensity * 100);
        const b = Math.round(220 - intensity * 120);
        skyGradient = `linear-gradient(to bottom,
            rgb(${r}, ${g}, ${b}) 0%,
            rgb(${r + 50}, ${g + 30}, ${Math.max(b - 50, 100)}) 100%)`;
    } else {
        // Hot (Orange/Red tones)
        const intensity = (sliderValue - 50) / 50;
        skyGradient = `linear-gradient(to bottom,
            rgb(${200 + intensity * 55}, ${150 - intensity * 100}, ${100 - intensity * 50}) 0%,
            rgb(${255}, ${200 - intensity * 100}, ${150 - intensity * 100}) 100%)`;
    }

    sky.style.background = skyGradient;
}

function updateSun(sliderValue) {
    let sunColor;
    let glowIntensity;

    if (sliderValue < 20) {
        // Very Cold - Pale, dim sun
        sunColor = '#E8E8E8';
        glowIntensity = 15;
    } else if (sliderValue < 50) {
        // Cool to Warm - Yellow sun
        const intensity = (sliderValue - 20) / 30;
        const colorValue = Math.round(212 + intensity * 43); // E8 to FF
        sunColor = `rgb(255, ${colorValue}, 0)`;
        glowIntensity = 15 + intensity * 25;
    } else {
        // Hot - Bright, intense sun
        const intensity = (sliderValue - 50) / 50;
        sunColor = `rgb(255, ${Math.max(200 - intensity * 100, 100)}, 0)`;
        glowIntensity = 40 + intensity * 20;
    }

    sun.setAttribute('fill', sunColor);
    sun.style.filter = `drop-shadow(0 0 ${glowIntensity}px ${sunColor})`;

    // Update sun rays
    sunRays.forEach(ray => {
        ray.setAttribute('stroke', sunColor);
        ray.style.filter = `drop-shadow(0 0 ${glowIntensity * 0.7}px ${sunColor})`;
    });
}

function updateMountains(sliderValue) {
    let mountainColors = [];

    if (sliderValue < 30) {
        // Cold - Darker, forest greens
        mountainColors = ['#1B5E20', '#2E7D32', '#004D00'];
    } else if (sliderValue < 50) {
        // Cool - Green shades
        const intensity = (sliderValue - 30) / 20;
        mountainColors = [
            `rgb(${50 + intensity * 100}, ${120 + intensity * 20}, ${50})`,
            `rgb(${100 + intensity * 100}, ${150 + intensity * 20}, ${50})`,
            `rgb(${0}, ${120 + intensity * 50}, ${0})`
        ];
    } else if (sliderValue < 75) {
        // Warm - Brown/tan shades
        const intensity = (sliderValue - 50) / 25;
        mountainColors = [
            `rgb(${150 + intensity * 50}, ${100 + intensity * 30}, ${50 - intensity * 30})`,
            `rgb(${180 + intensity * 50}, ${120 + intensity * 30}, ${50 - intensity * 30})`,
            `rgb(${120 + intensity * 50}, ${80 + intensity * 30}, ${30 - intensity * 30})`
        ];
    } else {
        // Very Hot - Reddish/brown burnt look
        mountainColors = ['#A0522D', '#B8860B', '#8B4513'];
    }

    mountains.forEach((mountain, index) => {
        mountain.setAttribute('fill', mountainColors[index] || mountainColors[0]);
    });
}

function updateLandscape(sliderValue) {
    let landscapeGradient;

    if (sliderValue < 30) {
        // Cold - Dark greens, possible snow
        landscapeGradient = 'linear-gradient(to bottom, #2D5016, #1B3A0B)';
    } else if (sliderValue < 50) {
        // Cool - Bright greens
        const intensity = (sliderValue - 30) / 20;
        const g = Math.round(150 + intensity * 50);
        landscapeGradient = `linear-gradient(to bottom, 
            rgb(${100 + intensity * 50}, ${g}, ${0}),
            rgb(${80 + intensity * 50}, ${g - 20}, ${0}))`;
    } else if (sliderValue < 75) {
        // Warm - Yellows and browns
        const intensity = (sliderValue - 50) / 25;
        landscapeGradient = `linear-gradient(to bottom,
            rgb(${150 + intensity * 50}, ${150 + intensity * 30}, ${0}),
            rgb(${120 + intensity * 50}, ${100 + intensity * 30}, ${0}))`;
    } else {
        // Hot - Dry, dusty browns
        landscapeGradient = 'linear-gradient(to bottom, #D2B48C, #8B7355)';
    }

    landscape.style.background = landscapeGradient;
}

function updateElements(sliderValue) {
    // Snowcaps appear when cold
    if (sliderValue < 40) {
        const snowIntensity = (40 - sliderValue) / 40;
        snowcaps.forEach(cap => {
            cap.style.opacity = snowIntensity;
        });
    } else {
        snowcaps.forEach(cap => {
            cap.style.opacity = 0;
        });
    }

    // Clouds - visible in cool to warm, fade in hot/cold extremes
    if (sliderValue > 10 && sliderValue < 85) {
        cloudsContainer.style.opacity = 1;
    } else {
        cloudsContainer.style.opacity = 0.2;
    }

    // Birds - only appear in pleasant temperatures (20-70)
    if (sliderValue > 20 && sliderValue < 70) {
        birdsContainer.style.opacity = 1;
        birdsContainer.style.pointerEvents = 'none';
    } else {
        birdsContainer.style.opacity = 0;
    }

    // Snowflakes - appear only when very cold (0-25)
    if (sliderValue < 25) {
        const snowIntensity = (25 - sliderValue) / 25;
        snowflakesContainer.style.opacity = snowIntensity * 0.8;
    } else {
        snowflakesContainer.style.opacity = 0;
    }
}

// Initialize the scene on page load
updateScene(50);

// Fun touch interactions (for mobile/touch devices)
let isDragging = false;
slider.addEventListener('touchstart', () => {
    isDragging = true;
});
slider.addEventListener('touchend', () => {
    isDragging = false;
});
slider.addEventListener('mousedown', () => {
    isDragging = true;
});
slider.addEventListener('mouseup', () => {
    isDragging = false;
});

// Optional: Add keyboard controls for accessibility
document.addEventListener('keydown', (e) => {
    if (slider === document.activeElement) {
        if (e.key === 'ArrowLeft') {
            slider.value = Math.max(0, parseInt(slider.value) - 5);
            updateScene(parseInt(slider.value));
        } else if (e.key === 'ArrowRight') {
            slider.value = Math.min(100, parseInt(slider.value) + 5);
            updateScene(parseInt(slider.value));
        }
    }
});
