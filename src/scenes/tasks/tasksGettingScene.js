import { Markup, Scenes } from 'telegraf';
import { TASK_GETTING_SCENE } from '../../constants/scenes/tasksScenesConst.js';
import getAllTasks from '../../db/task/getAllTasks.js';

const tasksGettingScene = new Scenes.BaseScene(TASK_GETTING_SCENE);

tasksGettingScene.enter(async (ctx) => {
  const userId = ctx.scene.state.userId;
  const tasks = await getAllTasks(userId);
  const tasksButtons = tasks.map((task, index) => [
    Markup.button.callback(
      `${index + 1}. ${task.title}`,
      `choose-task_${task.id}`,
    ),
  ]);

  const messageText =
    'Below you can see a list of all your tasks. ' +
    'Click on one of them to change the task, delete ' +
    'it, or set a reminder.';

  await ctx.editMessageText(
    tasksButtons.length > 0 ? messageText : 'There are no tasks yet',
    {
      reply_markup: {
        inline_keyboard: tasksButtons,
      },
    },
  );
});

tasksGettingScene.action(/choose-task_(.+)/, async (ctx) => {
  const taskId = await ctx.match.input.split('_')[1];
  const state = ctx.scene.state;

  return ctx.scene.enter('selectTaskOptionMenu', { ...state, taskId });
});

export default tasksGettingScene;
