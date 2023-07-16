import commands from '../constants/commands/commands.js';
import isCommand from '../utils/isCommand.js';
import isCommandExist from '../utils/isCommandExist.js';
import messages from '../constants/messages/messages.js';

const unknownCommand = async (ctx, next) => {
  const message = ctx.message?.text;

  if (message && isCommand(message) && !isCommandExist(message, commands)) {
    return await ctx.reply(messages.unknownCommand);
  }

  return next();
};

export default unknownCommand;
