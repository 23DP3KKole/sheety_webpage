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

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showNotification(message, type) {
    const msgBox = document.getElementById('message-box');
    msgBox.textContent = message;
    // The 'hidden' class is removed here to show the message box
    msgBox.className = 'message-box show';
    msgBox.classList.remove('hidden');

    if (type === 'success') {
        msgBox.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        msgBox.style.backgroundColor = '#ef4444';
    }

    // Automatically hide after 3 seconds
    setTimeout(() => {
        msgBox.classList.remove('show');
        // Hide display: none after transition ends
        setTimeout(() => {
            msgBox.classList.add('hidden');
        }, 500); 
    }, 3000);
}

function clearError(inputElement, errorElement) {
    inputElement.classList.remove('error-border');
    errorElement.classList.add('hidden');
}

function setError(inputElement, errorElement, message) {
    inputElement.classList.add('error-border');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}

function setupInputListeners() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    /**
     * Generic listener to clear error if the field is no longer empty.
     * This ensures that errors set from a failed submission are cleared
     * as soon as the user starts typing, providing better UX.
     */
    const clearIfFilled = (input, error) => {
        if (input.value.trim() !== '') {
            clearError(input, error);
        }
    };

    // Attach listeners to clear errors as the user types
    nameInput.addEventListener('input', () => clearIfFilled(nameInput, nameError));
    // Applying the general 'clearIfFilled' to email too, simplifying the clearing logic:
    // Error is cleared as soon as text is present; final validation is done on submit.
    emailInput.addEventListener('input', () => clearIfFilled(emailInput, emailError)); 
    messageInput.addEventListener('input', () => clearIfFilled(messageInput, messageError));
}

function validateForm(event) {
    event.preventDefault();

    let isValid = true;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // 1. Clear previous errors
    clearError(nameInput, nameError);
    clearError(emailInput, emailError);
    clearError(messageInput, messageError);

    // 2. Name validation (mandatory)
    if (nameInput.value.trim() === '') {
        setError(nameInput, nameError, 'Please enter your name.');
        isValid = false;
    }

    // 3. Email validation (mandatory and format check)
    const emailValue = emailInput.value.trim();
    if (emailValue === '') {
        setError(emailInput, emailError, 'Please enter an email address.');
        isValid = false;
    } else if (!emailRegex.test(emailValue)) {
        setError(emailInput, emailError, 'Please enter a valid email format (e.g., user@domain.com).');
        isValid = false;
    }

    // 4. Message validation (mandatory)
    if (messageInput.value.trim() === '') {
        setError(messageInput, messageError, 'Please enter your message.');
        isValid = false;
    }

    // 5. Final result
    if (isValid) {
            // SUCCESS: Show green notification box and reset the form.
            showNotification('Form successfully submitted! Thank you for your message.', 'success');
            
            // Optional: Reset the form fields
            document.getElementById('contactForm').reset();
        } else {
            // ERROR: Show red notification box.
            showNotification('Error: Please fill in all required fields correctly.', 'error');
        }

    return false;
    }

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        setHtmlTheme('dark');
    } else {
        setHtmlTheme('light'); 
    }

    // Initialize real-time input listeners
    setupInputListeners();

    clearError(document.getElementById('name'), document.getElementById('name-error'));
    clearError(document.getElementById('email'), document.getElementById('email-error'));
    clearError(document.getElementById('message'), document.getElementById('message-error'));
});