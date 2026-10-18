import React, { useEffect, useRef, useState } from 'react';
import { whyData, affiliationsData } from '../data/marvethabi';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({
    blackOwned: 0,
    experience: 0,
    projects: 0,
    disciplines: 0,
  });

  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1600;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);

            setCounts({
              blackOwned: Math.floor(ease * 100),
              experience: Math.floor(ease * 13),
              projects: Math.floor(ease * 100),
              disciplines: Math.floor(ease * 3),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts({
                blackOwned: 100,
                experience: 13,
                projects: 100,
                disciplines: 3,
              });
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <main className="about-page detail-page">
      {/* ============ PAGE HERO ============ */}
      <section className="svc-hero">
        <div className="svc-hero-grid-bg" aria-hidden="true"></div>

        <div className="wrap">
          <nav className="page-hero-nav" aria-label="Breadcrumb">
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }}>
              Home
            </a>
            <span aria-hidden="true">&rsaquo;</span>
            <span>About Us</span>
          </nav>
          <h1 className="svc-hero-title">About MarveThabi Consulting Engineers</h1>
          <p className="lead svc-hero-sub">
            A Level 1 B-BBEE contributor and 100% black-owned multidisciplinary South African
            consultancy providing rigorous engineering, environmental, and asset management
            solutions for national infrastructure.
          </p>
          <div className="svc-hero-tags">
            <span className="svc-hero-tag"><span className="tag-dot"></span>100% Black-Owned Enterprise</span>
            <span className="svc-hero-tag"><span className="tag-dot"></span>Level 1 B-BBEE (135% Recognition)</span>
            <span className="svc-hero-tag"><span className="tag-dot"></span>ECSA &amp; SACNASP Directed</span>
            <span className="svc-hero-tag"><span className="tag-dot"></span>South Africa &amp; Regional DRC</span>
          </div>
        </div>
      </section>

      {/* ============ STATS ROW (TIGHTER COUNTERS) ============ */}
      <section className="stats" ref={statsRef}>
        <div className="stats-grid-bg" aria-hidden="true"></div>
        <div className="wrap stats-row">
          <div className="stat">
            <span className="num stat-v">{counts.blackOwned}%</span>
            <span className="stat-l">Black Owned</span>
          </div>
          <div className="stat">
            <span className="num stat-v">Level 1</span>
            <span className="stat-l">B-BBEE</span>
          </div>
          <div className="stat">
            <span className="num stat-v">{counts.experience}+</span>
            <span className="stat-l">Years Experience</span>
          </div>
          <div className="stat">
            <span className="num stat-v">{counts.projects}+</span>
            <span className="stat-l">Projects</span>
          </div>
          <div className="stat">
            <span className="num stat-v">{counts.disciplines}</span>
            <span className="stat-l">Core Engineering Disciplines</span>
          </div>
        </div>
      </section>

      {/* ============ STORY & CREDENTIALS ============ */}
      <section className="detail-body-section">
        <div className="wrap detail-grid">
          <div className="detail-prose">
            <h2>Our Origin & Engineering Philosophy</h2>
            <p>
              Founded in 2013, MarveThabi Consulting Engineers was established to bridge the gap
              between high-level strategic engineering and hands-on, accountable implementation.
              Over more than thirteen years of continuous operational delivery, we have grown from
              specialist advisory roots into a trusted multidisciplinary consultancy serving major
              mining houses, government departments, state utilities, and local municipalities.
            </p>
            <p>
              Our philosophy rests on the principle of accountability: every study, electrical
              design, and asset strategy is personally directed and signed off by certified
              professionals registered with statutory bodies including the Engineering Council of
              South Africa (ECSA) and the South African Council for Natural Scientific Professions
              (SACNASP).
            </p>

            <div className="detail-block">
              <h3>Core Strategic Pillars</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '20px' }}>
                {whyData.map((card, i) => (
                  <div
                    key={card.title}
                    style={{
                      background: 'var(--grey)',
                      borderLeft: '3px solid var(--btn-green)',
                      padding: '24px 20px',
                    }}
                  >
                    <span className="num" style={{ fontSize: '12px', color: 'var(--brand)', fontWeight: 700 }}>
                      0{i + 1}
                    </span>
                    <h4 style={{ fontSize: '18px', color: 'var(--ink)', margin: '8px 0', fontFamily: 'var(--font-heading)' }}>
                      {card.title}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#47564F', lineHeight: 1.6, margin: 0 }}>
                      {card.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-block">
              <h3>Broad-Based Black Economic Empowerment</h3>
              <p>
                As a 100% black-owned enterprise and verified Level 1 B-BBEE contributor, MarveThabi
                provides our clients with 135% procurement recognition value. We actively invest in
                young engineering and scientific talent from historically disadvantaged backgrounds,
                fostering true technological transformation in the South African built environment.
              </p>
            </div>
          </div>

          <aside className="detail-sidebar" aria-label="Governance & Credentials">
            <div className="side-card">
              <h4>Statutory Registrations</h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--ink)' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                  <span style={{ fontWeight: 600 }}>ECSA</span>
                  <span className="num" style={{ color: '#68786F' }}>Pr.Eng / Pr.Tech.Eng</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                  <span style={{ fontWeight: 600 }}>SACNASP</span>
                  <span className="num" style={{ color: '#68786F' }}>Pr.Sci.Nat</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                  <span style={{ fontWeight: 600 }}>ISO 55000</span>
                  <span className="num" style={{ color: '#68786F' }}>Asset Certified</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: '8px' }}>
                  <span style={{ fontWeight: 600 }}>CIDB</span>
                  <span className="num" style={{ color: '#68786F' }}>Contractor Board</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 600 }}>CSD</span>
                  <span className="num" style={{ color: '#68786F' }}>Verified Supplier</span>
                </li>
              </ul>
            </div>

            <div className="side-card">
              <h4>Practice Leadership</h4>
              <p style={{ fontSize: '14px', color: '#556660', lineHeight: 1.6, marginBottom: '16px' }}>
                Meet the principal engineers and environmental scientists directing our operations.
              </p>
              <a
                href="/leadership"
                className="btn btn-dark btn-full"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/leadership');
                }}
              >
                View Leadership Profiles
              </a>
            </div>

            <div className="side-card" style={{ background: 'var(--slate)', color: '#fff', border: 'none' }}>
              <h4 style={{ color: 'var(--brand-light)' }}>Work With Us</h4>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '20px' }}>
                Require an engineering proposal or compliance specification for your organization?
              </p>
              <a
                href="/contact"
                className="btn btn-brand btn-full"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contact');
                }}
              >
                Get in Touch
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ AFFILIATIONS ============ */}
      <section className="affil">
        <div className="wrap">
          <h2 className="affil-head">Professional Affiliations</h2>
          <p className="affil-sub">
            Our engineers and scientists maintain active, accredited standing with the statutory
            councils governing South African engineering and natural scientific practice.
          </p>
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
            <h2>Partner With Certified Professionals</h2>
            <p className="svc-cta-sub">
              Delivering high-precision engineering and environmental assurance across South Africa.
            </p>
          </div>
          <a
            href="/contact"
            className="btn btn-brand"
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
