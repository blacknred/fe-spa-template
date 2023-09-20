import logo from '@/assets/logo.svg';
import { Link } from '@/components/Elements';
import { PropsWithChildren } from 'react';
import { Toaster } from 'react-hot-toast';

type Props = PropsWithChildren<{ title: string }>;

export const Layout = ({ children, title }: Props) => (
  <>
    <div className="min-h-screen flex flex-col justify-center items-center mx-auto bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
      <Link to="/">
        <img className="h-16 w-auto" src={logo} alt="logo" />
      </Link>

      <h2 className="text-3xl mt-3 font-extrabold tracking-tight">{title}</h2>

      <div className="mt-4 sm:mx-auto w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-600 py-8 px-4 sm:rounded-lg sm:px-10">{children}</div>
      </div>
    </div>

    <Toaster position="top-center" reverseOrder={false} />
  </>
);