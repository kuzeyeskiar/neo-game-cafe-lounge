const fs = require('fs');
const path = require('path');

console.log('--- NEO GAME CAFE AUTOMATED AUDIT & VERIFICATION ---');

let passed = true;

// 1. Check index.html exists
if (!fs.existsSync('index.html')) {
  console.error('FAIL: index.html missing');
  passed = false;
} else {
  console.log('PASS: index.html exists');
}

// 2. Check assets exist
const requiredImages = [
  'hero-player.jpg',
  'triptych-controllers.jpg',
  'triptych-billiards.jpg',
  'triptych-coffee.jpg',
  'game-fc27.jpg',
  'game-nba27.jpg',
  'game-tekken8.jpg',
  'game-gt7.jpg',
  'experience-ps5.jpg',
  'experience-billiards.jpg',
  'map-location.jpg',
  'menu/ice-latte.png',
  'menu/ice-americano.png',
  'menu/cold-brew.png',
  'menu/latte.png',
  'menu/espresso.png',
  'menu/tea.png',
  'menu/coca-cola.png',
  'menu/red-bull.png',
  'menu/sandwich-kasarli.png',
  'menu/sandwich-karisik.png',
  'menu/sandwich-bol-sucuklu.png',
  'menu/tavuk-pilav.png',
  'menu/qr-menu.png',
  'venue/venue-1.jpg',
  'venue/venue-2.jpg',
  'venue/venue-3.jpg',
  'venue/venue-4.jpg',
  'venue/venue-5.jpg',
  'venue/venue-6.jpg',
  'venue/venue-7.jpg',
  'triptych-snacks.jpg',
  'triptych-lounge.png',
  'menu/popcorn.png'
];

// Check video exists
if (!fs.existsSync('assets/videos/hero-video.mp4')) {
  console.error('FAIL: Missing hero-video.mp4');
  passed = false;
} else {
  const vSize = fs.statSync('assets/videos/hero-video.mp4').size;
  console.log(`PASS: Video hero-video.mp4 (${vSize} bytes)`);
}

requiredImages.forEach(img => {
  const p = path.join('assets/images', img);
  if (!fs.existsSync(p)) {
    console.error(`FAIL: Missing image asset ${p}`);
    passed = false;
  } else {
    const size = fs.statSync(p).size;
    console.log(`PASS: Asset ${img} (${size} bytes)`);
  }
});

// 3. Check for unsupported placeholder claims
const htmlContent = fs.readFileSync('index.html', 'utf8');
const forbiddenStrings = [
  '16 ÜNİTE',
  '%68',
  '34+ OYUN',
  '40+ OYUN ARŞİVİ',
  'ANINDA ONAY',
  'REZERVASYON: ANINDA ONAY',
  '41.0028° N',
  'SYS_VER: 2.8.4',
  'TERMINAL #03',
  'RADICAL KINETIC EDITORIAL',
  'poster="assets/images/hero-player.jpg"',
  'QR KODU İNDİR (PNG)',
  'MASA KARTI BASKISI (ÖNİZLE)',
  'table-stand-modal'
];

forbiddenStrings.forEach(str => {
  if (htmlContent.includes(str)) {
    console.error(`FAIL: Found unsupported/misleading string "${str}" in index.html`);
    passed = false;
  } else {
    console.log(`PASS: Forbidden string "${str}" cleanly removed`);
  }
});

// 4. Check for verified business info & menu items
const requiredVerifiedStrings = [
  '+90 531 586 99 66',
  'tel:+905315869966',
  'Makyol Starbucks karşısı',
  'Mikel Cafe',
  'Beylikdüzü',
  '10:00 – 02:00',
  '10:00 – 03:00',
  'Tavuk Pilav',
  'Red Bull',
  'Ice Latte',
  'Cold Brew',
  'Kaşarlı Tost',
  '220',
  '240',
  '150',
  '100',
  'id="mekan-galeri"',
  'id="gallery-lightbox-modal"',
  'id="hero-video-sound-btn"',
  'id="hero-video-play-btn"',
  'MEKAN &amp; GALERİ',
  'NEO GAME CAFE &amp; LOUNGE',
  'triptych-lounge.png',
  'triptych-snacks.jpg',
  'id="kampanya"',
  'PATLAMIŞ MISIR &amp; KOLA',
  '2 Saat Oyun Oynayana',
  'property="og:title"',
  'name="twitter:card"',
  'overflow-x-hidden',
  'id="map-fallback"'
];

requiredVerifiedStrings.forEach(str => {
  if (!htmlContent.includes(str)) {
    console.error(`FAIL: Verified business / menu detail "${str}" missing from index.html`);
    passed = false;
  } else {
    console.log(`PASS: Verified detail "${str}" present`);
  }
});

if (passed) {
  console.log('\n>>> ALL AUTOMATED AUDITS PASSED SUCCESSFULLY! <<<');
  process.exit(0);
} else {
  console.error('\n>>> SOME AUDITS FAILED! <<<');
  process.exit(1);
}
