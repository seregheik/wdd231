const currentYearSpan = document.getElementById("currentyear");
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedSpan = document.getElementById("lastModified");
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}

const hamburger = document.getElementById("hamburger");
const primaryNavUl = document.querySelector("#primary-nav ul");

if (hamburger && primaryNavUl) {
    hamburger.addEventListener("click", () => {
        primaryNavUl.classList.toggle("open");
        hamburger.classList.toggle("open");

        if (primaryNavUl.classList.contains("open")) {
            hamburger.innerHTML = "✖";
        } else {
            hamburger.innerHTML = "☰";
        }
    });
}

function getMembershipLevelText(level) {
    if (level === 3) return "Gold";
    if (level === 2) return "Silver";
    return "Member";
}
