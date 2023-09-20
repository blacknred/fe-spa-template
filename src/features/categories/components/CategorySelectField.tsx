import { SelectField } from '@/components/Form';
import { ComponentPropsWithRef } from 'react';
import { categoryOptions } from '..';
import { useCategories } from '../api';

type Props = Omit<ComponentPropsWithRef<typeof SelectField>, 'options'>;

export const CategorySelectField = (props: Props) => {
  const { data } = useCategories();

  return <SelectField key={data?.total} {...props} options={categoryOptions(data?.items || [])} />;
};
