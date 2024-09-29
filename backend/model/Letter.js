export class Letter {
    //Letter = rain!

    constructor() {
        this.character = this.generateLetter()
    }

    startRain() {
        intervalId = setInterval(() => {
            this.character = this.getCharacter();
        }, 100);

        setTimeout(() => {
            this.stopRain();
            isRainStopped = true;
        }, timeout);
    }

    generateLetter() {
        const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomIndex = Math.floor(Math.random() * ALPHABET.length);
        this.character = ALPHABET[randomIndex];
        return this.character;
    }

    stopRain() {
        clearInterval(intervalId);
    }

    getCharacter() {
        return this.character;
    }

}