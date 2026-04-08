import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { useLocale } from '@/i18n/LocaleContext';

function Footer() {
  const { ui } = useLocale();

  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-sm">
            <span>&copy; 2026 Vladimir Belov. {ui.footer.rightsReserved}</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="mailto:supremum7000@proton.me"
              className="text-muted-foreground transition-colors duration-200 hover:text-primary"
              aria-label={ui.footer.email}
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors duration-200 hover:text-primary"
              aria-label={ui.footer.linkedin}
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground transition-colors duration-200 hover:text-primary"
              aria-label={ui.footer.github}
            >
              <Github className="h-5 w-5" />
            </a>
          </div>

          <div className="text-sm">
            <a
              href="mailto:supremum7000@proton.me"
              className="transition-colors duration-200 hover:text-primary"
            >
              supremum7000@proton.me
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
