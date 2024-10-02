
export class Letter {

    constructor() {
        this.character = this.generateLetter()
    }

    generateLetter() {
        const VOWELS = ['A', 'E', 'I', 'O', 'U'];
        const CONSONANTS = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
        // Create weighted array to reflect 2:3 vowel-to-consonant ratio
        const weightedAlphabet = [
            ...VOWELS, ...VOWELS,           // Vowels appear 2 times
            ...CONSONANTS, ...CONSONANTS, ...CONSONANTS // Consonants appear 3 times
        ];
        // Generate a random letter from the weighted array
        const randomIndex = Math.floor(Math.random() * weightedAlphabet.length);
        this.character = weightedAlphabet[randomIndex];
        return this.character;
    }

    getCharacter() {
        return this.character;
    }
/*
    getClickedLetter(clickedLetter) {
            this.letterArray.push(clickedLetter);
    }*/

}