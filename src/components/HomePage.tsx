import React, { useState, useEffect } from 'react';
import {
  servicesData,
  clientsData,
} from '../data/marvethabi';
import { AccreditationSection } from './AccreditationSection';
import { AffiliationsSection } from './AffiliationsSection';
import {
  HERO_SLIDES,
  HERO_SLIDE_INTERVAL_MS,
  INITIAL_SLIDE_STATE,
  getNextSlideState,
  getSlideLayerStyle,
  type HeroSlideState,
} from '../utils/heroSlideshow';
import { useLanguage } from '../i18n/LanguageContext';
import { getLocalizedServices, getLocalizedIndustries } from '../i18n/data';
import { localizePath } from '../i18n/routing';

interface HomePageProps {
  onNavigate?: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { lang, t } = useLanguage();
  const localizedServices = getLocalizedServices(lang);
  const localizedIndustries = getLocalizedIndustries(lang);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    org: '',
    email: '',
    phone: '',
    service: '',
    details: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'pending' | 'error'>('idle');
  const [formNotice, setFormNotice] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [clientView, setClientView] = useState<'carousel' | 'grid'>('carousel');
  const [slideState, setSlideState] = useState<HeroSlideState>(INITIAL_SLIDE_STATE);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  // Preload all three hero background images and manage continuous crossfade timer
  useEffect(() => {
    HERO_SLIDES.forEach((slide) => {
      const img = new Image();
      img.src = slide.src;
      if (typeof img.decode === 'function') {
        img.decode().catch(() => {});
      }
    });

    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };
    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMotionChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = window.setInterval(() => {
      setSlideState((prev) => getNextSlideState(prev, HERO_SLIDES.length));
    }, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [prefersReducedMotion]);

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

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      setFormNotice(t.home.formRequiredError);
      setFormStatus('error');
      return;
    }

    setIsSubmitting(true);
    setFormStatus('idle');
    setFormNotice('');

    // Preserve canonical English service category name for backend routing while keeping user inputs untranslated
    const serviceLabel = formData.service || 'General Enquiry';
    const payload = {
      fullName: formData.name.trim(),
      organisation: formData.org.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      categoryId: formData.service ? 'engineering-services' : 'general-enquiry',
      categoryName: serviceLabel,
      subject: `${serviceLabel} — ${t.home.formDefaultSubjectSuffix}`,
      details:
        formData.details.trim() ||
        `${t.home.formDefaultDetailsPrefix} ${serviceLabel}.`,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const resData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(resData.error || t.home.formFallbackError);
      }

      if (resData.delivered) {
        setFormNotice(
          t.home.formSuccessDelivered
            .replace('{ref}', resData.referenceNumber || '')
            .replace('{email}', resData.targetEmail || 'info@marvethabi.co.za')
        );
        setFormStatus('success');
      } else {
        setFormNotice(
          t.home.formSuccessLogged.replace('{ref}', resData.referenceNumber || 'logged')
        );
        setFormStatus('success');
      }

