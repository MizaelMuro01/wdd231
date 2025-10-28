// Navigation functionality
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when clicking on a link--
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Update current year in footer--
document.getElementById('currentyear').textContent = new Date().getFullYear();

// Update last modified date--
document.getElementById('lastModified').textContent = document.lastModified;

// Course data array - this section was helped by Moroni
const courses = [
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        description: 'Introduction to Web Development',
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        description: 'Programming with Functions',
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        description: 'Programming with Classes',
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        description: 'Dynamic Web Fundamentals',
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Web Frontend Development I',
        credits: 2,
        description: 'Web Frontend Development I',
        completed: false
    }
];

// Function to display courses--
function displayCourses(filter = 'all') {
    const container = document.getElementById('coursesContainer');
    const filteredCourses = courses.filter(course => {
        if (filter === 'all') return true;
        return course.subject === filter;
    });
    
    container.innerHTML = filteredCourses.map(course => `
        <div class="course-card ${course.completed ? 'completed' : ''}">
            <div class="course-code">${course.subject} ${course.number}</div>
            <div class="course-name">${course.title}</div>
            <div class="course-credits">${course.credits} credits</div>
        </div>
    `).join('');
    
    updateTotalCredits(filteredCourses);
}

// Function to update total credits--
function updateTotalCredits(coursesArray) {
    const totalCredits = coursesArray.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById('totalCredits').textContent = totalCredits;
}

// Filter button functionality--
document.querySelectorAll('.filter-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons--
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button--
        button.classList.add('active');
        
        // Filter courses mizael es esto-------------------
        const filter = button.getAttribute('data-filter');
        displayCourses(filter);
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    displayCourses('all');
});