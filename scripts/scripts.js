document.addEventListener('DOMContentLoaded', () => {
    // Responsive menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.querySelector('nav');

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('open');
        if (nav.classList.contains('open')) {
            menuBtn.textContent = 'X';
        } else {
            menuBtn.innerHTML = '&#9776;';
        }
    });

    // Output current year
    document.getElementById('currentyear').textContent = new Date().getFullYear();

    // Output last modified date
    document.getElementById('lastModified').textContent = document.lastModified;
});