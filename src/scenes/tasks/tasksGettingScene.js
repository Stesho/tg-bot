import { Markup, Scenes } from 'telegraf';
import {
  TASK_GETTING_SCENE,
  TASK_OPTIONS_SCENE,
  TASK_SELECT_SCENE,
} from '../../constants/scenes/tasksScenesConst.js';
import getAllTasks from '../../db/task/getAllTasks.js';
import textMessages from '../../constants/messages/textMessages.js';

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
      `${TASK_SELECT_SCENE}_${task.id}`,
    ),
  ]);

  await ctx.editMessageText(
    tasksButtons.length > 0
      ? textMessages.taskListTitle
      : textMessages.emptyTaskList,
    {
      reply_markup: {
        inline_keyboard: tasksButtons,
      },
    },
  );
});

tasksGettingScene.action(
  new RegExp(`${TASK_SELECT_SCENE}_(.+)`),
  async (ctx) => {
    const taskId = await ctx.match.input.split('_')[1];
    const state = ctx.scene.state;

    return ctx.scene.enter(TASK_OPTIONS_SCENE, { ...state, taskId });
  },
);

export default tasksGettingScene;
