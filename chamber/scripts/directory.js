const currentYearSpan = document.getElementById("currentyear");
if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
}

const lastModifiedSpan = document.getElementById("lastModified");
if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}

const gridBtn = document.getElementById("grid-view");
const listBtn = document.getElementById("list-view");
const membersContainer = document.getElementById("members-container");

if (gridBtn && listBtn && membersContainer) {
    gridBtn.addEventListener("click", () => {
        membersContainer.classList.add("grid-layout");
        membersContainer.classList.remove("list-layout");
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
        membersContainer.classList.add("list-layout");
        membersContainer.classList.remove("grid-layout");
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    });
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

const url = 'data/members.json';

async function getMembersData() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error("Error fetching data:", response.statusText);
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

function displayMembers(members) {
    if (!membersContainer) return;
    
    membersContainer.innerHTML = "";
    
    const fragment = document.createDocumentFragment();
    
    members.forEach((member, index) => {
        let card = document.createElement("section");
        card.classList.add("member-card");
        
        let logo = document.createElement("img");
        logo.setAttribute("src", `images/${member.image}`);
        logo.setAttribute("alt", `${member.name} Logo`);
        
        // Optimize LCP: do not lazy-load the first image, and give it high fetch priority
        if (index === 0) {
            logo.setAttribute("fetchpriority", "high");
        } else {
            logo.setAttribute("loading", "lazy");
        }
        
        logo.setAttribute("width", "150");
        logo.setAttribute("height", "150");
        
        let name = document.createElement("h3");
        name.textContent = member.name;
        
        let address = document.createElement("p");
        address.textContent = member.address;
        
        let phone = document.createElement("p");
        phone.textContent = member.phone;
        
        let website = document.createElement("a");
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");
        website.textContent = "Website";
        
        let levelText = "";
        if (member.membershipLevel === 1) levelText = "Member";
        else if (member.membershipLevel === 2) levelText = "Silver";
        else if (member.membershipLevel === 3) levelText = "Gold";
        
        let level = document.createElement("p");
        level.classList.add("membership-level");
        level.textContent = `Level: ${levelText}`;
        
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);
        
        fragment.appendChild(card);
    });
    
    membersContainer.appendChild(fragment);
}

getMembersData();
