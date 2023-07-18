import axios from 'axios';
import {
  BASE_IMAGE_API_URL as BASE_URL,
  SEARCH_IMAGE_API_URL as SEARCH_IMAGE_URL,
} from '../../constants/api/imageApiConst.js';
import { IMAGE_API_TOKEN } from '../../constants/environment.js/environment.js';
import {
  getRandomIntegerInRange,
  handleError,
  createQueryParams,
} from '../../utils/index.js';
import { errorsMessages } from '../../constants/messages/index.js';

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
