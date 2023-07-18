import { Markup, Scenes } from 'telegraf';
import {
  TASK_ADD_SCENE,
  TASK_GETTING_SCENE,
  TASKS_SCENE,
} from '../../constants/scenes/index.js';
import {
  textMessages,
  buttonsMessages,
} from '../../constants/messages/index.js';

const tasksScene = new Scenes.BaseScene(TASKS_SCENE);

tasksScene.enter((ctx) => {
  ctx.scene.state.userId = ctx.update.message.from.id;

  ctx.reply(
    textMessages.taskSceneTitle,
    Markup.inlineKeyboard([
      [Markup.button.callback(buttonsMessages.taskShow, TASK_GETTING_SCENE)],
      [Markup.button.callback(buttonsMessages.taskAdd, TASK_ADD_SCENE)],
    ]).resize(),
  );
});

tasksScene.action(TASK_GETTING_SCENE, (ctx) => {
  return ctx.scene.enter(TASK_GETTING_SCENE, ctx.scene.state);
});

tasksScene.action(TASK_ADD_SCENE, (ctx) => {
  return ctx.scene.enter(TASK_ADD_SCENE, ctx.scene.state);
});

export { tasksScene };
