import { Scenes } from 'telegraf';
import { RECOMMEND_PLACES_SCENE } from '../../constants/scenes/index.js';
import { getPlacesByCoords, getCityInfo } from '../../api/index.js';
import { getPlacesReplyText } from '../../utils/index.js';
import {
  errorsMessages,
  repliesMessages,
} from '../../constants/messages/index.js';

const askCity = async (ctx) => {
  await ctx.reply(repliesMessages.askCity);
  return ctx.wizard.next();
};

const recommendPlaces = async (ctx) => {
  if (!ctx.message?.text) {
    return ctx.reply(repliesMessages.invalidMessage);
  }

  const city = ctx.message.text;
  const cityInfo = await getCityInfo(city);

  if (cityInfo.data.length === 0) {
    return ctx.reply(errorsMessages.cityNotFoundError);
  }

  const places = await getPlacesByCoords(
    cityInfo.data[0].longitude,
    cityInfo.data[0].latitude,
  );

  if (places.isError) {
    return ctx.reply(places.data);
  }

  if (places.data.length === 0) {
    return ctx.reply(errorsMessages.cityNotFoundError);
  }

  const replyText = getPlacesReplyText(places.data);
  await ctx.replyWithHTML(replyText);

  return ctx.scene.leave();
};

const recommendPlacesScene = new Scenes.WizardScene(
  RECOMMEND_PLACES_SCENE,
  askCity,
  recommendPlaces,
);

export { recommendPlacesScene };
