let darkmode = localStorage.getItem('darkmode')
const themeSwitch = document.getElementById('themeButton')

const enableDarkMode = () => {
    document.body.classList('darkmode')
    localStorage.setItem('darkmode', 'active')
}

const disableDarkMode = () => {
    document.body.classList.remove('darkmode')
    localStorage.setItem('darkmode', null)
}

if(darkmode === "active") enableDarkMode()

themeSwitch.addEventListener("click", ()=> {
    darkmode !== "active" ? enableDarkMode() : disableDarkMode()
})