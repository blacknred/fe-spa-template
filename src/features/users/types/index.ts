import { BaseEntity } from '@/types';

export enum Role {
  customer = 'customer',
  manager = 'manager',
  admin = 'admin',
}

export type User = {
  email: string;
  name: string;
  role: Role;
  phone?: string;
  city?: string;
  image?: string;
  online: boolean;
} & BaseEntity;
