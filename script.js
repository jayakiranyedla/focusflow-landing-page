const menuButton = document.querySelector("#menuButton");
const navLinks = document.querySelector("#navLinks");


// Mobile navigation
menuButton.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("mobile-open");

    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
    );
});


// Close mobile navigation after selecting a link
navLinks.addEventListener("click", (event) => {
    if (event.target.tagName !== "A") {
        return;
    }

    navLinks.classList.remove("mobile-open");

    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
});


// Simple focus-session demo
const focusButton = document.querySelector(".focus-mini button");
const focusTime = document.querySelector(".focus-mini strong");

let timerId = null;
let remainingSeconds = 25 * 60;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(remaining).padStart(2, "0")}`;
}

function updateFocusTimer() {
    focusTime.textContent = formatTime(remainingSeconds);
}

focusButton.addEventListener("click", () => {
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;

        focusButton.textContent = "Start";
        return;
    }

    focusButton.textContent = "Pause";

    timerId = setInterval(() => {
        remainingSeconds -= 1;
        updateFocusTimer();

        if (remainingSeconds <= 0) {
            clearInterval(timerId);
            timerId = null;
            remainingSeconds = 25 * 60;

            focusButton.textContent = "Start";
            updateFocusTimer();
        }
    }, 1000);
});


// Keep the navigation menu closed when the viewport becomes desktop-sized
window.addEventListener("resize", () => {
    if (window.innerWidth > 700) {
        navLinks.classList.remove("mobile-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
    }
});