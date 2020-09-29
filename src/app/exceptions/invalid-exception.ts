import { HttpException } from "@nestjs/common"

export class InvalidException extends HttpException {
  constructor(message: string) {
    super(message, 400)
  }
}