import { Markup, Scenes } from 'telegraf';
import { TASK_EDIT_SCENE } from '../../constants/scenes/tasksScenesConst.js';
import editTask from '../../services/updateTask.js';

const tasksEditScene = new Scenes.BaseScene(TASK_EDIT_SCENE);

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

export default tasksEditScene;
