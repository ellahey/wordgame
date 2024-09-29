//Letter = rain!
export class Letter {

    intervalId;
    constructor() {
        this.character = null;
    }

    startRain(timeBetweenLetters, timeout) {
        this.intervalId = setInterval(() => {
            this.character = this.generateLetter();
            console.log(this.character) //testing
        }, timeBetweenLetters);

        setTimeout(() => {
            this.stopRain();
            this.isRainStopped = true;
            console.log("Rain stopped.");
        }, timeout);
    }

    generateLetter() {
        const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomIndex = Math.floor(Math.random() * ALPHABET.length);
        this.character = ALPHABET[randomIndex];
        return this.character;
    }

    stopRain() {
        clearInterval(this.intervalId);
    }

    getCharacter() {
        return this.character;
    }

}