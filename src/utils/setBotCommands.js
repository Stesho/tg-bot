const setBotCommandHandlers = (bot, commands) => {
  for (let command in commands) {
    bot.command(command, commands[command].handler);
  }
};

export default setBotCommandHandlers;
