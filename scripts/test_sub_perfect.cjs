const sharp = require('sharp');
const fs = require('fs');

async function testSub() {
  const orig = 'orig_images_backup/service_substation_engineering_1790348244291.jpg';

  // 1. Helmet ECSA sticker clean:
  // Sample clean white helmet from (365, 230, w: 55, h: 65)
  const cleanHelm = await sharp(orig)
    .extract({ left: 365, top: 230, width: 55, height: 65 })
    .blur(1.2)
    .toBuffer();

  // Decal for helmet
  const decal = await sharp('public/logo_emblem_trans.png')
    .resize({ width: 28, height: 28 })
    .toBuffer();

  // 2. Erase CCSA arm badge at (245, 495, w: 55, h: 60)
  // Sample clean navy sleeve from (245, 575)
  const cleanArm = await sharp(orig)
    .extract({ left: 245, top: 575, width: 58, height: 62 })
    .blur(1.5)
    .toBuffer();

  // 3. Erase Cotsen left chest badge at (510, 500, w: 65, h: 35)
  // Sample clean navy fabric from (510, 455)
  const cleanLeftChest = await sharp(orig)
    .extract({ left: 510, top: 455, width: 68, height: 38 })
    .blur(1.5)
    .toBuffer();

  // 4. Erase Erlkam blue plaque on transformer at (95, 550, w: 65, h: 45)
  // Sample clean grey transformer fins from (95, 610)
  const cleanPlaque = await sharp(orig)
    .extract({ left: 95, top: 610, width: 68, height: 48 })
    .blur(1.5)
    .toBuffer();

  // 5. Authentic MarveThabi Electrical Engineering embroidered badge over BCSA at (335, 475)
  // Width: 68, Height: 44
  const emblem = await sharp('public/logo_emblem_trans.png')
    .resize({ width: 28, height: 28 })
    .toBuffer();

  const badgeSvg = Buffer.from(`
    <svg width="72" height="42" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="d" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#000" flood-opacity="0.45"/>
        </filter>
      </defs>
      <rect x="1" y="1" width="70" height="40" rx="3" fill="#141c26" stroke="#2a3848" stroke-width="1.5" filter="url(#d)" />
      <text x="50" y="19" fill="#78be20" font-family="-apple-system, sans-serif" font-size="8.5" font-weight="800" text-anchor="middle" letter-spacing="0.2">MARVETHABI</text>
      <text x="50" y="31" fill="#e2e8f0" font-family="-apple-system, sans-serif" font-size="7" font-weight="700" text-anchor="middle" letter-spacing="0.1">ELECTRICAL</text>
    </svg>
  `);

  const finalBadge = await sharp(badgeSvg)
    .composite([{ input: emblem, top: 7, left: 5 }])
    .png()
    .toBuffer();

  const out = await sharp(orig)
    .composite([
      // Clean transformer plaque
      { input: cleanPlaque, top: 550, left: 95 },
      // Clean CCSA arm patch
      { input: cleanArm, top: 495, left: 245 },
      // Clean Cotsen left chest patch
      { input: cleanLeftChest, top: 500, left: 510 },
      // Clean helmet ECSA sticker
      { input: cleanHelm, top: 240, left: 420 },
      // Apply subtle MarveThabi hardhat emblem
      { input: decal, top: 248, left: 430 },
      // Apply authentic MarveThabi chest badge over BCSA
      { input: finalBadge, top: 475, left: 338 }
    ])
    .jpeg({ quality: 96 })
    .toFile('public/substation_fixed_perfect.jpg');

  console.log('Substation fixed perfect done');
}

testSub().catch(console.error);
