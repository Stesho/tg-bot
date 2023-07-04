import { Markup, Scenes } from 'telegraf';
import {
  TASK_DELETE_SCENE,
  TASK_EDIT_SCENE,
  TASK_GETTING_SCENE,
} from '../../constants/scenes/tasksScenesConst.js';
import getTasks from '../../services/getTasks.js';
import deleteTask from '../../services/deleteTask.js';

const showTasks = async (ctx) => {
  const tasks = await getTasks(ctx.scene.state.user.id);
  tasks.forEach((task) => {
    ctx.reply(
      `${task.title}
      ${task.content}`,
      Markup.inlineKeyboard([
        Markup.button.callback('Edit task', TASK_EDIT_SCENE),
        Markup.button.callback('Delete task', `delete-task_${task.id}`),
      ]),
    );
  });
};

const tasksGettingScene = new Scenes.WizardScene(TASK_GETTING_SCENE, showTasks);

tasksGettingScene.action(TASK_EDIT_SCENE, (ctx) => {
  return ctx.scene.leave();
});

tasksGettingScene.action(/delete-task_(.+)/, async (ctx) => {
  const taskId = await ctx.match.input.split('_')[1];
  await deleteTask(taskId);
  ctx.reply('Task successfully deleted');
  return ctx.scene.leave();
});

export default tasksGettingScene;