import { config } from 'dotenv';

/* Read env variables. */
config();

/**
 * Type checked list of environment variables.
 */
export default {
  ENV                  : process.env.ENV as string,
  DB_URL              : process.env.DB_URL as string,
  DB_NAME              : process.env.DB_NAME as string,
  TEST_DB_HOST         : process.env.TEST_DB_HOST as string,
  TEST_DB_NAME         : process.env.TEST_DB_NAME as string,
  PORT                 : parseInt(process.env.PORT) as number,
  API_VERSION          : process.env.API_VERSION as string,
  APP_URL              : process.env.APP_URL as string, 
};
