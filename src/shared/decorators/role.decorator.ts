import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';
export const Role = (roles: string | string[]) => {
  const rolesArray = Array.isArray(roles) ? roles : [roles];
  return SetMetadata(ROLE_KEY, rolesArray);
};
