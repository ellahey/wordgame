/*
/!*

    constructor(levelTimeout, levelWordLength) {
        // Initialization code remains the same
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
        this.raindrops = [];
        this.isRainStopped = false;
        this.onRainStop = null;
        this.wordLength = levelWordLength;
        this.rearrangeArea = null;
        this.buttonArea = null;
        this.message = document.createElement('div');
        this.message.id = 'message';
        this.instructions = document.getElementById('instructions');
        this.levelTitle = document.getElementById('levelTitle');
        this.MAX_LETTERS = 6;
        this.dragging = false; // Flag to check if a letter is being dragged
    }

    // All existing methods...

    // Modified handleDrop method to include letter swapping and dragging back to the selection area
    handleDrop = (event) => {
        event.preventDefault();
        this.dragging = false; // Reset dragging flag

        const letter = event.dataTransfer.getData('text/plain');
        const sourceId = event.dataTransfer.getData('source-id');
        const draggedElement = document.getElementById(sourceId);

        if (event.currentTarget.className === 'letter-space') {
            // Handle dropping onto a letter space
            const targetSpace = event.currentTarget;
            const targetSourceId = targetSpace.getAttribute('data-source-id');

            if (targetSpace.innerText !== '_') {
                // Swap letters if the target space is occupied
                const oldLetter = targetSpace.innerText;
                const oldElement = document.getElementById(targetSourceId);

                // Move old letter back to selection area
                if (oldElement) {
                    oldElement.style.visibility = 'visible';
                }

                // Swap letters between spaces
                targetSpace.innerText = letter;
                targetSpace.setAttribute('data-source-id', sourceId);
                draggedElement.style.visibility = 'hidden';

                // Also swap the dragged element's position back to the selection area
                draggedElement.parentNode.appendChild(draggedElement);
            } else {
                // Place the letter in the empty space
                targetSpace.innerText = letter;
                targetSpace.setAttribute('data-source-id', sourceId);
                draggedElement.style.visibility = 'hidden';
            }
        } else if (event.currentTarget === this.selectedLetterContainer) {
            // Handle dropping back to the selection area
            const spaces = document.querySelectorAll('.letter-space');
            spaces.forEach(space => {
                if (space.getAttribute('data-source-id') === sourceId) {
                    // Clear the space
                    space.innerText = '_';
                    space.removeAttribute('data-source-id');
                }
            });
            // Make the letter visible again in the selection area
            draggedElement.style.visibility = 'visible';
        }
    }


    // Add event listeners for dragging to enable dragging letters back to the selection area
    handleDragStart = (event) => {
        if (this.dragging) {
            event.preventDefault(); // Prevent dragging if another letter is already being dragged
            return;
        }
        this.dragging = true; // Set dragging flag
        const target = event.target;
        event.dataTransfer.setData('text/plain', target.innerText);
        event.dataTransfer.setData('source-id', target.id);
    }

    handleDragOver = (event) => {
        event.preventDefault();
    }
*!/
let intervalId, isRainStopped, timeout
//Start rain
//Call to getRain in Lettercontroller, renderLetter in View



    renderletterBoxes(wordLength) {
        letterBoxesArea = document.getElementById('letterBoxes');

        for (let i = 0; i < wordLength; i++) {
            const space = document.createElement('div');
            space.className = 'letter-box';
            space.setAttribute('data-index', `${i}`);
            space.innerText = '_';
           /!* space.addEventListener('dragover', this.handleDragOver);
            space.addEventListener('drop', this.handleDrop);*!/
            letterBoxesArea.appendChild(space);
        }

        this.wordArea.style.display = 'block';
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
            this.raindrops = this.raindrops.filter(drop => drop !== raindrop);

            if (this.raindrops.length === 0 && this.isRainStopped && this.onRainStop) {
                this.onRainStop();
            }
        });
    }




    renderSelectedLetter(letter) {
        this.letterArray.push(letter);
        const span = document.createElement('span');
        span.innerText = letter;
        span.draggable = true;
        span.addEventListener('dragstart', this.handleDragStart);
        span.id = `letter-${letter}-${Date.now()}`;
        this.selectedLetterElement.appendChild(span);
    }

    setOnRainStop(callback) {
        this.onRainStop = callback;
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
        }, 3000);
    }

    renderButton() {
        console.log('renderButton called');
        this.buttonArea = document.createElement('div');
        this.buttonArea.className = 'button-area';
        const button = document.createElement('button');
        button.type = 'submit';
        button.id = 'submit';
        button.innerText = 'Submit';
        this.buttonArea.appendChild(button);
        this.wordArea.appendChild(this.buttonArea);
        button.addEventListener('click', () => this.extractWord());
    }

    showReTryMessage(text) {
        this.setInstructionText(text);
        const retryButton = document.createElement('button');
        retryButton.type = 'button';
        retryButton.id = 'retry';
        retryButton.addEventListener('click', () => this.extractWord());
    }

    extractWord() {
        console.log('extractWord() is called');
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
        const lowercaseWord = word.toLowerCase();
        fetch('/api/dictionary', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ word: lowercaseWord })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            this.renderResult(data.code);
            console.log(data);
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    renderResult(code) {
        if (code === 0) {
            this.message.innerText = 'You made a word!';
        } else if (code === 1) {
            this.message.innerText = 'Word not found in dictionary.';
        }
    }
}

// Level initialization code remains the same

const levelOne = new RaindropApp(5000, 3);
const levelOneTitle = 'Word Rain - Level One';
const levelOneText = 'Welcome to WordRain. This is level one. To win this round, you must make a valid 3-letter word. When the rain starts to fall, click on the drops to select a letter. You can select a maximum of 7 letters. Good luck!';

levelOne.setOnRainStop(() => {
    console.log('Rain has stopped. Rendering additional elements.');
    if (levelOne.letterArray.length > 0) {
        levelOne.renderLetterSpaces();
        levelOne.renderButton();
    }
    levelOne.message.innerText = 'Drag letters to spaces to form a word, then click "Submit"';
    levelOne.message.className = 'instruction-message';
    levelOne.wordArea.appendChild(levelOne.message);
});
levelOne.initialize(levelOneTitle, levelOneText);
*/
