import React, { useState, useEffect } from 'react';
import {
  serviceGroupsData,
  affiliationsData,
  sanitizeTitle,
  getServiceSlugForRef,
} from '../data/marvethabi';
import { SvcIcon } from './ServiceIcons';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

const serviceAltMap: Record<string, string> = {
  'RE-01': 'Reliability engineering specialist performing vibration analysis and diagnostic testing on industrial rotating plant machinery',
  'AM-02': 'Physical asset management verification, lifecycle costing, and ISO 55000 asset register hierarchy classification',
  'CM-01': 'Condition monitoring diagnostics technician utilizing infrared thermography and ultrasonic testing on operational electrical and mechanical equipment',
  'EC-03': 'Electrical contractor installing commercial switchgear, backup diesel generator, and high-voltage cable reticulation systems',
  'EE-04': 'High-voltage electrical substation infrastructure, overhead transmission lines, and municipal reticulation network',
  'ME-05': 'Heavy mining equipment maintenance, pit dewatering pumps, and processing plant infrastructure engineering',
  'PM-06': 'Engineering project managers reviewing construction blueprints and technical specifications during on-site quality assurance',
  'GE-04': 'Environmental scientist collecting water samples and conducting catchment resource management in the natural environment',
  'WS-06': 'Industrial waste classification, emissions monitoring equipment, and environmental waste compliance auditing',
  'WM-05': 'Hydrogeologist monitoring groundwater borehole yield and water quality for Water Use Licence (WULA) compliance',
  'AQ-07': 'Specialist air quality monitoring station with dust fallout sampling gauges and atmospheric emissions testing equipment',
  'GG-08': 'Greenhouse gas emissions monitoring, carbon footprint calculation, and mandatory NAEIS reporting instrumentation',
  'HS-09': 'Hydrogeologist conducting geophysical resistivity survey and borehole yield testing for groundwater aquifer characterisation',
  'GS-10': 'Geologist performing rock mass core logging, foundation structural analysis, and geotechnical subsurface mapping',
  'SS-11': 'Professional land surveyor operating high-precision electronic total station and GNSS rover for topographical site mapping',
  'AP-10': 'Environmental consultant preparing statutory EIA, EMPr, and environmental authorisation documentation for regulatory compliance',
  'CA-11': 'Environmental Control Officer (ECO) inspecting site water runoff channels and performing aquatic biomonitoring',
  'ER-12': 'Mine land environmental rehabilitation featuring contaminated soil remediation and indigenous vegetation restoration',
};

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const [activeSpy, setActiveSpy] = useState<string>('engineering-services');

  // Setup scroll reveals
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const reveals = document.querySelectorAll('.reveal');

    if (reveals.length && 'IntersectionObserver' in window && !reduced) {
      const ro = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('on');
              ro.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      reveals.forEach((el) => ro.observe(el));
      return () => ro.disconnect();
    } else {
      reveals.forEach((el) => el.classList.add('on'));
    }
  }, []);

  // Directory scroll-spy
  useEffect(() => {
    const allTargetIds: string[] = [];
    serviceGroupsData.forEach((g) => {
      allTargetIds.push(g.id);
      g.services.forEach((s) => {
        allTargetIds.push(sanitizeTitle(s.title));
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSpy(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px' }
    );

    allTargetIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToTarget = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 96;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSpy(id);
    }
  };

  return (
    <main className="svc-page">
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
            <span>Engineering Services</span>
          </nav>
          <h1 className="svc-hero-title">Engineering Services</h1>
          <p className="lead svc-hero-sub">
            Three disciplines. Twelve service lines. One accountable consultancy for
            reliability, electrical and geo-environmental work across government, mining,
            energy and industry.
          </p>
          <div className="svc-hero-index" role="navigation" aria-label="Service categories quick jump">
            {serviceGroupsData.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="svc-hero-chip"
                aria-label={`Jump to Group ${g.no}: ${g.title}`}
                onClick={(e) => scrollToTarget(e, g.id)}
              >
                <span className="num" aria-hidden="true">{g.no}</span>
                {g.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CATALOGUE ============ */}
      <section className="svc-catalogue">
        <div className="wrap svc-layout">
          {/* Directory */}
          <aside className="svc-dir" aria-label="Service directory">
            <span className="label svc-dir-h">Directory</span>
            {serviceGroupsData.map((g) => (
              <React.Fragment key={g.id}>
                <a
                  href={`#${g.id}`}
                  className={`svc-dir-group ${activeSpy === g.id ? 'active' : ''}`}
                  aria-label={`Navigate to Group ${g.no}: ${g.title}`}
                  aria-current={activeSpy === g.id ? 'true' : undefined}
                  onClick={(e) => scrollToTarget(e, g.id)}
                >
                  <span className="num" aria-hidden="true">{g.no}</span> {g.title}
                </a>
                {g.services.map((svc) => {
                  const sid = sanitizeTitle(svc.title);
                  return (
                    <a
                      key={svc.ref}
                      href={`#${sid}`}
                      className={`svc-dir-item ${activeSpy === sid ? 'active' : ''}`}
                      aria-label={`Navigate to ${svc.title} (${svc.ref})`}
                      aria-current={activeSpy === sid ? 'true' : undefined}
                      onClick={(e) => scrollToTarget(e, sid)}
                    >
                      <span className="num" aria-hidden="true">{svc.ref}</span> {svc.title}
                    </a>
                  );
                })}
              </React.Fragment>
            ))}
          </aside>

          {/* Groups */}
          <div className="svc-flow">
            {serviceGroupsData.map((g) => (
              <section key={g.id} className="svc-group" id={g.id}>
                <div className="svc-group-head reveal">
                  <span className="num svc-group-no">{g.no}</span>
                  <div>
                    <h2>{g.title}</h2>
                    <p className="svc-group-intro">{g.intro}</p>
                  </div>
                </div>

                {g.services.map((svc) => {
                  const sid = sanitizeTitle(svc.title);
                  const imageAlt = serviceAltMap[svc.ref] || `${svc.title} - ${svc.ref} engineering service`;
                  return (
                    <article key={svc.ref} className="sline reveal" id={sid}>
                      <div className="sline-media">
                        <img
                          src={`/assets/images/${svc.img}`}
                          alt={imageAlt}
                          aria-label={`${svc.title} (${svc.ref}) service photograph`}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <div className="sline-body">
                        <div className="sline-head">
                          <SvcIcon name={svc.icon} className="sline-icon" />
                          <div>
                            <h3 className="card-title">{svc.title}</h3>
                            <p className="sline-desc">{svc.desc}</p>
                          </div>
                        </div>
                        <ul className="sline-items">
                          {svc.items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                        <a
                          href={`/services/${getServiceSlugForRef(svc.ref)}`}
                          className="sline-more-btn"
                          aria-label={`Read technical specifications and deliverables for ${svc.title} (${svc.ref})`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(`/services/${getServiceSlugForRef(svc.ref)}`);
                          }}
                        >
                          Read More
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            focusable="false"
                          >
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </a>
                      </div>
                    </article>
                  );
                })}
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* ============ AFFILIATIONS ============ */}
      <section className="affil">
        <div className="wrap">
          <h2 className="affil-head reveal">Professional Affiliations</h2>
          <p className="affil-sub reveal">
            Our engineers and scientists are registered with the statutory councils that
            govern South African engineering and natural science practice.
          </p>
          <div className="affil-row" role="list">
            {affiliationsData.map((aff, i) => (
              <div key={aff.name} className={`affil-card reveal r-delay-${i}`} role="listitem">
                <img
                  src={`/assets/images/${aff.logo}`}
                  alt={`${aff.name} logo - professional registration`}
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
            <h2>Scope It With an Engineer</h2>
            <p className="svc-cta-sub">
              Send the requirement, receive a technically scoped response from a registered
              professional.
            </p>
          </div>
          <a
            href="/contact"
            className="btn btn-brand"
            aria-label="Request a technical consultation with our registered engineers"
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
