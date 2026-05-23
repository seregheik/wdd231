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

  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const currentTheme = localStorage.getItem('theme') || 'dark'; // Default to dark based on our CSS

  if (currentTheme === 'light') {
    body.classList.add('light-mode');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      let theme = 'dark';
      if (body.classList.contains('light-mode')) {
        theme = 'light';
      }
      localStorage.setItem('theme', theme);
    });
  }
});
