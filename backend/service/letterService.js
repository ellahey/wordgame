// letterService.js (Service)
import { Letter } from '../model/Letter.js';

export class LetterService {
    generateLetter() {
        const VOWELS = ['A', 'E', 'I', 'O', 'U'];
        const CONSONANTS = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
        const weightedAlphabet = [
            ...VOWELS, ...VOWELS,          
            ...CONSONANTS, ...CONSONANTS, ...CONSONANTS 
        ];

        const randomIndex = Math.floor(Math.random() * weightedAlphabet.length);
        const randomCharacter = weightedAlphabet[randomIndex];
        return new Letter(randomCharacter);
    }


}
