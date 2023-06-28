import { getRandomImage } from '../api/imagesApi.js';

const start = (ctx) => {
  const username = ctx.message.from.first_name || ctx.message.from.username;
  ctx.reply(`Welcome, ${username}`);
};

const help = (ctx) => ctx.reply('Weather');
const weather = (ctx) => ctx.reply('Weather');
const dog = async (ctx) => {
  const imageInfo = await getRandomImage('dog');
  ctx.replyWithPhoto(
    { url: imageInfo.urls.raw },
    { caption: imageInfo.alt_description },
  );
};
const cat = async (ctx) => {
  const imageInfo = await getRandomImage('cat');
  ctx.replyWithPhoto(
    { url: imageInfo.urls.raw },
    { caption: imageInfo.alt_description },
  );
};

export { start, help, weather, dog, cat };
