import { Telegraf, Scenes, session } from 'telegraf';
import process from 'node:process';
import commands from '../constants/commands/commands.js';
import {
  BOT_TOKEN,
  DB_CONNECTION_URI,
} from '../constants/environment.js/environment.js';
import {
  weatherScene,
  weatherSubscriptionScene,
  weatherReceptionScene,
} from '../scenes/weather/index.js';
import {
  tasksScene,
  tasksCreationScene,
  tasksGettingScene,
  tasksUpdatingScene,
  tasksNotificationScene,
  tasksOptionsScene,
} from '../scenes/tasks/index.js';
import connectDb from '../db/dbConnection/connectDb.js';
import {
  recommendScene,
  recommendEventsScene,
  recommendPlacesScene,
} from '../scenes/recommend/index.js';
import { cancelScene, unknownCommand } from '../middlewares/index.js';
import {
  setBotCommandHandlers,
  commandsToArray,
  setTasksNotification,
  setWeatherNotification,
} from '../utils/index.js';

const startBot = () => {
  const bot = new Telegraf(BOT_TOKEN);

  const stage = new Scenes.Stage([
    weatherScene,
    weatherSubscriptionScene,
    weatherReceptionScene,
    tasksScene,
    tasksGettingScene,
    tasksCreationScene,
    tasksUpdatingScene,
    tasksNotificationScene,
    tasksOptionsScene,
    recommendScene,
    recommendEventsScene,
    recommendPlacesScene,
  ]);

  connectDb(DB_CONNECTION_URI);

  stage.use(unknownCommand);
  stage.use(cancelScene);

  bot.use(session());
  bot.use(stage.middleware());

  setBotCommandHandlers(bot, commands);
  setTasksNotification(bot);
  setWeatherNotification(bot);

  bot.telegram.setMyCommands(commandsToArray(commands));

  bot.launch();

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

export default startBot;
