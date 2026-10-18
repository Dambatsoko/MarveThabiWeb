const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Helper to create a feathered patch from an image region
async function extractFeatheredPatch(imagePath, left, top, width, height, blurRadius = 2, cornerRadius = 6) {
  const patch = await sharp(imagePath)
    .extract({ left, top, width, height })
    .blur(blurRadius)
    .toBuffer();

  const maskSvg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="b">
          <feGaussianBlur stdDeviation="${Math.max(1, cornerRadius / 3)}" />
        </filter>
      </defs>
      <rect x="2" y="2" width="${width - 4}" height="${height - 4}" rx="${cornerRadius}" fill="white" filter="url(#b)" />
    </svg>
  `);

  const maskBuffer = await sharp(maskSvg).png().toBuffer();

  return await sharp(patch)
    .composite([{ input: maskBuffer, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

// Generate authentic MarveThabi Embroidered Fabric Chest Badge
async function createMarveThabiBadge(serviceSubtitle, width = 76, height = 70, isNavy = true) {
  const emblemWidth = Math.round(width * 0.44);
  const emblemBuf = await sharp('public/logo_emblem_trans.png')
    .resize({ width: emblemWidth, height: emblemWidth, fit: 'inside' })
    .toBuffer();

  const bgFill = isNavy ? '#101721' : '#182026';
  const borderStroke = isNavy ? '#263442' : '#334150';
  const textTitle = 'MARVETHABI';
  const textSub = serviceSubtitle.toUpperCase();

  const badgeSvg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="emb-shadow" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#000" flood-opacity="0.45"/>
        </filter>
      </defs>
      <!-- Outer embroidered stitch border -->
      <rect x="1.5" y="1.5" width="${width - 3}" height="${height - 3}" rx="4" fill="${bgFill}" stroke="${borderStroke}" stroke-width="1.8" filter="url(#emb-shadow)" />
      <!-- Inner seam line -->
      <rect x="4" y="4" width="${width - 8}" height="${height - 8}" rx="2" fill="none" stroke="${borderStroke}" stroke-width="0.75" stroke-dasharray="2,2" />
      <!-- Brand Name -->
      <text x="${width / 2}" y="${height - 18}" fill="#78be20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="${Math.round(width * 0.10)}" font-weight="800" text-anchor="middle" letter-spacing="0.4">${textTitle}</text>
      <!-- Discipline / Service Line -->
      <text x="${width / 2}" y="${height - 7}" fill="#e2e8f0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="${Math.round(width * 0.08)}" font-weight="700" text-anchor="middle" letter-spacing="0.2">${textSub}</text>
    </svg>
  `);

  const topOffset = Math.round(height * 0.08);
  const leftOffset = Math.round((width - emblemWidth) / 2);

  return await sharp(badgeSvg)
    .composite([
      { input: emblemBuf, top: topOffset, left: leftOffset }
    ])
    .png()
    .toBuffer();
}

// Generate authentic MarveThabi Hardhat Decal
async function createHardhatDecal(diameter = 36) {
  const emblemWidth = Math.round(diameter * 0.88);
  const emblemBuf = await sharp('public/logo_emblem_trans.png')
    .resize({ width: emblemWidth, height: emblemWidth, fit: 'inside' })
    .toBuffer();

  const decalSvg = Buffer.from(`
    <svg width="${diameter}" height="${diameter}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="decal-shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="0.8" stdDeviation="0.8" flood-color="#000" flood-opacity="0.25"/>
        </filter>
      </defs>
      <circle cx="${diameter / 2}" cy="${diameter / 2}" r="${(diameter / 2) - 1}" fill="rgba(255,255,255,0.85)" stroke="#e2e8f0" stroke-width="0.8" filter="url(#decal-shadow)" />
    </svg>
  `);

  const offset = Math.round((diameter - emblemWidth) / 2);

  return await sharp(decalSvg)
    .composite([
      { input: emblemBuf, top: offset, left: offset }
    ])
    .png()
    .toBuffer();
}

// Save image to all active project image directories
async function saveToAllDirs(buffer, filename) {
  const dirs = [
    'src/assets/images',
    'public/assets/images',
    'assets/images'
  ];

  for (const d of dirs) {
    if (fs.existsSync(d)) {
      const target = path.join(d, filename);
      fs.writeFileSync(target, buffer);
    }
  }
}

