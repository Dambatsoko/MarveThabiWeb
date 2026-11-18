import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { getLocalizedAffiliations, getLocalizedLeadershipTeam } from '../i18n/data';
import { localizePath } from '../i18n/routing';

interface LeadershipPageProps {
  onNavigate: (path: string) => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ onNavigate }) => {
  const { lang, t } = useLanguage();
  const team = getLocalizedLeadershipTeam(lang);
  const affiliations = getLocalizedAffiliations(lang);
  const contactHref = localizePath('/contact', lang);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="lead-page detail-page">
      {/* ============ PAGE HERO ============ */}
      <section className="svc-hero">
        <div className="svc-hero-grid-bg" aria-hidden="true"></div>

        <div className="wrap">
          <h1 className="svc-hero-title">{t.leadershipPage.heroTitle}</h1>
          <p className="lead svc-hero-sub">
            {t.leadershipPage.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ============ THREE LEADERSHIP OVERVIEW CARDS ============ */}
      <section className="detail-body-section" style={{ paddingTop: '50px', paddingBottom: '60px' }}>
        <div className="wrap">
          <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
            <h2
              style={{
                fontSize: 'clamp(28px, 3.5vw, 36px)',
                color: 'var(--ink, #0f172a)',
                marginBottom: '12px',
                fontFamily: 'var(--font-heading, inherit)',
                fontWeight: 700,
              }}
            >
              {t.leadershipPage.teamHeading}
            </h2>
            <p style={{ fontSize: '16px', color: '#47564F', lineHeight: 1.65, margin: 0 }}>
              {t.leadershipPage.teamSubtitle}
            </p>
          </div>

          {/* Cards Grid */}
          <div
            className="leadership-cards-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '32px',
              alignItems: 'stretch',
            }}
          >
            {team.map((leader) => {
              const leaderHref = localizePath(`/leadership/${leader.slug}`, lang);
              return (
                <article
                  key={leader.slug}
                  className="leader-overview-card"
                  style={{
                    background: '#ffffff',
                    border: '1px solid var(--line, #e2e8f0)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 20px -2px rgba(15, 27, 24, 0.06)',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
                  }}
                >
                  {/* Portrait Header */}
                  <div
                    style={{
                      position: 'relative',
                      overflow: 'hidden',
                      background: '#f8faf9',
                      padding: '20px 20px 16px',
                    }}
                  >
                    <div
                      style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px -6px rgba(15, 27, 24, 0.15)',
                        background: '#fff',
                        aspectRatio: '1 / 1',
                        position: 'relative',
                      }}
                    >
                      <img
                        src={`/assets/images/${leader.image}?v=3`}
                        alt={`${leader.name} - ${leader.role}`}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes(`/${leader.image}`)) {
                            target.src = `/${leader.image}`;
                          }
                        }}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          transition: 'transform 0.4s ease',
                        }}
                      />
                    </div>

                    {/* LinkedIn Profile Link — immediately below portrait */}
                    {leader.linkedinUrl && (
                      <div style={{ marginTop: '14px' }}>
                        <a
                          href={leader.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="leader-linkedin-link"
                          aria-label={`${t.common.viewLinkedInProfile} — ${leader.name}`}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            width: '100%',
                            padding: '9px 14px',
                          }}
                        >
                          <img
                            src="/assets/images/linkedin.png"
                            alt=""
                            aria-hidden="true"
                            width="16"
                            height="16"
                            style={{ width: '16px', height: '16px', objectFit: 'contain', flexShrink: 0 }}
                          />
                          <span>{t.common.viewLinkedInProfile}</span>
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div
                    style={{
                      padding: '24px 24px 28px',
                      display: 'flex',
                      flexDirection: 'column',
                      flexGrow: 1,
                    }}
                  >
                    {/* Director Name */}
                    <h3
                      style={{
                        fontSize: '22px',
                        fontWeight: 700,
                        color: 'var(--ink, #0f172a)',
                        margin: '0 0 12px',
                        fontFamily: 'var(--font-heading, inherit)',
                      }}
                    >
                      {leader.name}
                    </h3>

                    {/* Short Introduction */}
                    <div
                      style={{
                        fontSize: '14px',
                        lineHeight: 1.65,
                        color: '#47564F',
                        margin: '0 0 24px',
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                      }}
                    >
                      {(leader.shortIntro || leader.summary).split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx} style={{ margin: 0 }}>
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {/* View Full Profile CTA */}
                    <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--line, #e2e8f0)' }}>
                      <a
                        href={leaderHref}
                        className="btn btn-brand"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          width: '100%',
                          textAlign: 'center',
                          padding: '12px 20px',
                          fontWeight: 600,
                          fontSize: '14px',
                          textDecoration: 'none',
                          borderRadius: '6px',
                          cursor: 'pointer',
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          onNavigate(leaderHref);
                        }}
                      >
                        {t.leadershipPage.viewFullProfile}
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ STATUTORY GOVERNANCE ============ */}
      <section className="detail-body-section" style={{ background: '#fff', paddingTop: '40px' }}>
        <div className="wrap">
          <div className="sec-head lead-gov-sec-head" style={{ marginBottom: '40px', maxWidth: '100%' }}>
            <h2
              className="lead-gov-heading"
              style={{
                fontSize: '42px',
                fontFamily: 'var(--font-heading, "Fira Sans", sans-serif)',
                fontWeight: 700,
                color: 'var(--ink, #0f172a)',
                lineHeight: 1.25,
                margin: '0 0 12px',
              }}
            >
              {lang === 'en' ? 'Statutory Code of Professional Conduct' : t.leadershipPage.governanceHeading}
            </h2>
            <p>{t.leadershipPage.governanceSubtitle}</p>
          </div>

          <div className="lead-gov-grid">
            {t.leadershipPage.govCards.map((card, idx) => (
              <div key={idx} className="lead-gov-card">
                <h3 style={{ fontSize: '20px', color: 'var(--ink)', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: '15px', color: '#47564F', lineHeight: 1.65 }}>
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ STATUTORY COUNCILS & INSTITUTES ============ */}
      <section className="lead-affil-section" aria-label={t.leadershipPage.councilsHeading}>
        <div className="wrap">
          <div className="lead-affil-head">
            <h2 className="lead-affil-title">{t.leadershipPage.councilsHeading}</h2>
          </div>
          <div className="lead-affil-row" role="list">
            {affiliations.map((aff) => (
              <div key={aff.logo} className="lead-affil-card" role="listitem" title={aff.name}>
                <img
                  src={`/assets/images/${aff.logo}`}
                  alt={aff.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="svc-cta">
        <div className="wrap svc-cta-inner">
          <div>
            <h2>{t.leadershipPage.ctaHeading}</h2>
            <p className="svc-cta-sub">
              {t.leadershipPage.ctaSubtitle}
            </p>
          </div>
          <a
            href={contactHref}
            className="btn btn-brand"
            aria-label={t.leadershipPage.ctaHeading}
            onClick={(e) => {
              e.preventDefault();
              onNavigate(contactHref);
            }}
          >
            {t.common.requestConsultation}
          </a>
        </div>
      </section>
    </main>
  );
};
