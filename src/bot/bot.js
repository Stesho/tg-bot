import { Telegraf, Scenes, session } from 'telegraf';
import process from 'node:process';
import {
  dog,
  cat,
  start,
  weather,
  help,
  tasks,
  recommend,
} from '../commands/commands.js';
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

  bot.use(session());
  bot.use(stage.middleware());

  bot.start(start);
  bot.help(help);
  bot.command('weather', weather);
  bot.command('cat', cat);
  bot.command('dog', dog);
  bot.command('tasks', tasks);
  bot.command('recommend', recommend);

  bot.telegram.setMyCommands([
    { command: '/start', description: 'Greetings' },
    { command: '/help', description: 'Bot features description' },
    {
      command: '/weather',
      description: 'Current weather in the specified city',
    },
    { command: '/cat', description: 'Image of a random cat' },
    { command: '/dog', description: 'Image of a random dog' },
    { command: '/tasks', description: 'Managing my tasks' },
    {
      command: '/recommend',
      description: 'Recommend places, events, attractions',
    },
  ]);

  bot.launch();

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

export default startBot;
