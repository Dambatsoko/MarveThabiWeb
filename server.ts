import express, { type Request, type Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { generateSitemapXml, generateRobotsTxt, getPageSEO } from './src/utils/seoConfig.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const isProduction = process.env.NODE_ENV === 'production';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

interface ContactPayload {
  fullName: string;
  organisation?: string;
  email: string;
  phone?: string;
  categoryId?: string;
  categoryName?: string;
  assignedContactName?: string;
  assignedContactResponsibility?: string;
  assignedContactDesignation?: string;
  assignedEmail?: string;
  subject: string;
  details: string;
  referenceNumber?: string;
}

// In-memory enquiry store for audit/recovery
const recentEnquiries: (ContactPayload & { receivedAt: string; referenceNumber: string })[] = [];

/**
 * Generates an enquiry reference number: MT-YYYY-XXXX
 */
function generateRef(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `MT-${year}-${random}`;
}

/**
 * Dispatches email to info@marvethabi.co.za via configured transport
 */
async function sendContactMail(
  record: ContactPayload,
  ref: string,
  requestOrigin?: string
): Promise<{
  delivered: boolean;
  method: string;
  activationRequired?: boolean;
  message?: string;
}> {
  const targetEmail = process.env.CONTACT_DESTINATION_EMAIL || 'info@marvethabi.co.za';
  const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || 'info@marvethabi.co.za';
  const categoryLabel = record.categoryName || record.categoryId || 'General Enquiry';
  const emailSubject = `[Enquiry: ${categoryLabel}] ${record.subject} (Ref: ${ref})`;

  const textBody = [
    `NEW MARVETHABI SERVICE ENQUIRY`,
    `Reference Number: ${ref}`,
    `Date & Time: ${new Date().toISOString()}`,
    `--------------------------------------------------`,
    `ASSIGNED DISCIPLINE & CONTACT:`,
    `Service Category: ${categoryLabel}`,
    `Assigned Principal / Contact: ${record.assignedContactName || 'MarveThabi Practice Principals'}`,
    record.assignedContactResponsibility ? `Responsibility: ${record.assignedContactResponsibility}` : '',
    record.assignedContactDesignation ? `Designation: ${record.assignedContactDesignation}` : '',
    `--------------------------------------------------`,
    `CLIENT DETAILS:`,
    `Full Name: ${record.fullName}`,
    `Company / Organisation: ${record.organisation || 'Not specified'}`,
    `Email Address: ${record.email}`,
    `Contact Number: ${record.phone || 'Not provided'}`,
    `--------------------------------------------------`,
    `ENQUIRY DETAILS:`,
    `Subject: ${record.subject}`,
    ``,
    record.details,
    `--------------------------------------------------`,
    `Dispatched directly from MarveThabi Consulting Engineers Contact Form`,
  ]
    .filter(Boolean)
    .join('\n');

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e1e8e6; border-radius: 8px; overflow: hidden; color: #16211e;">
      <div style="background: #0B2B26; padding: 24px 28px; color: #ffffff;">
        <p style="margin: 0 0 6px; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #7FBA7A; font-weight: 700;">
          MarveThabi Consulting Engineers &bull; Contact Portal
        </p>
        <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff;">
          New Service Enquiry
        </h1>
        <p style="margin: 8px 0 0; font-size: 13px; color: #d0e0dc;">
          Reference: <strong style="color: #ffffff;">${ref}</strong>
        </p>
      </div>

      <div style="padding: 24px 28px;">
        <div style="background: #F0F7F4; border-left: 4px solid #336659; padding: 14px 18px; margin-bottom: 24px; border-radius: 4px;">
          <p style="margin: 0; font-size: 13px; color: #2B3934;">
            <strong>Assigned Discipline:</strong> ${categoryLabel}<br />
            <strong>Assigned Contact:</strong> ${record.assignedContactName || 'Practice Principals'} (${record.assignedContactResponsibility || 'Client Services'})
          </p>
        </div>

        <h3 style="font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; color: #336659; margin: 0 0 12px; border-bottom: 1px solid #e1e8e6; padding-bottom: 6px;">
          Client Information
        </h3>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; width: 140px; color: #55655F; font-weight: 600;">Full Name:</td>
            <td style="padding: 6px 0; color: #16211e; font-weight: 700;">${record.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #55655F; font-weight: 600;">Company / Org:</td>
            <td style="padding: 6px 0; color: #16211e;">${record.organisation || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #55655F; font-weight: 600;">Client Email:</td>
            <td style="padding: 6px 0; color: #16211e;"><a href="mailto:${record.email}" style="color: #336659; font-weight: 600;">${record.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #55655F; font-weight: 600;">Contact Phone:</td>
            <td style="padding: 6px 0; color: #16211e;">${record.phone || 'Not provided'}</td>
          </tr>
        </table>

        <h3 style="font-size: 15px; text-transform: uppercase; letter-spacing: 0.05em; color: #336659; margin: 0 0 12px; border-bottom: 1px solid #e1e8e6; padding-bottom: 6px;">
          Technical Scope & Details
        </h3>
        <div style="margin-bottom: 12px; font-size: 14px;">
          <strong>Subject:</strong> ${record.subject}
        </div>
        <div style="background: #F8FAF9; border: 1px solid #E1E8E6; padding: 16px; border-radius: 6px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; color: #16211e; margin-bottom: 24px;">
${record.details}
        </div>

        <p style="font-size: 12px; color: #73837D; margin: 0;">
          This message was submitted directly via the website contact form and forwarded to <strong>${targetEmail}</strong>. Replying to this email will reply directly to <strong>${record.email}</strong>.
        </p>
      </div>
    </div>
  `;

  // 1. Check for SMTP credentials
  if (process.env.SMTP_HOST && (process.env.SMTP_USER || process.env.SMTP_PASS)) {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `"${record.fullName} via MarveThabi" <${fromEmail}>`,
      to: targetEmail,
      replyTo: record.email,
      cc: process.env.SMTP_CC || undefined,
      subject: emailSubject,
      text: textBody,
      html: htmlBody,
    });

    return { delivered: true, method: 'smtp' };
  }

  // 2. Check for Resend API key
  if (process.env.RESEND_API_KEY) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || `MarveThabi Contact <onboarding@resend.dev>`,
        to: [targetEmail],
        reply_to: record.email,
        subject: emailSubject,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Resend API error: ${errText}`);
    }

    return { delivered: true, method: 'resend' };
  }

  // 3. Zero-secret HTTPS Relay via FormSubmit.co (enabled unless explicitly disabled)
  if (process.env.DISABLE_FORMSUBMIT !== 'true') {
    const safeOrigin =
      requestOrigin && requestOrigin.startsWith('https://')
        ? requestOrigin
        : 'https://www.marvethabi.co.za';

    try {
      const fsResp = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(targetEmail)}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Origin: safeOrigin,
            Referer: `${safeOrigin}/contact`,
            'User-Agent': 'MarveThabi-Contact-Portal/1.0',
          },
          body: JSON.stringify({
            name: record.fullName,
            email: record.email,
            _replyto: record.email,
            _subject: emailSubject,
            _template: 'table',
            _captcha: 'false',
            Reference: ref,
            'Service Category': categoryLabel,
            'Assigned Contact': `${record.assignedContactName || 'Practice Principals'} (${record.assignedContactResponsibility || 'Client Services'})`,
            Organisation: record.organisation || 'Not specified',
            Phone: record.phone || 'Not provided',
            Subject: record.subject,
            Message: record.details,
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
        return {
          delivered: true,
          method: 'formsubmit',
          message: `Enquiry successfully delivered to ${targetEmail}.`,
        };
      }

      const msg = fsData.message || `FormSubmit returned status ${fsResp.status}`;
      const needsActivation = /activat/i.test(msg);
      if (needsActivation) {
        console.warn(`[FormSubmit Activation Required -> ${targetEmail}]: ${msg}`);
        return {
          delivered: false,
          activationRequired: true,
          method: 'formsubmit-activation-pending',
          message: msg,
        };
      }

      console.warn(`[FormSubmit Relay Warning -> ${targetEmail} (HTTP ${fsResp.status})]: ${rawText.slice(0, 300)}`);
    } catch (fsErr: any) {
      console.warn('FormSubmit relay failed, falling back to in-memory log:', fsErr?.message || fsErr);
    }
  }

  // 4. Fallback / development: Log clearly and store in-memory registry
  console.log(`\n==================================================`);
  console.log(`[CONTACT FORM DISPATCH -> ${targetEmail}]`);
  console.log(`Reference: ${ref}`);
  console.log(`From: ${record.fullName} <${record.email}>`);
  console.log(`Company: ${record.organisation || 'N/A'}`);
  console.log(`Discipline: ${categoryLabel}`);
  console.log(`Subject: ${record.subject}`);
  console.log(`Details:\n${record.details}`);
  console.log(`--------------------------------------------------`);
  console.log(`Note: No live mail transport succeeded. Configure SMTP_*, RESEND_API_KEY, or verify FormSubmit activation for ${targetEmail}.`);
  console.log(`==================================================\n`);

  return {
    delivered: false,
    method: 'in-memory-logged',
    message: `Enquiry logged under reference ${ref} and routed to ${record.assignedContactName || 'our engineering team'} (${targetEmail}).`,
  };
}

