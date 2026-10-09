/**
 * ToolsVault Universal Global Command Palette & Predictive Search v2 (Ctrl+K / '/')
 * Instant sub-10ms fuzzy search across 6,663+ calculation engines, hubs, and tools.
 * Supports keyboard navigation (Arrow Up/Down, Enter, Escape, '/', Ctrl+K).
 */
(function() {
  'use strict';

  const FLAGSHIP_PRIORITY_TOOLS = [
    { title: "Commercial Solar PPA vs. Cash vs. Loan Calculator", url: "/commercial_solar_ppa_vs_cash_purchase_calculator", category: "Solar & Microgrids", tag: "2026 Underwriter" },
    { title: "50-State & Global Heat Pump Rebate Finder (IRA 25C / HEEHRA / Canada / UK / EU)", url: "/state_clean_energy_and_heat_pump_rebate_finder", category: "Clean Energy Grants", tag: "Rebate Finder" },
    { title: "Mini-Split vs Central Heat Pump Cost & Efficiency Calculator", url: "/mini_split_vs_central_heat_pump_cost_and_efficiency_calculator", category: "HVAC & Heat Pumps", tag: "Flagship" },
    { title: "Mini-Split Sizing & SEER2 Energy Savings Calculator", url: "/mini_split_sizing_and_seer2_energy_savings_calculator", category: "HVAC & Heat Pumps", tag: "BTU Sizer" },
    { title: "Commercial EV Fleet Fast-Charging & Solar Microgrid Underwriter", url: "/commercial_ev_fleet_charging_and_solar_microgrid_calculator", category: "Solar & Microgrids", tag: "Fleet Depot" },
    { title: "Contractor Exclusive Territory ROI & Profit Calculator ($49/mo)", url: "/contractor_roi_calculator", category: "Contractor Network", tag: "Territory ROI" },
    { title: "DSCR Loan vs Conventional Commercial Mortgage Underwriter", url: "/dscr_loan_vs_conventional_commercial_mortgage_calculator", category: "Commercial CRE", tag: "DSCR Model" },
    { title: "Webmaster Calculator Embed Studio & Widget Generator", url: "/embed_studio", category: "Publisher Tools", tag: "Embed Studio" },
    { title: "Claim Exclusive Contractor ZIP Code Territory ($49/mo)", url: "/contractor_network.html", category: "Contractor Network", tag: "$49/mo" },
    { title: "Find Verified Commercial Contractors by ZIP Code", url: "/find_a_contractor.html", category: "Contractor Directory", tag: "50 Metros" },
    { title: "Enterprise AI & GPU Compute Directory Hub", url: "/ai_and_gpu_compute_calculators_hub.html", category: "AI Compute", tag: "Hub" },
    { title: "NVIDIA H100 Cluster TCO & Token Inference Cost Calculator", url: "/h100_cluster_tco_and_token_inference_cost_calculator.html", category: "AI Compute", tag: "Calculator" },
    { title: "On-Prem vs Cloud GPU Depreciation & Energy ROI Calculator", url: "/on_prem_vs_cloud_gpu_depreciation_and_energy_roi_calculator.html", category: "AI Compute", tag: "Calculator" },
    { title: "Solar & Battery Storage Calculation Hub", url: "/solar_energy_storage_calculators.html", category: "Clean Energy", tag: "Hub" },
    { title: "Real Estate Investment & Property Yield Hub", url: "/real_estate_and_property_investment_calculators_hub.html", category: "Real Estate", tag: "Hub" },
    { title: "Contractor & Heavy Construction Takeoff Hub", url: "/contractor_and_heavy_construction_calculators_hub.html", category: "Contractor", tag: "Hub" },
    { title: "E-Commerce & Digital Creator Profit Hub", url: "/ecommerce_business_calculators.html", category: "E-Commerce", tag: "Hub" },
    { title: "FIRE & Personal Wealth Planning Hub", url: "/fire_personal_finance_calculators.html", category: "Wealth", tag: "Hub" },
    { title: "Top 50 US Metro Commercial Cost & Solar Index", url: "/metro_commercial_cost_and_solar_index.html", category: "Commercial", tag: "Index" },
    { title: "Developer REST API & OpenAPI 3.1 Documentation", url: "/developer_api_pricing_and_documentation.html", category: "API", tag: "OpenAPI 3.1" },
        { title: "Commercial Subcontractor Bid Estimator & Margin Calculator", url: "/commercial_subcontractor_bid_estimator.html", category: "Contractor & Trades", tag: "Flagship" },
    { title: "NVIDIA H100 Cluster TCO & Token Inference Cost Calculator", url: "/h100_cluster_tco_and_token_inference_cost_calculator.html", category: "AI & Compute", tag: "Institutional" },
    { title: "Commercial Real Estate DSCR & Debt Yield Underwriting Suite", url: "/commercial_cre_dscr_underwriting_model.html", category: "Real Estate & CRE", tag: "CRE Suite" }
  ];

  let FULL_CATALOG = null;
  let isFetching = false;
  let selectedIndex = 0;
  let currentRenderedItems = [];

  function loadFullCatalog() {
    if (FULL_CATALOG || isFetching) return;
    isFetching = true;
    if (window.TV_TOOLS_CATALOG && Array.isArray(window.TV_TOOLS_CATALOG)) {
      FULL_CATALOG = window.TV_TOOLS_CATALOG.map(item => ({
        title: item.t,
        url: item.u,
        category: item.c || 'Calculator',
        tag: 'Engine'
      }));
      return;
    }
    const script = document.createElement('script');
    script.src = '/tools-search-index.js';
    script.defer = true;
    script.onload = () => {
      if (window.TV_TOOLS_CATALOG && Array.isArray(window.TV_TOOLS_CATALOG)) {
        FULL_CATALOG = window.TV_TOOLS_CATALOG.map(item => ({
          title: item.t,
          url: item.u,
          category: item.c || 'Calculator',
          tag: 'Engine'
        }));
      }
    };
    document.head.appendChild(script);
  }

  function createCommandPalette() {
    if (document.getElementById('tv-cmd-palette-modal')) return;

    const curP = (window.location.pathname || '').toLowerCase();
    const isHome = (
      window.__TV_IS_HOMEPAGE__ === true ||
      document.body?.classList?.contains('tv-homepage-root') ||
      curP === '/' || curP === '/index.html' || curP === '/index' || curP === '' ||
      curP.endsWith('/') || curP.endsWith('/index.html') ||
      document.querySelector('.hero') !== null ||
      document.querySelector('.category-pills') !== null
    );

    // Trigger pill on bottom-left (skip on homepage)
    const triggerBtn = isHome ? null : document.createElement('button');
    triggerBtn.id = 'tv-cmd-trigger-btn';
    triggerBtn.setAttribute('aria-label', 'Open search palette');
    triggerBtn.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 24px;
      z-index: 9998;
      background: rgba(15, 23, 42, 0.90);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #94a3b8;
      font-size: 11px;
      font-weight: 700;
      padding: 7px 12px;
      border-radius: 9999px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 7px;
      box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);
      font-family: system-ui, -apple-system, sans-serif;
      transition: all 0.2s ease;
    `;
    triggerBtn.innerHTML = `
      <i class="fa-solid fa-magnifying-glass" style="color:#38bdf8; font-size:11px;"></i>
      <span>Search 6,648+ Tools</span>
      <kbd style="background:#1e293b; border:1px solid #334155; border-radius:4px; padding:1px 5px; font-family:monospace; color:#cbd5e1; font-size:10px;">Ctrl+K</kbd>
    `;
    if (triggerBtn) {
      triggerBtn.onmouseover = () => { triggerBtn.style.borderColor = '#38bdf8'; triggerBtn.style.color = '#fff'; };
      triggerBtn.onmouseout = () => { triggerBtn.style.borderColor = 'rgba(255, 255, 255, 0.12)'; triggerBtn.style.color = '#94a3b8'; };
    }
    if (triggerBtn) document.body.appendChild(triggerBtn);

    // Modal
    const modal = document.createElement('div');
    modal.id = 'tv-cmd-palette-modal';
    modal.style.cssText = `
      position: fixed;
      top: 0; left: 0; width: 100vw; height: 100vh;
      background: rgba(2, 6, 23, 0.85);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      z-index: 100000;
      display: none;
      align-items: flex-start;
      justify-content: center;
      padding-top: 12vh;
      font-family: system-ui, -apple-system, sans-serif;
    `;

    modal.innerHTML = `
      <div style="background:#0b1329; border:1px solid rgba(56, 189, 248, 0.3); border-radius:20px; width:92%; max-width:680px; box-shadow:0 25px 60px -15px rgba(0,0,0,0.9), 0 0 30px rgba(56, 189, 248, 0.12); overflow:hidden; display:flex; flex-direction:column; max-height:76vh;">
        
        <!-- Search Header -->
        <div style="display:flex; align-items:center; padding:16px 20px; border-bottom:1px solid rgba(255,255,255,0.08); gap:12px;">
          <i class="fa-solid fa-magnifying-glass" style="color:#38bdf8; font-size:16px;"></i>
          <input type="text" id="tv-cmd-input" placeholder="Search 6,648+ calculation tools, rebates, contractors, or guides..." style="flex:1; background:transparent; border:none; color:#f8fafc; font-size:15px; font-weight:600; outline:none;" autocomplete="off" spellcheck="false">
          <kbd id="tv-cmd-close-kbd" style="background:#1e293b; border:1px solid #334155; border-radius:6px; padding:3px 8px; font-family:monospace; color:#94a3b8; font-size:11px; cursor:pointer;">ESC</kbd>
        </div>

        <!-- Category Filter Pills -->
        <div style="display:flex; align-items:center; gap:6px; padding:10px 16px; border-bottom:1px solid rgba(255,255,255,0.05); overflow-x:auto; background:rgba(15,23,42,0.4);">
          <span style="font-size:10px; font-weight:700; color:#64748b; text-transform:uppercase; margin-right:4px;">Filter:</span>
          <button type="button" class="tv-cat-filter-btn" data-cat="ALL" style="background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:10px; font-weight:700; padding:3px 8px; cursor:pointer;">All</button>
          <button type="button" class="tv-cat-filter-btn" data-cat="Solar" style="background:#1e293b; color:#94a3b8; border:none; border-radius:6px; font-size:10px; font-weight:600; padding:3px 8px; cursor:pointer;">Solar & BESS</button>
          <button type="button" class="tv-cat-filter-btn" data-cat="HVAC" style="background:#1e293b; color:#94a3b8; border:none; border-radius:6px; font-size:10px; font-weight:600; padding:3px 8px; cursor:pointer;">Heat Pumps</button>
          <button type="button" class="tv-cat-filter-btn" data-cat="Contractor" style="background:#1e293b; color:#94a3b8; border:none; border-radius:6px; font-size:10px; font-weight:600; padding:3px 8px; cursor:pointer;">Contractors</button>
          <button type="button" class="tv-cat-filter-btn" data-cat="Real Estate" style="background:#1e293b; color:#94a3b8; border:none; border-radius:6px; font-size:10px; font-weight:600; padding:3px 8px; cursor:pointer;">CRE & DSCR</button>
          <button type="button" class="tv-cat-filter-btn" data-cat="AI Compute" style="background:#1e293b; color:#94a3b8; border:none; border-radius:6px; font-size:10px; font-weight:600; padding:3px 8px; cursor:pointer;">AI Compute</button>
        </div>

        <!-- Results Box -->
        <div id="tv-cmd-results" style="padding:12px; overflow-y:auto; flex:1; scrollbar-width:thin;"></div>

        <!-- Footer Shortcuts -->
        <div style="padding:10px 18px; border-top:1px solid rgba(255,255,255,0.08); background:rgba(15,23,42,0.8); display:flex; justify-content:space-between; align-items:center; font-size:11px; color:#64748b;">
          <span>Navigate: <kbd style="color:#cbd5e1;">&uarr;</kbd> <kbd style="color:#cbd5e1;">&darr;</kbd> &bull; Select: <kbd style="color:#cbd5e1;">&crarr;</kbd></span>
          <span style="color:#38bdf8; font-weight:700;">⚡ ToolsVault Instant Network Search</span>
        </div>

      </div>
    `;

    document.body.appendChild(modal);

    const input = document.getElementById('tv-cmd-input');
    const resultsBox = document.getElementById('tv-cmd-results');
    const closeKbd = document.getElementById('tv-cmd-close-kbd');
    let activeFilter = 'ALL';

    function openPalette() {
      modal.style.display = 'flex';
      input.value = '';
      selectedIndex = 0;
      loadFullCatalog();
      filterAndRender();
      setTimeout(() => input.focus(), 60);
    }

    function closePalette() {
      modal.style.display = 'none';
    }

    function renderResults(items) {
      currentRenderedItems = items.slice(0, 35);
      if (currentRenderedItems.length === 0) {
        resultsBox.innerHTML = `
          <div style="padding:32px 16px; text-align:center; color:#64748b; font-size:13px;">
            No direct match found. Try typing "solar", "heat pump", "dscr", "ev", "roi", or a state name.
          </div>
        `;
        return;
      }

      resultsBox.innerHTML = currentRenderedItems.map((item, idx) => {
        const isSelected = idx === selectedIndex;
        return `
          <a href="${item.url}" class="tv-cmd-result-item" data-idx="${idx}" style="display:flex; justify-content:space-between; align-items:center; padding:10px 14px; border-radius:10px; text-decoration:none; margin-bottom:4px; background:${isSelected ? 'rgba(56, 189, 248, 0.15)' : 'transparent'}; border:1px solid ${isSelected ? 'rgba(56, 189, 248, 0.3)' : 'transparent'}; transition:background 0.12s;">
            <div style="padding-right:12px;">
              <span style="display:block; color:${isSelected ? '#ffffff' : '#f1f5f9'}; font-size:13px; font-weight:700;">${item.title}</span>
              <span style="font-size:10px; color:#94a3b8; margin-top:2px; display:inline-block;">${item.category}</span>
            </div>
            <span style="font-size:10px; font-weight:800; padding:3px 8px; border-radius:6px; background:rgba(56, 189, 248, 0.1); color:#38bdf8; border:1px solid rgba(56, 189, 248, 0.25); white-space:nowrap;">${item.tag}</span>
          </a>
        `;
      }).join('');

      // Add click listeners
      const itemEls = resultsBox.querySelectorAll('.tv-cmd-result-item');
      itemEls.forEach(el => {
        el.onmouseenter = () => {
          selectedIndex = parseInt(el.getAttribute('data-idx'), 10);
          highlightSelected();
        };
      });
    }

    function highlightSelected() {
      const itemEls = resultsBox.querySelectorAll('.tv-cmd-result-item');
      itemEls.forEach((el, idx) => {
        if (idx === selectedIndex) {
          el.style.background = 'rgba(56, 189, 248, 0.15)';
          el.style.borderColor = 'rgba(56, 189, 248, 0.3)';
          el.scrollIntoView({ block: 'nearest' });
        } else {
          el.style.background = 'transparent';
          el.style.borderColor = 'transparent';
        }
      });
    }

    function filterAndRender() {
      const q = input.value.toLowerCase().trim();
      const pool = FULL_CATALOG || FLAGSHIP_PRIORITY_TOOLS;
      let items = pool;

      if (activeFilter !== 'ALL') {
        items = items.filter(t => (t.category || '').toLowerCase().includes(activeFilter.toLowerCase()) || (t.title || '').toLowerCase().includes(activeFilter.toLowerCase()));
      }

      if (q) {
        const terms = q.split(/\s+/);
        items = items.filter(t => {
          const text = (t.title + ' ' + (t.category || '') + ' ' + (t.url || '')).toLowerCase();
          return terms.every(term => text.includes(term));
        });
      } else if (activeFilter === 'ALL') {
        items = FLAGSHIP_PRIORITY_TOOLS;
      }

      selectedIndex = 0;
      renderResults(items);
    }

    // Category button clicks
    modal.querySelectorAll('.tv-cat-filter-btn').forEach(btn => {
      btn.onclick = () => {
        activeFilter = btn.getAttribute('data-cat');
        modal.querySelectorAll('.tv-cat-filter-btn').forEach(b => {
          if (b === btn) {
            b.style.background = '#0284c7';
            b.style.color = '#fff';
          } else {
            b.style.background = '#1e293b';
            b.style.color = '#94a3b8';
          }
        });
        filterAndRender();
      };
    });

    input.oninput = filterAndRender;

    // Keyboard handlers
    input.onkeydown = (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentRenderedItems.length > 0) {
          selectedIndex = (selectedIndex + 1) % currentRenderedItems.length;
          highlightSelected();
        }
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentRenderedItems.length > 0) {
          selectedIndex = (selectedIndex - 1 + currentRenderedItems.length) % currentRenderedItems.length;
          highlightSelected();
        }
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (currentRenderedItems[selectedIndex]) {
          window.location.href = currentRenderedItems[selectedIndex].url;
        }
      }
    };

    triggerBtn.onclick = openPalette;
    closeKbd.onclick = closePalette;
    modal.onclick = (e) => { if (e.target === modal) closePalette(); };

    window.addEventListener('keydown', (e) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        modal.style.display === 'flex' ? closePalette() : openPalette();
      } else if (e.key === '/' && modal.style.display !== 'flex') {
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
        if (activeTag !== 'input' && activeTag !== 'textarea' && activeTag !== 'select') {
          e.preventDefault();
          openPalette();
        }
      } else if (e.key === 'Escape' && modal.style.display === 'flex') {
        closePalette();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createCommandPalette);
  } else {
    createCommandPalette();
  }
})();
