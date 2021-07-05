import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';

const ROLES_KEY = 'roles';
const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);

export { ROLES_KEY, Roles };
