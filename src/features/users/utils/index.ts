import { Role } from '..';

export const roleOptions = [
  { label: 'All roles', value: '' },
  ...Object.keys(Role).map((role) => ({
    label: role,
    value: role,
  })),
];
