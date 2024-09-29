class Letter {
    //Letter = rain!

    constructor() {
        this.character = Letter.generateLetter()
    }

    static generateLetter() {
        const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomIndex = Math.floor(Math.random() * ALPHABET.length);
        this.character = ALPHABET[randomIndex];
        return this.character;
    }


    startRain() {
        intervalId = setInterval(() => {
            const letter = getRandomLetter();
            renderLetter(letter);
        }, 100);

        getRandomLetter() {
            const randomIndex = Math.floor(Math.random() * this.ALPHABET.length);
            return this.ALPHABET[randomIndex];
        }
        setTimeout(() => {
            stopRain();
            isRainStopped = true;
        }, timeout);
    }

    getCharacter() {
        return this.character;
    }

}