import { startBot } from '@bot/bot.js';
import { DB_CONNECTION_URI } from '@constants/environment/environment.js';
import { errorsMessages } from '@constants/messages/index.js';
import connectDb from '@db/dbConnection/connectDb.js';
import { logger } from '@utils/logger/index.js';

(async () => {
  try {
    await connectDb(DB_CONNECTION_URI);
    await startBot();
  } catch (error) {
    logger.error(errorsMessages.serverStartError);
    logger.error(error.message);
  }
})();
