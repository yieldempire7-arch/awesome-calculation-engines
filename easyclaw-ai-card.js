/**
 * EasyClaw AI Automation & Workflow Orchestration Affiliate Integration
 * Awin Program ID: 126975 | Publisher ID: 3064767
 * Direct Advertiser Contact: Ari Arwen (wenyuhan@aicfcf.com)
 * Commission: 10% on all plans ($19 to $1,920/yr -> up to $192/sale)
 * Exclusive Audience Discount Code: MJLH8QY7 (5% OFF)
 * Target: AI, productivity, automation, business ROI, workflow, SaaS, and developer calculators.
 */
(function() {
  function injectEasyClawCard() {
    if (document.getElementById('easyclaw-card-container')) return;

    const curPath = (window.location.pathname || '').toLowerCase();
    const isHome = window.__TV_IS_HOMEPAGE__ === true || curPath === '/' || curPath === '/index.html' || curPath === '/index' || curPath === '' || curPath.endsWith('/') || curPath.endsWith('/index.html') || (typeof document !== 'undefined' && (document.body?.classList?.contains('tv-homepage-root') || document.getElementById('toolGrid') !== null || document.querySelector('.hero') !== null));
    if (isHome) return;

    const path = curPath;
    const title = (document.title || '').toLowerCase();

    const isTarget = path.includes('ai') || 
                     path.includes('automation') || 
                     path.includes('productivity') || 
                     path.includes('workflow') || 
                     path.includes('saas') || 
                     path.includes('developer') || 
                     path.includes('api') || 
                     path.includes('software') || 
                     path.includes('roi') || 
                     path.includes('gpu') || 
                     path.includes('compute') || 
                     path.includes('consulting') || 
                     path.includes('agency') ||
                     title.includes('ai') ||
                     title.includes('automation') ||
                     title.includes('saas') ||
                     title.includes('gpu');

    if (!isTarget) return;

    const targetContainer = document.querySelector('.calc-container') || 
                            document.querySelector('.container') || 
                            document.querySelector('main') || 
                            document.querySelector('#calculator') || 
                            document.querySelector('.calculator-card') || 
                            document.querySelector('.results-panel') || 
                            document.querySelector('.main-container') || 
                            document.body;

    if (!targetContainer) return;

    const card = document.createElement('div');
    card.id = 'easyclaw-card-container';
    card.style.cssText = `
      background: linear-gradient(135deg, #090e1a 0%, #0f172a 50%, #111827 100%);
      border: 1px solid #6366f1;
      border-radius: 16px;
      padding: 22px 24px;
      margin: 28px auto;
      max-width: 900px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 18px;
      box-shadow: 0 10px 30px -5px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;

    // Awin Direct Click Tracking URL
    const affiliateLink = 'https://www.awin1.com/cread.php?awinmid=126975&awinaffid=3064767&p=https%3A%2F%2Feasyclaw.com%2F';

    card.innerHTML = `
      <div style="max-width: 620px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
          <span style="font-size: 20px;">🤖</span>
          <span style="font-weight: 800; font-size: 15px; color: #f8fafc; letter-spacing: 0.2px;">EasyClaw: Autonomous Multi-Step AI Automation Platform</span>
          <span style="background: rgba(99, 102, 241, 0.25); color: #a5b4fc; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; border: 1px solid rgba(99, 102, 241, 0.4);">Verified Partner</span>
          <span style="background: rgba(16, 185, 129, 0.2); color: #34d399; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; border: 1px solid rgba(16, 185, 129, 0.4);">5% OFF CODE: MJLH8QY7</span>
        </div>
        <div style="font-size: 12px; color: #cbd5e1; line-height: 1.55; margin-bottom: 6px;">
          Orchestrate autonomous multi-step AI agents across e-commerce, market research, content generation, and finance. Eliminate manual data entry and scale business workflows with zero code.
        </div>
        <div style="font-size: 11px; color: #94a3b8; display: flex; gap: 12px; flex-wrap: wrap;">
          <span>⚡ Plus, Pro &amp; Ultra plans</span>
          <span>✓ 30-day attribution window</span>
          <span>✓ Free tier available</span>
        </div>
      </div>
      <div>
        <a href="${affiliateLink}" target="_blank" rel="sponsored noopener" style="
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
          color: #ffffff;
          font-weight: 800;
          font-size: 12px;
          padding: 11px 20px;
          border-radius: 10px;
          text-decoration: none;
          white-space: nowrap;
          transition: transform 0.15s, box-shadow 0.15s;
          box-shadow: 0 4px 14px rgba(99, 102, 241, 0.45);
        ">
          <span>Deploy AI Workflows</span>
          <span>&rarr;</span>
        </a>
      </div>
    `;

    targetContainer.appendChild(card);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectEasyClawCard);
  } else {
    injectEasyClawCard();
  }
})();
