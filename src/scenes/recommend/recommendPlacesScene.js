import { Scenes } from 'telegraf';
import { RECOMMEND_PLACES_SCENE } from '../../constants/scenes/recommendScenesConst.js';
import getPlacesByCity from '../../api/placesApi.js';

const recommendPlacesScene = new Scenes.WizardScene(
  RECOMMEND_PLACES_SCENE,
  async (ctx) => {
    await ctx.reply('Enter city');
    return ctx.wizard.next();
  },
  async (ctx) => {
    const city = ctx.message.text;
    const places = await getPlacesByCity(city);
    const googleMapLink = `https://maps.google.com/?q=`;

    const replyText = places.reduce((message, place) => {
      const kind = place.kinds.split(',')[0];
      return `${message}\n${place.name}\n${kind}\nLook on the map: ${googleMapLink}${place.point.lat},${place.point.lon}\n`;
    }, '');

    await ctx.reply(replyText);

    return ctx.scene.leave();
  },
);

export default recommendPlacesScene;
