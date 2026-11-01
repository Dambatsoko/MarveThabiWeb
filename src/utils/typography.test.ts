import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

test('index.html loads Fira Sans and preserves Jost, removing Geist', () => {
  const indexHtml = fs.readFileSync(path.resolve('index.html'), 'utf8');
  assert.ok(indexHtml.includes('family=Fira+Sans'), 'index.html must load Fira Sans from Google Fonts');
  assert.ok(indexHtml.includes('family=Jost'), 'index.html must preserve Jost font from Google Fonts');
  assert.ok(!indexHtml.includes('family=Geist'), 'index.html must not request Geist');
});

test('main.css configures Fira Sans for headings and strictly preserves Jost for body', () => {
  const mainCss = fs.readFileSync(path.resolve('public/assets/css/main.css'), 'utf8');

  // Verify Fira Sans is declared in variables
  assert.ok(mainCss.includes("--font-head:'Fira Sans'") || mainCss.includes("--font-head: 'Fira Sans'"), 'main.css must configure Fira Sans for --font-head');
  assert.ok(mainCss.includes("--font-heading:'Fira Sans'") || mainCss.includes("--font-heading: 'Fira Sans'"), 'main.css must configure Fira Sans for --font-heading');

  // Verify Jost is strictly preserved
  assert.ok(mainCss.includes("--font-body:'Jost'") || mainCss.includes("--font-body: 'Jost'"), 'main.css must strictly preserve Jost as --font-body');
  assert.ok(mainCss.includes("font-family: 'Jost'"), 'main.css must keep Jost local @font-face');

  // Verify headings are not using Geist
  assert.ok(!mainCss.includes("--font-head:'Geist'"), 'main.css must not use Geist for --font-head');
  assert.ok(!mainCss.includes("--font-heading:'Geist'"), 'main.css must not use Geist for --font-heading');
});

test('button styles feature crisp edges and omit fuzzy transforms/shadows', () => {
  const mainCss = fs.readFileSync(path.resolve('public/assets/css/main.css'), 'utf8');

  // Check .btn-brand has solid/crisp borders and no soft 24px blur
  assert.ok(!mainCss.includes('box-shadow:0 8px 24px rgba(100,156,8,0.4)'), 'Fuzzy 24px button glow must be removed');
  assert.ok(!mainCss.includes('.btn:hover{transform:translateY(-2px);}') && !mainCss.includes('.btn:hover { transform: translateY(-2px); }'), 'Button translateY transform causing subpixel blur on hover must be replaced with crisp state transitions');
});

test('page-title hero section has 44px heading and expanded description container', () => {
  const mainCss = fs.readFileSync(path.resolve('public/assets/css/main.css'), 'utf8');

  // Verify 44px heading
  assert.ok(mainCss.includes('font-size:44px;') || mainCss.includes('font-size: 44px;'), 'Page-title bar heading must be exactly 44px on desktop');
  assert.ok(!mainCss.includes('font-size:clamp(34px,4vw,52px);'), 'Previous 52px clamp must be removed from page-title bars');

  // Verify expanded description width (removing restrictive 70ch from hero sub)
  assert.ok(!mainCss.includes('.svc-hero-sub{color:rgba(255,255,255,0.90); margin:0 0 20px; font-size:clamp(15.5px,1.2vw,17.5px); line-height:1.6; max-width:70ch;}'), 'Restrictive 70ch max-width must be removed from page-title descriptions');
  assert.ok(mainCss.includes('max-width:88%;') || mainCss.includes('max-width: 88%;'), 'Page-title descriptions must expand to use ~85-90% (88%) of container');

  // Verify responsive scaling
  assert.ok(mainCss.includes('@media (max-width:1024px)') || mainCss.includes('@media (max-width: 1024px)'), 'Must include tablet breakpoint');
  assert.ok(mainCss.includes('@media (max-width:768px)') || mainCss.includes('@media (max-width: 768px)'), 'Must include mobile/tablet breakpoint');
  assert.ok(mainCss.includes('@media (max-width:480px)') || mainCss.includes('@media (max-width: 480px)'), 'Must include small mobile breakpoint');
});
