import sharp from 'sharp';
import fs from 'fs';

// Helper to create a feathered patch from a source region
async function extractFeatheredPatch(imagePath, { left, top, width, height, blurRadius = 3 }) {
  const maskSvg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="b"><feGaussianBlur stdDeviation="${blurRadius}"/></filter>
      </defs>
      <rect width="${width}" height="${height}" fill="black"/>
      <rect x="${blurRadius * 2}" y="${blurRadius * 2}" width="${width - blurRadius * 4}" height="${height - blurRadius * 4}" rx="${blurRadius * 2}" fill="white" filter="url(#b)"/>
    </svg>
  `);
  const mask = await sharp(maskSvg).extractChannel(0).toBuffer();

  const patch = await sharp(imagePath)
    .extract({ left, top, width, height })
    .ensureAlpha()
    .toBuffer();

  return await sharp(patch)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

async function testRel() {
  const orig = 'orig_images_backup/service_reliability_1790347183131.jpg';
  
  // 1. Helmet clean:
  // "Eskom" text is at x: 775, y: 235 (w=45, h=28)
  const helmetPatch = await extractFeatheredPatch(orig, {
    left: 805,
    top: 195,
    width: 50,
    height: 32,
    blurRadius: 3,
  });

  // 2. Yellow vest Eskom logo clean:
  // "Eskom" green logo is at x: 900, y: 445 (w=55, h=35)
  const vestFabric = await extractFeatheredPatch(orig, {
    left: 830,
    top: 450,
    width: 60,
    height: 38,
    blurRadius: 3,
  });

  // 3. Authentic MarveThabi Reliability badge over the black patch:
  const emblemB64 = fs.readFileSync('public/review/emblem_clean.png').toString('base64');
  
  const badgeSvg = Buffer.from(`
    <svg width="68" height="66" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="0.8" flood-opacity="0.4"/>
        </filter>
      </defs>
      <rect x="1" y="1" width="66" height="64" rx="4" fill="#0d1527" stroke="#1e293b" stroke-width="1" filter="url(#shadow)"/>
      <image href="data:image/png;base64,${emblemB64}" x="19" y="6" width="30" height="30"/>
      <text x="34" y="47" font-family="DejaVu Sans, Arial, sans-serif" font-weight="900" font-size="6.8" fill="#84cc16" text-anchor="middle" letter-spacing="0.4">MARVETHABI</text>
      <text x="34" y="58" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="5.8" fill="#f1f5f9" text-anchor="middle" letter-spacing="0.3">RELIABILITY</text>
    </svg>
  `);

  const badgePng = await sharp(badgeSvg).png().toBuffer();

  const result = await sharp(orig)
    .composite([
      { input: helmetPatch, left: 772, top: 233 },
      { input: vestFabric, left: 898, top: 444 },
      { input: badgePng, left: 885, top: 485 },
    ])
    .jpeg({ quality: 96 })
    .toBuffer();

  await sharp(result).toFile('public/review/test_rel_full.jpg');
  
  await sharp(result)
    .extract({ left: 650, top: 150, width: 300, height: 450 })
    .toFile('public/review/crop_rel_test3.jpg');

  console.log('Test reliability 3 completed!');
}

testRel().catch(console.error);
