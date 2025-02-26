// src/common/utils/logger/logger.config.ts
import { utilities as nestWinstonModuleUtilities, WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// Create custom format for console
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.ms(),
  nestWinstonModuleUtilities.format.nestLike('TaskManager', {
    prettyPrint: true,
    colors: true,
  }),
);

// Create custom format for files
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.json(),
);

// Create daily rotate file transports
const errorRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  level: 'error',
  format: fileFormat,
});

const combinedRotateTransport = new winston.transports.DailyRotateFile({
  filename: 'logs/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  format: fileFormat,
});

// Add event listeners for transport errors
errorRotateTransport.on('rotate', function(oldFilename, newFilename) {
  console.log('Rotating error log file from', oldFilename, 'to', newFilename);
});

combinedRotateTransport.on('rotate', function(oldFilename, newFilename) {
  console.log('Rotating combined log file from', oldFilename, 'to', newFilename);
});

export const winstonConfig: WinstonModuleOptions = {
  levels,
  transports: [
    new winston.transports.Console({
      format: consoleFormat,
    }),
    errorRotateTransport,
    combinedRotateTransport,
  ],
};