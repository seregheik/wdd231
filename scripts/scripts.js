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

    // Course list and filtering
    const courseList = document.getElementById('course-list');
    const creditsInfo = document.getElementById('credits-info');
    
    function renderCourses(courseArray) {
        courseList.innerHTML = ''; // Clear container
        courseArray.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.classList.add('course');
            if (course.completed) {
                courseDiv.classList.add('completed');
            }
            courseDiv.textContent = `${course.subject} ${course.number}`;
            courseList.appendChild(courseDiv);
        });

        // Update total credits
        const totalCredits = courseArray.reduce((acc, course) => acc + course.credits, 0);
        creditsInfo.innerHTML = `The total credits for course listed above is <strong>${totalCredits}</strong>`;
    }

    // Initial render
    renderCourses(courses);

    // Event listeners for filter buttons
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