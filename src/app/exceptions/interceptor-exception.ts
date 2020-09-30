import { HttpException } from "@nestjs/common"

export class InterceptorException extends HttpException {
  constructor(message: string) {
    super(message, 500)
  }
}