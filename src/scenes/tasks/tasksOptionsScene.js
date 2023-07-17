import { Markup, Scenes } from 'telegraf';
import {
  TASK_GETTING_SCENE,
  TASK_NOTIFICATION_SCENE,
  TASK_UPDATING_SCENE,
} from '../../constants/scenes/tasksScenesConst.js';
import deleteTask from '../../db/task/deleteTask.js';
import messages from '../../constants/messages/messages.js';

const tasksOptionsScene = new Scenes.BaseScene('selectTaskOptionMenu');
tasksOptionsScene.enter(async (ctx) => {
  await ctx.editMessageText(messages.taskOptionsSceneTitle, {
    reply_markup: {
      inline_keyboard: [
        [
          Markup.button.callback(
            messages.taskSetNotification,
            `set-notification`,
          ),
        ],
        [
          Markup.button.callback(messages.taskEdit, `edit-task`),
          Markup.button.callback(messages.taskDelete, `delete-task`),
        ],
        [Markup.button.callback(messages.backButton, `back`)],
      ],
    },
  });
});

tasksOptionsScene.action('set-notification', async (ctx) => {
  return ctx.scene.enter(TASK_NOTIFICATION_SCENE, ctx.scene.state);
});

tasksOptionsScene.action('edit-task', async (ctx) => {
  return ctx.scene.enter(TASK_UPDATING_SCENE, ctx.scene.state);
});

tasksOptionsScene.action('delete-task', async (ctx) => {
  const taskId = ctx.scene.state.taskId;
  const deletedTask = await deleteTask(taskId);

  if (deletedTask.isError) {
    await ctx.reply(deletedTask.data);
  } else {
    await ctx.reply(messages.taskDeletedSuccessfully);
  }

  return ctx.scene.enter(TASK_GETTING_SCENE, ctx.scene.state);
});

tasksOptionsScene.action('back', async (ctx) => {
  return ctx.scene.enter(TASK_GETTING_SCENE, ctx.scene.state);
});

export default tasksOptionsScene;
