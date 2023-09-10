import { Dispatch, PropsWithChildren, SetStateAction, createContext, useEffect, useState } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import { IntlProvider } from "react-intl";
import { AppRoutes } from "./routes";
import { Locale } from "./types";

const UiError = ({ error }: FallbackProps) => (
  <div>
    <h1>Error {JSON.stringify(error, null, 2)}</h1>
    <a href={window.location.origin}>
      <code>Reload</code>
    </a>
  </div>
)

export const I18nCtx = createContext<{ locale: Locale, setLocale: Dispatch<SetStateAction<Locale>> } | null>(null);

const I18Provider = ({ children }: PropsWithChildren) => {
  const [messages, setMessages] = useState<Record<string, string>>();
  const [locale, setLocale] = useState((localStorage.locale || navigator.language) as Locale || Locale.en);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    void import(`@/assets/langs/${locale}.json`).then((d) => setMessages(d.default))
    localStorage.locale = locale;
  }, [locale])

  if (!messages) return null;

  return (
    <I18nCtx.Provider value={{ locale, setLocale }}>
      <IntlProvider messages={messages} locale={locale}>{children}</IntlProvider>
    </I18nCtx.Provider>
  )
}

export const App = () => (
  <I18Provider>
    <ErrorBoundary FallbackComponent={UiError}>
      <AppRoutes />
    </ErrorBoundary>
  </I18Provider>
)

