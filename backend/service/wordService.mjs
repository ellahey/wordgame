import * as fs from "fs";
import * as readline from 'readline';
import config from '../config/config.js';

async function checkWord(word) {
    console.log(`checkWord is called with word: ${word}`);
    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(config.databaseFilePath);

        fileStream.on('error', (err) => {
            console.error(`File read error: ${err.message}`);
            reject(err);
        });

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let found = false;

        rl.on('line', (line) => {
            if (line.includes(word)) {
                found = true;
                rl.close();  // Close the stream early since we found the word
            }
        });

        rl.on('close', () => {
            resolve(found);
        });

        rl.on('error', (err) => {
            console.error(`Readline error: ${err.message}`);
            reject(err);
        });
    });
}

export { checkWord }
