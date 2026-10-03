import { places } from "../data/discover.mjs";

const DAY_MS = 24 * 60 * 60 * 1000;

const visitMessage = document.querySelector("#visit-message");
const placesContainer = document.querySelector("#places");
const creditsList = document.querySelector("#photo-credits");

// ---------- Last visit message ----------

function getVisitMessage(lastVisit, now) {
    if (!lastVisit) {
        return "Welcome! Let us know if you have any questions.";
    }
    const elapsed = now - lastVisit;
    if (elapsed < DAY_MS) {
        return "Back so soon! Awesome!";
    }
    const days = Math.floor(elapsed / DAY_MS);
    return `You last visited ${days} ${days === 1 ? "day" : "days"} ago.`;
}

function showVisitMessage() {
    const now = Date.now();
    let lastVisit = null;

    try {
        lastVisit = Number(localStorage.getItem("lastVisit")) || null;
        localStorage.setItem("lastVisit", now);
    } catch (error) {
        console.warn("localStorage is unavailable:", error);
    }

    visitMessage.textContent = getVisitMessage(lastVisit, now);
}

// ---------- Places of interest ----------

function displayPlaces() {
    places.forEach((place, index) => {
        const card = document.createElement("section");
        card.classList.add("place-card", `place${index + 1}`);

        card.innerHTML = `
            <h2>${place.name}</h2>
            <figure>
                <img src="images/${place.image}" alt="${place.name}" width="300" height="200"${index > 1 ? ' loading="lazy"' : ""}>
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button type="button" aria-label="Learn more about ${place.name}">Learn More</button>
        `;

        card.querySelector("button").addEventListener("click", () => {
            window.open(place.url, "_blank", "noopener");
        });

        placesContainer.appendChild(card);
    });
}

function displayCredits() {
    places.forEach((place) => {
        const item = document.createElement("li");
        item.innerHTML = `${place.name}: <a href="${place.credit.source}">${place.credit.author}</a>, ${place.credit.license}`;
        creditsList.appendChild(item);
    });
}

showVisitMessage();
displayPlaces();
displayCredits();
