const hamburger = document.querySelector('#menu');
const nav = document.querySelector('.navigation');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.classList.toggle('open');
});
