const sharp = require('sharp');

async function testExact() {
  const original = 'src/assets/images/service_reliability_1790347183131.jpg';
  
  // 1. Clean white helmet text at (775, 225):
  // Sample clean helmet plastic from (785, 195)
  const helmetPatch = await sharp(original)
    .extract({ left: 785, top: 195, width: 48, height: 26 })
    .blur(1.5)
    .toBuffer();

  // 2. Clean Eskom logo at (902, 452):
  // Sample clean fluorescent yellow fabric from (902, 420)
  const vestPatch = await sharp(original)
    .extract({ left: 902, top: 420, width: 55, height: 26 })
    .blur(1.5)
    .toBuffer();

  // 3. Create authentic MarveThabi Reliability Engineer badge
  // Using emblem from assets/images/logo.png
  const emblemBuf = await sharp('assets/images/logo.png')
    .extract({ left: 20, top: 15, width: 275, height: 295 })
    .resize({ width: 38, height: 38 })
    .toBuffer();

  // Embroidered rectangular chest badge matching the workwear style
  const badgeSvg = Buffer.from(`
    <svg width="74" height="66" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.35"/>
        </filter>
      </defs>
      <rect x="1" y="1" width="72" height="64" rx="3" fill="#111822" stroke="#253342" stroke-width="1.2" filter="url(#shadow)" />
      <rect x="3" y="3" width="68" height="60" rx="2" fill="#141c26" />
      <text x="37" y="47" fill="#78be20" font-family="'Inter', sans-serif" font-size="7.5" font-weight="700" text-anchor="middle" letter-spacing="0.2">MARVETHABI</text>
      <text x="37" y="57" fill="#e2e8f0" font-family="'Inter', sans-serif" font-size="6.5" font-weight="600" text-anchor="middle" letter-spacing="0.1">ENGINEERING</text>
    </svg>
  `);

  const finalBadge = await sharp(badgeSvg)
    .composite([
      { input: emblemBuf, top: 5, left: 18 }
    ])
    .png()
    .toBuffer();

  // Composite onto the image
  await sharp(original)
    .composite([
      { input: helmetPatch, top: 225, left: 775 },
      { input: vestPatch, top: 450, left: 900 },
      { input: finalBadge, top: 476, left: 890 }
    ])
    .jpeg({ quality: 96 })
    .toFile('public/service_reliability_fixed.jpg');

  console.log('Reliability image updated with authentic MarveThabi branding');
}

testExact().catch(console.error);
