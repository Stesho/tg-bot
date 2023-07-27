import { getShiftedTime } from '@utils/date/getShiftedTime.js';

const getCurrentTime = () => {
  const serverHoursShift = 3;
  const shiftedTime = getShiftedTime(serverHoursShift);
  const hours = shiftedTime.getHours().toString().padStart(2, '0');
  const minutes = shiftedTime.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

export { getCurrentTime };
