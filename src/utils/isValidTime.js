const isValidTime = (time) => {
  const timeRegExp = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegExp.test(time);
};

export default isValidTime;