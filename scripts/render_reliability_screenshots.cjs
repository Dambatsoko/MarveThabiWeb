const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function renderReliabilityScreenshots() {
  const imgRel = fs.readFileSync('public/assets/images/reliability-monitoring.png').toString('base64');

  // 1. SERVICE CARD SCREENSHOT (1180px wide)
  const cardSvg = `
  <svg width="1200" height="420" viewBox="0 0 1200 420" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="420" fill="#fcfdfd"/>
    <defs>
      <filter id="cShadow" x="-2%" y="-1%" width="104%" height="106%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.06"/>
      </filter>
      <clipPath id="cardImgClip"><rect width="360" height="270" rx="6"/></clipPath>
    </defs>

    <!-- Context header snippet -->
    <g transform="translate(40, 25)">
      <rect x="0" y="0" width="36" height="36" rx="4" fill="#1c2e28"/>
      <text x="18" y="24" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="16" fill="#a3e635" text-anchor="middle">01</text>
      <text x="48" y="25" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="22" fill="#0e1e1a">Engineering Services</text>
    </g>

    <!-- Card -->
    <g transform="translate(40, 80)" filter="url(#cShadow)">
      <rect width="1120" height="310" rx="8" fill="#ffffff" stroke="#e4eae7" stroke-width="1.2"/>
      
      <!-- Media -->
      <g transform="translate(20, 20)">
        <image href="data:image/png;base64,${imgRel}" width="360" height="270" preserveAspectRatio="xMidYMid slice" clip-path="url(#cardImgClip)"/>
      </g>

      <!-- Content -->
      <g transform="translate(405, 24)">
        <!-- Icon & Head -->
        <rect x="0" y="0" width="34" height="34" rx="4" fill="#ecfdf5"/>
        <text x="17" y="23" font-family="DejaVu Sans, Arial, sans-serif" font-size="17" fill="#059669" text-anchor="middle">〰</text>
        <text x="46" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="21" fill="#0e1e1a">Reliability Engineering &amp; Monitoring</text>
        <text x="46" y="38" font-family="DejaVu Sans, Arial, sans-serif" font-weight="500" font-size="13" fill="#55655F">Condition-based programmes that find failure before failure finds the plant.</text>

        <!-- 5 items -->
        <g transform="translate(6, 62)">
          <circle cx="4" cy="0" r="3" fill="#5e9e8b"/>
          <text x="16" y="4" font-family="DejaVu Sans, Arial, sans-serif" font-size="12.5" font-weight="600" fill="#1e293b">1. Reliability-Centred Maintenance (RCM) facilitation and implementation.</text>

          <circle cx="4" cy="26" r="3" fill="#5e9e8b"/>
          <text x="16" y="30" font-family="DejaVu Sans, Arial, sans-serif" font-size="12.5" fill="#334155">2. Asset Criticality Analysis to prioritise assets based on risk, safety, cost, and production impact.</text>

          <circle cx="4" cy="52" r="3" fill="#5e9e8b"/>
          <text x="16" y="56" font-family="DejaVu Sans, Arial, sans-serif" font-size="12.5" fill="#334155">3. Failure Modes and Effects Analysis (FMEA) for proactive identification and mitigation of failure risks.</text>

          <circle cx="4" cy="78" r="3" fill="#5e9e8b"/>
          <text x="16" y="82" font-family="DejaVu Sans, Arial, sans-serif" font-size="12.5" fill="#334155">4. Maintenance Strategy and Asset Tactics Development aligned to operational objectives and business value.</text>

          <circle cx="4" cy="104" r="3" fill="#5e9e8b"/>
          <text x="16" y="108" font-family="DejaVu Sans, Arial, sans-serif" font-size="12.5" fill="#334155">5. Root Cause Failure Analysis (RCFA) to identify, analyse, and eliminate recurring and high-impact failures.</text>
        </g>

        <!-- Button -->
        <g transform="translate(6, 218)">
          <rect width="112" height="32" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
          <text x="16" y="21" font-family="DejaVu Sans, Arial, sans-serif" font-size="12.5" font-weight="700" fill="#1c2e28">Read More →</text>
        </g>
      </g>
    </g>
  </svg>
  `;

  const cardPng = await sharp(Buffer.from(cardSvg)).png().toBuffer();
  fs.writeFileSync('public/reliability_card_updated.png', cardPng);
  fs.writeFileSync('/.aistudio/artifacts/brain/94e07829-b32b-476f-9c29-aee6d6d48405/reliability_card_updated.png', cardPng);
  console.log('✓ Rendered reliability_card_updated.png');

  // 2. DEDICATED DETAIL PAGE SCREENSHOT (1200px wide x 1150px high)
  const detailSvg = `
  <svg width="1200" height="1160" viewBox="0 0 1200 1160" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="1160" fill="#ffffff"/>
    <defs>
      <clipPath id="detailImgClip"><rect width="720" height="240" rx="8"/></clipPath>
    </defs>

    <!-- Top Nav Bar -->
    <rect width="1200" height="70" fill="#ffffff" stroke="#e8ecea" stroke-width="1"/>
    <text x="60" y="42" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="19" fill="#0e1e1a">MarveThabi <tspan fill="#5e9e8b">Consulting Engineers</tspan></text>
    <text x="620" y="42" font-family="DejaVu Sans, Arial, sans-serif" font-weight="600" font-size="13.5" fill="#55655F">Home</text>
    <text x="700" y="42" font-family="DejaVu Sans, Arial, sans-serif" font-weight="600" font-size="13.5" fill="#55655F">About Us</text>
    <text x="800" y="42" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="13.5" fill="#2d5a4c">Our Services</text>
    <rect x="800" y="52" width="86" height="2.5" fill="#5e9e8b"/>
    <text x="920" y="42" font-family="DejaVu Sans, Arial, sans-serif" font-weight="600" font-size="13.5" fill="#55655F">Our Team</text>
    <text x="1010" y="42" font-family="DejaVu Sans, Arial, sans-serif" font-weight="600" font-size="13.5" fill="#55655F">Contact Us</text>

    <!-- HERO HEADER -->
    <rect x="0" y="70" width="1200" height="180" fill="#1c2e28"/>
    <g transform="translate(60, 115)">
      <text x="0" y="24" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="32" fill="#ffffff">Reliability Engineering &amp; Monitoring</text>
      <text x="0" y="52" font-family="DejaVu Sans, Arial, sans-serif" font-weight="600" font-size="16" fill="#a3e635">Asset Reliability, Availability and Maintainability Methodologies</text>
      <text x="0" y="78" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#cbd5e1">MarveThabi improves asset reliability, availability and maintainability through structured, data-driven methodologies.</text>
      <rect x="0" y="98" width="180" height="24" rx="12" fill="rgba(255,255,255,0.1)"/>
      <text x="14" y="114" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" font-weight="600" fill="#a3e635">● Engineering Services</text>
      <rect x="190" y="98" width="195" height="24" rx="12" fill="rgba(255,255,255,0.1)"/>
      <text x="204" y="114" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" font-weight="600" fill="#ffffff">● ISO 55000 / ECSA Compliant</text>
    </g>

    <!-- MAIN BODY GRID (Left: Prose 720px, Right: Sidebar 340px) -->
    <g transform="translate(60, 280)">
      <!-- Left Column -->
      <g>
        <!-- Hero photo -->
        <image href="data:image/png;base64,${imgRel}" width="720" height="220" preserveAspectRatio="xMidYMid slice" clip-path="url(#detailImgClip)"/>

        <!-- Objective -->
        <g transform="translate(0, 255)">
          <text x="0" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="19" fill="#0e1e1a">Engineering Objective &amp; Scope</text>
          <text x="0" y="44" font-family="DejaVu Sans, Arial, sans-serif" font-size="14" fill="#475569" width="720">To reduce unplanned downtime, optimize maintenance interventions, manage operational risk and extend asset life across the physical asset lifecycle.</text>
        </g>

        <!-- Core Capabilities -->
        <g transform="translate(0, 335)">
          <text x="0" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="19" fill="#0e1e1a">Core Capabilities</text>

          <!-- Group Box -->
          <rect x="0" y="35" width="720" height="250" rx="4" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
          <rect x="0" y="35" width="4" height="250" fill="#65a30d"/>
          
          <g transform="translate(24, 60)">
            <text x="0" y="10" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="15" fill="#0e1e1a">Reliability Methodologies &amp; Analysis</text>

            <!-- 5 Items -->
            <g transform="translate(0, 30)">
              <text x="0" y="0" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="14" fill="#65a30d">›</text>
              <text x="16" y="0" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" font-weight="600" fill="#1e293b">1. Reliability-Centred Maintenance (RCM) facilitation and implementation.</text>

              <text x="0" y="28" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="14" fill="#65a30d">›</text>
              <text x="16" y="28" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" fill="#334155">2. Asset Criticality Analysis to prioritise assets based on risk, safety, cost, and production impact.</text>

              <text x="0" y="56" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="14" fill="#65a30d">›</text>
              <text x="16" y="56" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" fill="#334155">3. Failure Modes and Effects Analysis (FMEA) for proactive identification and mitigation of failure risks.</text>

              <text x="0" y="84" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="14" fill="#65a30d">›</text>
              <text x="16" y="84" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" fill="#334155">4. Maintenance Strategy and Asset Tactics Development aligned to operational objectives and business value.</text>

              <text x="0" y="112" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="14" fill="#65a30d">›</text>
              <text x="16" y="112" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" fill="#334155">5. Root Cause Failure Analysis (RCFA) to identify, analyse, and eliminate recurring and high-impact failures.</text>
            </g>
          </g>

          <!-- CLOSING STATEMENT CALLOUT -->
          <g transform="translate(0, 305)">
            <rect width="720" height="54" rx="4" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>
            <rect width="4" height="54" fill="#5e9e8b"/>
            <text x="24" y="32" font-family="DejaVu Sans, Arial, sans-serif" font-style="italic" font-weight="600" font-size="13.5" fill="#14532d">
              &quot;Our approach ensures maintenance activities are technically sound, risk-based, and aligned with operational and business performance goals.&quot;
            </text>
          </g>
        </g>

        <!-- Technical Approach -->
        <g transform="translate(0, 715)">
          <text x="0" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="19" fill="#0e1e1a">Technical Approach &amp; Delivery</text>
          <text x="0" y="44" font-family="DejaVu Sans, Arial, sans-serif" font-size="14" fill="#475569">Our approach ensures maintenance activities are technically sound, risk-based, and aligned with operational and business performance goals.</text>
        </g>

        <!-- Outcome Statement -->
        <g transform="translate(0, 785)">
          <text x="0" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="19" fill="#0e1e1a">Outcome &amp; Operational Value</text>
          <rect x="0" y="32" width="720" height="44" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
          <rect x="0" y="32" width="4" height="44" fill="#5e9e8b"/>
          <text x="20" y="58" font-family="DejaVu Sans, Arial, sans-serif" font-size="13" font-weight="600" fill="#0e1e1a">Lower maintenance costs, eliminated chronic failures, improved asset availability, and data-driven decision making.</text>
        </g>
      </g>

      <!-- Right Column: Sidebar (340px) -->
      <g transform="translate(760, 0)">
        <!-- Standards Card -->
        <rect width="320" height="150" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
        <text x="20" y="32" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="14" fill="#0e1e1a">Governing Standards</text>
        <g transform="translate(20, 50)">
          <rect x="0" y="0" width="130" height="26" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
          <text x="12" y="17" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">ISO 55000 / 55001</text>
          <rect x="140" y="0" width="120" height="26" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
          <text x="152" y="17" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">ISO 14224 Data</text>
          <rect x="0" y="36" width="130" height="26" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
          <text x="12" y="53" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">SAE JA1011 (RCM)</text>
          <rect x="140" y="36" width="120" height="26" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
          <text x="152" y="53" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">ECSA Standards</text>
        </g>

        <!-- Sectors Card -->
        <g transform="translate(0, 170)">
          <rect width="320" height="150" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
          <text x="20" y="32" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="14" fill="#0e1e1a">Applicable Sectors</text>
          <g transform="translate(20, 50)">
            <rect x="0" y="0" width="190" height="24" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
            <text x="10" y="16" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Mining &amp; Mineral Processing</text>
            <rect x="0" y="32" width="170" height="24" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
            <text x="10" y="48" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Petrochemical &amp; Refining</text>
            <rect x="0" y="64" width="180" height="24" rx="4" fill="#ffffff" stroke="#cbd5e1" stroke-width="1"/>
            <text x="10" y="80" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Power Generation &amp; Utilities</text>
          </g>
        </g>

        <!-- Related Services -->
        <g transform="translate(0, 340)">
          <rect width="320" height="200" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
          <text x="20" y="32" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="14" fill="#0e1e1a">Related Service Lines</text>
          <g transform="translate(20, 48)">
            <rect x="0" y="0" width="280" height="34" rx="4" fill="#eff6ff" stroke="#93c5fd" stroke-width="1"/>
            <text x="12" y="21" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="700" fill="#1e3a8a">Reliability Engineering &amp; Monitoring (RE-01)</text>

            <rect x="0" y="42" width="280" height="34" rx="4" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
            <text x="12" y="63" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" fill="#475569">Asset Management Services (AM-02)</text>

            <rect x="0" y="84" width="280" height="34" rx="4" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
            <text x="12" y="105" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" fill="#475569">Condition Monitoring (CM-01)</text>
          </g>
        </g>
      </g>
    </g>
  </svg>
  `;

  const detailPng = await sharp(Buffer.from(detailSvg)).png().toBuffer();
  fs.writeFileSync('public/reliability_dedicated_page_updated.png', detailPng);
  fs.writeFileSync('/.aistudio/artifacts/brain/94e07829-b32b-476f-9c29-aee6d6d48405/reliability_dedicated_page_updated.png', detailPng);
  console.log('✓ Rendered reliability_dedicated_page_updated.png');
}

renderReliabilityScreenshots().catch(console.error);
