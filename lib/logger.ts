import pino from 'pino';

export const logger = pino({
  redact: ['email', 'phone'],
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
});
