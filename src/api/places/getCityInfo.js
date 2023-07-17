import axios from 'axios';
import {
  EVENTS_API_TOKEN,
  PLACES_API_TOKEN,
} from '../../constants/environment.js/environment.js';
import {
  BASE_PLACES_API_URL,
  GET_CITY_INFO_API_URL,
} from '../../constants/api/placesApiConst.js';
import createQueryParams from '../../utils/createQueryParams.js';
import handleError from '../../utils/handleError.js';
import errorsMessages from '../../constants/messages/errorsMessages.js';

const getCityInfo = async (city) => {
  try {
    const queryParams = createQueryParams({
      // apikey: PLACES_API_TOKEN,
      name: city,
    });

    const cityInfo = await axios.get(
      // `${BASE_PLACES_API_URL}${GET_CITY_INFO_API_URL}${queryParams}`,
      `https://api.api-ninjas.com/v1/city${queryParams}`,
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

export default getCityInfo;
