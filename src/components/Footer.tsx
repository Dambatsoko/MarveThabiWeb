import React from 'react';
import { servicesData, getServiceSlugForRef } from '../data/marvethabi';
import { NAV_LINKS } from '../utils/navigation';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
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
            <a href="/" aria-label="MarveThabi Consulting Engineers - Return to homepage" onClick={(e) => handleLink(e, '/')}>
              <img src="/assets/images/marvethabilogo.jpg" alt="MarveThabi Consulting Engineers logo - Registered consulting engineers in Pretoria" loading="lazy" />
            </a>
          </div>
          <p className="foot-tag">
            National infrastructure. Technical excellence. Government confidence.
          </p>
          <a
            href="https://www.linkedin.com/company/marvethabi-consulting-engineers/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit MarveThabi Consulting Engineers on LinkedIn (opens in a new tab)"
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
            Follow on LinkedIn
          </a>
        </div>
        <div>
          <span className="foot-h">Engineering Services</span>
          {servicesData.map((svc) => {
            const slug = getServiceSlugForRef(svc.ref);
            return (
              <a
                key={svc.ref}
                href={`/services/${slug}`}
                aria-label={`Explore ${svc.title} specifications`}
                onClick={(e) => handleLink(e, `/services/${slug}`)}
              >
                {svc.title}
              </a>
            );
          })}
        </div>
        <div>
          <span className="foot-h">Company</span>
          {NAV_LINKS.map((link) => (
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
          <span className="foot-h">Contact</span>
          <span className="foot-addr">Unit 68 Saliehout Street, Stenostelma, Annlin, Pretoria 0182</span>
          <a href="mailto:info@marvethabi.co.za" className="num foot-num" aria-label="Email MarveThabi at info@marvethabi.co.za" style={{ textDecoration: 'none', color: 'inherit' }}>
            info@marvethabi.co.za
          </a>
          <a href="tel:+27824123847" className="num foot-num" aria-label="Call MarveThabi at +27 82 412 3847" style={{ textDecoration: 'none', color: 'inherit' }}>
            +27 82 412 3847
          </a>
          <a href="tel:+27728347953" className="num foot-num" aria-label="Call MarveThabi at +27 72 834 7953" style={{ textDecoration: 'none', color: 'inherit' }}>
            +27 72 834 7953
          </a>
          <a
            href="https://www.linkedin.com/company/marvethabi-consulting-engineers/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit MarveThabi LinkedIn profile (opens in a new tab)"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginTop: '10px',
              color: 'var(--brand-light, #5e9e8b)',
              fontWeight: 600,
              fontSize: '13.5px',
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
            LinkedIn Profile &rarr;
          </a>
        </div>
      </div>
      <div className="wrap foot-base">
        <span className="num">&copy; {currentYear} MarveThabi Consulting Engineers (Pty) Ltd</span>
        <span className="num">Reg No. 2013/000000/07</span>
      </div>
    </footer>
  );
};

