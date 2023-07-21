import { isCommand } from './isCommand.js';
import { isCommandExist } from './isCommandExist.js';

const isUnknownCommand = (message, commands) =>
  message && isCommand(message) && !isCommandExist(message, commands);

export { isUnknownCommand };
