import axios from 'axios';

import { BASE_EVENTS_API_URL, GET_CITY_API_URL } from '#constants/api/index.js';
import { EVENTS_API_TOKEN } from '#constants/environment/environment.js';
import { errorsMessages } from '#constants/messages/index.js';
import { handleError } from '#utils/errorHandlers/index.js';
import { createQueryParams } from '#utils/other/index.js';

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
