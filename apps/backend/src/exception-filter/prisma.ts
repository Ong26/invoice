import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core/exceptions/base-exception-filter';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    switch (exception.code) {
      case 'P2002':
        const status = HttpStatus.CONFLICT;
        const fields = exception.meta.target;
        response
          .status(status)
          .json({ exception: exception, statusCode: status, fields });
        break;

      default:
        super.catch(exception, host);
        break;
    }
  }
}
