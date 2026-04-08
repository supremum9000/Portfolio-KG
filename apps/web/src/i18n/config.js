export const SUPPORTED_LOCALES = ['en', 'ru', 'ky'];
export const DEFAULT_LOCALE = 'en';

export const CONTENT_PATHS = {
  home: '/',
  about: '/about',
  experience: '/experience',
  portfolio: '/portfolio',
  modeler: '/bpmn-er-modeler',
  methodology: '/methodology',
  skills: '/skills',
  contact: '/contact'
};

export function isSupportedLocale(locale) {
  return SUPPORTED_LOCALES.includes(locale);
}

export function normalizeContentPath(path) {
  if (!path || path === '/') {
    return '/';
  }

  return path.startsWith('/') ? path : `/${path}`;
}

export function buildLocalizedPath(locale, path = '/') {
  const safeLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const normalizedPath = normalizeContentPath(path);

  if (normalizedPath === '/') {
    return `/${safeLocale}`;
  }

  return `/${safeLocale}${normalizedPath}`;
}

export function getContentPathFromPathname(pathname) {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) {
    return '/';
  }

  if (isSupportedLocale(segments[0])) {
    if (segments.length === 1) {
      return '/';
    }

    return `/${segments.slice(1).join('/')}`;
  }

  return normalizeContentPath(pathname);
}

export function buildLocaleSwitchUrl(pathname, search, locale) {
  return `${buildLocalizedPath(locale, getContentPathFromPathname(pathname))}${search}`;
}
