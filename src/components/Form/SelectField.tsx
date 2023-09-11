import clsx from 'clsx';
import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type Option = {
  label: React.ReactNode;
  value: string | number | string[] | undefined;
};

type Props = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  registration: Partial<UseFormRegisterReturn>;
};

export const SelectField = ({ label, options, error, className, defaultValue, registration, placeholder }: Props) => (
  <FieldWrapper id={registration.name} label={label} error={error}>
    <select
      placeholder={placeholder}
      defaultValue={defaultValue}
      aria-invalid={error?.message ? 'true' : 'false'}
      className={clsx(
        'mt-1 block w-full pl-3 pr-10 py-2 text-base dark:bg-gray-600  border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md',
        className
      )}
      {...registration}
    >
      {options.map(({ label, value }) => (
        <option key={label?.toString()} value={value}>
          {label}
        </option>
      ))}
    </select>
  </FieldWrapper>
);
