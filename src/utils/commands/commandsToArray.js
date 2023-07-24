const commandsToArray = (commands) => {
  return Object.entries(commands).map(([command, commandProps]) => {
    return {
      command,
      description: commandProps.description,
    };
  });
};

export { commandsToArray };
