import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { contactContent } from '@/content/contactContent';
import { useLocale } from '@/i18n/LocaleContext';
import { DEFAULT_LOCALE } from '@/i18n/config';

function ContactPage() {
  const { locale } = useLocale();
  const content = contactContent[locale] ?? contactContent[DEFAULT_LOCALE];

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
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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

              <div className="max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h2 className="mb-6 text-2xl font-semibold">{content.infoTitle}</h2>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-medium">{content.emailLabel}</h3>
                        <a
                          href="mailto:supremum7000@proton.me"
                          className="text-primary hover:underline"
                        >
                          supremum7000@proton.me
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-primary/10 p-3">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="mb-1 font-medium">{content.locationLabel}</h3>
                        <p className="text-muted-foreground">{content.locationValue}</p>
                        <p className="text-sm text-muted-foreground">{content.relocationValue}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default ContactPage;
