type Props = React.PropsWithChildren<{ title: string }>;

export const PageLayout = ({ children, title }: Props) => (
  <div className="py-6">
    <div className="mb-4 px-4 sm:px-6 md:px-8">
      <h1 className="text-2xl font-semibold">{title}</h1>
    </div>
    <div className="mx-auto px-4 sm:px-6 md:px-8">{children}</div>
  </div>
);