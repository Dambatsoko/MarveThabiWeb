import React, { useState, useEffect, useCallback, useRef } from 'react';
import { NAV_LINKS, isLinkActive } from '../utils/navigation';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
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
            href="/"
            className="logo"
            aria-label="MarveThabi Consulting Engineers Home"
            onClick={(e) => handleLinkClick(e, '/')}
          >
            <img
              src="/assets/images/marvethabilogo.jpg"
              alt="MarveThabi Consulting Engineers"
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
          aria-label="Primary site navigation"
        >
          {NAV_LINKS.map((link) => {
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

        {/* Zone 3: Actions — extreme right (LinkedIn, Download Profile button, and Hamburger toggle) */}
        <div className="header-actions">
          <a
            href="https://www.linkedin.com/company/marvethabi-consulting-engineers/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="header-social-btn"
            aria-label="Visit MarveThabi Consulting Engineers on LinkedIn (opens in a new tab)"
            title="Follow MarveThabi on LinkedIn"
          >
            <img
              src="/assets/images/linkedin.png"
              alt="LinkedIn"
              width="36"
              height="36"
            />
          </a>

          <a
            href="/MarveThabiProfile.pdf"
            download="MarveThabiProfile.pdf"
            className="header-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download MarveThabi Corporate Profile PDF (Opens in new tab)"
            title="Download MarveThabi Corporate Profile PDF"
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
            <span className="cta-btn-text">Download Profile</span>
          </a>

          <button
            className={`burger ${mobileMenuOpen ? 'open' : ''}`}
            id="burger"
            type="button"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
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
        aria-label="Site Navigation Menu"
      >
        <div className="mobile-drawer-header">
          <div className="mobile-drawer-brand">
            <img
              src="/assets/images/marvethabilogo.jpg"
              alt="MarveThabi Consulting Engineers"
              width="120"
              height="48"
            />
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            className="mobile-drawer-close"
            aria-label="Close navigation menu"
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

        <nav className="mobile-drawer-links" aria-label="Mobile primary navigation">
          {NAV_LINKS.map((link) => {
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
            href="/MarveThabiProfile.pdf"
            download="MarveThabiProfile.pdf"
            className="mobile-drawer-download"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download MarveThabi Corporate Profile PDF"
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
            Download Profile PDF
          </a>

          <a
            href="https://www.linkedin.com/company/marvethabi-consulting-engineers/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-drawer-social"
            aria-label="Visit MarveThabi Consulting Engineers on LinkedIn (opens in a new tab)"
          >
            <img
              src="/assets/images/linkedin.png"
              alt=""
              aria-hidden="true"
              width="20"
              height="20"
            />
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
