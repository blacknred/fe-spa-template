import logo from '@/assets/logo.svg';
import { Button, Link } from '@/components/Elements';
import { APP_TITLE } from '@/config';
import { injectIntl } from 'react-intl';

export const Landing = injectIntl(({ intl }) => (
  <div className="min-h-screen flex flex-col justify-center items-center mx-auto bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
    <Link to="/">
      <img className="h-16 w-auto" src={logo} alt="logo" />
    </Link>

    <h2 className="text-3xl mt-3 mb-28 font-extrabold tracking-tight">
      {APP_TITLE}
    </h2>

    <Link to={'/auth/login'} >
      <Button className='animate-fadeIn'>
        {intl.formatMessage({ id: 'title.auth' })}
      </Button>
    </Link>
  </div>
))




