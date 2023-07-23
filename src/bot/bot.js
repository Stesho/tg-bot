import process from 'node:process';

import { Scenes, session, Telegraf } from 'telegraf';
import rateLimit from 'telegraf-ratelimit';

import commands from '#constants/commands/commands.js';
import { BOT_TOKEN } from '#constants/environment/environment.js';
import { cancelScene, unknownCommand } from '#middlewares/index.js';
import {
  recommendEventsScene,
  recommendPlacesScene,
  recommendScene,
} from '#scenes/recommend/index.js';
import {
  tasksCreationScene,
  tasksGettingScene,
  tasksNotificationScene,
  tasksOptionsScene,
  tasksScene,
  tasksUpdatingScene,
} from '#scenes/tasks/index.js';
import {
  weatherReceptionScene,
  weatherScene,
  weatherSubscriptionScene,
} from '#scenes/weather/index.js';
import {
  commandsToArray,
  setBotCommandHandlers,
} from '#utils/commands/index.js';
import {
  setTasksNotification,
  setWeatherNotification,
} from '#utils/schedulers/index.js';

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

export { startBot };
