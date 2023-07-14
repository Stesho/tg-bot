import { Scenes } from 'telegraf';
import {
  SUBSCRIBE_WEATHER_SCENE,
  UNSUBSCRIBE_WEATHER_SCENE,
} from '../../constants/scenes/weatherScenesConst.js';
import schedule from 'node-schedule';
import { getWeatherInCity } from '../../api/weatherApi.js';
import validateTime from '../../utils/validateTime.js';
import parseTime from '../../utils/parseTime.js';
import messages from '../../constants/messages/messages.js';
import getWeatherReplyText from '../../utils/getWeatherReplyText.js';

const askCity = (ctx) => {
  ctx.wizard.state.weather = {
    city: '',
    time: '',
  };
  ctx.reply(messages.askCity);
  ctx.wizard.next();
};

const askTime = async (ctx) => {
  try {
    await getWeatherInCity(ctx.message.text);
    ctx.wizard.state.weather.city = ctx.message.text;
    ctx.reply(messages.askTime);
    ctx.wizard.next();
  } catch (error) {
    ctx.reply(messages.cityNotFound);
  }
};

const subscribe = async (ctx) => {
  try {
    const city = ctx.wizard.state.weather.city;
    const time = ctx.message.text;

    if (!validateTime(time)) {
      throw new Error(messages.invalidTime);
    }

    const [hours, minutes] = parseTime(time);
    schedule.scheduleJob(
      UNSUBSCRIBE_WEATHER_SCENE,
      `${minutes} ${hours} * * *`,
      async () => {
        const weatherInfo = await getWeatherInCity(city);
        const weatherReplyText = getWeatherReplyText(weatherInfo);
        ctx.replyWithHTML(weatherReplyText);
      },
    );

    ctx.reply(messages.userSubscribedSuccessfully);
    return ctx.scene.leave();
  } catch (error) {
    ctx.reply(messages.invalidTime);
    return;
  }
};

const weatherSubscriptionScene = new Scenes.WizardScene(
  SUBSCRIBE_WEATHER_SCENE,
  askCity,
  askTime,
  subscribe,
);

export default weatherSubscriptionScene;
