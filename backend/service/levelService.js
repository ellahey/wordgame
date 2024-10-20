import { LetterService } from './letterService.js';
import { Level } from '../model/Level.js';  

export class LevelService {
    constructor(levelId, wordLength) {
        if (levelId === undefined) {
            throw new Error("levelId is required");
        }
        this.level = new Level(levelId, wordLength);  
        this.letterService = new LetterService();  
    }

    startRain(timeBetweenLetters, timeout) {
        this.level.intervalId = setInterval(() => {
            const letter = this.letterService.generateLetter();  
            this.level.letterArray.push(letter);  
            console.log(`Generated letter: ${letter.getCharacter()}`);
        }, timeBetweenLetters);

        setTimeout(() => {
            this.stopRain();
            this.level.isRainStopped = true;
            console.log("Rain stopped.");
        }, timeout);
    }

    stopRain() {
        clearInterval(this.level.intervalId);  // Stop the interval
    }

    getLetterArray() {
        return this.level.letterArray;  // Return the current letter array
    }
}
