export const roleRights = {
  user: [],
  admin: ['getUsers', 'manageUsers'],
} as const;

export const roles = Object.keys(roleRights) as Role[];

export type Role = keyof typeof roleRights;
export type Permission = typeof roleRights[keyof typeof roleRights][number];
