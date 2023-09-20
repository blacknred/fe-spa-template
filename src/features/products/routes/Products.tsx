import { PageLayout } from "@/components/Layout";
import { injectIntl } from "react-intl";
import { ProductList } from "../components/ProductList";

export const Products = injectIntl(({ intl }) => (
  <PageLayout title={intl.formatMessage({ id: 'title.products' })}>
    <ProductList />
  </PageLayout>
));