// API Route: POST /api/contact
app.post('/api/contact', async (req: Request, res: Response) => {
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
      assignedEmail,
      subject,
      details,
    } = req.body as ContactPayload;

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

    const ref = generateRef();
    const record: ContactPayload = {
      fullName: fullName.trim(),
      organisation: organisation?.trim() || '',
      email: email.trim(),
      phone: phone?.trim() || '',
      categoryId: categoryId || 'general-enquiry',
      categoryName: categoryName || 'General Enquiry',
      assignedContactName: assignedContactName || 'MarveThabi Practice Principals',
      assignedContactResponsibility: assignedContactResponsibility || 'Client Services',
      assignedContactDesignation: assignedContactDesignation || 'Executive Directorate',
      assignedEmail: assignedEmail || 'info@marvethabi.co.za',
      subject: subject.trim(),
      details: details.trim(),
      referenceNumber: ref,
    };

    // Store in recent enquiries
    recentEnquiries.unshift({
      ...record,
      referenceNumber: ref,
      receivedAt: new Date().toISOString(),
    });
    if (recentEnquiries.length > 50) recentEnquiries.pop();

    // Send mail via configured delivery transport
    const reqOrigin =
      typeof req.headers.origin === 'string'
        ? req.headers.origin
        : req.headers.host
          ? `${req.protocol}://${req.headers.host}`
          : undefined;
    const dispatchResult = await sendContactMail(record, ref, reqOrigin);
    const targetEmail = process.env.CONTACT_DESTINATION_EMAIL || 'info@marvethabi.co.za';

    return res.status(200).json({
      success: true,
      referenceNumber: ref,
      targetEmail,
      delivered: dispatchResult.delivered,
      activationRequired: Boolean(dispatchResult.activationRequired),
      method: dispatchResult.method,
      message:
        dispatchResult.message ||
        (dispatchResult.delivered
          ? `Enquiry successfully delivered directly to ${targetEmail}.`
          : `Enquiry logged under reference ${ref} and routed to ${record.assignedContactName || 'our engineering team'} (${targetEmail}).`),
    });
  } catch (error: any) {
    console.error('Error processing contact form submission:', error);
    return res.status(500).json({
      error: 'An unexpected error occurred while dispatching your enquiry. Please try again or use direct email.',
      details: error?.message || 'Server error',
    });
  }
});

