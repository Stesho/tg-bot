import startBot from './bot/bot.js';
import connectDb from './db/dbConnection/connectDb.js';
import { DB_CONNECTION_URI } from './constants/environment.js/environment.js';
import { devLogger } from './utils/logger/devLogger.js';
import { errorsMessages } from './constants/messages/index.js';

(async () => {
  try {
    await connectDb(DB_CONNECTION_URI);
    await startBot();
  } catch (error) {
    devLogger.error(errorsMessages.serverStartError);
    devLogger.error(error.message);
  }
})();
