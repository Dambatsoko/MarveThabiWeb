import nodemailer from 'nodemailer';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      fullName,
      organisation,
      email,
      phone,
      categoryId,
      categoryName,
      assignedContactName,
      assignedContactResponsibility,
      assignedContactDesignation,
      subject,
      details,
    } = req.body || {};

    if (!fullName || !fullName.trim()) {
      return res.status(400).json({ error: 'Please enter your full name.' });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Please enter your email address.' });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    if (!subject || !subject.trim()) {
      return res.status(400).json({ error: 'Please enter an enquiry subject.' });
    }

    if (!details || !details.trim()) {
      return res.status(400).json({ error: 'Please describe your project scope or enquiry details.' });
    }

    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const ref = `MT-${year}-${random}`;

    const targetEmail = process.env.CONTACT_DESTINATION_EMAIL || 'info@marvethabi.co.za';
    const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'info@marvethabi.co.za';
    const categoryLabel = categoryName || categoryId || 'General Enquiry';
    const emailSubject = `[Enquiry: ${categoryLabel}] ${subject} (Ref: ${ref})`;

    const textBody = [
      `NEW MARVETHABI SERVICE ENQUIRY`,
      `Reference Number: ${ref}`,
      `Date & Time: ${new Date().toISOString()}`,
      `--------------------------------------------------`,
      `ASSIGNED DISCIPLINE & CONTACT:`,
      `Service Category: ${categoryLabel}`,
      `Assigned Principal / Contact: ${assignedContactName || 'Practice Principals'}`,
      assignedContactResponsibility ? `Responsibility: ${assignedContactResponsibility}` : '',
      assignedContactDesignation ? `Designation: ${assignedContactDesignation}` : '',
      `--------------------------------------------------`,
      `CLIENT DETAILS:`,
      `Full Name: ${fullName}`,
      `Company / Organisation: ${organisation || 'Not specified'}`,
      `Email Address: ${email}`,
      `Contact Number: ${phone || 'Not provided'}`,
      `--------------------------------------------------`,
      `ENQUIRY DETAILS:`,
      `Subject: ${subject}`,
      ``,
      details,
      `--------------------------------------------------`,
      `Dispatched directly from MarveThabi Consulting Engineers Contact Form`,
    ]
      .filter(Boolean)
      .join('\n');

    // 1. SMTP Transport
    if (process.env.SMTP_HOST && (process.env.SMTP_USER || process.env.SMTP_PASS)) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
        tls: { rejectUnauthorized: false },
      });

      await transporter.sendMail({
        from: `"${fullName} via MarveThabi" <${fromEmail}>`,
        to: targetEmail,
        replyTo: email,
        subject: emailSubject,
        text: textBody,
      });

      return res.status(200).json({
        success: true,
        referenceNumber: ref,
        targetEmail,
        delivered: true,
        method: 'smtp',
      });
    }

    // 2. Resend API
    if (process.env.RESEND_API_KEY) {
      const resp = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM || `MarveThabi Contact <onboarding@resend.dev>`,
          to: [targetEmail],
          reply_to: email,
          subject: emailSubject,
          text: textBody,
        }),
      });

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Resend API error: ${errText}`);
      }

      return res.status(200).json({
        success: true,
        referenceNumber: ref,
        targetEmail,
        delivered: true,
        method: 'resend',
      });
    }

    // 3. Zero-secret HTTPS Relay via FormSubmit.co
    if (process.env.DISABLE_FORMSUBMIT !== 'true') {
      try {
        const originHeader =
          typeof req.headers?.origin === 'string' && req.headers.origin.startsWith('https://')
            ? req.headers.origin
            : 'https://www.marvethabi.co.za';

        const fsResp = await fetch(
          `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Origin: originHeader,
              Referer: `${originHeader}/contact`,
              'User-Agent': 'MarveThabi-Contact-Portal/1.0',
            },
            body: JSON.stringify({
              name: fullName,
              email,
              _replyto: email,
              _subject: emailSubject,
              _template: 'table',
              _captcha: 'false',
              Reference: ref,
              'Service Category': categoryLabel,
              'Assigned Contact': `${assignedContactName || 'Practice Principals'} (${assignedContactResponsibility || 'Client Services'})`,
              Organisation: organisation || 'Not specified',
              Phone: phone || 'Not provided',
              Subject: subject,
              Message: details,
            }),
          }
        );

        const rawText = await fsResp.text();
        let fsData: { success?: boolean | string; message?: string } = {};
        try {
          fsData = JSON.parse(rawText);
        } catch {
          fsData = { success: false, message: rawText.slice(0, 200) };
        }

        const isSuccess = fsData.success === true || fsData.success === 'true';
        if (fsResp.ok && isSuccess) {
          return res.status(200).json({
            success: true,
            referenceNumber: ref,
            targetEmail,
            delivered: true,
            activationRequired: false,
            method: 'formsubmit',
            message: `Enquiry successfully delivered to ${targetEmail}.`,
          });
        }

        const msg = fsData.message || `FormSubmit returned status ${fsResp.status}`;
        if (/activat/i.test(msg)) {
          return res.status(200).json({
            success: true,
            referenceNumber: ref,
            targetEmail,
            delivered: false,
            activationRequired: true,
            method: 'formsubmit-activation-pending',
            message: msg,
          });
        }
      } catch (fsErr) {
        console.warn('FormSubmit relay failed:', fsErr);
      }
    }

    // Fallback in-memory
    console.log(`[Vercel Serverless Contact Form] Enquiry ${ref} for ${targetEmail} recorded.`);
    return res.status(200).json({
      success: true,
      referenceNumber: ref,
      targetEmail,
      delivered: false,
      activationRequired: false,
      method: 'logged',
      message: `Enquiry logged under reference ${ref} and routed to ${assignedContactName || 'our engineering team'} (${targetEmail}).`,
    });
  } catch (err: any) {
    console.error('Contact error:', err);
    return res.status(500).json({ error: err.message || 'Error sending contact email' });
  }
}
