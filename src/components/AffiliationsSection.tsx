import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { getLocalizedAffiliations } from '../i18n/data';

export const AffiliationsSection: React.FC = () => {
  const { lang, t } = useLanguage();
  const affiliations = getLocalizedAffiliations(lang);

  return (
    <section className="affil-section" id="affiliations" aria-label={t.affiliations.sectionAria}>
      <div className="wrap">
        <div className="sec-head" style={{ textAlign: 'center', margin: '0 auto 36px', maxWidth: '720px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading, "Fira Sans", sans-serif)', color: 'var(--ink)' }}>
            {t.affiliations.title}
          </h2>
          <p style={{ color: '#55655F', fontSize: '16px', margin: '12px auto 0', lineHeight: 1.6 }}>
            {t.affiliations.subtitle}
          </p>
        </div>

        <div className="affil-grid" role="list">
          {affiliations.map((aff) => (
            <div key={aff.logo} className="affil-grid-card" role="listitem" title={aff.name}>
              <div className="affil-logo-box">
                <img
                  src={`/assets/images/${aff.logo}`}
                  alt={`${aff.name} ${t.affiliations.logoAltSuffix}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="affil-name-label">{aff.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
