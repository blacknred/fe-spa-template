import { BaseEntity } from '@/types';

export type Category = BaseEntity & {
  name: string;
  image: string;
  authorId: BaseEntity['id'];
};
