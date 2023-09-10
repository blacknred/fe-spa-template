import { z } from 'zod';

export enum Order {
  asc = 'asc',
  desc = 'desc',
}

export enum Locale {
  en = 'en-EN',
  ru = 'ru-RU',
}

export type BaseEntity = {
  id: number;
  createdAt?: string;
  updatedAt?: string;
};

export const paginatedSearchParamsSchema = z.object({
  text: z.string().optional(),
  limit: z.string().min(1),
  offset: z.string().min(0),
  'sort.order': z.nativeEnum(Order),
  'sort.field': z.string(),
});

export type PaginatedRequestDto<
  Data extends BaseEntity = BaseEntity,
  Filters extends keyof Data = keyof Data,
> = z.infer<typeof paginatedSearchParamsSchema> & Pick<Partial<Data>, Filters>;

export type PaginatedResponseDto<Data extends BaseEntity = BaseEntity> = {
  items: Data[];
  total: number;
  hasMore: boolean;
};
