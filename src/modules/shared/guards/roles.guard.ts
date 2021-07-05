import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '@App/common/auth/roles.decorator';
import { Role } from '@App/common/auth/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) return false;

    const { user } = context.switchToHttp().getRequest();
    if (!user) return false;

    const hasPermission = requiredRoles.some((role) => role === user.role);

    return hasPermission;
  }
}
