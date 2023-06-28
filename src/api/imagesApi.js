import axios from 'axios';
import process from 'node:process';

const URL = 'https://api.unsplash.com/photos/random';
const getRandomImage = async (query) => {
  const response = await axios.get(`${URL}?query=${query}&count=1`, {
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLASH_API_TOKEN}`,
    },
  });
  return response.data[0];
};

export { getRandomImage };
