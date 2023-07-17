import getCityInfo from '../places/getCityInfo.js';
import axios from 'axios';
import {
  BASE_EVENTS_API_URL,
  GET_EVENTS_API_URL,
} from '../../constants/api/eventsApiConst.js';
import { EVENTS_API_TOKEN } from '../../constants/environment.js/environment.js';
import createQueryParams from '../../utils/createQueryParams.js';
import handleError from '../../utils/handleError.js';
import messages from '../../constants/messages/messages.js';

const getEventsByCountry = async (country) => {
  try {
    const queryParams = createQueryParams({
      country: country,
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

    return {
      isError: false,
      data: events.data,
    };
  } catch (error) {
    return handleError(error, messages.getEventsError);
  }
};

export default getEventsByCountry;
