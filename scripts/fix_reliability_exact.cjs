const sharp = require('sharp');
const fs = require('fs');

async function run() {
  const original = 'src/assets/images/service_reliability_1790347183131.jpg';
  
  // 1. Prepare MarveThabi emblem
  // Read logo.png, extract the gear-globe emblem and MarveThabi text
  const logoBuf = await sharp('assets/images/logo.png')
    .resize({ width: 85 })
    .toBuffer();

  // 2. We can create an SVG patch for the vest:
  // A dark navy/black professional embroidered badge (width: 80, height: 75)
  // With MarveThabi gear+globe logo and 'MarveThabi / Reliability'
  const emblemBuf = await sharp('assets/images/logo.png')
    .extract({ left: 20, top: 15, width: 275, height: 295 })
    .resize({ width: 44, height: 44 })
    .toBuffer();

  // Create SVG badge
  const badgeSvg = Buffer.from(`
    <svg width="86" height="88" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Embroidered badge border & fabric backing -->
      <rect x="2" y="2" width="82" height="84" rx="4" fill="#141c24" stroke="#2a3844" stroke-width="1.5" filter="url(#shadow)" />
      <rect x="5" y="5" width="76" height="78" rx="2" fill="#18232c" />
      <text x="43" y="60" fill="#78be20" font-family="'Inter', sans-serif" font-size="9" font-weight="700" text-anchor="middle" letter-spacing="0.2">MARVETHABI</text>
      <text x="43" y="73" fill="#e2e8f0" font-family="'Inter', sans-serif" font-size="7.5" font-weight="600" text-anchor="middle" letter-spacing="0.1">RELIABILITY</text>
    </svg>
  `);

  // Composite emblem into badge
  const finalBadge = await sharp(badgeSvg)
    .composite([
      { input: emblemBuf, top: 8, left: 21 }
    ])
    .png()
    .toBuffer();

  // 3. Clean helmet text:
  // Sample clean white helmet texture from x: 740, y: 220, size 45x35
  const helmetCleanPatch = await sharp(original)
    .extract({ left: 740, top: 220, width: 50, height: 40 })
    .blur(1)
    .toBuffer();

  // Sample clean yellow vest fabric from x: 890, y: 415, size 65x35 to cover Eskom logo
  const vestCleanPatch = await sharp(original)
    .extract({ left: 885, top: 415, width: 75, height: 35 })
    .blur(1.5)
    .toBuffer();

  // Sample lanyard clean navy ribbon from x: 865, y: 405, size 25x70 to cover lanyard text
  const lanyardCleanPatch = await sharp(original)
    .extract({ left: 865, top: 400, width: 25, height: 60 })
    .blur(1.5)
    .toBuffer();

  // Also clean the ID card header
  const idCleanPatch = await sharp(original)
    .extract({ left: 865, top: 415, width: 45, height: 20 })
    .blur(2)
    .toBuffer();

  // Apply all fixes
  const fixed = await sharp(original)
    .composite([
      // Clean helmet text (x: 775, y: 305)
      { input: helmetCleanPatch, top: 305, left: 770 },
      // Clean vest Eskom logo (x: 895, y: 448)
      { input: vestCleanPatch, top: 445, left: 890 },
      // Clean lanyard text
      { input: lanyardCleanPatch, top: 470, left: 863 },
      // Apply authentic MarveThabi Reliability Badge over the patch position
      // Position: top: 450, left: 885
      { input: finalBadge, top: 446, left: 888 }
    ])
    .jpeg({ quality: 95 })
    .toFile('public/service_reliability_fixed.jpg');

  console.log('Fixed reliability image saved to public/service_reliability_fixed.jpg');
}

run().catch(console.error);
