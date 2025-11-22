// update year and date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Nav responisve
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// members json
const membersDisplay = document.getElementById('membersDisplay');
const gridViewBtn = document.getElementById('gridView');
const listViewBtn = document.getElementById('listView');

async function loadMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displayMembers(data.members);
    } catch (error) {
        console.error('Error loading members:', error);
        membersDisplay.innerHTML = '<p>Error loading members</p>';
    }
}

function displayMembers(members) {
    membersDisplay.innerHTML = '';
    
    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = `member-card ${getMembershipClass(member.membershipLevel)}`;
        
        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" class="member-image">
            <div class="member-info">
                <h3 class="member-name">${member.name}</h3>
                <p class="member-category">${member.category}</p>
                <p class="member-description">${member.description}</p>
                <div class="member-contact">
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <p><a href="${member.website}" target="_blank">Website</a></p>
                </div>
            </div>
        `;
        
        membersDisplay.appendChild(memberCard);
    });
}

function getMembershipClass(level) {
    switch(level) {
        case 3: return 'gold';
        case 2: return 'silver';
        default: return 'member';
    }
}

// list and grid
gridViewBtn.addEventListener('click', () => {
    membersDisplay.className = 'members-grid';
    gridViewBtn.classList.add('active');
    listViewBtn.classList.remove('active');
});

listViewBtn.addEventListener('click', () => {
    membersDisplay.className = 'members-list';
    listViewBtn.classList.add('active');
    gridViewBtn.classList.remove('active');
});

// charging members
loadMembers();





// Funciones para index.html
function loadSpotlights() {
    const spotlightContainer = document.getElementById('spotlightContainer');
    if (!spotlightContainer) return;

    // examples
    const spotlights = [
        {
            name: "Tech Solutions Inc",
            image: "member1.png",
            membershipLevel: 3, // 3 = gold
            address: "123 Tech Street",
            phone: "(555) 123-4567",
            website: "#",
            category: "Technology",
            description: "Leading tech solutions provider"
        },
        {
            name: "Business Consultants",
            image: "member2.png",
            membershipLevel: 2, // 2 = silver
            address: "456 Business Ave",
            phone: "(555) 234-5678", 
            website: "#",
            category: "Consulting",
            description: "Professional business consulting"
        },
        {
            name: "Retail Masters",
            image: "member3.png",
            membershipLevel: 3, // 3 = gold
            address: "789 Commerce Blvd",
            phone: "(555) 345-6789",
            website: "#",
            category: "Retail",
            description: "Premium retail solutions"
        }
    ];

    // random members (gold o silver)
    const eligibleMembers = spotlights.filter(member => 
        member.membershipLevel === 3 || member.membershipLevel === 2
    );
    
    const selected = [];
    const numToSelect = Math.min(2, eligibleMembers.length); // ALWAYS 2
    
    while (selected.length < numToSelect && eligibleMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
        selected.push(eligibleMembers[randomIndex]);
        eligibleMembers.splice(randomIndex, 1);
    }

    // spotlights
    spotlightContainer.innerHTML = selected.map(member => `
        <div class="spotlight-card ${getMembershipClass(member.membershipLevel)}">
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <span class="membership-badge ${getMembershipClass(member.membershipLevel)}">
                ${member.membershipLevel === 3 ? 'Gold' : 'Silver'} Member
            </span>
            <p class="member-category">${member.category}</p>
            <p class="member-description">${member.description}</p>
            <div class="member-contact">
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            </div>
        </div>
    `).join('');
}

// WEATHER SIMULATOR
function loadWeather() {
    const currentTemp = document.getElementById('currentTemp');
    const weatherDesc = document.getElementById('weatherDesc');
    const forecast = document.getElementById('forecast');

    if (currentTemp) {
        currentTemp.textContent = '75°F';
    }
    if (weatherDesc) {
        weatherDesc.textContent = 'Sunny';
    }
    if (forecast) {
        forecast.innerHTML = `
            <div class="forecast-day">Mon: 78°F - Sunny</div>
            <div class="forecast-day">Tue: 76°F - Partly Cloudy</div>
            <div class="forecast-day">Wed: 74°F - Cloudy</div>
        `;
    }
}

// INIC
if (window.location.pathname.includes('index.html') || 
    window.location.pathname.endsWith('chamber/') ||
    (window.location.pathname.includes('chamber') && !window.location.pathname.includes('directory.html'))) {
    
    document.addEventListener('DOMContentLoaded', function() {
        loadSpotlights();
        loadWeather();
    });
}