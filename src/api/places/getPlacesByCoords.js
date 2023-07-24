import axios from 'axios';

import {
  BASE_PLACES_API_URL,
  GET_PLACES_API_URL,
} from '#constants/api/index.js';
import { PLACES_API_TOKEN } from '#constants/environment/environment.js';
import { errorsMessages } from '#constants/messages/index.js';
import { handleError } from '#utils/errorHandlers/index.js';
import { createQueryParams } from '#utils/queryParams/index.js';

const getPlacesByCoords = async (lon, lat) => {
  try {
    const queryParams = createQueryParams({
      apikey: PLACES_API_TOKEN,
      radius: 1000,
      limit: 5,
      lon,
      lat,
      rate: 2,
      format: 'json',
    });

    const places = await axios.get(
      `${BASE_PLACES_API_URL}${GET_PLACES_API_URL}${queryParams}`,
    );

    return {
      isError: false,
      data: places.data,
    };
  } catch (error) {
    return handleError(error, () => errorsMessages.getPlacesError);
  }
};

export { getPlacesByCoords };
