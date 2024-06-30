let intervalId;

function startRandomLetters() {
    const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

    function getRandomLetter() {
        const randomIndex = Math.floor(Math.random() * ALPHABET.length);
        const randomLetter = ALPHABET[randomIndex];
        console.log(randomLetter);
    }

    // Start the interval to run getRandomLetter every 100 milliseconds
    intervalId = setInterval(getRandomLetter, 100);
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
