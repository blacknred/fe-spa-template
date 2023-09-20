import { Category } from '..';

export const categoryOptions = (categories: Category[]) => [
  { label: 'All categories', value: 0 },
  ...categories.map(({ id: value, name: label }) => ({
    label,
    value,
  })),
];
