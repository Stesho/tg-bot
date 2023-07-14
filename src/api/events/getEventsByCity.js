import getCityInfo from '../places/getCityInfo.js';
import axios from 'axios';
import {
  BASE_EVENTS_API_URL,
  GET_EVENTS_API_URL,
} from '../../constants/api/eventsApiConst.js';
import { EVENTS_API_TOKEN } from '../../constants/environment.js/environment.js';
import createQueryParams from '../../utils/createQueryParams.js';

const getEventsByCity = async (city) => {
  const cityInfo = await getCityInfo(city);
  const queryParams = createQueryParams({
    country: cityInfo.country,
    year: new Date().getFullYear(),
    type: 'major_holiday',
  });

  const events = await axios.get(
    `${BASE_EVENTS_API_URL}${GET_EVENTS_API_URL}${queryParams}`,
    {
      headers: {
        'X-Api-Key': EVENTS_API_TOKEN,
      },
    },
  );

  return events.data;
};

export default getEventsByCity;
