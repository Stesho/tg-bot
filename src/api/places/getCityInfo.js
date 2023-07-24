import axios from 'axios';

import { BASE_EVENTS_API_URL, GET_CITY_API_URL } from '#constants/api/index.js';
import { EVENTS_API_TOKEN } from '#constants/environment/environment.js';
import { errorsMessages } from '#constants/messages/index.js';
import { handleError } from '#utils/errorHandlers/index.js';
import { createQueryParams } from '#utils/queryParams/index.js';

const getCityInfo = async (city) => {
  try {
    const queryParams = createQueryParams({
      city,
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
      isError: cityInfo.data.length === 0,
      data: cityInfo.data[0],
    };
  } catch (error) {
    return handleError(error, () => errorsMessages.cityNotFoundError);
  }
};

export { getCityInfo };
