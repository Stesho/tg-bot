import { Scenes } from 'telegraf';
import { RECOMMEND_EVENTS_SCENE } from '../../constants/scenes/recommendScenesConst.js';
import getEventsByCity from '../../api/eventsApi.js';
import messages from '../../constants/messages/messages.js';
import getEventsReplyText from '../../utils/getEventsReplyText.js';

const recommendEventsScene = new Scenes.WizardScene(
  RECOMMEND_EVENTS_SCENE,
  async (ctx) => {
    await ctx.reply(messages.askCity);
    return ctx.wizard.next();
  },
  async (ctx) => {
    const city = ctx.message.text;
    const events = await getEventsByCity(city);
    const replyText = getEventsReplyText(events);

    await ctx.replyWithHTML(replyText);

    return ctx.scene.leave();
  },
);

export default recommendEventsScene;
