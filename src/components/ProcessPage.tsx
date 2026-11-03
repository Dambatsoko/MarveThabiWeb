import React, { useEffect } from 'react';

interface ProcessPageProps {
  onNavigate: (path: string) => void;
}

export const ProcessPage: React.FC<ProcessPageProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const processDeepDives = [
    {
      number: '01',
      title: 'Consultation & Scoping',
      overview: 'Defining the technical requirement with the client, asset owners, and statutory stakeholders.',
      tasks: [
        'Stakeholder alignment & statutory matrix mapping',
        'Initial site inspection & hazard identification',
        'Terms of Reference (ToR) and project charter definition',
        'Statutory permitting pathway identification (NEMA / ECSA / DWS)',
      ],
      deliverables: 'Project Scoping Dossier, Risk Log, Preliminary Feasibility Memo',
    },
    {
      number: '02',
      title: 'Investigation & Baseline Diagnostics',
      overview: 'Conducting empirical field investigations, non-destructive testing, and technical baseline studies.',
      tasks: [
        'Geophysical resistivity, GPR, and geological sampling',
        'Load flow studies, power quality recordings & harmonic analysis to NRS 048',
        'Vibration spectral baseline capture and oil tribology sampling',
        'Physical asset condition grading and barcode/RFID logging',
      ],
      deliverables: 'Empirical Baseline Report, Laboratory Test Certificates, Diagnostic Datasets',
    },
    {
      number: '03',
      title: 'Engineering Design & Calculations',
      overview: 'Detailed CAD drafting, numerical simulations, and standards-compliant engineering blueprints.',
      tasks: [
        'AutoCAD / BIM single-line diagrams, reticulation layouts, and civil interfaces',
        'Fault-level calculations, voltage drop modeling, and relay protection curves',
        'Strategic Asset Management Plan (SAMP) and FMECA failure modeling',
        'Environmental Management Programmes (EMPr) and water balance models',
      ],
      deliverables: 'Certified CAD Blueprints, Bill of Quantities (BOQ), Technical Specifications',
    },
    {
      number: '04',
      title: 'Implementation & Construction Supervision',
      overview: 'On-site engineering oversight, contractor management, and rigorous build quality control.',
      tasks: [
        'Resident engineering supervision and daily site diaries',
        'Contractor quality assurance and factory acceptance testing (FAT)',
        'Environmental Control Officer (ECO) audits and biomonitoring during build',
        'Cable laying, substation assembly, and telemetry sensor deployment',
      ],
      deliverables: 'Site Inspection Logs, Non-Conformance Reports (NCRs), Monthly Progress Dossiers',
    },
    {
      number: '05',
      title: 'Quality Assurance & Statutory Commissioning',
      overview: 'Comprehensive pre-commissioning testing, energization, and statutory certification.',
      tasks: [
        'Relay tripping test validation and insulation resistance pressure testing',
        'Pumping tests, groundwater yield certification, and water quality sign-off',
        'Statutory Electrical Certificate of Compliance (COC) issuance',
        'Regulatory final filings to DWS, DFFE, and municipal authorities',
      ],
      deliverables: 'As-Built CAD Blueprints, Commissioning Certificates, Statutory COCs',
    },
    {
      number: '06',
      title: 'Long-Term Support & Asset Optimization',
      overview: 'Condition-based monitoring, predictive maintenance tactics, and digital twin stewardship.',
      tasks: [
        'Continuous vibration telemetry and oil analysis review cycles',
        'Asset digital twin maintenance and annual GRAP 17 register updates',
        'Annual environmental compliance audits and NAEIS air quality reporting',
        'Strategic lifecycle reviews and Capex replacement forecasting',
      ],
      deliverables: 'Annual Asset Health Scorecards, Predictive Maintenance Schedules, Audit Clearance',
    },
  ];

  return (
    <main className="proc-page detail-page">
      {/* ============ PAGE HERO ============ */}
      <section className="svc-hero">
        <div className="svc-hero-grid-bg" aria-hidden="true"></div>
        <div className="wrap">
          <h1 className="svc-hero-title">Project Delivery Lifecycle</h1>
          <p className="lead svc-hero-sub">
            A disciplined, traceable path from initial consultation and site diagnostics to
            detailed CAD engineering, construction oversight, and long-term asset optimization.
          </p>
          <div className="svc-hero-tags proc-hero-tags">
            <span className="svc-hero-tag proc-hero-tag"><span className="tag-dot"></span>Stage-Gate Quality Assurance</span>
            <span className="svc-hero-tag proc-hero-tag"><span className="tag-dot"></span>SANS &amp; ISO 55000 Alignment</span>
            <span className="svc-hero-tag proc-hero-tag"><span className="tag-dot"></span>Statutory Professional Oversight</span>
            <span className="svc-hero-tag proc-hero-tag"><span className="tag-dot"></span>Commissioning &amp; Handover</span>
          </div>
        </div>
      </section>

      {/* ============ PROCESS DEEP DIVE ============ */}
      <section className="detail-body-section">
        <div className="wrap">
          <div className="sec-head proc-sec-head">
            <h2>End-to-End Delivery Architecture</h2>
            <p>Every engineering and environmental engagement follows this structured, accountable workflow.</p>
          </div>

          <div className="proc-list">
            {processDeepDives.map((step) => (
              <div key={step.number} className="proc-card">
                <div className="proc-card-num">
                  <span className="num">
                    {step.number}
                  </span>
                  <span className="label">
                    PHASE {step.number}
                  </span>
                </div>

                <div className="proc-card-content">
                  <h3>
                    {step.title}
                  </h3>
                  <p>
                    {step.overview}
                  </p>

                  <span className="proc-card-act-title">
                    Core Engineering and Environmental Activities
                  </span>
                  <ul className="proc-card-tasks">
                    {step.tasks.map((task, i) => (
                      <li key={i} className="proc-card-task">
                        <span className="proc-card-task-bullet">&rsaquo;</span>
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="proc-card-deliv">
                  <span className="proc-card-deliv-title">
                    Deliverable Artifact
                  </span>
                  <p className="proc-card-deliv-text">
                    {step.deliverables}
                  </p>
                  <div className="proc-card-deliv-qual">
                    <span className="proc-card-deliv-dot"></span>
                    <span>Quality Verified &amp; Sign-off Ready</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="svc-cta">
        <div className="wrap svc-cta-inner">
          <div>
            <h2>Initiate Phase 01 for Your Project</h2>
            <p className="svc-cta-sub">
              Reach out to our principal engineers to schedule an exploratory technical consultation.
            </p>
          </div>
          <a
            href="/contact"
            className="btn btn-brand"
            aria-label="Request a consultation to initiate Phase 01 for your project"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/contact');
            }}
          >
            Request Consultation
          </a>
        </div>
      </section>
    </main>
  );
};
