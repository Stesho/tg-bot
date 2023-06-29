import { getRandomImage } from '../api/imagesApi.js';

const getRandomImageByQuery = async (ctx, query) => {
  const loadingMessage = await ctx.reply('loading...');
  const resources = await getRandomImage(query);
  const imageInfo = resources.photos[0];
  await ctx.replyWithPhoto({
    url: imageInfo.src.medium || imageInfo.src.large,
  });
  ctx.deleteMessage(loadingMessage.message_id, loadingMessage.chat.id);
};

export { getRandomImageByQuery };