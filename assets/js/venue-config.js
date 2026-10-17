/**
 * NEO GAME CAFE — Centralized Business Configuration & Game Roster
 * 
 * All factual information is centralized here in accordance with the
 * verified business data specification. Unverified quantities or prices
 * are avoided to prevent misleading public-facing claims.
 */

window.NEO_CONFIG = {
  venue: {
    brandName: "NEO GAME CAFE & LOUNGE",
    tagline: "OYUNUN MERKEZİ.",
    subTitle: "PlayStation 5 VIP odaları, alt kat turnuva bilardo salonu, masaüstü strateji oyunları ve artisan espresso barı. Beylikdüzü’nde yeni nesil buluşma platformu.",
    locationBadge: "BEYLİKDÜZÜ // İSTANBUL",
    subDistrict: "Barış Mahallesi, Samsun Caddesi, Kır Sokak",
    fullAddress: "Barış Mahallesi, Samsun Caddesi, Kır Sokak, Prestij Konak Apt. No: 21 Dükkan: 8, 34520 Beylikdüzü / İstanbul",
    coordinates: {
      lat: 41.0053611,
      lng: 28.6536855
    },
    locationDescription: "Barış Mahallesi Samsun Caddesi Kır Sokak Prestij Konak Apt. No: 21 Dükkan: 8, Makyol Starbucks karşısı, Mikel Cafe yanı, Beylikdüzü, İstanbul.",
    phone: "+90 531 586 99 66",
    phoneTel: "tel:+905315869966",
    mapsUrl: "https://www.google.com/maps/place/NEO+GAME+CAFE/@41.0053611,28.6536855,17z/data=!3m1!4b1!4m6!3m5!1s0x14b55f93ffd352d3:0x1487a52ebf283f69!8m2!3d41.0053611!4d28.6536855!16s%2Fg%2F11fzf3s7sc",
    landmarks: [
      {
        tag: "[REFERANS 01]",
        title: "Starbucks Makyol",
        desc: "Tam Karşısı"
      },
      {
        tag: "[REFERANS 02]",
        title: "Mikel Cafe",
        desc: "Bitişik Komşusu"
      },
      {
        tag: "[ULAŞIM]",
        title: "Metrobüs & Meydan",
        desc: "Yürüme Mesafesinde"
      }
    ],
    hours: [
      { days: "Pazartesi – Perşembe", time: "10:00 – 02:00" },
      { days: "Cuma – Pazar", time: "10:00 – 03:00" }
    ]
  },

  /**
   * Active Campaign
   * 2 saat ve üzeri oyun oynayana patlamış mısır ve kutu kola ücretsiz
   */
  campaign: {
    id: "2-hours-popcorn-cola",
    status: "AKTİF KAMPANYA",
    badge: "ÖZEL OYUN KAMPANYASI",
    title: "2 SAAT OYNAYANA PATLAMIŞ MISIR & KOLA ÜCRETSİZ!",
    shortSummary: "2 Saat ve Üzeri Seanslarda Masaya Patlamış Mısır ve Kutu Kola İkram!",
    description: "PlayStation VIP localarında veya bilardo salonumuzda kesintisiz 2 saat ve üzeri oyun seansı alan tüm misafirlerimize sıcak taze patlamış mısır ve buz gibi kutu Coca-Cola masaya ikram!",
    price: "0 ₺",
    originalValue: "80 ₺ + Mısır",
    perks: [
      { title: "2 Saat Oyun Seansı", desc: "VIP PS5, Bilardo veya Masa Oyunları" },
      { title: "Sıcak Patlamış Mısır", desc: "Taze patlatılmış sinema boy porsiyon" },
      { title: "Kutu Coca-Cola", desc: "Buz gibi soğuk meşrubat (330ml)" }
    ]
  },

  /**
   * Configurable Games Roster
   * Note: Flagged for venue owner verification before final tournament publication.
   */
  games: {
    fc27: {
      id: "fc27",
      index: "001",
      title: "EA SPORTS FC 27",
      category: "FUTBOL / REKABETÇİ",
      badge: "POPÜLER TERCİH",
      shortSummary: "1v1, 2v2 Pro Club & Turnuva Eşleşmeleri",
      description: "Yeni nesil futbol heyecanı ve akıcı maç deneyimi. İki veya dört kollu turnuva masalarında arkadaş grubunla kozlarını paylaş.",
      image: "assets/images/game-fc27.jpg",
      fallbackImage: "assets/images/game-fc27.jpg",
      specs: [
        { label: "[KONTROLÖR]", value: "Çok Oyunculu Kol Desteği" },
        { label: "[EKRAN]", value: "Geniş Ekran TV" },
        { label: "[MOD]", value: "1v1 / 2v2 Turnuva" }
      ],
      ctaText: "BİZİ ARA & BİLGİ AL (+90 531 586 99 66)"
    },

    nba27: {
      id: "nba27",
      index: "002",
      title: "NBA 2K27",
      category: "BASKETBOL / HARDCOURT",
      badge: "4 OYUNCU DESTEĞİ",
      shortSummary: "Gerçekçi Parke Dinamikleri & Blacktop",
      description: "Parkenin en gerçekçi basketbol rekabeti, Blacktop sokak maçları ve seriler. Arkadaşlarınla hızlı maçlar ve kupa turnuvaları.",
      image: "assets/images/game-nba27.jpg",
      fallbackImage: "assets/images/game-nba27.jpg",
      specs: [
        { label: "[KONTROLÖR]", value: "Konsol Kontrolcüsü" },
        { label: "[EKRAN]", value: "Geniş Ekran Panel" },
        { label: "[MOD]", value: "Blacktop & All-Star" }
      ],
      ctaText: "BİZİ ARA & BİLGİ AL (+90 531 586 99 66)"
    },

    tekken8: {
      id: "tekken8",
      index: "003",
      title: "TEKKEN 8",
      category: "DÖVÜŞ / ARCADE ARENA",
      badge: "DÖVÜŞ ARENASI",
      shortSummary: "1v1 Hızlı Raundlar & Heat Gauge Düellosu",
      description: "Yüksek tempolu dövüş mekanikleri ve kombo mücadeleleri. Bire bir düellolarla arkadaşlarına meydan oku.",
      image: "assets/images/game-tekken8.jpg",
      fallbackImage: "assets/images/game-tekken8.jpg",
      specs: [
        { label: "[KONTROLÖR]", value: "Konsol Kontrolcüsü" },
        { label: "[EKRAN]", value: "Akıcı Ekran Deneyimi" },
        { label: "[MOD]", value: "1v1 Turnuva / Karşılaşma" }
      ],
      ctaText: "BİZİ ARA & BİLGİ AL (+90 531 586 99 66)"
    },

    gt7: {
      id: "gt7",
      index: "004",
      title: "GRAN TURISMO 7",
      category: "SİMÜLASYON / MOTORSPORTS",
      badge: "KOKPİT STANDI",
      shortSummary: "Pist Mücadelesi & Zamana Karşı Yarış",
      description: "Gerçekçi pist aerodinamiği ve kokpit heyecanı. Dünyanın en zorlu pistlerinde arkadaşlarınla milisaniyelik tur derecelerini yarıştır.",
      image: "assets/images/game-gt7.jpg",
      fallbackImage: "assets/images/game-gt7.jpg",
      specs: [
        { label: "[KONTROLÖR]", value: "Yarış Kontrolcüsü" },
        { label: "[EKRAN]", value: "Geniş Ekran Panel" },
        { label: "[MOD]", value: "Pist & Zamana Karşı" }
      ],
      ctaText: "BİZİ ARA & BİLGİ AL (+90 531 586 99 66)"
    }
  },

  /**
   * Verified Menu Configuration
   * Accurately reflects venue pricing: coffees, cold beverages, and kitchen items.
   */
  menu: {
    categories: [
      { id: "all", name: "TÜMÜ", count: 16 },
      { id: "kahveler", name: "KAHVELER", count: 6 },
      { id: "soguk-icecekler", name: "SOĞUK İÇECEKLER", count: 6 },
      { id: "mutfak-tost", name: "MUTFAK & TOSTLAR", count: 4 }
    ],
    items: [
      // KAHVELER
      {
        id: "ice-latte",
        categoryId: "kahveler",
        title: "Ice Latte",
        categoryName: "KAHVELER",
        badge: "SOĞUK KAHVE",
        description: "Taze çekilmiş espresso shot, soğuk süt ve buzun dengeli buluşması.",
        image: "assets/images/menu/ice-latte.png",
        prices: [
          { label: "Küçük Boy", amount: "100 ₺" },
          { label: "Orta Boy", amount: "150 ₺" }
        ],
        highlightPrice: "100 ₺ / 150 ₺"
      },
      {
        id: "ice-americano",
        categoryId: "kahveler",
        title: "Ice Americano",
        categoryName: "KAHVELER",
        badge: "SOĞUK KAHVE",
        description: "Yoğun çift shot espresso ve soğuk filtrelenmiş su ile berrak ferahlık.",
        image: "assets/images/menu/ice-americano.png",
        prices: [
          { label: "Küçük Boy", amount: "100 ₺" },
          { label: "Orta Boy", amount: "150 ₺" }
        ],
        highlightPrice: "100 ₺ / 150 ₺"
      },
      {
        id: "cold-brew",
        categoryId: "kahveler",
        title: "Cold Brew",
        categoryName: "KAHVELER",
        badge: "ÖZEL DEMLEME",
        description: "18 saat yavaş soğuk damıtma yöntemiyle demlenmiş düşük asiditeli sert lezzet.",
        image: "assets/images/menu/cold-brew.png",
        prices: [
          { label: "Küçük Boy", amount: "100 ₺" },
          { label: "Orta Boy", amount: "150 ₺" }
        ],
        highlightPrice: "100 ₺ / 150 ₺"
      },
      {
        id: "latte",
        categoryId: "kahveler",
        title: "Latte",
        categoryName: "KAHVELER",
        badge: "SICAK KAHVE",
        description: "İpeksi mikro köpük, kadifemsi sıcak süt ve taze çekim espresso.",
        image: "assets/images/menu/latte.png",
        prices: [
          { label: "Küçük Boy", amount: "100 ₺" },
          { label: "Orta Boy", amount: "150 ₺" }
        ],
        highlightPrice: "100 ₺ / 150 ₺"
      },
      {
        id: "espresso",
        categoryId: "kahveler",
        title: "Espresso",
        categoryName: "KAHVELER",
        badge: "YOĞUN KAVRUM",
        description: "Yüksek basınç altında çekilen altın kremalı, yoğun gövdeli saf espresso.",
        image: "assets/images/menu/espresso.png",
        prices: [
          { label: "Tek Shot", amount: "100 ₺" },
          { label: "Double Shot", amount: "150 ₺" }
        ],
        highlightPrice: "100 ₺ / 150 ₺"
      },
      {
        id: "cay",
        categoryId: "kahveler",
        title: "Demleme Çay",
        categoryName: "KAHVELER",
        badge: "KLASİK DEMLEME",
        description: "Taze demlenmiş geleneksel Karadeniz harmanı berrak ince belli çay.",
        image: "assets/images/menu/tea.png",
        prices: [
          { label: "İnce Belli Bardak", amount: "40 ₺" }
        ],
        highlightPrice: "40 ₺"
      },

      // SOĞUK İÇECEKLER
      {
        id: "coca-cola",
        categoryId: "soguk-icecekler",
        title: "Coca-Cola",
        categoryName: "SOĞUK İÇECEKLER",
        badge: "MEŞRUBAT",
        description: "Buz gibi soğuk servis edilen orijinal Coca-Cola kutu.",
        image: "assets/images/menu/coca-cola.png",
        prices: [
          { label: "Kutu 330ml", amount: "80 ₺" }
        ],
        highlightPrice: "80 ₺"
      },
      {
        id: "red-bull",
        categoryId: "soguk-icecekler",
        title: "Red Bull Enerji İçeceği",
        categoryName: "SOĞUK İÇECEKLER",
        badge: "ENERJİ & ODAK",
        description: "Uzun turnuva ve maraton oyun seanslarında yüksek zihinsel odak ve canlılık.",
        image: "assets/images/menu/red-bull.png",
        prices: [
          { label: "Kutu 250ml", amount: "100 ₺" }
        ],
        highlightPrice: "100 ₺"
      },
      {
        id: "ice-tea",
        categoryId: "soguk-icecekler",
        title: "Ice Tea (Şeftali / Limon)",
        categoryName: "SOĞUK İÇECEKLER",
        badge: "SOĞUK ÇAY",
        description: "Ferahlatıcı meyve özleriyle soğuk demlenmiş ferah buzlu çay.",
        image: "assets/images/menu/ice-tea.png",
        prices: [
          { label: "Kutu 330ml", amount: "80 ₺" }
        ],
        highlightPrice: "80 ₺"
      },
      {
        id: "camlica-gazoz",
        categoryId: "soguk-icecekler",
        title: "Çamlıca Gazoz",
        categoryName: "SOĞUK İÇECEKLER",
        badge: "KLASİK GAZOZ",
        description: "Nostaljik ferahlık, cam şişe soğuk efsane Türk gazozu.",
        image: "assets/images/menu/camlica-gazoz.png",
        prices: [
          { label: "Cam Şişe 250ml", amount: "50 ₺" }
        ],
        highlightPrice: "50 ₺"
      },
      {
        id: "soda",
        categoryId: "soguk-icecekler",
        title: "Soda / Maden Suyu",
        categoryName: "SOĞUK İÇECEKLER",
        badge: "DOĞAL MİNERAL",
        description: "Doğal mineralli zengin kaynak suyu. Sade, limonlu veya elmalı çeşitleriyle.",
        image: "assets/images/menu/lemon-soda.png",
        prices: [
          { label: "Limon / Elma / Sade", amount: "40 ₺" }
        ],
        highlightPrice: "40 ₺"
      },
      {
        id: "su",
        categoryId: "soguk-icecekler",
        title: "Doğal Kaynak Suyu",
        categoryName: "SOĞUK İÇECEKLER",
        badge: "KAYNAK SUYU",
        description: "Serinletici saf ve dengeli pH değerli pet şişe doğal kaynak suyu.",
        image: "assets/images/menu/water-bottle.png",
        prices: [
          { label: "Şişe 500ml", amount: "20 ₺" }
        ],
        highlightPrice: "20 ₺"
      },

      // MUTFAK & TOSTLAR
      {
        id: "kasarli-tost",
        categoryId: "mutfak-tost",
        title: "Kaşarlı Tost",
        categoryName: "MUTFAK & TOSTLAR",
        badge: "SICAK TOST",
        description: "Özel tereyağlı çıtır ekmek arasında bol eriyen taze kaşar peyniri ve domates.",
        image: "assets/images/menu/sandwich-kasarli.png",
        prices: [
          { label: "Porsiyon", amount: "150 ₺" }
        ],
        highlightPrice: "150 ₺"
      },
      {
        id: "karisik-tost",
        categoryId: "mutfak-tost",
        title: "Karışık Tost",
        categoryName: "MUTFAK & TOSTLAR",
        badge: "ŞEFİN FAVORİSİ",
        description: "Baharatlı kaliteli kasap sucuk, bol kaşar peyniri ve tereyağı lezzeti.",
        image: "assets/images/menu/sandwich-karisik.png",
        prices: [
          { label: "Porsiyon", amount: "220 ₺" }
        ],
        highlightPrice: "220 ₺"
      },
      {
        id: "bol-sucuklu-tost",
        categoryId: "mutfak-tost",
        title: "Karışık Bol Sucuklu Tost",
        categoryName: "MUTFAK & TOSTLAR",
        badge: "MAKSİMUM LEZZET",
        description: "Ekstra çift porsiyon kasap sucuğu, bol eriyen kaşar peyniri ve çıtır kızarmış ekmek.",
        image: "assets/images/menu/sandwich-bol-sucuklu.png",
        prices: [
          { label: "Doyurucu Porsiyon", amount: "240 ₺" }
        ],
        highlightPrice: "240 ₺"
      },
      {
        id: "tavuk-pilav",
        categoryId: "mutfak-tost",
        title: "Tavuk Pilav",
        categoryName: "MUTFAK & TOSTLAR",
        badge: "ANA ÖĞÜN",
        description: "Tereyağlı, nohutlu tane tane sıcak pirinç pilavı üzerine bol tiftik tavuk göğsü ve taze çekilmiş karabiber.",
        image: "assets/images/menu/tavuk-pilav.png",
        prices: [
          { label: "Doyurucu Tabak", amount: "220 ₺" }
        ],
        highlightPrice: "220 ₺"
      }
    ]
  },

  /**
   * Verified In-Store Venue Gallery
   */
  gallery: [
    {
      id: "venue-4",
      image: "assets/images/venue/venue-4.jpg",
      title: "Dış Cephe & Cadde Girişi",
      tag: "CADDE GİRİŞİ",
      description: "Prestij Konak Apt. önü müstakil girişimiz, dış oturma alanı ve kırmızı LED tabelamız."
    },
    {
      id: "venue-3",
      image: "assets/images/venue/venue-3.jpg",
      title: "VIP Konsol Locaları",
      tag: "ÖZEL KABİNLER",
      description: "Özel neo CAFE logolu akrilik kabinler ve amber LED aydınlatmalı bağımsız oyun odaları."
    },
    {
      id: "venue-2",
      image: "assets/images/venue/venue-2.jpg",
      title: "Artisan Kafe Bar & Danışma",
      tag: "KAFE BARI",
      description: "Taze espresso çekim makineleri, neon yönlendirme tabelaları ve bar bankosu."
    },
    {
      id: "venue-1",
      image: "assets/images/venue/venue-1.jpg",
      title: "Konsol Locaları & TV",
      tag: "OYUN ALANI",
      description: "Büyük ekran TV üniteleri ve rahat koltuk düzeniyle kesintisiz futbol ve aksiyon deneyimi."
    },
    {
      id: "venue-5",
      image: "assets/images/venue/venue-5.jpg",
      title: "Orijinal Işıklı Menü Panosu",
      tag: "IŞIKLI MENÜ",
      description: "Dükkandaki tescilli LED içecek menüsü tabelası ve @neogamecafe topluluğu."
    }
  ]
};
