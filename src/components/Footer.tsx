import React from 'react';
import { getNavLinks } from '../utils/navigation';
import { useLanguage } from '../i18n/LanguageContext';
import { localizePath } from '../i18n/routing';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { lang, t } = useLanguage();
  const navLinks = getNavLinks(lang);
  const homeHref = localizePath('/', lang);
  const currentYear = new Date().getFullYear();

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    onNavigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="foot">
      <div className="wrap foot-grid">
        <div>
          <div className="foot-logo">
            <a href={homeHref} aria-label={t.footer.logoAriaLabel} onClick={(e) => handleLink(e, homeHref)}>
              <img src="/assets/images/marvethabilogo.jpg" alt={t.footer.logoAlt} loading="lazy" />
            </a>
          </div>
          <p className="foot-tag">
            {t.footer.tagline}
          </p>
          <a
            href="https://www.linkedin.com/company/marvethabi-consulting-engineers/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.nav.linkedInAriaLabel}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '16px',
              padding: '8px 14px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              color: '#fff',
              fontSize: '13px',
              fontWeight: 500,
              textDecoration: 'none',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            <img
              src="/assets/images/linkedin.png"
              alt=""
              aria-hidden="true"
              width="22"
              height="22"
              style={{
                width: '22px',
                height: '22px',
                objectFit: 'contain',
                borderRadius: '4px',
                flexShrink: 0,
                display: 'block',
              }}
            />
            {t.common.followOnLinkedIn}
          </a>
        </div>
        <div>
          {lang === 'en' ? <span className="foot-h">Company</span> : <span className="foot-h">{t.footer.companyHeading}</span>}
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-label={link.ariaLabel}
              onClick={(e) => handleLink(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div>
          {lang === 'en' ? <span className="foot-h">Contact</span> : <span className="foot-h">{t.footer.contactHeading}</span>}
          <span className="foot-addr">{t.common.officeAddress}</span>
          <a href="mailto:info@marvethabi.co.za" className="num foot-num" aria-label={t.footer.emailAria} style={{ textDecoration: 'none', color: 'inherit' }}>
            info@marvethabi.co.za
          </a>
          <a href="tel:+27824123847" className="num foot-num" aria-label={t.footer.phone1Aria} style={{ textDecoration: 'none', color: 'inherit' }}>
            +27 82 412 3847
          </a>
          <a href="tel:+27728347953" className="num foot-num" aria-label={t.footer.phone2Aria} style={{ textDecoration: 'none', color: 'inherit' }}>
            +27 72 834 7953
          </a>
          <a
            href="https://www.linkedin.com/company/marvethabi-consulting-engineers/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.footer.linkedInAria}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '10px',
              color: 'var(--brand-light, #5e9e8b)',
              fontWeight: 600,
              fontSize: '13.5px',
              maxWidth: '100%',
              boxSizing: 'border-box',
            }}
          >
            <img
              src="/assets/images/linkedin.png"
              alt=""
              aria-hidden="true"
              width="20"
              height="20"
              style={{
                width: '20px',
                height: '20px',
                objectFit: 'contain',
                borderRadius: '3px',
                flexShrink: 0,
                display: 'block',
              }}
            />
            {t.common.linkedInProfileArrow}
          </a>
        </div>
      </div>
      <div className="wrap foot-base">
        <span className="num">&copy; {currentYear} {t.common.legalName}</span>
        <span className="num">{t.common.regNo}</span>
      </div>
    </footer>
  );
};
