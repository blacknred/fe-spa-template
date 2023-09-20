import { PageLayout } from "@/components/Layout";
import { injectIntl } from "react-intl";
import { UserList } from "../components/UserList";

export const Users = injectIntl(({ intl }) => (
  <PageLayout title={intl.formatMessage({ id: 'title.users' })}>
    <UserList />
  </PageLayout>
));
