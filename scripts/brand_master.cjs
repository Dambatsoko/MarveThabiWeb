const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Extract a region with seamless feathered alpha edges
async function extractFeathered(imagePath, left, top, width, height, blurRadius = 1.2, featherSize = 4) {
  const patch = await sharp(imagePath)
    .extract({ left, top, width, height })
    .blur(blurRadius)
    .toBuffer();

  const maskSvg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="f">
          <feGaussianBlur stdDeviation="${featherSize / 2}" />
        </filter>
      </defs>
      <rect x="${featherSize}" y="${featherSize}" width="${width - featherSize * 2}" height="${height - featherSize * 2}" rx="${featherSize * 1.5}" fill="white" filter="url(#f)" />
    </svg>
  `);

  const mask = await sharp(maskSvg).png().toBuffer();

  return await sharp(patch)
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();
}

// Generate an authentic MarveThabi embroidered badge matching professional workwear
async function createEmbroideredBadge(subtext, width = 76, height = 70, darkNavy = true) {
  const emblemSize = Math.round(width * 0.44);
  const emblem = await sharp('public/logo_emblem_trans.png')
    .resize({ width: emblemSize, height: emblemSize, fit: 'inside' })
    .toBuffer();

  const bg = darkNavy ? '#101622' : '#182028';
  const border = darkNavy ? '#233040' : '#2e3d4d';

  const badgeSvg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="drop" x="-15%" y="-15%" width="130%" height="130%">
          <feDropShadow dx="0" dy="1.2" stdDeviation="1.2" flood-color="#000" flood-opacity="0.4"/>
        </filter>
      </defs>
      <!-- Embroidered edge -->
      <rect x="1.5" y="1.5" width="${width - 3}" height="${height - 3}" rx="4" fill="${bg}" stroke="${border}" stroke-width="1.8" filter="url(#drop)" />
      <!-- Stitching line -->
      <rect x="4" y="4" width="${width - 8}" height="${height - 8}" rx="2" fill="none" stroke="${border}" stroke-width="0.8" stroke-dasharray="2,2" />
      <text x="${width / 2}" y="${height - 18}" fill="#78be20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="${Math.round(width * 0.10)}" font-weight="800" text-anchor="middle" letter-spacing="0.3">MARVETHABI</text>
      <text x="${width / 2}" y="${height - 7}" fill="#e2e8f0" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="${Math.round(width * 0.082)}" font-weight="700" text-anchor="middle" letter-spacing="0.1">${subtext.toUpperCase()}</text>
    </svg>
  `);

  const topOffset = Math.round(height * 0.08);
  const leftOffset = Math.round((width - emblemSize) / 2);

  return await sharp(badgeSvg)
    .composite([{ input: emblem, top: topOffset, left: leftOffset }])
    .png()
    .toBuffer();
}

// Generate authentic MarveThabi hardhat decal
async function createHardhatDecal(diameter = 30) {
  const emblemSize = Math.round(diameter * 0.82);
  const emblem = await sharp('public/logo_emblem_trans.png')
    .resize({ width: emblemSize, height: emblemSize, fit: 'inside' })
    .toBuffer();

  const decalSvg = Buffer.from(`
    <svg width="${diameter}" height="${diameter}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="decal-drop" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="0.8" stdDeviation="0.8" flood-color="#000" flood-opacity="0.25"/>
        </filter>
      </defs>
      <circle cx="${diameter / 2}" cy="${diameter / 2}" r="${(diameter / 2) - 1}" fill="rgba(255,255,255,0.92)" stroke="#e2e8f0" stroke-width="0.75" filter="url(#decal-drop)" />
    </svg>
  `);

  const offset = Math.round((diameter - emblemSize) / 2);

  return await sharp(decalSvg)
    .composite([{ input: emblem, top: offset, left: offset }])
    .png()
    .toBuffer();
}

// Save output image buffer to all active directories
async function saveToAll(buffer, filename) {
  const dirs = [
    'src/assets/images',
    'public/assets/images',
    'assets/images',
    'dist/assets/images'
  ];

  for (const dir of dirs) {
    if (fs.existsSync(dir)) {
      fs.writeFileSync(path.join(dir, filename), buffer);
    }
  }
}

