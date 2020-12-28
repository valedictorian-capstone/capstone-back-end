import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { EmployeeService } from "@services";
import { Observable } from "rxjs";

export class RolesGuard implements CanActivate {
  constructor(
    private reflecter: Reflector,
    private employeeService: EmployeeService
  ) { }

  canActivate(ctx: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflecter.get<string[]>('roles', ctx.getHandler());
    if (!roles) {
      return true;
    }
    const request = ctx.switchToHttp().getRequest();
    console.log(request)
    const employee = request.employee;
    return true;
  }
}