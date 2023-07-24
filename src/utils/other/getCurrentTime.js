const getCurrentTime = () => {
  const currentDate = new Date();
  const serverTimeShift = 3;
  currentDate.setHours(currentDate.getHours() + serverTimeShift);
  const hours = currentDate.getHours().toString().padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export { getCurrentTime };
