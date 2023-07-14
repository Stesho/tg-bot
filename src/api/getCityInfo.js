import axios from 'axios';
import { PLACES_API_TOKEN } from '../constants/environment.js/environment.js';
import {
  BASE_PLACES_API_URL,
  GET_CITY_INFO_API_URL,
} from '../constants/api/placesApiConst.js';
import createQueryParams from '../utils/createQueryParams.js';

const getCityInfo = async (city) => {
  const queryParams = createQueryParams({
    apikey: PLACES_API_TOKEN,
    name: city,
  });

  const cityInfo = await axios.get(
    `${BASE_PLACES_API_URL}${GET_CITY_INFO_API_URL}${queryParams}`,
  );

  return cityInfo.data;
};

export default getCityInfo;
