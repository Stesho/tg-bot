import axios from 'axios';
import {
  BASE_EVENTS_API_URL,
  GET_EVENTS_API_URL,
} from '../../constants/api/eventsApiConst.js';
import { EVENTS_API_TOKEN } from '../../constants/environment.js/environment.js';
import createQueryParams from '../../utils/createQueryParams.js';
import handleError from '../../utils/handleError.js';
import errorsMessages from '../../constants/messages/errorsMessages.js';

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
    return handleError(error, () => errorsMessages.getEventsError);
  }
};

export default getEventsByCountry;
