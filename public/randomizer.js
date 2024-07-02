const container = document.getElementById('letters-container');
let intervalId;

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

function getRandomLetter() {
    const randomIndex = Math.floor(Math.random() * ALPHABET.length);
    return ALPHABET[randomIndex];
}

function renderLetter(letter) {
    const letterElement = document.createElement('div');
    letterElement.className = 'letter';
    letterElement.innerText = letter;
    letterElement.style.paddingLeft = `${Math.random() * 100}vw`;
    letterElement.style.animationDuration = `${Math.random() * 5 + 3}s`; // Random fall duration between 3 and 8 seconds
    container.appendChild(letterElement);

    // Remove the letter after it falls out of view
    letterElement.addEventListener('animationend', () => {
        letterElement.remove();
    });
}

function startRandomLetters() {
    intervalId = setInterval(() => {
        const letter = getRandomLetter();
        renderLetter(letter);
    }, 100);
}

function stopRandomLetters() {
    clearInterval(intervalId);
}

// Start the random letter generator
startRandomLetters();

// Stop the random letter generator after 5 seconds (for demonstration)
setTimeout(stopRandomLetters, 5000);

// Expose the stop function to the global scope for manual stopping
window.stopRandomLetters = stopRandomLetters;