// SEO Route: GET /sitemap.xml
app.get('/sitemap.xml', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/xml');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(generateSitemapXml());
});

// SEO Route: GET /robots.txt
app.get('/robots.txt', (_req: Request, res: Response) => {
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.send(generateRobotsTxt());
});

// API Route: GET /api/health
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    targetEmail: process.env.CONTACT_DESTINATION_EMAIL || 'info@marvethabi.co.za',
    hasSmtpConfigured: Boolean(process.env.SMTP_HOST && process.env.SMTP_USER),
    hasResendConfigured: Boolean(process.env.RESEND_API_KEY),
    hasFormSubmitFallback: process.env.DISABLE_FORMSUBMIT !== 'true',
  });
});

/**
 * Injects per-route dynamic SEO metadata and Schema.org structured data into index.html
 */
function injectSEOIntoHtml(html: string, urlPath: string): string {
  const seo = getPageSEO(urlPath);
  let result = html;

  // HTML lang attribute
  result = result.replace(/<html\s+lang="[^"]*"/i, `<html lang="${seo.lang}"`);

  // Title
  result = result.replace(/<title>[\s\S]*?<\/title>/i, `<title>${seo.title}</title>`);

  // Meta Description
  result = result.replace(
    /<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="description" content="${seo.description.replace(/"/g, '&quot;')}" />`
  );

  // Canonical
  result = result.replace(
    /<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i,
    `<link rel="canonical" href="${seo.canonicalUrl}" />`
  );

  // Hreflang alternates
  result = result.replace(
    /<link\s+rel="alternate"\s+hreflang="en"\s+href="[\s\S]*?"\s*\/?>/i,
    `<link rel="alternate" hreflang="en" href="${seo.alternateUrls.en}" />`
  );
  result = result.replace(
    /<link\s+rel="alternate"\s+hreflang="fr"\s+href="[\s\S]*?"\s*\/?>/i,
    `<link rel="alternate" hreflang="fr" href="${seo.alternateUrls.fr}" />`
  );
  result = result.replace(
    /<link\s+rel="alternate"\s+hreflang="x-default"\s+href="[\s\S]*?"\s*\/?>/i,
    `<link rel="alternate" hreflang="x-default" href="${seo.alternateUrls.xDefault}" />`
  );

  // OG Locale
  result = result.replace(
    /<meta\s+property="og:locale"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:locale" content="${seo.lang === 'fr' ? 'fr_FR' : 'en_ZA'}" />`
  );

  // OG Title
  result = result.replace(
    /<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:title" content="${(seo.ogTitle || seo.title).replace(/"/g, '&quot;')}" />`
  );

  // OG Description
  result = result.replace(
    /<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:description" content="${(seo.ogDescription || seo.description).replace(/"/g, '&quot;')}" />`
  );

  // OG URL
  result = result.replace(
    /<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:url" content="${seo.canonicalUrl}" />`
  );

  // OG Type
  result = result.replace(
    /<meta\s+property="og:type"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:type" content="${seo.ogType}" />`
  );

  // OG Image
  result = result.replace(
    /<meta\s+property="og:image"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta property="og:image" content="${seo.ogImage}" />`
  );

  // Twitter Title
  result = result.replace(
    /<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="twitter:title" content="${seo.title.replace(/"/g, '&quot;')}" />`
  );

  // Twitter Description
  result = result.replace(
    /<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="twitter:description" content="${seo.description.replace(/"/g, '&quot;')}" />`
  );

  // Twitter Image
  result = result.replace(
    /<meta\s+name="twitter:image"\s+content="[\s\S]*?"\s*\/?>/i,
    `<meta name="twitter:image" content="${seo.ogImage}" />`
  );

  // JSON-LD Structured Data
  if (seo.structuredData && seo.structuredData.length > 0) {
    const jsonLdContent = JSON.stringify(
      seo.structuredData.length === 1 ? seo.structuredData[0] : seo.structuredData,
      null,
      2
    );
    result = result.replace(
      /<script\s+type="application\/ld\+json"\s+id="seo-jsonld-schema">[\s\S]*?<\/script>/i,
      `<script type="application/ld+json" id="seo-jsonld-schema">\n${jsonLdContent}\n  </script>`
    );
  }

  return result;
}

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, host: '0.0.0.0', port: PORT, hmr: false, ws: false },
      appType: 'spa',
    });

    // Intercept HTML/page requests in dev to inject dynamic per-page SEO (including /fr/... routes)
    app.use(async (req: Request, res: Response, next) => {
      const accept = req.headers.accept || '';
      const acceptsHtml = !accept || accept.includes('text/html') || accept.includes('*/*');
      if (
        req.method === 'GET' &&
        acceptsHtml &&
        !req.path.startsWith('/api') &&
        !req.path.startsWith('/src') &&
        !req.path.startsWith('/@') &&
        !req.path.startsWith('/assets') &&
        !req.path.startsWith('/node_modules') &&
        !req.path.includes('.')
      ) {
        try {
          let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
          template = await vite.transformIndexHtml(req.originalUrl, template);
          const customHtml = injectSEOIntoHtml(template, req.path);
          return res.status(200).set({ 'Content-Type': 'text/html' }).end(customHtml);
        } catch (e) {
          vite.ssrFixStacktrace(e as Error);
          next(e);
          return;
        }
      }
      next();
    });

    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist'), { index: false }));
    app.get('*', (req: Request, res: Response) => {
      try {
        const indexPath = path.resolve(__dirname, 'dist/index.html');
        if (fs.existsSync(indexPath)) {
          const raw = fs.readFileSync(indexPath, 'utf-8');
          const customHtml = injectSEOIntoHtml(raw, req.path);
          return res.status(200).set({ 'Content-Type': 'text/html' }).end(customHtml);
        }
      } catch (err) {
        console.error('Error serving index.html:', err);
      }
      res.sendFile(path.resolve(__dirname, 'dist/index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT} (${isProduction ? 'production' : 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
