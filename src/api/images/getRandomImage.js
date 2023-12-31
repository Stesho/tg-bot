import {
  BASE_IMAGE_API_URL as BASE_URL,
  SEARCH_IMAGE_API_URL as SEARCH_IMAGE_URL,
} from '@constants/api/imageApiConst.js';
import { IMAGE_API_TOKEN } from '@constants/environment/environment.js';
import { errorsMessages } from '@constants/messages/index.js';
import { handleError } from '@utils/errorHandlers/index.js';
import { getRandomIntegerInRange } from '@utils/math/index.js';
import { createQueryParams } from '@utils/queryParams/index.js';
import axios from 'axios';

const getRandomImage = async (query) => {
  try {
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

    return {
      isError: false,
      data: response.data,
    };
  } catch (error) {
    return handleError(error, () => errorsMessages.getImageError);
  }
};

export { getRandomImage };
