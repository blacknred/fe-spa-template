import { Button, Link } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { CreateAuthDto, createAuthDto, useCreateAuth } from '..';

export const CreateAuth = injectIntl(({ intl }: WrappedComponentProps) => {
  const { isPending, mutate, errors } = useCreateAuth();

  return (
    <div>
      <Form<CreateAuthDto, typeof createAuthDto>
        onSubmit={mutate}
        schema={createAuthDto}
      >
        {({ register, formState }) => (
          <>
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
              {intl.formatMessage({ id: 'title.auth' })}
            </Button>
          </>
        )}
      </Form>
      <div className="mt-4 flex items-center justify-center">
        <Link to="../register">
          {intl.formatMessage({ id: 'title.user.create' })}
        </Link>
      </div>
    </div>
  );
});


