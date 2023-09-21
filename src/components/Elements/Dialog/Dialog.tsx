import { useDisclosure } from '@/hooks/useDisclosure';
import { Transition, Dialog as UIDialog } from '@headlessui/react';
import { Fragment, PropsWithChildren, ReactElement, cloneElement, useEffect, useRef } from 'react';
import { Button } from '..';

type Props = PropsWithChildren<{
  triggerButton: ReactElement;
  confirmButton: ReactElement;
  title: string;
  cancelButtonText?: string;
  isDone?: boolean;
}>;

export const Dialog = ({ isDone, triggerButton, children, confirmButton, title, cancelButtonText }: Props) => {
  const { close, open, isOpen } = useDisclosure();
  const cancelButtonRef = useRef(null);

  useEffect(() => {
    if (isDone) close()
  }, [isDone, close]);

  return (
    <>
      {cloneElement(triggerButton, { onClick: () => open() })}
      <Transition.Root show={isOpen} as={Fragment}>
        <UIDialog
          as="div"
          static
          className="fixed z-10 inset-0 overflow-y-auto"
          open={isOpen}
          onClose={() => close()}
          initialFocus={cancelButtonRef}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <UIDialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* center the modal content */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                
                {/* content */}
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <UIDialog.Title as="h3" className="text-gray-500 dark:text-gray-200 text-lg leading-6 font-medium">
                      {title}
                    </UIDialog.Title>
                    {children}
                  </div>
                </div>
                {/* content */}

                <div className="mt-4 flex space-x-2 justify-end">
                  <Button
                    type="button"
                    variant="inverse"
                    className="w-full inline-flex justify-center rounded-md border focus:ring-1 focus:ring-offset-1 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    onClick={() => close()}
                    ref={cancelButtonRef}
                  >
                    {cancelButtonText}
                  </Button>
                  {confirmButton}
                </div>
              </div>
            </Transition.Child>
          </div>
        </UIDialog>
      </Transition.Root>
    </>
  );
};
