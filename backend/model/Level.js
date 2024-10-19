// Level.js

export class Level {
    constructor(levelId, wordLength) {
        if (levelId === undefined) {
            throw new Error("levelId is required");
        }
        this.levelId = levelId;           
        this.letterArray = []; 
        this.wordLength = wordLength;           
    }

    getLetterArray() {
        return this.letterArray;          
    }

    addLetter(letter) {
        this.letterArray.push(letter);    
    }

    clearLetters() {
        this.letterArray = [];             
    }

    isValidWordLength(word) {
        const length = word.length;
        return length === this.wordLength; // Check if the word length is valid
    }
}
