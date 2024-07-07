

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
        this.onRainStop = null; // Callback function when rain stops
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
        span.draggable = true // Make the span draggable
        span.addEventListener('dragstart', this.handleDragStart); // Add dragstart event listener
        span.id = `letter-${letter}-${Date.now()}`; // Unique ID
        this.selectedLetterElement.appendChild(span);
        this.centerSelectionContainer();
    }

    setOnRainStop(callback) {
        this.onRainStop = callback;
    }

    renderLetterSpaces() {
        const rearrangeArea = document.getElementById('rearrange-area');
        rearrangeArea.innerHTML = ''; // Clear previous spaces
        for (let i = 0; i < this.letterArray.length; i++) {
            const space = document.createElement('div');
            space.className = 'letter-space';
            space.setAttribute('data-index', `${i}`); // Store index for reference
            space.innerText = '_'; // Placeholder visual representation
            space.addEventListener('dragover', this.handleDragOver);
            space.addEventListener('drop', this.handleDrop);
            rearrangeArea.appendChild(space);
        }
        this.wordArea.style.display = 'block'; // Show wordArea
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
        const target = event.target; // selected letter
        event.dataTransfer.setData('text/plain', target.innerText);
        event.dataTransfer.setData('source-id', target.id);
        setTimeout(() => {
           target.style.visibility = 'hidden';
        }, 0);
    }

    handleDragOver = (event) => {
        event.preventDefault();
    }

    handleDrop = (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const sourceId = event.dataTransfer.getData('source-id');
        const draggedElement = document.getElementById(sourceId);

        if (event.target.classList.contains('letter-space')) {
            event.target.innerText = data;
            // Remove the letter from the selected letter area
            if (draggedElement) {
                draggedElement.remove();
            }
        } else {
            // Reset the visibility of the dragged element if dropped outside valid area
            if (draggedElement) {
                draggedElement.style.visibility = 'visible';
            }
        }
    }
}

/* Level One ****************************************************************************************/

const levelOne = new RaindropApp(5000);
levelOne.setOnRainStop(() => {
    console.log('Rain has stopped. Rendering additional elements.');
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


/*Logger*/

function sendLog(level, message) {
    fetch('/api/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({level, message})
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Log sent successfully:', data);
        })
        .catch(error => {
            console.error('Error sending log:', error);
        });
}