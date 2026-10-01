/**
 * ProtoArc Ergonomic Workstation Peripherals Partner Integration
 * Prime Big Deal Days Campaign (Oct 6–7) | Impact ID: 56905 | Partner ID: 7704556
 * Link: https://protoarc.sjv.io/NGvDYP
 */
(function() {
  function injectProtoArcCard() {
    if (document.getElementById('protoarc-card-container')) return;

    const link = (window.AFFILIATE_CONFIG && window.AFFILIATE_CONFIG.protoarc) || 'https://protoarc.sjv.io/NGvDYP';

    const card = document.createElement('div');
    card.id = 'protoarc-card-container';
    card.style.cssText = `
      background: linear-gradient(135deg, #09131f 0%, #0f233a 100%);
      border: 1px solid rgba(56, 189, 248, 0.4);
      border-radius: 12px;
      padding: 22px 24px;
      margin-top: 28px;
      margin-bottom: 24px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      box-shadow: 0 4px 25px rgba(56, 189, 248, 0.15);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 14px;">
        <div style="max-width: 680px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
            <span style="font-size: 20px;">⌨️</span>
            <span style="font-weight: 800; font-size: 16px; color: #ffffff; letter-spacing: 0.3px;">ProtoArc: Ergonomic Peripherals &amp; Executive Desk Tech</span>
            <span style="background: linear-gradient(90deg, #f59e0b, #ef4444); color: #ffffff; font-size: 10px; font-weight: 900; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.5px;">🔥 Prime Big Deal Days: Oct 6–7</span>
          </div>
          <div style="font-size: 13px; color: #bae6fd; line-height: 1.5;">
            Featured by ToolsVault Workspace Engineering: Save <strong style="color: #38bdf8;">up to 37.5% OFF</strong> on professional ergonomic split keyboards, wireless vertical mice, and foldable executive travel suites.
          </div>
        </div>
        <a href="${link}" target="_blank" rel="noopener sponsored" style="
          background: linear-gradient(135deg, #38bdf8 0%, #0284c7 100%);
          color: #031427;
          text-decoration: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: 0.3px;
          white-space: nowrap;
          box-shadow: 0 4px 15px rgba(56, 189, 248, 0.35);
          display: inline-flex;
          align-items: center;
          gap: 6px;
        ">
          Shop Prime Deals (Up to 37.5% Off) →
        </a>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; padding-top: 12px; border-top: 1px solid rgba(56, 189, 248, 0.2);">
        <a href="${link}" target="_blank" rel="noopener sponsored" style="text-decoration: none; background: rgba(15, 35, 58, 0.7); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span style="font-size: 12px; font-weight: 700; color: #e0f2fe;">EC200 Pro</span>
            <span style="font-size: 10px; color: #34d399; font-weight: 800;">-24.5%</span>
          </div>
          <div style="font-size: 11px; color: #94a3b8;"><del>$289.99</del> <strong style="color: #38bdf8; font-size: 13px;">$218.99</strong></div>
        </a>

        <a href="${link}" target="_blank" rel="noopener sponsored" style="text-decoration: none; background: rgba(15, 35, 58, 0.7); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span style="font-size: 12px; font-weight: 700; color: #e0f2fe;">EM11 NL Mouse</span>
            <span style="font-size: 10px; color: #34d399; font-weight: 800;">-31.3%</span>
          </div>
          <div style="font-size: 11px; color: #94a3b8;"><del>$31.99</del> <strong style="color: #38bdf8; font-size: 13px;">$21.99</strong></div>
        </a>

        <a href="${link}" target="_blank" rel="noopener sponsored" style="text-decoration: none; background: rgba(15, 35, 58, 0.7); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span style="font-size: 12px; font-weight: 700; color: #e0f2fe;">XK01 Foldable</span>
            <span style="font-size: 10px; color: #34d399; font-weight: 800;">-37.0%</span>
          </div>
          <div style="font-size: 11px; color: #94a3b8;"><del>$53.99</del> <strong style="color: #38bdf8; font-size: 13px;">$33.99</strong></div>
        </a>

        <a href="${link}" target="_blank" rel="noopener sponsored" style="text-decoration: none; background: rgba(15, 35, 58, 0.7); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span style="font-size: 12px; font-weight: 700; color: #e0f2fe;">XK04 Compact</span>
            <span style="font-size: 10px; color: #34d399; font-weight: 800;">-37.5%</span>
          </div>
          <div style="font-size: 11px; color: #94a3b8;"><del>$39.99</del> <strong style="color: #38bdf8; font-size: 13px;">$24.99</strong></div>
        </a>

        <a href="${link}" target="_blank" rel="noopener sponsored" style="text-decoration: none; background: rgba(15, 35, 58, 0.7); border: 1px solid rgba(56, 189, 248, 0.25); border-radius: 8px; padding: 10px 12px; display: flex; flex-direction: column; gap: 4px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <span style="font-size: 12px; font-weight: 700; color: #e0f2fe;">XKM01 CaseUp</span>
            <span style="font-size: 10px; color: #34d399; font-weight: 800;">-20.0%</span>
          </div>
          <div style="font-size: 11px; color: #94a3b8;"><del>$99.99</del> <strong style="color: #38bdf8; font-size: 13px;">$79.99</strong></div>
        </a>
      </div>
    `;

    const container = document.querySelector('.calc-container') || document.querySelector('.calculator-container') || document.querySelector('.card') || document.body;
    container.appendChild(card);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectProtoArcCard);
  } else {
    injectProtoArcCard();
  }
})();
