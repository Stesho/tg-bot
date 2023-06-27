import { Telegraf } from 'telegraf';
import process from 'node:process';
import { dog, cat, start, weather, help } from '../commands/commands.js';

const startBot = () => {
  const bot = new Telegraf(process.env.BOT_TOKEN);

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
