import { Markup, Scenes } from 'telegraf';
import {
  TASK_GETTING_SCENE,
  TASK_NOTIFICATION_SCENE,
  TASK_UPDATING_SCENE,
} from '../../constants/scenes/tasksScenesConst.js';
import deleteTask from '../../services/deleteTask.js';

const tasksOptionsScene = new Scenes.BaseScene('selectTaskOptionMenu');
tasksOptionsScene.enter(async (ctx) => {
  const taskId = ctx.scene.state.taskId;
  await ctx.editMessageText(`taskId: ${taskId}`, {
    reply_markup: {
      inline_keyboard: [
        [Markup.button.callback('Set notification', `set-notification`)],
        [
          Markup.button.callback('Edit task', `edit-task`),
          Markup.button.callback('Delete task', `delete-task`),
        ],
        [Markup.button.callback('Back', `back`)],
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

  await deleteTask(taskId);
  await ctx.reply('Task successfully deleted');

  return ctx.scene.enter(TASK_GETTING_SCENE, ctx.scene.state);
});

tasksOptionsScene.action('back', async (ctx) => {
  return ctx.scene.enter(TASK_GETTING_SCENE, ctx.scene.state);
});

export default tasksOptionsScene;
