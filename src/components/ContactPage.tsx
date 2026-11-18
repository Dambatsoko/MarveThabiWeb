import React, { useState, useEffect } from 'react';
import {
  getServiceCategoryById,
  getDefaultServiceCategory,
  generateEnquiryReference,
  saveEnquiryToRegistry,
  buildMailtoDispatchUrl,
  EnquiryRecord,
} from '../data/contactRouting';
import { useLanguage } from '../i18n/LanguageContext';
import {
  getLocalizedServiceCategories,
  getLocalizedServiceCategoryById,
} from '../i18n/data';

interface ContactPageProps {
  onNavigate?: (path: string) => void;
}

function interpolate(template: string, vars: Record<string, string>): string {
  return Object.entries(vars).reduce(
    (acc, [key, value]) => acc.split(`{${key}}`).join(value),
    template
  );
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate: _onNavigate }) => {
  const { lang, t } = useLanguage();
  const categories = getLocalizedServiceCategories(lang);
  const defaultCategoryEn = getDefaultServiceCategory();
  const defaultLocalizedCategory =
    getLocalizedServiceCategoryById(defaultCategoryEn.id, lang) || categories[0] || defaultCategoryEn;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Form state
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(defaultCategoryEn.id);
  const [fullName, setFullName] = useState<string>('');
  const [organisation, setOrganisation] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [subject, setSubject] = useState<string>(defaultLocalizedCategory.defaultSubject);
  const [subjectModified, setSubjectModified] = useState<boolean>(false);
  const [details, setDetails] = useState<string>('');
  const [honeypot, setHoneypot] = useState<string>(''); // Anti-spam trap

  // Submission tracking state
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedRecord, setSubmittedRecord] = useState<EnquiryRecord | null>(null);
  const [submissionStatus, setSubmissionStatus] = useState<{
    sentDirectly: boolean;
    targetEmail: string;
    message: string;
  } | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Localized category for UI display & canonical English category for backend email routing
  const activeLocalizedCategory =
    getLocalizedServiceCategoryById(selectedCategoryId, lang) || defaultLocalizedCategory;
  const activeCanonicalCategory =
    getServiceCategoryById(selectedCategoryId) || defaultCategoryEn;
  const assignedContact = activeLocalizedCategory.assignedContact;

  // Keep auto-filled default subject synced when switching languages (only if user hasn't typed a custom subject)
  useEffect(() => {
    if (!subjectModified) {
      setSubject(activeLocalizedCategory.defaultSubject);
    }
  }, [lang, activeLocalizedCategory.defaultSubject, subjectModified]);

  // Handle service category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newId = e.target.value;
    setSelectedCategoryId(newId);

    const category = getLocalizedServiceCategoryById(newId, lang);
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
      errors.fullName = t.contactPage.validationFullName;
    }

    if (!email.trim()) {
      errors.email = t.contactPage.validationEmailRequired;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.trim())) {
        errors.email = t.contactPage.validationEmailInvalid;
      }
    }

    if (!subject.trim()) {
      errors.subject = t.contactPage.validationSubject;
    }

    if (!details.trim()) {
      errors.details = t.contactPage.validationDetailsRequired;
    } else if (details.trim().length < 10) {
      errors.details = t.contactPage.validationDetailsMin;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    const refNo = generateEnquiryReference();
    const timestamp = new Date().toLocaleString(lang === 'fr' ? 'fr-FR' : 'en-ZA', {
      timeZone: 'Africa/Johannesburg',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Preserve canonical English category & routing metadata for backend email delivery,
    // and never translate submitted user fields (fullName, organisation, email, phone, subject, details).
    const canonicalAssigned = activeCanonicalCategory.assignedContact;

    const record: EnquiryRecord = {
      referenceNumber: refNo,
      timestamp,
      fullName: fullName.trim(),
      organisation: organisation.trim(),
      email: email.trim(),
      phone: phone.trim(),
      categoryId: activeCanonicalCategory.id,
      categoryName: activeCanonicalCategory.name,
      serviceName: activeCanonicalCategory.name,
      category: activeCanonicalCategory.name,
      assignedContactName: canonicalAssigned.name,
      assignedContactResponsibility: canonicalAssigned.responsibility,
      assignedContactDesignation: canonicalAssigned.designation,
      assignedEmail: canonicalAssigned.verifiedEmail,
      subject: subject.trim(),
      details: details.trim(),
      status: 'submitted',
    };

    // 1. Persist to browser registry
    saveEnquiryToRegistry(record);

    // 2. Dispatch straight from the form to info@marvethabi.co.za via backend API
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const resData = await response.json().catch(() => ({}));
      const isDelivered = Boolean(resData.delivered);
      const targetEmail = resData.targetEmail || canonicalAssigned.verifiedEmail;

      setIsSubmitting(false);
      setSubmittedRecord(record);
      setSubmissionStatus({
        sentDirectly: isDelivered,
        targetEmail,
        message: isDelivered
          ? (lang === 'en' && resData.message) ||
            interpolate(t.contactPage.deliveredMessage, { email: targetEmail })
          : interpolate(t.contactPage.loggedMessage, {
              ref: refNo,
              contact: assignedContact.name,
              email: targetEmail,
            }),
      });
      window.scrollTo({ top: 160, behavior: 'smooth' });
    } catch (err: unknown) {
      console.warn('Direct API submission encountered an error, falling back:', err);
      setIsSubmitting(false);
      setSubmittedRecord(record);
      setSubmissionError(t.contactPage.fallbackErrorNotice);
      setSubmissionStatus({
        sentDirectly: false,
        targetEmail: canonicalAssigned.verifiedEmail,
        message: interpolate(t.contactPage.fallbackStatusMessage, {
          ref: refNo,
          contact: assignedContact.name,
        }),
      });
      window.scrollTo({ top: 160, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setSubmittedRecord(null);
    setSubmissionStatus(null);
    setSubmissionError(null);
    setFullName('');
    setOrganisation('');
    setEmail('');
    setPhone('');
    setSubject(activeLocalizedCategory.defaultSubject);
    setSubjectModified(false);
    setDetails('');
    setFormErrors({});
  };

  // Resolve localized display labels for submitted confirmation screen
  const submittedLocalizedCategory = submittedRecord
    ? getLocalizedServiceCategoryById(submittedRecord.categoryId || defaultCategoryEn.id, lang)
    : undefined;
  const submittedCategoryDisplay =
    submittedLocalizedCategory?.name || submittedRecord?.categoryName || submittedRecord?.serviceName || '';
  const submittedContactDisplay =
    submittedLocalizedCategory?.assignedContact.name || submittedRecord?.assignedContactName || '';
  const submittedResponsibilityDisplay =
    submittedLocalizedCategory?.assignedContact.responsibility ||
    submittedRecord?.assignedContactResponsibility ||
    '';

  return (
    <main className="contact-page detail-page">
      {/* ============ HERO ============ */}
      <section className="svc-hero">
        <div className="svc-hero-grid-bg" aria-hidden="true"></div>

        <div className="wrap">
          <h1 className="svc-hero-title">{t.contactPage.heroTitle}</h1>
          <p className="lead svc-hero-sub">
            {t.contactPage.heroSubtitle}
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
                        {t.contactPage.badgePrefix} {submittedRecord.assignedEmail || 'info@marvethabi.co.za'}
                      </span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#334842' }}>
                        {t.contactPage.refPrefix} {submittedRecord.referenceNumber}
                      </span>
                    </div>

                    <h2 style={{ fontSize: '22px', color: 'var(--ink, #16211E)', margin: '0 0 8px', fontFamily: 'var(--font-heading)' }}>
                      {t.contactPage.thankYouPrefix} {submittedRecord.fullName}
                    </h2>
                    <p style={{ fontSize: '15px', color: '#2B3934', lineHeight: 1.6, margin: 0 }}>
                      {interpolate(t.contactPage.confirmationIntro, {
                        category: submittedCategoryDisplay,
                        email: submittedRecord.assignedEmail || 'info@marvethabi.co.za',
                        contact: submittedContactDisplay,
                        responsibility: submittedResponsibilityDisplay.replace(/\.$/, ''),
                      })}
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
                      {t.contactPage.summaryHeading}
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
                        <strong style={{ color: '#16211E' }}>{t.contactPage.labelFullName}</strong> {submittedRecord.fullName}
                      </div>
                      <div>
                        <strong style={{ color: '#16211E' }}>{t.contactPage.labelOrganisation}</strong>{' '}
                        {submittedRecord.organisation || t.contactPage.notSpecified}
                      </div>
                      <div>
                        <strong style={{ color: '#16211E' }}>{t.contactPage.labelEmail}</strong> {submittedRecord.email}
                      </div>
                      <div>
                        <strong style={{ color: '#16211E' }}>{t.contactPage.labelPhone}</strong>{' '}
                        {submittedRecord.phone || t.contactPage.notProvided}
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <strong style={{ color: '#16211E' }}>{t.contactPage.labelServiceCategory}</strong>{' '}
                        {submittedCategoryDisplay}
                      </div>
                      <div style={{ gridColumn: '1 / -1' }}>
                        <strong style={{ color: '#16211E' }}>{t.contactPage.labelSubject}</strong> {submittedRecord.subject}
                      </div>
                    </div>
                    <div style={{ borderTop: '1px solid var(--line, #E1E8E6)', paddingTop: '12px' }}>
                      <strong style={{ color: '#16211E', display: 'block', marginBottom: '4px' }}>{t.contactPage.labelDetails}</strong>
                      <p style={{ margin: 0, whiteSpace: 'pre-wrap', lineHeight: 1.55 }}>
                        {submittedRecord.details}
                      </p>
                    </div>
                  </div>

                  {submissionStatus && (
                    <div
                      style={{
                        fontSize: '13.5px',
                        color: '#265045',
                        background: '#F0F7F4',
                        padding: '12px 16px',
                        borderRadius: '6px',
                        border: '1px solid #D1E5DD',
                        lineHeight: 1.5,
                      }}
                    >
                      ✓ <strong>{t.contactPage.deliveryStatusLabel}</strong> {submissionStatus.message}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="btn btn-outline"
                      style={{ padding: '10px 20px', cursor: 'pointer' }}
                    >
                      {t.contactPage.submitAnother}
                    </button>
                    <a
                      href={buildMailtoDispatchUrl(submittedRecord)}
                      className="btn btn-brand"
                      style={{ padding: '10px 22px' }}
                      title={t.contactPage.openEmailClientTitle}
                    >
                      {t.contactPage.openEmailClient}
                    </a>
                  </div>
                </div>
              ) : (
                /* ENQUIRY FORM */
                <form onSubmit={handleSubmit} noValidate>
                  {submissionError && (
                    <div
                      style={{
                        background: '#FDF2F0',
                        borderLeft: '4px solid #C85A48',
                        padding: '12px 16px',
                        borderRadius: '4px',
                        marginBottom: '18px',
                        fontSize: '13.5px',
                        color: '#7D2B1E',
                      }}
                    >
                      {submissionError}
                    </div>
                  )}

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
                          {t.home.formFullName} <span style={{ color: '#C85A48' }}>*</span>
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
                          placeholder={t.contactPage.formNamePlaceholder}
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
                          {t.contactPage.formOrgLabel}
                        </label>
                        <input
                          id="field-org"
                          type="text"
                          name="organisation"
                          value={organisation}
                          onChange={(e) => setOrganisation(e.target.value)}
                          placeholder={t.contactPage.formOrgPlaceholder}
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
                          {t.contactPage.formEmailLabel} <span style={{ color: '#C85A48' }}>*</span>
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
                          placeholder={t.contactPage.formEmailPlaceholder}
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
                          {t.contactPage.formPhoneLabel}
                        </label>
                        <input
                          id="field-phone"
                          type="tel"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder={t.contactPage.formPhonePlaceholder}
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
                        {t.contactPage.formServiceLabel} <span style={{ color: '#C85A48' }}>*</span>
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
                        {categories.map((cat) => (
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
                          {t.contactPage.directedToLabel}
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
                        {t.contactPage.formSubjectLabel} <span style={{ color: '#C85A48' }}>*</span>
                      </label>
                      <input
                        id="field-subject"
                        type="text"
                        name="subject"
                        value={subject}
                        onChange={handleSubjectChange}
                        placeholder={t.contactPage.formSubjectPlaceholder}
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
                        {t.contactPage.formDetailsLabel} <span style={{ color: '#C85A48' }}>*</span>
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
                        placeholder={t.contactPage.formDetailsPlaceholder}
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
                        aria-label={t.home.formSubmitAria}
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
                        <span>
                          {isSubmitting
                            ? t.contactPage.submitButtonBusy
                            : lang === 'en'
                            ? 'Send Enquiry Straight to info@marvethabi.co.za'
                            : t.contactPage.submitButtonIdle}
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR: DIRECT CONTACT & ACCREDITATIONS */}
          <aside className="detail-sidebar" aria-label={t.contactPage.sidebarAria} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* DIRECT CONTACT */}
            <div className="side-card" style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--line, #E1E8E6)' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--ink, #16211E)', margin: '0 0 14px', fontWeight: 700 }}>
                {t.contactPage.directChannelsHeading}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: '#3C4A45' }}>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand, #336659)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    {t.contactPage.emailHeading}
                  </span>
                  <a href="mailto:info@marvethabi.co.za" style={{ color: 'var(--ink, #16211E)', textDecoration: 'none', fontWeight: 600 }}>
                    info@marvethabi.co.za
                  </a>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand, #336659)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    {t.contactPage.telephoneHeading}
                  </span>
                  <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink, #16211E)' }}>
                    +27 82 412 3847 <span style={{ fontSize: '12px', fontWeight: 400, color: '#667770' }}>{t.contactPage.phone1Note}</span>
                  </p>
                  <p style={{ margin: '4px 0 0', fontWeight: 600, color: 'var(--ink, #16211E)' }}>
                    +27 72 834 7953 <span style={{ fontSize: '12px', fontWeight: 400, color: '#667770' }}>{t.contactPage.phone2Note}</span>
                  </p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand, #336659)', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>
                    {t.contactPage.hoursHeading}
                  </span>
                  <p style={{ margin: 0 }}>{t.contactPage.hoursValue}</p>
                </div>
                <div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--brand, #336659)', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    {t.contactPage.linkedInHeading}
                  </span>
                  <a
                    href="https://www.linkedin.com/company/marvethabi-consulting-engineers/?viewAsMember=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t.nav.linkedInAriaLabel}
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
                    {t.contactPage.linkedInLinkText}
                  </a>
                </div>
              </div>
            </div>

            {/* HEAD OFFICE LOCATION */}
            <div className="side-card" style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--line, #E1E8E6)' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--ink, #16211E)', margin: '0 0 10px', fontWeight: 700 }}>
                {t.contactPage.headOfficeHeading}
              </h4>
              <p style={{ fontSize: '13.5px', color: '#3C4A45', lineHeight: 1.55, margin: 0 }}>
                {t.contactPage.headOfficeAddress}
              </p>
            </div>

            {/* REGISTRATIONS & COMPLIANCE */}
            <div className="side-card" style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid var(--line, #E1E8E6)' }}>
              <h4 style={{ fontSize: '16px', color: 'var(--ink, #16211E)', margin: '0 0 12px', fontWeight: 700 }}>
                {t.contactPage.credentialsHeading}
              </h4>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#47564F' }}>
                {t.contactPage.credentials.map((cred, idx) => (
                  <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                    <span>{cred.label}</span>
                    <strong style={idx === 0 ? { color: 'var(--btn-green-dark, #436905)' } : undefined}>{cred.value}</strong>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};
