const isCommandExist = (command, commands) => {
  const commandWithoutSlash = command.slice(1, command.length);
  return commands[commandWithoutSlash];
};

export default isCommandExist;
