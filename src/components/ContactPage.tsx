import React, { useState, useEffect, useRef } from 'react';
import {
  getRoutingItemById,
  getDefaultRoutingItem,
  getGroupedServices,
  generateEnquiryReference,
  saveEnquiryToRegistry,
  buildMailtoDispatchUrl,
  EnquiryRecord,
  ServiceRoutingItem,
} from '../data/contactRouting';

interface ContactPageProps {
  onNavigate?: (path: string) => void;
}

const SA_PROVINCES = [
  'Gauteng',
  'Limpopo',
  'Mpumalanga',
  'North West',
  'KwaZulu-Natal',
  'Free State',
  'Eastern Cape',
  'Northern Cape',
  'Western Cape',
  'International / DRC / SADC Region',
];

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate: _onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Form state
  const defaultRouting = getDefaultRoutingItem();
  const [selectedServiceId, setSelectedServiceId] = useState<string>(defaultRouting.id);
  const [fullName, setFullName] = useState<string>('');
  const [organisation, setOrganisation] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [province, setProvince] = useState<string>('Gauteng');
  const [subject, setSubject] = useState<string>(defaultRouting.defaultSubject);
  const [subjectModified, setSubjectModified] = useState<boolean>(false);
  const [details, setDetails] = useState<string>('');
  const [attachmentName, setAttachmentName] = useState<string>('');
  const [attachmentError, setAttachmentError] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>(''); // Spam trap

  // Submission tracking state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedRecord, setSubmittedRecord] = useState<EnquiryRecord | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Current active routing item and specialist
  const activeRouting: ServiceRoutingItem =
    getRoutingItemById(selectedServiceId) || defaultRouting;
  const assignedSpecialist = activeRouting.assignedContact;

  // Handle service dropdown change
  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setSelectedServiceId(newId);

    const routingItem = getRoutingItemById(newId);
    if (routingItem && !subjectModified) {
      setSubject(routingItem.defaultSubject);
    }
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    setSubjectModified(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAttachmentError('');
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        setAttachmentError('File exceeds 15MB limit. Please upload a smaller file or send via email.');
        setAttachmentName('');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }
      setAttachmentName(file.name);
    } else {
      setAttachmentName('');
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = 'Please enter your full name.';
    }

    if (!email.trim()) {
      errors.email = 'Please enter your email address.';
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.trim())) {
        errors.email = 'Please provide a valid corporate or professional email address.';
      }
    }

    if (!subject.trim()) {
      errors.subject = 'Please enter an enquiry subject.';
    }

    if (!details.trim()) {
      errors.details = 'Please describe your project scope or technical enquiry.';
    } else if (details.trim().length < 15) {
      errors.details = 'Please provide at least 15 characters of detail for technical evaluation.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Spam honeypot trap: bots fill in invisible fields
    if (honeypot) {
      console.warn('Spam submission suppressed by honeypot.');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const refNo = generateEnquiryReference();
    const timestamp = new Date().toLocaleString('en-ZA', {
      timeZone: 'Africa/Johannesburg',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const record: EnquiryRecord = {
      referenceNumber: refNo,
      timestamp,
      fullName: fullName.trim(),
      organisation: organisation.trim(),
      email: email.trim(),
      phone: phone.trim(),
      provinceOrCountry: province,
      serviceId: activeRouting.id,
      serviceName: activeRouting.serviceName,
      category: activeRouting.category,
      assignedContactName: assignedSpecialist.name,
      assignedContactDesignation: assignedSpecialist.designation,
      assignedEmail: assignedSpecialist.verifiedEmail,
      subject: subject.trim(),
      details: details.trim(),
      attachmentName: attachmentName || undefined,
      status: 'submitted',
    };

    // 1. Persist to central registry (administrative logging)
    saveEnquiryToRegistry(record);

    // 2. Open email client via background dispatch or prepare mailto
    const mailtoUrl = buildMailtoDispatchUrl(record);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRecord(record);
      window.scrollTo({ top: 180, behavior: 'smooth' });

      // Trigger mailto link for direct transmission to verified inbox
      try {
        const link = document.createElement('a');
        link.href = mailtoUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        // Note: browser may open client, user has visible fallback on screen
      } catch (err) {
        console.info('Mailto trigger completed:', err);
      }
    }, 450);
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setFullName('');
    setOrganisation('');
    setEmail('');
    setPhone('');
    setProvince('Gauteng');
    setSubject(activeRouting.defaultSubject);
    setSubjectModified(false);
    setDetails('');
    setAttachmentName('');
    setAttachmentError('');
    setFormErrors({});
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const groupedServices = getGroupedServices();

  return (
    <main className="contact-page detail-page">
      {/* ============ HERO ============ */}
      <section className="svc-hero">
        <div className="svc-hero-grid-bg" aria-hidden="true"></div>

        <div className="wrap">
          <h1 className="svc-hero-title">Contact &amp; Service Enquiry</h1>
          <p className="lead svc-hero-sub">
            Direct your technical requirement to the registered engineer or scientist responsible
            for that specific discipline. Our intelligent routing system connects you immediately
            with the right specialist for prompt scoping.
          </p>
          <div className="svc-hero-tags">
            <span className="svc-hero-tag"><span className="tag-dot"></span>Automated Specialist Routing</span>
            <span className="svc-hero-tag"><span className="tag-dot"></span>Director-Led Evaluation</span>
            <span className="svc-hero-tag"><span className="tag-dot"></span>24-Hour Scoping Guarantee</span>
          </div>
        </div>
      </section>

      {/* ============ CONTACT & ROUTING SECTION ============ */}
      <section className="detail-body-section" style={{ background: '#F8FAF9', padding: '56px 0 80px' }}>
        <div className="wrap detail-grid" style={{ alignItems: 'start' }}>
          {/* MAIN ENQUIRY FORM COLUMN */}
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
              {/* SUCCESS DISPLAY */}
              {submittedRecord ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    animation: 'fadeIn 0.3s ease-in-out',
                  }}
                >
                  <div
                    style={{
                      background: '#EAF4F0',
                      borderLeft: '5px solid var(--btn-green)',
                      padding: '24px',
                      borderRadius: '6px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          color: 'var(--btn-green-dark)',
                          background: '#D2ECE3',
                          padding: '4px 10px',
                          borderRadius: '4px',
                        }}
                      >
                        Enquiry Successfully Logged &amp; Assigned
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#334842' }}>
                        Reference: {submittedRecord.referenceNumber}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '22px', color: 'var(--ink)', margin: '0 0 10px', fontFamily: 'var(--font-heading)' }}>
                      Thank you, {submittedRecord.fullName}
                    </h2>
                    <p style={{ fontSize: '15px', color: '#2B3934', lineHeight: 1.6, margin: 0 }}>
                      Your enquiry regarding <strong>{submittedRecord.serviceName}</strong> has been
                      recorded in our registry and assigned to{' '}
                      <strong>{submittedRecord.assignedContactName}</strong> (
                      {submittedRecord.assignedContactDesignation}).
                    </p>
                  </div>

                  {/* ASSIGNED SPECIALIST SUMMARY */}
                  <div
                    style={{
                      border: '1px solid #D6E0DC',
                      background: '#FAFDFB',
                      borderRadius: '6px',
                      padding: '20px',
                      display: 'flex',
                      gap: '18px',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={assignedSpecialist.image}
                      alt={assignedSpecialist.name}
                      style={{
                        width: '68px',
                        height: '68px',
                        borderRadius: '6px',
                        objectFit: 'cover',
                        border: '1px solid #C8D8D2',
                        flexShrink: 0,
                      }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/assets/images/logo.png';
                      }}
                    />
                    <div>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Responsible Principal
                      </span>
                      <h3 style={{ fontSize: '18px', margin: '2px 0 4px', color: 'var(--ink)', fontWeight: 700 }}>
                        {submittedRecord.assignedContactName}
                      </h3>
                      <p style={{ margin: 0, fontSize: '13px', color: '#4A5B55' }}>
                        {submittedRecord.assignedContactDesignation} &middot; {assignedSpecialist.department}
                      </p>
                      <p style={{ margin: '6px 0 0', fontSize: '12.5px', color: '#6A7E77' }}>
                        Routed to verified inbox: <strong>{submittedRecord.assignedEmail}</strong>
                      </p>
                    </div>
                  </div>

                  {/* ENQUIRY RECEIPT SUMMARY */}
                  <div
                    style={{
                      background: '#F5F7F6',
                      borderRadius: '6px',
                      padding: '20px',
                      fontSize: '13.5px',
                      color: '#3C4D47',
                    }}
                  >
                    <h4 style={{ margin: '0 0 12px', fontSize: '14px', color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Enquiry Submission Record
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px 16px', marginBottom: '14px' }}>
                      <div>
                        <strong style={{ color: '#1B2A25' }}>Organisation:</strong>{' '}
                        {submittedRecord.organisation || 'Individual Client'}
                      </div>
                      <div>
                        <strong style={{ color: '#1B2A25' }}>Client Email:</strong> {submittedRecord.email}
                      </div>
                      <div>
                        <strong style={{ color: '#1B2A25' }}>Contact Phone:</strong>{' '}
                        {submittedRecord.phone || 'Not provided'}
                      </div>
                      <div>
                        <strong style={{ color: '#1B2A25' }}>Location:</strong>{' '}
                        {submittedRecord.provinceOrCountry}
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <strong style={{ color: '#1B2A25' }}>Subject:</strong> {submittedRecord.subject}
                      </div>
                      {submittedRecord.attachmentName && (
                        <div style={{ gridColumn: '1 / -1' }}>
                          <strong style={{ color: '#1B2A25' }}>Attached Specification:</strong>{' '}
                          {submittedRecord.attachmentName}
                        </div>
                      )}
                    </div>

                    <div style={{ borderTop: '1px solid #E1E6E4', paddingTop: '12px' }}>
                      <strong style={{ color: '#1B2A25', display: 'block', marginBottom: '6px' }}>Project Scope Details:</strong>
                      <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.6, color: '#4A5B55', fontSize: '13px' }}>
                        {submittedRecord.details}
                      </p>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <a
                      href={buildMailtoDispatchUrl(submittedRecord)}
                      className="btn btn-brand"
                      style={{
                        padding: '12px 22px',
                        fontSize: '14px',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      Open Email Client Copy
                    </a>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn btn-ghost"
                      style={{
                        padding: '12px 20px',
                        fontSize: '13.5px',
                        cursor: 'pointer',
                      }}
                    >
                      Submit Another Service Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* THE ENQUIRY FORM */
                <div>
                  <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--line)', paddingBottom: '16px' }}>
                    <span className="label" style={{ color: 'var(--brand)', display: 'block', marginBottom: '4px' }}>
                      DIRECTORATE &amp; SPECIALIST DISPATCH
                    </span>
                    <h2 style={{ fontSize: '24px', color: 'var(--ink)', margin: 0, fontFamily: 'var(--font-heading)' }}>
                      Request Technical Consultation
                    </h2>
                    <p style={{ margin: '6px 0 0', fontSize: '14.5px', color: '#55655F', lineHeight: 1.5 }}>
                      Select the required engineering or environmental service. The system automatically assigns
                      your enquiry to the designated registered practitioner.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    {/* HONEYPOT ANTI-SPAM TRAP (hidden) */}
                    <div style={{ display: 'none' }} aria-hidden="true">
                      <label htmlFor="hp_field">Do not fill this field</label>
                      <input
                        id="hp_field"
                        type="text"
                        name="website_enquiry_hp"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* 1. PROMINENT SERVICE SELECTION FIELD */}
                    <div
                      style={{
                        background: '#F1F7F4',
                        border: '1.5px solid var(--brand)',
                        borderRadius: '6px',
                        padding: '18px 20px',
                      }}
                    >
                      <label
                        htmlFor="field-service-select"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          fontSize: '13.5px',
                          fontWeight: 700,
                          color: 'var(--ink)',
                          marginBottom: '8px',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="2.4" aria-hidden="true">
                            <polygon points="12 2 2 7 12 12 22 7 12 2" />
                            <polyline points="2 17 12 22 22 17" />
                            <polyline points="2 12 12 17 22 12" />
                          </svg>
                          Service Required <span style={{ color: '#c85a48' }}>*</span>
                        </span>
                        <span
                          style={{
                            fontSize: '11px',
                            fontWeight: 600,
                            color: 'var(--btn-green-dark)',
                            background: '#D9ECE4',
                            padding: '2px 8px',
                            borderRadius: '3px',
                            textTransform: 'uppercase',
                          }}
                        >
                          Auto-Routing Active
                        </span>
                      </label>

                      <select
                        id="field-service-select"
                        name="serviceRequired"
                        value={selectedServiceId}
                        onChange={handleServiceChange}
                        aria-label="Select the engineering or environmental service you require"
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          fontSize: '15px',
                          fontWeight: 600,
                          color: 'var(--ink)',
                          background: '#fff',
                          border: '1px solid #B7CECA',
                          borderRadius: '4px',
                          boxSizing: 'border-box',
                          cursor: 'pointer',
                          outline: 'none',
                        }}
                      >
                        {Object.entries(groupedServices).map(([category, items]) => (
                          <optgroup key={category} label={category}>
                            {items.map((svc) => (
                              <option key={svc.id} value={svc.id}>
                                {svc.ref !== 'GEN-01' && svc.ref !== 'DRC-02' ? `[${svc.ref}] ` : ''}
                                {svc.serviceName}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>

                      {/* 2. DYNAMIC CONTACT DISPLAY (UPDATES AUTOMATICALLY) */}
                      <div
                        style={{
                          marginTop: '14px',
                          background: '#fff',
                          border: '1px solid #D2E2DC',
                          borderRadius: '6px',
                          padding: '14px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '14px',
                          boxShadow: '0 2px 6px -2px rgba(15,27,24,0.06)',
                        }}
                        aria-live="polite"
                      >
                        <img
                          src={assignedSpecialist.image}
                          alt={assignedSpecialist.name}
                          style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '6px',
                            objectFit: 'cover',
                            border: '1.5px solid #C4D7D0',
                            flexShrink: 0,
                          }}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/assets/images/logo.png';
                          }}
                        />

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                            <span
                              style={{
                                fontSize: '10.5px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                                color: 'var(--brand)',
                              }}
                            >
                              Assigned Contact Person
                            </span>
                            <span
                              style={{
                                fontSize: '10.5px',
                                background: '#EAF5F0',
                                color: '#1B5B44',
                                padding: '1px 6px',
                                borderRadius: '3px',
                                fontWeight: 600,
                              }}
                            >
                              {activeRouting.category}
                            </span>
                          </div>

                          <h4 style={{ margin: '2px 0 2px', fontSize: '15.5px', color: 'var(--ink)', fontWeight: 700 }}>
                            {assignedSpecialist.name}
                          </h4>
                          <p style={{ margin: 0, fontSize: '12.5px', color: '#44554F', lineHeight: 1.4 }}>
                            <strong>{assignedSpecialist.designation}</strong> &middot; {assignedSpecialist.department}
                          </p>
                          <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: '#6A7D76', flexWrap: 'wrap' }}>
                            <span>
                              Verified Email: <strong style={{ color: 'var(--ink)' }}>{assignedSpecialist.verifiedEmail}</strong>
                            </span>
                            <span>
                              Direct Phone: <strong style={{ color: 'var(--ink)' }}>{assignedSpecialist.directPhone}</strong>
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Verification Notice */}
                      <p style={{ margin: '8px 0 0', fontSize: '11.5px', color: '#5C7069', fontStyle: 'italic' }}>
                        &bull; {assignedSpecialist.verificationNotice}
                      </p>
                    </div>

                    {/* 3. CLIENT IDENTIFICATION (NAME & ORGANISATION) */}
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
                          name="fullName"
                          value={fullName}
                          onChange={(e) => {
                            setFullName(e.target.value);
                            if (formErrors.fullName) setFormErrors((p) => ({ ...p, fullName: '' }));
                          }}
                          placeholder="e.g. John Molefe"
                          required
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            fontSize: '14px',
                            background: '#fff',
                            border: formErrors.fullName ? '1.5px solid #C85A48' : '1px solid var(--line)',
                            borderRadius: '4px',
                            boxSizing: 'border-box',
                          }}
                        />
                        {formErrors.fullName && (
                          <span style={{ display: 'block', fontSize: '12px', color: '#C85A48', marginTop: '4px' }}>
                            {formErrors.fullName}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="field-organisation"
                          style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                        >
                          Company / Organisation
                        </label>
                        <input
                          id="field-organisation"
                          type="text"
                          name="organisation"
                          value={organisation}
                          onChange={(e) => setOrganisation(e.target.value)}
                          placeholder="e.g. Mining House, Municipality, Contractor"
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

                    {/* 4. CLIENT CONTACT (EMAIL & PHONE) */}
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
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (formErrors.email) setFormErrors((p) => ({ ...p, email: '' }));
                          }}
                          placeholder="name@company.co.za"
                          required
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            fontSize: '14px',
                            background: '#fff',
                            border: formErrors.email ? '1.5px solid #C85A48' : '1px solid var(--line)',
                            borderRadius: '4px',
                            boxSizing: 'border-box',
                          }}
                        />
                        {formErrors.email && (
                          <span style={{ display: 'block', fontSize: '12px', color: '#C85A48', marginTop: '4px' }}>
                            {formErrors.email}
                          </span>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="field-phone"
                          style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                        >
                          Contact Number
                        </label>
                        <input
                          id="field-phone"
                          type="tel"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
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

                    {/* 5. LOCATION (PROVINCE / COUNTRY) & ENQUIRY SUBJECT */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                      <div>
                        <label
                          htmlFor="field-province"
                          style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                        >
                          Province / Country
                        </label>
                        <select
                          id="field-province"
                          name="province"
                          value={province}
                          onChange={(e) => setProvince(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            fontSize: '14px',
                            background: '#fff',
                            border: '1px solid var(--line)',
                            borderRadius: '4px',
                            boxSizing: 'border-box',
                            cursor: 'pointer',
                          }}
                        >
                          {SA_PROVINCES.map((p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="field-subject"
                          style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                        >
                          Enquiry Subject <span style={{ color: '#c85a48' }}>*</span>
                        </label>
                        <input
                          id="field-subject"
                          type="text"
                          name="subject"
                          value={subject}
                          onChange={handleSubjectChange}
                          placeholder="e.g. Substation Maintenance / WULA Licencing"
                          required
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            fontSize: '14px',
                            background: '#fff',
                            border: formErrors.subject ? '1.5px solid #C85A48' : '1px solid var(--line)',
                            borderRadius: '4px',
                            boxSizing: 'border-box',
                          }}
                        />
                        {formErrors.subject && (
                          <span style={{ display: 'block', fontSize: '12px', color: '#C85A48', marginTop: '4px' }}>
                            {formErrors.subject}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* 6. ENQUIRY DETAILS */}
                    <div>
                      <label
                        htmlFor="field-details"
                        style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '6px' }}
                      >
                        Enquiry Details &amp; Technical Scope <span style={{ color: '#c85a48' }}>*</span>
                      </label>
                      <textarea
                        id="field-details"
                        name="details"
                        value={details}
                        onChange={(e) => {
                          setDetails(e.target.value);
                          if (formErrors.details) setFormErrors((p) => ({ ...p, details: '' }));
                        }}
                        rows={5}
                        placeholder="Please describe your facility, site location, technical challenge, statutory deadline, or project terms of reference..."
                        required
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          fontSize: '14px',
                          background: '#fff',
                          border: formErrors.details ? '1.5px solid #C85A48' : '1px solid var(--line)',
                          borderRadius: '4px',
                          boxSizing: 'border-box',
                          lineHeight: 1.5,
                          fontFamily: 'inherit',
                          resize: 'vertical',
                        }}
                      ></textarea>
                      {formErrors.details && (
                        <span style={{ display: 'block', fontSize: '12px', color: '#C85A48', marginTop: '4px' }}>
                          {formErrors.details}
                        </span>
                      )}
                    </div>

                    {/* 7. OPTIONAL FILE ATTACHMENT */}
                    <div>
                      <label
                        htmlFor="field-attachment"
                        style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--ink)', marginBottom: '4px' }}
                      >
                        Optional Specification / Scope Document (PDF, DWG, DOCX, PNG &le; 15MB)
                      </label>
                      <div
                        style={{
                          border: '1px dashed #A6BCB5',
                          borderRadius: '4px',
                          padding: '14px 16px',
                          background: '#FAFCFB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '10px',
                        }}
                      >
                        <input
                          id="field-attachment"
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx,.dwg,.dxf,.png,.jpg,.jpeg,.xlsx"
                          style={{ fontSize: '13px', color: '#4D5E58' }}
                        />
                        {attachmentName && (
                          <span
                            style={{
                              fontSize: '12.5px',
                              fontWeight: 600,
                              color: 'var(--btn-green-dark)',
                              background: '#E2F2EB',
                              padding: '3px 8px',
                              borderRadius: '4px',
                            }}
                          >
                            Selected: {attachmentName}
                          </span>
                        )}
                      </div>
                      {attachmentError && (
                        <span style={{ display: 'block', fontSize: '12px', color: '#C85A48', marginTop: '4px' }}>
                          {attachmentError}
                        </span>
                      )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-brand"
                      aria-label="Submit engineering enquiry to assigned specialist"
                      style={{
                        padding: '14px 28px',
                        fontSize: '15px',
                        fontWeight: 700,
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        cursor: isSubmitting ? 'wait' : 'pointer',
                        borderRadius: '4px',
                        opacity: isSubmitting ? 0.75 : 1,
                      }}
                    >
                      {isSubmitting ? (
                        <span>Processing &amp; Assigning Enquiry...</span>
                      ) : (
                        <>
                          <span>Submit Enquiry to {assignedSpecialist.name}</span>
                          <span aria-hidden="true">&rarr;</span>
                        </>
                      )}
                    </button>

                    <p style={{ margin: 0, textAlign: 'center', fontSize: '12px', color: '#6e7e78' }}>
                      Certified South African Practice &middot; Level 1 B-BBEE &middot; Statutory Confidentiality
                    </p>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR: DIRECT CONTACT, ACCREDITATIONS & ADMINISTRATIVE NOTICE */}
          <aside className="detail-sidebar" aria-label="Practice Contact Information" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* DIRECT CONTACT */}
            <div className="side-card" style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--ink)', margin: '0 0 14px', fontWeight: 700 }}>
                Direct Contact Channels
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#3C4A45' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    Verified Corporate Email
                  </span>
                  <a href="mailto:info@marvethabi.co.za" style={{ color: 'var(--ink)', textDecoration: 'none', fontWeight: 600 }}>
                    info@marvethabi.co.za
                  </a>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    Principal Telephone Lines
                  </span>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>
                    +27 82 412 3847 <span style={{ fontSize: '12px', fontWeight: 400, color: '#667770' }}>(Engineering / Marvellous Ngoatle)</span>
                  </p>
                  <p style={{ margin: '4px 0 0', fontWeight: 600, color: 'var(--ink)' }}>
                    +27 72 834 7953 <span style={{ fontSize: '12px', fontWeight: 400, color: '#667770' }}>(Environmental / Thabang Ngoatle)</span>
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    Consulting Hours
                  </span>
                  <p style={{ margin: 0 }}>Monday &ndash; Friday: 08:00 &ndash; 17:00 SAST</p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    LinkedIn Corporate Profile
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
                    MarveThabi on LinkedIn &rarr;
                  </a>
                </div>
              </div>
            </div>

            {/* HEAD OFFICE LOCATION */}
            <div className="side-card" style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--ink)', margin: '0 0 10px', fontWeight: 700 }}>
                Practice Head Office
              </h4>
              <p style={{ fontSize: '13.5px', color: '#3C4A45', lineHeight: 1.55, margin: 0 }}>
                Unit 68 Saliehout Street, Stenostelma, Annlin, Pretoria 0182, Gauteng, South Africa
              </p>
            </div>

            {/* REGISTRATIONS & COMPLIANCE */}
            <div className="side-card" style={{ background: '#fff', padding: '24px', borderRadius: '8px' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--ink)', margin: '0 0 12px', fontWeight: 700 }}>
                Statutory Credentials
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
