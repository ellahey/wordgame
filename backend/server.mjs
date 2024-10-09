//server.mjs
import express from 'express';
import { logger } from '../logger.mjs';
import { checkWord } from "./controller/wordController.mjs";

const FILE_PATH = './database/combined_words.txt';
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.get('api/letter', (req, res) => {

})


app.post('/api/dictionary', (req, res) => {
    const word = req.body.word;
    checkWord(FILE_PATH, word)
        .then(found => {
            if (found) {
                res.json({ code: 0, message: `The word "${word}" was found in the dictionary.` });
            } else {
                res.json({ code: 1, message: `The word "${word}" was not found in the dictionary.` });
            }
        })
        .catch(err => {
            res.status(500).json({ error: `Error reading file: ${err.message}` });
        });
});

app.post('/api/log', (req, res) => {
    const { level, message } = req.body;
    logger.log({ level, message });
    res.status(200).send('Log received');
});

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});