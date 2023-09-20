import { PageLayout } from '@/components/Layout';
import { Authorization, useAuth } from '@/features/auth';
import { Role } from '@/features/users';
import { injectIntl } from 'react-intl';

export const Dashboard = injectIntl(({ intl }) => {
  const { profile } = useAuth();

  return (
    <PageLayout title={intl.formatMessage({ id: 'title.dashboard' })}>
      <h4 className="mt-2">{intl.formatMessage({ id: 'title.dashboard.greeting' })} <b>{profile?.name}</b></h4>
      <h4 className="my-3">{intl.formatMessage({ id: 'title.dashboard.role' })}: <b>{profile?.role}</b></h4>
      <h4><i>{intl.formatMessage({ id: 'title.dashboard.permissions' })}:</i></h4>

      <ul className="my-4 list-inside list-disc">
        <Authorization allowedRoles={[Role.admin, Role.manager]}>
          <li>{intl.formatMessage({ id: 'title.products.observe' })}</li>
          <li>{intl.formatMessage({ id: 'title.product.create' })}</li>
          <li>{intl.formatMessage({ id: 'title.product.update' })}</li>
          <li>{intl.formatMessage({ id: 'title.product.delete' })}</li>
          <li>{intl.formatMessage({ id: 'title.categories.observe' })}</li>
        </Authorization>

        <Authorization allowedRoles={[Role.admin]}>
          <li>{intl.formatMessage({ id: 'title.category.create' })}</li>
          <li>{intl.formatMessage({ id: 'title.category.update' })}</li>
          <li>{intl.formatMessage({ id: 'title.category.delete' })}</li>
          <li>{intl.formatMessage({ id: 'title.users.observe' })}</li>
        </Authorization>
      </ul>

      {/* <h4 className="my-3">{intl.formatMessage({ id: 'title.dashboard.stats' })}:</h4>
      <ul className="my-4 list-inside list-disc">
        <li>{intl.formatMessage({ id: 'title.dashboard.total.users' })}: 12</li>
        <li>{intl.formatMessage({ id: 'title.dashboard.total.categories' })}: 18</li>
        <li>{intl.formatMessage({ id: 'title.dashboard.total.products' })}: 245</li>
      </ul> */}
    </PageLayout>
  );
});