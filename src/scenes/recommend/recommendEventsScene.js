import { Scenes } from 'telegraf';
import { RECOMMEND_EVENTS_SCENE } from '../../constants/scenes/recommendScenesConst.js';
import getEventsByCountry from '../../api/events/getEventsByCountry.js';
import messages from '../../constants/messages/messages.js';
import getEventsReplyText from '../../utils/getEventsReplyText.js';
import getCityInfo from '../../api/places/getCityInfo.js';

const recommendEventsScene = new Scenes.WizardScene(
  RECOMMEND_EVENTS_SCENE,
  async (ctx) => {
    await ctx.reply(messages.askCity);
    return ctx.wizard.next();
  },
  async (ctx) => {
    const city = ctx.message.text;
    const cityInfo = await getCityInfo(city);
    const events = await getEventsByCountry(cityInfo.data.country);

    if (events.isError) {
      return ctx.reply(events.data);
    }

    if (events.data.length === 0) {
      return ctx.reply(messages.cityNotFoundError);
    }

    const replyText = getEventsReplyText(events.data);
    await ctx.replyWithHTML(replyText);

    return ctx.scene.leave();
  },
);

export default recommendEventsScene;
