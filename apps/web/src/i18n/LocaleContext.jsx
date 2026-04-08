import React, { createContext, useContext, useEffect } from 'react';
import { DEFAULT_LOCALE } from '@/i18n/config';
import { uiMessages } from '@/i18n/ui';

const LocaleContext = createContext(null);

export function LocaleProvider({ locale, children }) {
  const ui = uiMessages[locale] ?? uiMessages[DEFAULT_LOCALE];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, ui }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }

  return context;
}
