import { Button, Dialog } from '@/components/Elements';
import { Authorization } from '@/features/auth';
import { Role } from '@/features/users';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { useDeleteCategory } from '../api';
import { Category } from '..';

type Props = WrappedComponentProps & {
  onSuccess: () => unknown;
  category: Category;
};

export const DeleteCategory = injectIntl(({ onSuccess, category, intl }: Props) => {
  const { isPending, isDone, mutate } = useDeleteCategory(category.id);

  useEffect(() => void (isDone && onSuccess()), [isDone, onSuccess]);

  const label = intl.formatMessage({ id: 'title.category.delete' });

  return (
    <Authorization allowedRoles={[Role.admin]}>
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
          <Button variant="danger" icon={<TrashIcon className="h-4 w-4" />}  data-testid="delete-category"/>
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

