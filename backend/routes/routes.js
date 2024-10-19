// routes/routes.js

// Import the controller functions that handle the request logic
import { handleGetLetter, handleCheckWord } from '../controller/controller.js';  // Correct import path

// Define route registration function
const register = (app) => {
  // Route for getting a letter
  app.get('/letter', handleGetLetter);
  
  // Route for checking a word in the dictionary
  app.post('/word', handleCheckWord);
};

export { register };


