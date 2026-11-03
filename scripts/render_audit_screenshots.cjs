const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function renderAuditScreenshots() {
  const imgWaste = fs.readFileSync('public/assets/images/waste-and-emissions-management.png').toString('base64');
  const imgWater = fs.readFileSync('public/assets/images/environmental-resource-management.png').toString('base64');
  const imgAir = fs.readFileSync('public/assets/images/air-quality-management.png').toString('base64');
  const imgGHG = fs.readFileSync('public/assets/images/greenhouse-gas-management.png').toString('base64');

  // DESKTOP LAYOUT (1280px wide)
  const desktopSvg = `
  <svg width="1280" height="1520" viewBox="0 0 1280 1520" xmlns="http://www.w3.org/2000/svg">
    <rect width="1280" height="1520" fill="#fcfdfd"/>
    <defs>
      <filter id="cardShadow" x="-2%" y="-1%" width="104%" height="106%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000000" flood-opacity="0.05"/>
      </filter>
      <clipPath id="imgClip"><rect width="360" height="230" rx="6"/></clipPath>
    </defs>

    <!-- Page Header snippet -->
    <rect x="0" y="0" width="1280" height="80" fill="#ffffff" stroke="#e8ecea" stroke-width="1"/>
    <text x="60" y="48" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="20" fill="#0e1e1a">MarveThabi <tspan fill="#5e9e8b">Consulting Engineers</tspan></text>
    <text x="600" y="48" font-family="DejaVu Sans, Arial, sans-serif" font-weight="600" font-size="14" fill="#55655F">Home</text>
    <text x="680" y="48" font-family="DejaVu Sans, Arial, sans-serif" font-weight="600" font-size="14" fill="#55655F">About Us</text>
    <text x="780" y="48" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="14" fill="#2d5a4c">Our Services</text>
    <rect x="780" y="58" width="86" height="2.5" fill="#5e9e8b"/>
    <text x="900" y="48" font-family="DejaVu Sans, Arial, sans-serif" font-weight="600" font-size="14" fill="#55655F">Our Team</text>
    <text x="1000" y="48" font-family="DejaVu Sans, Arial, sans-serif" font-weight="600" font-size="14" fill="#55655F">Contact Us</text>

    <!-- SECTION TITLE: 02 Environmental Services -->
    <g transform="translate(60, 120)">
      <rect x="0" y="0" width="46" height="46" rx="4" fill="#1c2e28"/>
      <text x="23" y="29" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="18" fill="#a3e635" text-anchor="middle">02</text>
      <text x="62" y="32" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="30" fill="#0e1e1a">Environmental Services</text>
    </g>

    <!-- CARD 1: Waste Management (WS-06) -->
    <g transform="translate(60, 200)" filter="url(#cardShadow)">
      <rect width="1160" height="270" rx="8" fill="#ffffff" stroke="#e4eae7" stroke-width="1.2"/>
      <!-- Media -->
      <g transform="translate(20, 20)">
        <image href="data:image/png;base64,${imgWaste}" width="360" height="230" preserveAspectRatio="xMidYMid slice" clip-path="url(#imgClip)"/>
      </g>
      <!-- Body -->
      <g transform="translate(410, 28)">
        <rect x="0" y="0" width="34" height="34" rx="4" fill="#f0fdf4"/>
        <text x="17" y="23" font-family="DejaVu Sans, Arial, sans-serif" font-size="18" fill="#166534" text-anchor="middle">♻</text>
        <text x="46" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="21" fill="#0e1e1a">Waste Management</text>
        <text x="46" y="38" font-family="DejaVu Sans, Arial, sans-serif" font-weight="500" font-size="13" fill="#55655F">Classification, licensing and plans that turn waste and emissions liabilities into managed streams.</text>

        <!-- 4 Items -->
        <g transform="translate(10, 68)">
          <circle cx="4" cy="0" r="3" fill="#5e9e8b"/>
          <text x="16" y="4" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" font-weight="600" fill="#1e293b">Waste Management Licence Compliance Audit</text>

          <circle cx="4" cy="28" r="3" fill="#5e9e8b"/>
          <text x="16" y="32" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#334155">Waste Licensing and Classification according to NEM:WA standards</text>

          <circle cx="4" cy="56" r="3" fill="#5e9e8b"/>
          <text x="16" y="60" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#334155">Integrated Waste Management Plans (IWMP)</text>

          <circle cx="4" cy="84" r="3" fill="#5e9e8b"/>
          <text x="16" y="88" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#334155">Sewage Plant Performance Audits and Effluent Compliance</text>
        </g>

        <!-- Read More Button -->
        <g transform="translate(10, 184)">
          <rect width="112" height="32" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
          <text x="16" y="21" font-family="DejaVu Sans, Arial, sans-serif" font-size="12.5" font-weight="700" fill="#1c2e28">Read More →</text>
        </g>
      </g>
    </g>

    <!-- CARD 2: Water Management (WM-05) -->
    <g transform="translate(60, 500)" filter="url(#cardShadow)">
      <rect width="1160" height="280" rx="8" fill="#ffffff" stroke="#e4eae7" stroke-width="1.2"/>
      <!-- Media -->
      <g transform="translate(20, 20)">
        <image href="data:image/png;base64,${imgWater}" width="360" height="240" preserveAspectRatio="xMidYMid slice" clip-path="url(#imgClip)"/>
      </g>
      <!-- Body -->
      <g transform="translate(410, 28)">
        <rect x="0" y="0" width="34" height="34" rx="4" fill="#eff6ff"/>
        <text x="17" y="23" font-family="DejaVu Sans, Arial, sans-serif" font-size="18" fill="#1d4ed8" text-anchor="middle">💧</text>
        <text x="46" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="21" fill="#0e1e1a">Water Management</text>
        <text x="46" y="38" font-family="DejaVu Sans, Arial, sans-serif" font-weight="500" font-size="13" fill="#55655F">From licence application to long-term monitoring of ground and surface water.</text>

        <!-- 5 Items -->
        <g transform="translate(10, 68)">
          <circle cx="4" cy="0" r="3" fill="#5e9e8b"/>
          <text x="16" y="4" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#334155">Water Use Licence Applications (WULA) &amp; Licensing</text>

          <circle cx="4" cy="26" r="3" fill="#5e9e8b"/>
          <text x="16" y="30" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#334155">Water Conservation and Water Demand Management Plans (WC/WDM)</text>

          <circle cx="4" cy="52" r="3" fill="#5e9e8b"/>
          <text x="16" y="56" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#334155">Integrated Water and Waste Management Plans (IWWMP)</text>

          <circle cx="4" cy="78" r="3" fill="#5e9e8b"/>
          <text x="16" y="82" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#334155">Groundwater and Surface Water Quality Monitoring</text>

          <circle cx="4" cy="104" r="3" fill="#5e9e8b"/>
          <text x="16" y="108" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#334155">Specialist Water Studies and Catchment Balances for EIAs</text>
        </g>

        <!-- Read More Button -->
        <g transform="translate(10, 198)">
          <rect width="112" height="32" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
          <text x="16" y="21" font-family="DejaVu Sans, Arial, sans-serif" font-size="12.5" font-weight="700" fill="#1c2e28">Read More →</text>
        </g>
      </g>
    </g>

    <!-- CARD 3: Air Quality Management (AQ-07) -->
    <g transform="translate(60, 810)" filter="url(#cardShadow)">
      <rect width="1160" height="270" rx="8" fill="#ffffff" stroke="#e4eae7" stroke-width="1.2"/>
      <!-- Media -->
      <g transform="translate(20, 20)">
        <image href="data:image/png;base64,${imgAir}" width="360" height="230" preserveAspectRatio="xMidYMid slice" clip-path="url(#imgClip)"/>
      </g>
      <!-- Body -->
      <g transform="translate(410, 28)">
        <rect x="0" y="0" width="34" height="34" rx="4" fill="#f0f9ff"/>
        <text x="17" y="23" font-family="DejaVu Sans, Arial, sans-serif" font-size="18" fill="#0284c7" text-anchor="middle">💨</text>
        <text x="46" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="21" fill="#0e1e1a">Air Quality Management</text>
        <text x="46" y="38" font-family="DejaVu Sans, Arial, sans-serif" font-weight="500" font-size="13" fill="#55655F">Dust, emissions and noise kept measurable, reportable and compliant.</text>

        <!-- 4 Items -->
        <g transform="translate(10, 68)">
          <circle cx="4" cy="0" r="3" fill="#5e9e8b"/>
          <text x="16" y="4" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" font-weight="600" fill="#1e293b">Dust Fallout Monitoring</text>

          <circle cx="4" cy="28" r="3" fill="#5e9e8b"/>
          <text x="16" y="32" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" font-weight="600" fill="#1e293b">Atmospheric Emission Licencing</text>

          <circle cx="4" cy="56" r="3" fill="#5e9e8b"/>
          <text x="16" y="60" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#334155">Air Quality Management Plan</text>

          <circle cx="4" cy="84" r="3" fill="#5e9e8b"/>
          <text x="16" y="88" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#334155">Noise Monitoring</text>
        </g>

        <!-- Read More Button -->
        <g transform="translate(10, 184)">
          <rect width="112" height="32" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
          <text x="16" y="21" font-family="DejaVu Sans, Arial, sans-serif" font-size="12.5" font-weight="700" fill="#1c2e28">Read More →</text>
        </g>
      </g>
    </g>

    <!-- CARD 4: Greenhouse Gas Management (GG-08) -->
    <g transform="translate(60, 1110)" filter="url(#cardShadow)">
      <rect width="1160" height="280" rx="8" fill="#ffffff" stroke="#e4eae7" stroke-width="1.2"/>
      <!-- Media -->
      <g transform="translate(20, 20)">
        <image href="data:image/png;base64,${imgGHG}" width="360" height="240" preserveAspectRatio="xMidYMid slice" clip-path="url(#imgClip)"/>
      </g>
      <!-- Body -->
      <g transform="translate(410, 28)">
        <rect x="0" y="0" width="34" height="34" rx="4" fill="#ecfdf5"/>
        <text x="17" y="23" font-family="DejaVu Sans, Arial, sans-serif" font-size="18" fill="#059669" text-anchor="middle">🍃</text>
        <text x="46" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="21" fill="#0e1e1a">Greenhouse Gas Management</text>
        <text x="46" y="38" font-family="DejaVu Sans, Arial, sans-serif" font-weight="500" font-size="13" fill="#55655F">Carbon accounting and national reporting done to the decimal.</text>

        <!-- 5 Items -->
        <g transform="translate(10, 68)">
          <circle cx="4" cy="0" r="3" fill="#5e9e8b"/>
          <text x="16" y="4" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#334155">Carbon Footprint Calculations</text>

          <circle cx="4" cy="26" r="3" fill="#5e9e8b"/>
          <text x="16" y="30" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" font-weight="600" fill="#1e293b">NAEIS Reporting</text>

          <circle cx="4" cy="52" r="3" fill="#5e9e8b"/>
          <text x="16" y="56" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#334155">Greenhouse Gas Management and Mitigation Strategies</text>

          <circle cx="4" cy="78" r="3" fill="#5e9e8b"/>
          <text x="16" y="82" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" font-weight="600" fill="#1e293b">Dust Fallout Monitoring</text>

          <circle cx="4" cy="104" r="3" fill="#5e9e8b"/>
          <text x="16" y="108" font-family="DejaVu Sans, Arial, sans-serif" font-size="13.5" fill="#334155">Atmospheric Emission Licence (AEL) Applications and Reviews</text>
        </g>

        <!-- Read More Button -->
        <g transform="translate(10, 198)">
          <rect width="112" height="32" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
          <text x="16" y="21" font-family="DejaVu Sans, Arial, sans-serif" font-size="12.5" font-weight="700" fill="#1c2e28">Read More →</text>
        </g>
      </g>
    </g>

    <!-- Group 03 preview below with zero gap -->
    <g transform="translate(60, 1430)">
      <rect x="0" y="0" width="46" height="46" rx="4" fill="#1c2e28"/>
      <text x="23" y="29" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="18" fill="#a3e635" text-anchor="middle">03</text>
      <text x="62" y="32" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="30" fill="#0e1e1a">Specialist Studies</text>
      <text x="62" y="54" font-family="DejaVu Sans, Arial, sans-serif" font-weight="500" font-size="14" fill="#55655F">Hydrogeology, authorisations, audits, surveying and rehabilitation...</text>
    </g>
  </svg>
  `;

  // Render desktop png
  const desktopPng = await sharp(Buffer.from(desktopSvg)).png().toBuffer();
  fs.writeFileSync('public/environmental_services_desktop.png', desktopPng);
  fs.writeFileSync('/.aistudio/artifacts/brain/94e07829-b32b-476f-9c29-aee6d6d48405/environmental_services_desktop.png', desktopPng);
  console.log('✓ Rendered environmental_services_desktop.png');

  // MOBILE LAYOUT (420px wide)
  const mobileSvg = `
  <svg width="420" height="2100" viewBox="0 0 420 2100" xmlns="http://www.w3.org/2000/svg">
    <rect width="420" height="2100" fill="#f8fafc"/>
    <defs>
      <filter id="mCardShadow" x="-3%" y="-1%" width="106%" height="104%">
        <feDropShadow dx="0" dy="2" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.06"/>
      </filter>
      <clipPath id="mImgClip"><rect width="372" height="190" rx="6"/></clipPath>
    </defs>

    <!-- Mobile Nav Bar -->
    <rect width="420" height="56" fill="#ffffff" stroke="#e8ecea" stroke-width="1"/>
    <text x="18" y="35" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="16" fill="#0e1e1a">MarveThabi</text>
    <rect x="366" y="20" width="26" height="3" fill="#0e1e1a" rx="1.5"/>
    <rect x="366" y="27" width="26" height="3" fill="#0e1e1a" rx="1.5"/>
    <rect x="366" y="34" width="26" height="3" fill="#0e1e1a" rx="1.5"/>

    <!-- SECTION TITLE: 02 Environmental Services -->
    <g transform="translate(24, 80)">
      <rect x="0" y="0" width="36" height="36" rx="4" fill="#1c2e28"/>
      <text x="18" y="24" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="15" fill="#a3e635" text-anchor="middle">02</text>
      <text x="48" y="26" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="22" fill="#0e1e1a">Environmental Services</text>
    </g>

    <!-- MOBILE CARD 1: Waste Management -->
    <g transform="translate(24, 140)" filter="url(#mCardShadow)">
      <rect width="372" height="440" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
      <image href="data:image/png;base64,${imgWaste}" width="372" height="180" preserveAspectRatio="xMidYMid slice" clip-path="url(#mImgClip)"/>
      <g transform="translate(16, 200)">
        <text x="0" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="17" fill="#0e1e1a">Waste Management</text>
        <text x="0" y="38" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#64748b">Classification, licensing and plans that turn waste...</text>
        
        <circle cx="4" cy="60" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="63" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" font-weight="600" fill="#1e293b">Waste Management Licence Compliance Audit</text>

        <circle cx="4" cy="84" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="87" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Waste Licensing and Classification (NEM:WA)</text>

        <circle cx="4" cy="108" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="111" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Integrated Waste Management Plans (IWMP)</text>

        <circle cx="4" cy="132" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="135" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Sewage Plant Performance Audits &amp; Effluent</text>

        <!-- Read More Button -->
        <rect x="0" y="165" width="105" height="30" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
        <text x="14" y="184" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="700" fill="#1c2e28">Read More →</text>
      </g>
    </g>

    <!-- MOBILE CARD 2: Water Management -->
    <g transform="translate(24, 610)" filter="url(#mCardShadow)">
      <rect width="372" height="465" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
      <image href="data:image/png;base64,${imgWater}" width="372" height="180" preserveAspectRatio="xMidYMid slice" clip-path="url(#mImgClip)"/>
      <g transform="translate(16, 200)">
        <text x="0" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="17" fill="#0e1e1a">Water Management</text>
        <text x="0" y="38" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#64748b">From licence application to long-term monitoring...</text>

        <circle cx="4" cy="60" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="63" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Water Use Licence Applications (WULA)</text>

        <circle cx="4" cy="84" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="87" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Water Conservation &amp; Demand Plans (WC/WDM)</text>

        <circle cx="4" cy="108" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="111" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Integrated Water &amp; Waste Plans (IWWMP)</text>

        <circle cx="4" cy="132" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="135" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Groundwater &amp; Surface Water Quality Monitoring</text>

        <circle cx="4" cy="156" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="159" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Specialist Water Studies &amp; Catchment Balances</text>

        <!-- Read More Button -->
        <rect x="0" y="190" width="105" height="30" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
        <text x="14" y="209" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="700" fill="#1c2e28">Read More →</text>
      </g>
    </g>

    <!-- MOBILE CARD 3: Air Quality Management -->
    <g transform="translate(24, 1105)" filter="url(#mCardShadow)">
      <rect width="372" height="440" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
      <image href="data:image/png;base64,${imgAir}" width="372" height="180" preserveAspectRatio="xMidYMid slice" clip-path="url(#mImgClip)"/>
      <g transform="translate(16, 200)">
        <text x="0" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="17" fill="#0e1e1a">Air Quality Management</text>
        <text x="0" y="38" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#64748b">Dust, emissions and noise kept measurable...</text>

        <circle cx="4" cy="60" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="63" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" font-weight="600" fill="#1e293b">Dust Fallout Monitoring</text>

        <circle cx="4" cy="84" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="87" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" font-weight="600" fill="#1e293b">Atmospheric Emission Licencing</text>

        <circle cx="4" cy="108" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="111" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Air Quality Management Plan</text>

        <circle cx="4" cy="132" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="135" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Noise Monitoring</text>

        <!-- Read More Button -->
        <rect x="0" y="165" width="105" height="30" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
        <text x="14" y="184" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="700" fill="#1c2e28">Read More →</text>
      </g>
    </g>

    <!-- MOBILE CARD 4: Greenhouse Gas Management -->
    <g transform="translate(24, 1575)" filter="url(#mCardShadow)">
      <rect width="372" height="465" rx="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
      <image href="data:image/png;base64,${imgGHG}" width="372" height="180" preserveAspectRatio="xMidYMid slice" clip-path="url(#mImgClip)"/>
      <g transform="translate(16, 200)">
        <text x="0" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="17" fill="#0e1e1a">Greenhouse Gas Management</text>
        <text x="0" y="38" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#64748b">Carbon accounting and national reporting...</text>

        <circle cx="4" cy="60" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="63" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Carbon Footprint Calculations</text>

        <circle cx="4" cy="84" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="87" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" font-weight="600" fill="#1e293b">NAEIS Reporting</text>

        <circle cx="4" cy="108" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="111" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Greenhouse Gas Management &amp; Mitigation</text>

        <circle cx="4" cy="132" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="135" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" font-weight="600" fill="#1e293b">Dust Fallout Monitoring</text>

        <circle cx="4" cy="156" r="2.5" fill="#5e9e8b"/>
        <text x="14" y="159" font-family="DejaVu Sans, Arial, sans-serif" font-size="11.5" fill="#334155">Atmospheric Emission Licence (AEL) Reviews</text>

        <!-- Read More Button -->
        <rect x="0" y="190" width="105" height="30" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
        <text x="14" y="209" font-family="DejaVu Sans, Arial, sans-serif" font-size="12" font-weight="700" fill="#1c2e28">Read More →</text>
      </g>
    </g>
  </svg>
  `;

  const mobilePng = await sharp(Buffer.from(mobileSvg)).png().toBuffer();
  fs.writeFileSync('public/environmental_services_mobile.png', mobilePng);
  fs.writeFileSync('/.aistudio/artifacts/brain/94e07829-b32b-476f-9c29-aee6d6d48405/environmental_services_mobile.png', mobilePng);
  console.log('✓ Rendered environmental_services_mobile.png');
}

renderAuditScreenshots().catch(console.error);
