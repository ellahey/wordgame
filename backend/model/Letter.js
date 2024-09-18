class Letter {

    constructor() {
        this.name = Letter.generateLetter()
        this.id = Letter.incrementId()
    }

    static generateLetter() {
        const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const randomIndex = Math.floor(Math.random() * ALPHABET.length);
        name = ALPHABET[randomIndex];
        return name;
    }

    static incrementId() {
        if (!this.latestId) this.latestId = 1
        else this.latestId++
        return this.latestId
    }

}