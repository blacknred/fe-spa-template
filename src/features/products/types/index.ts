import { Category } from '@/features/categories';
import { User } from '@/features/users';
import { BaseEntity } from '@/types';

export type Product = {
  name: string;
  description: string;
  price: number;
  barcode: number;
  quantity: number;
  preview: string;
  images: string[];
  category: Category;
  author: Pick<User, 'id' | 'name'>;
} & BaseEntity;
