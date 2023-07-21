const setBotCommandHandlers = (bot, commands) => {
  Object.entries(commands).forEach(([commandName, command]) => {
    bot.command(commandName, command.handler);
  });
};

export { setBotCommandHandlers };
