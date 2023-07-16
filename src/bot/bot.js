import { Telegraf, Scenes, session } from 'telegraf';
import process from 'node:process';
import commands from '../constants/commands/commands.js';
import {
  BOT_TOKEN,
  DB_CONNECTION_URI,
} from '../constants/environment.js/environment.js';
import weatherScene from '../scenes/weather/weatherScene.js';
import weatherSubscriptionScene from '../scenes/weather/weatherSubscriptionScene.js';
import weatherReceptionScene from '../scenes/weather/weatherReceptionScene.js';
import tasksScene from '../scenes/tasks/tasksScene.js';
import connectDb from '../db/dbConnection/connectDb.js';
import tasksCreationScene from '../scenes/tasks/tasksCreationScene.js';
import tasksGettingScene from '../scenes/tasks/tasksGettingScene.js';
import tasksUpdatingScene from '../scenes/tasks/tasksUpdatingScene.js';
import tasksNotificationScene from '../scenes/tasks/tasksNotificationScene.js';
import tasksOptionsScene from '../scenes/tasks/tasksOptionsScene.js';
import recommendScene from '../scenes/recommend/recommendScene.js';
import recommendEventsScene from '../scenes/recommend/recommendEventsScene.js';
import recommendPlacesScene from '../scenes/recommend/recommendPlacesScene.js';
import cancelScene from '../middlewares/cancelScene.js';
import setBotCommandHandlers from '../utils/setBotCommands.js';
import unknownCommand from '../middlewares/unknownCommand.js';
import commandsToArray from '../utils/commandsToArray.js';

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
  // bot.catch((err, ctx) => {
  //   console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
  // })

  setBotCommandHandlers(bot, commands);

  bot.telegram.setMyCommands(commandsToArray(commands));

  bot.launch();

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

export default startBot;
