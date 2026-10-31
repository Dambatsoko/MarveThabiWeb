import React, { useEffect } from 'react';
import { getLeaderBySlug, affiliationsData } from '../data/marvethabi';

interface LeaderDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const LeaderDetailPage: React.FC<LeaderDetailPageProps> = ({ slug, onNavigate }) => {
  const leader = getLeaderBySlug(slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!leader) {
    return (
      <main className="lead-page detail-page">
        <section className="svc-hero">
          <div className="wrap" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <h1 className="svc-hero-title">Director Profile Not Found</h1>
            <p className="lead svc-hero-sub" style={{ margin: '16px auto 32px' }}>
              The requested leadership profile does not exist or may have been relocated.
            </p>
            <a
              href="/leadership"
              className="btn btn-brand"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/leadership');
              }}
            >
              &larr; Back to Leadership
            </a>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="lead-page detail-page">
      {/* ============ BREADCRUMB & HERO ============ */}
      <section className="svc-hero">
        <div className="svc-hero-grid-bg" aria-hidden="true"></div>

        <div className="wrap">


          <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="/leadership"
              className="btn-back-link"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--brand-dark, #0d3b2f)',
                background: 'rgba(255,255,255,0.85)',
                padding: '6px 14px',
                borderRadius: '6px',
                border: '1px solid rgba(13,59,47,0.15)',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/leadership');
              }}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
              Back to Leadership
            </a>
          </div>

          <h1 className="svc-hero-title" style={{ marginTop: '16px', marginBottom: '8px' }}>
            {leader.name}
          </h1>
          <p
            className="lead svc-hero-sub"
            style={{
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--brand-dark, #0d3b2f)',
              marginBottom: '20px',
            }}
          >
            {leader.role} &middot; MarveThabi Consulting Engineers
          </p>
        </div>
      </section>

      {/* ============ PROFILE DETAIL BODY ============ */}
      <section className="detail-body-section" style={{ paddingTop: '40px' }}>
        <div className="wrap">
          <div className="lead-card" style={{ border: 'none', background: 'transparent', padding: 0 }}>
            {/* Left Column: Portrait & Key Meta */}
            <div className="lead-photo-col" style={{ maxWidth: '340px' }}>
              <div
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '10px',
                  boxShadow: '0 16px 36px -12px rgba(15,27,24,0.3)',
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.08)',
                }}
              >
                <img
                  src={`/assets/images/${leader.image}?v=3`}
                  alt={`${leader.name} - ${leader.role} at MarveThabi Consulting Engineers`}
                  onError={(e) => {
                    // fallback to root public path if needed
                    const target = e.currentTarget;
                    if (!target.src.includes(`/${leader.image}`)) {
                      target.src = `/${leader.image}`;
                    }
                  }}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    objectFit: 'cover',
                    aspectRatio: '1/1',
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
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#0A66C2',
                      textDecoration: 'none',
                      padding: '10px 16px',
                      width: '100%',
                    }}
                  >
                    <img
                      src="/assets/images/linkedin.png"
                      alt=""
                      aria-hidden="true"
                      width="18"
                      height="18"
                      style={{ width: '18px', height: '18px', objectFit: 'contain', flexShrink: 0 }}
                    />
                    <span>View LinkedIn Profile</span>
                  </a>
                </div>
              )}

              {/* Profile Outcomes & Impact */}
              {leader.outcomes && leader.outcomes.length > 0 && (
                <div
                  style={{
                    marginTop: '20px',
                    background: '#fff',
                    border: '1px solid var(--line, #e2e8f0)',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ink, #0f172a)',
                      display: 'block',
                      marginBottom: '10px',
                    }}
                  >
                    Profile Highlights
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {leader.outcomes.map((out, i) => (
                      <span
                        key={i}
                        className="side-chip"
                        style={{
                          fontSize: '11px',
                          background: 'var(--grey, #f1f5f9)',
                          color: 'var(--btn-green-dark, #0e5b38)',
                          fontWeight: 700,
                          borderRadius: '4px',
                          letterSpacing: '0.04em',
                        }}
                      >
                        &#10003; {out}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sectors Served */}
              {leader.sectors && leader.sectors.length > 0 && (
                <div
                  style={{
                    marginTop: '16px',
                    background: '#fff',
                    border: '1px solid var(--line, #e2e8f0)',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ink, #0f172a)',
                      display: 'block',
                      marginBottom: '10px',
                    }}
                  >
                    Key Industry Sectors
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {leader.sectors.map((sec, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '12px',
                          color: '#334155',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span style={{ color: 'var(--btn-green, #10b981)' }}>&bull;</span> {sec}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Detailed Sections */}
            <div className="lead-content-col">
              <h2
                style={{
                  fontSize: 'clamp(26px, 3.2vw, 34px)',
                  color: 'var(--ink, #0f172a)',
                  marginBottom: '6px',
                  fontFamily: 'var(--font-heading, inherit)',
                  fontWeight: 700,
                }}
              >
                {leader.name}
              </h2>
              <p
                style={{
                  fontSize: '15px',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: 'var(--brand, #0f5132)',
                  marginBottom: '24px',
                  lineHeight: 1.4,
                }}
              >
                {leader.role}
              </p>

              {/* Complete Verbatim Biography */}
              <div
                style={{
                  background: '#f8faf9',
                  borderLeft: '4px solid var(--btn-green, #10b981)',
                  padding: '20px 24px',
                  borderRadius: '0 8px 8px 0',
                  marginBottom: '28px',
                }}
              >
                <h3
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--brand-dark, #0d3b2f)',
                    marginBottom: '10px',
                  }}
                >
                  Executive Biography
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {leader.summary.split('\n\n').map((paragraph, pIdx) => (
                    <p
                      key={pIdx}
                      style={{
                        fontSize: '16px',
                        lineHeight: 1.8,
                        color: '#2d3748',
                        margin: 0,
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>

              {/* Qualifications & Certifications */}
              {leader.qualifications && leader.qualifications.length > 0 && (
                <div style={{ borderTop: '1px solid var(--line, #e2e8f0)', paddingTop: '24px', marginBottom: '28px' }}>
                  <h3
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--ink, #0f172a)',
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    Qualifications &amp; Professional Certifications
                  </h3>
                  <ul className="lead-quals-grid">
                    {leader.qualifications.map((q, i) => (
                      <li
                        key={i}
                        style={{
                          fontSize: '13px',
                          color: '#1e293b',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          background: '#fff',
                          padding: '10px 14px',
                          border: '1px solid var(--line, #e2e8f0)',
                          borderRadius: '6px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                        }}
                      >
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            background: 'var(--btn-green, #10b981)',
                            borderRadius: '50%',
                            flexShrink: 0,
                          }}
                        ></span>
                        <span style={{ fontWeight: 500 }}>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Areas of Expertise */}
              {leader.areasOfExpertise && leader.areasOfExpertise.length > 0 && (
                <div style={{ borderTop: '1px solid var(--line, #e2e8f0)', paddingTop: '24px', marginBottom: '28px' }}>
                  <h3
                    style={{
                      fontSize: '12px',
                      fontWeight: 700,
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'var(--brand, #0f5132)',
                      display: 'block',
                      marginBottom: '14px',
                    }}
                  >
                    Areas of Expertise
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {leader.areasOfExpertise.map((exp, i) => (
                      <span
                        key={i}
                        className="side-chip"
                        style={{
                          fontSize: '13px',
                          background: '#fff',
                          border: '1px solid var(--line, #e2e8f0)',
                          borderLeft: '3px solid var(--btn-green, #10b981)',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          fontWeight: 500,
                          color: '#1e293b',
                        }}
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Two columns: Project Experience & Professional Focus */}
              <div className="lead-details-columns" style={{ borderTop: '1px solid var(--line, #e2e8f0)', paddingTop: '24px' }}>
                {leader.projectExperience && leader.projectExperience.length > 0 && (
                  <div>
                    <h3
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--ink, #0f172a)',
                        display: 'block',
                        marginBottom: '14px',
                      }}
                    >
                      Key Project &amp; Technical Experience
                    </h3>
                    <ul
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        padding: 0,
                        margin: 0,
                        listStyle: 'none',
                        fontSize: '14px',
                        color: '#334155',
                      }}
                    >
                      {leader.projectExperience.map((exp, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.6 }}>
                          <span style={{ color: 'var(--brand, #0f5132)', fontWeight: 700, fontSize: '16px' }}>&bull;</span>
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {leader.professionalFocus && leader.professionalFocus.length > 0 && (
                  <div>
                    <h3
                      style={{
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--brand, #0f5132)',
                        display: 'block',
                        marginBottom: '14px',
                      }}
                    >
                      Professional Focus &amp; Value Commitment
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#334155' }}>
                      {leader.professionalFocus.map((foc, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.6 }}>
                          <span style={{ color: 'var(--btn-green, #10b981)', fontWeight: 700 }}>&#8594;</span>
                          <span>{foc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Navigation & CTA */}
              <div
                style={{
                  marginTop: '36px',
                  paddingTop: '24px',
                  borderTop: '1px solid var(--line, #e2e8f0)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '16px',
                }}
              >
                <a
                  href="/leadership"
                  className="btn btn-outline"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/leadership');
                  }}
                >
                  &larr; Back to All Directors
                </a>

                <a
                  href="/contact"
                  className="btn btn-brand"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/contact');
                  }}
                >
                  Consult With {leader.name.split(' ')[0]}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATUTORY GOVERNANCE ============ */}
      <section className="detail-body-section" style={{ background: '#fff', paddingTop: '20px' }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: '36px' }}>
            <h2>Statutory Code of Professional Conduct</h2>
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

      {/* ============ AFFILIATIONS ============ */}
      <section className="affil">
        <div className="wrap">
          <h2 className="affil-head">Statutory Councils &amp; Institutes</h2>
          <div className="affil-row">
            {affiliationsData.map((aff) => (
              <div key={aff.name} className="affil-card">
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
