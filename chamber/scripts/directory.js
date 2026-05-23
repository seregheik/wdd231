const url = 'data/members.json';
const membersContainer = document.querySelector('#members-container');
const gridButton = document.querySelector('#grid-view');
const listButton = document.querySelector('#list-view');

async function getMemberData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error('Error fetching member data:', error);
    membersContainer.innerHTML = '<p>Sorry, there was an error loading the directory.</p>';
  }
}

const displayMembers = (members) => {
  membersContainer.innerHTML = ''; // clear container

  members.forEach((member) => {
    // Create elements
    const card = document.createElement('section');
    card.classList.add('member-card');

    const image = document.createElement('img');
    const name = document.createElement('h3');
    const address = document.createElement('p');
    const phone = document.createElement('p');
    const website = document.createElement('a');
    const level = document.createElement('span');
    const description = document.createElement('p');

    // Populate data
    name.textContent = member.name;
    address.textContent = member.address;
    phone.textContent = member.phone;
    
    website.href = member.website;
    website.textContent = 'Visit Website';
    website.target = '_blank';
    
    description.textContent = member.description;
    description.classList.add('desc');

    image.setAttribute('src', member.image);
    image.setAttribute('alt', `Logo of ${member.name}`);
    image.setAttribute('loading', 'lazy');
    image.setAttribute('width', '120');
    image.setAttribute('height', '120');

    level.classList.add('member-level', `level-${member.membershipLevel}`);
    level.textContent = member.membershipLevel === 1 ? 'Member' 
                      : member.membershipLevel === 2 ? 'Silver' 
                      : 'Gold';

    // Append to card
    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(level);
    card.appendChild(description);
    card.appendChild(website);

    // Append to container
    membersContainer.appendChild(card);
  });
};

// Toggle logic
gridButton.addEventListener('click', () => {
  membersContainer.classList.remove('list-view');
  gridButton.classList.add('active');
  listButton.classList.remove('active');
});

listButton.addEventListener('click', () => {
  membersContainer.classList.add('list-view');
  listButton.classList.add('active');
  gridButton.classList.remove('active');
});

// Initialize
getMemberData();
