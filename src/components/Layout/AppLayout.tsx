import { I18nCtx } from '@/App';
import logo from '@/assets/logo.svg';
import { APP_TITLE } from '@/config';
import { useAuth, useDeleteAuth } from '@/features/auth';
import { Role } from '@/features/users';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Locale } from '@/types';
import { localeDescriptions } from '@/utils';
import { Dialog, Listbox, Menu, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  CheckIcon,
  FolderIcon,
  HomeIcon,
  LanguageIcon,
  MoonIcon,
  SunIcon,
  TagIcon,
  UsersIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import clsx from "clsx";
import { Dispatch, Fragment, PropsWithChildren, SetStateAction, useContext, useState } from "react";
import { Toaster } from "react-hot-toast";
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { NavLink, NavLinkProps } from "react-router-dom";
import { Avatar, Link } from '../Elements';

type NavigationItem = Pick<NavLinkProps, 'to'> & {
  name: string;
  icon?: typeof HomeIcon;
  onClick?: () => Promise<void>;
};

type MobileSidebarProps = WrappedComponentProps & {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const Logo = () => (
  <Link className="flex items-center" to=".">
    <img className="h-6 w-auto mr-3" src={logo} alt="Workflow" />
    <span className="text-xl text-white font-semibold">{APP_TITLE}</span>
  </Link>
);


const SideNavigation = injectIntl(({ intl }: WrappedComponentProps) => {
  const { checkRole } = useAuth();

  const navigation: NavigationItem[] = [
    { name: intl.formatMessage({ id: 'title.dashboard' }), to: '.', icon: HomeIcon },
  ];

  if (checkRole([Role.admin, Role.manager])) {
    navigation.push(
      { name: intl.formatMessage({ id: 'title.categories' }), to: './categories', icon: TagIcon },
      { name: intl.formatMessage({ id: 'title.products' }), to: './products', icon: FolderIcon }
    )
  }

  if (checkRole([Role.admin])) {
    navigation.push({
      name: intl.formatMessage({ id: 'title.users' }),
      to: './users',
      icon: UsersIcon,
    })
  }

  return (
    <>
      {navigation.map(({ name, to, icon: Icon }, index) => (
        <NavLink end={index === 0} key={name} to={to}
          className={({ isActive }) => clsx(
            isActive ? "bg-gray-900 text-white" : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'flex items-center px-2 py-2 text-base font-medium rounded-md'
          )}
        >
          {Icon && <Icon aria-hidden="true" className='mr-4 flex-shrink-0 h-6 w-6' />}
          {name}
        </NavLink>
      ))}
    </>
  );
});

const Sidebar = () => (
  <div className="hidden md:flex md:flex-shrink-0">
    <div className="flex flex-col w-64">
      <div className="flex flex-col h-0 flex-1">
        <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-900">
          <Logo />
        </div>
        <div className="flex-1 flex flex-col overflow-y-auto">
          <nav className="flex-1 px-2 py-4 bg-gray-800 space-y-1">
            <SideNavigation />
          </nav>
        </div>
      </div>
    </div>
  </div>
);

const MobileSidebar = injectIntl(({ sidebarOpen, setSidebarOpen, intl }: WrappedComponentProps & MobileSidebarProps) => (
  <Transition.Root show={sidebarOpen} as={Fragment}>
    <Dialog
      as="div"
      static
      className="fixed inset-0 flex z-40 md:hidden"
      open={sidebarOpen}
      onClose={setSidebarOpen}
    >
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <button
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={() => setSidebarOpen(false)}
              >
                <span className="sr-only">
                  {intl.formatMessage({ id: 'ui.sidebar.close' })}
                </span>
                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
              </button>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 flex items-center px-4">
            <Logo />
          </div>
          <div className="mt-5 flex-1 h-0 overflow-y-auto">
            <nav className="px-2 space-y-1">
              <SideNavigation />
            </nav>
          </div>
        </div>
      </Transition.Child>
      <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
    </Dialog>
  </Transition.Root>
));

const DarkModeSwitch = () => {
  const [isDarkMode, toggleDark] = useDarkMode(document.documentElement);

  return (
    <button onClick={toggleDark}>
      {isDarkMode ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
    </button>
  )
}

const IntlSelect = () => {
  const ctx = useContext(I18nCtx);

  return ctx && (
    <Listbox value={ctx.locale} onChange={ctx.setLocale}>
      <Listbox.Button className="ml-6 ">
        <span className="sr-only">{ctx.locale}</span>
        <LanguageIcon className='w-5 h-5' />
      </Listbox.Button>
      <Listbox.Options className="absolute  mt-16 mr-8 max-h-60 overflow-auto rounded-md bg-white dark:bg-black  py-1 text-base shadow-lg  sm:text-sm   ring-1 ring-black ring-opacity-5 focus:outline-none">
        {Object.values(Locale).map((lang) => (
          <Listbox.Option
            key={lang}
            value={lang}
            className={({ active }) => clsx('relative select-none py-2 pl-10 pr-4', active ? 'bg-gray-100 dark:bg-gray-500' : '')}
          >
            {({ selected }) => (
              <>
                <span className={`${selected ? 'font-medium' : 'font-normal'}`}>{localeDescriptions[lang]}</span>
                {selected && (
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-success">
                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                  </span>
                )}
              </>
            )}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}

const UserNavigation = injectIntl(({ intl }: WrappedComponentProps) => {
  const { mutate } = useDeleteAuth();
  const { profile } = useAuth();

  const userNavigation: NavigationItem[] = [
    { onClick: () => mutate(), name: intl.formatMessage({ id: 'ui.usermenu.logout' }), to: {} },
  ];

  return (
    <Menu as="div" className="ml-6 mt-2 relative">
      {({ open }) => (
        <>
          <Menu.Button className="max-w-xs bg-gray-200 dark:bg-gray-500 p-1 flex items-center rounded-full">
            <span className="sr-only">
              {intl.formatMessage({ id: 'ui.usermenu.open' })}
            </span>
            <Avatar variant='round' size='sm' src={profile?.image} alt={profile?.name || ''} />
          </Menu.Button>

          {open && <Menu.Items
            static
            className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-black ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            {userNavigation.map(({ name, to, onClick }) => (
              <Menu.Item key={name} as={Fragment}>
                {({ active }) => {
                  const className = clsx(active ? 'bg-gray-100 dark:bg-gray-500' : '', 'block px-4 py-2 text-sm');
                  // if (to) <div onClick={onClick} className={className}>{name}</div>
                  return <Link onClick={onClick} to={to} className={className}>{name}</Link>
                }}
              </Menu.Item>
            ))}
          </Menu.Items>}
        </>
      )}
    </Menu>
  );
});

export const AppLayout = injectIntl(({ children, intl }: PropsWithChildren & WrappedComponentProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="h-screen flex overflow-hidden">
        <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <Sidebar />

        <div className="flex flex-col w-0 flex-1 overflow-hidden  bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white">
          <div className="relative z-10 flex-shrink-0 flex h-16 shadow dark:shadow-gray-500">
            <button
              className="px-4 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">
                {intl.formatMessage({ id: 'ui.sidebar.open' })}
              </span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            <div className="flex-1 px-4 flex justify-end">
              <DarkModeSwitch />

              <IntlSelect />

              <UserNavigation />
            </div>
          </div>

          <main className="flex-1 relative overflow-y-auto focus:outline-none">{children}</main>
        </div>
      </div>

      <Toaster position="bottom-left" reverseOrder={false} />
    </>
  );
});
