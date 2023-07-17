import commands from '../constants/commands/commands.js';
import isCommand from '../utils/isCommand.js';
import isCommandExist from '../utils/isCommandExist.js';
import repliesMessages from '../constants/messages/repliesMessages.js';

const unknownCommand = async (ctx, next) => {
  const message = ctx.message?.text;

  if (message && isCommand(message) && !isCommandExist(message, commands)) {
    return await ctx.reply(repliesMessages.unknownCommand);
  }

  return next();
};

export default unknownCommand;
