import { Avatar, Entry, Spinner } from '@/components/Elements';
import { PageLayout } from '@/components/Layout';
import { format, parseISO } from 'date-fns';
import { injectIntl } from 'react-intl';
import { useParams } from 'react-router-dom';
import { useProduct } from '..';
import { UpdateProduct } from '../components/UpdateProduct';
import { NotFound } from '@/features/misc';

export const Product = injectIntl(({ intl }) => {
  const { id = '' } = useParams();
  const { isLoading, data, refetch } = useProduct(+id);

  if (isLoading) {
    return (
      <div className="w-full h-48 flex justify-center items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!data) return <NotFound />;

  return (
    <PageLayout title={intl.formatMessage({ id: 'title.product' }) + ` #${id}`}>
      <div className="bg-white dark:bg-gray-600 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between align-middle">
          <p className="mt-1 max-w-2xl text-sm">
            {intl.formatMessage({ id: 'title.product.details' })}
          </p>
          <UpdateProduct product={data} onSuccess={refetch} />
        </div>
        <div className="border-t border-gray-200 dark:border-gray-500 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-gray-500">
            <Entry label={intl.formatMessage({ id: 'field.image' })} value={<Avatar size='xl' src={data.preview} alt={data.name} variant='square' />} />
            <Entry label={intl.formatMessage({ id: 'field.name' })} value={data.name} />
            <Entry label={intl.formatMessage({ id: 'field.description' })} value={data.description} />
            <Entry label={intl.formatMessage({ id: 'field.category' })} value={data.category.name} />
            <Entry label={intl.formatMessage({ id: 'field.price' })} value={data.price} />
            <Entry label={intl.formatMessage({ id: 'field.quantity' })} value={data.quantity} />
            <Entry label={intl.formatMessage({ id: 'field.barcode' })} value={data.barcode} />
            <Entry label={intl.formatMessage({ id: 'field.author' })} value={data.author.name} />
            <Entry label={intl.formatMessage({ id: 'field.createdAt' })} value={format(parseISO(data.createdAt!), 'yyyy-LL-dd')} />
          </dl>
        </div>
      </div>
    </PageLayout>
  );
});
