import { getCityInfo, getEventsByCountry } from '@api/index.js';
import { errorsMessages, repliesMessages } from '@constants/messages/index.js';
import { RECOMMEND_EVENTS_SCENE } from '@constants/scenes/index.js';
import { getEventsReplyText } from '@utils/formatters/index.js';
import { Scenes } from 'telegraf';

const askCity = async (ctx) => {
  await ctx.reply(repliesMessages.askCity);
  return ctx.wizard.next();
};

const recommendEvents = async (ctx) => {
  if (!ctx.message?.text) {
    return ctx.reply(repliesMessages.invalidMessage);
  }

  const city = ctx.message.text;
  const cityInfo = await getCityInfo(city);

  if (cityInfo.isError) {
    return ctx.reply(errorsMessages.cityNotFoundError);
  }

  const events = await getEventsByCountry(cityInfo.data.country);

  if (events.isError) {
    return ctx.reply(events.data);
  }

  if (events.data.length === 0) {
    return ctx.reply(errorsMessages.cityNotFoundError);
  }

  const replyText = getEventsReplyText(events.data);
  await ctx.replyWithHTML(replyText);

  return ctx.scene.leave();
};

const recommendEventsScene = new Scenes.WizardScene(
  RECOMMEND_EVENTS_SCENE,
  askCity,
  recommendEvents,
);

export { recommendEventsScene };
