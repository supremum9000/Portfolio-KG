import React from 'react';
import {
  BrowserRouter as Router,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams
} from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { LocaleProvider } from '@/i18n/LocaleContext';
import {
  CONTENT_PATHS,
  DEFAULT_LOCALE,
  buildLocalizedPath,
  isSupportedLocale
} from '@/i18n/config';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ExperiencePage from './pages/ExperiencePage.jsx';
import PortfolioPage from './pages/PortfolioPage.jsx';
import ModelerPage from './pages/ModelerPage.jsx';
import MethodologyPage from './pages/MethodologyPage.jsx';
import SkillsPage from './pages/SkillsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

function LegacyRedirect({ path = CONTENT_PATHS.home }) {
  const location = useLocation();
  const target = `${buildLocalizedPath(DEFAULT_LOCALE, path)}${location.search}`;

  return <Navigate to={target} replace />;
}

function LocaleRouteShell() {
  const location = useLocation();
  const { locale } = useParams();

  if (!isSupportedLocale(locale)) {
    const segments = location.pathname.split('/').filter(Boolean);
    const contentPath =
      segments.length > 1 ? `/${segments.slice(1).join('/')}` : CONTENT_PATHS.home;
    const target = `${buildLocalizedPath(DEFAULT_LOCALE, contentPath)}${location.search}`;

    return <Navigate to={target} replace />;
  }

  return (
    <LocaleProvider locale={locale}>
      <Outlet />
    </LocaleProvider>
  );
}

function LocaleNotFoundRedirect() {
  const location = useLocation();
  const { locale } = useParams();
  const targetLocale = isSupportedLocale(locale) ? locale : DEFAULT_LOCALE;
  const target = `${buildLocalizedPath(targetLocale, CONTENT_PATHS.home)}${location.search}`;

  return <Navigate to={target} replace />;
}

const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

function App() {
  return (
    <Router basename={basename}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LegacyRedirect />} />
        <Route path="/about" element={<LegacyRedirect path={CONTENT_PATHS.about} />} />
        <Route path="/experience" element={<LegacyRedirect path={CONTENT_PATHS.experience} />} />
        <Route path="/portfolio" element={<LegacyRedirect path={CONTENT_PATHS.portfolio} />} />
        <Route path="/bpmn-er-modeler" element={<LegacyRedirect path={CONTENT_PATHS.modeler} />} />
        <Route path="/methodology" element={<LegacyRedirect path={CONTENT_PATHS.methodology} />} />
        <Route path="/skills" element={<LegacyRedirect path={CONTENT_PATHS.skills} />} />
        <Route path="/contact" element={<LegacyRedirect path={CONTENT_PATHS.contact} />} />

        <Route path="/:locale" element={<LocaleRouteShell />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="experience" element={<ExperiencePage />} />
          <Route path="portfolio" element={<PortfolioPage />} />
          <Route path="bpmn-er-modeler" element={<ModelerPage />} />
          <Route path="methodology" element={<MethodologyPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<LocaleNotFoundRedirect />} />
        </Route>

        <Route path="*" element={<LegacyRedirect />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
