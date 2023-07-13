import getEventsByCity from '../api/eventsApi.js';

const showEventsByCity = async (city) => {
  const events = await getEventsByCity(city);
};
