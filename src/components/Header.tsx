import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getNavLinks, isLinkActive } from '../utils/navigation';
import { useLanguage } from '../i18n/LanguageContext';
import { Language } from '../i18n/types';
import { localizePath } from '../i18n/routing';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onSwitchLanguage: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath,
  onNavigate,
  onSwitchLanguage,
}) => {
  const { lang, t } = useLanguage();
  const navLinks = getNavLinks(lang);
  const homeHref = localizePath('/', lang);

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll for shadow and slight height compression
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle drawer accessibility (scroll lock and Escape key)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      // Automatically focus the close button when opened for screen reader accessibility
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setMobileMenuOpen(false);
      onNavigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [onNavigate]
  );

  return (
    <header className={`nav ${isScrolled ? 'nav-scrolled' : ''}`} id="site-nav">
      <div className="header-inner">
        {/* Zone 1: Logo — far left in its own protected layout column */}
        <div className="header-logo-col">
          <a
            href={homeHref}
            className="logo"
            aria-label={t.nav.logoAriaLabel}
            onClick={(e) => handleLinkClick(e, homeHref)}
          >
            <img
              src="/assets/images/marvethabilogo.jpg"
              alt={t.common.siteName}
              decoding="async"
              width="168"
              height="70"
            />
          </a>
        </div>

        {/* Zone 2: Navigation — flexible middle space, progressive typography, never overlaps */}
        <nav
          className="nav-desktop"
          id="desktop-nav-links"
          aria-label={t.nav.desktopNavLabel}
        >
          {navLinks.map((link) => {
            const active = isLinkActive(link.href, currentPath);
            return (
              <a
                key={link.id}
                href={link.href}
                className={active ? 'active' : ''}
                aria-current={active ? 'page' : undefined}
                aria-label={link.ariaLabel}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Actions — extreme right (Flag language selector, LinkedIn, Download Profile button, and Hamburger toggle) */}
        <div className="header-actions">
          <div
            className="lang-switcher"
            role="group"
            aria-label={t.langSwitcher.groupLabel}
          >
            <button
              type="button"
              data-lang="en"
              className={`lang-switcher-btn ${lang === 'en' ? 'active' : ''}`}
              aria-pressed={lang === 'en'}
              aria-label={t.langSwitcher.switchToEn}
              title="English (South Africa)"
              onClick={() => {
                setMobileMenuOpen(false);
                onSwitchLanguage('en');
              }}
            >
              <svg
                className="lang-flag-svg"
                viewBox="0 0 30 20"
                width="22"
                height="15"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <clipPath id="flag-za-clip">
                    <rect width="30" height="20" rx="2" />
                  </clipPath>
                </defs>
                <g clipPath="url(#flag-za-clip)">
                  <rect width="30" height="20" fill="#FFFFFF" />
                  <polygon points="4.2,0 30,0 30,6.6 14.1,6.6" fill="#E03C31" />
                  <polygon points="4.2,20 30,20 30,13.4 14.1,13.4" fill="#001489" />
                  <polygon
                    points="0,0 2.0,0 14.2,8.1 30,8.1 30,11.9 14.2,11.9 2.0,20 0,20"
                    fill="#007749"
                  />
                  <polygon points="0,2.2 11.7,10 0,17.8" fill="#FFB81C" />
                  <polygon points="0,4.1 8.85,10 0,15.9" fill="#000000" />
                </g>
              </svg>
            </button>
            <button
              type="button"
              data-lang="fr"
              className={`lang-switcher-btn ${lang === 'fr' ? 'active' : ''}`}
              aria-pressed={lang === 'fr'}
              aria-label={t.langSwitcher.switchToFr}
              title="Français (France)"
              onClick={() => {
                setMobileMenuOpen(false);
                onSwitchLanguage('fr');
              }}
            >
              <svg
                className="lang-flag-svg"
                viewBox="0 0 30 20"
                width="22"
                height="15"
                aria-hidden="true"
                focusable="false"
              >
                <defs>
                  <clipPath id="flag-fr-clip">
                    <rect width="30" height="20" rx="2" />
                  </clipPath>
                </defs>
                <g clipPath="url(#flag-fr-clip)">
                  <rect x="0" y="0" width="10" height="20" fill="#002395" />
                  <rect x="10" y="0" width="10" height="20" fill="#FFFFFF" />
                  <rect x="20" y="0" width="10" height="20" fill="#ED2939" />
                </g>
              </svg>
            </button>
          </div>

          <a
            href="https://www.linkedin.com/company/marvethabi-consulting-engineers/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="header-social-btn"
            aria-label={t.nav.linkedInAriaLabel}
            title={t.common.followOnLinkedIn}
          >
            <svg
              viewBox="0 0 24 24"
              width="100%"
              height="100%"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              focusable="false"
              style={{ display: 'block', width: '100%', height: '100%' }}
            >
              <rect width="24" height="24" rx="4" fill="#0A66C2" />
              <path
                d="M7.07 18.5H4.22V9.33H7.07V18.5ZM5.64 8.08C4.73 8.08 4 7.34 4 6.43C4 5.52 4.73 4.79 5.64 4.79C6.55 4.79 7.28 5.52 7.28 6.43C7.28 7.34 6.55 8.08 5.64 8.08ZM19.78 18.5H16.94V14.04C16.94 12.98 16.92 11.61 15.46 11.61C13.98 11.61 13.75 12.77 13.75 13.96V18.5H10.91V9.33H13.63V10.58H13.67C14.05 9.86 14.98 9.1 16.36 9.1C19.24 9.1 19.78 11 19.78 13.46V18.5Z"
                fill="#FFFFFF"
              />
            </svg>
          </a>

          <a
            href="/marvethabiprofile.pdf"
            download="marvethabiprofile.pdf"
            className="header-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.nav.downloadAriaLabel}
            title={t.nav.downloadAriaLabel}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="cta-btn-text">{t.common.downloadProfile}</span>
          </a>

          <button
            className={`burger ${mobileMenuOpen ? 'open' : ''}`}
            id="burger"
            type="button"
            aria-label={mobileMenuOpen ? t.common.closeMenu : t.common.openMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-drawer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Accessible Backdrop for Mobile Drawer */}
      <div
        className={`mobile-nav-backdrop ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden="true"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Slide-Out Navigation Drawer */}
      <div
        ref={drawerRef}
        className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label={t.nav.mobileDrawerLabel}
      >
        <div className="mobile-drawer-header">
          <div className="mobile-drawer-brand">
            <img
              src="/assets/images/marvethabilogo.jpg"
              alt={t.common.siteName}
              width="120"
              height="48"
            />
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="mobile-drawer-close"
            aria-label={t.common.closeMenu}
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav className="mobile-drawer-links" aria-label={t.nav.mobileNavLabel}>
          {navLinks.map((link) => {
            const active = isLinkActive(link.href, currentPath);
            return (
              <a
                key={`mobile-${link.id}`}
                href={link.href}
                className={active ? 'active' : ''}
                aria-current={active ? 'page' : undefined}
                aria-label={link.ariaLabel}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                <span>{link.label}</span>
                <svg
                  className="chevron"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            );
          })}
        </nav>

        <div className="mobile-drawer-actions">
          <a
            href="/marvethabiprofile.pdf"
            download="marvethabiprofile.pdf"
            className="mobile-drawer-download"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.nav.downloadAriaLabel}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {t.common.downloadProfilePdf}
          </a>

          <a
            href="https://www.linkedin.com/company/marvethabi-consulting-engineers/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-drawer-social"
            aria-label={t.nav.linkedInAriaLabel}
          >
            <img
              src="/assets/images/linkedin.png"
              alt=""
              aria-hidden="true"
              width="20"
              height="20"
            />
            <span>{t.common.connectOnLinkedIn}</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
