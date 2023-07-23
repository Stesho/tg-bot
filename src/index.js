import startBot from './bot/bot.js';
import { DB_CONNECTION_URI } from './constants/environment.js/environment.js';
import { errorsMessages } from './constants/messages/index.js';
import connectDb from './db/dbConnection/connectDb.js';
import { devLogger } from './utils/logger/devLogger.js';

(async () => {
  try {
    await connectDb(DB_CONNECTION_URI);
    await startBot();
  } catch (error) {
    devLogger.error(errorsMessages.serverStartError);
    devLogger.error(error.message);
  }
})();
