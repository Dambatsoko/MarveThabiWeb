import React, { useEffect } from 'react';
import { getDedicatedService, dedicatedServicesData } from '../data/marvethabi';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, onNavigate }) => {
  const service = getDedicatedService(slug) || dedicatedServicesData[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Related services in the same category or adjacent
  const categoryServices = dedicatedServicesData.filter(
    (s) => s.category === service.category
  );
  const relatedServices = categoryServices.length > 1 ? categoryServices : dedicatedServicesData.slice(0, 5);

  return (
    <main className="detail-page">
      {/* ============ SERVICE HERO ============ */}
      <section className="svc-hero">
        <div className="svc-hero-grid-bg" aria-hidden="true"></div>

        <div className="wrap">
          <nav className="page-hero-nav" aria-label="Breadcrumb">
            <a
              href="/services"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/services');
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              All Services
            </a>
            <span aria-hidden="true">&rsaquo;</span>
            <span>{service.title}</span>
          </nav>

          <h1 className="svc-hero-title">{service.title}</h1>
          <p className="detail-hero-tagline">{service.tagline}</p>
          <p className="lead svc-hero-sub">{service.summary}</p>
          <div className="svc-hero-tags">
            <span className="svc-hero-tag"><span className="tag-dot"></span>{service.category} Discipline</span>
            <span className="svc-hero-tag"><span className="tag-dot"></span>Statutory Standards Compliant</span>
          </div>
        </div>
      </section>

      {/* ============ SERVICE CONTENT & SPECIFICATIONS ============ */}
      <section className="detail-body-section">
        <div className="wrap detail-grid">
          {/* Main Content Column */}
          <div className="detail-prose">
            {service.image && (
              <div
                style={{
                  width: '100%',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  marginBottom: '32px',
                  border: '1px solid var(--line)',
                  background: 'var(--grey)',
                }}
              >
                <img
                  src={`/assets/images/${service.image}`}
                  alt={`${service.title} - MarveThabi Consulting Engineers`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '380px',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            )}

            <h2>Engineering Objective & Scope</h2>
            <p>{service.objective}</p>

            <div className="detail-block">
              <h3>Core Capabilities</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
                {service.capabilities.map((capGroup, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--grey)',
                      padding: '24px 28px',
                      borderLeft: '3px solid var(--btn-green)',
                      borderRadius: '4px',
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '17px',
                        color: 'var(--ink)',
                        marginBottom: '12px',
                        fontWeight: 600,
                      }}
                    >
                      {capGroup.group}
                    </h4>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '15px', color: '#3C4A45' }}>
                      {capGroup.items.map((item, i) => (
                        <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', lineHeight: 1.55 }}>
                          <span style={{ color: 'var(--btn-green)', fontWeight: 800, marginTop: '-1px' }}>&rsaquo;</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-block">
              <h3>Technical Approach & Delivery</h3>
              <p>{service.approach}</p>
            </div>

            {service.outcomeStatement && (
              <div className="detail-block">
                <h3>Outcome & Operational Value</h3>
                <div
                  style={{
                    background: 'var(--grey)',
                    padding: '20px 24px',
                    borderLeft: '3px solid var(--brand)',
                    borderRadius: '4px',
                  }}
                >
                  <p style={{ margin: 0, fontSize: '15px', color: 'var(--ink)', lineHeight: 1.6, fontWeight: 500 }}>
                    {service.outcomeStatement}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Technical Sidebar */}
          <aside className="detail-sidebar" aria-label="Technical Specifications">
            <div className="side-card">
              <h4>Governing Standards</h4>
              <div className="side-chips">
                {service.standards.map((std, i) => (
                  <span key={i} className="side-chip num" style={{ fontSize: '13px', background: '#fff' }}>
                    {std}
                  </span>
                ))}
              </div>
            </div>

            <div className="side-card">
              <h4>Applicable Sectors</h4>
              <div className="side-chips">
                {service.sectors.map((sec, i) => (
                  <span key={i} className="side-chip" style={{ fontSize: '13px' }}>
                    {sec}
                  </span>
                ))}
              </div>
            </div>

            <div className="side-card">
              <h4>Related Service Lines</h4>
              <div className="side-nav-list">
                {relatedServices.map((s) => (
                  <a
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="side-nav-item"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(`/services/${s.slug}`);
                    }}
                    style={{
                      borderColor: s.slug === service.slug ? 'var(--btn-green)' : undefined,
                      fontWeight: s.slug === service.slug ? 700 : undefined,
                      background: s.slug === service.slug ? 'rgba(100,156,8,0.06)' : undefined,
                    }}
                  >
                    <span>{s.title}</span>
                    <span className="num">{s.ref}</span>
                  </a>
                ))}
              </div>
              <a
                href="/services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '16px',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--brand)',
                  textDecoration: 'none',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/services');
                }}
              >
                ← View All Services Catalogue
              </a>
            </div>

            <div className="side-card" style={{ background: 'var(--slate)', color: '#fff', border: 'none' }}>
              <h4 style={{ color: 'var(--brand-light)' }}>Technical Enquiry</h4>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '20px' }}>
                Discuss your technical scope or statutory compliance requirements directly with our registered professionals.
              </p>
              <a
                href="/contact"
                className="btn btn-brand btn-full"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/contact');
                }}
              >
                Request Consultation
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ FOOTER CTA ============ */}
      <section className="svc-cta">
        <div className="wrap svc-cta-inner">
          <div>
            <h2>Scope It With an Engineer</h2>
            <p className="svc-cta-sub">
              Send your technical requirement and receive a structured scope from our registered engineering and scientific professionals.
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

