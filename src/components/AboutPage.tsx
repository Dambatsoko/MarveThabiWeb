import React, { useEffect } from 'react';
import { AccreditationSection } from './AccreditationSection';
import { AffiliationsSection } from './AffiliationsSection';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="about-page detail-page">
      {/* ============ PAGE HERO ============ */}
      <section className="svc-hero">
        <div className="svc-hero-grid-bg" aria-hidden="true"></div>

        <div className="wrap">
          <nav className="page-hero-nav" aria-label="Breadcrumb">
            <a
              href="/"
              aria-label="Return to MarveThabi homepage"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/');
              }}
            >
              Home
            </a>
            <span aria-hidden="true">&rsaquo;</span>
            <span>About Us</span>
          </nav>
          <h1 className="svc-hero-title">About MarveThabi Consulting Engineers</h1>
          <p className="lead svc-hero-sub">
            Integrated engineering and consulting solutions in Reliability Engineering, Asset
            Management, Electrical Engineering, Condition Monitoring, and Environmental Management.
          </p>
        </div>
      </section>

      {/* ============ ABOUT US & MAIN PHOTO COLLAGE ============ */}
      <section className="detail-body-section" style={{ background: '#fff', paddingTop: '64px', paddingBottom: '72px' }}>
        <div className="wrap">
          <div className="about-intro-grid">
            <div>
              <span className="label" style={{ color: 'var(--brand)', display: 'block', marginBottom: '8px' }}>
                ABOUT US
              </span>
              <h2
                style={{
                  fontSize: 'clamp(26px, 3.2vw, 34px)',
                  color: 'var(--ink)',
                  marginBottom: '24px',
                  fontFamily: 'var(--font-heading)',
                  lineHeight: 1.15,
                }}
              >
                Engineering Fundamentals. Hands-On Operational Experience.
              </h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  fontSize: '16px',
                  lineHeight: 1.75,
                  color: '#33443D',
                }}
              >
                <p>
                  MarveThabi Consulting Engineers (MCE) is a professional engineering and consulting
                  firm delivering integrated solutions in Reliability Engineering, Asset Management,
                  Electrical Engineering, Condition Monitoring, and Environmental Management.
                </p>
                <p>
                  The company was established to respond to the increasing demand for technically
                  sound, compliant, and practical engineering solutions within the mining,
                  industrial, utilities, and infrastructure sectors. MCE combines strong
                  engineering fundamentals with extensive hands-on operational experience,
                  enabling us to support clients across the entire asset lifecycle, from planning
                  and design, through operation and maintenance, to optimisation and
                  life-extension.
                </p>
                <p>
                  Our services are underpinned by data-driven decision-making, risk-based
                  methodologies, and strict alignment with recognised industry standards and
                  regulatory frameworks. We pride ourselves on delivering solutions that are not
                  only technically robust but also practical, sustainable, and aligned with our
                  clients’ operational realities.
                </p>
              </div>
            </div>

            <div className="about-collage-wrap">
              <img
                src="/assets/images/aboutus.png"
                alt="MarveThabi multidisciplinary engineering operations: plant engineering, open-pit mining, industrial processing infrastructure, and environmental sustainability"
                className="about-collage-img"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============ OUR CORE EXPERTISE ============ */}
      <section
        className="detail-body-section"
        style={{
          background: 'var(--grey)',
          borderTop: '1px solid var(--line)',
          borderBottom: '1px solid var(--line)',
          paddingTop: '64px',
          paddingBottom: '72px',
        }}
      >
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)' }}>OUR CORE EXPERTISE</h2>
          </div>

          <div className="about-expertise-grid">
            {/* Reliability Engineering */}
            <div className="about-expertise-card">
              <div className="about-expertise-icon" aria-hidden="true">
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
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </div>
              <span className="about-expertise-label">Reliability Engineering</span>
            </div>

            {/* Asset Management */}
            <div className="about-expertise-card">
              <div className="about-expertise-icon" aria-hidden="true">
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
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              </div>
              <span className="about-expertise-label">Asset Management</span>
            </div>

            {/* Electrical Engineering */}
            <div className="about-expertise-card">
              <div className="about-expertise-icon" aria-hidden="true">
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
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </div>
              <span className="about-expertise-label">Electrical Engineering</span>
            </div>

            {/* Condition Monitoring */}
            <div className="about-expertise-card">
              <div className="about-expertise-icon" aria-hidden="true">
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
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </div>
              <span className="about-expertise-label">Condition Monitoring</span>
            </div>

            {/* Environmental Management */}
            <div className="about-expertise-card">
              <div className="about-expertise-icon" aria-hidden="true">
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
                  <path d="M12 22v-9" />
                  <path d="M12 13a6 6 0 0 0 6-6c0-4-6-4-6-4s-6 0-6 4a6 6 0 0 0 6 6z" />
                  <path d="M12 13a6 6 0 0 1 6 6" />
                  <path d="M12 17a6 6 0 0 0-6 3" />
                </svg>
              </div>
              <span className="about-expertise-label">Environmental Management</span>
            </div>
          </div>
        </div>
      </section>

      {/* ============ VISION AND MISSION ============ */}
      <section className="detail-body-section" style={{ background: '#fff', paddingTop: '72px', paddingBottom: '72px' }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: '32px', textAlign: 'center', marginInline: 'auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)' }}>VISION AND MISSION</h2>
          </div>

          <div className="about-vm-grid">
            {/* VISION PANEL */}
            <div className="about-vm-card">
              <div className="about-vm-icon-badge" aria-hidden="true">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3.2" fill="#FFFFFF" />
                </svg>
              </div>
              <h3 className="about-vm-title">VISION</h3>
              <div className="about-vm-divider" aria-hidden="true">
                <svg width="180" height="16" viewBox="0 0 180 16" fill="none">
                  <path
                    d="M0 8H72L77 2L83 14L88 5L93 11L97 8H180"
                    stroke="#336659"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="about-vm-text">
                To be a leading multidisciplinary engineering consultancy in Africa, recognised for
                technical excellence, integrity, and sustainable value creation.
              </p>
            </div>

            {/* MISSION PANEL */}
            <div className="about-vm-card">
              <div className="about-vm-icon-badge" aria-hidden="true">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="12" cy="12" r="1.5" fill="#FFFFFF" />
                  <path d="M19 5l-4.5 4.5" strokeWidth="2.5" />
                </svg>
              </div>
              <h3 className="about-vm-title">MISSION</h3>
              <div className="about-vm-divider" aria-hidden="true">
                <svg width="180" height="16" viewBox="0 0 180 16" fill="none">
                  <path
                    d="M0 8H72L77 2L83 14L88 5L93 11L97 8H180"
                    stroke="#336659"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="about-vm-text">
                To deliver compliant, reliable, and sustainable engineering and environmental
                management solutions that enhance asset performance, safety, and operational
                efficiency for our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OUR VALUES ============ */}
      <section
        className="detail-body-section"
        style={{
          background: 'var(--grey)',
          borderTop: '1px solid var(--line)',
          paddingTop: '64px',
          paddingBottom: '80px',
        }}
      >
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: '24px', textAlign: 'center', marginInline: 'auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)' }}>OUR VALUES</h2>
          </div>

          <div className="about-values-grid">
            {/* INTEGRITY */}
            <div className="about-value-col">
              <div className="about-value-badge" aria-hidden="true">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" strokeWidth="2.4" />
                </svg>
              </div>
              <h3 className="about-value-title">INTEGRITY</h3>
              <p className="about-value-text">
                We act with honesty, transparency, and professional ethics in everything we do.
              </p>
            </div>

            {/* EXCELLENCE */}
            <div className="about-value-col">
              <div className="about-value-badge" aria-hidden="true">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="8" r="6" />
                  <path d="m8.2 13.5-2.2 7.5 6-3 6 3-2.2-7.5" />
                </svg>
              </div>
              <h3 className="about-value-title">EXCELLENCE</h3>
              <p className="about-value-text">
                We are committed to delivering high-quality solutions and continuous improvement.
              </p>
            </div>

            {/* PARTNERSHIP */}
            <div className="about-value-col">
              <div className="about-value-badge" aria-hidden="true">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="about-value-title">PARTNERSHIP</h3>
              <p className="about-value-text">
                We build strong relationships and work collaboratively with our clients and
                stakeholders.
              </p>
            </div>

            {/* SUSTAINABILITY */}
            <div className="about-value-col">
              <div className="about-value-badge" aria-hidden="true">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M11 20A7 7 0 0 1 4 13C4 7 11 3 20 3c0 9-4 16-10 17z" />
                  <path d="M4 13c5.5 0 10-3 10-7" />
                </svg>
              </div>
              <h3 className="about-value-title">SUSTAINABILITY</h3>
              <p className="about-value-text">
                We promote solutions that are environmentally responsible and economically viable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ OUR ACCREDITATION ============ */}
      <AccreditationSection />

      {/* ============ PROFESSIONAL AFFILIATIONS ============ */}
      <AffiliationsSection />

      {/* ============ FOOTER TAGLINE STRIP ============ */}
      <section className="about-tagline-strip" aria-label="Corporate Tagline">
        <div className="wrap">
          <div className="about-tagline-inner">
            <svg
              className="about-tagline-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            <p className="about-tagline-text">
              ENGINEERING SOLUTIONS. RELIABLE ASSETS. SUSTAINABLE FUTURES.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};
