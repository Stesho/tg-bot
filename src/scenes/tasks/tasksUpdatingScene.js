import { Markup, Scenes } from 'telegraf';
import {
  TASK_CONTENT_UPDATING_SCENE,
  TASK_OPTIONS_SCENE,
  TASK_TITLE_UPDATING_SCENE,
  TASK_UPDATING_SCENE,
} from '../../constants/scenes/tasksScenesConst.js';
import updateTask from '../../db/task/updateTask.js';
import messages from '../../constants/messages/messages.js';

const tasksUpdatingScene = new Scenes.BaseScene(TASK_UPDATING_SCENE);

tasksUpdatingScene.enter(async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
      [
        Markup.button.callback(
          messages.taskEditTitle,
          TASK_TITLE_UPDATING_SCENE,
        ),
      ],
      [
        Markup.button.callback(
          messages.taskEditContent,
          TASK_CONTENT_UPDATING_SCENE,
        ),
      ],
      [Markup.button.callback(messages.backButton, `back`)],
    ],
  });
});

tasksUpdatingScene.action(TASK_TITLE_UPDATING_SCENE, async (ctx) => {
  ctx.scene.state.fieldForUpdating = 'title';
  ctx.reply(messages.askTitle);
});

tasksUpdatingScene.action(TASK_CONTENT_UPDATING_SCENE, async (ctx) => {
  ctx.scene.state.fieldForUpdating = 'content';
  ctx.reply(messages.askContent);
});

tasksUpdatingScene.action('back', async (ctx) => {
  return ctx.scene.enter(TASK_OPTIONS_SCENE, ctx.scene.state);
});

tasksUpdatingScene.hears(/./, async (ctx) => {
  const { taskId, fieldForUpdating } = ctx.scene.state;

  if (!fieldForUpdating) {
    return ctx.reply(messages.askFieldForUpdate);
  }

  if (!ctx.update?.message?.text?.length) {
    return ctx.reply(messages.emptyMessage);
  }

  const updatedTask = await updateTask(taskId, {
    [fieldForUpdating]: ctx.message.text,
  });

  if (updatedTask.isError) {
    return ctx.reply(updatedTask.data);
  }

  ctx.reply(messages.taskUpdatedSuccessfully);
  ctx.scene.state.fieldForUpdating = null;
});

export default tasksUpdatingScene;
