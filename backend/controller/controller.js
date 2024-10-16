// controller/controller.js

import wordService from '../service/wordService.mjs';   
import letterService from '../service/letterService.mjs';  

// Handles GET request for generating a letter
const handleGetLetter = (_, res) => {
  letterService.getLetter()
    .then(generated => {
      if (generated) {
        res.json({ code: 0, message: `The letter "${generated}" was generated.` });
      } else {
        res.json({ code: 1, message: `ERROR. A letter could not be generated.` });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error generating letter' });
    });
};

// Handles POST request for checking word in the dictionary
const handleGetDictionary = (req, res) => {
  const word = req.body.word; 

  wordService.checkWord(word)
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
};

// Exports to routes.js
export {
  handleGetLetter,
  handleGetDictionary,
};
