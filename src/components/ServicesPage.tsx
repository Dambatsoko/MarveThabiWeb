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
      el.scrollIntoView({ behavior: 'smooth' });
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
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }}>
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
          <div className="svc-hero-index">
            {serviceGroupsData.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="svc-hero-chip"
                onClick={(e) => scrollToTarget(e, g.id)}
              >
                <span className="num">{g.no}</span>
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
                  onClick={(e) => scrollToTarget(e, g.id)}
                >
                  <span className="num">{g.no}</span> {g.title}
                </a>
                {g.services.map((svc) => {
                  const sid = sanitizeTitle(svc.title);
                  return (
                    <a
                      key={svc.ref}
                      href={`#${sid}`}
                      className={`svc-dir-item ${activeSpy === sid ? 'active' : ''}`}
                      onClick={(e) => scrollToTarget(e, sid)}
                    >
                      <span className="num">{svc.ref}</span> {svc.title}
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
                  return (
                    <article key={svc.ref} className="sline reveal" id={sid}>
                      <div className="sline-media">
                        <img
                          src={`/assets/images/${svc.img}`}
                          alt={svc.title}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="num sline-ref">{svc.ref}</span>
                        <div className="sline-scan" aria-hidden="true"></div>
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
          <div className="affil-row">
            {affiliationsData.map((aff, i) => (
              <div key={aff.name} className={`affil-card reveal r-delay-${i}`}>
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
            <h2>Scope It With an Engineer</h2>
            <p className="svc-cta-sub">
              Send the requirement, receive a technically scoped response from a registered
              professional.
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
