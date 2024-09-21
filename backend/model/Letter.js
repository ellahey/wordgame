class Letter {

    constructor() {
        this.character = Letter.generateLetter()
        this.id = Letter.incrementId()
    }

    static generateLetter() {
        const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomIndex = Math.floor(Math.random() * ALPHABET.length);
        let character = ALPHABET[randomIndex];
        return character;
    }

    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }

    getCharacter() {
        return this.character;
    }

}