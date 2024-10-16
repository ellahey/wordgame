//app.js 
//Application bootstrap

import express, { json } from 'express';
import { register } from './routes/routes';  
import { port as _port } from './config/config';  
import logger from '../logger.mjs';  

const app = express();

const run = () => {
  // Set up middleware
  app.use(json());
  app.use(logger);  

  // Register routes
  register(app);

  // Start the server
  const port = _port || 3000;  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

export default {
  run,
};
