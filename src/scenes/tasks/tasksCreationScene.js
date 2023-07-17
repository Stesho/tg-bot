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
  if (!ctx.message.text) {
    return ctx.reply(messages.invalidTitle);
  }

  ctx.scene.state.task.title = ctx.message.text;
  ctx.reply(messages.askContent);

  return ctx.wizard.next();
};

const createTask = async (ctx) => {
  if (!ctx.message.text) {
    return ctx.reply(messages.invalidContent);
  }

  ctx.scene.state.task.content = ctx.message.text;
  const task = ctx.scene.state.task;
  const addedTask = await addTask(task);

  if (addedTask.isError) {
    return ctx.reply(addedTask.data);
  }

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
