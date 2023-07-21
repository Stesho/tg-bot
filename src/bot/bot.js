import { Telegraf, Scenes, session } from 'telegraf';
import rateLimit from 'telegraf-ratelimit';
import process from 'node:process';
import commands from '../constants/commands/commands.js';
import { BOT_TOKEN } from '../constants/environment.js/environment.js';
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

const limitConfig = {
  window: 2000,
  limit: 1,
  onLimitExceeded: (ctx) => ctx.reply('Rate limit exceeded'),
};

const startBot = async () => {
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

  stage.use(unknownCommand);
  stage.use(cancelScene);

  bot.use(session());
  bot.use(stage.middleware());
  bot.use(rateLimit(limitConfig));

  setBotCommandHandlers(bot, commands);
  setTasksNotification(bot);
  setWeatherNotification(bot);

  await bot.telegram.setMyCommands(commandsToArray(commands));

  await bot.launch();

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

export default startBot;
