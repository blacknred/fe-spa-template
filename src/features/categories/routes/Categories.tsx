import { PageLayout } from '@/components/Layout';
import { injectIntl } from 'react-intl';
import { CategoryList } from '../components/CategoryList';

export const Categories = injectIntl(({ intl }) => (
  <PageLayout title={intl.formatMessage({ id: 'title.categories' })}>
    <CategoryList />
  </PageLayout>
));
