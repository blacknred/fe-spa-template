import { Category } from '..';

export const getCategoryOptions = (categories: Category[], defaultLabel = 'All categories') => [
  { label: defaultLabel, value: '' },
  ...categories.map(({ id: value, name: label }) => ({
    label,
    value,
  })),
];
