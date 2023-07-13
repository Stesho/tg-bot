import { Markup, Scenes } from 'telegraf';
import { TASK_UPDATING_SCENE } from '../../constants/scenes/tasksScenesConst.js';
import editTask from '../../db/task/updateTask.js';
import messages from '../../constants/messages/messages.js';

const tasksUpdatingScene = new Scenes.BaseScene(TASK_UPDATING_SCENE);

tasksUpdatingScene.enter(async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
      [Markup.button.callback(messages.taskEditTitle, `edit-title`)],
      [Markup.button.callback(messages.taskEditContent, `edit-content`)],
      [Markup.button.callback(messages.backButton, `back`)],
    ],
  });
});

tasksUpdatingScene.action('edit-title', async (ctx) => {
  ctx.scene.state.fieldForUpdating = 'title';
  ctx.reply(messages.askTitle);
});

tasksUpdatingScene.action('edit-content', async (ctx) => {
  ctx.scene.state.fieldForUpdating = 'content';
  ctx.reply(messages.askContent);
});

tasksUpdatingScene.action('back', async (ctx) => {
  return ctx.scene.enter('selectTaskOptionMenu', ctx.scene.state);
});

tasksUpdatingScene.hears(/./, async (ctx) => {
  const { taskId, fieldForUpdating } = ctx.scene.state;

  if (!fieldForUpdating) {
    ctx.reply(messages.askFieldForUpdate);
    return;
  }

  if (!ctx.update?.message?.text?.length) {
    ctx.reply(messages.emptyMessage);
    return;
  }

  try {
    await editTask(taskId, {
      [fieldForUpdating]: ctx.message.text,
    });
    ctx.reply(messages.taskUpdatedSuccessfully);
    ctx.scene.state.fieldForUpdating = null;
  } catch (error) {
    ctx.reply(messages.serverError);
  }
});

export default tasksUpdatingScene;
