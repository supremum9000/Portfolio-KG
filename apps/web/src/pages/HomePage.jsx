import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Database, Layers3, Shield } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Button } from '@/components/ui/button';
import { homeContent } from '@/content/homeContent';
import { useLocale } from '@/i18n/LocaleContext';
import { CONTENT_PATHS, DEFAULT_LOCALE, buildLocalizedPath } from '@/i18n/config';

const competencyIcons = [Database, Code, Layers3, Shield];

function HomePage() {
  const { locale } = useLocale();
  const content = homeContent[locale] ?? homeContent[DEFAULT_LOCALE];
  const keyCompetencies = content.competencies.map((label, index) => ({
    icon: competencyIcons[index],
    label
  }));

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="relative min-h-[100dvh] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background"></div>
            <div className="relative z-10 container mx-auto px-4 text-center sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1
                  className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  {content.title}
                </h1>
                <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
                  {content.description}
                </p>

                <div className="mb-12 flex flex-wrap justify-center gap-4">
                  {keyCompetencies.map((competency, index) => (
                    <motion.div
                      key={competency.label}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-2"
                    >
                      {competency.icon ? (
                        <competency.icon className="h-5 w-5 text-primary" />
                      ) : null}
                      <span className="text-sm font-medium">{competency.label}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col justify-center gap-4 sm:flex-row">
                  <Link to={buildLocalizedPath(locale, CONTENT_PATHS.portfolio)}>
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-[0.98]"
                    >
                      {content.primaryCta}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to={buildLocalizedPath(locale, CONTENT_PATHS.contact)}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary text-primary transition-all duration-200 hover:bg-primary hover:text-primary-foreground active:scale-[0.98]"
                    >
                      {content.secondaryCta}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default HomePage;
