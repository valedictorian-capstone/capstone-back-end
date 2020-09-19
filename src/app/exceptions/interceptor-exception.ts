import { HttpException } from "@nestjs/common"

export class InterceptorException extends HttpException {
  constructor() {
    super('INTERNAL ERROR', 500)
  }
}