//letterService.js
import { Letter } from '../model/Letter.js';

const letterInstance = new Letter();

function getLetter() {
    return letterInstance;
}

