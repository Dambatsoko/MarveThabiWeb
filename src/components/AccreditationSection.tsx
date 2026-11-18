import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export const AccreditationSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="accred-section" id="accreditations" aria-label={t.accreditation.sectionAria}>
      <div className="wrap">
        <div className="accred-card">
          {/* Header Bar */}
          <div className="accred-header-bar">
            <svg
              className="accred-header-icon"
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="6" />
              <path d="m8.2 13.5-2.2 7.5 6-3 6 3-2.2-7.5" />
            </svg>
            <h2 className="accred-header-title">{t.accreditation.title}</h2>
          </div>

          {/* 2-Column Content Grid */}
          <div className="accred-grid">
            {/* Left Column: Heading, description, 3 standards, footer note */}
            <div className="accred-content">
              <div className="accred-lead-paras">
                <p>{t.accreditation.lead1}</p>
                <p>{t.accreditation.lead2}</p>
              </div>

              {/* Three Standards Badges */}
              <div className="accred-standards">
                {/* ISO 9001 */}
                <div className="accred-standard-item">
                  <div className="accred-standard-icon" aria-hidden="true">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="6" />
                      <path d="m8.2 13.5-2.2 7.5 6-3 6 3-2.2-7.5" />
                    </svg>
                  </div>
                  <div className="accred-standard-info">
                    <strong>{t.accreditation.iso9001Title}</strong>
                    <span>{t.accreditation.iso9001Desc}</span>
                  </div>
                </div>

                {/* ISO 45001 */}
                <div className="accred-standard-item">
                  <div className="accred-standard-icon" aria-hidden="true">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z" />
                      <path d="M5 15V9a7 7 0 0 1 14 0v6" />
                      <path d="M12 4v4" />
                    </svg>
                  </div>
                  <div className="accred-standard-info">
                    <strong>{t.accreditation.iso45001Title}</strong>
                    <span>{t.accreditation.iso45001Desc}</span>
                  </div>
                </div>

                {/* ISO 14001 */}
                <div className="accred-standard-item">
                  <div className="accred-standard-icon" aria-hidden="true">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 20 3c0 9-4 16-10 17z" />
                      <path d="M4 13c5.5 0 10-3 10-7" />
                    </svg>
                  </div>
                  <div className="accred-standard-info">
                    <strong>{t.accreditation.iso14001Title}</strong>
                    <span>{t.accreditation.iso14001Desc}</span>
                  </div>
                </div>
              </div>

              <div className="accred-footer-note">
                <p>{t.accreditation.footerNote}</p>
              </div>
            </div>

            {/* Right Column: Framed Certificates & MarveThabi Hard Hat Photograph */}
            <div className="accred-photo-wrap">
              <img
                src="/assets/images/accreditation-certificates-hardhat.png"
                alt={t.accreditation.photoAlt}
                className="accred-photo"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
