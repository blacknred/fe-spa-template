import { SelectField } from '@/components/Form';
import { ComponentPropsWithRef } from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { getCategoryOptions } from '..';
import { useCategories } from '../api';

type Props = Omit<ComponentPropsWithRef<typeof SelectField>, 'options'> & WrappedComponentProps;

export const CategorySelectField = injectIntl(({ intl, ...props }: Props) => {
  const { data } = useCategories('limit=100');

  const options = getCategoryOptions(data?.items || [], intl.formatMessage({ id: 'title.categories.all' }))
  return <SelectField key={data?.total} {...props} options={options} />;
});
