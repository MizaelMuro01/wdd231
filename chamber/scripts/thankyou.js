// Display submitted form data
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const applicationData = document.getElementById('applicationData');
    
    const displayData = {
        'firstName': 'First Name',
        'lastName': 'Last Name', 
        'email': 'Email Address',
        'phone': 'Phone Number',
        'organization': 'Business Name',
        'timestamp': 'Application Date'
    };
    
    let html = '<ul class="application-list">';
    for (const [key, label] of Object.entries(displayData)) {
        const value = urlParams.get(key);
        if (value) {
            let displayValue = value;
            if (key === 'timestamp') {
                displayValue = new Date(value).toLocaleString();
            }
            html += `<li><strong>${label}:</strong> ${displayValue}</li>`;
        }
    }
    html += '</ul>';
    
    applicationData.innerHTML = html;
    
    // Mobile menu toggle (same as in chamber.js)
    const menuToggle = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Update year and date (same as in chamber.js)
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;
});