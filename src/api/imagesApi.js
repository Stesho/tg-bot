import axios from 'axios';
import {
  BASE_IMAGE_API_URL as BASE_URL,
  SEARCH_IMAGE_API_URL as SEARCH_IMAGE_URL,
} from '../constants/imageApiConstants.js';
import { IMAGE_API_TOKEN } from '../constants/environment.js';
import getRandomIntegerInRange from '../utils/getRandomIntegerInRange.js';

const getRandomImage = async (query) => {
  const pageNumber = getRandomIntegerInRange(1, 999);
  const queryParams = `query=${query}&page=${pageNumber}&per_page=1`;

  const response = await axios.get(
    `${BASE_URL}${SEARCH_IMAGE_URL}?${queryParams}`,
    {
      headers: {
        Authorization: `${IMAGE_API_TOKEN}`,
      },
    },
  );

  return response.data;
};

export { getRandomImage };
