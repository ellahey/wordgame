class RaindropApp {
    constructor(levelTimeout) {
        this.timeout = levelTimeout;
        this.container = document.getElementById('letters-container');
        this.selectedLetterContainer = document.getElementById('selection-container');
        this.wordArea = document.getElementById('word-area');
        this.selectedLetterElement = document.createElement('div');
        this.selectedLetterElement.id = 'selected';
        this.selectedLetterContainer.appendChild(this.selectedLetterElement);
        this.intervalId = null;
        this.ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.letterArray = [];
        this.raindrops = []; // Array to keep track of raindrops
        this.isRainStopped = false; // Flag to track if rain has stopped
        this.isDraggable = false; // Flag to track if letters are draggable
        this.onRainStop = null; // Callback function when rain stops
        this.letterSpaces = []; // Array to store letter spaces
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
        this.raindrops.push(raindrop);

        raindrop.addEventListener('click', () => this.renderSelectedLetter(letter));

        raindrop.addEventListener('animationend', () => {
            raindrop.remove();
            this.raindrops = this.raindrops.filter(drop => drop !== raindrop); // Remove from array
            // Check if all raindrops have stopped
            if (this.raindrops.length === 0 && this.isRainStopped && this.onRainStop) {
                this.onRainStop(); // Invoke callback function
            }
        });
    }

    startRain() {
        this.intervalId = setInterval(() => {
            const letter = this.getRandomLetter();
            this.renderLetter(letter);
        }, 100);

        // Stop the random letter generator after the specified timeout
        setTimeout(() => {
            this.stopRain();
            this.isRainStopped = true;
        }, this.timeout);
    }

    stopRain() {
        clearInterval(this.intervalId);
    }

    renderSelectedLetter(letter) {
        this.letterArray.push(letter);
        const SPACE_SIZE = '2em';
        const span = document.createElement('span');
        span.innerText = letter;
        span.style.marginRight = SPACE_SIZE;
        this.selectedLetterElement.appendChild(span);
        this.centerSelectionContainer();
    }

    setOnRainStop(callback) {
        this.onRainStop = callback;
    }

    renderLetterSpaces() {
        // Clear existing spaces if any
        this.letterSpaces.forEach(space => space.remove());
        this.letterSpaces = [];

        // Create spaces for each selected letter
        this.letterArray.forEach((letter, index) => {
            const space = document.createElement('div');
            space.className = 'letter-space';
            space.setAttribute('data-index', index); // Store index for reference
            space.innerText = '_'; // Placeholder visual representation
            space.addEventListener('dragover', this.handleDragOver);
            space.addEventListener('drop', this.handleDrop);
            this.wordArea.appendChild(space);
            this.letterSpaces.push(space);
        });
    }

    centerSelectionContainer() {
        const totalLettersWidth = this.selectedLetterElement.scrollWidth;
        const containerWidth = this.selectedLetterContainer.clientWidth;
        this.selectedLetterContainer.style.transform = `translateX(${(containerWidth - totalLettersWidth) / 2}px)`;
    }

    initialize() {
        this.startRain();

        // Expose the stop function to the global scope for manual stopping
        window.stopRain = () => this.stopRain();
    }

    // Drag and Drop Event Handlers
    handleDragStart = (event) => {
        const target = event.target;
        event.dataTransfer.setData('text/plain', target.innerText);
        setTimeout(() => {
            target.style.display = 'none';
        }, 0);
    }

    handleDragOver = (event) => {
        event.preventDefault();
    }

    handleDrop = (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const target = event.target;
        target.innerText = data;
        target.style.display = 'block';
    }
}

/* Level One ****************************************************************************************/

const levelOne = new RaindropApp(5000);
levelOne.setOnRainStop(() => {
    console.log('Rain has stopped. Rendering additional elements.');
    levelOne.isDraggable = true;
    levelOne.renderLetterSpaces();
    // Display message or instructions for user
    const message = document.createElement('div');
    message.innerText = 'Drag letters to spaces to form words';
    message.className = 'instruction-message';
    levelOne.wordArea.appendChild(message);
});
levelOne.initialize();

/* Level Two  /****************************************************************************************/
/* Level Three /***************************************************************************************/
/* Lightening Round  /*********************************************************************************/
