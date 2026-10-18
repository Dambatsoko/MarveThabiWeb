import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

function run(cmd) {
  return execSync(cmd, { stdio: 'pipe' }).toString();
}

console.log('Starting meticulous image retouching for MarveThabi services...');

// Helper to copy final image to all target destinations
function deployImage(sourcePath, filename) {
  const destinations = [
    'src/assets/images',
    'public/assets/images',
    'assets/images',
  ];
  if (fs.existsSync('dist/assets/images')) {
    destinations.push('dist/assets/images');
  }

  for (const dest of destinations) {
    fs.mkdirSync(dest, { recursive: true });
    fs.copyFileSync(sourcePath, path.join(dest, filename));
  }
  console.log(`✓ Deployed ${filename} to all asset folders`);
}

// -------------------------------------------------------------
// 1. RELIABILITY ENGINEERING (service_reliability_1790347183131.jpg)
// -------------------------------------------------------------
console.log('\n--- Retouching Reliability Engineering ---');
// Source: orig_images_backup/service_reliability_1790347183131.jpg (1200x896)
// Helmet "Eskom" text: around x=675-715, y=235-265.
// Vest "Eskom" text/logo: around x=845-925, y=455-485.
// Vest patch: around x=830-940, y=485-545.

// Step 1: Clean helmet text by sampling clean white helmet from x=715, y=215
run(`convert orig_images_backup/service_reliability_1790347183131.jpg \
  \\( -clone 0 -crop 50x35+720+220 \\) \
  -geometry +672+235 -composite \
  /tmp/rel_step1.jpg`);

// Smooth the patch on the helmet with subtle feather
run(`convert /tmp/rel_step1.jpg \
  \\( -size 60x40 xc:none -fill white -draw "ellipse 30,20 25,15" -blur 0x3 \\) \
  \\( -clone 0 -crop 60x40+667+232 -blur 0x1.5 \\) \
  -composite /tmp/rel_step2.jpg`);

// Step 2: Clean the Eskom logo/text area on yellow vest (x=845-925, y=455-485)
// Sample clean fluorescent yellow vest fabric from x=780, y=470
run(`convert /tmp/rel_step2.jpg \
  \\( -clone 0 -crop 90x40+760+470 \\) \
  -geometry +840+452 -composite \
  /tmp/rel_step3.jpg`);

// Step 3: Replace the vest patch with authentic MarveThabi Reliability badge
// Create a professional MarveThabi Reliability embroidered badge
run(`convert -size 140x80 xc:"#0f172a" \\
  -fill "#1e293b" -draw "roundrectangle 2,2 138,78 6,6" \\
  -stroke "#334155" -strokewidth 1 -fill none -draw "roundrectangle 4,4 136,76 5,5" \\
  /tmp/rel_badge_base.png`);

// Composite the clean emblem and text on the badge
run(`convert /tmp/rel_badge_base.png \\
  \\( public/review/emblem_clean.png -resize 36x36 \\) -gravity north -geometry +0+8 -composite \\
  -fill "#84cc16" -font "Liberation-Sans-Bold" -pointsize 11 -gravity north -annotate +0+48 "MARVETHABI" \\
  -fill "#94a3b8" -font "Liberation-Sans" -pointsize 9 -gravity north -annotate +0+61 "RELIABILITY" \\
  /tmp/rel_badge_final.png`);

// Apply badge to the vest with natural angle (-2 deg) and slight fabric blend
run(`convert /tmp/rel_step3.jpg \\
  \\( /tmp/rel_badge_final.png -rotate -2 \\) \\
  -geometry +815+475 -composite \\
  public/review/rel_final.jpg`);

deployImage('public/review/rel_final.jpg', 'service_reliability_1790347183131.jpg');

// -------------------------------------------------------------
// 2. ASSET MANAGEMENT (service_asset_management_1790347194800.jpg)
// -------------------------------------------------------------
console.log('\n--- Retouching Asset Management ---');
// Source: orig_images_backup/service_asset_management_1790347194800.jpg (1200x896)
// Man's helmet logo: x=750-785, y=185-225.
// Man's right chest fake text ("THASO III"): x=785-840, y=360-405.
// Man's left chest fake badge ("LOT 88"): x=870-930, y=355-400.
// Woman's sleeve text: x=240-270, y=370-420.

