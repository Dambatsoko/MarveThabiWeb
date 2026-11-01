import React from 'react';
import { affiliationsData } from '../data/marvethabi';

export const AffiliationsSection: React.FC = () => {
  return (
    <section className="affil-section" id="affiliations" aria-label="Professional Affiliations">
      <div className="wrap">
        <div className="sec-head" style={{ textAlign: 'center', margin: '0 auto 36px', maxWidth: '720px' }}>
          <h2 style={{ fontFamily: 'var(--font-heading, "Fira Sans", sans-serif)', color: 'var(--ink)' }}>
            Statutory Councils & Institutes
          </h2>
          <p style={{ color: '#55655F', fontSize: '16px', margin: '12px auto 0', lineHeight: 1.6 }}>
            Our engineers and scientists maintain active, registered standing with the statutory
            councils and professional institutes governing South African engineering and scientific practice.
          </p>
        </div>

        <div className="affil-grid" role="list">
          {affiliationsData.map((aff) => (
            <div key={aff.name} className="affil-grid-card" role="listitem" title={aff.name}>
              <div className="affil-logo-box">
                <img
                  src={`/assets/images/${aff.logo}`}
                  alt={`${aff.name} logo - professional statutory registration`}
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
