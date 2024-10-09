let dragging = false;
let selectedLetterContainer = document.querySelector('#clickedLetters');


/*function startRain()  {
    getLetter();
    renderletter(letter)
}*/

function getLetter() {

    fetch('/api/letter', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    }).then(data => {
        renderResult(data.code);
        console.log(data);
    }).catch(error => {
        console.error('Error:', error);
    });
}

}

function renderletter(letter) {
    const rainContainer = document.querySelector('#rainArea')
    const raindrop = document.createElement('div');
    let raindrops = [];
    let isRainStopped = false;
    let onRainStop = null;
    raindrop.classname = 'raindrop';
    raindrop.innertext = letter;
    rainContainer.appendChild(raindrop);
    raindrops.push(raindrop);

    raindrop.addEventListener('click', () => renderClickedLetter(letter));

    raindrop.addEventListener('animationend', () => {
        raindrop.remove();
        raindrops = raindrops.filter(drop => drop !== raindrop);

        if (raindrops.length === 0 && isRainStopped && onRainStop) {
            onRainStop();
        }
    });
}

function renderClickedLetter(letter) {
    let selectedLetterElement = document.createElement('div');
    selectedLetterElement.id = 'selected';
    selectedLetterContainer.appendChild(selectedLetterElement);
    //this.letterArray.push(letter);
    const span = document.createElement('span');
    span.innerText = letter;
    span.draggable = true;
    span.addEventListener('dragstart', handleDragStart);
    span.id = `letter-${letter}-${Date.now()}`;
    selectedLetterElement.appendChild(span);
}

handleDragStart = (event) => {
    if (dragging) {
        event.preventDefault(); // Prevent dragging if another letter is already being dragged
        return;
    }
    dragging = true; // Set dragging flag
    const target = event.target;
    event.dataTransfer.setData('text/plain', target.innerText);
    event.dataTransfer.setData('source-id', target.id);
}

handleDrop = (event) => {
    event.preventDefault();
    dragging = false; // Reset dragging flag

    const letter = event.dataTransfer.getData('text/plain');
    const sourceId = event.dataTransfer.getData('source-id');
    const draggedElement = document.querySelector(sourceId);

    if (event.currentTarget.className === 'letter-space') {
        // Handle dropping onto a letter space
        const targetSpace = event.currentTarget;
        const targetSourceId = targetSpace.getAttribute('data-source-id');

        if (targetSpace.innerText !== '_') {
            // Swap letters if the target space is occupied
            const oldElement = document.querySelector(targetSourceId);
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
    } else if (event.currentTarget === selectedLetterContainer) {
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
