import { Markup, Scenes } from 'telegraf';
import { TASK_EDIT_SCENE } from '../../constants/scenes/tasksScenesConst.js';
import editTask from '../../services/updateTask.js';

const askTitle = async (ctx) => {
  ctx.reply('Enter new title');
  return ctx.wizard.next();
};

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

const tasksEditScene = new Scenes.BaseScene(TASK_EDIT_SCENE);
const tasksEditTitleScene = new Scenes.WizardScene(
  'edit-task-title',
  askTitle,
  updateTask,
);
const tasksEditContentScene = new Scenes.WizardScene(
  'edit-task-content',
  askContent,
  updateTask,
);

tasksEditScene.enter((ctx) => {
  ctx.reply(
    'What do you want to change?',
    Markup.inlineKeyboard([
      Markup.button.callback('Edit title', 'edit-title'),
      Markup.button.callback('Edit content', 'edit-content'),
    ]),
  );
});

tasksEditScene.action('edit-title', (ctx) => {
  ctx.scene.state.fieldForUpdating = 'title';
  return ctx.scene.enter('edit-task-title', ctx.scene.state);
});

tasksEditScene.action('edit-content', (ctx) => {
  ctx.scene.state.fieldForUpdating = 'content';
  return ctx.scene.enter('edit-task-content', ctx.scene.state);
});

export { tasksEditScene, tasksEditTitleScene, tasksEditContentScene };
