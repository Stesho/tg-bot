import { Markup, Scenes } from 'telegraf';
import { TASK_ADD_SCENE } from '../../constants/scenes/tasksScenesConst.js';
import addTask from '../../db/task/addTask.js';
import messages from '../../constants/messages/messages.js';

const askTitle = async (ctx) => {
  ctx.scene.state.task = {
    title: '',
    content: '',
    user_id: ctx.scene.state.userId,
  };
  ctx.reply(messages.askTitle);
  return ctx.wizard.next();
};

const askContent = async (ctx) => {
  ctx.scene.state.task.title = ctx.message.text;
  ctx.reply(messages.askContent);
  return ctx.wizard.next();
};

const createTask = async (ctx) => {
  ctx.scene.state.task.content = ctx.message.text;
  await addTask(ctx.scene.state.task);
  ctx.reply(messages.taskAddedSuccessfully);
  return ctx.scene.leave();
};

const tasksCreationScene = new Scenes.WizardScene(
  TASK_ADD_SCENE,
  askTitle,
  askContent,
  createTask,
);

export default tasksCreationScene;
