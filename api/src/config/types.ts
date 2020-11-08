/**
 * Environment types.
 */
export enum EnvType {
  DEV = 'dev',
  PRODUCTION = 'production',
  TEST = 'test',
}

/**
 * Logger level types.
 */
export enum LoggerLevels {
  debug = 'debug',
  info = 'info',
  http = 'http',
  warn = 'warn',
  error = 'error',
}

/**
 * Mongoose event types.
 */
export enum MongooseEvents {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
}
