import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

function deployImage(buffer, filename) {
  const dirs = [
    'src/assets/images',
    'public/assets/images',
    'assets/images',
  ];
  if (fs.existsSync('dist/assets/images')) {
    dirs.push('dist/assets/images');
  }
  for (const d of dirs) {
    fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, filename), buffer);
  }
  console.log(`✓ Deployed ${filename}`);
}

async function getRaw(imagePath) {
  const { data, info } = await sharp(imagePath).raw().toBuffer({ resolveWithObject: true });
  return { buf: Buffer.from(data), info };
}

// Inpaint an area by vertical interpolation from pixels above and below
function inpaintVertical(buf, w, ch, x1, x2, y1, y2, yOffset = 8) {
  for (let y = y1; y <= y2; y++) {
    const t = (y - y1) / Math.max(1, y2 - y1);
    for (let x = x1; x <= x2; x++) {
      const topIdx = ((y1 - yOffset) * w + x) * ch;
      const botIdx = ((y2 + yOffset) * w + x) * ch;
      const idx = (y * w + x) * ch;
      const noise = (Math.random() - 0.5) * 3;
      buf[idx] = Math.max(0, Math.min(255, Math.round(buf[topIdx] * (1 - t) + buf[botIdx] * t + noise)));
      buf[idx + 1] = Math.max(0, Math.min(255, Math.round(buf[topIdx + 1] * (1 - t) + buf[botIdx + 1] * t + noise)));
      buf[idx + 2] = Math.max(0, Math.min(255, Math.round(buf[topIdx + 2] * (1 - t) + buf[botIdx + 2] * t + noise)));
    }
  }
}

// Inpaint an area by horizontal interpolation from pixels left and right
function inpaintHorizontal(buf, w, ch, x1, x2, y1, y2, xOffset = 8) {
  for (let y = y1; y <= y2; y++) {
    const leftIdx = (y * w + (x1 - xOffset)) * ch;
    const rightIdx = (y * w + (x2 + xOffset)) * ch;
    for (let x = x1; x <= x2; x++) {
      const t = (x - x1) / Math.max(1, x2 - x1);
      const idx = (y * w + x) * ch;
      const noise = (Math.random() - 0.5) * 3;
      buf[idx] = Math.max(0, Math.min(255, Math.round(buf[leftIdx] * (1 - t) + buf[rightIdx] * t + noise)));
      buf[idx + 1] = Math.max(0, Math.min(255, Math.round(buf[leftIdx + 1] * (1 - t) + buf[rightIdx + 1] * t + noise)));
      buf[idx + 2] = Math.max(0, Math.min(255, Math.round(buf[leftIdx + 2] * (1 - t) + buf[rightIdx + 2] * t + noise)));
    }
  }
}

// Copy a source block to a destination with soft border feathering
function copyPatchFeathered(buf, w, ch, srcX, srcY, dstX, dstY, pw, ph, feather = 4) {
  for (let dy = 0; dy < ph; dy++) {
    for (let dx = 0; dx < pw; dx++) {
      const sIdx = ((srcY + dy) * w + (srcX + dx)) * ch;
      const dIdx = ((dstY + dy) * w + (dstX + dx)) * ch;

      let alpha = 1.0;
      if (feather > 0) {
        const edgeDist = Math.min(dx, pw - 1 - dx, dy, ph - 1 - dy);
        if (edgeDist < feather) {
          alpha = edgeDist / feather;
        }
      }

      buf[dIdx] = Math.round(buf[dIdx] * (1 - alpha) + buf[sIdx] * alpha);
      buf[dIdx + 1] = Math.round(buf[dIdx + 1] * (1 - alpha) + buf[sIdx + 1] * alpha);
      buf[dIdx + 2] = Math.round(buf[dIdx + 2] * (1 - alpha) + buf[sIdx + 2] * alpha);
    }
  }
}

// Subtle box blur over a region to blend edges
function smoothRegion(buf, w, ch, x1, x2, y1, y2, r = 1) {
  for (let y = y1; y <= y2; y++) {
    for (let x = x1; x <= x2; x++) {
      let red = 0, green = 0, blue = 0, count = 0;
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const i = ((y + dy) * w + (x + dx)) * ch;
          red += buf[i]; green += buf[i + 1]; blue += buf[i + 2]; count++;
        }
      }
      const idx = (y * w + x) * ch;
      buf[idx] = Math.round(red / count);
      buf[idx + 1] = Math.round(green / count);
      buf[idx + 2] = Math.round(blue / count);
    }
  }
}

