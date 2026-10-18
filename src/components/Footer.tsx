import React from 'react';
import { servicesData, getServiceSlugForRef } from '../data/marvethabi';

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
            <a href="/" onClick={(e) => handleLink(e, '/')}>
              <img src="/assets/images/marvethabilogo.jpg" alt="MarveThabi Consulting Engineers" loading="lazy" />
            </a>
          </div>
          <p className="foot-tag">
            National infrastructure. Technical excellence. Government confidence.
          </p>
        </div>
        <div>
          <span className="foot-h">Engineering Services</span>
          {servicesData.map((svc) => {
            const slug = getServiceSlugForRef(svc.ref);
            return (
              <a
                key={svc.ref}
                href={`/services/${slug}`}
                onClick={(e) => handleLink(e, `/services/${slug}`)}
              >
                {svc.title}
              </a>
            );
          })}
        </div>
        <div>
          <span className="foot-h">Company</span>
          <a href="/services" onClick={(e) => handleLink(e, '/services')}>
            Our Services
          </a>
          <a href="/industries" onClick={(e) => handleLink(e, '/industries')}>
            Industries
          </a>
          <a href="/about" onClick={(e) => handleLink(e, '/about')}>
            About
          </a>
          <a href="/leadership" onClick={(e) => handleLink(e, '/leadership')}>
            Leadership & Team
          </a>
          <a href="/process" onClick={(e) => handleLink(e, '/process')}>
            Process
          </a>
          <a href="/contact" onClick={(e) => handleLink(e, '/contact')}>
            Contact
          </a>
        </div>
        <div>
          <span className="foot-h">Contact</span>
          <span className="foot-addr">Unit 68 Saliehout Street, Stenostelma, Annlin, Pretoria 0182</span>
          <span className="num foot-num">info@marvethabi.co.za</span>
          <span className="num foot-num">+27 82 412 3847</span>
          <span className="num foot-num">+27 72 834 7953</span>
          <a
            href="https://www.linkedin.com/company/marvethabi-consulting-engineers/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
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

