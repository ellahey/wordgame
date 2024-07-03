//TODO: make OOP

const container = document.getElementById('letters-container');
let intervalId;
let selectedLetters = [];

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

function getRandomLetter() {
    const randomIndex = Math.floor(Math.random() * ALPHABET.length);
    return ALPHABET[randomIndex];
}

function renderLetter(letter) {
    const raindrop = document.createElement('div');
    raindrop.className = 'raindrop';
    raindrop.innerText = letter;
    raindrop.style.left = `${Math.random() * 100}vw`;
    raindrop.style.animationDuration = `${Math.random() * 5 + 3}s`; // Random fall duration between 3 and 8 seconds
    container.appendChild(raindrop);
    raindrop.addEventListener('click', () => renderSelectedLetter(letter));

    // Remove the letter after it falls out of view
    raindrop.addEventListener('animationend', () => {
        raindrop.remove();
    });
}

function startRain() {
    intervalId = setInterval(() => {
        const letter = getRandomLetter();
        renderLetter(letter);
    }, 100);
}

function stopRain() {
    clearInterval(intervalId);
}

function renderSelectedLetter(letter) {
    const selectedLetterContainer = document.getElementById('selection-container');
    const selectedLetterElement = document.createElement('p');
    selectedLetterElement.innerText = letter;
    selectedLetterContainer.append(selectedLetterElement);

}

function renderArray() {

}

// Start the random letter generator
startRain();

// Stop the random letter generator after 5 seconds (for demonstration)
setTimeout(stopRain, 5000);

// Expose the stop function to the global scope for manual stopping
window.stopRain = stopRain;
