import getRandomImage from '../api/images/getRandomImage.js';
import textMessages from '../constants/messages/textMessages.js';

const getRandomImageByQuery = async (ctx, query) => {
  const loadingMessage = await ctx.reply(textMessages.loading);
  const resources = await getRandomImage(query);

  if (resources.isError) {
    return ctx.reply(resources.data);
  }

  const imageInfo = resources.data.photos[0];
  await ctx.replyWithPhoto({
    url: imageInfo.src.medium || imageInfo.src.large,
  });
  ctx.deleteMessage(loadingMessage.message_id, loadingMessage.chat.id);
};

export { getRandomImageByQuery };
