import { getRandomImageByQuery } from '../services/imagesService.js';
import { getWeatherInCity } from '../api/weatherApi.js';

const start = (ctx) => {
  const username = ctx.message.from.first_name || ctx.message.from.username;
  ctx.reply(`Welcome, ${username}`);
};

const help = (ctx) => ctx.reply('Weather');
const weather = async (ctx) => {
  const weatherInfo = await getWeatherInCity('Minsk');
  ctx.reply(
    `Weather in ${weatherInfo.name}:
    main: ${weatherInfo.weather[0].main}
    description: ${weatherInfo.weather[0].description}
    temp: ${weatherInfo.main.temp}`,
  );
};
const dog = (ctx) => getRandomImageByQuery(ctx, 'dog');
const cat = (ctx) => getRandomImageByQuery(ctx, 'cat');

export { start, help, weather, dog, cat };
