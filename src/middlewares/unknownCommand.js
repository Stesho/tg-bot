import commands from '../constants/commands/commands.js';
import { isCommand, isCommandExist } from '../utils/index.js';
import { repliesMessages } from '../constants/messages/index.js';

const unknownCommand = async (ctx, next) => {
  const message = ctx.message?.text;

  if (message && isCommand(message) && !isCommandExist(message, commands)) {
    return await ctx.reply(repliesMessages.unknownCommand);
  }

  return next();
};

export { unknownCommand };
