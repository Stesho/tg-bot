import { Scenes } from 'telegraf';
import { RECOMMEND_PLACES_SCENE } from '../../constants/scenes/recommendScenesConst.js';
import getPlacesByCity from '../../api/places/getPlacesByCity.js';
import messages from '../../constants/messages/messages.js';
import getPlacesReplyText from '../../utils/getPlacesReplyText.js';

const recommendPlacesScene = new Scenes.WizardScene(
  RECOMMEND_PLACES_SCENE,
  async (ctx) => {
    await ctx.reply(messages.askCity);
    return ctx.wizard.next();
  },
  async (ctx) => {
    const city = ctx.message.text;
    const places = await getPlacesByCity(city);
    const replyText = getPlacesReplyText(places);

    await ctx.replyWithHTML(replyText);

    return ctx.scene.leave();
  },
);

export default recommendPlacesScene;
