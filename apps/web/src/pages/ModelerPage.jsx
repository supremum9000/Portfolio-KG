import React, { useEffect, useMemo, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header.jsx';
import { useLocale } from '@/i18n/LocaleContext';
import { buildLocalizedPath, CONTENT_PATHS } from '@/i18n/config';

const MODELER_SRC = `${import.meta.env.BASE_URL}tools/bpmn-er-modeler/index.html`;

const pageContent = {
  en: {
    metaTitle: 'BPMN/ER Modeler - Vladimir Belov',
    metaDescription:
      'Launch the BPMN/ER Modeler by Vladimir Belov: BPMN editor based on BPMN.io (bpmn-js) and ER modeling support in a local browser tool.',
    iframeTitle: 'BPMN/ER Modeler'
  },
  ru: {
    metaTitle: 'BPMN/ER Modeler - Vladimir Belov',
    metaDescription:
      'Запуск BPMN/ER Modeler Владимира Белова: BPMN-редактор на базе BPMN.io (bpmn-js) и поддержка ER-моделирования в локальном браузерном инструменте.',
    iframeTitle: 'BPMN/ER Modeler'
  },
  kg: {
    metaTitle: 'BPMN/ER Modeler - Vladimir Belov',
    metaDescription:
      'Vladimir Belovдун BPMN/ER Modeler программасы: BPMN.io (bpmn-js) негизиндеги BPMN редактору жана жергиликтүү браузер куралында ER моделдештирүү.',
    iframeTitle: 'BPMN/ER Modeler'
  }
};

function ModelerPage() {
  const { locale } = useLocale();
  const navigate = useNavigate();
  const iframeRef = useRef(null);
  const content = pageContent[locale] ?? pageContent.en;
  const iframeSrc = useMemo(() => `${MODELER_SRC}?locale=${locale}`, [locale]);

  useEffect(() => {
    function handleLocaleMessage(event) {
      if (event.source !== iframeRef.current?.contentWindow) {
        return;
      }

      if (event.data?.type !== 'modeler-locale-change') {
        return;
      }

      const nextLocale = event.data.locale;
      if (!nextLocale || nextLocale === locale) {
        return;
      }

      navigate(buildLocalizedPath(nextLocale, CONTENT_PATHS.modeler));
    }

    window.addEventListener('message', handleLocaleMessage);

    return () => {
      window.removeEventListener('message', handleLocaleMessage);
    };
  }, [locale, navigate]);

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />

        <main className="flex-1">
          <iframe
            ref={iframeRef}
            src={iframeSrc}
            title={content.iframeTitle}
            className="h-[calc(100vh-4rem)] w-full border-0"
            allow="clipboard-read; clipboard-write"
          />
        </main>
      </div>
    </>
  );
}

export default ModelerPage;
