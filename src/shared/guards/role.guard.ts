import { Reflector } from '@nestjs/core';
import { ROLE_KEY } from '../decorators/role.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(ctx: ExecutionContext): boolean {
    let requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLE_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);

    if (!requiredRoles) return true;

    if (!Array.isArray(requiredRoles)) {
      requiredRoles = [requiredRoles];
    }

    const { user } = ctx.switchToHttp().getRequest();
    const role: string = user?.role;

    if (!role) return false;

    return requiredRoles.includes(role);
  }
}
