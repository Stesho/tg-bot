import axios from 'axios';
import {
  BASE_IMAGE_API_URL as BASE_URL,
  SEARCH_IMAGE_API_URL as SEARCH_IMAGE_URL,
} from '../constants/api/imageApiConst.js';
import { IMAGE_API_TOKEN } from '../constants/environment.js/environment.js';
import getRandomIntegerInRange from '../utils/getRandomIntegerInRange.js';
import createQueryParams from '../utils/createQueryParams.js';

const getRandomImage = async (query) => {
  const pageNumber = getRandomIntegerInRange(1, 999);
  const queryParams = createQueryParams({
    query,
    page: pageNumber,
    per_page: 1,
  });

  const response = await axios.get(
    `${BASE_URL}${SEARCH_IMAGE_URL}${queryParams}`,
    {
      headers: {
        Authorization: `${IMAGE_API_TOKEN}`,
      },
    },
  );

  return response.data;
};

export { getRandomImage };
