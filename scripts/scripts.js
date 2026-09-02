document.addEventListener('DOMContentLoaded', () => {
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

    document.getElementById('currentyear').textContent = new Date().getFullYear();

    document.getElementById('lastModified').textContent = document.lastModified;

    const courseList = document.getElementById('course-list');
    const creditsInfo = document.getElementById('credits-info');
    
    function renderCourses(courseArray) {
        courseList.innerHTML = '';
        courseArray.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.classList.add('course');
            if (course.completed) {
                courseDiv.classList.add('completed');
            }
            courseDiv.textContent = `${course.subject} ${course.number}`;
            courseList.appendChild(courseDiv);
        });

        const totalCredits = courseArray.reduce((acc, course) => acc + course.credits, 0);
        creditsInfo.innerHTML = `The total credits for course listed above is <strong>${totalCredits}</strong>`;
    }

    renderCourses(courses);

    document.getElementById('btn-all').addEventListener('click', () => {
        renderCourses(courses);
    });

    document.getElementById('btn-cse').addEventListener('click', () => {
        const cseCourses = courses.filter(course => course.subject === 'CSE');
        renderCourses(cseCourses);
    });

    document.getElementById('btn-wdd').addEventListener('click', () => {
        const wddCourses = courses.filter(course => course.subject === 'WDD');
        renderCourses(wddCourses);
    });
});