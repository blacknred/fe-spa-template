import { Button, Drawer } from '@/components/Elements';
import { Form, InputField, TextAreaField } from '@/components/Form';
import { Authorization, POLICIES } from '@/features/auth';
import { CategorySelectField } from '@/features/categories';
import { PencilIcon } from '@heroicons/react/24/solid';
import { useEffect } from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { Product, UpdateProductDto, updateProductDto, useUpdateProduct } from '..';

type Props = WrappedComponentProps & {
  onSuccess: () => Promise<void>;
  product: Product;
};

export const UpdateProduct = injectIntl(({ onSuccess, intl, product }: Props) => {
  const { isPending, isDone, mutate, errors } = useUpdateProduct(product.id);

  useEffect(() => void (isDone && onSuccess()), [isDone, onSuccess]);

  const label = intl.formatMessage({ id: 'title.product.update' });

  return (
    <Authorization check={POLICIES['product:update'](product)}>
      <Drawer
        isDone={isDone}
        title={label}
        triggerButton={
          <Button size="sm" icon={<PencilIcon className="h-4 w-4" />}>
            {label}
          </Button>
        }
        submitButton={
          <Button form="update-product" type="submit" size="sm" isLoading={isPending}>
            {label}
          </Button>
        }
      >
        <Form<UpdateProductDto, typeof updateProductDto>
          id="update-product"
          onSubmit={mutate}
          schema={updateProductDto}
          options={{
            defaultValues: {
              name: product.name,
              description: product.description,
              price: product.price,
              quantity: product.quantity,
              categoryId: +product.category.id,
              preview: product.preview,
              images: []
            },
          }}
        >
          {({ register, formState }) => (
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
