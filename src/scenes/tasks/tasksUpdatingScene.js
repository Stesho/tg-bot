import { Markup, Scenes } from 'telegraf';
import { TASK_UPDATING_SCENE } from '../../constants/scenes/tasksScenesConst.js';
import editTask from '../../db/task/updateTask.js';

const tasksUpdatingScene = new Scenes.BaseScene(TASK_UPDATING_SCENE);

tasksUpdatingScene.enter(async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
      [Markup.button.callback('Edit Title', `edit-title`)],
      [Markup.button.callback('Edit Content', `edit-content`)],
      [Markup.button.callback('Back', `back`)],
    ],
  });
});

tasksUpdatingScene.action('edit-title', async (ctx) => {
  ctx.scene.state.fieldForUpdating = 'title';
  ctx.reply('Enter new Title');
});

tasksUpdatingScene.action('edit-content', async (ctx) => {
  ctx.scene.state.fieldForUpdating = 'content';
  ctx.reply('Enter new Content');
});

tasksUpdatingScene.action('back', async (ctx) => {
  return ctx.scene.enter('selectTaskOptionMenu', ctx.scene.state);
});
tasksUpdatingScene.hears(/./, async (ctx) => {
  const { taskId, fieldForUpdating } = ctx.scene.state;

  if (!fieldForUpdating) {
    ctx.reply('Select the field you want to change');
    return;
  }

  if (!ctx.update?.message?.text?.length) {
    ctx.reply('Empty message. Try again');
    return;
  }

  try {
    await editTask(taskId, {
      [fieldForUpdating]: ctx.message.text,
    });
    ctx.reply('Task was successfully updated');
    ctx.scene.state.fieldForUpdating = null;
  } catch (error) {
    ctx.reply('Server error. Try later');
  }
});

export default tasksUpdatingScene;
