import React, { useState, useEffect } from 'react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    onNavigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isServicesActive = currentPath === '/services' || currentPath.startsWith('/services');
  const isLeadershipActive = currentPath === '/leadership' || currentPath === '/team';

  return (
    <header className={`nav ${isScrolled ? 'nav-scrolled' : ''}`} id="site-nav">
      <div className="header-inner">
        {/* Zone 1: Logo — far left */}
        <a
          href="/"
          className="logo"
          aria-label="MarveThabi Consulting Engineers"
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

        {/* Zone 2: Navigation — genuinely centered */}
        <nav
          className={`nav-links navigation ${menuOpen ? 'open' : ''}`}
          id="nav-links"
          aria-label="Primary"
        >
          <a
            href="/"
            className={currentPath === '/' ? 'active' : ''}
            onClick={(e) => handleLinkClick(e, '/')}
          >
            Home
          </a>
          <a
            href="/about"
            className={currentPath === '/about' ? 'active' : ''}
            onClick={(e) => handleLinkClick(e, '/about')}
          >
            About Us
          </a>
          <a
            href="/services"
            className={isServicesActive ? 'active' : ''}
            onClick={(e) => handleLinkClick(e, '/services')}
          >
            Our Services
          </a>
          <a
            href="/leadership"
            className={isLeadershipActive ? 'active' : ''}
            onClick={(e) => handleLinkClick(e, '/leadership')}
          >
            Our Team
          </a>
          <a
            href="/process"
            className={currentPath === '/process' ? 'active' : ''}
            onClick={(e) => handleLinkClick(e, '/process')}
          >
            Our Process
          </a>
          <a
            href="/contact"
            className={currentPath === '/contact' ? 'active' : ''}
            onClick={(e) => handleLinkClick(e, '/contact')}
          >
            Contact Us
          </a>
        </nav>

        {/* Zone 3: Right CTA button */}
        <div className="header-cta">
          <a
            href="/MarveThabiProfile.pdf"
            download="MarveThabiProfile.pdf"
            className="btn btn-brand btn-sm header-cta-btn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download MarveThabi Corporate Profile PDF"
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
              style={{ marginRight: '6px', display: 'inline-block', verticalAlign: '-1px' }}
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download Profile
          </a>
          <button
            className="burger"
            id="burger"
            aria-label="Menu"
            aria-expanded={menuOpen ? 'true' : 'false'}
            aria-controls="nav-links"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};
