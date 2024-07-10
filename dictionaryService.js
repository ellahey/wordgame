
import * as fs from "fs";
import * as readline from 'readline';
const FILE_PATH = './database/combine_words.txt';
async function checkWord(FILE_PATH, word) {
        return new Promise((resolve, reject) => {
            const fileStream = fs.createReadStream(FILE_PATH);
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });

            rl.on('line', (line) => {
                if (line.includes(word)) {
                    rl.close();  // Close the stream early since we found the word
                    resolve(true);
                }
            });

            rl.on('close', () => {
                resolve(false);
            });

            rl.on('error', (err) => {
                reject(err);
            });
        });
    }

// Usage example
//     (async () => {
//         const filePath = 'path/to/your/large/text/file.txt';
//         const word = 'searchTerm';
//
//         try {
//             const found = await searchInFile(filePath, word);
//             if (found) {
//                 console.log(`The word "${word}" was found in the file.`);
//             } else {
//                 console.log(`The word "${word}" was not found in the file.`);
//             }
//         } catch (err) {
//             console.error(`Error reading file: ${err.message}`);
//         }
//     })();
//
// }