import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  getLocalizedDedicatedService,
  getLocalizedDedicatedServices,
} from '../i18n/data';
import { localizePath } from '../i18n/routing';

interface ServiceDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ slug, onNavigate }) => {
  const { lang, t } = useLanguage();
  const allServices = getLocalizedDedicatedServices(lang);
  const service = getLocalizedDedicatedService(slug, lang) || allServices[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  // Related services in the same category or adjacent
  const categoryServices = allServices.filter(
    (s) => s.category === service.category
  );
  const relatedServices = categoryServices.length > 1 ? categoryServices : allServices.slice(0, 5);

  const servicesListHref = localizePath('/services', lang);
  const contactHref = localizePath('/contact', lang);

  return (
    <main className="detail-page">
      {/* ============ SERVICE HERO ============ */}
      <section className="svc-hero">
        <div className="svc-hero-grid-bg" aria-hidden="true"></div>

        <div className="wrap">
          <h1 className="svc-hero-title">{service.title}</h1>
          <p className="detail-hero-tagline">{service.tagline}</p>
          <p className="lead svc-hero-sub">{service.summary}</p>
          <div className="svc-hero-tags">
            <span className="svc-hero-tag"><span className="tag-dot"></span>{service.category} {t.serviceDetail.disciplineSuffix}</span>
            <span className="svc-hero-tag"><span className="tag-dot"></span>{t.serviceDetail.standardsTag}</span>
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
                className="service-detail-media-wrap"
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  marginBottom: '32px',
                  border: '1px solid var(--line)',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  padding: 0,
                  minHeight: '240px',
                }}
              >
                <img
                  src={`/assets/images/${service.image}`}
                  alt={`${service.title} (${service.ref}) - ${t.serviceDetail.altMiddleText} ${service.category}`}
                  aria-label={`${service.title} (${service.ref}) ${t.serviceDetail.photoAriaSuffix}`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const tried = parseInt(target.dataset.tried || '0', 10);
                    if (tried === 0) {
                      target.dataset.tried = '1';
                      target.src = `/assets/images/${(service.image || '').replace(/&/g, '%26')}`;
                    } else if (tried === 1) {
                      target.dataset.tried = '2';
                      target.src = `/assets/images/electronic-electrical-engineering.png`;
                    }
                  }}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '100%',
                    maxHeight: '480px',
                    objectFit: 'contain',
                    objectPosition: 'top center',
                    display: 'block',
                    margin: '0',
                  }}
                />
              </div>
            )}

            <h2>{t.serviceDetail.objectiveHeading}</h2>
            <p>{service.objective}</p>

            <div className="detail-block">
              <h3>{t.serviceDetail.capabilitiesHeading}</h3>
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
              {service.closingStatement && (
                <div
                  className="service-closing-callout"
                  style={{
                    marginTop: '20px',
                    padding: '16px 20px',
                    background: 'var(--grey)',
                    borderLeft: '3px solid var(--btn-green)',
                    borderRadius: '4px',
                    fontStyle: 'italic',
                    fontSize: '15px',
                    color: 'var(--ink)',
                    lineHeight: 1.6,
                  }}
                >
                  &ldquo;{service.closingStatement}&rdquo;
                </div>
              )}
            </div>

            <div className="detail-block">
              <h3>{t.serviceDetail.approachHeading}</h3>
              <p>{service.approach}</p>
            </div>

            {service.outcomeStatement && (
              <div className="detail-block">
                <h3>{t.serviceDetail.outcomeHeading}</h3>
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
          <aside className="detail-sidebar" aria-label={t.serviceDetail.specsSidebarAria}>
            <div className="side-card">
              <h4>{t.serviceDetail.governingStandardsHeading}</h4>
              <div className="side-chips">
                {service.standards.map((std, i) => (
                  <span key={i} className="side-chip num" style={{ fontSize: '13px', background: '#fff' }}>
                    {std}
                  </span>
                ))}
              </div>
            </div>

            <div className="side-card">
              <h4>{t.serviceDetail.applicableSectorsHeading}</h4>
              <div className="side-chips">
                {service.sectors.map((sec, i) => (
                  <span key={i} className="side-chip" style={{ fontSize: '13px' }}>
                    {sec}
                  </span>
                ))}
              </div>
            </div>

            <div className="side-card">
              <h4>{t.serviceDetail.relatedServicesHeading}</h4>
              <div className="side-nav-list" role="navigation" aria-label={t.serviceDetail.relatedServicesAria}>
                {relatedServices.map((s) => {
                  const sHref = localizePath(`/services/${s.slug}`, lang);
                  return (
                    <a
                      key={s.slug}
                      href={sHref}
                      className="side-nav-item"
                      aria-label={`${s.title} (${s.ref})`}
                      aria-current={s.slug === service.slug ? 'page' : undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(sHref);
                      }}
                      style={{
                        borderColor: s.slug === service.slug ? 'var(--btn-green)' : undefined,
                        fontWeight: s.slug === service.slug ? 700 : undefined,
                        background: s.slug === service.slug ? 'rgba(100,156,8,0.06)' : undefined,
                      }}
                    >
                      <span>{s.title}</span>
                      <span className="num" aria-hidden="true">{s.ref}</span>
                    </a>
                  );
                })}
              </div>
              <a
                href={servicesListHref}
                aria-label={t.common.viewAllServicesCatalogue}
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
                  onNavigate(servicesListHref);
                }}
              >
                {t.common.viewAllServicesCatalogue}
              </a>
            </div>

            <div className="side-card" style={{ background: 'var(--slate)', color: '#fff', border: 'none' }}>
              <h4 style={{ color: 'var(--brand-light)' }}>{t.serviceDetail.technicalEnquiryHeading}</h4>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '20px' }}>
                {t.serviceDetail.technicalEnquiryText}
              </p>
              <a
                href={contactHref}
                className="btn btn-brand btn-full"
                aria-label={`${t.common.requestConsultation} — ${service.title}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(contactHref);
                }}
              >
                {t.common.requestConsultation}
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* ============ FOOTER CTA ============ */}
      <section className="svc-cta">
        <div className="wrap svc-cta-inner">
          <div>
            <h2>{t.serviceDetail.ctaTitle}</h2>
            <p className="svc-cta-sub">
              {t.serviceDetail.ctaSubtitle}
            </p>
          </div>
          <a
            href={contactHref}
            className="btn btn-brand"
            aria-label={t.common.requestConsultation}
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
