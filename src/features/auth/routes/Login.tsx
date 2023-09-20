import { injectIntl } from 'react-intl';
import { CreateAuth } from '../components/CreateAuth';
import { Layout } from '../components/Layout';

export const Login = injectIntl(({ intl }) => (
  <Layout title={intl.formatMessage({ id: 'title.auth' })}>
    <CreateAuth />
  </Layout>
));