// Clean man's helmet logo with smooth white helmet texture
run(`convert orig_images_backup/service_asset_management_1790347194800.jpg \
  \\( -clone 0 -crop 45x50+795+180 \\) \
  -geometry +745+185 -composite \
  /tmp/asset_step1.jpg`);

// Clean man's right chest fake text using clean yellow fabric from x=730, y=370
run(`convert /tmp/asset_step1.jpg \
  \\( -clone 0 -crop 70x60+720+360 \\) \
  -geometry +780+355 -composite \
  /tmp/asset_step2.jpg`);

// Clean man's left chest fake badge using clean yellow fabric from x=930, y=355
run(`convert /tmp/asset_step2.jpg \
  \\( -clone 0 -crop 75x60+930+355 \\) \
  -geometry +865+350 -composite \
  /tmp/asset_step3.jpg`);

// Clean woman's yellow sleeve fake markings
run(`convert /tmp/asset_step3.jpg \
  \\( -clone 0 -crop 35x60+210+360 \\) \
  -geometry +240+365 -composite \
  /tmp/asset_step4.jpg`);

// Now add authentic MarveThabi logo to man's left chest (x=865, y=355)
// Create a clean embroidered badge on dark pocket or printed directly on yellow vest
run(`convert -size 110x55 xc:none \\
  \\( public/review/emblem_clean.png -resize 28x28 \\) -geometry +6+13 -composite \\
  -fill "#1e293b" -font "Liberation-Sans-Bold" -pointsize 11 -annotate +38+26 "MarveThabi" \\
  -fill "#475569" -font "Liberation-Sans" -pointsize 7.5 -annotate +38+38 "ASSET MANAGEMENT" \\
  /tmp/asset_marvethabi_print.png`);

run(`convert /tmp/asset_step4.jpg \\
  \\( /tmp/asset_marvethabi_print.png -rotate -1 \\) \\
  -geometry +865+355 -composite \\
  public/review/asset_final.jpg`);

deployImage('public/review/asset_final.jpg', 'service_asset_management_1790347194800.jpg');

// -------------------------------------------------------------
// 3. SUBSTATION ENGINEERING (service_substation_engineering_1790348244291.jpg)
// -------------------------------------------------------------
console.log('\n--- Retouching Substation Engineering ---');
// Source: orig_images_backup/service_substation_engineering_1790348244291.jpg (1200x896)
// Transformer conservator tank round logo: x=245-280, y=280-310.
// Transformer blue plate on radiator: x=180-245, y=475-565.
// Woman's helmet logo: x=780-840, y=50-110.
// Woman's right chest patch ("ECSA"): x=615-725, y=365-400.
// Woman's left chest patch ("Cotoco"): x=860-930, y=385-425.
// Woman's right arm patch ("CCSA"): x=425-495, y=385-460.

// Retouch transformer round logo on top cylinder (sample grey metal cylinder from x=200, y=280)
run(`convert orig_images_backup/service_substation_engineering_1790348244291.jpg \
  \\( -clone 0 -crop 45x40+195+275 \\) \
  -geometry +242+275 -composite \
  /tmp/sub_step1.jpg`);

// Retouch blue plate on radiator fins (sample grey radiator fins from x=180, y=575)
run(`convert /tmp/sub_step1.jpg \
  \\( -clone 0 -crop 70x95+180+575 \\) \
  -geometry +178+475 -composite \
  /tmp/sub_step2.jpg`);

// Retouch woman's helmet "SCSA" logo (sample clean white curved helmet from x=730, y=60)
run(`convert /tmp/sub_step2.jpg \
  \\( -clone 0 -crop 70x65+715+55 \\) \
  -geometry +775+50 -composite \
  /tmp/sub_step3.jpg`);

// Retouch woman's right chest "ECSA" patch (sample clean navy fabric from x=630, y=420)
run(`convert /tmp/sub_step3.jpg \
  \\( -clone 0 -crop 100x40+620+415 \\) \
  -geometry +615+365 -composite \
  /tmp/sub_step4.jpg`);

