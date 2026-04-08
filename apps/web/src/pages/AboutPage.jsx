import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Award, Briefcase, Mail, MapPin } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { aboutContent } from '@/content/aboutContent';
import { useLocale } from '@/i18n/LocaleContext';
import { DEFAULT_LOCALE } from '@/i18n/config';

function AboutPage() {
  const { locale } = useLocale();
  const content = aboutContent[locale] ?? aboutContent[DEFAULT_LOCALE];

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
          <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1
                className="mb-6 text-4xl font-bold leading-tight md:text-5xl"
                style={{ letterSpacing: '-0.02em' }}
              >
                {content.title}
              </h1>

              <div className="mb-8 rounded-2xl bg-card p-4 shadow-lg sm:p-8">
                <div className="mb-8 flex flex-wrap gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{content.facts.age}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{content.facts.emailLabel}:</span>
                    <a href="mailto:supremum7000@proton.me" className="text-primary hover:underline">
                      supremum7000@proton.me
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span className="text-muted-foreground">{content.facts.relocation}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  {content.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="leading-relaxed text-foreground">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {content.sections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="rounded-xl bg-card p-6 shadow-lg"
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <Award className="h-6 w-6 text-primary" />
                      <h2 className="text-2xl font-semibold">{section.title}</h2>
                    </div>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary"></span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
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

export default AboutPage;
