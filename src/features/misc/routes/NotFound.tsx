import { Link } from "@/components/Elements";
import { WrappedComponentProps, injectIntl } from "react-intl";

export const NotFound = injectIntl(({ intl }: WrappedComponentProps) => (
  <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 text-center">
    <h1 className="mb-8 text-5xl">404</h1>
    <p className="mb-4">{intl.formatMessage({ id: 'title.404' })}</p>
    <Link to={'-1'} className="font-medium rounded-lg text-xl">{intl.formatMessage({ id: 'ui.return' })}</Link>
  </div>
))