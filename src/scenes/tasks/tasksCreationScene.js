import { Scenes } from 'telegraf';
import { TASK_ADD_SCENE } from '../../constants/scenes/tasksScenesConst.js';
import addTask from '../../services/addTask.js';

const askTitle = async (ctx) => {
  ctx.wizard.state.task = {
    title: '',
    content: '',
  };
  ctx.reply('Enter Title');
  return ctx.wizard.next();
};

const askContent = async (ctx) => {
  ctx.wizard.state.task.title = ctx.message.text;
  ctx.reply('Enter Text');
  return ctx.wizard.next();
};

const createTask = async (ctx) => {
  ctx.wizard.state.task.content = ctx.message.text;
  const task = {
    title: ctx.wizard.state.task.title,
    content: ctx.wizard.state.task.content,
  };
  await addTask(task);
  ctx.reply('Task was successfully added');
  return ctx.scene.leave();
};

const tasksCreationScene = new Scenes.WizardScene(
  TASK_ADD_SCENE,
  askTitle,
  askContent,
  createTask,
);

export default tasksCreationScene;
