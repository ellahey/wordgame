//server.js
import express from 'express';
import {logger} from './logger.mjs';
const app = express();
const port = 3000;


app.use(express.json());
app.use(express.static('public'));
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
});


app.post('/api/dictionary', (req, res) => {
const word = req.body;
//call method here for checking dictionary
});

app.post('/api/log', (req, res) => {
    const { level, message } = req.body;
    logger.log({ level, message });
    res.status(200).send('Log received');
});

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});