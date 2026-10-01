/**
 * Universal GA4 & Outbound Affiliate Click Tracker
 * Privacy-friendly, zero-dependency client telemetry & GA4 bridge.
 * Tracks pageviews, time on tool, calculations, and outbound affiliate conversions.
 */
(function() {
  const GA_ID = window.GA_MEASUREMENT_ID || localStorage.getItem('tv_ga4_id') || null;

  // 1. Initialize Google Analytics 4 if measurement ID is provided
  if (GA_ID && !window.gtag) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { send_page_view: true });
  }

  // 1b. Auto-Initialize Cloudflare Web Analytics Beacon across all 6,000+ calculators
  if (!document.querySelector('script[data-cf-beacon]')) {
    const cfScript = document.createElement('script');
    cfScript.type = 'module';
    cfScript.src = 'https://static.cloudflareinsights.com/beacon.min.js';
    cfScript.setAttribute('data-cf-beacon', '{"token": "f2a4f27e48e4463a8e177d9035444ad1"}');
    document.head.appendChild(cfScript);
  }

  // 1c. Auto-Initialize Legal Compliance & AdSense Trust Footer (Excluded on Homepage)
  const curPath = (window.location.pathname || '').toLowerCase();
  const isHome = window.__TV_IS_HOMEPAGE__ === true || curPath === '/' || curPath === '/index.html' || curPath === '/index' || curPath === '' || curPath.endsWith('/') || curPath.endsWith('/index.html') || (typeof document !== 'undefined' && (document.body?.classList?.contains('tv-homepage-root') || document.getElementById('toolGrid') !== null || document.querySelector('.hero') !== null));
  if (!isHome && !document.getElementById('yield-empire-compliance-footer')) {
    const footerScript = document.createElement('script');
    footerScript.src = 'site-footer-compliance.js';
    document.head.appendChild(footerScript);
  }

  // 1d. Auto-Initialize Awin Publisher Master Tag (Publisher ID: 3064767)
  if (!document.querySelector('script[src*="dwin1.com"]')) {
    const awinScript = document.createElement('script');
    awinScript.defer = true;
    awinScript.src = 'https://www.dwin1.com/3064767.js';
    awinScript.type = 'text/javascript';
    document.head.appendChild(awinScript);
  }

  // 1e. Auto-Initialize Viral Backlink Embed Widget (Excluded on Homepage)
  if (!isHome && !document.getElementById('tv-embed-btn') && !document.querySelector('script[src*="embed-sidecar.js"]')) {
    const embedScript = document.createElement('script');
    embedScript.defer = true;
    embedScript.src = '/embed-sidecar.js';
    document.head.appendChild(embedScript);
  }

  // 1f. Auto-Initialize Google AdSense Master Client Tag (Publisher ID: ca-pub-5226765553295578)
  if (!document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
    const adsenseScript = document.createElement('script');
    adsenseScript.async = true;
    adsenseScript.crossOrigin = 'anonymous';
    adsenseScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5226765553295578';
    document.head.appendChild(adsenseScript);
  }

  // 1g. Auto-Initialize Digital Asset & Spreadsheet Upsell Sidecar (Excluded on Homepage)
  if (!isHome && !document.getElementById('tv-digital-asset-upsell') && !document.querySelector('script[src*="digital-asset-upsell.js"]')) {
    const upsellScript = document.createElement('script');
    upsellScript.defer = true;
    upsellScript.src = '/digital-asset-upsell.js';
    document.head.appendChild(upsellScript);
  }

  // 1h. Auto-Initialize Approved Udemy Learning & Certification Vouchers (Media Partner: 7704556)
  const isStore = curPath.includes('store') || curPath.includes('claim') || curPath.includes('order_confirmed');
  if (!isHome && !isStore && !document.getElementById('udemy-courses-card-container') && !document.querySelector('script[src*="udemy-courses-card.js"]')) {
    const udemyScript = document.createElement('script');
    udemyScript.defer = true;
    udemyScript.src = '/udemy-courses-card.js';
    document.head.appendChild(udemyScript);
  }

  // 1i. Auto-Initialize High-CTR EasyClaw AI Automation Partner Card (Awin ID: 126975)
  if (!isHome && !isStore && !document.getElementById('easyclaw-card-container') && !document.querySelector('script[src*="easyclaw-ai-card.js"]')) {
    const easyclawScript = document.createElement('script');
    easyclawScript.defer = true;
    easyclawScript.src = '/easyclaw-ai-card.js';
    document.head.appendChild(easyclawScript);
  }

  // 1j. Auto-Initialize ProtoArc Ergonomics & Prime Big Deal Days Card (Impact ID: 56905)
  const isErgoOrDesk = curPath.includes('desk') || curPath.includes('ergo') || curPath.includes('remote') || curPath.includes('freelance') || curPath.includes('office') || curPath.includes('commute') || curPath.includes('work') || curPath.includes('developer') || curPath.includes('productivity') || curPath.includes('standing');
  if (!isHome && !isStore && isErgoOrDesk && !document.getElementById('protoarc-card-container') && !document.querySelector('script[src*="protoarc-card.js"]')) {
    const protoScript = document.createElement('script');
    protoScript.defer = true;
    protoScript.src = '/protoarc-card.js';
    document.head.appendChild(protoScript);
  }

  // 1k. Auto-Initialize Commercial Contractor Exit-Intent Downsell ($19 Starter Toolkit)
  const isCommercialOrTrade = curPath.includes('commercial') || curPath.includes('contractor') || curPath.includes('subcontractor') || curPath.includes('construction') || curPath.includes('bess') || curPath.includes('dscr') || curPath.includes('lender') || curPath.includes('roofing') || curPath.includes('hvac') || curPath.includes('plumbing') || curPath.includes('electrical') || curPath.includes('concrete') || curPath.includes('framing') || curPath.includes('cleaning');
  if (!isHome && !isStore && isCommercialOrTrade && !document.getElementById('tv-exit-downsell-modal') && !document.querySelector('script[src*="exit-intent-downsell.js"]')) {
    const downsellScript = document.createElement('script');
    downsellScript.defer = true;
    downsellScript.src = '/exit-intent-downsell.js';
    document.head.appendChild(downsellScript);
  }



  // 2. Track Local Telemetry (Stored in localStorage for MyRevenueDesk)
  function recordLocalEvent(category, action, label = '', value = 0) {
    const today = new Date().toISOString().split('T')[0];
    try {
      const summaryKey = 'tv_telemetry_summary';
      let summary = JSON.parse(localStorage.getItem(summaryKey) || '{}');
      if (!summary[today]) {
        summary[today] = { pageviews: 0, calculations: 0, affiliateClicks: 0, events: [] };
      }

      if (category === 'Pageview') summary[today].pageviews++;
      if (category === 'Calculation') summary[today].calculations++;
      if (category === 'Affiliate') summary[today].affiliateClicks++;

      summary[today].events.push({
        t: new Date().toLocaleTimeString(),
        c: category,
        a: action,
        l: label,
        v: value,
        page: window.location.pathname
      });

      // Keep only last 100 events to prevent quota bloat
      if (summary[today].events.length > 100) {
        summary[today].events = summary[today].events.slice(-100);
      }

      localStorage.setItem(summaryKey, JSON.stringify(summary));
    } catch (e) {
      // Storage quota safety
    }

    // Bridge to GA4 if enabled
    if (window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }

  // 3. Track Initial Pageview & Device Specs
  function initPageview() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const deviceType = isMobile ? 'Mobile' : 'Desktop';
    recordLocalEvent('Pageview', 'view_tool', `${document.title} (${deviceType})`);
  }

  // 4. Attach Outbound Affiliate Click Listeners
  function attachAffiliateListeners() {
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (!link || !link.href) return;

      const href = link.href;

      if (href.includes('tag=resellerhub20-20') || href.includes('amazon.com')) {
        recordLocalEvent('Affiliate', 'click_amazon_product', link.textContent.trim() || href);
      } else if (href.includes('awin1.com')) {
        recordLocalEvent('Affiliate', 'click_awin_merchant', link.textContent.trim() || href);
      } else if (href.includes('pxf.io') || href.includes('sjv.io') || href.includes('impact.com')) {
        recordLocalEvent('Affiliate', 'click_impact_partner', link.textContent.trim() || href);
      } else if (href.includes('dealmachine.com')) {
        recordLocalEvent('Affiliate', 'click_dealmachine', 'DealMachine Partner');
      } else if (href.includes('freecash.com')) {
        recordLocalEvent('Affiliate', 'click_freecash_bonus', 'Freecash $ZLLTM');
      } else if (href.includes('benjaminone.onelink.me')) {
        recordLocalEvent('Affiliate', 'click_benjamin_perk', 'Benjamin Cash Back');
      } else if (href.includes('trk.udemy.com') || href.includes('udemy.com')) {
        recordLocalEvent('Affiliate', 'click_udemy_partner', link.textContent.trim() || href);
      } else if (href.includes('awinmid=126975') || href.includes('easyclaw.com')) {
        recordLocalEvent('Affiliate', 'click_easyclaw_ai', link.textContent.trim() || href);
      } else if (href.includes('netlify.app') && !href.includes(window.location.host)) {
        recordLocalEvent('Navigation', 'cross_network_launch', href);
      }
    }, true);
  }

  // 5. Attach Calculation & Form Trigger Listeners
  function attachCalculatorListeners() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('input', debounce(function() {
        recordLocalEvent('Calculation', 'input_change', form.id || 'calc_form');
      }, 2500));
    });

    document.querySelectorAll('.share-calc-btn, .action-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        recordLocalEvent('Engagement', 'action_button_click', btn.textContent.trim());
      });
    });
  }

  function debounce(func, wait) {
    let timeout;
    return function() {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), wait);
    };
  }

  // Self-execute on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initPageview();
      attachAffiliateListeners();
      attachCalculatorListeners();
    });
  } else {
    initPageview();
    attachAffiliateListeners();
    attachCalculatorListeners();
  }

  window.TVTracker = {
    trackEvent: recordLocalEvent,
    getSummary: () => JSON.parse(localStorage.getItem('tv_telemetry_summary') || '{}')
  };
})();
