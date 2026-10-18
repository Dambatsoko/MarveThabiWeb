import React, { useState, useEffect } from 'react';

interface ContactPageProps {
  onNavigate?: (path: string) => void;
}

interface ServiceAssignment {
  id: string;
  name: string;
  leadName: string;
  leadRole: string;
  leadReg: string;
  leadPhoto: string;
  leadEmail: string;
  leadPhone: string;
}

const SERVICES_CATALOGUE: ServiceAssignment[] = [
  // Marvelous Ngoatle
  {
    id: 'reliability-engineering',
    name: 'Reliability Engineering & Vibration Analysis',
    leadName: 'Marvelous Ngoatle',
    leadRole: 'Director — Reliability Engineering',
    leadReg: 'Pr.Tech.Eng (ECSA)',
    leadPhoto: 'marvelous.jpg',
    leadEmail: 'marvelous@marvethabi.co.za',
    leadPhone: '+27 82 412 3847',
  },
  {
    id: 'condition-monitoring',
    name: 'Condition Monitoring (Vibration, Oil DGA, Thermography)',
    leadName: 'Marvelous Ngoatle',
    leadRole: 'Director — Reliability Engineering',
    leadReg: 'Pr.Tech.Eng (ECSA)',
    leadPhoto: 'marvelous.jpg',
    leadEmail: 'marvelous@marvethabi.co.za',
    leadPhone: '+27 82 412 3847',
  },
  {
    id: 'asset-management',
    name: 'Asset Management & ISO 55000 Asset Registers',
    leadName: 'Marvelous Ngoatle',
    leadRole: 'Director — Reliability Engineering',
    leadReg: 'Pr.Tech.Eng (ECSA)',
    leadPhoto: 'marvelous.jpg',
    leadEmail: 'marvelous@marvethabi.co.za',
    leadPhone: '+27 82 412 3847',
  },
  {
    id: 'electrical-engineering',
    name: 'Electrical Infrastructure & Substation Engineering (11kV–132kV)',
    leadName: 'Marvelous Ngoatle',
    leadRole: 'Director — Reliability Engineering',
    leadReg: 'Pr.Tech.Eng (ECSA)',
    leadPhoto: 'marvelous.jpg',
    leadEmail: 'marvelous@marvethabi.co.za',
    leadPhone: '+27 82 412 3847',
  },
  {
    id: 'electrical-construction',
    name: 'Electrical Construction, Maintenance & SANS 10142 COCs',
    leadName: 'Marvelous Ngoatle',
    leadRole: 'Director — Reliability Engineering',
    leadReg: 'Pr.Tech.Eng (ECSA) · Wireman\'s Licence',
    leadPhoto: 'marvelous.jpg',
    leadEmail: 'marvelous@marvethabi.co.za',
    leadPhone: '+27 82 412 3847',
  },

  // Thabang Ngoatle
  {
    id: 'water-management',
    name: 'Water Management & Water Use Licences (WULA)',
    leadName: 'Thabang Ngoatle',
    leadRole: 'Director — Environmental Management',
    leadReg: 'Pr.Sci.Nat (SACNASP)',
    leadPhoto: 'thabang.jpg',
    leadEmail: 'thabang@marvethabi.co.za',
    leadPhone: '+27 72 834 7953',
  },
  {
    id: 'waste-management',
    name: 'Waste Management, Hazardous Classification & Sewage Audits',
    leadName: 'Thabang Ngoatle',
    leadRole: 'Director — Environmental Management',
    leadReg: 'Pr.Sci.Nat (SACNASP)',
    leadPhoto: 'thabang.jpg',
    leadEmail: 'thabang@marvethabi.co.za',
    leadPhone: '+27 72 834 7953',
  },
  {
    id: 'air-quality',
    name: 'Air Quality Management & Dust Fallout Networks (ASTM D1739)',
    leadName: 'Thabang Ngoatle',
    leadRole: 'Director — Environmental Management',
    leadReg: 'Pr.Sci.Nat (SACNASP)',
    leadPhoto: 'thabang.jpg',
    leadEmail: 'thabang@marvethabi.co.za',
    leadPhone: '+27 72 834 7953',
  },
  {
    id: 'greenhouse-gas',
    name: 'Greenhouse Gas & Carbon Tax Auditing (NAEIS)',
    leadName: 'Thabang Ngoatle',
    leadRole: 'Director — Environmental Management',
    leadReg: 'Pr.Sci.Nat (SACNASP)',
    leadPhoto: 'thabang.jpg',
    leadEmail: 'thabang@marvethabi.co.za',
    leadPhone: '+27 72 834 7953',
  },
  {
    id: 'hydrogeology',
    name: 'Hydrogeological Studies, Geophysics & Aquifer Yield Testing',
    leadName: 'Thabang Ngoatle',
    leadRole: 'Director — Environmental Management',
    leadReg: 'Pr.Sci.Nat (SACNASP)',
    leadPhoto: 'thabang.jpg',
    leadEmail: 'thabang@marvethabi.co.za',
    leadPhone: '+27 72 834 7953',
  },
  {
    id: 'authorisations-licences',
    name: 'Environmental Authorisations, EIA & Basic Assessments',
    leadName: 'Thabang Ngoatle',
    leadRole: 'Director — Environmental Management',
    leadReg: 'Pr.Sci.Nat (SACNASP)',
    leadPhoto: 'thabang.jpg',
    leadEmail: 'thabang@marvethabi.co.za',
    leadPhone: '+27 72 834 7953',
  },
  {
    id: 'compliance-audits',
    name: 'Environmental Compliance Audits & ECO Site Monitoring',
    leadName: 'Thabang Ngoatle',
    leadRole: 'Director — Environmental Management',
    leadReg: 'Pr.Sci.Nat (SACNASP) · SAMTRAC',
    leadPhoto: 'thabang.jpg',
    leadEmail: 'thabang@marvethabi.co.za',
    leadPhone: '+27 72 834 7953',
  },
  {
    id: 'mine-rehabilitation',
    name: 'Mine Rehabilitation & Environmental Closure Liabilities',
    leadName: 'Thabang Ngoatle',
    leadRole: 'Director — Environmental Management',
    leadReg: 'Pr.Sci.Nat (SACNASP)',
    leadPhoto: 'thabang.jpg',
    leadEmail: 'thabang@marvethabi.co.za',
    leadPhone: '+27 72 834 7953',
  },

  // Jonas Lufuluabo
  {
    id: 'drc-expansion',
    name: 'DRC & Central African Regional Business Development',
    leadName: 'Jonas Lufuluabo',
    leadRole: 'Director — Business Development (DRC)',
    leadReg: 'B.Sc Computer Science · Cisco Certified',
    leadPhoto: 'jonas.jpg',
    leadEmail: 'drc@marvethabi.co.za',
    leadPhone: '+27 82 412 3847',
  },
  {
    id: 'cross-border-alliances',
    name: 'Cross-Border Mining Alliances & Infrastructure Partnerships',
    leadName: 'Jonas Lufuluabo',
    leadRole: 'Director — Business Development (DRC)',
    leadReg: 'Regional Commercial Leader',
    leadPhoto: 'jonas.jpg',
    leadEmail: 'drc@marvethabi.co.za',
    leadPhone: '+27 82 412 3847',
  },
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [selectedServiceId, setSelectedServiceId] = useState<string>('reliability-engineering');
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [ticketRef, setTicketRef] = useState<string>('');

  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    location: '',
    message: '',
  });

  const selectedService =
    SERVICES_CATALOGUE.find((s) => s.id === selectedServiceId) || SERVICES_CATALOGUE[0];

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
    const randomTicket = `MT-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketRef(randomTicket);
    setFormStatus('success');
  };

  const handleReset = () => {
    setFormStatus('idle');
    setTicketRef('');
    setFormData({
      name: '',
      organisation: '',
      email: '',
      phone: '',
      location: '',
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
            <a href="/" onClick={(e) => { e.preventDefault(); onNavigate?.('/'); }}>
              Home
            </a>
            <span aria-hidden="true">&rsaquo;</span>
            <span>Contact Us</span>
          </nav>
          <h1 className="svc-hero-title">Start an Engineering Consultation</h1>
          <p className="lead svc-hero-sub">
            Every technical consultation is handled directly by our registered Directors. Connect directly
            with our discipline leaders for technical scoping, regulatory compliance, and project assurance.
          </p>
          <div className="svc-hero-tags">
            <span className="svc-hero-tag"><span className="tag-dot"></span>Director-Led Technical Scoping</span>
            <span className="svc-hero-tag"><span className="tag-dot"></span>&le; 24-Hour Review Response</span>
            <span className="svc-hero-tag"><span className="tag-dot"></span>South Africa &amp; Regional DRC Engagements</span>
          </div>
        </div>
      </section>

      {/* ============ FORM & SIDEBAR ============ */}
      <section className="detail-body-section" style={{ background: '#F8FAF9', padding: '56px 0 80px' }}>
        <div className="wrap detail-grid" style={{ alignItems: 'start' }}>
          {/* SIMPLIFIED, CLEAN FORM */}
          <div>
            <div style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: '4px', padding: '36px 32px' }}>
              <div style={{ marginBottom: '28px', borderBottom: '1px solid var(--line)', paddingBottom: '18px' }}>
                <span className="label" style={{ color: 'var(--brand)', display: 'block', marginBottom: '4px' }}>
                  TECHNICAL SCOPING ENQUIRY
                </span>
                <h2 style={{ fontSize: '26px', color: 'var(--ink)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  Request Consultation
                </h2>
                <p style={{ margin: '6px 0 0', fontSize: '14.5px', color: '#55655F', lineHeight: 1.5 }}>
                  Choose your required discipline. The form automatically assigns your project to the lead Director.
                </p>
              </div>

              {/* SUCCESS MESSAGE */}
              {formStatus === 'success' && (
                <div
                  style={{
                    background: '#EAF4F0',
                    borderLeft: '4px solid var(--btn-green)',
                    padding: '24px',
                    borderRadius: '3px',
                    marginBottom: '28px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span className="side-chip num" style={{ background: '#fff', color: 'var(--btn-green-dark)', fontWeight: 700 }}>
                      REF: {ticketRef}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--btn-green-dark)', fontWeight: 600 }}>
                      Response within 24 Hours
                    </span>
                  </div>
                  <h3 style={{ fontSize: '18px', color: 'var(--ink)', margin: '0 0 6px' }}>
                    Enquiry Routed to {selectedService.leadName}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#2B3934', lineHeight: 1.6, margin: 0 }}>
                    Thank you, <strong>{formData.name}</strong>. Your project requirement for{' '}
                    <strong>{selectedService.name}</strong> has been transmitted directly to{' '}
                    <strong>{selectedService.leadName}</strong> ({selectedService.leadRole}). Our desk will contact you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-ghost"
                    style={{ marginTop: '16px', fontSize: '12.5px', padding: '6px 14px' }}
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              )}

              {/* ERROR MESSAGE */}
              {formStatus === 'error' && (
                <div
                  style={{
                    background: '#FBEFEC',
                    borderLeft: '4px solid #B4543A',
                    padding: '16px 20px',
                    color: '#7C3A28',
                    marginBottom: '24px',
                    borderRadius: '2px',
                    fontSize: '14px',
                  }}
                >
                  Please ensure your <strong>Name</strong>, <strong>Email</strong>, and{' '}
                  <strong>Project Requirement</strong> are filled in.
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                {/* 1. SERVICE SELECT WITH LINKED DIRECTOR */}
                <div>
                  <label
                    htmlFor="service-select"
                    style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                  >
                    Required Engineering or Environmental Service <span style={{ color: '#c85a48' }}>*</span>
                  </label>
                  <select
                    id="service-select"
                    name="service"
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: '14.5px',
                      fontWeight: 600,
                      color: 'var(--ink)',
                      background: '#fff',
                      border: '1px solid var(--line)',
                      borderRadius: '3px',
                      outline: 'none',
                    }}
                  >
                    <optgroup label="Engineering Services & Reliability (Lead: Marvelous Ngoatle — ECSA)">
                      {SERVICES_CATALOGUE.filter((s) => s.leadName.includes('Marvelous')).map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} &bull; Lead: {s.leadName}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Environmental Resource Management & Studies (Lead: Thabang Ngoatle — SACNASP)">
                      {SERVICES_CATALOGUE.filter((s) => s.leadName.includes('Thabang')).map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} &bull; Lead: {s.leadName}
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="DRC & Central African Regional Expansion (Lead: Jonas Lufuluabo)">
                      {SERVICES_CATALOGUE.filter((s) => s.leadName.includes('Jonas')).map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} &bull; Lead: {s.leadName}
                        </option>
                      ))}
                    </optgroup>
                  </select>

                  {/* COMPACT ASSIGNED LEAD BADGE */}
                  <div
                    style={{
                      marginTop: '10px',
                      background: '#F0F5F2',
                      border: '1px solid #D5E2DC',
                      borderLeft: '3px solid var(--btn-green)',
                      padding: '10px 14px',
                      borderRadius: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <img
                      src={`/assets/images/${selectedService.leadPhoto}?v=2`}
                      alt={selectedService.leadName}
                      loading="lazy"
                      decoding="async"
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        flexShrink: 0,
                      }}
                    />
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '11px', color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Assigned Practice Lead
                      </div>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: 'var(--ink)' }}>
                        {selectedService.leadName}
                        <span style={{ fontSize: '12px', fontWeight: 500, color: '#55655F', marginLeft: '6px' }}>
                          ({selectedService.leadRole} &middot; {selectedService.leadReg})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. NAME & ORGANISATION */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div>
                    <label
                      htmlFor="field-name"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                    >
                      Your Full Name <span style={{ color: '#c85a48' }}>*</span>
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
                        borderRadius: '3px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="field-organisation"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                    >
                      Organisation / Mining House / Municipality
                    </label>
                    <input
                      id="field-organisation"
                      type="text"
                      name="organisation"
                      value={formData.organisation}
                      onChange={handleInputChange}
                      placeholder="e.g. Anglo American / City of Ekurhuleni"
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        fontSize: '14px',
                        background: '#fff',
                        border: '1px solid var(--line)',
                        borderRadius: '3px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                {/* 3. EMAIL & PHONE */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div>
                    <label
                      htmlFor="field-email"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                    >
                      Corporate Email Address <span style={{ color: '#c85a48' }}>*</span>
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
                        borderRadius: '3px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="field-phone"
                      style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                    >
                      Contact Telephone / Mobile
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
                        borderRadius: '3px',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                {/* 4. FACILITY / SITE LOCATION */}
                <div>
                  <label
                    htmlFor="field-location"
                    style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                  >
                    Facility or Site Location
                  </label>
                  <input
                    id="field-location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Pretoria / Emalahleni / Rustenburg / Lubumbashi"
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      fontSize: '14px',
                      background: '#fff',
                      border: '1px solid var(--line)',
                      borderRadius: '3px',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* 5. PROJECT REQUIREMENT & TECHNICAL OBJECTIVES (FIXED SPACING & SKEWERING) */}
                <div>
                  <div style={{ marginBottom: '6px' }}>
                    <label
                      htmlFor="field-message"
                      style={{
                        display: 'block',
                        fontSize: '13.5px',
                        fontWeight: 700,
                        color: 'var(--ink)',
                        marginBottom: '4px',
                      }}
                    >
                      Project Requirement & Technical Objectives <span style={{ color: '#c85a48' }}>*</span>
                    </label>
                    <span
                      style={{
                        display: 'block',
                        fontSize: '12.5px',
                        color: '#6e7e78',
                        lineHeight: 1.45,
                      }}
                    >
                      Please describe the equipment, standards (e.g. ISO 55000, SANS 10142, WULA), deliverables, or specific problem statement.
                    </span>
                  </div>

                  <textarea
                    id="field-message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    placeholder={`Outline your technical scope for ${selectedService.leadName}...\nExample: Requesting vibration baseline analysis and thermal inspection for 4 critical pump drives and transformer condition assessment at our processing facility.`}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: '14px',
                      background: '#fff',
                      border: '1px solid var(--line)',
                      borderRadius: '3px',
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
                  style={{
                    padding: '15px 28px',
                    fontSize: '15px',
                    fontWeight: 700,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                  }}
                >
                  <span>Submit Scoping Request to {selectedService.leadName}</span>
                  <span aria-hidden="true">&rarr;</span>
                </button>

                <p style={{ margin: 0, textAlign: 'center', fontSize: '12px', color: '#6e7e78' }}>
                  Direct technical transmission &middot; Statutory confidentiality &middot; Direct response within 24 hours
                </p>
              </form>
            </div>
          </div>

          {/* RIGHT SIDEBAR — DIRECT DESKS */}
          <aside className="detail-sidebar" aria-label="Direct Team Desks" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* DIRECT DESKS */}
            <div className="side-card" style={{ borderTop: '3px solid var(--btn-green)', background: '#fff', padding: '24px' }}>
              <span className="label" style={{ color: 'var(--brand)', display: 'block', marginBottom: '6px' }}>
                DIRECT PRACTICE DESKS
              </span>
              <h4 style={{ fontSize: '17px', color: 'var(--ink)', margin: '0 0 16px' }}>
                Direct Director Lines
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Marvelous */}
                <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <img
                      src="/assets/images/marvelous.jpg?v=2"
                      alt="Marvelous Ngoatle"
                      loading="lazy"
                      decoding="async"
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--ink)' }}>
                        Marvelous Ngoatle
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--btn-green-dark)', fontWeight: 600 }}>
                        Pr.Tech.Eng (ECSA) &middot; Reliability & Electrical
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ink)', marginTop: '4px' }}>
                    <strong>Tel:</strong> +27 82 412 3847 &middot;{' '}
                    <span style={{ color: 'var(--brand)' }}>marvelous@marvethabi.co.za</span>
                  </div>
                </div>

                {/* Thabang */}
                <div style={{ borderBottom: '1px solid var(--line)', paddingBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <img
                      src="/assets/images/thabang.jpg?v=2"
                      alt="Thabang Ngoatle"
                      loading="lazy"
                      decoding="async"
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--ink)' }}>
                        Thabang Ngoatle
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--btn-green-dark)', fontWeight: 600 }}>
                        Pr.Sci.Nat (SACNASP) &middot; Environmental & Water
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ink)', marginTop: '4px' }}>
                    <strong>Tel:</strong> +27 72 834 7953 &middot;{' '}
                    <span style={{ color: 'var(--brand)' }}>thabang@marvethabi.co.za</span>
                  </div>
                </div>

                {/* Jonas */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <img
                      src="/assets/images/jonas.jpg?v=2"
                      alt="Jonas Lufuluabo"
                      loading="lazy"
                      decoding="async"
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '13.5px', color: 'var(--ink)' }}>
                        Jonas Lufuluabo
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--btn-green-dark)', fontWeight: 600 }}>
                        Director &middot; Business Development (DRC)
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--ink)', marginTop: '4px' }}>
                    <strong>Tel:</strong> +27 82 412 3847 &middot;{' '}
                    <span style={{ color: 'var(--brand)' }}>drc@marvethabi.co.za</span>
                  </div>
                </div>
              </div>
            </div>

            {/* HEAD OFFICE */}
            <div className="side-card" style={{ background: '#fff', padding: '24px' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--ink)', margin: '0 0 10px' }}>Head Office</h4>
              <p style={{ fontSize: '13.5px', color: '#3C4A45', lineHeight: 1.55, margin: 0 }}>
                Unit 68 Saliehout Street, Stenostelma, Annlin, Pretoria 0182, Gauteng, South Africa
              </p>
            </div>

            {/* STATUTORY REGISTRATIONS */}
            <div className="side-card" style={{ background: '#fff', padding: '24px' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--ink)', margin: '0 0 12px' }}>Practice Credentials</h4>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#47564F' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>B-BBEE Standing:</span>
                  <strong style={{ color: 'var(--btn-green-dark)' }}>Level 1 (135%)</strong>
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
                  <span>Occupational Safety:</span>
                  <strong>SAMTRAC Certified</strong>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};
