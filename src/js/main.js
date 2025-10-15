let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('theme-switch')

const enableDarkMode = () => {
    document.body.classList.add('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkMode()

themeSwitch.addEventListener("click", ()=> {
    darkmode = localStorage.getItem('darkmode')
    darkmode !== "active" ? enableDarkMode() : disableDarkMode()
})



const modal = document.getElementById('cardModal');
const closeButton = document.querySelector('.close-button'); 
const openModalButtons = document.querySelectorAll('.open-modal');

const modalTitle = document.getElementById('modal-title');
const modalArtist = document.getElementById('modal-artist');

function closeModal() {
    modal.style.display = 'none';
}

function openModal(event) {
    event.preventDefault(); 
    
    const button = event.currentTarget;
    const title = button.getAttribute('data-title');
    const artist = button.getAttribute('data-artist');

    modalTitle.textContent = title;
    modalArtist.textContent = artist;
    
    modal.style.display = 'block';
}

openModalButtons.forEach(button => {
    button.addEventListener('click', openModal);
});

closeButton.addEventListener('click', closeModal);

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});