async function runAll() {
  const emblemB64 = fs.readFileSync('public/review/emblem_clean.png').toString('base64');

  // =========================================================================
  // 1. RELIABILITY ENGINEERING (service_reliability_1790347183131.jpg)
  // =========================================================================
  console.log('Processing: service_reliability_1790347183131.jpg');
  {
    const file = 'orig_images_backup/service_reliability_1790347183131.jpg';
    const { buf, info } = await getRaw(file);
    const { width: w, channels: ch } = info;

    // Inpaint helmet "Eskom" text (x: 770-820, y: 228-264)
    inpaintVertical(buf, w, ch, 770, 820, 228, 264, 6);
    smoothRegion(buf, w, ch, 768, 822, 226, 266, 1);

    // Inpaint vest "Eskom" logo (x: 898-960, y: 445-480) using clean yellow vest fabric above it
    copyPatchFeathered(buf, w, ch, 898, 415, 898, 445, 62, 35, 3);
    smoothRegion(buf, w, ch, 896, 962, 443, 482, 1);

    // Create authentic MarveThabi Reliability badge overlay
    const badgeSvg = Buffer.from(`
      <svg width="78" height="74" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="sh" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="1" stdDeviation="0.8" flood-opacity="0.5"/>
          </filter>
        </defs>
        <rect x="1" y="1" width="76" height="72" rx="4" fill="#0d1527" stroke="#1e293b" stroke-width="1.2" filter="url(#sh)"/>
        <image href="data:image/png;base64,${emblemB64}" x="22" y="7" width="34" height="34"/>
        <text x="39" y="52" font-family="DejaVu Sans, Arial, sans-serif" font-weight="900" font-size="7.5" fill="#84cc16" text-anchor="middle" letter-spacing="0.4">MARVETHABI</text>
        <text x="39" y="64" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="6.2" fill="#f1f5f9" text-anchor="middle" letter-spacing="0.3">RELIABILITY</text>
      </svg>
    `);
    const badgePng = await sharp(badgeSvg).png().toBuffer();

    const output = await sharp(buf, { raw: info })
      .composite([{ input: badgePng, left: 935, top: 535 }])
      .jpeg({ quality: 96 })
      .toBuffer();

    deployImage(output, 'service_reliability_1790347183131.jpg');
  }

  // =========================================================================
  // 2. ASSET MANAGEMENT (service_asset_management_1790347194800.jpg)
  // =========================================================================
  console.log('Processing: service_asset_management_1790347194800.jpg');
  {
    const file = 'orig_images_backup/service_asset_management_1790347194800.jpg';
    const { buf, info } = await getRaw(file);
    const { width: w, channels: ch } = info;

    // Man's helmet logo (x: 745-785, y: 185-225)
    inpaintHorizontal(buf, w, ch, 745, 785, 185, 225, 8);
    smoothRegion(buf, w, ch, 743, 787, 183, 227, 1);

    // Man's right chest fake text ("THASO III" x: 785-840, y: 360-405)
    copyPatchFeathered(buf, w, ch, 715, 360, 785, 360, 55, 45, 4);

    // Man's left chest fake badge ("LOT 88" x: 865-930, y: 355-400)
    copyPatchFeathered(buf, w, ch, 935, 355, 865, 355, 65, 45, 4);

    // Woman's sleeve text (x: 240-275, y: 365-420)
    copyPatchFeathered(buf, w, ch, 205, 365, 240, 365, 35, 55, 3);

    // Authentic MarveThabi Asset Management print on man's left chest pocket
    const assetPrintSvg = Buffer.from(`
      <svg width="105" height="42" xmlns="http://www.w3.org/2000/svg">
        <image href="data:image/png;base64,${emblemB64}" x="4" y="6" width="28" height="28"/>
        <text x="36" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="900" font-size="9" fill="#1e293b" letter-spacing="0.2">MarveThabi</text>
        <text x="36" y="32" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="6.5" fill="#475569" letter-spacing="0.3">ASSET MANAGEMENT</text>
      </svg>
    `);
    const assetPrintPng = await sharp(assetPrintSvg).png().toBuffer();

    const output = await sharp(buf, { raw: info })
      .composite([{ input: assetPrintPng, left: 870, top: 360 }])
      .jpeg({ quality: 96 })
      .toBuffer();

    deployImage(output, 'service_asset_management_1790347194800.jpg');
  }

  // =========================================================================
  // 3. SUBSTATION ENGINEERING (service_substation_engineering_1790348244291.jpg)
  // =========================================================================
  console.log('Processing: service_substation_engineering_1790348244291.jpg');
  {
    const file = 'orig_images_backup/service_substation_engineering_1790348244291.jpg';
    const { buf, info } = await getRaw(file);
    const { width: w, channels: ch } = info;

    // Transformer conservator tank round logo (x: 245-280, y: 280-310)
    copyPatchFeathered(buf, w, ch, 195, 280, 245, 280, 40, 32, 4);

    // Transformer blue plate on radiator (x: 180-245, y: 475-565)
    copyPatchFeathered(buf, w, ch, 180, 580, 180, 475, 68, 90, 4);

    // Woman's helmet "SCSA" logo (x: 780-840, y: 50-110)
    inpaintVertical(buf, w, ch, 780, 840, 50, 110, 6);
    smoothRegion(buf, w, ch, 778, 842, 48, 112, 1);

    // Woman's right chest "ECSA" patch (x: 615-725, y: 365-400)
    copyPatchFeathered(buf, w, ch, 620, 415, 615, 365, 105, 38, 4);

    // Woman's right arm "CCSA" patch (x: 425-495, y: 385-460)
    copyPatchFeathered(buf, w, ch, 425, 470, 425, 385, 75, 75, 4);

    // Woman's left chest "Cotoco" patch (x: 860-930, y: 385-425) -> inpaint to clean navy fabric
    copyPatchFeathered(buf, w, ch, 860, 435, 860, 385, 75, 42, 4);

    // Authentic MarveThabi Electrical logo embroidered on left chest pocket
    const mtEmbroiderySvg = Buffer.from(`
      <svg width="105" height="34" xmlns="http://www.w3.org/2000/svg">
        <image href="data:image/png;base64,${emblemB64}" x="2" y="3" width="26" height="26"/>
        <text x="32" y="16" font-family="DejaVu Sans, Arial, sans-serif" font-weight="900" font-size="8.8" fill="#f8fafc" letter-spacing="0.3">Marve<tspan fill="#84cc16">Thabi</tspan></text>
        <text x="32" y="27" font-family="DejaVu Sans, Arial, sans-serif" font-weight="600" font-size="6.2" fill="#cbd5e1" letter-spacing="0.4">ELECTRICAL</text>
      </svg>
    `);
    const mtEmbroideryPng = await sharp(mtEmbroiderySvg).png().toBuffer();

    const output = await sharp(buf, { raw: info })
      .composite([{ input: mtEmbroideryPng, left: 855, top: 388 }])
      .jpeg({ quality: 96 })
      .toBuffer();

    deployImage(output, 'service_substation_engineering_1790348244291.jpg');
  }

  // =========================================================================
  // 4. COMPLIANCE AUDITS (service_compliance_audits_1790347896626.jpg)
  // =========================================================================
  console.log('Processing: service_compliance_audits_1790347896626.jpg');
  {
    const file = 'orig_images_backup/service_compliance_audits_1790347896626.jpg';
    const { buf, info } = await getRaw(file);
    const { width: w, channels: ch } = info;

    // Clean helmet stickers (front x: 590-670, y: 140-205; right x: 760-845, y: 70-135)
    inpaintVertical(buf, w, ch, 590, 670, 140, 205, 6);
    inpaintVertical(buf, w, ch, 760, 845, 70, 135, 6);
    smoothRegion(buf, w, ch, 588, 672, 138, 207, 1);
    smoothRegion(buf, w, ch, 758, 847, 68, 137, 1);

    // Clean vest left chest fake logo ("GREENINFRA" x: 685-765, y: 460-505)
    copyPatchFeathered(buf, w, ch, 775, 460, 685, 460, 80, 48, 4);

    // Clean vest "SITE AUDIT" patch (x: 675-765, y: 515-570)
    copyPatchFeathered(buf, w, ch, 725, 580, 675, 515, 90, 58, 4);

    // Clean vest right chest fake text (x: 535-610, y: 490-545)
    copyPatchFeathered(buf, w, ch, 535, 560, 535, 490, 75, 55, 4);

    // Authentic MarveThabi Compliance badge overlay on vest pocket
    const auditPrintSvg = Buffer.from(`
      <svg width="105" height="42" xmlns="http://www.w3.org/2000/svg">
        <image href="data:image/png;base64,${emblemB64}" x="4" y="6" width="28" height="28"/>
        <text x="36" y="20" font-family="DejaVu Sans, Arial, sans-serif" font-weight="900" font-size="9" fill="#1e293b" letter-spacing="0.2">MarveThabi</text>
        <text x="36" y="32" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="6.5" fill="#475569" letter-spacing="0.3">COMPLIANCE &amp; ECO</text>
      </svg>
    `);
    const auditPrintPng = await sharp(auditPrintSvg).png().toBuffer();

    const output = await sharp(buf, { raw: info })
      .composite([{ input: auditPrintPng, left: 675, top: 480 }])
      .jpeg({ quality: 96 })
      .toBuffer();

    deployImage(output, 'service_compliance_audits_1790347896626.jpg');
  }

  // =========================================================================
  // 5. WATER MANAGEMENT (service_water_management_1790347643115.jpg)
  // =========================================================================
  console.log('Processing: service_water_management_1790347643115.jpg');
  {
    const file = 'orig_images_backup/service_water_management_1790347643115.jpg';
    const { buf, info } = await getRaw(file);
    const { width: w, channels: ch } = info;

    // Clean "DWS" text (x: 230-280, y: 480-515)
    inpaintVertical(buf, w, ch, 230, 280, 480, 515, 6);

    // Clean "HYDB" text (x: 355-410, y: 435-475)
    inpaintVertical(buf, w, ch, 355, 410, 435, 475, 6);

    // Clean sleeve wrist barcode patch (x: 435-480, y: 812-840)
    copyPatchFeathered(buf, w, ch, 490, 805, 435, 812, 48, 28, 3);

    // Subtle authentic MarveThabi gear emblem on front of helmet
    const helmetEmblemSvg = Buffer.from(`
      <svg width="26" height="26" xmlns="http://www.w3.org/2000/svg">
        <image href="data:image/png;base64,${emblemB64}" x="0" y="0" width="26" height="26"/>
      </svg>
    `);
    const helmetEmblemPng = await sharp(helmetEmblemSvg).png().toBuffer();

    const output = await sharp(buf, { raw: info })
      .composite([{ input: helmetEmblemPng, left: 248, top: 485 }])
      .jpeg({ quality: 96 })
      .toBuffer();

    deployImage(output, 'service_water_management_1790347643115.jpg');
  }

  // =========================================================================
  // 6. ENVIRONMENTAL MONITORING (service_environmental_1790347236174.jpg)
  // =========================================================================
  console.log('Processing: service_environmental_1790347236174.jpg');
  {
    const file = 'orig_images_backup/service_environmental_1790347236174.jpg';
    const { buf, info } = await getRaw(file);
    const { width: w, channels: ch } = info;

    // Clean helmet stickers (x: 600-750, y: 140-230)
    inpaintVertical(buf, w, ch, 600, 750, 140, 230, 8);
    smoothRegion(buf, w, ch, 598, 752, 138, 232, 1);

    // Clean vest chest patch (x: 670-720, y: 500-565)
    copyPatchFeathered(buf, w, ch, 675, 435, 670, 500, 52, 65, 4);

    // Retouch yellow warning banner: clean professional safety banner with correct spelling
    const cautionBannerSvg = Buffer.from(`
      <svg width="150" height="115" xmlns="http://www.w3.org/2000/svg">
        <rect width="150" height="115" fill="#facc15" stroke="#000000" stroke-width="3"/>
        <rect x="5" y="5" width="140" height="32" fill="#000000"/>
        <text x="75" y="27" font-family="DejaVu Sans, Arial, sans-serif" font-weight="900" font-size="16" fill="#facc15" text-anchor="middle" letter-spacing="1">CAUTION</text>
        <text x="75" y="58" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="11" fill="#000000" text-anchor="middle" letter-spacing="0.5">ENVIRONMENTAL</text>
        <text x="75" y="78" font-family="DejaVu Sans, Arial, sans-serif" font-weight="800" font-size="11" fill="#000000" text-anchor="middle" letter-spacing="0.5">MONITORING</text>
        <text x="75" y="98" font-family="DejaVu Sans, Arial, sans-serif" font-weight="700" font-size="9.5" fill="#000000" text-anchor="middle" letter-spacing="0.4">IN PROGRESS</text>
      </svg>
    `);
    const cautionBannerPng = await sharp(cautionBannerSvg).png().toBuffer();

    // Authentic MarveThabi emblem on hardhat
    const helmetEmblemSvg = Buffer.from(`
      <svg width="28" height="28" xmlns="http://www.w3.org/2000/svg">
        <image href="data:image/png;base64,${emblemB64}" x="0" y="0" width="28" height="28"/>
      </svg>
    `);
    const helmetEmblemPng = await sharp(helmetEmblemSvg).png().toBuffer();

    const output = await sharp(buf, { raw: info })
      .composite([
        { input: cautionBannerPng, left: 535, top: 345 },
        { input: helmetEmblemPng, left: 635, top: 165 },
      ])
      .jpeg({ quality: 96 })
      .toBuffer();

    deployImage(output, 'service_environmental_1790347236174.jpg');
  }

  // =========================================================================
  // 7. ELECTRICAL SERVICES (service_electrical_1790347207327.jpg)
  // =========================================================================
  console.log('Processing: service_electrical_1790347207327.jpg');
  {
    const file = 'orig_images_backup/service_electrical_1790347207327.jpg';
    const { buf, info } = await getRaw(file);
    const { width: w, channels: ch } = info;

    // Clean chest Eskom patch (x: 610-695, y: 450-515)
    copyPatchFeathered(buf, w, ch, 600, 525, 610, 450, 85, 65, 4);

    // Clean name tape (x: 475-545, y: 425-455)
    copyPatchFeathered(buf, w, ch, 475, 465, 475, 425, 70, 32, 3);

    // Clean helmet badge (x: 515-570, y: 50-100)
    inpaintVertical(buf, w, ch, 515, 570, 50, 100, 6);
    smoothRegion(buf, w, ch, 513, 572, 48, 102, 1);

    // Authentic MarveThabi Electrical embroidered logo on chest pocket
    const mtElecEmbroiderySvg = Buffer.from(`
      <svg width="105" height="34" xmlns="http://www.w3.org/2000/svg">
        <image href="data:image/png;base64,${emblemB64}" x="2" y="3" width="26" height="26"/>
        <text x="32" y="16" font-family="DejaVu Sans, Arial, sans-serif" font-weight="900" font-size="8.8" fill="#f8fafc" letter-spacing="0.3">Marve<tspan fill="#84cc16">Thabi</tspan></text>
        <text x="32" y="27" font-family="DejaVu Sans, Arial, sans-serif" font-weight="600" font-size="6.2" fill="#cbd5e1" letter-spacing="0.4">ELECTRICAL</text>
      </svg>
    `);
    const mtElecEmbroideryPng = await sharp(mtElecEmbroiderySvg).png().toBuffer();

    const output = await sharp(buf, { raw: info })
      .composite([{ input: mtElecEmbroideryPng, left: 615, top: 465 }])
      .jpeg({ quality: 96 })
      .toBuffer();

    deployImage(output, 'service_electrical_1790347207327.jpg');
  }

  // =========================================================================
  // 8. DEPLOY ALL OTHER CLEAN PRISTINE SERVICE IMAGES FROM BACKUP
  // =========================================================================
  const pristineFiles = [
    'service_air_quality_1790347670760.jpg',
    'service_electrical_construction_1790348230678.jpg',
    'service_greenhouse_gas_1790347684937.jpg',
    'service_hydrogeology_1790347696314.jpg',
    'service_rehabilitation_1790347709592.jpg',
    'service_waste_management_1790347656645.jpg',
    'service_authorisations_1790347877888.jpg',
    'service_condition_monitoring_1790347218708.jpg',
  ];

  for (const fn of pristineFiles) {
    const src = path.join('orig_images_backup', fn);
    const data = fs.readFileSync(src);
    deployImage(data, fn);
  }

  console.log('\nAll service images processed and deployed successfully!');
}

runAll().catch(console.error);
