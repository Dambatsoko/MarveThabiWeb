import sharp from 'sharp';
import fs from 'fs';

async function prepareLogos() {
  // 1. High-res emblem with transparency
  const emblem = sharp('public/logo_emblem_trans.png');
  await emblem.toFile('public/review/emblem_clean.png');

  // 2. Horizontal logo transparent
  const horiz = sharp('public/logo_horizontal_trans.png');
  await horiz.toFile('public/review/logo_horiz_dark_text.png');

  // 3. Horizontal logo with light text (for navy / dark blue workwear)
  // Replace dark grey/black with crisp white/light silver while preserving the bright green 'Thabi'
  const { data, info } = await sharp('public/logo_horizontal_trans.png')
    .raw()
    .toBuffer({ resolveWithObject: true });

  const lightTextBuf = Buffer.from(data);
  for (let i = 0; i < lightTextBuf.length; i += info.channels) {
    const r = lightTextBuf[i];
    const g = lightTextBuf[i + 1];
    const b = lightTextBuf[i + 2];
    const a = info.channels === 4 ? lightTextBuf[i + 3] : 255;

    if (a > 30) {
      // If it's a dark pixel (not the bright green which has high G and lower R/B)
      const isGreen = g > 130 && g > r * 1.2 && g > b * 1.5;
      if (!isGreen) {
        // Turn dark letters into clean light off-white (embroidered thread look)
        if (r < 100 && g < 100 && b < 100) {
          const lum = Math.max(r, g, b);
          const lightness = 230 + Math.round((lum / 100) * 25);
          lightTextBuf[i] = lightness;
          lightTextBuf[i + 1] = lightness;
          lightTextBuf[i + 2] = lightness;
        }
      }
    }
  }

  await sharp(lightTextBuf, {
    raw: {
      width: info.width,
      height: info.height,
      channels: info.channels,
    },
  })
    .png()
    .toFile('public/review/logo_horiz_light_text.png');

  console.log('Logos prepared successfully!');
}

prepareLogos().catch(console.error);
