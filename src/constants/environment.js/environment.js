import process from 'node:process';
import 'dotenv/config';

export const BOT_TOKEN = process.env.BOT_TOKEN;
export const DB_CONNECTION_URI = process.env.DB_CONNECTION_URI;
export const IMAGE_API_TOKEN = process.env.IMAGE_API_TOKEN;
export const WEATHER_API_TOKEN = process.env.WEATHER_API_TOKEN;
export const EVENTS_API_TOKEN = process.env.EVENTS_API_TOKEN;
export const PLACES_API_TOKEN = process.env.PLACES_API_TOKEN;
