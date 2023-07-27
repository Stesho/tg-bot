import { buttonsMessages, repliesMessages } from '@constants/messages/index.js';
import {
  TASK_CONTENT_UPDATING_SCENE,
  TASK_OPTIONS_SCENE,
  TASK_TITLE_UPDATING_SCENE,
  TASK_UPDATING_SCENE,
} from '@constants/scenes/index.js';
import { updateTask } from '@db/task/index.js';
import { Markup, Scenes } from 'telegraf';

const tasksUpdatingScene = new Scenes.BaseScene(TASK_UPDATING_SCENE);

tasksUpdatingScene.enter(async (ctx) => {
  await ctx.editMessageReplyMarkup({
    inline_keyboard: [
      [
        Markup.button.callback(
          buttonsMessages.taskEditTitle,
          TASK_TITLE_UPDATING_SCENE,
        ),
      ],
      [
        Markup.button.callback(
          buttonsMessages.taskEditContent,
          TASK_CONTENT_UPDATING_SCENE,
        ),
      ],
      [Markup.button.callback(buttonsMessages.backButton, `back`)],
    ],
  });
});

tasksUpdatingScene.action(TASK_TITLE_UPDATING_SCENE, async (ctx) => {
  ctx.scene.state.fieldForUpdating = 'title';
  ctx.reply(repliesMessages.askTitle);
});

tasksUpdatingScene.action(TASK_CONTENT_UPDATING_SCENE, async (ctx) => {
  ctx.scene.state.fieldForUpdating = 'content';
  ctx.reply(repliesMessages.askContent);
});

tasksUpdatingScene.action('back', async (ctx) => {
  return ctx.scene.enter(TASK_OPTIONS_SCENE, ctx.scene.state);
});

tasksUpdatingScene.hears(/./, async (ctx) => {
  const { taskId, fieldForUpdating } = ctx.scene.state;

  if (!fieldForUpdating) {
    return ctx.reply(repliesMessages.askFieldForUpdate);
  }

  const updatedTask = await updateTask(taskId, {
    [fieldForUpdating]: ctx.message.text,
  });

  if (updatedTask.isError) {
    return ctx.reply(updatedTask.data);
  }

  ctx.scene.state.fieldForUpdating = null;
  return ctx.reply(repliesMessages.taskUpdatedSuccessfully);
});

export { tasksUpdatingScene };