      setFormData({
        name: '',
        org: '',
        email: '',
        phone: '',
        service: '',
        details: '',
      });
    } catch (err: any) {
      setFormNotice(err?.message || t.home.formFallbackError);
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const servicesHref = localizePath('/services', lang);
  const contactHref = localizePath('/contact', lang);

  return (
    <main id="top">
      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero-photo" aria-hidden="true"></div>
        <div
          className="hero-photo-grey"
          aria-hidden="true"
          data-testid="hero-slideshow"
          data-active-slide={HERO_SLIDES[slideState.activeIndex]?.id}
        >
          {HERO_SLIDES.map((slide, index) => {
            const layerStyle = getSlideLayerStyle(index, slideState, prefersReducedMotion);
            return (
              <div
                key={slide.id}
                className="hero-slide"
                data-slide-id={slide.id}
                data-active={index === slideState.activeIndex ? 'true' : 'false'}
                style={{
                  backgroundImage: `url('${slide.src}')`,
                  backgroundPosition: slide.position,
                  zIndex: layerStyle.zIndex,
                  opacity: layerStyle.opacity,
                  transition: layerStyle.transition,
                }}
              />
            );
          })}
        </div>
        <div className="hero-fade" aria-hidden="true"></div>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <div className="hero-reg label">
              <span>{t.home.heroRegEcsa}</span>
              <span className="dot" aria-hidden="true"></span>
              <span>{t.home.heroRegSacnasp}</span>
              <span className="dot" aria-hidden="true"></span>
              <span>{t.home.heroRegCsd}</span>
            </div>
            <h1 className="hero-title">{t.home.heroTitle}</h1>
            <p className="hero-sub lead">
              {t.home.heroSubtitle}
            </p>
            <div className="hero-cta">
              <a
                href={servicesHref}
                className="btn btn-brand"
                aria-label={t.home.heroExploreAria}
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) {
                    onNavigate(servicesHref);
                  } else {
                    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t.common.exploreServices}
              </a>
              <a
                href={contactHref}
                className="btn btn-ghost"
                aria-label={t.home.heroConsultAria}
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavigate) {
                    onNavigate(contactHref);
                  } else {
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {t.common.requestConsultation}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLIENTS SECTION ============ */}
      <section className="cred" aria-labelledby="cred-title">
        <div className="wrap cred-wrap">
          <p className="cred-head" id="cred-title">{t.home.clientsHeading}</p>
          <div className="client-view-toggle" role="group" aria-label={t.home.clientToggleGroupAria}>
            <button
              type="button"
              className={`client-toggle-btn ${clientView === 'carousel' ? 'active' : ''}`}
              onClick={() => setClientView('carousel')}
              aria-pressed={clientView === 'carousel'}
              aria-label={t.home.scrollViewAria}
              title={t.home.scrollViewTitle}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              {t.home.scrollView}
            </button>
            <button
              type="button"
              className={`client-toggle-btn ${clientView === 'grid' ? 'active' : ''}`}
              onClick={() => setClientView('grid')}
              aria-pressed={clientView === 'grid'}
              aria-label={t.home.gridViewAria}
              title={t.home.gridViewTitle}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              {t.home.gridView}
            </button>
          </div>
        </div>

        {clientView === 'carousel' ? (
          <div className="marquee" aria-label={t.home.scrollingClientsAria}>
            <div className="marquee-track">
              {[0, 1].map((pass) => (
                <React.Fragment key={pass}>
                  {clientsData.map((client, idx) => (
                    <span
                      key={`${pass}-${idx}`}
                      className="marquee-item"
                      aria-hidden={pass === 1 ? 'true' : undefined}
                      title={client.name}
                    >
                      <img
                        src={`/assets/images/${client.logo}`}
                        alt={pass === 0 ? `${client.name} ${t.home.clientLogoAltSuffix}` : ''}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        ) : (
          <div className="client-grid" role="list" aria-label={t.home.gridClientsAria}>
            {clientsData.map((client) => (
              <div key={client.name} className="client-grid-card" role="listitem" title={client.name}>
                <img
                  src={`/assets/images/${client.logo}`}
                  alt={`${client.name} ${t.home.clientLogoAltSuffix}`}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ============ INDUSTRIES ============ */}
      <section className="industries" id="industries">
        <div className="ind-bg" aria-hidden="true"></div>
        <div className="wrap ind-content">
          <div className="sec-head sec-head-light reveal">
            <h2>{t.home.industriesHeading}</h2>
            <p>{t.home.industriesSubtitle}</p>
          </div>
          <div className="ind-grid">
            {localizedIndustries.map((ind, i) => {
              const indHref = localizePath(`/industries/${ind.slug}`, lang);
              return (
                <a
                  key={ind.slug}
                  href={indHref}
                  className={`ind-card ind-card-link reveal r-delay-${i % 4}`}
                  aria-label={`${t.home.industryAriaPrefix} ${ind.name}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (onNavigate) {
                      onNavigate(indHref);
                    }
                  }}
                  style={{
                    textDecoration: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    borderRadius: '6px',
                    transition: 'transform 0.25s ease, background 0.25s ease, border-color 0.25s ease',
                  }}
                  title={`${t.home.industryTitlePrefix} ${ind.name}`}
                >
                  <svg viewBox="0 0 48 48" className="ind-icon" aria-hidden="true">
                    <path d={ind.path} fill="none" />
                  </svg>
                  <span className="card-title" style={{ marginTop: '12px' }}>{ind.name}</span>
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--brand-light, #5e9e8b)',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      marginTop: '8px',
                      textTransform: 'uppercase',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {t.common.whereWeFit}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ OUR ACCREDITATION ============ */}
      <AccreditationSection />

      {/* ============ PROFESSIONAL AFFILIATIONS ============ */}
      <AffiliationsSection />

      {/* ============ CONTACT ============ */}
      <section className="contact" id="contact">
        <div className="wrap contact-grid">
          <div className="reveal">
            <h2>{t.home.contactHeading}</h2>
            <p className="contact-lead lead">
              {t.home.contactLead}
            </p>
            <div className="contact-block">
              <span className="c-label label">{t.home.officeLabel}</span>
              <p>{t.common.officeAddress}</p>
            </div>
            <div className="contact-block">
              <span className="c-label label">{t.home.enquiriesLabel}</span>
              <p className="num">info@marvethabi.co.za</p>
              <p className="num">+27 82 412 3847</p>
              <p className="num">+27 72 834 7953</p>
            </div>
            <div className="contact-block">
              <span className="c-label label">{t.home.registrationsLabel}</span>
              <p className="num regs-line">{t.home.registrationsLine}</p>
            </div>
          </div>
          <div className="reveal r-delay-1">
            <form className="form-card" onSubmit={handleFormSubmit} noValidate>
              {formStatus === 'success' && (
                <p className="form-notice form-notice-ok">
                  {formNotice || t.home.formGenericSuccess}
                </p>
              )}
              {formStatus === 'pending' && (
                <p className="form-notice form-notice-ok">
                  {formNotice}
                </p>
              )}
              {formStatus === 'error' && (
                <p className="form-notice form-notice-err">
                  {formNotice || t.home.formRequiredError}
                </p>
              )}
              <div className="form-row">
                <label>
                  {t.home.formFullName}
                  <input
                    type="text"
                    name="mt_name"
                    placeholder={t.home.formFullNamePlaceholder}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </label>
                <label>
                  {t.home.formOrganisation}
                  <input
                    type="text"
                    name="mt_org"
                    placeholder={t.home.formOrganisationPlaceholder}
                    value={formData.org}
                    onChange={(e) => setFormData({ ...formData, org: e.target.value })}
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  {t.home.formEmail}
                  <input
                    type="email"
                    name="mt_email"
                    placeholder={t.home.formEmailPlaceholder}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </label>
                <label>
                  {t.home.formPhone}
                  <input
                    type="tel"
                    name="mt_phone"
                    placeholder={t.home.formPhonePlaceholder}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </label>
              </div>
              <label>
                {t.home.formService}
                <select
                  name="mt_service"
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="" disabled>
                    {t.home.formServicePlaceholder}
                  </option>
                  {localizedServices.map((svc, idx) => {
                    const canonicalTitle = servicesData[idx]?.title || svc.title;
                    return (
                      <option key={svc.ref} value={canonicalTitle}>
                        {svc.title}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label>
                {t.home.formDetails}
                <textarea
                  name="mt_details"
                  rows={4}
                  placeholder={t.home.formDetailsPlaceholder}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                ></textarea>
              </label>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-brand btn-full"
                aria-label={t.home.formSubmitAria}
              >
                {isSubmitting ? t.home.formSubmitting : t.home.formSubmit}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};
