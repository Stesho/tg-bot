import 'dotenv/config';

import process from 'node:process';

export const { NODE_ENV } = process.env || 'development';
export const { BOT_TOKEN } = process.env;
export const { DB_CONNECTION_URI } = process.env;
export const { IMAGE_API_TOKEN } = process.env;
export const { WEATHER_API_TOKEN } = process.env;
export const { EVENTS_API_TOKEN } = process.env;
export const { PLACES_API_TOKEN } = process.env;
