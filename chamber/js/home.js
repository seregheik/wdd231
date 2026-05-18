const membersUrl = 'data/members.json';
const spotlightContainer = document.getElementById('spotlight-container');

async function getSpotlights() {
  try {
    const response = await fetch(membersUrl);
    const data = await response.json();
    displaySpotlights(data);
  } catch (error) {
    console.error('Error fetching member data:', error);
  }
}

function displaySpotlights(members) {
  // Filter for Silver (2) or Gold (3) members
  const spotlightEligible = members.filter(member => member.membershipLevel >= 2);
  
  // Shuffle array randomly
  const shuffled = spotlightEligible.sort(() => 0.5 - Math.random());
  
  // Take up to 3 members
  const selectedMembers = shuffled.slice(0, 3);
  
  spotlightContainer.innerHTML = '';
  
  selectedMembers.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('card', 'spotlight-card');
    
    // Wireframe layout: Business Name, Tagline, Logo box, Contact info
    card.innerHTML = `
      <h3>${member.name}</h3>
      <p style="font-size: 0.9rem; margin-top: -10px; margin-bottom: 1rem; font-style: italic;">${member.description.substring(0, 50)}...</p>
      <div style="display: flex; gap: 1rem; align-items: center; border-top: 1px solid var(--border-color); padding-top: 1rem;">
        <img src="${member.image}" alt="${member.name} Logo" width="80" height="80" style="object-fit: contain; background: var(--surface-color); border-radius: 8px; padding: 5px;">
        <div style="font-size: 0.85rem; line-height: 1.6;">
          <p style="margin: 0;"><strong>EMAIL:</strong> info@${member.website.replace('https://www.', '')}</p>
          <p style="margin: 0;"><strong>PHONE:</strong> ${member.phone}</p>
          <p style="margin: 0;"><strong>URL:</strong> <a href="${member.website}" target="_blank" style="color: var(--accent-color); text-decoration: none;">${member.website.replace('https://www.', '')}</a></p>
        </div>
      </div>
    `;
    
    spotlightContainer.appendChild(card);
  });
}

// Initialize
getSpotlights();
