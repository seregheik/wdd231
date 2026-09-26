const API_KEY = "ed3886c7a4a73beb29c48b0649978e2d";

const LAT = 16.7735;
const LON = -3.0074;

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;
const membersUrl = "data/members.json";

const currentWeather = document.getElementById("current-weather");
const forecastList = document.getElementById("forecast");
const spotlightContainer = document.getElementById("spotlight-container");

async function fetchJson(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    return response.json();
}

function capitalize(text) {
    return text.replace(/\b\w/g, (letter) => letter.toUpperCase());
}


function displayCurrentWeather(data) {
    const weather = data.weather[0];

    currentWeather.innerHTML = "";

    const icon = document.createElement("img");
    icon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.icon}@4x.png`);
    icon.setAttribute("alt", weather.description);
    icon.setAttribute("width", "100");
    icon.setAttribute("height", "100");

    const details = document.createElement("div");
    details.innerHTML = `
        <p class="temp"><strong>${Math.round(data.main.temp)}&deg;C</strong></p>
        <p>${capitalize(weather.description)}</p>
        <p>High: ${Math.round(data.main.temp_max)}&deg;C</p>
        <p>Low: ${Math.round(data.main.temp_min)}&deg;C</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;

    currentWeather.appendChild(icon);
    currentWeather.appendChild(details);
}

function displayForecast(data) {
    const offset = data.city.timezone;
    const toLocalDate = (seconds) => new Date((seconds + offset) * 1000).toISOString().slice(0, 10);
    const today = toLocalDate(Math.floor(Date.now() / 1000));
    const days = new Map();

    data.list.forEach((entry) => {
        const date = toLocalDate(entry.dt);
        const high = entry.main.temp_max;
        if (!days.has(date) || high > days.get(date)) {
            days.set(date, high);
        }
    });

    forecastList.innerHTML = "";

    [...days].slice(0, 3).forEach(([date, high]) => {
        const label = date === today
            ? "Today"
            : new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", { weekday: "long", timeZone: "UTC" });

        const item = document.createElement("li");
        item.innerHTML = `${label}: <strong>${Math.round(high)}&deg;C</strong>`;
        forecastList.appendChild(item);
    });
}

async function getWeather() {
    try {
        const [current, forecast] = await Promise.all([
            fetchJson(weatherUrl),
            fetchJson(forecastUrl)
        ]);
        displayCurrentWeather(current);
        displayForecast(forecast);
    } catch (error) {
        console.error("Weather fetch error:", error);
        currentWeather.innerHTML = "<p>Weather data is currently unavailable.</p>";
        forecastList.innerHTML = "<li>Forecast is currently unavailable.</li>";
    }
}


function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displaySpotlights(members) {
    const featured = shuffle(members.filter((member) => member.membershipLevel >= 2)).slice(0, 3);

    const fragment = document.createDocumentFragment();

    featured.forEach((member) => {
        const card = document.createElement("section");
        card.classList.add("spotlight-card");

        const name = document.createElement("h3");
        name.textContent = member.name;

        const logo = document.createElement("img");
        logo.setAttribute("src", `images/${member.image}`);
        logo.setAttribute("alt", `${member.name} Logo`);
        logo.setAttribute("loading", "lazy");
        logo.setAttribute("width", "100");
        logo.setAttribute("height", "100");

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const address = document.createElement("p");
        address.textContent = member.address;

        const website = document.createElement("a");
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");
        website.setAttribute("rel", "noopener");
        website.textContent = new URL(member.website).hostname;

        const level = document.createElement("p");
        level.classList.add("membership-level");
        level.textContent = `${getMembershipLevelText(member.membershipLevel)} Member`;

        card.append(name, logo, phone, address, website, level);
        fragment.appendChild(card);
    });

    spotlightContainer.appendChild(fragment);
}

async function getSpotlights() {
    try {
        const members = await fetchJson(membersUrl);
        displaySpotlights(members);
    } catch (error) {
        console.error("Members fetch error:", error);
    }
}

getWeather();
getSpotlights();
