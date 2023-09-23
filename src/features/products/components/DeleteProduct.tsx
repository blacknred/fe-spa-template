import { Button, Dialog } from '@/components/Elements';
import { Authorization, POLICIES } from '@/features/auth';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { Product, useDeleteProduct } from '..';

type Props = WrappedComponentProps & {
  onSuccess: () => unknown;
  product: Product;
};

export const DeleteProduct = injectIntl(({ onSuccess, product, intl }: Props) => {
  const { isPending, isDone, mutate } = useDeleteProduct(product.id);

  useEffect(() => void (isDone && onSuccess()), [isDone, onSuccess]);

  const label = intl.formatMessage({ id: 'title.product.delete' });

  return (
    <Authorization check={POLICIES['product:delete'](product)}>
      <Dialog
        isDone={isDone}
        title={label}
        children={
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              {intl.formatMessage({ id: 'ui.warning' })}
            </p>
          </div>
        }
        cancelButtonText={intl.formatMessage({ id: 'ui.cancel' })}
        triggerButton={
          <Button variant="danger" size="sm" icon={<TrashIcon className="h-4 w-4" />} data-testid="delete-product" />
        }
        confirmButton={
          <Button isLoading={isPending} type="button" variant='danger' onClick={() => void mutate()}>
            {label}
          </Button>
        }
      />
    </Authorization>
  );
});

