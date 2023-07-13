import axios from 'axios';
import {
  BASE_WEATHER_API_URL as BASE_URL,
  GET_WEATHER_API_URL as GET_WEATHER_URL,
} from '../constants/api/weatherApiConst.js';
import { WEATHER_API_TOKEN } from '../constants/environment.js/environment.js';

const getWeatherInCity = async (city) => {
  const queryParams = `?q=${city}&appid=${WEATHER_API_TOKEN}`;

  const response = await axios.get(
    `${BASE_URL}${GET_WEATHER_URL}${queryParams}`,
  );

  return response.data;
};

export { getWeatherInCity };
