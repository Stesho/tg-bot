import { Composer, Markup, Scenes } from 'telegraf';
import {
  TASK_ADD_SCENE,
  TASK_GETTING_SCENE,
  TASKS_SCENE,
} from '../../constants/scenes/tasksScenesConst.js';

// const step1 = new Composer();
// step1.action(TASK_GETTING_SCENE, (ctx) => {
//   return ctx.scene.enter(TASK_GETTING_SCENE, ctx.scene.state);
// });
//
// step1.action(TASK_ADD_SCENE, (ctx) => {
//   return ctx.scene.enter(TASK_ADD_SCENE, ctx.scene.state);
// });
//
// const tasksScene = new Scenes.WizardScene(
//   TASKS_SCENE,
//   step1,
//
// );
//
// tasksScene.enter((ctx) => {
//   ctx.scene.state.user = {
//     id: ctx.update.message.from.id,
//     username: ctx.update.message.from.username,
//   };
//   // ctx.scene.state.user.id = ;
//   // ctx.scene.state.user.;
//
//   ctx.reply(
//     'Tasks',
//     Markup.inlineKeyboard([
//       [Markup.button.callback('Show my tasks', TASK_GETTING_SCENE)],
//       [Markup.button.callback('Add new task', TASK_ADD_SCENE)],
//     ]).resize(),
//   );
//
//   ctx.wizard.next();
// });

const tasksScene = new Scenes.BaseScene(TASKS_SCENE);

tasksScene.enter((ctx) => {
  // ctx.scene.state.user = {
  //   id: ctx.update.message.from.id,
  //   username: ctx.update.message.from.username,
  // };
  // ctx.scene.state.user.id = ;
  // ctx.scene.state.user.;
  ctx.scene.state.userId = ctx.update.message.from.id;

  ctx.reply(
    'Tasks',
    Markup.inlineKeyboard([
      [Markup.button.callback('Show my tasks', TASK_GETTING_SCENE)],
      [Markup.button.callback('Add new task', TASK_ADD_SCENE)],
    ]).resize(),
  );
});

tasksScene.action(TASK_GETTING_SCENE, (ctx) => {
  return ctx.scene.enter(TASK_GETTING_SCENE, ctx.scene.state);
});

tasksScene.action(TASK_ADD_SCENE, (ctx) => {
  return ctx.scene.enter(TASK_ADD_SCENE, ctx.scene.state);
});

export default tasksScene;
