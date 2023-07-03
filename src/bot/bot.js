import { Telegraf, Scenes, session } from 'telegraf';
import process from 'node:process';
import { dog, cat, start, weather, help, tasks } from '../commands/commands.js';
import { BOT_TOKEN, DB_CONNECTION_URI } from '../constants/environment.js';
import weatherScene from '../scenes/weather/weatherScene.js';
import weatherSubscriptionScene from '../scenes/weather/weatherSubscriptionScene.js';
import weatherReceptionScene from '../scenes/weather/weatherReceptionScene.js';
import tasksScene from '../scenes/tasks/tasksScene.js';
import connectToDb from '../config/dbConnection.js';
import tasksCreationScene from '../scenes/tasks/tasksCreationScene.js';

const startBot = () => {
  const bot = new Telegraf(BOT_TOKEN);
  const stage = new Scenes.Stage([
    weatherScene,
    weatherSubscriptionScene,
    weatherReceptionScene,
    tasksScene,
    tasksCreationScene,
  ]);

  connectToDb(DB_CONNECTION_URI);

  bot.use(session());
  bot.use(stage.middleware());

  bot.start(start);
  bot.help(help);
  bot.command('weather', weather);
  bot.command('cat', cat);
  bot.command('dog', dog);
  bot.command('tasks', tasks);

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
  ]);

  bot.launch();

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

export default startBot;
