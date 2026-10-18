const sharp = require('sharp');
const fs = require('fs');
const { execSync } = require('child_process');

async function fixReliability() {
  const baseImg = 'src/assets/images/service_reliability_1790347183131.jpg';
  
  // 1. First, let's remove the "Eskom" text on the white helmet (approx x: 690-760, y: 285-325).
  // The helmet area directly around it is smooth white plastic.
  // We can sample a clean patch of helmet plastic from x: 740, y: 240 (size 70x40) with blurred edges and blend it over.
  
  // 2. Remove the Eskom logo on the yellow vest (x: 790-880, y: 535-575).
  // The vest fabric directly to the left (x: 740-785, y: 535-575) has the exact same lime-yellow fluorescent hue and fabric weave.
  // We can clone that clean fabric over the Eskom logo.
  
  // 3. Next, generate an authentic MarveThabi logo overlay for the vest:
  // Using the official MarveThabi logo from assets/images/logo.png
  
  // Let's create an SVG badge for MarveThabi that matches the vest's black patch or sits cleanly on the vest.
  // Notice there is already a black patch "Reliability Engineer" at y: 575-660, x: 770-930.
  // Above it (y: 535-570) was the Eskom logo!
  // If we place the official MarveThabi logo right there, or create a unified authentic MarveThabi Reliability Engineer badge:
  
  // Let's prepare a clean logo overlay:
  const logoBuffer = await sharp('assets/images/logo.png')
    .resize({ width: 140 })
    .toBuffer();
    
  // Let's use ImageMagick to do the clean inpaint of the helmet and vest:
  // Clone helmet clean patch:
  execSync(`convert "${baseImg}" \\
    \\( +clone -crop 70x40+730+220 -repage +700+285 \\) -composite \\
    public/test_rel_step1.jpg`);
    
  // Check the helmet crop:
  execSync(`convert public/test_rel_step1.jpg \\
    \\( +clone -crop 50x40+730+535 -repage +805+538 \\) -composite \\
    public/test_rel_step2.jpg`);
}

fixReliability().catch(console.error);
