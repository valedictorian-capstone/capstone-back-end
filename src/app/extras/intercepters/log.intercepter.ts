import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from 'rxjs/operators';

@Injectable()
export class LogRequestInterceptor implements NestInterceptor {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<any> {
    const req = ctx.switchToHttp().getRequest();
    next.handle().pipe(tap(a => console.log(a)))
    Logger.log(ctx.getClass().name + " " + ctx.getHandler().name + " param " + JSON.stringify(req.params) + " body " + JSON.stringify(req.body), `Request ${req.method} ${req.url}`)
    return next.handle().pipe(
      tap((ev) => {
        Logger.log(ctx.getClass().name + " " + ctx.getHandler().name + "param " + JSON.stringify(ev), "Response")
      })
    )
  }
}