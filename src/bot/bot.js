import { Telegraf } from 'telegraf';
import process from 'node:process';

const startBot = () => {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  bot.start((ctx) => ctx.reply('Welcome'));
  bot.help((ctx) => ctx.reply('Description'));
  bot.command('weather', (ctx) => ctx.reply('Weather'));
  bot.command('cat', (ctx) => ctx.reply('Cat image'));
  bot.command('dog', (ctx) => ctx.reply('Dog image'));

  bot.launch();

  process.once('SIGINT', () => bot.stop('SIGINT'));
  process.once('SIGTERM', () => bot.stop('SIGTERM'));
};

export default startBot;
