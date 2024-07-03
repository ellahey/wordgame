class RaindropApp {
    constructor(containerId, selectionContainerId) {
        this.container = document.getElementById(containerId);
        this.selectedLetterContainer = document.getElementById(selectionContainerId);
        this.selectedLetterElement = document.createElement('div');
        this.selectedLetterElement.id = 'selected';
        this.selectedLetterContainer.appendChild(this.selectedLetterElement);
        this.intervalId = null;
        this.ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    getRandomLetter() {
        const randomIndex = Math.floor(Math.random() * this.ALPHABET.length);
        return this.ALPHABET[randomIndex];
    }

    renderLetter(letter) {
        const raindrop = document.createElement('div');
        raindrop.className = 'raindrop';
        raindrop.innerText = letter;
        raindrop.style.left = `${Math.random() * 100}vw`;
        raindrop.style.animationDuration = `${Math.random() * 5 + 3}s`;
        this.container.appendChild(raindrop);

        raindrop.addEventListener('click', () => this.renderSelectedLetter(letter));

        raindrop.addEventListener('animationend', () => {
            raindrop.remove();
        });
    }

    startRain() {
        this.intervalId = setInterval(() => {
            const letter = this.getRandomLetter();
            this.renderLetter(letter);
        }, 100);
    }

    stopRain() {
        clearInterval(this.intervalId);
    }

    renderSelectedLetter(letter) {
        const SPACE_SIZE = '2em';
        const span = document.createElement('span');
        span.innerText = letter;
        span.style.marginRight = SPACE_SIZE;
        this.selectedLetterElement.appendChild(span);
        this.centerSelectionContainer();
    }

    centerSelectionContainer() {
        const totalLettersWidth = this.selectedLetterElement.scrollWidth;
        const containerWidth = this.selectedLetterContainer.clientWidth;
        this.selectedLetterContainer.style.transform = `translateX(${(containerWidth - totalLettersWidth) / 2}px)`;
    }
}

// Create an instance of the RaindropApp
const raindropApp = new RaindropApp('letters-container', 'selection-container');

raindropApp.startRain();

// Stop the random letter generator after 5 seconds (for demonstration)
setTimeout(() => raindropApp.stopRain(), 5000);

// Expose the stop function to the global scope for manual stopping
window.stopRain = () => raindropApp.stopRain();