async function processAllImages() {
  console.log('--- Starting Authentic MarveThabi Image Processing & De-Branding ---');

  // 1. RELIABILITY ENGINEERING (service_reliability_1790347183131.jpg)
  // Remove Eskom logo, Telem helmet text, add MarveThabi Reliability badge
  {
    const file = 'src/assets/images/service_reliability_1790347183131.jpg';
    console.log(`Processing: ${file}`);
    
    // Helmet clean patch
    const helmetClean = await extractFeatheredPatch(file, 785, 185, 52, 28, 1, 6);
    // Vest Eskom logo clean patch (clean yellow fabric)
    const vestClean = await extractFeatheredPatch(file, 908, 415, 60, 30, 1.2, 6);
    // Authentic MarveThabi Reliability Badge
    const badge = await createMarveThabiBadge('Reliability', 74, 68, true);
    // Hardhat decal
    const decal = await createHardhatDecal(26);

    const outBuffer = await sharp(file)
      .composite([
        { input: helmetClean, top: 224, left: 772 },
        { input: decal, top: 226, left: 785 },
        { input: vestClean, top: 448, left: 896 },
        { input: badge, top: 476, left: 890 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAllDirs(outBuffer, 'service_reliability_1790347183131.jpg');
    console.log('✅ service_reliability: Eskom logos removed, authentic MarveThabi badge & helmet decal applied.');
  }

  // 2. SUBSTATION ENGINEERING (service_substation_engineering_1790348244291.jpg)
  // Remove fake ECSA logo on helmet, BCSA patch on chest, arm patch, and pseudo-Eskom transformer text
  {
    const file = 'src/assets/images/service_substation_engineering_1790348244291.jpg';
    console.log(`Processing: ${file}`);

    // Helmet patch (clean white plastic)
    const helmetClean = await extractFeatheredPatch(file, 310, 240, 55, 35, 1.5, 6);
    // Arm patch (clean navy sleeve)
    const armClean = await extractFeatheredPatch(file, 235, 555, 38, 55, 1.5, 6);
    // Chest BCSA patch (clean navy fabric)
    const chestClean = await extractFeatheredPatch(file, 280, 525, 55, 32, 1.5, 6);
    // Right chest patch clean
    const rightChestClean = await extractFeatheredPatch(file, 380, 460, 45, 32, 1.5, 6);
    // Transformer plaques clean (clean industrial grey metal)
    const transClean1 = await extractFeatheredPatch(file, 95, 645, 45, 60, 2, 6);
    const transClean2 = await extractFeatheredPatch(file, 90, 420, 38, 28, 2, 6);
    // Authentic MarveThabi Electrical Engineering badge
    const badge = await createMarveThabiBadge('Electrical', 56, 52, true);
    // Hardhat decal
    const decal = await createHardhatDecal(28);

    const outBuffer = await sharp(file)
      .composite([
        { input: helmetClean, top: 255, left: 348 },
        { input: decal, top: 258, left: 362 },
        { input: armClean, top: 495, left: 200 },
        { input: chestClean, top: 480, left: 278 },
        { input: rightChestClean, top: 495, left: 378 },
        { input: transClean1, top: 565, left: 95 },
        { input: transClean2, top: 420, left: 125 },
        { input: badge, top: 478, left: 280 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAllDirs(outBuffer, 'service_substation_engineering_1790348244291.jpg');
    console.log('✅ service_substation_engineering: All fake badges and transformer branding removed, authentic MarveThabi badge applied.');
  }

  // 3. ASSET MANAGEMENT (service_asset_management_1790347194800.jpg)
  // Remove THASO III patch, fake circular badges, and pump gibberish
  {
    const file = 'src/assets/images/service_asset_management_1790347194800.jpg';
    console.log(`Processing: ${file}`);

    // Helmet badge clean
    const helmetClean = await extractFeatheredPatch(file, 700, 200, 35, 28, 1.2, 6);
    // THASO III patch clean
    const vestClean1 = await extractFeatheredPatch(file, 690, 470, 45, 38, 1.2, 6);
    // Circular logo clean
    const vestClean2 = await extractFeatheredPatch(file, 810, 415, 42, 35, 1.2, 6);
    // Female engineer sleeve text clean
    const sleeveClean = await extractFeatheredPatch(file, 210, 560, 35, 55, 1.2, 6);
    // Pump yellow label clean (green cast iron)
    const pumpClean = await extractFeatheredPatch(file, 410, 645, 45, 68, 2, 8);
    // Authentic MarveThabi Asset Management badge
    const badge = await createMarveThabiBadge('Asset Mgmt', 60, 54, false);
    const decal = await createHardhatDecal(24);

    const outBuffer = await sharp(file)
      .composite([
        { input: helmetClean, top: 220, left: 658 },
        { input: decal, top: 222, left: 664 },
        { input: vestClean1, top: 415, left: 688 },
        { input: vestClean2, top: 415, left: 758 },
        { input: sleeveClean, top: 570, left: 265 },
        { input: pumpClean, top: 645, left: 452 },
        { input: badge, top: 412, left: 686 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAllDirs(outBuffer, 'service_asset_management_1790347194800.jpg');
    console.log('✅ service_asset_management: THASO III and pump gibberish removed, MarveThabi badge added.');
  }

  // 4. ELECTRICAL CONSTRUCTION (service_electrical_construction_1790348230678.jpg)
  // Clean fake ID cards and orange embroidery, add MarveThabi Electrical badge
  {
    const file = 'src/assets/images/service_electrical_construction_1790348230678.jpg';
    console.log(`Processing: ${file}`);

    // Standing electrician chest text & ID clean
    const standChestClean = await extractFeatheredPatch(file, 270, 295, 32, 28, 1.2, 6);
    const standIdClean = await extractFeatheredPatch(file, 285, 410, 35, 42, 1.5, 6);
    // Kneeling electrician ID clean
    const kneelIdClean = await extractFeatheredPatch(file, 600, 715, 40, 52, 1.5, 6);
    // Authentic MarveThabi Electrical badge
    const badge1 = await createMarveThabiBadge('Electrical', 48, 44, true);
    const badge2 = await createMarveThabiBadge('Electrical', 52, 48, true);

    const outBuffer = await sharp(file)
      .composite([
        { input: standChestClean, top: 295, left: 298 },
        { input: standIdClean, top: 355, left: 284 },
        { input: kneelIdClean, top: 715, left: 644 },
        { input: badge1, top: 300, left: 290 },
        { input: badge2, top: 645, left: 620 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAllDirs(outBuffer, 'service_electrical_construction_1790348230678.jpg');
    console.log('✅ service_electrical_construction: Cleaned fake badges, added authentic MarveThabi workwear badges.');
  }

  // 5. CONDITION MONITORING (service_condition_monitoring_1790347218708.jpg)
  // Clean fake hardhat stickers and "VIBRATIOM ANALYZ6R" text
  {
    const file = 'src/assets/images/service_condition_monitoring_1790347218708.jpg';
    console.log(`Processing: ${file}`);

    // Helmet stickers clean (clean white plastic)
    const helmetClean = await extractFeatheredPatch(file, 745, 155, 95, 40, 1.5, 8);
    // Yellow case fake label clean (clean yellow plastic)
    const caseClean = await extractFeatheredPatch(file, 160, 830, 60, 55, 2, 8);
    // Decal
    const decal = await createHardhatDecal(30);

    const outBuffer = await sharp(file)
      .composite([
        { input: helmetClean, top: 195, left: 740 },
        { input: decal, top: 200, left: 775 },
        { input: caseClean, top: 830, left: 90 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAllDirs(outBuffer, 'service_condition_monitoring_1790347218708.jpg');
    console.log('✅ service_condition_monitoring: VIBRATIOM text and fake helmet stickers removed.');
  }

  // 6. WATER MANAGEMENT (service_water_management_1790347643115.jpg)
  // Clean DWS HYDB fake lettering on white hardhat
  {
    const file = 'src/assets/images/service_water_management_1790347643115.jpg';
    console.log(`Processing: ${file}`);

    // Clean helmet texture
    const helmetClean1 = await extractFeatheredPatch(file, 565, 275, 32, 28, 1.2, 6);
    const helmetClean2 = await extractFeatheredPatch(file, 575, 275, 45, 35, 1.2, 6);
    const decal = await createHardhatDecal(26);

    const outBuffer = await sharp(file)
      .composite([
        { input: helmetClean1, top: 320, left: 548 },
        { input: helmetClean2, top: 290, left: 600 },
        { input: decal, top: 310, left: 575 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAllDirs(outBuffer, 'service_water_management_1790347643115.jpg');
    console.log('✅ service_water_management: DWS/HYDB lettering replaced with authentic MarveThabi hardhat branding.');
  }

  // 7. ENVIRONMENTAL SERVICES (service_environmental_1790347236174.jpg)
  // Clean SAFETY FIRST helmet bar and fake CAUTTIONA sign
  {
    const file = 'src/assets/images/service_environmental_1790347236174.jpg';
    console.log(`Processing: ${file}`);

    // Clean helmet
    const helmetClean = await extractFeatheredPatch(file, 650, 165, 65, 45, 1.5, 6);
    // Clean fake sign with natural highveld grass
    const grassClean = await extractFeatheredPatch(file, 410, 335, 115, 120, 2.5, 10);
    const decal = await createHardhatDecal(26);

    const outBuffer = await sharp(file)
      .composite([
        { input: helmetClean, top: 235, left: 625 },
        { input: decal, top: 220, left: 660 },
        { input: grassClean, top: 335, left: 535 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAllDirs(outBuffer, 'service_environmental_1790347236174.jpg');
    console.log('✅ service_environmental: Fake sign removed, MarveThabi decal placed on helmet.');
  }

  // 8. AIR QUALITY MANAGEMENT (service_air_quality_1790347670760.jpg)
  // Clean AQA helmet text and orange jacket markings, add MarveThabi badge
  {
    const file = 'src/assets/images/service_air_quality_1790347670760.jpg';
    console.log(`Processing: ${file}`);

    const helmetClean = await extractFeatheredPatch(file, 680, 120, 55, 40, 1.2, 6);
    const orangeClean1 = await extractFeatheredPatch(file, 615, 280, 35, 32, 1.2, 6);
    const orangeClean2 = await extractFeatheredPatch(file, 660, 310, 55, 35, 1.2, 6);
    const badge = await createMarveThabiBadge('Air Quality', 54, 48, false);
    const decal = await createHardhatDecal(26);

    const outBuffer = await sharp(file)
      .composite([
        { input: helmetClean, top: 160, left: 668 },
        { input: decal, top: 162, left: 682 },
        { input: orangeClean1, top: 320, left: 622 },
        { input: orangeClean2, top: 345, left: 658 },
        { input: badge, top: 338, left: 660 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAllDirs(outBuffer, 'service_air_quality_1790347670760.jpg');
    console.log('✅ service_air_quality: AQA text and orange jacket markings cleaned, MarveThabi badge added.');
  }

  // 9. WASTE MANAGEMENT (service_waste_management_1790347656645.jpg)
  // Clean fake helmet badge and vest badge, add MarveThabi badge
  {
    const file = 'src/assets/images/service_waste_management_1790347656645.jpg';
    console.log(`Processing: ${file}`);

    const helmetClean = await extractFeatheredPatch(file, 770, 230, 42, 28, 1.2, 6);
    const vestClean = await extractFeatheredPatch(file, 785, 390, 50, 40, 1.2, 6);
    const badge = await createMarveThabiBadge('Waste Mgmt', 52, 48, false);
    const decal = await createHardhatDecal(24);

    const outBuffer = await sharp(file)
      .composite([
        { input: helmetClean, top: 258, left: 758 },
        { input: decal, top: 260, left: 768 },
        { input: vestClean, top: 435, left: 782 },
        { input: badge, top: 435, left: 782 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAllDirs(outBuffer, 'service_waste_management_1790347656645.jpg');
    console.log('✅ service_waste_management: Cleaned fake badges, added authentic MarveThabi badge.');
  }

  // 10. GREENHOUSE GAS MANAGEMENT (service_greenhouse_gas_1790347684937.jpg)
  // Clean fake blue helmet mark and chest mark, add MarveThabi badge
  {
    const file = 'src/assets/images/service_greenhouse_gas_1790347684937.jpg';
    console.log(`Processing: ${file}`);

    const helmetClean = await extractFeatheredPatch(file, 645, 250, 35, 32, 1.2, 6);
    const chestClean = await extractFeatheredPatch(file, 685, 475, 40, 35, 1.2, 6);
    const badge = await createMarveThabiBadge('GHG Mgmt', 48, 44, true);
    const decal = await createHardhatDecal(24);

    const outBuffer = await sharp(file)
      .composite([
        { input: helmetClean, top: 285, left: 632 },
        { input: decal, top: 288, left: 638 },
        { input: chestClean, top: 518, left: 682 },
        { input: badge, top: 515, left: 680 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAllDirs(outBuffer, 'service_greenhouse_gas_1790347684937.jpg');
    console.log('✅ service_greenhouse_gas: Cleaned blue mark, applied MarveThabi badge.');
  }

  // 11. COMPLIANCE AUDITS (service_compliance_audits_1790347896626.jpg)
  // Clean ECO and GRESMINFRA fake patches, add MarveThabi Compliance badge
  {
    const file = 'src/assets/images/service_compliance_audits_1790347896626.jpg';
    console.log(`Processing: ${file}`);

    const helmetClean = await extractFeatheredPatch(file, 690, 120, 75, 45, 1.5, 6);
    const vestClean1 = await extractFeatheredPatch(file, 655, 390, 45, 45, 1.2, 6);
    const vestClean2 = await extractFeatheredPatch(file, 745, 370, 70, 50, 1.2, 6);
    const badge = await createMarveThabiBadge('Compliance', 68, 62, false);
    const decal = await createHardhatDecal(28);

    const outBuffer = await sharp(file)
      .composite([
        { input: helmetClean, top: 198, left: 672 },
        { input: decal, top: 198, left: 708 },
        { input: vestClean1, top: 440, left: 652 },
        { input: vestClean2, top: 465, left: 705 },
        { input: badge, top: 435, left: 704 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAllDirs(outBuffer, 'service_compliance_audits_1790347896626.jpg');
    console.log('✅ service_compliance_audits: Cleaned ECO and GRESMINFRA, applied authentic MarveThabi Compliance badge.');
  }

  // 12. HYDROGEOLOGICAL STUDIES (service_hydrogeology_1790347696314.jpg)
  // Clean fake bird logo and HYDB text on hardhat
  {
    const file = 'src/assets/images/service_hydrogeology_1790347696314.jpg';
    console.log(`Processing: ${file}`);

    const helmetClean = await extractFeatheredPatch(file, 290, 260, 65, 30, 1.2, 6);
    const decal = await createHardhatDecal(28);

    const outBuffer = await sharp(file)
      .composite([
        { input: helmetClean, top: 310, left: 295 },
        { input: decal, top: 300, left: 300 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAllDirs(outBuffer, 'service_hydrogeology_1790347696314.jpg');
    console.log('✅ service_hydrogeology: Cleaned bird logo & HYDB text, applied authentic MarveThabi decal.');
  }

  // 13. ENVIRONMENTAL REHABILITATION (service_rehabilitation_1790347709592.jpg)
  // Clean fake text on vest, add MarveThabi Rehabilitation badge
  {
    const file = 'src/assets/images/service_rehabilitation_1790347709592.jpg';
    console.log(`Processing: ${file}`);

    const vestClean1 = await extractFeatheredPatch(file, 320, 410, 35, 28, 1.2, 6);
    const vestClean2 = await extractFeatheredPatch(file, 360, 405, 45, 35, 1.2, 6);
    const badge = await createMarveThabiBadge('Rehab', 46, 42, false);

    const outBuffer = await sharp(file)
      .composite([
        { input: vestClean1, top: 440, left: 318 },
        { input: vestClean2, top: 440, left: 358 },
        { input: badge, top: 440, left: 358 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAllDirs(outBuffer, 'service_rehabilitation_1790347709592.jpg');
    console.log('✅ service_rehabilitation: Cleaned fake vest text, applied MarveThabi badge.');
  }

  // 14. AUTHORISATIONS, PERMITS AND LICENCES (service_authorisations_1790347877888.jpg)
  // Clean sleeve EIA badge and vest badge, add MarveThabi badge
  {
    const file = 'src/assets/images/service_authorisations_1790347877888.jpg';
    console.log(`Processing: ${file}`);

    const sleeveClean = await extractFeatheredPatch(file, 215, 440, 35, 45, 1.5, 6);
    const vestClean = await extractFeatheredPatch(file, 675, 520, 35, 55, 1.5, 6);
    const badge = await createMarveThabiBadge('Advisory', 48, 44, false);

    const outBuffer = await sharp(file)
      .composite([
        { input: sleeveClean, top: 478, left: 236 },
        { input: vestClean, top: 448, left: 684 },
        { input: badge, top: 418, left: 706 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAllDirs(outBuffer, 'service_authorisations_1790347877888.jpg');
    console.log('✅ service_authorisations: Cleaned sleeve & vest badges, applied MarveThabi badge.');
  }

  console.log('--- All 14 Service Images Successfully Processed & Synchronized ---');
}

processAllImages().catch(console.error);
