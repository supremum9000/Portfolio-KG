
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Building2, MapPin } from 'lucide-react';

function ExperienceCard({ experience, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative pl-6 pb-12 border-l-2 border-primary/30 last:pb-0 sm:pl-8"
    >
      <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background"></div>
      
      <div className="bg-card rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-1">
              {experience.position}
            </h3>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Building2 className="h-4 w-4" />
              <span className="font-medium">{experience.company}</span>
            </div>
            {experience.location && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{experience.location}</span>
              </div>
            )}
          </div>
          <div className="space-y-1 text-sm text-muted-foreground md:text-right">
            <div className="flex items-center gap-2 md:justify-end">
              <Calendar className="h-4 w-4" />
              <span>{experience.period}</span>
            </div>
            {experience.duration && <div>{experience.duration}</div>}
          </div>
        </div>

        {experience.industries?.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {experience.industries.map((industry, industryIndex) => (
              <span
                key={`${experience.company}-industry-${industryIndex}`}
                className="rounded-md border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs text-muted-foreground"
              >
                {industry}
              </span>
            ))}
          </div>
        )}

        <div className="space-y-6">
          {experience.paragraphs?.map((paragraph, paragraphIndex) => (
            <p key={`${experience.company}-paragraph-${paragraphIndex}`} className="text-sm leading-relaxed text-foreground">
              {paragraph}
            </p>
          ))}

          {experience.sections?.map((section, idx) => (
            <section key={`${experience.company}-${idx}`} className="space-y-3">
              {section.title && (
                <h4 className="text-sm font-semibold uppercase tracking-wide text-primary">
                  {section.title}
                </h4>
              )}

              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p key={`${experience.company}-${idx}-paragraph-${paragraphIndex}`} className="text-sm leading-relaxed text-foreground">
                  {paragraph}
                </p>
              ))}

              {section.items?.length > 0 && (
                <ul className="space-y-2">
                  {section.items.map((item, itemIndex) => {
                    const text = typeof item === 'string' ? item : item.text;
                    const subitems = typeof item === 'string' ? null : item.subitems;
                    return (
                      <li key={`${experience.company}-${idx}-item-${itemIndex}`} className="text-sm leading-relaxed text-foreground">
                        <div className="flex items-start gap-3">
                          <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primary shrink-0"></span>
                          <span>{text}</span>
                        </div>
                        {subitems?.length > 0 && (
                          <ul className="ml-6 mt-1.5 space-y-1">
                            {subitems.map((subitem, subIndex) => (
                              <li key={`${experience.company}-${idx}-item-${itemIndex}-sub-${subIndex}`} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                                <span className="mt-[7px] h-1 w-1 rounded-full bg-muted-foreground/50 shrink-0"></span>
                                <span>{subitem}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ExperienceCard;
