// src/common/utils/logger/logger.service.ts
import { Injectable, Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class LoggerService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  log(message: string, context?: string) {
    this.logger.info(message, { context: context || 'Application' });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context: context || 'Application' });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context: context || 'Application' });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context: context || 'Application' });
  }

  verbose(message: string, context?: string) {
    this.logger.verbose(message, { context: context || 'Application' });
  }

  // Add a method for HTTP request logging
  logHttpRequest(req: any, res: any, context?: string) {
    this.logger.info(`${req.method} ${req.url} ${res.statusCode}`, {
      context: context || 'HTTP',
      userId: req.user?.id || 'anonymous',
      ip: req.ip,
      userAgent: req.headers['user-agent'],
      responseTime: res.responseTime,
    });
  }

  // Add a method for database query logging
  logQuery(query: string, parameters?: any[], context?: string) {
    this.logger.debug(`Query: ${query}`, {
      context: context || 'Database',
      parameters: parameters || [],
    });
  }
}