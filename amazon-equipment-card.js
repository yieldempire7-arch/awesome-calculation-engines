/**
 * ToolsVault & Micro-Hubs Universal Amazon Commercial Equipment Decks
 * Central Tag: resellerhub20-20
 * Auto-detects niche from URL path and renders responsive high-ticket commercial hardware cards.
 */
(function() {
  const TAG = 'resellerhub20-20';

  const HARDWARE_CATALOG = {
    realestate: [
      { name: 'FLIR ONE Pro Thermal Infrared Camera for iOS/Android', price: '$399', asin: 'B0728C7KND', rating: '4.7 ★' },
      { name: 'Bosch Blaze GLM50C 165-ft Bluetooth Laser Measure', price: '$99', asin: 'B01CG97972', rating: '4.8 ★' },
      { name: 'General Tools Pinless Digital Moisture Meter Scanner', price: '$44', asin: 'B00275F5O2', rating: '4.6 ★' }
    ],
    cleantech: [
      { name: 'EcoFlow DELTA 2 Max 2048Wh LiFePO4 Solar Power Station', price: '$1,299', asin: 'B0C77D5Q46', rating: '4.8 ★' },
      { name: 'Renogy 400 Watt 12V/24V Monocrystalline Solar Panel Kit', price: '$649', asin: 'B07CG6K41H', rating: '4.7 ★' },
      { name: 'Klein Tools CL800 600A Digital TRMS HVAC/Solar Multimeter', price: '$129', asin: 'B019CY4FB4', rating: '4.8 ★' }
    ],
    freight: [
      { name: 'Garmin dēzl OTR710 7" Commercial Truck GPS Navigator', price: '$399', asin: 'B09V7Y162F', rating: '4.6 ★' },
      { name: 'NOCO Boost Max GB500 20,000A Commercial 12V/24V Jump Starter', price: '$1,999', asin: 'B07V4TSS76', rating: '4.8 ★' },
      { name: 'DC Cargo Heavy-Duty Steel Ratcheting Cargo Load Locks (2-Pack)', price: '$119', asin: 'B07MGB5Z1R', rating: '4.8 ★' }
    ],
    heavy: [
      { name: 'Milwaukee M18 Cordless 2-Speed 10,000 PSI Grease Gun Kit', price: '$279', asin: 'B00HNUR04A', rating: '4.9 ★' },
      { name: 'DEWALT 20V MAX XR 1/2" High Torque Impact Wrench Kit (1400 ft-lbs)', price: '$399', asin: 'B09Y8YGFM9', rating: '4.9 ★' },
      { name: 'Vulcan Grade 70 3/8" x 20-ft Transport Towing Binder Chain', price: '$149', asin: 'B004UDT7MC', rating: '4.8 ★' }
    ],
    creator: [
      { name: 'Sony Alpha ZV-E10 4K Mirrorless Vlogger Camera Kit', price: '$698', asin: 'B09BBLH4SG', rating: '4.7 ★' },
      { name: 'Shure MV7X XLR Dynamic Broadcast Podcast Microphone', price: '$179', asin: 'B09774FQPS', rating: '4.8 ★' },
      { name: 'Elgato Stream Deck XL 32-Key Macro Studio Controller', price: '$249', asin: 'B07RL8H55Z', rating: '4.8 ★' }
    ],
    saas: [
      { name: 'CalDigit TS4 Thunderbolt 4 18-Port 98W Power Charging Dock', price: '$399', asin: 'B09GK8LBWS', rating: '4.6 ★' },
      { name: 'Logitech MX Master 3S Wireless Performance Mouse', price: '$99', asin: 'B09HM94VDS', rating: '4.8 ★' },
      { name: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard', price: '$199', asin: 'B0BY25Z38L', rating: '4.7 ★' }
    ],
    reseller: [
      { name: 'Rollo Commercial Grade Wireless Thermal Shipping Label Printer', price: '$279', asin: 'B01MA3EYC5', rating: '4.8 ★' },
      { name: 'MUNBYN Bluetooth Digital Postal Scale 66 lbs', price: '$39', asin: 'B088TBPQ8Z', rating: '4.7 ★' },
      { name: 'Socket Mobile S700 Bluetooth 1D/2D Barcode Scanner', price: '$229', asin: 'B01F29G84W', rating: '4.6 ★' }
    ],
    pet: [
      { name: 'SHELANDY 3.2HP Stepless High-Velocity Pet Grooming Force Dryer', price: '$89', asin: 'B06WLQPJ58', rating: '4.7 ★' },
      { name: 'Andis UltraEdge AGC Super 2-Speed Professional Dog Clipper', price: '$189', asin: 'B0018KVHBM', rating: '4.8 ★' },
      { name: 'Flying Pig Heavy Duty Stainless Steel Dog Grooming Tub', price: '$995', asin: 'B0170L3RFA', rating: '4.7 ★' }
    ],
    health: [
      { name: 'InBody H20N Smart Full Body Composition Analyzer Scale', price: '$349', asin: 'B07LGBYV7L', rating: '4.7 ★' },
      { name: 'HigherDOSE Infrared Sauna Blanket (Tourmaline & Clay)', price: '$699', asin: 'B09C2T8K8C', rating: '4.8 ★' },
      { name: 'The Cold Pod Portable Outdoor Ice Bath Chiller Tub', price: '$149', asin: 'B0BJQT33W7', rating: '4.6 ★' }
    ]
  };

  function detectNiche() {
    const path = (window.location.hostname + window.location.pathname).toLowerCase();
    if (/solar|energy|battery|bess|geothermal/i.test(path)) return 'cleantech';
    if (/freight|truck|cpm|haul/i.test(path)) return 'freight';
    if (/heavy|excavat|crane|loader/i.test(path)) return 'heavy';
    if (/creator|youtube|tiktok|stream/i.test(path)) return 'creator';
    if (/saas|dev|cloud|gpu|token/i.test(path)) return 'saas';
    if (/resell|ebay|poshmark|mercari|comic|card/i.test(path)) return 'reseller';
    if (/pet|dog|groom|board|vet/i.test(path)) return 'pet';
    if (/health|macro|glp1|contrast|fitness|tdee/i.test(path)) return 'health';
    return 'realestate';
  }

  function injectAmazonDeck() {
    const target = document.querySelector('.main-container, main, .calc-grid, body');
    if (target && !document.getElementById('tv-amazon-deck')) {
      const niche = detectNiche();
      const items = HARDWARE_CATALOG[niche] || HARDWARE_CATALOG.realestate;

      const deck = document.createElement('div');
      deck.id = 'tv-amazon-deck';
      deck.style.cssText = 'background: #0d121d; border: 1px solid #1e293b; border-radius: 12px; padding: 20px; margin-top: 28px; margin-bottom: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); clear: both;';

      let itemsHtml = '';
      items.forEach(it => {
        const link = 'https://www.amazon.com/dp/' + it.asin + '?tag=' + TAG;
        itemsHtml += `
          <div style="background: #06090f; border: 1px solid #1e293b; border-radius: 8px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 10px; color: #fbbf24; font-weight: 700;">${it.rating} Verified</span>
                <strong style="color: #34d399; font-size: 14px;">${it.price}</strong>
              </div>
              <p style="font-size: 12px; font-weight: 700; color: #fff; line-height: 1.4; margin: 0 0 12px 0;">${it.name}</p>
            </div>
            <a href="${link}" target="_blank" rel="noopener sponsored" style="display: block; text-align: center; background: #1e293b; border: 1px solid #334155; color: #38bdf8; text-decoration: none; padding: 8px; border-radius: 6px; font-size: 11px; font-weight: 700; transition: all 0.2s;">
              View on Amazon ➔
            </a>
          </div>
        `;
      });

      deck.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; border-bottom: 1px solid #1e293b; padding-bottom: 10px;">
          <strong style="color: #fff; font-size: 14px; display: flex; align-items: center; gap: 8px;">
            <span>📦</span> Recommended Operator Hardware &amp; Toolkits
          </strong>
          <span style="font-size: 10px; color: #64748b;">As an Amazon Associate we earn from qualifying purchases</span>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
          ${itemsHtml}
        </div>
      `;

      target.appendChild(deck);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(injectAmazonDeck, 1200));
  } else {
    setTimeout(injectAmazonDeck, 1200);
  }
})();
