import axios from 'axios';
import {
  BASE_WEATHER_API_URL as BASE_URL,
  GET_WEATHER_API_URL as GET_WEATHER_URL,
} from '../../constants/api/weatherApiConst.js';
import { WEATHER_API_TOKEN } from '../../constants/environment.js/environment.js';
import createQueryParams from '../../utils/createQueryParams.js';
import handleError from '../../utils/handleError.js';
import messages from '../../constants/messages/messages.js';

const getWeatherInCity = async (city) => {
  try {
    const queryParams = createQueryParams({
      q: city,
      appid: WEATHER_API_TOKEN,
      units: 'metric',
    });

    const response = await axios.get(
      `${BASE_URL}${GET_WEATHER_URL}${queryParams}`,
    );

    return {
      isError: false,
      data: response.data,
    };
  } catch (error) {
    return handleError(error, () => messages.cityNotFoundError);
  }
};

export { getWeatherInCity };
