import path from 'path';

const config = {
  // path.resolve to get the absolute path db file
  databaseFilePath: path.resolve('./backend/database/combined_words.txt'),
  port: 3000
};

export { config };