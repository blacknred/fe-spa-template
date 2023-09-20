import { Button, Drawer } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { Authorization } from '@/features/auth';
import { Role } from '@/features/users';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { CreateCategoryDto, createCategoryDto, useCreateCategory } from '../api';

type Props = WrappedComponentProps & {
  onSuccess: () => Promise<void>;
};

export const CreateCategory = injectIntl(({ onSuccess, intl }: Props) => {
  const { isDone, isPending, mutate, errors } = useCreateCategory();

  useEffect(() => void (isDone && onSuccess()), [isDone, onSuccess]);

  const label = intl.formatMessage({ id: 'title.category.create' });

  return (
    <Authorization allowedRoles={[Role.admin]}>
      <Drawer
        isDone={isDone}
        title={label}
        triggerButton={
          <Button size="sm" icon={<PlusIcon className="h-4 w-4" />}>
            {label}
          </Button>
        }
        submitButton={
          <Button form="create-category" type="submit" size="sm" isLoading={isPending}>
            {label}
          </Button>
        }
      >
        <Form<CreateCategoryDto, typeof createCategoryDto>
          schema={createCategoryDto}
          id="create-category"
          onSubmit={mutate}
        >
          {({ register, formState }) => (
            <>
              <InputField
                label={intl.formatMessage({ id: 'field.name' })}
                error={formState.errors['name'] || errors?.['name']}
                registration={register('name')}
              />
              <InputField
                label={intl.formatMessage({ id: 'field.image' })}
                error={formState.errors['image'] || errors?.['image']}
                registration={register('image')}
              />
            </>
          )}
        </Form>
      </Drawer>
    </Authorization>
  );
});