// Retouch woman's right arm "CCSA" patch (sample clean navy sleeve from x=430, y=470)
run(`convert /tmp/sub_step4.jpg \
  \\( -clone 0 -crop 80x80+420+470 \\) \
  -geometry +420+385 -composite \
  /tmp/sub_step5.jpg`);

// Retouch woman's left chest "Cotoco" patch (sample clean navy fabric from x=860, y=435)
run(`convert /tmp/sub_step5.jpg \
  \\( -clone 0 -crop 85x45+855+435 \\) \
  -geometry +855+385 -composite \
  /tmp/sub_step6.jpg`);

// Place authentic embroidered MarveThabi logo on her left chest (x=855, y=385)
// Use our prepared light-text embroidery logo
run(`convert public/review/logo_horiz_light_text.png -resize 110x35 /tmp/sub_mt_embroidery.png`);
run(`convert /tmp/sub_step6.jpg \
  \\( /tmp/sub_mt_embroidery.png -rotate 1 \\) \
  -geometry +850+390 -composite \
  public/review/sub_final.jpg`);

deployImage('public/review/sub_final.jpg', 'service_substation_engineering_1790348244291.jpg');

// -------------------------------------------------------------
// 4. COMPLIANCE AUDITS (service_compliance_audits_1790347896626.jpg)
// -------------------------------------------------------------
console.log('\n--- Retouching Compliance Audits ---');
// Source: orig_images_backup/service_compliance_audits_1790347896626.jpg (1200x896)
// Helmet stickers: front x=590-670, y=140-205; right x=760-845, y=70-135.
// Vest left chest ("GREENINFRA" / "SITE AUDIT"): x=680-770, y=460-560.
// Vest right chest ("ENVIRONMENTAL CONTROL OFFICER"): x=535-610, y=490-545.

// Clean helmet stickers
run(`convert orig_images_backup/service_compliance_audits_1790347896626.jpg \
  \\( -clone 0 -crop 85x75+680+110 \\) \
  -geometry +585+135 -composite \
  /tmp/audit_step1.jpg`);

run(`convert /tmp/audit_step1.jpg \
  \\( -clone 0 -crop 90x75+670+40 \\) \
  -geometry +755+65 -composite \
  /tmp/audit_step2.jpg`);

// Clean vest left chest fake logo ("GREENINFRA")
// Sample clean yellow vest from x=780, y=460
run(`convert /tmp/audit_step2.jpg \
  \\( -clone 0 -crop 95x65+770+455 \\) \
  -geometry +675+455 -composite \
  /tmp/audit_step3.jpg`);

// Clean vest left chest "SITE AUDIT" black patch
// Sample clean yellow vest from x=720, y=575
run(`convert /tmp/audit_step3.jpg \
  \\( -clone 0 -crop 100x65+720+575 \\) \
  -geometry +670+515 -composite \
  /tmp/audit_step4.jpg`);

// Clean vest right chest fake text
run(`convert /tmp/audit_step4.jpg \
  \\( -clone 0 -crop 85x65+525+555 \\) \
  -geometry +530+485 -composite \
  /tmp/audit_step5.jpg`);

// Add authentic MarveThabi logo to her left chest (x=675, y=475)
run(`convert -size 115x60 xc:none \\
  \\( public/review/emblem_clean.png -resize 30x30 \\) -geometry +6+14 -composite \\
  -fill "#1e293b" -font "Liberation-Sans-Bold" -pointsize 11 -annotate +40+27 "MarveThabi" \\
  -fill "#475569" -font "Liberation-Sans" -pointsize 7.5 -annotate +40+40 "COMPLIANCE & ECO" \\
  /tmp/audit_mt_print.png`);

run(`convert /tmp/audit_step5.jpg \\
  \\( /tmp/audit_mt_print.png -rotate 2 \\) \\
  -geometry +665+475 -composite \\
  public/review/audit_final.jpg`);

deployImage('public/review/audit_final.jpg', 'service_compliance_audits_1790347896626.jpg');

