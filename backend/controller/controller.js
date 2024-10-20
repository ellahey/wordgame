// controller/controller.js

import { WordService } from '../service/wordService.js';   
import { LetterService } from '../service/letterService.js'
import Logger from 'nodemon/lib/utils/log.js';
import { logger } from '../../logger.js';


/******* Letter controller **********************************************************************************/
 
// Handles GET request for generating a letter
const handleGetLetter = (_, res) => {
  const letterServiceInstance = new LetterService();
  try {
    // Generate a letter
    const generated = letterServiceInstance.generateLetter()

      if (generated) {
        res.json({ code: 0, message: `The letter + ${generated.character} + was generated.`});
      } else {
        res.json({ code: 1, message: `ERROR. A letter could not be generated.` });
      }
    }
 catch (error) {
      res.status(500).json({ error: `Error generating letter: ${error.message}` });
    }
  };

/******* Word controller **********************************************************************************/

// Handles POST request for checking word in the dictionary
const handleCheckWord = (req, res) => {
  console.log('Received request to check word:');
  console.log('Request Body:', req.body);
  const word = req.body.word
  const wordServiceInstance = new WordService();
  if (!word) {
    return res.status(400).json({ error: 'Word is required.' });
  } 
      wordServiceInstance.checkWord(word)
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
  handleCheckWord,
};
