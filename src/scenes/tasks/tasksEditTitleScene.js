import { Scenes } from 'telegraf';
import editTask from '../../services/updateTask.js';

const askTitle = async (ctx) => {
  ctx.reply('Enter new title');
  return ctx.wizard.next();
};

const updateTask = async (ctx) => {
  const { taskId, fieldForUpdating } = ctx.scene.state;
  await editTask(taskId, {
    [fieldForUpdating]: ctx.message.text,
  });
  ctx.reply('Task was successfully updated');
  return ctx.scene.leave();
};

const tasksEditTitleScene = new Scenes.WizardScene(
  'edit-task-title',
  askTitle,
  updateTask,
);

export default tasksEditTitleScene;
