import { Role } from '..';

export const getRoleOptions = (defaultLabel = 'All roles') => [
  { label: defaultLabel, value: '' },
  ...Object.keys(Role).map((role) => ({
    label: role,
    value: role,
  })),
];
