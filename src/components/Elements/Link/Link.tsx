import clsx from 'clsx';
import { LinkProps, Link as RouterLink } from 'react-router-dom';

export const Link = ({ className, children, ...props }: LinkProps) => (
  <RouterLink className={clsx('text-indigo-500 hover:text-indigo-900', className)} {...props}>
    {children}
  </RouterLink>
);