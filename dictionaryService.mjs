
import * as fs from "fs";
import * as readline from 'readline';

async function checkWord(FILE_PATH, word) {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(FILE_PATH);

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
            reject(err);
        });
    });
}

export { checkWord }