import axios from 'axios';
import process from 'node:process';
import {
  BASE_IMAGE_API_URL as BASE_URL,
  RANDOM_IMAGE_API_URL as RANDOM_IMAGE_URL,
} from '../constants/imageApiConstants.js';

const getRandomImage = async (query) => {
  const imageCount = 1;
  const response = await axios.get(
    `${BASE_URL}${RANDOM_IMAGE_URL}?query=${query}&count=${imageCount}`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.UNSPLASH_API_TOKEN}`,
      },
    },
  );
  return response.data[0];
};

export { getRandomImage };
