import clsx from 'clsx';
import { FieldError } from 'react-hook-form';

type Props = {
  id?: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  description?: string;
};

export type FieldWrapperPassThroughProps = Omit<Props, 'className' | 'children' | 'id'>;

export const FieldWrapper = ({ id, label, className, error, children }: Props) => (
  <div>
    <label htmlFor={id} className={clsx('block text-sm font-medium text-gray-700 dark:text-gray-300', className)}>
      {label}
      <div className="mt-1">{children}</div>
    </label>
    {error?.message && (
      <div role="alert" className="text-sm font-semibold text-danger">
        {error.message}
      </div>
    )}
  </div>
);

