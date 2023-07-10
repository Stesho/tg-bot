import { Scenes } from 'telegraf';
import editTask from '../../services/updateTask.js';

const askContent = async (ctx) => {
  ctx.reply('Enter new content');
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

const tasksEditContentScene = new Scenes.WizardScene(
  'edit-task-content',
  askContent,
  updateTask,
);

export default tasksEditContentScene;
