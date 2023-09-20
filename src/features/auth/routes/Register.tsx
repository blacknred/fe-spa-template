import { CreateUser } from '@/features/users';
import { injectIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';

export const Register = injectIntl(({ intl }) => {
  const navigate = useNavigate();

  return (
    <Layout title={intl.formatMessage({ id: 'title.user.create' })}>
      <CreateUser onSuccess={() => navigate('/auth/login')} />
    </Layout>
  );
});

