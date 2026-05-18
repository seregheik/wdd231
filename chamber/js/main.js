// Hamburger Menu Logic
const hamburgerMenu = document.getElementById('menu');
const navigation = document.querySelector('.navigation');

hamburgerMenu.addEventListener('click', () => {
  navigation.classList.toggle('open');
  hamburgerMenu.classList.toggle('open');
  const isExpanded = hamburgerMenu.getAttribute('aria-expanded') === 'true';
  hamburgerMenu.setAttribute('aria-expanded', !isExpanded);
});

// Dynamic Footer Dates
document.addEventListener('DOMContentLoaded', () => {
  const currentYearSpan = document.getElementById('currentyear');
  const lastModifiedSpan = document.getElementById('lastModified');

  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  if (lastModifiedSpan) {
    lastModifiedSpan.textContent = `Last Modification: ${document.lastModified}`;
  }
});
