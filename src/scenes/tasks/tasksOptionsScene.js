import { Markup, Scenes } from 'telegraf';
import {
  TASK_DELETION_SCENE,
  TASK_GETTING_SCENE,
  TASK_NOTIFICATION_SCENE,
  TASK_OPTIONS_SCENE,
  TASK_UPDATING_SCENE,
} from '../../constants/scenes/tasksScenesConst.js';
import deleteTask from '../../db/task/deleteTask.js';
import textMessages from '../../constants/messages/textMessages.js';
import buttonsMessages from '../../constants/messages/buttonsMessages.js';
import repliesMessages from '../../constants/messages/repliesMessages.js';
import getOneTask from '../../db/task/getOneTask.js';

const tasksOptionsScene = new Scenes.BaseScene(TASK_OPTIONS_SCENE);
tasksOptionsScene.enter(async (ctx) => {
  const taskId = ctx.scene.state.taskId;
  const task = await getOneTask(taskId);

  if (task.isError) {
    return ctx.reply(task.data);
  }

  ctx.scene.state.task = task.data;

  await ctx.editMessageText(textMessages.taskOverview(task.data), {
    reply_markup: {
      inline_keyboard: [
        [
          Markup.button.callback(
            buttonsMessages.taskSetNotification,
            TASK_NOTIFICATION_SCENE,
          ),
        ],
        [
          Markup.button.callback(buttonsMessages.taskEdit, TASK_UPDATING_SCENE),
          Markup.button.callback(
            buttonsMessages.taskDelete,
            TASK_DELETION_SCENE,
          ),
        ],
        [Markup.button.callback(buttonsMessages.backButton, `back`)],
      ],
    },
  });
});

tasksOptionsScene.action(TASK_NOTIFICATION_SCENE, async (ctx) => {
  return ctx.scene.enter(TASK_NOTIFICATION_SCENE, ctx.scene.state);
});

tasksOptionsScene.action(TASK_UPDATING_SCENE, async (ctx) => {
  return ctx.scene.enter(TASK_UPDATING_SCENE, ctx.scene.state);
});

tasksOptionsScene.action(TASK_DELETION_SCENE, async (ctx) => {
  const taskId = ctx.scene.state.taskId;
  const deletedTask = await deleteTask(taskId);

  if (deletedTask.isError) {
    await ctx.reply(deletedTask.data);
  } else {
    await ctx.reply(repliesMessages.taskDeletedSuccessfully);
  }

  return ctx.scene.enter(TASK_GETTING_SCENE, ctx.scene.state);
});

tasksOptionsScene.action('back', async (ctx) => {
  return ctx.scene.enter(TASK_GETTING_SCENE, ctx.scene.state);
});

export default tasksOptionsScene;
