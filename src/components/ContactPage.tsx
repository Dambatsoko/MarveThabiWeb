import React, { useState, useEffect } from 'react';
import {
  SERVICE_CATEGORIES,
  getServiceCategoryById,
  getDefaultServiceCategory,
  generateEnquiryReference,
  saveEnquiryToRegistry,
  buildMailtoDispatchUrl,
  EnquiryRecord,
} from '../data/contactRouting';

interface ContactPageProps {
  onNavigate?: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate: _onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Form state
  const defaultCategory = getDefaultServiceCategory();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(defaultCategory.id);
  const [fullName, setFullName] = useState<string>('');
  const [organisation, setOrganisation] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [subject, setSubject] = useState<string>(defaultCategory.defaultSubject);
  const [subjectModified, setSubjectModified] = useState<boolean>(false);
  const [details, setDetails] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>(''); // Anti-spam trap

  // Submission tracking state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedRecord, setSubmittedRecord] = useState<EnquiryRecord | null>(null);

  // Active category & assigned contact
  const activeCategory = getServiceCategoryById(selectedCategoryId) || defaultCategory;
  const assignedContact = activeCategory.assignedContact;

  // Handle service category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setSelectedCategoryId(newId);

    const category = getServiceCategoryById(newId);
    if (category && !subjectModified) {
      setSubject(category.defaultSubject);
    }
  };

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubject(e.target.value);
    setSubjectModified(true);
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
        errors.email = 'Please provide a valid email address.';
      }
    }

    if (!subject.trim()) {
      errors.subject = 'Please enter an enquiry subject.';
    }

    if (!details.trim()) {
      errors.details = 'Please describe your project scope or enquiry details.';
    } else if (details.trim().length < 10) {
      errors.details = 'Please provide at least 10 characters of detail for technical evaluation.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
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
      categoryId: activeCategory.id,
      categoryName: activeCategory.name,
      serviceName: activeCategory.name,
      category: activeCategory.name,
      assignedContactName: assignedContact.name,
      assignedContactResponsibility: assignedContact.responsibility,
      assignedContactDesignation: assignedContact.designation,
      assignedEmail: assignedContact.verifiedEmail,
      subject: subject.trim(),
      details: details.trim(),
      status: 'submitted',
    };

    // 1. Persist to registry
    saveEnquiryToRegistry(record);

    // 2. Prepare mailto URI with full parameters
    const mailtoUrl = buildMailtoDispatchUrl(record);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedRecord(record);
      window.scrollTo({ top: 160, behavior: 'smooth' });

      // Trigger transparent email client dispatch
      try {
        const link = document.createElement('a');
        link.href = mailtoUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        console.info('Mailto trigger completed:', err);
      }
    }, 350);
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setFullName('');
    setOrganisation('');
    setEmail('');
    setPhone('');
    setSubject(activeCategory.defaultSubject);
    setSubjectModified(false);
    setDetails('');
    setFormErrors({});
  };

  return (
    <main className="contact-page detail-page">
      {/* ============ HERO ============ */}
      <section className="svc-hero">
        <div className="svc-hero-grid-bg" aria-hidden="true"></div>

        <div className="wrap">
          <h1 className="svc-hero-title">Contact Us</h1>
          <p className="lead svc-hero-sub">
            Direct your technical requirement to the registered engineer or scientist responsible
            for that specific discipline. Our team provides responsive consultation and statutory engineering evaluation.
          </p>
        </div>
      </section>

      {/* ============ CONTACT SECTION ============ */}
      <section className="detail-body-section" style={{ background: '#F8FAF9', padding: '56px 0 80px' }}>
        <div className="wrap detail-grid" style={{ alignItems: 'start' }}>
          {/* MAIN ENQUIRY FORM COLUMN */}
          <div>
            <div
              style={{
                background: '#fff',
                border: '1px solid var(--line, #E1E8E6)',
                borderRadius: '8px',
                padding: '36px 32px',
                boxShadow: '0 4px 20px -8px rgba(15,27,24,0.06)',
              }}
            >
              {/* SUCCESS CONFIRMATION DISPLAY */}
              {submittedRecord ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                  }}
                >
                  <div
                    style={{
                      background: '#EAF4F0',
                      borderLeft: '4px solid var(--btn-green, #649C08)',
                      padding: '24px',
                      borderRadius: '6px',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '10px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '12px',
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: 'var(--btn-green-dark, #436905)',
                        }}
                      >
                        Enquiry Successfully Submitted
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#334842' }}>
                        Ref: {submittedRecord.referenceNumber}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '22px', color: 'var(--ink, #16211E)', margin: '0 0 8px', fontFamily: 'var(--font-heading)' }}>
                      Thank you, {submittedRecord.fullName}
                    </h2>
                    <p style={{ fontSize: '15px', color: '#2B3934', lineHeight: 1.6, margin: 0 }}>
                      Your enquiry regarding <strong>{submittedRecord.categoryName || submittedRecord.serviceName}</strong> has been received and routed directly to{' '}
                      <strong>{submittedRecord.assignedContactName}</strong> ({submittedRecord.assignedContactResponsibility}).
                    </p>
                  </div>

                  {/* SUMMARY OF SUBMITTED DETAILS */}
                  <div
                    style={{
                      background: '#F8FAF9',
                      border: '1px solid var(--line, #E1E8E6)',
                      borderRadius: '6px',
                      padding: '20px',
                      fontSize: '14px',
                      color: '#3C4D47',
                    }}
                  >
                    <h3
                      style={{
                        margin: '0 0 14px',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: 'var(--ink, #16211E)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      Enquiry Summary
                    </h3>
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '12px 20px',
                        marginBottom: '14px',
                      }}
                    >
                      <div>
                        <strong style={{ color: '#16211E' }}>Full Name:</strong> {submittedRecord.fullName}
                      </div>
                      <div>
                        <strong style={{ color: '#16211E' }}>Organisation:</strong>{' '}
                        {submittedRecord.organisation || 'Not specified'}
                      </div>
                      <div>
                        <strong style={{ color: '#16211E' }}>Email Address:</strong> {submittedRecord.email}
                      </div>
                      <div>
                        <strong style={{ color: '#16211E' }}>Contact Number:</strong>{' '}
                        {submittedRecord.phone || 'Not provided'}
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <strong style={{ color: '#16211E' }}>Service Category:</strong>{' '}
                        {submittedRecord.categoryName || submittedRecord.serviceName}
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <strong style={{ color: '#16211E' }}>Subject:</strong> {submittedRecord.subject}
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid var(--line, #E1E8E6)', paddingTop: '12px' }}>
                      <strong style={{ color: '#16211E', display: 'block', marginBottom: '4px' }}>Details:</strong>
                      <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.55 }}>
                        {submittedRecord.details}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn btn-outline"
                      style={{ padding: '10px 20px', cursor: 'pointer' }}
                    >
                      Submit Another Enquiry
                    </button>
                    <a
                      href={`mailto:${submittedRecord.assignedEmail}?subject=${encodeURIComponent(
                        `Follow-up: [Ref: ${submittedRecord.referenceNumber}] ${submittedRecord.subject}`
                      )}`}
                      className="btn btn-brand"
                      style={{ padding: '10px 22px' }}
                    >
                      Open Email Client
                    </a>
                  </div>
                </div>
              ) : (
                /* ENQUIRY FORM */
                <form onSubmit={handleSubmit} noValidate>
                  {/* Anti-spam honeypot */}
                  <div style={{ display: 'none' }} aria-hidden="true">
                    <label htmlFor="field-website">Website</label>
                    <input
                      id="field-website"
                      type="text"
                      name="website"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {/* TWO-COLUMN: FULL NAME & ORGANISATION */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
                      <div>
                        <label
                          htmlFor="field-name"
                          style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink, #16211E)', marginBottom: '6px' }}
                        >
                          Full Name <span style={{ color: '#C85A48' }}>*</span>
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
                            border: formErrors.fullName ? '1.5px solid #C85A48' : '1px solid var(--line, #E1E8E6)',
                            borderRadius: '6px',
                            boxSizing: 'border-box',
                            outline: 'none',
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
                          htmlFor="field-org"
                          style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink, #16211E)', marginBottom: '6px' }}
                        >
                          Company / Organisation
                        </label>
                        <input
                          id="field-org"
                          type="text"
                          name="organisation"
                          value={organisation}
                          onChange={(e) => setOrganisation(e.target.value)}
                          placeholder="e.g. Anglo American / City of Ekurhuleni"
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            fontSize: '14px',
                            background: '#fff',
                            border: '1px solid var(--line, #E1E8E6)',
                            borderRadius: '6px',
                            boxSizing: 'border-box',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    {/* TWO-COLUMN: EMAIL ADDRESS & CONTACT NUMBER */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
                      <div>
                        <label
                          htmlFor="field-email"
                          style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink, #16211E)', marginBottom: '6px' }}
                        >
                          Email Address <span style={{ color: '#C85A48' }}>*</span>
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
                          placeholder="e.g. j.molefe@company.co.za"
                          required
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            fontSize: '14px',
                            background: '#fff',
                            border: formErrors.email ? '1.5px solid #C85A48' : '1px solid var(--line, #E1E8E6)',
                            borderRadius: '6px',
                            boxSizing: 'border-box',
                            outline: 'none',
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
                          style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink, #16211E)', marginBottom: '6px' }}
                        >
                          Contact Number
                        </label>
                        <input
                          id="field-phone"
                          type="tel"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="e.g. +27 82 000 0000"
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            fontSize: '14px',
                            background: '#fff',
                            border: '1px solid var(--line, #E1E8E6)',
                            borderRadius: '6px',
                            boxSizing: 'border-box',
                            outline: 'none',
                          }}
                        />
                      </div>
                    </div>

                    {/* SERVICE REQUIRED (DROPDOWN + COMPACT ROUTING CONFIRMATION) */}
                    <div>
                      <label
                        htmlFor="field-service-select"
                        style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink, #16211E)', marginBottom: '6px' }}
                      >
                        Service Required <span style={{ color: '#C85A48' }}>*</span>
                      </label>
                      <select
                        id="field-service-select"
                        name="serviceRequired"
                        value={selectedCategoryId}
                        onChange={handleCategoryChange}
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          fontSize: '14.5px',
                          fontWeight: 600,
                          color: 'var(--ink, #16211E)',
                          background: '#fff',
                          border: '1px solid var(--line, #E1E8E6)',
                          borderRadius: '6px',
                          boxSizing: 'border-box',
                          cursor: 'pointer',
                          outline: 'none',
                        }}
                      >
                        {SERVICE_CATEGORIES.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>

                      {/* COMPACT AUTOMATIC CONTACT ASSIGNMENT */}
                      <div
                        style={{
                          marginTop: '10px',
                          padding: '12px 16px',
                          background: '#F0F7F4',
                          border: '1px solid #D1E5DD',
                          borderRadius: '6px',
                          boxSizing: 'border-box',
                        }}
                        aria-live="polite"
                      >
                        <p style={{ margin: 0, fontSize: '12px', fontWeight: 600, color: '#55655F' }}>
                          Your enquiry will be directed to:
                        </p>
                        <p
                          style={{
                            margin: '3px 0 1px',
                            fontSize: '15px',
                            fontWeight: 700,
                            color: 'var(--ink, #16211E)',
                          }}
                        >
                          {assignedContact.name}
                        </p>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--brand-dark, #265045)' }}>
                          {assignedContact.responsibility}
                        </p>
                      </div>
                    </div>

                    {/* ENQUIRY SUBJECT */}
                    <div>
                      <label
                        htmlFor="field-subject"
                        style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink, #16211E)', marginBottom: '6px' }}
                      >
                        Enquiry Subject <span style={{ color: '#C85A48' }}>*</span>
                      </label>
                      <input
                        id="field-subject"
                        type="text"
                        name="subject"
                        value={subject}
                        onChange={handleSubjectChange}
                        placeholder="Brief summary of your enquiry"
                        required
                        style={{
                          width: '100%',
                          padding: '11px 14px',
                          fontSize: '14px',
                          background: '#fff',
                          border: formErrors.subject ? '1.5px solid #C85A48' : '1px solid var(--line, #E1E8E6)',
                          borderRadius: '6px',
                          boxSizing: 'border-box',
                          outline: 'none',
                        }}
                      />
                      {formErrors.subject && (
                        <span style={{ display: 'block', fontSize: '12px', color: '#C85A48', marginTop: '4px' }}>
                          {formErrors.subject}
                        </span>
                      )}
                    </div>

                    {/* ENQUIRY DETAILS */}
                    <div>
                      <label
                        htmlFor="field-details"
                        style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--ink, #16211E)', marginBottom: '6px' }}
                      >
                        Enquiry Details <span style={{ color: '#C85A48' }}>*</span>
                      </label>
                      <textarea
                        id="field-details"
                        name="details"
                        rows={5}
                        value={details}
                        onChange={(e) => {
                          setDetails(e.target.value);
                          if (formErrors.details) setFormErrors((p) => ({ ...p, details: '' }));
                        }}
                        placeholder="Please provide details regarding your requirements, technical scope, plant location, or project objectives..."
                        required
                        style={{
                          width: '100%',
                          padding: '12px 14px',
                          fontSize: '14px',
                          lineHeight: 1.6,
                          background: '#fff',
                          border: formErrors.details ? '1.5px solid #C85A48' : '1px solid var(--line, #E1E8E6)',
                          borderRadius: '6px',
                          boxSizing: 'border-box',
                          resize: 'vertical',
                          outline: 'none',
                        }}
                      />
                      {formErrors.details && (
                        <span style={{ display: 'block', fontSize: '12px', color: '#C85A48', marginTop: '4px' }}>
                          {formErrors.details}
                        </span>
                      )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-brand"
                        aria-label="Submit enquiry"
                        style={{
                          padding: '13px 28px',
                          fontSize: '15px',
                          fontWeight: 700,
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '10px',
                          cursor: isSubmitting ? 'wait' : 'pointer',
                          borderRadius: '6px',
                          opacity: isSubmitting ? 0.75 : 1,
                        }}
                      >
                        {isSubmitting ? (
                          <span>Routing Enquiry...</span>
                        ) : (
                          <span>Submit Enquiry</span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR: DIRECT CONTACT & ACCREDITATIONS */}
          <aside className="detail-sidebar" aria-label="Practice Contact Information" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* DIRECT CONTACT */}
            <div className="side-card" style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--line, #E1E8E6)' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--ink, #16211E)', margin: '0 0 14px', fontWeight: 700 }}>
                Direct Contact Channels
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#3C4A45' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand, #336659)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    Email
                  </span>
                  <a href="mailto:info@marvethabi.co.za" style={{ color: 'var(--ink, #16211E)', textDecoration: 'none', fontWeight: 600 }}>
                    info@marvethabi.co.za
                  </a>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand, #336659)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    Telephone
                  </span>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink, #16211E)' }}>
                    +27 82 412 3847 <span style={{ fontSize: '12px', fontWeight: 400, color: '#667770' }}>(Engineering / Marvelous Ngoatle)</span>
                  </p>
                  <p style={{ margin: '4px 0 0', fontWeight: 600, color: 'var(--ink, #16211E)' }}>
                    +27 72 834 7953 <span style={{ fontSize: '12px', fontWeight: 400, color: '#667770' }}>(Environmental / Thabang Ngoatle)</span>
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand, #336659)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    Consulting Hours
                  </span>
                  <p style={{ margin: 0 }}>Monday &ndash; Friday: 08:00 &ndash; 17:00 SAST</p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand, #336659)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
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
            <div className="side-card" style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--line, #E1E8E6)' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--ink, #16211E)', margin: '0 0 10px', fontWeight: 700 }}>
                Practice Head Office
              </h4>
              <p style={{ fontSize: '13.5px', color: '#3C4A45', lineHeight: 1.55, margin: 0 }}>
                Unit 68 Saliehout Street, Stenostelma, Annlin, Pretoria 0182, Gauteng, South Africa
              </p>
            </div>

            {/* REGISTRATIONS & COMPLIANCE */}
            <div className="side-card" style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--line, #E1E8E6)' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--ink, #16211E)', margin: '0 0 12px', fontWeight: 700 }}>
                Statutory Credentials
              </h4>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#47564F' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>B-BBEE Status:</span>
                  <strong style={{ color: 'var(--btn-green-dark, #436905)' }}>Level 1 (135% Recognition)</strong>
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
