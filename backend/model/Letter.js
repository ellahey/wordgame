// Letter.js (Model)
export class Letter {
    constructor(character) {
        if (!character) {
            throw new Error("Character is required to create a letter");
        }
        this.character = character;
    }

    getLetter() {
        return this.character;
    }
}