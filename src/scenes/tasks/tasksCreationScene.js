import { Scenes } from 'telegraf';
import { TASK_ADD_SCENE } from '../../constants/scenes/tasksScenesConst.js';
import addTask from '../../db/task/addTask.js';
import repliesMessages from '../../constants/messages/repliesMessages.js';

const askTitle = async (ctx) => {
  ctx.scene.state.task = {
    title: '',
    content: '',
    userId: ctx.scene.state.userId,
    chatId: '',
  };

  ctx.reply(repliesMessages.askTitle);

  return ctx.wizard.next();
};

const askContent = async (ctx) => {
  if (!ctx.message?.text) {
    return ctx.reply(repliesMessages.invalidTitle);
  }

  ctx.scene.state.task.chatId = ctx.update.message.chat.id;
  ctx.scene.state.task.title = ctx.message.text;
  ctx.reply(repliesMessages.askContent);

  return ctx.wizard.next();
};

const createTask = async (ctx) => {
  if (!ctx.message?.text) {
    return ctx.reply(repliesMessages.invalidContent);
  }

  ctx.scene.state.task.content = ctx.message.text;
  const task = ctx.scene.state.task;
  const addedTask = await addTask(task);

  if (addedTask.isError) {
    return ctx.reply(addedTask.data);
  }

  ctx.reply(repliesMessages.taskAddedSuccessfully);

  return ctx.scene.leave();
};

const tasksCreationScene = new Scenes.WizardScene(
  TASK_ADD_SCENE,
  askTitle,
  askContent,
  createTask,
);

export default tasksCreationScene;
