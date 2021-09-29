const allRoles = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
} as const;

export type Roles = keyof typeof allRoles;
export type Permissions = typeof allRoles[keyof typeof allRoles][number];

export const roles = Object.keys(allRoles) as Roles[];
export const roleRights = new Map<Roles, Permissions>(Object.entries(allRoles));
