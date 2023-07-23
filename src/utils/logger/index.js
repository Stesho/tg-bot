import { NODE_ENV } from '#constants/environment/environment.js';
import { devLogger } from '#utils/logger/devLogger.js';
import { prodLogger } from '#utils/logger/prodLogger.js';

const logger = NODE_ENV === 'development' ? devLogger : prodLogger;

export { logger };
