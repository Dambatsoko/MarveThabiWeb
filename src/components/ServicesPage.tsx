import React, { useState, useEffect } from 'react';
import {
  serviceGroupsData,
  sanitizeTitle,
  getServiceSlugForRef,
} from '../data/marvethabi';
import { SvcIcon } from './ServiceIcons';
import { useLanguage } from '../i18n/LanguageContext';
import {
  getLocalizedServiceGroups,
  getLocalizedAffiliations,
  getLocalizedServiceAlt,
} from '../i18n/data';
import { localizePath } from '../i18n/routing';

interface ServicesPageProps {
  onNavigate: (path: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const { lang, t } = useLanguage();
  const serviceGroups = getLocalizedServiceGroups(lang);
  const affiliations = getLocalizedAffiliations(lang);
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
  }, [lang]);

  // Directory scroll-spy using canonical English anchor IDs so anchors work cleanly across languages
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
  }, [lang]);

  const scrollToTarget = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id) || (id === 'environmental-management' ? document.getElementById('environmental-services') : null);
    if (el) {
      const headerOffset = 96;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSpy(el.id);
    }
  };

  const contactHref = localizePath('/contact', lang);

  return (
    <main className="svc-page">
      {/* ============ PAGE HERO ============ */}
      <section className="svc-hero">
        <div className="svc-hero-grid-bg" aria-hidden="true"></div>

        <div className="wrap">
          <h1 className="svc-hero-title">{t.servicesPage.heroTitle}</h1>
          <p className="lead svc-hero-sub" style={{ marginBottom: '12px' }}>
            {t.servicesPage.heroP1}
          </p>
          <p className="lead svc-hero-sub">
            {t.servicesPage.heroP2}
          </p>
          <div className="svc-hero-index" role="navigation" aria-label={t.servicesPage.quickJumpAria}>
            {serviceGroups.map((g) => (
              <a
                key={g.id}
                href={`#${g.id}`}
                className="svc-hero-chip"
                aria-label={`${t.servicesPage.jumpToPrefix} ${g.no}: ${g.title}`}
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
          <aside className="svc-dir" aria-label={t.servicesPage.directoryAria}>
            <span className="label svc-dir-h">{t.servicesPage.directoryLabel}</span>
            {serviceGroups.map((g, gIdx) => (
              <React.Fragment key={g.id}>
                <a
                  href={`#${g.id}`}
                  className={`svc-dir-group ${activeSpy === g.id ? 'active' : ''}`}
                  aria-label={`${t.servicesPage.navigateToPrefix} ${g.no}: ${g.title}`}
                  aria-current={activeSpy === g.id ? 'true' : undefined}
                  onClick={(e) => scrollToTarget(e, g.id)}
                >
                  <span className="num" aria-hidden="true">{g.no}</span> {g.title}
                </a>
                {g.services.map((svc, sIdx) => {
                  const canonicalTitle = serviceGroupsData[gIdx]?.services[sIdx]?.title || svc.title;
                  const sid = sanitizeTitle(canonicalTitle);
                  return (
                    <a
                      key={svc.ref}
                      href={`#${sid}`}
                      className={`svc-dir-item ${activeSpy === sid ? 'active' : ''}`}
                      aria-label={`${t.servicesPage.navigateToPrefix} ${svc.title} (${svc.ref})`}
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
            {serviceGroups.map((g, gIdx) => (
              <section key={g.id} className="svc-group" id={g.id}>
                <div className="svc-group-head reveal">
                  <span className="num svc-group-no">{g.no}</span>
                  <div>
                    <h2>{g.title}</h2>
                    {g.intro ? <p className="svc-group-intro">{g.intro}</p> : null}
                  </div>
                </div>

                {g.services.map((svc, sIdx) => {
                  const canonicalTitle = serviceGroupsData[gIdx]?.services[sIdx]?.title || svc.title;
                  const sid = sanitizeTitle(canonicalTitle);
                  const imageAlt = getLocalizedServiceAlt(svc.ref, svc.title, lang);
                  const detailHref = localizePath(`/services/${getServiceSlugForRef(svc.ref)}`, lang);
                  return (
                    <article key={svc.ref} className="sline reveal" id={sid}>
                      <div className="sline-media">
                        <img
                          src={`/assets/images/${svc.img}`}
                          alt={imageAlt}
                          aria-label={`${svc.title} (${svc.ref}) ${t.servicesPage.photoAriaSuffix}`}
                          referrerPolicy="no-referrer"
                          loading="lazy"
                          decoding="async"
                          onError={(e) => {
                            const target = e.currentTarget;
                            const tried = parseInt(target.dataset.tried || '0', 10);
                            if (tried === 0) {
                              target.dataset.tried = '1';
                              target.src = `/assets/images/${svc.img.replace(/&/g, '%26')}`;
                            } else if (tried === 1) {
                              target.dataset.tried = '2';
                              target.src = `/assets/images/electronic-electrical-engineering.png`;
                            }
                          }}
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
                          href={detailHref}
                          className="sline-more-btn"
                          aria-label={`${t.servicesPage.readMoreAriaPrefix} ${svc.title} (${svc.ref})`}
                          onClick={(e) => {
                            e.preventDefault();
                            onNavigate(detailHref);
                          }}
                        >
                          {t.common.readMore}
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
          <h2 className="affil-head reveal">{t.servicesPage.affiliationsTitle}</h2>
          <p className="affil-sub reveal">
            {t.servicesPage.affiliationsSubtitle}
          </p>
          <div className="affil-row" role="list">
            {affiliations.map((aff, i) => (
              <div key={aff.logo} className={`affil-card reveal r-delay-${i}`} role="listitem">
                <img
                  src={`/assets/images/${aff.logo}`}
                  alt={`${aff.name} ${t.servicesPage.affiliationsAltSuffix}`}
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
            <h2>{t.servicesPage.ctaTitle}</h2>
            <p className="svc-cta-sub">
              {t.servicesPage.ctaSubtitle}
            </p>
          </div>
          <a
            href={contactHref}
            className="btn btn-brand"
            aria-label={t.servicesPage.ctaAria}
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
