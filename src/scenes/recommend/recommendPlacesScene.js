import { Scenes } from 'telegraf';
import { RECOMMEND_PLACES_SCENE } from '../../constants/scenes/recommendScenesConst.js';
import getPlacesByCoords from '../../api/places/getPlacesByCoords.js';
import getPlacesReplyText from '../../utils/getPlacesReplyText.js';
import getCityInfo from '../../api/places/getCityInfo.js';
import errorsMessages from '../../constants/messages/errorsMessages.js';
import repliesMessages from '../../constants/messages/repliesMessages.js';

const recommendPlacesScene = new Scenes.WizardScene(
  RECOMMEND_PLACES_SCENE,
  async (ctx) => {
    await ctx.reply(repliesMessages.askCity);
    return ctx.wizard.next();
  },
  async (ctx) => {
    if (!ctx.message?.text) {
      return ctx.reply(repliesMessages.invalidMessage);
    }

    const city = ctx.message.text;
    const cityInfo = await getCityInfo(city);

    if (cityInfo.data.length === 0) {
      return ctx.reply(errorsMessages.cityNotFoundError);
    }

    const places = await getPlacesByCoords(
      cityInfo.data[0].lon,
      cityInfo.data[0].lat,
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
  },
);

export default recommendPlacesScene;
