import { Avatar, Entry, Spinner } from '@/components/Elements';
import { PageLayout } from '@/components/Layout';
import { format, parseISO } from 'date-fns';
import { injectIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useUser } from '../api';
import { NotFound } from '@/features/misc';

export const User = injectIntl(({ intl }) => {
  const { id = '' } = useParams();
  const { isLoading, data } = useUser(+id);

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) return <NotFound />;

  return (
    <PageLayout title={intl.formatMessage({ id: 'title.user' }) + ` #${id}`}>
      <div className="bg-white dark:bg-gray-600 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{intl.formatMessage({ id: 'title.user.details' })}</p>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-500 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y  sm:divide-gray-200 dark:sm:divide-gray-500">
            <Entry label={intl.formatMessage({ id: 'field.image' })} value={<Avatar size='xl' src={data.image} alt={data.name} variant='square' />} />
            <Entry label={intl.formatMessage({ id: 'field.name' })} value={data.name} />
            <Entry label={intl.formatMessage({ id: 'field.email' })} value={data.email} />
            <Entry label={intl.formatMessage({ id: 'field.role' })} value={data.role} />
            <Entry label={intl.formatMessage({ id: 'field.city' })} value={data.city || '-'} />
            <Entry label={intl.formatMessage({ id: 'field.phone' })} value={data.phone || '-'} />
            <Entry label={intl.formatMessage({ id: 'field.createdAt' })} value={format(parseISO(data.createdAt!), 'yyyy-LL-dd')} />
          </dl>
        </div>
      </div>
    </PageLayout>
  );
});
