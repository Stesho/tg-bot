import { getRandomImage } from '../api/imagesApi.js';

const getRandomImageByQuery = async (ctx, query) => {
  const loadingMessage = await ctx.reply('loading...');
  const imageInfo = await getRandomImage(query);
  await ctx.replyWithPhoto(
    { url: imageInfo.urls.raw },
    { caption: imageInfo.alt_description },
  );
  ctx.deleteMessage(loadingMessage.message_id, loadingMessage.chat.id);
};

export { getRandomImageByQuery };
