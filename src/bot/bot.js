import { Telegraf, Scenes, session } from 'telegraf';
import process from 'node:process';
import { dog, cat, start, weather, help } from '../commands/commands.js';
import { BOT_TOKEN } from '../constants/environment.js';
import weatherScene from '../scenes/weather/weatherScene.js';
import weatherSubscriptionScene from '../scenes/weather/weatherSubscriptionScene.js';
import weatherReceptionScene from '../scenes/weather/weatherReceptionScene.js';

const startBot = () => {
  const bot = new Telegraf(BOT_TOKEN);
  const stage = new Scenes.Stage([
    weatherScene,
    weatherSubscriptionScene,
    weatherReceptionScene,
  ]);

  bot.use(session());
  bot.use(stage.middleware());

  bot.start(start);
  bot.help(help);
  bot.command('weather', weather);
  bot.command('cat', cat);
  bot.command('dog', dog);

  bot.launch();

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

export default startBot;
