import { Markup, Scenes } from 'telegraf';
import {
  TASK_EDIT_SCENE,
  TASK_GETTING_SCENE,
  TASK_NOTIFICATION_SCENE,
} from '../../constants/scenes/tasksScenesConst.js';
import getTasks from '../../services/getTasks.js';
import deleteTask from '../../services/deleteTask.js';

const showTasks = async (ctx) => {
  const userId = ctx.scene.state.user.id;
  const tasks = await getTasks(userId);

  tasks.forEach((task) => {
    ctx.reply(
      `${task.title}
      ${task.content}`,
      Markup.inlineKeyboard([
        [
          Markup.button.callback(
            'Set notification',
            `set-notification_${task.id}`,
          ),
        ],
        [
          Markup.button.callback('Edit task', `edit-task_${task.id}`),
          Markup.button.callback('Delete task', `delete-task_${task.id}`),
        ],
      ]),
    );
  });
};

const tasksGettingScene = new Scenes.WizardScene(TASK_GETTING_SCENE, showTasks);

tasksGettingScene.action(/set-notification_(.+)/, async (ctx) => {
  const taskId = await ctx.match.input.split('_')[1];
  const userId = ctx.scene.state.user.id;

  return ctx.scene.enter(TASK_NOTIFICATION_SCENE, { taskId, userId });
});

tasksGettingScene.action(/edit-task_(.+)/, async (ctx) => {
  const taskId = await ctx.match.input.split('_')[1];
  return ctx.scene.enter(TASK_EDIT_SCENE, { taskId });
});

tasksGettingScene.action(/delete-task_(.+)/, async (ctx) => {
  const taskId = await ctx.match.input.split('_')[1];
  await deleteTask(taskId);
  ctx.reply('Task successfully deleted');
  return ctx.scene.leave();
});

export default tasksGettingScene;
