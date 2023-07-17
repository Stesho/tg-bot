import axios from 'axios';
import { PLACES_API_TOKEN } from '../../constants/environment.js/environment.js';
import {
  BASE_PLACES_API_URL,
  GET_CITY_INFO_API_URL,
} from '../../constants/api/placesApiConst.js';
import createQueryParams from '../../utils/createQueryParams.js';
import handleError from '../../utils/handleError.js';
import messages from '../../constants/messages/messages.js';

const getCityInfo = async (city) => {
  try {
    const queryParams = createQueryParams({
      apikey: PLACES_API_TOKEN,
      name: city,
    });

    const cityInfo = await axios.get(
      `${BASE_PLACES_API_URL}${GET_CITY_INFO_API_URL}${queryParams}`,
    );

    return {
      isError: false,
      data: cityInfo.data,
    };
  } catch (error) {
    return handleError(error, messages.cityNotFoundError);
  }
};

export default getCityInfo;
