import {
  ArgumentsHost, Catch, ExceptionFilter,


  HttpException,
  HttpStatus, Logger
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception instanceof HttpException
        ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: exception.message
    };
    Logger.log(
      exception.message + ' ExceptionFilter',
      `${request.method} ${request.url}`,
      )
    response
        .status(status)
        .json(errorResponse);
}
}

// @Catch(InterceptorException)
// export class InterceptExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception instanceof HttpException
//         ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

//     const errorResponse = {
//         statusCode: status,
//         timestamp: new Date().toISOString(),
//         path: request.url,
//         method: request.method,
//         message: exception.message
//     };

//     console.log(
//         `${request.method} ${request.url}`,
//         JSON.stringify(errorResponse),
//         'ExceptionFilter'
//     );

//     response
//         .status(status)
//         .json(errorResponse);
// }
// }

// @Catch(NotFoundException)
// export class NotFoundExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception instanceof HttpException
//         ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

//     const errorResponse = {
//         statusCode: status,
//         timestamp: new Date().toISOString(),
//         path: request.url,
//         method: request.method,
//         message: exception.message
//     };

//     console.log(
//         `${request.method} ${request.url}`,
//         JSON.stringify(errorResponse),
//         'ExceptionFilter'
//     );

//     response
//         .status(status)
//         .json(errorResponse);
// }
// }

// @Catch(InvalidException)
// export class InvalidExceptionFilter implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();
//     const status = exception instanceof HttpException
//         ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

//     const errorResponse = {
//         statusCode: status,
//         timestamp: new Date().toISOString(),
//         path: request.url,
//         method: request.method,
//         message: exception.message
//     };

//     console.log(
//         `${request.method} ${request.url}`,
//         JSON.stringify(errorResponse),
//         'ExceptionFilter'
//     );

//     response
//         .status(status)
//         .json(errorResponse);
// }
// }

export const FILTERS = [
  {
    provide: 'EXCEPTION_FILTER',
    useClass: AllExceptionsFilter,
  }
  // {
  //   provide: 'NOT_FOUND_EXCEPTION_FILTER',
  //   useClass: NotFoundExceptionFilter,
  // },
  // {
  //   provide: 'INTERCEPTOR_EXCEPTION_FILTER',
  //   useClass: InterceptorException,
  // },
  // {
  //   provide: 'INVALID_EXCEPTION_FILTER',
  //   useClass: InvalidExceptionFilter,
  // },
];