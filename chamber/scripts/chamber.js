// Actualizar año y fecha de modificación
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

// Navegación responsive
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cargar miembros desde JSON
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

// Cambiar entre vista grid y lista
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

// Cargar miembros cuando la página se abre
loadMembers();