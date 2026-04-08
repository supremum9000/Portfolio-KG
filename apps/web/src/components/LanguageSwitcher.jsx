import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { buildLocaleSwitchUrl, SUPPORTED_LOCALES } from '@/i18n/config';
import { useLocale } from '@/i18n/LocaleContext';
import { cn } from '@/lib/utils';

function LanguageSwitcher({ className }) {
  const { locale, ui } = useLocale();
  const location = useLocation();

  return (
    <div
      className={cn('inline-flex items-center rounded-lg border border-border bg-background p-1', className)}
      role="group"
      aria-label={ui.actions.switchLanguage}
    >
      {SUPPORTED_LOCALES.map((targetLocale) => {
        const isActive = targetLocale === locale;

        return (
          <Link
            key={targetLocale}
            to={buildLocaleSwitchUrl(location.pathname, location.search, targetLocale)}
            className={cn(
              'rounded-md px-3 py-1.5 text-xs font-semibold transition-colors duration-200',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            {ui.locales[targetLocale]}
          </Link>
        );
      })}
    </div>
  );
}

export default LanguageSwitcher;
