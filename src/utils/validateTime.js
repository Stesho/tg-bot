const validateTime = (time) => {
  const timeRegExp = /^\d{2}:?\d{2}(am|pm)?$/;
  return timeRegExp.test(time);
};

export default validateTime;
