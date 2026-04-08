import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import SkillCategory from '@/components/SkillCategory.jsx';
import { skillsContent } from '@/content/skillsContent';
import { useLocale } from '@/i18n/LocaleContext';
import { DEFAULT_LOCALE } from '@/i18n/config';

function SkillsPage() {
  const { locale } = useLocale();
  const content = skillsContent[locale] ?? skillsContent[DEFAULT_LOCALE];

  return (
    <>
      <Helmet>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
      </Helmet>

      <div className="relative min-h-screen flex flex-col">
        <div className="fixed inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background -z-10"></div>
        <Header />

        <main className="flex-1 py-20">
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1
                className="mb-4 text-4xl font-bold leading-tight md:text-5xl"
                style={{ letterSpacing: '-0.02em' }}
              >
                {content.title}
              </h1>
              <p className="mb-12 text-lg leading-relaxed text-muted-foreground">
                {content.description}
              </p>

              <div className="grid gap-6 md:grid-cols-2">
                {content.categories.map((category, index) => (
                  <SkillCategory key={category.name} category={category} index={index} />
                ))}
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default SkillsPage;
