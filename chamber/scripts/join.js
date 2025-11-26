// Set timestamp when form loads
document.addEventListener('DOMContentLoaded', function() {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        timestampField.value = new Date().toISOString();
    }
    
    // Modal functionality
    const modals = {
        'np': document.getElementById('npModal'),
        'bronze': document.getElementById('bronzeModal'),
        'silver': document.getElementById('silverModal'),
        'gold': document.getElementById('goldModal')
    };
    
    const closeButtons = document.querySelectorAll('.close');
    
    // Open modal when info button is clicked
    document.querySelectorAll('.info-btn').forEach(button => {
        button.addEventListener('click', function() {
            const level = this.getAttribute('data-level');
            if (modals[level]) {
                modals[level].style.display = 'block';
            }
        });
    });
    
    // Close modal when X is clicked
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        Object.values(modals).forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
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