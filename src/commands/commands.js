const start = (ctx) => {
  const username = ctx.message.from.first_name || ctx.message.from.username;
  ctx.reply(`Welcome, ${username}`);
};

const help = (ctx) => ctx.reply('Weather');
const weather = (ctx) => ctx.reply('Weather');
const dog = (ctx) => ctx.reply('Dog image');
const cat = (ctx) => ctx.reply('Cat image');

export { start, help, weather, dog, cat };
