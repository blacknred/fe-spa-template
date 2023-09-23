import { Avatar, Entry, Spinner } from '@/components/Elements';
import { PageLayout } from '@/components/Layout';
import { NotFound } from '@/features/misc';
import { format, parseISO } from 'date-fns';
import { injectIntl } from 'react-intl';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategory } from '../api/getCategory';
import { DeleteCategory } from '../components/DeleteCategory';
import { UpdateCategory } from '../components/UpdateCategory';

export const Category = injectIntl(({ intl }) => {
  const { id = '' } = useParams();
  const navigate = useNavigate();
  const { isLoading, data, refetch } = useCategory(+id);

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) return <NotFound />;

  return (
    <PageLayout title={intl.formatMessage({ id: 'title.category' })}>
      <div className="bg-white dark:bg-gray-600 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between align-middle">
          <p className="mt-1 text-sm text-gray-500 flex-1">
            {intl.formatMessage({ id: 'title.category.details' })}
          </p>

          <UpdateCategory category={data} onSuccess={refetch} />
          <DeleteCategory category={data} onSuccess={() => navigate('..')} />
        </div>
        <div className="border-t border-gray-200 dark:border-gray-500 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y  sm:divide-gray-200 dark:sm:divide-gray-500">
            <Entry label={intl.formatMessage({ id: 'field.image' })} value={<Avatar size='xl' src={data.image} alt={data.name} variant='square' />} />
            <Entry label={intl.formatMessage({ id: 'field.name' })} value={data.name} />
            <Entry label={intl.formatMessage({ id: 'field.createdAt' })} value={format(parseISO(data.createdAt!), 'yyyy-LL-dd')} />
          </dl>
        </div>
      </div>
    </PageLayout>
  );
});
