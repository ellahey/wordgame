class Word {
    constructor(letters) {
        this.letters = letters.map(letter => new Letter(letter));
        this.length = this.letters.length;
    }

    getWord() {
        return this.letters.map(letter => letter.getCharacter()).join('');
    }

    getLength(letters) {
        let count;
        letters.forEach((letter) => {
            if (letter) {
                count++;
            }
        })
        return this.length
    }

}