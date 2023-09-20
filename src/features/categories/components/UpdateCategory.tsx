import { Button, Drawer } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { Authorization } from '@/features/auth';
import { Role } from '@/features/users';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { Category } from '..';
import { UpdateCategoryDto, updateCategoryDto, useUpdateCategory } from '../api/updateCategory';

type Props = WrappedComponentProps & {
  onSuccess: () => Promise<void>;
  category: Category;
};

export const UpdateCategory = injectIntl(({ onSuccess, intl, category }: Props) => {
  const { isPending, isDone, mutate, errors } = useUpdateCategory(category.id);

  useEffect(() => void (isDone && onSuccess()), [isDone, onSuccess]);

  const label = intl.formatMessage({ id: 'title.category.update' });

  return (
    <Authorization allowedRoles={[Role.admin]}>
      <Drawer
        isDone={isDone}
        title={label}
        triggerButton={
          <Button icon={<PencilIcon className="h-4 w-4" />} size="sm">
            {label}
          </Button>
        }
        submitButton={
          <Button form="update-category" type="submit" size="sm" isLoading={isPending}>
            {label}
          </Button>
        }
      >
        <Form<UpdateCategoryDto, typeof updateCategoryDto>
          schema={updateCategoryDto}
          id="update-category"
          onSubmit={mutate}
          options={{
            defaultValues: {
              name: category.name,
              image: category.image,
            },
          }}
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
