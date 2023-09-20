import type { Product } from "@/features/products";
import { Role, User } from "@/features/users";
import type { PropsWithChildren, ReactNode } from "react";
import { useAuth } from "..";

type Props = PropsWithChildren<{
  forbiddenFallback?: ReactNode;
} & (
    | {
      allowedRoles: Role[];
      check?: never;
    } | {
      allowedRoles?: never;
      check: (user: User) => boolean;
    })>

// eslint-disable-next-line react-refresh/only-export-components
export const POLICIES = {
  'product:delete': (product: Product) => (user: User) => {
    return user.role === Role.admin || product.author.id === user.id;
  },
  'product:update': function (product: Product) {
    return this["product:delete"](product);
  },
};

export const Authorization = ({
  check,
  allowedRoles,
  forbiddenFallback = null,
  children,
}: Props) => {
  const { checkRole, profile } = useAuth();
  let canAccess = false;

  if (allowedRoles) canAccess = checkRole(allowedRoles);
  if (check) canAccess = check(profile!);

  return canAccess ? children : forbiddenFallback;
};
