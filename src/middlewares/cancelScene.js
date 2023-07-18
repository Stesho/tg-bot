import commands from '../constants/commands/commands.js';
import { isCommand } from '../utils/index.js';

const cancelScene = async (ctx, next) => {
  const message = ctx.message?.text;

  if (message && isCommand(message)) {
    const command = commands[message];

    await ctx.scene.leave();

    if (!command) {
      return next();
    }

    return command.handler(ctx);
  }

  return next();
};

export { cancelScene };
