import { useDisclosure } from '@/hooks/useDisclosure';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import * as React from 'react';
import { Fragment, ReactElement, ReactNode } from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';
import { Button } from '..';

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-xl',
  lg: 'max-w-3xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
};

type Props = {
  isDone: boolean;
  triggerButton: ReactElement;
  submitButton?: ReactElement;
  cancelButtonText?: string;
  title: string;
  children: ReactNode;
  size?: keyof typeof sizes;
} & WrappedComponentProps;

export const Drawer = injectIntl(({
  title,
  children,
  isDone,
  cancelButtonText,
  triggerButton,
  submitButton,
  size = 'md',
  intl,
}: Props) => {
  const { close, open, isOpen } = useDisclosure();

  React.useEffect(() => {
    if (isDone) close();
  }, [isDone, close]);

  return (
    <>
      {React.cloneElement(triggerButton, { onClick: () => open() })}
      <Transition.Root show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          static
          className="fixed inset-0 overflow-hidden z-40"
          open={isOpen}
          onClose={() => close()}
        >
          <div className="absolute inset-0 overflow-hidden">
            <Dialog.Overlay className="absolute inset-0" />
            <div className="fixed inset-y-0 right-0 sm:pl-10 max-w-full flex">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300 sm:duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className={clsx('w-screen', sizes[size])}>
                  <div className="h-full divide-y divide-gray-200 dark:sm:divide-gray-500 flex flex-col bg-white dark:bg-gray-800 shadow-xl">
                    <div className="min-h-0 flex-1 flex flex-col py-6 overflow-y-scroll">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900 dark:text-gray-100">
                            {title}
                          </Dialog.Title>
                          <div className="ml-3 h-7 flex items-center">
                            <button
                              className="bg-white rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                              onClick={() => close()}
                            >
                              <span className="sr-only">
                                {intl.formatMessage({ id: 'ui.panel.close' })}
                              </span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 relative flex-1 px-4 sm:px-6">{children}</div>
                    </div>
                    {submitButton && (
                      <div className="flex-shrink-0 px-4 py-4 flex justify-end space-x-2">
                        <Button variant="inverse" size="sm" onClick={() => close()}>
                          {cancelButtonText || intl.formatMessage({ id: 'ui.cancel' })}
                        </Button>
                        {submitButton}
                      </div>
                    )}
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
});
