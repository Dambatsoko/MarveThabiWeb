import React, { useState, useEffect } from 'react';

interface ContactPageProps {
  onNavigate?: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    service: 'General Technical Enquiry',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus('error');
      return;
    }
    setFormStatus('success');
  };

  const handleReset = () => {
    setFormStatus('idle');
    setFormData({
      name: '',
      organisation: '',
      email: '',
      phone: '',
      service: 'General Technical Enquiry',
      message: '',
    });
  };

  return (
    <main className="contact-page detail-page">
      {/* ============ HERO ============ */}
      <section className="svc-hero">
        <div className="svc-hero-grid-bg" aria-hidden="true"></div>

        <div className="wrap">
          <nav className="page-hero-nav" aria-label="Breadcrumb">
            <a
              href="/"
              aria-label="Return to MarveThabi homepage"
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.('/');
              }}
            >
              Home
            </a>
            <span aria-hidden="true">&rsaquo;</span>
            <span>Contact Us</span>
          </nav>
          <h1 className="svc-hero-title">Contact Us</h1>
          <p className="lead svc-hero-sub">
            Speak directly with our registered engineering and environmental specialists.
            Send us your project details or technical requirements, and our team will respond within one business day.
          </p>
          <div className="svc-hero-tags">
            <span className="svc-hero-tag"><span className="tag-dot"></span>Director-Led Scoping</span>
            <span className="svc-hero-tag"><span className="tag-dot"></span>24-Hour Response</span>
            <span className="svc-hero-tag"><span className="tag-dot"></span>National &amp; SADC Coverage</span>
          </div>
        </div>
      </section>

      {/* ============ CONTACT & FORM SECTION ============ */}
      <section className="detail-body-section" style={{ background: '#F8FAF9', padding: '56px 0 80px' }}>
        <div className="wrap detail-grid" style={{ alignItems: 'start' }}>
          {/* SIMPLIFIED ENQUIRY FORM */}
          <div>
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--line)',
                borderRadius: '8px',
                padding: '36px 32px',
                boxShadow: '0 4px 20px -8px rgba(15,27,24,0.08)',
              }}
            >
              <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '16px' }}>
                <span className="label" style={{ color: 'var(--brand)', display: 'block', marginBottom: '4px' }}>
                  GET IN TOUCH
                </span>
                <h2 style={{ fontSize: '24px', color: 'var(--ink)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  Send an Enquiry
                </h2>
                <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#55655F', lineHeight: 1.5 }}>
                  Fill in your details below and a registered consultant will review your enquiry.
                </p>
              </div>

              {/* SUCCESS NOTICE */}
              {formStatus === 'success' && (
                <div
                  style={{
                    background: '#EAF4F0',
                    borderLeft: '4px solid var(--btn-green)',
                    padding: '20px 24px',
                    borderRadius: '4px',
                    marginBottom: '24px',
                  }}
                >
                  <h3 style={{ fontSize: '17px', color: 'var(--ink)', margin: '0 0 6px' }}>
                    Thank you, {formData.name}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#2B3934', lineHeight: 1.6, margin: 0 }}>
                    Your enquiry regarding <strong>{formData.service}</strong> has been received. A registered
                    engineer will review your requirements and respond within one business day.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-ghost"
                    style={{ marginTop: '14px', fontSize: '12.5px', padding: '6px 14px', cursor: 'pointer' }}
                  >
                    Send Another Message
                  </button>
                </div>
              )}

              {/* ERROR NOTICE */}
              {formStatus === 'error' && (
                <div
                  style={{
                    background: '#FBEFEC',
                    borderLeft: '4px solid #B4543A',
                    padding: '14px 18px',
                    color: '#7C3A28',
                    marginBottom: '20px',
                    borderRadius: '4px',
                    fontSize: '14px',
                  }}
                >
                  Please ensure your <strong>Full Name</strong>, <strong>Email Address</strong>, and{' '}
                  <strong>Message</strong> are filled in.
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {/* 1. NAME & ORGANISATION */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <div>
                    <label
                      htmlFor="field-name"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                    >
                      Full Name <span style={{ color: '#c85a48' }}>*</span>
                    </label>
                    <input
                      id="field-name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. John Molefe"
                      required
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        fontSize: '14px',
                        background: '#fff',
                        border: '1px solid var(--line)',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="field-organisation"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                    >
                      Organisation / Company
                    </label>
                    <input
                      id="field-organisation"
                      type="text"
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleInputChange}
                      placeholder="e.g. Mining House / Municipality"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        fontSize: '14px',
                        background: '#fff',
                        border: '1px solid var(--line)',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                {/* 2. EMAIL & PHONE */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                  <div>
                    <label
                      htmlFor="field-email"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                    >
                      Email Address <span style={{ color: '#c85a48' }}>*</span>
                    </label>
                    <input
                      id="field-email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@company.co.za"
                      required
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        fontSize: '14px',
                        background: '#fff',
                        border: '1px solid var(--line)',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="field-phone"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                    >
                      Telephone / Mobile
                    </label>
                    <input
                      id="field-phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+27 82 000 0000"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        fontSize: '14px',
                        background: '#fff',
                        border: '1px solid var(--line)',
                        borderRadius: '4px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                {/* 3. SERVICE DISCIPLINE (SIMPLIFIED TO 5 CLEAR OPTIONS) */}
                <div>
                  <label
                    htmlFor="field-service"
                    style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                  >
                    Area of Enquiry
                  </label>
                  <select
                    id="field-service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--ink)',
                      background: '#fff',
                      border: '1px solid var(--line)',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="General Technical Enquiry">General Technical Enquiry</option>
                    <option value="Reliability Engineering & Condition Monitoring">Reliability Engineering &amp; Condition Monitoring</option>
                    <option value="Asset Management & ISO 55000">Asset Management &amp; ISO 55000 Frameworks</option>
                    <option value="Electrical Engineering & Infrastructure">Electrical Infrastructure &amp; Construction</option>
                    <option value="Environmental & Water Management">Environmental Compliance &amp; Water Licences (WULA)</option>
                    <option value="Geological & Hydrogeological Studies">Geological &amp; Hydrogeological Studies</option>
                  </select>
                </div>

                {/* 4. MESSAGE */}
                <div>
                  <label
                    htmlFor="field-message"
                    style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                  >
                    Project Details or Scope <span style={{ color: '#c85a48' }}>*</span>
                  </label>
                  <textarea
                    id="field-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us briefly about your project, site location, timeline or technical requirements..."
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: '14px',
                      background: '#fff',
                      border: '1px solid var(--line)',
                      borderRadius: '4px',
                      boxSizing: 'border-box',
                      lineHeight: 1.5,
                      fontFamily: 'inherit',
                      resize: 'vertical',
                    }}
                  ></textarea>
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  className="btn btn-brand"
                  aria-label="Send project enquiry to registered engineers"
                  style={{
                    padding: '14px 28px',
                    fontSize: '15px',
                    fontWeight: 700,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    borderRadius: '4px',
                  }}
                >
                  <span>Send Enquiry</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>

                <p style={{ margin: 0, textAlign: 'center', fontSize: '12px', color: '#6e7e78' }}>
                  Professional confidentiality &middot; Responses within one business day
                </p>
              </form>
            </div>
          </div>

          {/* RIGHT SIDEBAR: DIRECT CONTACT & ACCREDITATIONS */}
          <aside className="detail-sidebar" aria-label="Contact Information" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* DIRECT CONTACT */}
            <div className="side-card" style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--ink)', margin: '0 0 14px', fontWeight: 700 }}>
                Direct Contact
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#3C4A45' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    Email
                  </span>
                  <a href="mailto:info@marvethabi.co.za" style={{ color: 'var(--ink)', textDecoration: 'none', fontWeight: 600 }}>
                    info@marvethabi.co.za
                  </a>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    Telephone
                  </span>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>+27 82 412 3847</p>
                  <p style={{ margin: '2px 0 0', fontWeight: 600, color: 'var(--ink)' }}>+27 72 834 7953</p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    Office Hours
                  </span>
                  <p style={{ margin: 0 }}>Monday &ndash; Friday: 08:00 &ndash; 17:00</p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    Social Media
                  </span>
                  <a
                    href="https://www.linkedin.com/company/marvethabi-consulting-engineers/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit MarveThabi on LinkedIn (opens in a new tab)"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#0A66C2',
                      textDecoration: 'none',
                      fontWeight: 600,
                      fontSize: '13.5px',
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
                    MarveThabi on LinkedIn &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* HEAD OFFICE */}
            <div className="side-card" style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--ink)', margin: '0 0 10px', fontWeight: 700 }}>
                Head Office
              </h4>
              <p style={{ fontSize: '13.5px', color: '#3C4A45', lineHeight: 1.55, margin: 0 }}>
                Unit 68 Saliehout Street, Stenostelma, Annlin, Pretoria 0182, Gauteng, South Africa
              </p>
            </div>

            {/* PRACTICE CREDENTIALS */}
            <div className="side-card" style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--ink)', margin: '0 0 12px', fontWeight: 700 }}>
                Registrations &amp; Compliance
              </h4>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#47564F' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>B-BBEE Status:</span>
                  <strong style={{ color: 'var(--btn-green-dark)' }}>Level 1 (135% Recognition)</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Engineering Council:</span>
                  <strong>ECSA Registered</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Natural Sciences:</span>
                  <strong>SACNASP Registered</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Contractor DB:</span>
                  <strong>CIDB Registered</strong>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Public Supplier:</span>
                  <strong>CSD Registered</strong>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
