import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type Props = FieldWrapperPassThroughProps & {
  className?: string;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const TextAreaField = ({ label, className, registration, error, placeholder }: Props) => (
  <FieldWrapper id={registration.name} label={label} error={error}>
    <textarea
      placeholder={placeholder}
      aria-invalid={error?.message ? 'true' : 'false'}
      className={clsx(
        'appearance-none dark:bg-gray-600 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm',
        className
      )}
      {...registration}
    />
  </FieldWrapper>
);
