const getShiftedTime = (shift) => {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + shift);
  return currentDate;
};

export { getShiftedTime };
