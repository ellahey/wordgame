import express, { json } from 'express';
import { register } from './routes/routes.js';  
import { config } from './config/config.js';  

const app = express();

const run = () => {
  app.use(json());
  //app.use(logger); 
  app.use(express.static('public'));
  
  register(app); 

  const port = config.port;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

export default { run };