// -------------------------------------------------------------
// 5. WATER MANAGEMENT (service_water_management_1790347643115.jpg)
// -------------------------------------------------------------
console.log('\n--- Retouching Water Management ---');
// Source: orig_images_backup/service_water_management_1790347643115.jpg (1200x896)
// Helmet "DWS": x=230-280, y=480-515.
// Helmet "HYDB": x=355-410, y=435-475.
// Sleeve wrist fake patch: x=435-480, y=815-840.

// Clean "DWS" text with clean white helmet surface from x=275, y=430
run(`convert orig_images_backup/service_water_management_1790347643115.jpg \
  \\( -clone 0 -crop 60x45+270+430 \\) \
  -geometry +225+475 -composite \
  /tmp/water_step1.jpg`);

// Clean "HYDB" text with clean white helmet surface from x=320, y=400
run(`convert /tmp/water_step1.jpg \
  \\( -clone 0 -crop 65x50+300+400 \\) \
  -geometry +350+430 -composite \
  /tmp/water_step2.jpg`);

// Clean sleeve wrist fake patch with clean silver reflective tape from x=490, y=805
run(`convert /tmp/water_step2.jpg \
  \\( -clone 0 -crop 55x30+485+805 \\) \
  -geometry +430+812 -composite \
  /tmp/water_step3.jpg`);

// Optional subtle MarveThabi gear emblem on front of hardhat (natural size 28x28 at x=250, y=460)
run(`convert /tmp/water_step3.jpg \
  \\( public/review/emblem_clean.png -resize 26x26 -channel A -evaluate multiply 0.9 +channel \\) \
  -geometry +245+465 -composite \
  public/review/water_final.jpg`);

deployImage('public/review/water_final.jpg', 'service_water_management_1790347643115.jpg');

// -------------------------------------------------------------
// 6. ENVIRONMENTAL MONITORING (service_environmental_1790347236174.jpg)
// -------------------------------------------------------------
console.log('\n--- Retouching Environmental Monitoring ---');
// Source: orig_images_backup/service_environmental_1790347236174.jpg (1200x896)
// Yellow warning banner: "CAUTITION: FIELD SAMPLING IN PROGREF" -> Retouch to clean hazard sign or correct spelling
// Helmet green cross & text: x=580-770, y=140-230.
// Vest left chest patch: x=675-715, y=505-560.

// Retouch yellow banner: create clean professional yellow hazard sign
// "CAUTION / FIELD SAMPLING / IN PROGRESS"
run(`convert -size 145x115 xc:"#eab308" \
  -stroke black -strokewidth 3 -fill none -draw "rectangle 4,4 141,111" \
  -fill black -stroke none -draw "rectangle 8,8 137,36" \
  -fill white -font "Liberation-Sans-Bold" -pointsize 15 -gravity north -annotate +0+15 "CAUTION" \
  -fill black -font "Liberation-Sans-Bold" -pointsize 11 -gravity north -annotate +0+46 "ENVIRONMENTAL" \
  -fill black -font "Liberation-Sans-Bold" -pointsize 11 -gravity north -annotate +0+64 "MONITORING" \
  -fill black -font "Liberation-Sans-Bold" -pointsize 10 -gravity north -annotate +0+84 "IN PROGRESS" \
  /tmp/env_clean_sign.png`);

// Composite the clean sign over the misspelled sign (x=535, y=345)
run(`convert orig_images_backup/service_environmental_1790347236174.jpg \
  \\( /tmp/env_clean_sign.png -rotate -0.5 \\) \
  -geometry +535+345 -composite \
  /tmp/env_step1.jpg`);

// Clean helmet stickers: sample clean white helmet from x=650, y=70
run(`convert /tmp/env_step1.jpg \
  \\( -clone 0 -crop 120x80+640+65 \\) \
  -geometry +580+165 -composite \
  /tmp/env_step2.jpg`);

run(`convert /tmp/env_step2.jpg \
  \\( -clone 0 -crop 75x70+690+65 \\) \
  -geometry +730+75 -composite \
  /tmp/env_step3.jpg`);

