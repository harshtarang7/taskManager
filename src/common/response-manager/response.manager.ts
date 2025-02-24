import { HttpStatus, Injectable } from '@nestjs/common';
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: any;
  status: number;
}

@Injectable()
export class ResponseService {
  success<T>(data: T, message = 'Success', status = HttpStatus.OK): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
      status,
    };
  }

  error<T>(message = 'Error',  data: T = null as T, status = HttpStatus.BAD_REQUEST): ApiResponse<T> {
    return {
      success: false,
      message,
      data,
      status,
    };
  }
}
