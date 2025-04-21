const cityInput = document.querySelector('.input-city');
const search_BUTTON = document.querySelector('.search-button');

const notFound = document.querySelector('.not-found');
const searchCity = document.querySelector('.search-city');
const weatherInfo = document.querySelector('.weather-info');

const countryName = document.getElementById('country-txt');
const temperature = document.getElementById('temperature-txt');
const condition = document.getElementById('condition-txt');
const humidityValue = document.getElementById('humidity-value-txt');
const windValue = document.getElementById('wind-value-txt');
const weatherImage = document.querySelector('.weather-summary-image');
const currentDate = document.getElementById('current-date-txt');

const FC_Items = document.querySelector('.forecast-items-container');

search_BUTTON.addEventListener('click', () => {
    if (cityInput.value.trim() !== '') {
        updateWeather(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

cityInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && cityInput.value.trim() !== '') {
        updateWeather(cityInput.value);
        cityInput.value = '';
        cityInput.blur();
    }
});

// generate the API-Key to any website you want
const apiKey = '51c95eca482e61fe457bfe5f45155530';

async function getData(endPoint, city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        return `ERROR: ${error}`;
    }
}

function getWeatherIcon(id) {
    if (id <= 232) return `thunderstorm.svg`;
    if (id <= 321) return `drizzle.svg`;
    if (id <= 531) return `rain.svg`;
    if (id <= 622) return `snow.svg`;
    if (id <= 781) return `atmosphere.svg`;
    if (id === 800) return `clear.svg`;
    if (id <= 804) return `clouds.svg`;
}

function getDate() {
    const date = new Date();
    const options = {
        weekday: 'short',
        day: '2-digit',
        month: 'short'
    }

    return date.toLocaleDateString('en-GB', options);
}

async function updateWeather(city) {
    const weatherData = await getData('weather', city);
    if(weatherData.cod !== 200) {
        displayWeather(notFound);
        return;
    }

    const {
        name: country,
        main: { temp, humidity },
        weather: [{ id, main }],
        wind: { speed }
    } = weatherData;

    countryName.textContent = country;
    temperature.textContent = Math.round(temp) + ' °C';
    condition.textContent = main;
    humidityValue.textContent = humidity + '%';
    windValue.textContent = speed + ' M/s';

    currentDate.textContent = getDate();
    weatherImage.src = `assets/weather/${getWeatherIcon(id)}`;

    await updateForecasts(city);
    displayWeather(weatherInfo);
}

async function updateForecasts(city) {
    const forecastsData = await getData('forecast', city);

    const timeTaken = '12:00:00';
    const toDayDate = new Date().toISOString().split('T')[0];

    FC_Items.innerHTML = '';
    forecastsData.list.forEach((FCweather) => {
        if(FCweather.dt_txt.includes(timeTaken) && !FCweather.dt_txt.includes(toDayDate)) {
            updateFCitems(FCweather);
        }
    });
}

function updateFCitems(fcData) {
    const {
        dt_txt: date,
        weather: [{ id }],
        main: { temp }
    } = fcData;

    const dateTaken = new Date(date);
    const options = {
        day: '2-digit',
        month: 'short'
    }

    const resultDate = dateTaken.toLocaleDateString('en-US', options);

    const forecast = `
        <div class="forecast-item">
            <h5 id="forecast-item-date" class="regular-txt">${resultDate}</h5>
            <img src="assets/weather/${getWeatherIcon(id)}" class="forecast-item-image">
            <h5 id="forecast-item-temperature">${Math.round(temp)} °C</h5>
        </div>
    `;

    FC_Items.insertAdjacentHTML('beforeend', forecast);
}

function displayWeather(section) {
    [weatherInfo, searchCity, notFound]
    .forEach((section) => section.style.display = 'none');

    section.style.display = 'flex';
}