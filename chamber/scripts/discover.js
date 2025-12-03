import places from '../data/places.mjs';

// Update year and date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Responsive menu
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Show visit message
function showVisitMessage() {
    const messageElement = document.getElementById('visitorMessage');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();
    
    if (!lastVisit) {
        // First visit
        messageElement.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const lastVisitDate = parseInt(lastVisit);
        const daysDifference = Math.floor((now - lastVisitDate) / (1000 * 60 * 60 * 24));
        
        if (daysDifference < 1) {
            messageElement.textContent = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            messageElement.textContent = "You last visited 1 day ago.";
        } else {
            messageElement.textContent = `You last visited ${daysDifference} days ago.`;
        }
    }
    
    // Save current visit
    localStorage.setItem('lastVisit', now.toString());
}

// Load places
function loadPlaces() {
    const container = document.getElementById('placesContainer');
    
    places.forEach(place => {
        const placeCard = document.createElement('div');
        placeCard.className = 'place-card';
        placeCard.innerHTML = `
            <h3>${place.name}</h3>
            <figure>
                <img src="${place.image}" alt="${place.name}" loading="lazy">
            </figure>
            <address>${place.address}</address>
            <p>${place.description}</p>
            <button class="learn-btn">Learn More</button>
        `;
        
        container.appendChild(placeCard);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    showVisitMessage();
    loadPlaces();
});