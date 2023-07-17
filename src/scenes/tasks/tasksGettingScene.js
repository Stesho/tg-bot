import { Markup, Scenes } from 'telegraf';
import { TASK_GETTING_SCENE } from '../../constants/scenes/tasksScenesConst.js';
import getAllTasks from '../../db/task/getAllTasks.js';
import messages from '../../constants/messages/messages.js';

const tasksGettingScene = new Scenes.BaseScene(TASK_GETTING_SCENE);

tasksGettingScene.enter(async (ctx) => {
  const userId = ctx.scene.state.userId;
  const tasks = await getAllTasks(userId);

  if (tasks.isError) {
    await ctx.reply(tasks.data);
    return ctx.scene.leave();
  }

  const tasksButtons = tasks.data.map((task, index) => [
    Markup.button.callback(
      `${index + 1}. ${task.title}`,
      `choose-task_${task.id}`,
    ),
  ]);

  const messageText = messages.taskListTitle;

  await ctx.editMessageText(
    tasksButtons.length > 0 ? messageText : messages.emptyTaskList,
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
