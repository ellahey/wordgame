// routes/routes.js
import { handleGetLetter, handleCheckWord } from '../controller/controller.js'; 


const register = (app) => {
  app.get('/letter', handleGetLetter);
  app.post('/word', handleCheckWord);
};

export { register };


