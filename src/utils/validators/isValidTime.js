const isValidTime = (time) => {
  // check if time is in 24-hour format HH:MM, e.g. 00:00, 15:30, 23:59
  const timeRegExp = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegExp.test(time);
};

export { isValidTime };
