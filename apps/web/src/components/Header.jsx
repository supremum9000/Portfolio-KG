import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LanguageSwitcher from '@/components/LanguageSwitcher.jsx';
import { useLocale } from '@/i18n/LocaleContext';
import {
  CONTENT_PATHS,
  buildLocalizedPath,
  getContentPathFromPathname
} from '@/i18n/config';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { locale, ui } = useLocale();

  const navLinks = [
    { path: CONTENT_PATHS.home, label: ui.nav.home },
    { path: CONTENT_PATHS.about, label: ui.nav.about },
    { path: CONTENT_PATHS.portfolio, label: ui.nav.portfolio },
    { path: CONTENT_PATHS.methodology, label: ui.nav.methodology },
    { path: CONTENT_PATHS.modeler, label: ui.nav.modeler },
    { path: CONTENT_PATHS.experience, label: ui.nav.experience },
    { path: CONTENT_PATHS.skills, label: ui.nav.skills },
    { path: CONTENT_PATHS.contact, label: ui.nav.contact }
  ];

  const currentContentPath = getContentPathFromPathname(location.pathname);
  const isActive = (path) => currentContentPath === path;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to={buildLocalizedPath(locale, CONTENT_PATHS.home)} className="flex items-center space-x-2">
            <span className="text-xl font-bold text-primary">Vladimir Belov</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={buildLocalizedPath(locale, link.path)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <LanguageSwitcher />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen((currentState) => !currentState)}
              aria-label={ui.actions.menuToggle}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={buildLocalizedPath(locale, link.path)}
                className={`block px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(link.path)
                    ? 'text-primary bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                aria-current={isActive(link.path) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
