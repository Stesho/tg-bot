import startBot from './bot/bot.js';
import connectDb from './db/dbConnection/connectDb.js';
import { DB_CONNECTION_URI } from './constants/environment.js/environment.js';
import { devLogger } from './utils/logger/devLogger.js';

(async () => {
  try {
    await connectDb(DB_CONNECTION_URI);
    await startBot();
  } catch (error) {
    devLogger.error('Server start error');
    devLogger.error(error.message);
  }
})();
