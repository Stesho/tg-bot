import { Scenes } from 'telegraf';
import { RECOMMEND_EVENTS_SCENE } from '../../constants/scenes/recommendScenesConst.js';
import getEventsByCountry from '../../api/events/getEventsByCountry.js';
import getEventsReplyText from '../../utils/getEventsReplyText.js';
import getCityInfo from '../../api/places/getCityInfo.js';
import errorsMessages from '../../constants/messages/errorsMessages.js';
import repliesMessages from '../../constants/messages/repliesMessages.js';

const recommendEventsScene = new Scenes.WizardScene(
  RECOMMEND_EVENTS_SCENE,
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

    const events = await getEventsByCountry(cityInfo.data[0].country);

    if (events.isError) {
      return ctx.reply(events.data);
    }

    if (events.data.length === 0) {
      return ctx.reply(errorsMessages.cityNotFoundError);
    }

    const replyText = getEventsReplyText(events.data);
    await ctx.replyWithHTML(replyText);

    return ctx.scene.leave();
  },
);

export default recommendEventsScene;