async function run() {
  console.log('=== Executing Master Authentic MarveThabi Branding Engine (Exact Offsets) ===');

  // 1. RELIABILITY ENGINEERING (service_reliability_1790347183131.jpg)
  {
    const orig = 'orig_images_backup/service_reliability_1790347183131.jpg';
    console.log(`Processing ${orig}...`);
    // Erase Telem text on helmet
    const cleanHelmet = await extractFeathered(orig, 770, 185, 60, 36, 1.2, 5);
    // Erase lanyard text
    const cleanLanyard = await extractFeathered(orig, 863, 400, 24, 60, 1.5, 4);

    // Authentic MarveThabi Reliability badge: placed directly over the Eskom logo at (888, 442)
    // Size 78x74 completely covers the Eskom logo with zero seam!
    const badge = await createEmbroideredBadge('Reliability', 78, 74, true);
    const decal = await createHardhatDecal(26);

    const out = await sharp(orig)
      .composite([
        { input: cleanHelmet, top: 222, left: 758 },
        { input: decal, top: 224, left: 780 },
        { input: cleanLanyard, top: 470, left: 863 },
        { input: badge, top: 442, left: 888 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAll(out, 'service_reliability_1790347183131.jpg');
    console.log('✅ Reliability Engineering branded.');
  }

  // 2. SUBSTATION ENGINEERING (service_substation_engineering_1790348244291.jpg)
  {
    const orig = 'orig_images_backup/service_substation_engineering_1790348244291.jpg';
    console.log(`Processing ${orig}...`);
    // Clean helmet ECSA sticker at (410, 240, w: 60, h: 50) using clean white helmet from (365, 230)
    const cleanHelmet = await extractFeathered(orig, 365, 230, 60, 50, 1.2, 6);
    // Erase CCSA arm patch at (195, 455, w: 60, h: 60) using clean navy from (195, 535)
    const cleanArm = await extractFeathered(orig, 195, 535, 60, 60, 1.5, 6);
    // Erase Cotsen left chest patch at (450, 450, w: 65, h: 35) using clean navy from (450, 410)
    const cleanLeftChest = await extractFeathered(orig, 450, 410, 65, 35, 1.5, 6);
    // Erase Erlkam plaque on transformer at (115, 510, w: 65, h: 48) using clean grey metal from (115, 570)
    const cleanPlaque = await extractFeathered(orig, 115, 570, 65, 48, 1.5, 6);
    // Erase upper tank mark at (140, 380, w: 55, h: 50) using clean grey metal from (140, 440)
    const cleanTank = await extractFeathered(orig, 140, 440, 55, 50, 2, 6);

    // MarveThabi Electrical Engineering badge placed directly over BCSA patch at (295, 465)
    const badge = await createEmbroideredBadge('Electrical', 74, 48, true);
    const decal = await createHardhatDecal(28);

    const out = await sharp(orig)
      .composite([
        { input: cleanHelmet, top: 242, left: 412 },
        { input: decal, top: 248, left: 425 },
        { input: cleanArm, top: 455, left: 195 },
        { input: cleanLeftChest, top: 450, left: 450 },
        { input: cleanPlaque, top: 510, left: 115 },
        { input: cleanTank, top: 380, left: 140 },
        { input: badge, top: 465, left: 295 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAll(out, 'service_substation_engineering_1790348244291.jpg');
    console.log('✅ Substation Engineering branded.');
  }

  // 3. ASSET MANAGEMENT (service_asset_management_1790347194800.jpg)
  {
    const orig = 'orig_images_backup/service_asset_management_1790347194800.jpg';
    console.log(`Processing ${orig}...`);
    // Helmet badge at (810, 225) clean
    const cleanHelm = await extractFeathered(orig, 845, 205, 45, 45, 1.2, 6);
    // Circular logo on right chest at (930, 430) clean
    const cleanCirc = await extractFeathered(orig, 930, 380, 50, 45, 1.2, 6);
    // Female engineer sleeve text clean at (265, 570)
    const cleanSleeve = await extractFeathered(orig, 215, 565, 40, 55, 1.2, 6);
    // Pump yellow label at (595, 590) clean
    const cleanPump = await extractFeathered(orig, 540, 590, 50, 70, 2, 8);

    // MarveThabi Asset Management badge placed directly over THASO III at (850, 425)
    const badge = await createEmbroideredBadge('Asset Mgmt', 70, 62, false);
    const decal = await createHardhatDecal(24);

    const out = await sharp(orig)
      .composite([
        { input: cleanHelm, top: 225, left: 810 },
        { input: decal, top: 228, left: 818 },
        { input: cleanCirc, top: 430, left: 930 },
        { input: cleanSleeve, top: 570, left: 265 },
        { input: cleanPump, top: 590, left: 595 },
        { input: badge, top: 425, left: 850 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAll(out, 'service_asset_management_1790347194800.jpg');
    console.log('✅ Asset Management branded.');
  }

  // 4. COMPLIANCE AUDITS (service_compliance_audits_1790347896626.jpg)
  {
    const orig = 'orig_images_backup/service_compliance_audits_1790347896626.jpg';
    console.log(`Processing ${orig}...`);
    // Helmet ECO sticker at (830, 210) and green sticker at (900, 170)
    const cleanHelm1 = await extractFeathered(orig, 865, 175, 55, 50, 1.2, 6);
    const cleanHelm2 = await extractFeathered(orig, 865, 130, 60, 55, 1.2, 6);
    // Right chest text at (810, 480)
    const cleanVestText = await extractFeathered(orig, 810, 425, 55, 50, 1.2, 6);

    // MarveThabi Compliance badge placed directly over GRESMINFRA SITE AUDIT at (890, 475)
    const badge = await createEmbroideredBadge('Compliance', 74, 68, false);
    const decal = await createHardhatDecal(28);

    const out = await sharp(orig)
      .composite([
        { input: cleanHelm1, top: 210, left: 830 },
        { input: cleanHelm2, top: 170, left: 900 },
        { input: decal, top: 195, left: 855 },
        { input: cleanVestText, top: 480, left: 810 },
        { input: badge, top: 475, left: 890 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAll(out, 'service_compliance_audits_1790347896626.jpg');
    console.log('✅ Compliance Audits branded.');
  }

  // 5. WATER MANAGEMENT (service_water_management_1790347643115.jpg)
  {
    const orig = 'orig_images_backup/service_water_management_1790347643115.jpg';
    console.log(`Processing ${orig}...`);
    // Helmet DWS text at (680, 315) and HYDB text at (750, 285)
    const cleanHelm1 = await extractFeathered(orig, 695, 260, 50, 35, 1.2, 6);
    const cleanHelm2 = await extractFeathered(orig, 720, 240, 55, 40, 1.2, 6);
    // Arm patch at (820, 520)
    const cleanArm = await extractFeathered(orig, 820, 470, 45, 35, 1.2, 6);
    const decal = await createHardhatDecal(28);

    const out = await sharp(orig)
      .composite([
        { input: cleanHelm1, top: 315, left: 680 },
        { input: cleanHelm2, top: 285, left: 750 },
        { input: decal, top: 295, left: 710 },
        { input: cleanArm, top: 520, left: 820 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAll(out, 'service_water_management_1790347643115.jpg');
    console.log('✅ Water Management branded.');
  }

  // 6. ELECTRICAL CONSTRUCTION (service_electrical_construction_1790348230678.jpg)
  {
    const orig = 'orig_images_backup/service_electrical_construction_1790348230678.jpg';
    console.log(`Processing ${orig}...`);
    const cleanStandChest = await extractFeathered(orig, 280, 415, 55, 95, 1.5, 6);
    const cleanKneelId = await extractFeathered(orig, 595, 715, 50, 55, 1.5, 6);

    const badge1 = await createEmbroideredBadge('Electrical', 54, 50, true);
    const badge2 = await createEmbroideredBadge('Electrical', 56, 52, true);

    const out = await sharp(orig)
      .composite([
        { input: cleanStandChest, top: 295, left: 280 },
        { input: cleanKneelId, top: 715, left: 640 },
        { input: badge1, top: 300, left: 280 },
        { input: badge2, top: 648, left: 618 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAll(out, 'service_electrical_construction_1790348230678.jpg');
    console.log('✅ Electrical Construction branded.');
  }

  // 7. CONDITION MONITORING (service_condition_monitoring_1790347218708.jpg)
  {
    const orig = 'orig_images_backup/service_condition_monitoring_1790347218708.jpg';
    console.log(`Processing ${orig}...`);
    const cleanCase = await extractFeathered(orig, 165, 815, 80, 75, 2, 8);
    const cleanHelm = await extractFeathered(orig, 750, 135, 125, 65, 1.5, 8);
    const decal = await createHardhatDecal(30);

    const out = await sharp(orig)
      .composite([
        { input: cleanHelm, top: 180, left: 720 },
        { input: decal, top: 185, left: 765 },
        { input: cleanCase, top: 810, left: 80 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAll(out, 'service_condition_monitoring_1790347218708.jpg');
    console.log('✅ Condition Monitoring branded.');
  }

  // 8. ENVIRONMENTAL SERVICES (service_environmental_1790347236174.jpg)
  {
    const orig = 'orig_images_backup/service_environmental_1790347236174.jpg';
    console.log(`Processing ${orig}...`);
    const cleanHelm = await extractFeathered(orig, 645, 150, 115, 65, 1.5, 6);
    const cleanGrass = await extractFeathered(orig, 410, 335, 115, 115, 2.5, 10);
    const decal = await createHardhatDecal(28);

    const out = await sharp(orig)
      .composite([
        { input: cleanHelm, top: 195, left: 620 },
        { input: decal, top: 215, left: 662 },
        { input: cleanGrass, top: 335, left: 535 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAll(out, 'service_environmental_1790347236174.jpg');
    console.log('✅ Environmental Services branded.');
  }

  // 9. AIR QUALITY MANAGEMENT (service_air_quality_1790347670760.jpg)
  {
    const orig = 'orig_images_backup/service_air_quality_1790347670760.jpg';
    console.log(`Processing ${orig}...`);
    const cleanHelm = await extractFeathered(orig, 680, 120, 55, 40, 1.2, 6);
    const cleanOrange1 = await extractFeathered(orig, 615, 280, 40, 35, 1.2, 6);
    const cleanOrange2 = await extractFeathered(orig, 660, 310, 55, 38, 1.2, 6);
    const badge = await createEmbroideredBadge('Air Quality', 56, 50, false);
    const decal = await createHardhatDecal(26);

    const out = await sharp(orig)
      .composite([
        { input: cleanHelm, top: 160, left: 668 },
        { input: decal, top: 162, left: 682 },
        { input: cleanOrange1, top: 320, left: 622 },
        { input: cleanOrange2, top: 345, left: 658 },
        { input: badge, top: 338, left: 658 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAll(out, 'service_air_quality_1790347670760.jpg');
    console.log('✅ Air Quality branded.');
  }

  // 10. WASTE MANAGEMENT (service_waste_management_1790347656645.jpg)
  {
    const orig = 'orig_images_backup/service_waste_management_1790347656645.jpg';
    console.log(`Processing ${orig}...`);
    const cleanHelm = await extractFeathered(orig, 770, 230, 45, 30, 1.2, 6);
    const badge = await createEmbroideredBadge('Waste Mgmt', 54, 48, false);
    const decal = await createHardhatDecal(24);

    const out = await sharp(orig)
      .composite([
        { input: cleanHelm, top: 258, left: 758 },
        { input: decal, top: 260, left: 768 },
        { input: badge, top: 435, left: 780 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAll(out, 'service_waste_management_1790347656645.jpg');
    console.log('✅ Waste Management branded.');
  }

  // 11. GREENHOUSE GAS (service_greenhouse_gas_1790347684937.jpg)
  {
    const orig = 'orig_images_backup/service_greenhouse_gas_1790347684937.jpg';
    console.log(`Processing ${orig}...`);
    const cleanHelm = await extractFeathered(orig, 645, 250, 38, 35, 1.2, 6);
    const badge = await createEmbroideredBadge('GHG Mgmt', 48, 44, true);
    const decal = await createHardhatDecal(24);

    const out = await sharp(orig)
      .composite([
        { input: cleanHelm, top: 285, left: 632 },
        { input: decal, top: 288, left: 638 },
        { input: badge, top: 515, left: 680 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAll(out, 'service_greenhouse_gas_1790347684937.jpg');
    console.log('✅ Greenhouse Gas branded.');
  }

  // 12. HYDROGEOLOGY (service_hydrogeology_1790347696314.jpg)
  {
    const orig = 'orig_images_backup/service_hydrogeology_1790347696314.jpg';
    console.log(`Processing ${orig}...`);
    const cleanHelm = await extractFeathered(orig, 290, 255, 95, 75, 1.2, 6);
    const decal = await createHardhatDecal(28);

    const out = await sharp(orig)
      .composite([
        { input: cleanHelm, top: 290, left: 275 },
        { input: decal, top: 300, left: 300 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAll(out, 'service_hydrogeology_1790347696314.jpg');
    console.log('✅ Hydrogeology branded.');
  }

  // 13. REHABILITATION (service_rehabilitation_1790347709592.jpg)
  {
    const orig = 'orig_images_backup/service_rehabilitation_1790347709592.jpg';
    console.log(`Processing ${orig}...`);
    const cleanVest1 = await extractFeathered(orig, 320, 410, 35, 28, 1.2, 6);
    const badge = await createEmbroideredBadge('Rehab', 48, 44, false);

    const out = await sharp(orig)
      .composite([
        { input: cleanVest1, top: 440, left: 318 },
        { input: badge, top: 440, left: 358 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAll(out, 'service_rehabilitation_1790347709592.jpg');
    console.log('✅ Rehabilitation branded.');
  }

  // 14. AUTHORISATIONS (service_authorisations_1790347877888.jpg)
  {
    const orig = 'orig_images_backup/service_authorisations_1790347877888.jpg';
    console.log(`Processing ${orig}...`);
    const cleanSleeve = await extractFeathered(orig, 215, 440, 40, 50, 1.5, 6);
    const cleanVest = await extractFeathered(orig, 675, 520, 38, 55, 1.5, 6);
    const badge = await createEmbroideredBadge('Advisory', 48, 44, false);

    const out = await sharp(orig)
      .composite([
        { input: cleanSleeve, top: 478, left: 236 },
        { input: cleanVest, top: 448, left: 684 },
        { input: badge, top: 418, left: 706 }
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    await saveToAll(out, 'service_authorisations_1790347877888.jpg');
    console.log('✅ Authorisations branded.');
  }

  console.log('=== MASTER CALIBRATION COMPLETE: ALL 14 IMAGES PERFECTED ===');
}

run().catch(console.error);
