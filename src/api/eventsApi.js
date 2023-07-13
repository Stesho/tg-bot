import getCityInfo from './getCityInfo.js';
import axios from 'axios';
import {
  BASE_EVENTS_API_URL,
  GET_EVENTS_API_URL,
} from '../constants/api/eventsApiConst.js';
import { EVENTS_API_TOKEN } from '../constants/environment.js/environment.js';

const getEventsByCity = async (city) => {
  const cityInfo = await getCityInfo(city);
  const queryParams = `?country=${cityInfo.country}&year=2023&type=major_holiday`;

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
