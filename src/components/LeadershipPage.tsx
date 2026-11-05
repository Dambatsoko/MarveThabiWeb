import React, { useEffect } from 'react';
import { affiliationsData, leadershipTeamData } from '../data/marvethabi';

interface LeadershipPageProps {
  onNavigate: (path: string) => void;
}

export const LeadershipPage: React.FC<LeadershipPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="lead-page detail-page">
      {/* ============ PAGE HERO ============ */}
      <section className="svc-hero">
        <div className="svc-hero-grid-bg" aria-hidden="true"></div>

        <div className="wrap">
          <h1 className="svc-hero-title">Practice Leadership &amp; Governance</h1>
          <p className="lead svc-hero-sub">
            Accountable engineering requires certified, statutory professionals. Our practice is
            personally directed by registered engineers and natural scientists who take direct
            responsibility for every deliverable.
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
              Our Leadership Team
            </h2>
            <p style={{ fontSize: '16px', color: '#47564F', lineHeight: 1.65, margin: 0 }}>
              Meet the directors driving engineering precision, statutory governance, and environmental stewardship across Africa and beyond.
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
            {leadershipTeamData.map((leader) => (
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
                        aria-label={`View ${leader.name}'s LinkedIn profile (opens in a new tab)`}
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
                        <span>View LinkedIn Profile</span>
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

                  {/* Short Introduction extracted from existing biography */}
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
                      href={`/leadership/${leader.slug}`}
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
                        onNavigate(`/leadership/${leader.slug}`);
                      }}
                    >
                      View Full Profile
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
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
              Statutory Code of Professional Conduct
            </h2>
            <p>Our commitment to engineering integrity, environmental stewardship, and public safety.</p>
          </div>

          <div className="lead-gov-grid">
            <div className="lead-gov-card">
              <h3 style={{ fontSize: '20px', color: 'var(--ink)', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
                ECSA Code of Practice
              </h3>
              <p style={{ fontSize: '15px', color: '#47564F', lineHeight: 1.65 }}>
                All engineering drawings, single-line diagrams, and substation specifications are
                delivered strictly in compliance with ECSA professional rules, SANS standards, and
                statutory occupational health and safety guidelines.
              </p>
            </div>

            <div className="lead-gov-card">
              <h3 style={{ fontSize: '20px', color: 'var(--ink)', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
                SACNASP Scientific Integrity
              </h3>
              <p style={{ fontSize: '15px', color: '#47564F', lineHeight: 1.65 }}>
                Environmental assessments, hydrogeological models, and waste classifications are
                conducted with uncompromising scientific rigour, adhering to peer-reviewed
                protocols and National Water Act standards.
              </p>
            </div>

            <div className="lead-gov-card">
              <h3 style={{ fontSize: '20px', color: 'var(--ink)', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
                ISO 55000 &amp; Safety Governance
              </h3>
              <p style={{ fontSize: '15px', color: '#47564F', lineHeight: 1.65 }}>
                Our asset management frameworks, maintenance tactics, and field engineering supervision
                are governed under ISO 55000 asset management standards and SAMTRAC-certified occupational
                health and safety management protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATUTORY COUNCILS & INSTITUTES ============ */}
      <section className="lead-affil-section" aria-label="Statutory Councils & Institutes">
        <div className="wrap">
          <div className="lead-affil-head">
            <h2 className="lead-affil-title">Statutory Councils &amp; Institutes</h2>
          </div>
          <div className="lead-affil-row" role="list">
            {affiliationsData.map((aff) => (
              <div key={aff.name} className="lead-affil-card" role="listitem" title={aff.name}>
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
            <h2>Direct Consultation With Our Directors</h2>
            <p className="svc-cta-sub">
              Schedule an executive engineering consultation to review your technical requirements with our directors.
            </p>
          </div>
          <a
            href="/contact"
            className="btn btn-brand"
            aria-label="Request a consultation with our practice directors"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/contact');
            }}
          >
            Request Consultation
          </a>
        </div>
      </section>
    </main>
  );
};
