import { Button, Drawer } from '@/components/Elements';
import { Form, InputField, TextAreaField } from '@/components/Form';
import { Authorization } from '@/features/auth';
import { CategorySelectField } from '@/features/categories';
import { Role } from '@/features/users';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useEffect } from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { CreateProductDto, createProductDto, useCreateProduct } from '../api/createProduct';

type Props = WrappedComponentProps & {
  onSuccess: () => Promise<void>;
};

export const CreateProduct = injectIntl(({ onSuccess, intl }: Props) => {
  const { isDone, isPending, mutate, errors } = useCreateProduct();

  useEffect(() => void (isDone && onSuccess()), [isDone, onSuccess]);

  const label = intl.formatMessage({ id: 'title.product.create' });

  return (
    <Authorization allowedRoles={[Role.admin, Role.manager]}>
      <Drawer
        isDone={isDone}
        title={label}
        triggerButton={
          <Button size="sm" icon={<PlusIcon className="h-4 w-4" />}>
            {label}
          </Button>
        }
        submitButton={
          <Button form="create-product" type="submit" size="sm" isLoading={isPending}>
            {label}
          </Button>
        }
      >
        <Form<CreateProductDto, typeof createProductDto>
          onSubmit={mutate}
          schema={createProductDto}
          id="create-product"
          options={{ defaultValues: { images: [] } }}
        >
          {({ formState, register }) => (
            <>
              <CategorySelectField
                label={intl.formatMessage({ id: 'field.category' })}
                error={formState.errors['categoryId'] || errors?.['categoryId']}
                registration={register('categoryId', { valueAsNumber: true })}
              />
              <InputField
                label={intl.formatMessage({ id: 'field.title' })}
                error={formState.errors['name'] || errors?.['name']}
                registration={register('name')}
              />
              <TextAreaField
                label={intl.formatMessage({ id: 'field.description' })}
                error={formState.errors['description'] || errors?.['description']}
                registration={register('description')}
              />
              <InputField
                label={intl.formatMessage({ id: 'field.price' })}
                error={formState.errors['price'] || errors?.['price']}
                registration={register('price', { valueAsNumber: true })}
                type='number'
              />
              <InputField
                label={intl.formatMessage({ id: 'field.quantity' })}
                error={formState.errors['quantity'] || errors?.['quantity']}
                registration={register('quantity', { valueAsNumber: true })}
                type='number'
              />
              <InputField
                label={intl.formatMessage({ id: 'field.image' })}
                error={formState.errors['preview'] || errors?.['preview']}
                registration={register('preview')}
              />
            </>
          )}
        </Form>
      </Drawer>
    </Authorization>
  );
});

