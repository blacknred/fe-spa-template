import { ReactNode } from "react";

type Props = {
  label: string;
  value: ReactNode;
};

export const Entry = ({ label, value }: Props) => (
  <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm font-medium">{label}</dt>
    <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{value}</dd>
  </div>
);