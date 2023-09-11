import clsx from 'clsx';
import { forwardRef } from 'react';
import { Spinner } from '../Spinner';

const variants = {
  success: 'bg-success text-white',
  danger: 'bg-danger text-white',
  inverse: 'bg-primary text-primary dark:text-white ',
};

const sizes = {
  xs: 'py-2 px-2 text-sm',
  sm: 'py-2 px-4 text-sm',
  md: 'py-2 px-6 text-md',
  lg: 'py-3 px-8 text-lg',
};

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  icon?: React.ReactElement;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      type = 'button',
      variant = 'success',
      size = 'md',
      className = '',
      isLoading = false,
      icon,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      type={type}
      {...props}
      className={clsx(
        'flex justify-center items-center border border-gray-300 dark:border-gray-500 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={props.disabled || isLoading}
    >
      {isLoading ? <Spinner size="sm" /> : icon}
      <span className={clsx(icon ? "hidden lg:block" : "", props.children ? 'mx-2' : '')}>
        {props.children}
      </span>
    </button>
  ));


Button.displayName = 'Button';