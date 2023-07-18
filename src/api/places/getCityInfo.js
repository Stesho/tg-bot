import axios from 'axios';
import { EVENTS_API_TOKEN } from '../../constants/environment.js/environment.js';
import {
  BASE_EVENTS_API_URL,
  GET_CITY_API_URL,
} from '../../constants/api/index.js';
import { createQueryParams, handleError } from '../../utils/index.js';
import { errorsMessages } from '../../constants/messages/index.js';

const getCityInfo = async (city) => {
  try {
    const queryParams = createQueryParams({
      name: city,
    });

    const cityInfo = await axios.get(
      `${BASE_EVENTS_API_URL}${GET_CITY_API_URL}${queryParams}`,
      {
        headers: {
          'X-Api-Key': EVENTS_API_TOKEN,
        },
      },
    );

    return {
      isError: false,
      data: cityInfo.data,
    };
  } catch (error) {
    return handleError(error, () => errorsMessages.cityNotFoundError);
  }
};

export { getCityInfo };
