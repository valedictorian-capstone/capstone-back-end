import { HttpException } from "@nestjs/common"

export class InvalidException extends HttpException {
  constructor() {
    super('BAD REQUEST', 400)
  }
}