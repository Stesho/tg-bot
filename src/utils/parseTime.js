const parseTime = (time) => {
  const [hours, minutes] = time.split(':');
  return [hours, minutes];
};

export default parseTime;