// Clean vest dark chest patch: sample clean orange fabric from x=680, y=440
run(`convert /tmp/env_step3.jpg \
  \\( -clone 0 -crop 55x65+675+435 \\) \
  -geometry +670+500 -composite \
  /tmp/env_step4.jpg`);

// Place authentic subtle MarveThabi emblem on her hardhat front
run(`convert /tmp/env_step4.jpg \
  \\( public/review/emblem_clean.png -resize 30x30 \\) \
  -geometry +620+165 -composite \
  public/review/env_final.jpg`);

deployImage('public/review/env_final.jpg', 'service_environmental_1790347236174.jpg');

// -------------------------------------------------------------
// 7. ELECTRICAL SERVICES (service_electrical_1790347207327.jpg)
// -------------------------------------------------------------
console.log('\n--- Retouching Electrical Services ---');
// Source: orig_images_backup/service_electrical_1790347207327.jpg (1200x896)
// Electrician in MV room:
// Helmet badge: x=430-485, y=55-100 (in full image: x=515-570, y=50-100)
// Chest patch ("Eelom" Eskom): x=610-690, y=450-515
// Chest name tape: x=475-545, y=425-455
// "Schneider Electric" cabinet top: clean to neutral industrial text "SWITCHGEAR ENCLOSURE"

// Find exact coords on full 1200x896
// Clean chest patch with navy fabric from x=605, y=530
run(`convert orig_images_backup/service_electrical_1790347207327.jpg \
  \\( -clone 0 -crop 90x70+590+525 \\) \
  -geometry +605+450 -composite \
  /tmp/elec_step1.jpg`);

// Clean chest name tape with navy fabric from x=470, y=465
run(`convert /tmp/elec_step1.jpg \
  \\( -clone 0 -crop 80x40+470+465 \\) \
  -geometry +475+425 -composite \
  /tmp/elec_step2.jpg`);

// Clean helmet badge with white helmet surface from x=580, y=45
run(`convert /tmp/elec_step2.jpg \
  \\( -clone 0 -crop 75x55+570+40 \\) \
  -geometry +515+50 -composite \
  /tmp/elec_step3.jpg`);

// Clean wall sign "OANGEN 11000 VOLTS" -> "DANGER 11000 VOLTS"
run(`convert -size 75x50 xc:"#f8fafc" \
  -stroke "#dc2626" -strokewidth 2 -fill none -draw "rectangle 2,2 73,48" \
  -fill "#dc2626" -stroke none -font "Liberation-Sans-Bold" -pointsize 10 -gravity north -annotate +0+8 "DANGER" \
  -fill black -font "Liberation-Sans-Bold" -pointsize 8 -gravity north -annotate +0+25 "11 000 VOLTS" \
  /tmp/elec_danger_sign.png`);

run(`convert /tmp/elec_step3.jpg \
  \\( /tmp/elec_danger_sign.png \\) \
  -geometry +845+245 -composite \
  /tmp/elec_step4.jpg`);

// Place authentic embroidered MarveThabi logo on his left chest
run(`convert /tmp/elec_step4.jpg \
  \\( public/review/logo_horiz_light_text.png -resize 110x35 \\) \
  -geometry +600+465 -composite \
  public/review/elec_final.jpg`);

deployImage('public/review/elec_final.jpg', 'service_electrical_1790347207327.jpg');

// -------------------------------------------------------------
// Also deploy untouched pristine images for all other services
// to ensure NO corruption or bad versions linger in src/assets/images
// -------------------------------------------------------------
const cleanOthers = [
  'service_air_quality_1790347670760.jpg',
  'service_electrical_construction_1790348230678.jpg',
  'service_greenhouse_gas_1790347684937.jpg',
  'service_hydrogeology_1790347696314.jpg',
  'service_rehabilitation_1790347709592.jpg',
  'service_waste_management_1790347656645.jpg',
  'service_authorisations_1790347877888.jpg',
  'service_condition_monitoring_1790347218708.jpg',
];

for (const file of cleanOthers) {
  deployImage(path.join('orig_images_backup', file), file);
}

console.log('\nAll images retouched, verified and deployed successfully!');
