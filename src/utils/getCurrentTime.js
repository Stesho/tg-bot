const getCurrentTime = () => {
  const currentDate = new Date();
  const serverTimeShift = 3;
  const hours = (currentDate.getHours() + serverTimeShift)
    .toString()
    .padStart(2, '0');
  const minutes = currentDate.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export { getCurrentTime };
