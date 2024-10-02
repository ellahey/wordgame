
import { Letter } from './Letter.js'
export class Level {
    intervalId;
    isRainStopped;
    letterArray;
    constructor(levelId) {
        if (levelId === undefined) {
            throw new Error("levelId is required"); //JS doesn't enforce param passing in constructors.
        }
        this.levelId = levelId;
        this.letterArray = [];
    }

    startRain(timeBetweenLetters, timeout) {
        this.intervalId = setInterval(() => {
            this.character = new Letter();
            this.letterArray.push(this.character);
            console.log(this.character) //testing
        }, timeBetweenLetters);

        setTimeout(() => {
            this.stopRain();
            this.isRainStopped = true;
            console.log("Rain stopped.");
        }, timeout);
    }

    stopRain() {
        clearInterval(this.intervalId);
    }

    getLetterArray() {
        return this.letterArray;
    }

}