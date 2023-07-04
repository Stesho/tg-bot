import { Markup, Scenes } from 'telegraf';
import { TASK_GETTING_SCENE } from '../../constants/scenes/tasksScenesConst.js';
import getTasks from '../../services/getTasks.js';

const showTasks = async (ctx) => {
  const tasks = await getTasks(ctx.scene.state.user.id);
  tasks.forEach((task) => {
    ctx.reply(
      `${task.title}
      ${task.content}`,
      Markup.inlineKeyboard([
        Markup.button.callback('Edit task', 'get-weather'),
        Markup.button.callback('Delete task', 'subscribe-weather'),
      ]),
    );
  });
  return ctx.scene.leave();
};

const tasksGettingScene = new Scenes.WizardScene(TASK_GETTING_SCENE, showTasks);

export default tasksGettingScene;
