import { Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  success(message: string, data?: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { success: true, message, data };
  }

  error(message: string, errors?: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return { success: false, message, errors };
  }
}
