import { Button, Link } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useEffect } from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { CreateUserDto, createUserDto, useCreateUser } from '../api';

type Props = WrappedComponentProps & { onSuccess: () => void; };

export const CreateUser = injectIntl(({ onSuccess, intl }: Props) => {
  const { isDone, isPending, mutate, errors } = useCreateUser();

  useEffect(() => void (isDone && onSuccess()), [isDone, onSuccess])

  return (
    <div>
      <Form<CreateUserDto, typeof createUserDto>
        onSubmit={mutate}
        schema={createUserDto}
        id="create-user"
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label={intl.formatMessage({ id: 'field.name' })}
              error={formState.errors['name'] || errors?.['name']}
              registration={register('name')}
            />
            <InputField
              type="email"
              label={intl.formatMessage({ id: 'field.email' })}
              error={formState.errors['email'] || errors?.['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label={intl.formatMessage({ id: 'field.password' })}
              error={formState.errors['password'] || errors?.['password']}
              registration={register('password')}
            />
            <Button isLoading={isPending} type="submit" className="w-full">
              {intl.formatMessage({ id: 'title.user.create' })}
            </Button>
          </>
        )}
      </Form>
      <div className="mt-4 flex items-center justify-center">
        <Link to="../login" >
          {intl.formatMessage({ id: 'title.auth' })}
        </Link>
      </div>
    </div>
  );
});

