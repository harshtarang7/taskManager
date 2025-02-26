import { Logger } from 'typeorm';
import { LoggerService } from './logger.service';

export class TypeOrmLogger implements Logger {
  constructor(private readonly loggerService: LoggerService) {}

  logQuery(query: string, parameters?: any[]) {
    this.loggerService.logQuery(query, parameters);
  }

  logQueryError(error: string, query: string, parameters?: any[]) {
    this.loggerService.error(`Query failed: ${query}`, error, 'Database');
  }

  logQuerySlow(time: number, query: string, parameters?: any[]) {
    this.loggerService.warn(`Slow query (${time}ms): ${query}`, 'Database');
  }

  logSchemaBuild(message: string) {
    this.loggerService.log(message, 'Schema');
  }

  logMigration(message: string) {
    this.loggerService.log(message, 'Migration');
  }

  log(level: 'log' | 'info' | 'warn', message: string) {
    switch (level) {
      case 'log':
      case 'info':
        this.loggerService.log(message, 'TypeORM');
        break;
      case 'warn':
        this.loggerService.warn(message, 'TypeORM');
        break;
    }
  }
}