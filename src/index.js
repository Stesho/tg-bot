import startBot from './bot/bot.js';
import connectDb from './db/dbConnection/connectDb.js';
import { DB_CONNECTION_URI } from './constants/environment.js/environment.js';

(async () => {
  try {
    await connectDb(DB_CONNECTION_URI);
    await startBot();
  } catch (error) {
    console.log('Server start error');
    console.log(error.message);
  }
})();
