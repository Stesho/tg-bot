import axios from 'axios';
import {
  BASE_PLACES_API_URL,
  GET_PLACES_API_URL,
} from '../constants/api/placesApiConst.js';
import { PLACES_API_TOKEN } from '../constants/environment.js/environment.js';
import getCityInfo from './getCityInfo.js';

const getPlacesByCity = async (city) => {
  const cityInfo = await getCityInfo(city);
  const queryParams = `?apikey=${PLACES_API_TOKEN}&radius=1000&limit=5&lon=${cityInfo.lon}&lat=${cityInfo.lat}&rate=2&format=json`;

  const places = await axios.get(
    `${BASE_PLACES_API_URL}${GET_PLACES_API_URL}${queryParams}`,
  );

  return places.data;
};

export default getPlacesByCity;
