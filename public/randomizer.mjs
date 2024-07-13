class RaindropApp {
    constructor(levelTimeout, levelWordLength) {
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
        this.wordLength = levelWordLength;
        this.rearrangeArea = null;
        this.buttonArea = null;
        this.button = null;
        this.message = document.createElement('div');
        this.message.id = 'message';
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
        const span = document.createElement('span');
        span.innerText = letter;
        span.draggable = true // Make the span draggable
        span.addEventListener('dragstart', this.handleDragStart); // Add dragstart event listener
        span.id = `letter-${letter}-${Date.now()}`; // Unique ID
        this.selectedLetterElement.appendChild(span);
    }

    setOnRainStop(callback) {
        this.onRainStop = callback;
    }

    renderLetterSpaces() {
        this.rearrangeArea = document.getElementById('rearrange-area');
        this.rearrangeArea.innerHTML = ''; // Clear previous spaces
        let totalWidth = 0;

        for (let i = 0; i < this.wordLength; i++) {
            const space = document.createElement('div');
            space.className = 'letter-space';
            space.setAttribute('data-index', `${i}`); // Store index for reference
            space.innerText = '_'; // Placeholder visual representation
            space.addEventListener('dragover', this.handleDragOver);
            space.addEventListener('drop', this.handleDrop);
            this.rearrangeArea.appendChild(space);
            totalWidth += space.offsetWidth; // Add the width of each space
        }

        this.wordArea.style.display = 'block'; // Show wordArea

        // After appending all spaces, center the rearrange area
        this.centerRearrangeArea(this.rearrangeArea, totalWidth);
    }
//TODO create single centering function to use for all elements - or consider handling in css.

    // centerSelectionContainer() {
    //     const totalLettersWidth = this.selectedLetterElement.scrollWidth;
    //     const containerWidth = this.selectedLetterContainer.clientWidth;
    //     this.selectedLetterContainer.style.transform = `translateX(${(containerWidth - totalLettersWidth) / 2}px)`;
    // }

    centerRearrangeArea(rearrangeArea, totalWidth) {
        const rearrangeAreaWidth = rearrangeArea.clientWidth;
        rearrangeArea.style.transform = `translateX(${(rearrangeAreaWidth - totalWidth) / 2}px)`;
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
    }

    handleDragOver = (event) => {
        event.preventDefault();
    }

    handleDrop = (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const sourceId = event.dataTransfer.getData('source-id');
        const draggedElement = document.getElementById(sourceId);

        if (event.currentTarget.className === 'letter-space') {
            event.target.innerText = data;
            draggedElement.style.visibility = 'hidden';
            //}
        } else {
            const selectedLetterContainer = document.getElementById('selection-container');
            if (selectedLetterContainer.firstElementChild.firstElementChild.id === sourceId) {
                selectedLetterContainer.firstElementChild.firstElementChild.style.visibility = 'visible';
            }
        }
    }

    renderButton() {
        this.buttonArea = document.createElement('div');
        this.buttonArea.className = 'button-area'; // Add this line
        this.button = document.createElement('button');
        this.button.type = 'submit';
        this.button.id = 'submit';
        this.button.innerText = 'Submit word';
        this.buttonArea.appendChild(this.button);
        this.button.addEventListener('click', () => this.extractWord());
        this.wordArea.appendChild(this.buttonArea);
    }


    extractWord() {
        console.log('extractWord() is called')
        let userWord = '';
        const children = this.rearrangeArea.children;
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            userWord += child.innerText;
        }
        if (userWord !== '') {
            this.postWord(userWord);
        }
    }

    postWord(word) {
        console.log('postWord function called');
        const lowercaseWord = word.toLowerCase(); // Convert to lowercase
        fetch('/api/dictionary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word: lowercaseWord }) // Send lowercase word
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            this.renderResult(data.code)
            console.log(data);
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    renderResult(code) {
        if (code === 0) {
            this.message.innerText = 'You made a word!'
        } else if (code === 1) {
            this.message.innerText = 'Word not found in dictionary.'
        }
    }

}



/* Level One ****************************************************************************************/

const levelOne = new RaindropApp(5000, 3);

//TODO - move function below to inside class
levelOne.setOnRainStop(() => {
    console.log('Rain has stopped. Rendering additional elements.');
    levelOne.renderLetterSpaces();
    levelOne.renderButton();
    // Display message or instructions for user
    //TODO - create a separate class for handling the area / messages below
    levelOne.message.innerText = 'Drag letters to spaces to form words';
    levelOne.message.className = 'instruction-message';
    levelOne.wordArea.appendChild(levelOne.message);
});
levelOne.initialize();

/* Level Two  /****************************************************************************************/
/* Level Three /***************************************************************************************/
/* Lightening Round  /*********************************************************************************/


