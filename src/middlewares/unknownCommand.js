import commands from '../constants/commands/commands.js';
import { repliesMessages } from '../constants/messages/index.js';
import { isUnknownCommand } from '../utils/isUnknownCommand.js';

const unknownCommand = async (ctx, next) => {
  const message = ctx.message?.text;

  if (isUnknownCommand(message, commands)) {
    return await ctx.reply(repliesMessages.unknownCommand);
  }

  return next();
};

export { unknownCommand };
