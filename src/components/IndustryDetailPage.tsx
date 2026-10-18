import React, { useEffect } from 'react';
import {
  getIndustryDetail,
  industriesData,
  industryDetailsData,
  IndustryDetail,
} from '../data/marvethabi';

interface IndustryDetailPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const IndustryDetailPage: React.FC<IndustryDetailPageProps> = ({ slug, onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const industry: IndustryDetail =
    getIndustryDetail(slug) || industryDetailsData['government'];

  // Other sectors for the footer switcher
  const otherIndustries = industriesData.filter((ind) => ind.slug !== industry.slug);

  const handleLink = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <main className="ind-detail-page detail-page">
      {/* ============ HERO ============ */}
      <section className="svc-hero">
        <div className="svc-hero-grid-bg" aria-hidden="true"></div>

        <div className="wrap">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '20px',
              fontFamily: 'var(--font-mono, monospace)',
            }}
          >
            <a
              href="/"
              onClick={(e) => handleLink(e, '/')}
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              HOME
            </a>
            <span aria-hidden="true">&rsaquo;</span>
            <a
              href="/industries"
              onClick={(e) => handleLink(e, '/industries')}
              style={{ color: '#fff', textDecoration: 'none' }}
            >
              INDUSTRIES
            </a>
            <span aria-hidden="true">&rsaquo;</span>
            <span style={{ color: 'var(--brand-light, #5e9e8b)', fontWeight: 700 }}>
              {industry.name.toUpperCase()}
            </span>
          </nav>

          <h1 className="svc-hero-title">{industry.name}</h1>
          <p
            style={{
              fontSize: '19px',
              color: 'var(--brand-light, #5e9e8b)',
              fontWeight: 600,
              margin: '8px 0 16px',
            }}
          >
            {industry.tagline}
          </p>
          <p className="lead svc-hero-sub">{industry.summary}</p>
          <div className="svc-hero-tags">
            <span className="svc-hero-tag"><span className="tag-dot"></span>Critical Infrastructure Domain</span>
            <span className="svc-hero-tag"><span className="tag-dot"></span>Multi-Disciplinary Engineering Alignment</span>
          </div>
        </div>
      </section>

      {/* ============ WHERE OUR SERVICES FIT ============ */}
      <section className="detail-body-section" style={{ background: '#fff' }}>
        <div className="wrap">
          {/* Executive Section Header */}
          <div className="sec-head" style={{ marginBottom: '40px' }}>
            <span
              className="label"
              style={{
                color: 'var(--brand, #336659)',
                fontWeight: 700,
                display: 'block',
                marginBottom: '8px',
              }}
            >
              OPERATIONAL & STATUTORY INTEGRATION
            </span>
            <h2 style={{ fontSize: '32px', color: 'var(--ink, #0f1b18)' }}>
              Where Our Services Fit in {industry.name}
            </h2>
            <p style={{ maxWidth: '820px', fontSize: '16px', color: '#47564F', lineHeight: 1.7 }}>
              {industry.fitDescription}
            </p>
          </div>

          {/* Service Alignments by Discipline Group */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
            {industry.serviceAlignments.map((group, groupIdx) => (
              <div
                key={groupIdx}
                style={{
                  background: 'var(--grey, #f4f6f5)',
                  border: '1px solid var(--line, #e1e7e4)',
                  borderTop: '3px solid var(--btn-green, #173d34)',
                  padding: '36px 32px',
                  borderRadius: '3px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '24px',
                    paddingBottom: '16px',
                    borderBottom: '1px solid var(--line, #e1e7e4)',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--brand, #336659)',
                        display: 'block',
                        marginBottom: '4px',
                      }}
                    >
                      DISCIPLINE 0{groupIdx + 1}
                    </span>
                    <h3
                      style={{
                        fontSize: '22px',
                        color: 'var(--ink, #0f1b18)',
                        margin: 0,
                        fontFamily: 'var(--font-heading)',
                      }}
                    >
                      {group.category}
                    </h3>
                  </div>
                  <span
                    className="side-chip num"
                    style={{
                      fontSize: '12px',
                      background: '#fff',
                      fontWeight: 600,
                      color: 'var(--ink, #0f1b18)',
                    }}
                  >
                    {group.services.length} SERVICE LINES
                  </span>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '24px',
                  }}
                >
                  {group.services.map((svc) => (
                    <div
                      key={svc.ref}
                      style={{
                        background: '#fff',
                        border: '1px solid var(--line, #e1e7e4)',
                        padding: '24px',
                        borderRadius: '2px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        gap: '16px',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginBottom: '10px',
                          }}
                        >
                          <span
                            className="num"
                            style={{
                              fontSize: '12px',
                              fontWeight: 700,
                              color: 'var(--brand, #336659)',
                              background: 'var(--grey, #f4f6f5)',
                              padding: '2px 8px',
                              borderRadius: '2px',
                            }}
                          >
                            {svc.ref}
                          </span>
                          <span
                            style={{
                              fontSize: '10px',
                              fontWeight: 700,
                              color: '#6e7e78',
                              letterSpacing: '0.08em',
                              textTransform: 'uppercase',
                            }}
                          >
                            STATUTORY DELIVERABLE
                          </span>
                        </div>
                        <h4
                          style={{
                            fontSize: '17px',
                            color: 'var(--ink, #0f1b18)',
                            margin: '0 0 10px',
                            fontWeight: 700,
                            lineHeight: 1.35,
                          }}
                        >
                          {svc.name}
                        </h4>
                        <p
                          style={{
                            fontSize: '14px',
                            color: '#47564F',
                            lineHeight: 1.6,
                            margin: 0,
                          }}
                        >
                          {svc.description}
                        </p>
                      </div>

                      <div style={{ paddingTop: '8px', borderTop: '1px solid #f0f4f2' }}>
                        <a
                          href={`/services/${svc.slug}`}
                          onClick={(e) => handleLink(e, `/services/${svc.slug}`)}
                          style={{
                            fontSize: '13px',
                            fontWeight: 700,
                            color: 'var(--brand, #336659)',
                            textDecoration: 'none',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          View {svc.name} Details &rarr;
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CHALLENGES & OUTCOMES ============ */}
      <section className="detail-body-section" style={{ background: 'var(--grey, #f4f6f5)' }}>
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '48px',
            }}
          >
            {/* Challenges Column */}
            <div
              style={{
                background: '#fff',
                padding: '36px 32px',
                borderLeft: '4px solid #c85a48',
                borderRadius: '2px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#c85a48',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                OPERATIONAL & REGULATORY RISKS
              </span>
              <h3
                style={{
                  fontSize: '22px',
                  color: 'var(--ink, #0f1b18)',
                  marginBottom: '20px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Key Sector Challenges We Solve
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: 0, margin: 0, listStyle: 'none' }}>
                {industry.keyChallenges.map((challenge, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '14px',
                      color: '#3C4A45',
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{
                        color: '#c85a48',
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '18px',
                        flexShrink: 0,
                      }}
                    >
                      &times;
                    </span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcomes Column */}
            <div
              style={{
                background: '#fff',
                padding: '36px 32px',
                borderLeft: '4px solid var(--btn-green, #173d34)',
                borderRadius: '2px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--btn-green, #173d34)',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                MEASURABLE ADVANTAGES
              </span>
              <h3
                style={{
                  fontSize: '22px',
                  color: 'var(--ink, #0f1b18)',
                  marginBottom: '20px',
                  fontFamily: 'var(--font-heading)',
                }}
              >
                Target Outcomes Delivered
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: 0, margin: 0, listStyle: 'none' }}>
                {industry.keyOutcomes.map((outcome, idx) => (
                  <li
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      fontSize: '14px',
                      color: '#3C4A45',
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--btn-green, #173d34)',
                        fontWeight: 700,
                        fontSize: '16px',
                        lineHeight: '18px',
                        flexShrink: 0,
                      }}
                    >
                      &#10003;
                    </span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATUTORY STANDARDS & REGULATORY FRAMEWORKS ============ */}
      <section className="detail-body-section" style={{ background: '#fff' }}>
        <div className="wrap">
          <div className="sec-head" style={{ marginBottom: '28px' }}>
            <h2>Applicable Statutory Standards & Regulators</h2>
            <p>
              Every engineering design, asset register, and environmental report for{' '}
              {industry.name} is delivered in strict conformity with national legislation.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            {industry.standards.map((std, i) => (
              <span
                key={i}
                className="side-chip num"
                style={{
                  fontSize: '13px',
                  background: 'var(--grey, #f4f6f5)',
                  border: '1px solid var(--line, #e1e7e4)',
                  borderLeft: '3px solid var(--brand, #336659)',
                  padding: '8px 16px',
                  color: 'var(--ink, #0f1b18)',
                  fontWeight: 600,
                }}
              >
                {std}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONSULTATION CTA ============ */}
      <section className="svc-cta">
        <div className="wrap svc-cta-inner">
          <div>
            <span
              className="label"
              style={{ color: 'var(--brand-light, #5e9e8b)', display: 'block', marginBottom: '8px' }}
            >
              SECTOR ADVISORY & APPOINTMENTS
            </span>
            <h2>Partner With Our Registered Specialists</h2>
            <p className="svc-cta-sub">
              Discuss your sector infrastructure project, statutory compliance review, or asset register
              with MarveThabi&apos;s registered engineers and scientists.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a
              href="/contact"
              className="btn btn-brand"
              onClick={(e) => handleLink(e, '/contact')}
            >
              Request Consultation
            </a>
            <a
              href="/services"
              className="btn btn-ghost"
              onClick={(e) => handleLink(e, '/services')}
            >
              Master Services Catalogue
            </a>
          </div>
        </div>
      </section>

      {/* ============ BROWSE OTHER SECTORS ============ */}
      <section
        style={{
          background: 'var(--slate, #162420)',
          padding: '64px 0',
          borderTop: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div className="wrap">
          <div style={{ marginBottom: '32px', textAlign: 'center' }}>
            <span
              className="label"
              style={{
                color: 'var(--brand-light, #5e9e8b)',
                letterSpacing: '0.12em',
                display: 'block',
                marginBottom: '8px',
              }}
            >
              CROSS-SECTOR SPECIALISATION
            </span>
            <h3
              style={{
                fontSize: '24px',
                color: '#fff',
                fontFamily: 'var(--font-heading)',
                margin: 0,
              }}
            >
              Browse Other Industries We Serve
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
            }}
          >
            {otherIndustries.map((ind) => (
              <a
                key={ind.name}
                href={`/industries/${ind.slug}`}
                onClick={(e) => handleLink(e, `/industries/${ind.slug}`)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  padding: '20px 16px',
                  borderRadius: '2px',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  gap: '10px',
                  transition: 'background 0.2s ease, border-color 0.2s ease, transform 0.2s ease',
                }}
              >
                <svg
                  viewBox="0 0 48 48"
                  style={{ width: '28px', height: '28px', stroke: 'var(--brand-light, #5e9e8b)', strokeWidth: 1.8 }}
                  aria-hidden="true"
                >
                  <path d={ind.path} fill="none" />
                </svg>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 700,
                    color: '#fff',
                    lineHeight: 1.3,
                  }}
                >
                  {ind.name}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    color: 'var(--brand-light, #5e9e8b)',
                    fontWeight: 600,
                  }}
                >
                  Where We Fit &rarr;
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};
