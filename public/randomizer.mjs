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
        this.message = document.createElement('div');
        this.message.id = 'message';
        this.instructions = document.getElementById('instructions');
        this.levelTitle = document.getElementById('levelTitle');
        this.MAX_LETTERS = 6;
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
if (this.raindrops.length >= this.MAX_LETTERS) {
    raindrop.addEventListener('click', () => this.renderSelectedLetter(letter));
} else {
    this.message.innerText = 'You have already selected 7 letters.'
}

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
    }

    setInstructionText(text) {
        this.instructions.innerText = text;
    }

    clearInstructionText() {
        this.instructions.innerText = '';
    }

    setLevelTitle(title) {
        this.levelTitle.innerText = title;
    }

    clearLevelTitle() {
        this.levelTitle.innerText = '';
    }

    initialize(title, text) {
        this.setLevelTitle(title);
        setTimeout(() => {
            this.clearLevelTitle(title);
            this.setInstructionText(text);
            setTimeout(() => {
                this.clearInstructionText();
                this.startRain();
            }, 5000);
        }, 3000)
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

        // Get the letter being dragged
        const letter = event.dataTransfer.getData('text/plain');
        const sourceId = event.dataTransfer.getData('source-id');
        const draggedElement = document.getElementById(sourceId);

        // Check if dropping on a letter-space
        if (event.currentTarget.className === 'letter-space') {
            // If the target space already contains a letter, exit early
            if (event.currentTarget.innerText !== '_') {
                return;
            }

            // Place the letter in the target space and hide the dragged letter
            event.currentTarget.innerText = letter;
            draggedElement.style.visibility = 'hidden';
            event.currentTarget.setAttribute('data-source-id', sourceId); // Store the source ID on the space for future reference

        } else {
            // Handle if the letter is being dragged back to the selected letters container
            const selectedLetterContainer = document.getElementById('selection-container');
            if (selectedLetterContainer.contains(event.target)) {
                // Find the space that originally held the letter
                const spaces = document.querySelectorAll('.letter-space');
                spaces.forEach(space => {
                    if (space.getAttribute('data-source-id') === sourceId) {
                        space.innerText = '_'; // Clear the letter space
                        space.removeAttribute('data-source-id'); // Remove the reference
                    }
                });

                // Make the letter visible again
                draggedElement.style.visibility = 'visible';
            }
        }
    }

    renderButton() {
        console.log('renderButton called')
        this.buttonArea = document.createElement('div')
        this.buttonArea.className = 'button-area';
        const button = document.createElement('button');
        button.type = 'submit';
        button.id = 'submit';
        button.innerText = 'Submit';
        this.buttonArea.appendChild(button);
        this.wordArea.appendChild(this.buttonArea);
        button.addEventListener('click', () => this.extractWord());
    }

    // If no letters or not enough letters for level have been selected:
    showReTryMessage(text) {
        this.setInstructionText(text)
        const retryButton = document.createElement('button')
        retryButton.type = 'button';
        retryButton.id = 'retry';
        retryButton.addEventListener('click', () => this.extractWord());
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
    const levelOneTitle = 'Word Rain - Level One';
    const levelOneText = 'Welcome to WordRain. This is level one. To win this round, you must make a valid 3-letter' +
        'word. When the rain starts to fall, click on the drops to select a letter. You can select a maximum of 7 letters.' +
        '\r\n Good luck!'


//TODO - move function below to inside class
    levelOne.setOnRainStop(() => {
        console.log('Rain has stopped. Rendering additional elements.');
        if(levelOne.letterArray.length > 0) {
            levelOne.renderLetterSpaces();
            levelOne.renderButton();
        }
        // Display message or instructions for user
        //TODO - create a separate class for handling the area / messages below
        levelOne.message.innerText = 'Drag letters to spaces to form a word, then click "Submit"';
        levelOne.message.className = 'instruction-message';
        levelOne.wordArea.appendChild(levelOne.message);
    });
    levelOne.initialize(levelOneTitle, levelOneText);


/* Level Two  /****************************************************************************************/
/* Level Three /***************************************************************************************/
/* Lightening Round  /*********************************************************************************/


