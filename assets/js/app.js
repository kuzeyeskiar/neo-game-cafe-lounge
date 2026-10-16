/**
 * NEO GAME CAFE — Radical Kinetic Editorial UI Logic
 * Includes React Bits inspired micro-interactions (SplitText, Magnet, Spotlight),
 * interactive game selector, responsive navigation, and accessible state management.
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.NEO_CONFIG;
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =========================================================================
  // 1. REACT BITS: SPLIT TEXT ANIMATION
  // =========================================================================
  function initSplitText() {
    if (prefersReduced) return;
    const targets = document.querySelectorAll('.split-text-target');
    targets.forEach(el => {
      const text = el.textContent.trim();
      const words = text.split(/\s+/);
      el.innerHTML = '';
      
      let charIndex = 0;
      words.forEach(word => {
        const wordSpan = document.createElement('span');
        wordSpan.className = 'split-word mr-3';
        
        for (let i = 0; i < word.length; i++) {
          const charSpan = document.createElement('span');
          charSpan.className = 'split-char';
          charSpan.textContent = word[i];
          charSpan.style.transitionDelay = `${charIndex * 40}ms`;
          wordSpan.appendChild(charSpan);
          charIndex++;
        }
        el.appendChild(wordSpan);
      });

      // Trigger reveal
      requestAnimationFrame(() => {
        setTimeout(() => el.classList.add('split-text-ready'), 100);
      });
    });
  }

  // =========================================================================
  // 2. REACT BITS: MAGNET BUTTON INTERACTION
  // =========================================================================
  function initMagnet() {
    if (prefersReduced || window.innerWidth < 1024) return;
    const magnets = document.querySelectorAll('.magnet-target');
    magnets.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) * 0.28;
        const deltaY = (e.clientY - centerY) * 0.28;
        btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // =========================================================================
  // 3. REACT BITS: SPOTLIGHT CARD EFFECT
  // =========================================================================
  function initSpotlight() {
    if (prefersReduced) return;
    const cards = document.querySelectorAll('.spotlight-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    });
  }

  // =========================================================================
  // 4. GAME SELECTOR CONTROLLER
  // =========================================================================
  const gameRows = document.querySelectorAll('.game-row');
  const previewImg = document.getElementById('preview-img');
  const previewTitle = document.getElementById('preview-title');
  const previewCat = document.getElementById('preview-cat');
  const previewBadge = document.getElementById('preview-badge');
  const previewDesc = document.getElementById('preview-desc');
  const previewCta = document.getElementById('preview-cta');
  const previewSpecs = document.getElementById('preview-specs');

  function renderGameStage(gameId) {
    if (!config || !config.games || !config.games[gameId]) return;
    const game = config.games[gameId];

    // Update active row visual states
    gameRows.forEach(row => {
      const isTarget = row.getAttribute('data-game-id') === gameId;
      row.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      
      const indicator = row.querySelector('.indicator-dot');
      const indexText = row.querySelector('.row-index');
      const catText = row.querySelector('.row-cat');
      const summaryText = row.querySelector('.row-summary');

      if (isTarget) {
        row.classList.remove('bg-carbon-surface');
        row.classList.add('bg-blood-red', 'active-selection');
        if (indicator) {
          indicator.className = 'w-2.5 h-2.5 rounded-full bg-pure-white animate-pulse indicator-dot';
        }
        if (indexText) indexText.className = 'row-index font-label-index text-label-index tracking-widest text-pure-white font-bold';
        if (catText) catText.className = 'row-cat font-label-code text-label-code uppercase tracking-wider text-pure-white font-bold';
        if (summaryText) summaryText.className = 'row-summary font-body-sm text-body-sm text-pure-white/90 max-w-md';
      } else {
        row.classList.remove('bg-blood-red', 'active-selection');
        row.classList.add('bg-carbon-surface');
        if (indicator) {
          indicator.className = 'w-2 h-2 rounded-full bg-surface-bright group-hover:bg-blood-red indicator-dot';
        }
        if (indexText) indexText.className = 'row-index font-label-index text-label-index tracking-widest text-soft-grey group-hover:text-pure-white/80';
        if (catText) catText.className = 'row-cat font-label-code text-label-code uppercase tracking-wider text-soft-grey group-hover:text-pure-white/90';
        if (summaryText) summaryText.className = 'row-summary font-body-sm text-body-sm text-soft-grey group-hover:text-pure-white/80 max-w-md';
      }
    });

    // Update preview stage text
    if (previewTitle) previewTitle.textContent = game.title;
    if (previewCat) previewCat.textContent = game.category;
    if (previewBadge) previewBadge.textContent = game.badge;
    if (previewDesc) previewDesc.textContent = game.description;

    // Update specs badges
    if (previewSpecs && game.specs) {
      previewSpecs.innerHTML = game.specs.map(spec => `
        <div class="p-space-xs bg-surface-container flex flex-col border border-charcoal-black/40">
          <span class="font-label-index text-label-index text-soft-grey uppercase">${spec.label}</span>
          <span class="font-label-code text-label-code text-pure-white font-bold text-xs">${spec.value}</span>
        </div>
      `).join('');
    }

    // Update CTA button text & destination
    if (previewCta) {
      previewCta.textContent = game.ctaText || "BİZİ ARA & BİLGİ AL";
      previewCta.href = config.venue.phoneTel;
    }

    // Image crossfade with fallback
    if (previewImg) {
      if (prefersReduced) {
        previewImg.src = game.image;
        previewImg.alt = game.title;
      } else {
        previewImg.classList.add('opacity-40');
        setTimeout(() => {
          previewImg.src = game.image;
          previewImg.alt = game.title;
          previewImg.classList.remove('opacity-40');
        }, 120);
      }
    }
  }

  // Bind game row click & keyboard triggers
  gameRows.forEach(row => {
    const gameId = row.getAttribute('data-game-id');
    
    row.addEventListener('click', () => {
      renderGameStage(gameId);
    });

    row.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        renderGameStage(gameId);
      }
    });

    // Subtle desktop hover preview
    row.addEventListener('mouseenter', () => {
      if (window.innerWidth > 1024) {
        renderGameStage(gameId);
      }
    });
  });

  // Handle image error fallbacks gracefully
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      const fallback = this.getAttribute('data-fallback');
      if (fallback && this.src !== fallback) {
        this.src = fallback;
      }
    });
  });

  // =========================================================================
  // 5. MOBILE DRAWER NAVIGATION
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileDrawerBackdrop = document.getElementById('mobile-drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const menuIcon = document.getElementById('menu-icon');

  function openDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('translate-x-full');
    mobileDrawerBackdrop.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    if (menuIcon) menuIcon.textContent = 'close';
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('translate-x-full');
    mobileDrawerBackdrop.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    if (menuIcon) menuIcon.textContent = 'menu';
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = !mobileDrawer.classList.contains('translate-x-full');
      if (isOpen) closeDrawer();
      else openDrawer();
    });
  }

  if (mobileDrawerBackdrop) {
    mobileDrawerBackdrop.addEventListener('click', closeDrawer);
  }

  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeDrawer);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && !mobileDrawer.classList.contains('translate-x-full')) {
      closeDrawer();
    }
  });

  // =========================================================================
  // 6. SMOOTH SCROLL WITH HEADER OFFSET
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReduced ? 'auto' : 'smooth'
        });
      }
    });
  });

  // =========================================================================
  // 7. MAPLIBRE GL JS (CARTO DARK MATTER EMBED LIKE KUZEYESKIAR.COM.TR)
  // =========================================================================
  function initMap() {
    const mapContainer = document.getElementById('venue-map');
    if (!mapContainer || typeof maplibregl === 'undefined') return;

    try {
      // Exact Coordinates for Konformist Residence, Barış Mah., Akdeniz Cad., Beylikdüzü
      const coords = [28.6536855, 41.0053611]; // [Lng, Lat]

      const map = new maplibregl.Map({
        container: 'venue-map',
        style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
        center: coords,
        zoom: 15.6,
        pitch: 45,
        bearing: -10,
        attributionControl: true,
        cooperativeGestures: true
      });

      // Remove static fallback image once tiles load
      map.on('load', () => {
        const fallback = document.getElementById('map-fallback');
        if (fallback) fallback.remove();
      });

      // Add navigation controls (zoom & compass) at bottom-right
      map.addControl(new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: true
      }), 'bottom-right');

      // Custom marker element matching kuzeyeskiar.com.tr style
      const el = document.createElement('div');
      el.className = 'relative cursor-pointer group';
      el.innerHTML = `
        <div class="relative flex flex-col items-center justify-center -mt-8 cursor-pointer">
          <div class="relative z-10 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] transform group-hover:scale-110 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-charcoal-black">
              <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0z"></path>
              <circle cx="12" cy="10" r="3" fill="#AA0001"></circle>
            </svg>
          </div>
          <div class="absolute -bottom-1 w-7 h-7 rounded-full bg-blood-red/40 animate-ping z-0"></div>
          <div class="absolute -bottom-1 w-3 h-3 rounded-full bg-blood-red shadow-[0_0_12px_rgba(170,0,1,1)] z-0"></div>
        </div>
      `;

      // Popup with verified address details
      const popup = new maplibregl.Popup({ offset: 25, closeButton: false, closeOnClick: false })
        .setHTML(`
          <div class="p-3 bg-charcoal-black text-pure-white border border-white/20 shadow-2xl rounded-lg font-sans">
            <div class="font-headline-md font-bold text-blood-red uppercase tracking-wider text-xs">NEO GAME CAFE &amp; LOUNGE</div>
            <div class="text-[11px] text-pure-white font-medium mt-1">Konformist Residence</div>
            <div class="text-[10px] text-soft-grey leading-tight">Barış Mah. Akdeniz Cad. Kır Çiçeği Sk.</div>
            <a href="https://www.google.com/maps/place/NEO+GAME+CAFE/@41.0053611,28.6536855,17z/data=!3m1!4b1!4m6!3m5!1s0x14b55f93ffd352d3:0x1487a52ebf283f69!8m2!3d41.0053611!4d28.6536855!16s%2Fg%2F11fzf3s7sc" target="_blank" rel="noopener noreferrer" class="inline-block mt-2 text-[10px] text-blood-red font-bold hover:underline uppercase tracking-wider">
              Yol Tarifi Al ↗
            </a>
          </div>
        `);

      new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat(coords)
        .setPopup(popup)
        .addTo(map);

      // Show popup by default
      popup.addTo(map);
    } catch (err) {
      console.warn('MapLibre init notice (fallback retained):', err);
    }
  }

  // =========================================================================
  // 8. MENU FILTERING & CATEGORY SYSTEM
  // =========================================================================
  function initMenu() {
    const filterBtns = document.querySelectorAll('.menu-filter-btn');
    const menuCards = document.querySelectorAll('.menu-item-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetCategory = btn.getAttribute('data-menu-category');

        // Update button active visual state
        filterBtns.forEach(b => {
          b.setAttribute('aria-selected', 'false');
          b.classList.remove('bg-blood-red', 'text-pure-white', 'shadow-md');
          b.classList.add('bg-carbon-surface', 'text-soft-grey', 'border', 'border-white/10');
        });

        btn.setAttribute('aria-selected', 'true');
        btn.classList.remove('bg-carbon-surface', 'text-soft-grey', 'border', 'border-white/10');
        btn.classList.add('bg-blood-red', 'text-pure-white', 'shadow-md');

        // Filter cards with subtle motion
        menuCards.forEach(card => {
          const cardCat = card.getAttribute('data-category');
          if (targetCategory === 'all' || cardCat === targetCategory || (cardCat && cardCat.split(' ').includes(targetCategory))) {
            card.classList.remove('hidden');
            if (!prefersReduced) {
              card.style.opacity = '0';
              card.style.transform = 'translateY(6px)';
              setTimeout(() => {
                card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, 20);
            }
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // =========================================================================
  // 9. DYNAMIC QR CODE GENERATOR & TABLE STAND ACTIONS
  // =========================================================================
  function initQRCode() {
    // Dynamic Menu URL pointing to current origin + pathname + #menu
    let menuUrl = window.location.origin + window.location.pathname.replace(/\/$/, '') + '/#menu';
    // If running on file:// or origin is null, use verified tunnel/fallback URL
    if (!window.location.origin || window.location.origin === 'null' || window.location.protocol === 'file:') {
      menuUrl = 'https://pumps-synthetic-queen-evaluating.trycloudflare.com/#menu';
    }

    const qrTextEl = document.getElementById('qr-target-url-text');
    if (qrTextEl) {
      qrTextEl.textContent = menuUrl;
    }

    const qrContainer = document.getElementById('menu-qrcode-container');

    if (qrContainer && typeof QRCode !== 'undefined') {
      try {
        qrContainer.innerHTML = '';
        new QRCode(qrContainer, {
          text: menuUrl,
          width: 180,
          height: 180,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H
        });
      } catch (e) {
        console.warn('QR code generation notice:', e);
      }
    }
  }

  // =========================================================================
  // 7. HERO VIDEO PLAYER CONTROLS (AUTOPLAY, AUDIO TOGGLE, PLAY/PAUSE)
  // =========================================================================
  function initHeroVideo() {
    const video = document.getElementById('hero-video');
    const soundBtn = document.getElementById('hero-video-sound-btn');
    const soundIcon = document.getElementById('hero-sound-icon');
    const soundText = document.getElementById('hero-sound-text');
    const playBtn = document.getElementById('hero-video-play-btn');
    const playIcon = document.getElementById('hero-play-icon');

    if (!video) return;

    // Autoplay ensure
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay may be restricted until user interacts
      });
    }

    // Toggle Audio (Mute / Unmute)
    if (soundBtn) {
      soundBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        video.muted = !video.muted;
        if (video.muted) {
          if (soundIcon) soundIcon.textContent = 'volume_off';
          if (soundText) soundText.textContent = 'SESİ AÇ';
          soundBtn.classList.remove('bg-blood-red');
          soundBtn.classList.add('bg-charcoal-black/85');
        } else {
          if (soundIcon) soundIcon.textContent = 'volume_up';
          if (soundText) soundText.textContent = 'SESİ KAPAT';
          soundBtn.classList.add('bg-blood-red');
          soundBtn.classList.remove('bg-charcoal-black/85');
          // If video was paused, unmuting should also ensure playback
          if (video.paused) {
            video.play();
            if (playIcon) playIcon.textContent = 'pause';
          }
        }
      });
    }

    // Toggle Play / Pause
    if (playBtn) {
      playBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (video.paused) {
          video.play();
          if (playIcon) playIcon.textContent = 'pause';
        } else {
          video.pause();
          if (playIcon) playIcon.textContent = 'play_arrow';
        }
      });
    }

    // Sync play state
    video.addEventListener('play', () => {
      if (playIcon) playIcon.textContent = 'pause';
    });
    video.addEventListener('pause', () => {
      if (playIcon) playIcon.textContent = 'play_arrow';
    });
  }

  // =========================================================================
  // 8. MEKAN GALERİSİ & LIGHTBOX MODAL CONTROLLER
  // =========================================================================
  function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const modal = document.getElementById('gallery-lightbox-modal');
    const lightboxImg = document.getElementById('gallery-lightbox-img');
    const lightboxTitle = document.getElementById('gallery-lightbox-title');
    const lightboxCounter = document.getElementById('gallery-lightbox-counter');
    const lightboxDesc = document.getElementById('gallery-lightbox-desc');
    const closeBtn = document.getElementById('gallery-close-btn');
    const prevBtn = document.getElementById('gallery-prev-btn');
    const nextBtn = document.getElementById('gallery-next-btn');

    if (!modal || galleryItems.length === 0) return;

    let currentIndex = 0;
    const itemsData = [];

    galleryItems.forEach((item, idx) => {
      const img = item.getAttribute('data-img') || '';
      const title = item.getAttribute('data-title') || '';
      const desc = item.getAttribute('data-desc') || '';
      itemsData.push({ img, title, desc });

      item.addEventListener('click', () => {
        openLightbox(idx);
      });
    });

    function updateLightbox(idx) {
      if (idx < 0) idx = itemsData.length - 1;
      if (idx >= itemsData.length) idx = 0;
      currentIndex = idx;

      const current = itemsData[currentIndex];
      if (lightboxImg) {
        lightboxImg.style.opacity = '0.3';
        lightboxImg.src = current.img;
        lightboxImg.onload = () => {
          lightboxImg.style.opacity = '1';
        };
      }
      if (lightboxTitle) lightboxTitle.textContent = current.title;
      if (lightboxCounter) lightboxCounter.textContent = `[ ${currentIndex + 1} / ${itemsData.length} ]`;
      if (lightboxDesc) lightboxDesc.textContent = current.desc;
    }

    function openLightbox(idx) {
      updateLightbox(idx);
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.classList.add('overflow-hidden');
    }

    function closeLightbox() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    }

    window.openGalleryLightbox = openLightbox;
    window.closeGalleryLightbox = closeLightbox;

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(currentIndex - 1);
    });
    if (nextBtn) nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      updateLightbox(currentIndex + 1);
    });

    // Close on backdrop click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeLightbox();
    });

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (modal.classList.contains('hidden')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') updateLightbox(currentIndex - 1);
      if (e.key === 'ArrowRight') updateLightbox(currentIndex + 1);
    });
  }

  // Initialize micro-interactions & controllers
  initSplitText();
  initMagnet();
  initSpotlight();
  initMap();
  initMenu();
  initQRCode();
  initHeroVideo();
  initGallery();

  // Initial stage render
  renderGameStage('fc27');
});

