const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

async function createProfilePdf() {
  const pdfDoc = await PDFDocument.create();

  // Color Palette
  const darkGreen = rgb(0.20, 0.40, 0.35); // #336659
  const accentGreen = rgb(0.37, 0.62, 0.55); // #5E9E8B
  const slateInk = rgb(0.06, 0.11, 0.09); // #0F1B18
  const lightGrey = rgb(0.95, 0.96, 0.95);
  const textDark = rgb(0.17, 0.23, 0.20);
  const mutedText = rgb(0.35, 0.42, 0.39);
  const white = rgb(1, 1, 1);
  const borderLine = rgb(0.85, 0.88, 0.86);

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // ---------------- PAGE 1: COVER & EXECUTIVE SUMMARY ----------------
  const page1 = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width: p1W, height: p1H } = page1.getSize();

  // Header Banner
  page1.drawRectangle({
    x: 0,
    y: p1H - 180,
    width: p1W,
    height: 180,
    color: slateInk,
  });

  // Top accent bar
  page1.drawRectangle({
    x: 0,
    y: p1H - 8,
    width: p1W,
    height: 8,
    color: darkGreen,
  });

  page1.drawText('MARVETHABI CONSULTING ENGINEERS', {
    x: 48,
    y: p1H - 58,
    size: 22,
    font: fontBold,
    color: white,
  });

  page1.drawText('Technical Excellence. National Infrastructure. Government Confidence.', {
    x: 48,
    y: p1H - 82,
    size: 11,
    font: fontRegular,
    color: accentGreen,
  });

  page1.drawText('CORPORATE PRACTICE PROFILE & CAPABILITY STATEMENT', {
    x: 48,
    y: p1H - 120,
    size: 13,
    font: fontBold,
    color: white,
  });

  page1.drawText('Document Ref: MT-PR-2026-V1  |  Level 1 B-BBEE (135% Recognition)  |  100% Black-Owned', {
    x: 48,
    y: p1H - 144,
    size: 9.5,
    font: fontRegular,
    color: rgb(0.8, 0.85, 0.82),
  });

  // Body content Page 1
  let y = p1H - 220;

  // Overview
  page1.drawText('1. EXECUTIVE SUMMARY & COMPANY BACKGROUND', {
    x: 48,
    y: y,
    size: 13,
    font: fontBold,
    color: darkGreen,
  });
  y -= 22;

  const summaryParas = [
    'MarveThabi Consulting Engineers (Pty) Ltd is a multidisciplinary South African engineering consultancy delivering',
    'specialist Reliability Engineering, Asset Management, Electrical Engineering, and Geo-Environmental solutions across',
    'the public, municipal, mining, energy, and heavy industrial sectors.',
    '',
    'As a verified Level 1 B-BBEE contributor with 100% black ownership, the firm unites technical rigor with genuine economic',
    'transformation. With over 13 years of operational track record and more than 100 successfully completed infrastructure projects,',
    'MarveThabi provides public entities and industrial leaders with standards-compliant, audit-ready engineering execution.',
  ];

  summaryParas.forEach((line) => {
    if (line === '') {
      y -= 8;
    } else {
      page1.drawText(line, {
        x: 48,
        y: y,
        size: 9.5,
        font: fontRegular,
        color: textDark,
      });
      y -= 14;
    }
  });

  y -= 16;

  // Accreditations & Key Practice Metrics Box
  page1.drawRectangle({
    x: 48,
    y: y - 85,
    width: p1W - 96,
    height: 95,
    color: lightGrey,
    borderColor: borderLine,
    borderWidth: 1,
  });

  page1.drawText('PRACTICE STANDING & STATUTORY REGISTRATIONS', {
    x: 64,
    y: y - 18,
    size: 10,
    font: fontBold,
    color: darkGreen,
  });

  const credentials = [
    '- Engineering Council of South Africa (ECSA): Corporate Directed Registration',
    '- South African Council for Natural Scientific Professions (SACNASP): Certified Pr.Sci.Nat Practice',
    '- Broad-Based Black Economic Empowerment: Level 1 Contributor (135% Procurement Recognition)',
    '- Central Supplier Database (CSD): Active Government Supplier (MAAA0086884)',
    '- Asset Standards Alignment: ISO 55000 / PAS 55 / SANS 10142 Electrical Safety',
  ];

  let credY = y - 36;
  credentials.forEach((c) => {
    page1.drawText(c, {
      x: 64,
      y: credY,
      size: 9,
      font: fontRegular,
      color: textDark,
    });
    credY -= 14;
  });

  y -= 115;

  // Core Disciplines Section
  page1.drawText('2. CORE ENGINEERING & ENVIRONMENTAL DISCIPLINES', {
    x: 48,
    y: y,
    size: 13,
    font: fontBold,
    color: darkGreen,
  });
  y -= 24;

  const disciplines = [
    {
      code: 'RE-01',
      title: 'Reliability Engineering & Condition Monitoring',
      desc: 'Vibration analysis, thermal imaging baseline profiling, oil tribology & DGA, Root Cause Failure Analysis (RCFA), FMECA modeling, and predictive maintenance programs across heavy mining and manufacturing assets.',
    },
    {
      code: 'AM-02',
      title: 'Asset Management & ISO 55000 Systems',
      desc: 'Strategic Asset Management Plans (SAMP), GRAP 17 municipal asset registers, barcoding & RFID physical asset verifications, digital twin data architectures, and lifecycle replacement forecasting.',
    },
    {
      code: 'EE-03',
      title: 'Electrical Engineering & Power Systems',
      desc: 'HV/MV/LV substation design, 132kV/88kV transmission & 11kV reticulation, transformer commissioning, relay protection schemes, backup diesel generators, ATS synchronization, and solar PV integration.',
    },
    {
      code: 'GE-04',
      title: 'Geo-Environmental Management & Hydrology',
      desc: 'Environmental Impact Assessments (EIA), Water Use License Applications (WULA/DWS), hydrogeological borehole drilling & aquifer pump testing, mine rehabilitation, waste licensing, and environmental audits.',
    },
  ];

  disciplines.forEach((d) => {
    // Card background
    page1.drawRectangle({
      x: 48,
      y: y - 56,
      width: p1W - 96,
      height: 60,
      color: white,
      borderColor: borderLine,
      borderWidth: 1,
    });

    page1.drawRectangle({
      x: 48,
      y: y - 56,
      width: 4,
      height: 60,
      color: darkGreen,
    });

    page1.drawText(`${d.code} · ${d.title}`, {
      x: 64,
      y: y - 16,
      size: 10.5,
      font: fontBold,
      color: darkGreen,
    });

    page1.drawText(d.desc, {
      x: 64,
      y: y - 34,
      size: 8.5,
      font: fontRegular,
      color: textDark,
      maxWidth: p1W - 140,
      lineHeight: 12,
    });

    y -= 68;
  });

  // Footer Page 1
  page1.drawLine({
    start: { x: 48, y: 36 },
    end: { x: p1W - 48, y: 36 },
    thickness: 0.5,
    color: borderLine,
  });

  page1.drawText('MarveThabi Consulting Engineers (Pty) Ltd | www.marvethabi.co.za | Page 1 of 2', {
    x: 48,
    y: 24,
    size: 8,
    font: fontRegular,
    color: mutedText,
  });

  // ---------------- PAGE 2: LEADERSHIP, CLIENTS & CONTACT ----------------
  const page2 = pdfDoc.addPage([595.28, 841.89]);
  const { width: p2W, height: p2H } = page2.getSize();

  // Top header bar
  page2.drawRectangle({
    x: 0,
    y: p2H - 50,
    width: p2W,
    height: 50,
    color: darkGreen,
  });

  page2.drawText('MARVETHABI CONSULTING ENGINEERS — PRACTICE PROFILE', {
    x: 48,
    y: p2H - 32,
    size: 12,
    font: fontBold,
    color: white,
  });

  let y2 = p2H - 80;

  // Section 3: Leadership & Technical Direction
  page2.drawText('3. PRACTICE DIRECTORS & TECHNICAL LEADERSHIP', {
    x: 48,
    y: y2,
    size: 13,
    font: fontBold,
    color: darkGreen,
  });
  y2 -= 20;

  const leaders = [
    {
      name: 'Marvelous Ngoatle',
      title: 'Managing Director · Principal Engineering Technologist',
      reg: 'Pr.Tech.Eng (ECSA) | B.Tech Electrical Engineering | Cert. Reliability Engineer',
      bio: 'Over 13 years of engineering practice specializing in Reliability Engineering, HV/MV electrical distribution, substation commissioning, condition monitoring programmes, and ISO 55000 asset management roadmaps across mining, energy, and municipal sectors.',
    },
    {
      name: 'Thabang Ngoatle',
      title: 'Director · Head of Environmental & Water Resource Management',
      reg: 'Pr.Sci.Nat (SACNASP) | B.Sc Honours Environmental Science & Hydrology',
      bio: 'Leading environmental scientist with extensive experience guiding EIA authorisations, Section 21 Water Use Licensing (WULA), mine closure planning, groundwater reserve testing, and statutory compliance monitoring for industrial developments.',
    },
  ];

  leaders.forEach((ldr) => {
    page2.drawRectangle({
      x: 48,
      y: y2 - 70,
      width: p2W - 96,
      height: 74,
      color: lightGrey,
      borderColor: borderLine,
      borderWidth: 1,
    });

    page2.drawText(ldr.name, {
      x: 64,
      y: y2 - 16,
      size: 11,
      font: fontBold,
      color: slateInk,
    });

    page2.drawText(ldr.title, {
      x: 64,
      y: y2 - 30,
      size: 9.5,
      font: fontBold,
      color: darkGreen,
    });

    page2.drawText(ldr.reg, {
      x: 64,
      y: y2 - 44,
      size: 8.5,
      font: fontItalic,
      color: accentGreen,
    });

    page2.drawText(ldr.bio, {
      x: 64,
      y: y2 - 58,
      size: 8,
      font: fontRegular,
      color: textDark,
      maxWidth: p2W - 130,
      lineHeight: 11,
    });

    y2 -= 86;
  });

  y2 -= 10;

  // Section 4: Key Clients & Infrastructure Engagements
  page2.drawText('4. REPRESENTATIVE CLIENTS & CRITICAL INFRASTRUCTURE PARTNERS', {
    x: 48,
    y: y2,
    size: 13,
    font: fontBold,
    color: darkGreen,
  });
  y2 -= 20;

  const clientLines = [
    'MarveThabi has delivered high-stakes engineering projects across South Africa and the wider region for leaders including:',
    '',
    '* Glencore Operations South Africa           * City of Ekurhuleni Metropolitan Municipality',
    '* Anglo American Mining Infrastructure        * Umgeni-uThukela Water Board',
    '* Harmony Gold Mining Company                 * Thungela Resources',
    '* Valterra Industrial & Energy Partners       * Municipal Distributary Networks across Gauteng & Limpopo',
  ];

  clientLines.forEach((cl) => {
    if (cl === '') {
      y2 -= 4;
    } else {
      page2.drawText(cl, {
        x: 48,
        y: y2,
        size: 9.5,
        font: cl.startsWith('*') ? fontBold : fontRegular,
        color: cl.startsWith('*') ? darkGreen : textDark,
      });
      y2 -= 14;
    }
  });

  y2 -= 18;

  // Section 5: Standard Operating Procedure & Stage-Gate Quality Assurance
  page2.drawText('5. PROJECT DELIVERY LIFECYCLE (STAGE-GATE METHODOLOGY)', {
    x: 48,
    y: y2,
    size: 13,
    font: fontBold,
    color: darkGreen,
  });
  y2 -= 20;

  const phases = [
    'Phase 01: Consultation & Terms of Reference Scoping (Statutory Matrix Mapping)',
    'Phase 02: Empirical Investigation & Baseline Diagnostics (GPR, Oil, Power Quality)',
    'Phase 03: Engineering Design & Certified CAD Drafting (AutoCAD, BIM, Relay Modeling)',
    'Phase 04: Implementation & Resident Engineering Supervision (FAT/SAT & Build Audits)',
    'Phase 05: Quality Assurance, Pre-Commissioning & Statutory Sign-off (Electrical COCs)',
    'Phase 06: Long-Term Predictive Asset Support & Telemetry Monitoring (ISO 55000 Cycles)',
  ];

  phases.forEach((p) => {
    page2.drawText(`>  ${p}`, {
      x: 48,
      y: y2,
      size: 8.5,
      font: fontRegular,
      color: textDark,
    });
    y2 -= 13;
  });

  y2 -= 18;

  // Section 6: Contact & Practice Inquiries Box
  page2.drawRectangle({
    x: 48,
    y: y2 - 100,
    width: p2W - 96,
    height: 104,
    color: slateInk,
  });

  page2.drawText('START AN INFRASTRUCTURE PROJECT — CONTACT OUR PRINCIPALS', {
    x: 64,
    y: y2 - 20,
    size: 10.5,
    font: fontBold,
    color: white,
  });

  page2.drawText('Head Office: Unit 68 Saliehout Street, Stenostelma, Annlin, Pretoria 0182, Gauteng, South Africa', {
    x: 64,
    y: y2 - 40,
    size: 9,
    font: fontRegular,
    color: rgb(0.85, 0.9, 0.88),
  });

  page2.drawText('Principal Tel: +27 82 412 3847  |  Alternate: +27 72 834 7953', {
    x: 64,
    y: y2 - 58,
    size: 9,
    font: fontBold,
    color: accentGreen,
  });

  page2.drawText('General Inquiries: info@marvethabi.co.za  |  Practice Web: www.marvethabi.co.za', {
    x: 64,
    y: y2 - 76,
    size: 9,
    font: fontRegular,
    color: white,
  });

  page2.drawText('Statutory Certifications: ECSA · SACNASP · CIDB · CSD · Level 1 B-BBEE Verified', {
    x: 64,
    y: y2 - 92,
    size: 8.5,
    font: fontItalic,
    color: rgb(0.7, 0.8, 0.75),
  });

  // Footer Page 2
  page2.drawLine({
    start: { x: 48, y: 36 },
    end: { x: p2W - 48, y: 36 },
    thickness: 0.5,
    color: borderLine,
  });

  page2.drawText('MarveThabi Consulting Engineers (Pty) Ltd | Document Reference: MarveThabiProfile.pdf | Page 2 of 2', {
    x: 48,
    y: 24,
    size: 8,
    font: fontRegular,
    color: mutedText,
  });

  const pdfBytes = await pdfDoc.save();

  // Save to public root and public/assets
  const publicPath = path.join(__dirname, '../public/MarveThabiProfile.pdf');
  const publicAssetsPath = path.join(__dirname, '../public/assets/MarveThabiProfile.pdf');

  fs.writeFileSync(publicPath, pdfBytes);
  fs.writeFileSync(publicAssetsPath, pdfBytes);

  console.log(`Generated MarveThabiProfile.pdf (${pdfBytes.length} bytes) successfully!`);
}

createProfilePdf().catch(console.error);
