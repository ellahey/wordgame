import { Letter } from './Letter.js';  

export class Word {
    constructor(letters) {
       
        this.letters = letters.map(character => new Letter(character));
        this.length = this.letters.length;
    }

    // Return the word as a string
    getWord() {
        return this.letters.map(letter => letter.getLetter()).join(''); // Adjusted to use getLetter()
    }


    getLength() {
        return this.length;
    }
}
