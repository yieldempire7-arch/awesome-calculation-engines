/**
 * Udemy Global Marketplace & Certification Exam Vouchers Partner Integration
 * Impact Media Partner ID: 7704556 | Program ID: 39854
 * Confirmed by Udemy Affiliate Management (Daniel Perez)
 * Features:
 *  1. Certification Exam Vouchers (AWS, CompTIA, Microsoft - Save 10%+)
 *  2. AWS Second Chance Safety Net (2 chances to pass, save up to 40%)
 *  3. Top-Rated Financial Modeling, DCF Valuation & Tech Mastery Courses
 */
(function() {
  function injectUdemyCard() {
    if (document.getElementById('udemy-courses-card-container')) return;

    const curPath = (window.location.pathname || '').toLowerCase();
    const isHome = window.__TV_IS_HOMEPAGE__ === true || curPath === '/' || curPath === '/index.html' || curPath === '/index' || curPath === '' || curPath.endsWith('/') || curPath.endsWith('/index.html') || (typeof document !== 'undefined' && (document.body?.classList?.contains('tv-homepage-root') || document.getElementById('toolGrid') !== null || document.querySelector('.hero') !== null));
    if (isHome) return;

    const cfg = window.AFFILIATE_CONFIG || {};
    const baseLink = cfg.udemy || 'https://trk.udemy.com/c/7704556/3193860/39854';
    const voucherLink = cfg.udemy_vouchers || (baseLink + '?u=' + encodeURIComponent('https://www.udemy.com/topic/certification/'));
    const secondChanceLink = cfg.udemy_second_chance || (baseLink + '?u=' + encodeURIComponent('https://www.udemy.com/topic/aws-certification/'));
    const financeLink = baseLink + '?u=' + encodeURIComponent('https://www.udemy.com/topic/financial-modeling/');

    const path = curPath;
    const title = (document.title || '').toLowerCase();

    // 1. Tech, Cloud, IT, Developer, GPU, AI, Homelab context
    const isTechContext = path.includes('bootcamp') || path.includes('server') || path.includes('cloud') ||
      path.includes('gpu') || path.includes('code') || path.includes('software') || path.includes('engineer') ||
      path.includes('homelab') || path.includes('data') || path.includes('crypto') || path.includes('ai') ||
      path.includes('ups') || path.includes('network') || path.includes('api') || path.includes('linux') ||
      path.includes('docker') || path.includes('kubernetes') || path.includes('python') ||
      title.includes('bootcamp') || title.includes('developer') || title.includes('software') || title.includes('cloud') ||
      title.includes('gpu') || title.includes('compute') || title.includes('ai');

    // 2. Finance, Real Estate, Underwriting, Valuation, Wealth, Business, Accounting, Excel context
    const isFinanceContext = path.includes('finance') || path.includes('model') || path.includes('dscr') ||
      path.includes('estate') || path.includes('invest') || path.includes('stock') || path.includes('valuation') ||
      path.includes('mortgage') || path.includes('tax') || path.includes('wealth') || path.includes('fire') ||
      path.includes('cap_rate') || path.includes('equity') || path.includes('saas') || path.includes('roas') ||
      path.includes('accounting') || path.includes('roi') || path.includes('depreciation') || path.includes('loan') ||
      title.includes('finance') || title.includes('invest') || title.includes('valuation') || title.includes('dscr') ||
      title.includes('mortgage') || title.includes('wealth') || title.includes('model');

    // Target specifically high-intent learning & professional calculation contexts
    if (!isTechContext && !isFinanceContext) return;

    const card = document.createElement('div');
    card.id = 'udemy-courses-card-container';
    card.style.cssText = `
      background: linear-gradient(135deg, #130a24 0%, #1f113d 50%, #160c2b 100%);
      border: 1px solid rgba(168, 85, 247, 0.45);
      border-radius: 16px;
      padding: 22px 24px;
      margin-top: 28px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 20px;
      box-shadow: 0 10px 30px rgba(168, 85, 247, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    `;

    if (isTechContext) {
      card.innerHTML = `
        <div style="max-width: 660px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
            <span style="font-size: 18px;">🛡️</span>
            <span style="font-weight: 800; font-size: 15px; color: #ffffff; letter-spacing: 0.3px;">Official Certification Exam Vouchers &amp; AWS Second Chance</span>
            <span style="background: rgba(168, 85, 247, 0.3); color: #d8b4fe; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; border: 1px solid rgba(168, 85, 247, 0.5);">Save 10% to 40%</span>
            <span style="background: rgba(16, 185, 129, 0.2); color: #6ee7b7; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; border: 1px solid rgba(16, 185, 129, 0.4);">Pearson VUE Verified</span>
          </div>
          <div style="font-size: 12px; color: #e9d5ff; line-height: 1.55; margin-bottom: 8px;">
            <strong>Certification changes things:</strong> Pearson VUE (2025) found that <strong>63% of certified professionals get promoted</strong> and <strong>32% earn an immediate raise</strong>. Save at least 10% on direct exam vouchers for AWS, CompTIA, and Microsoft with official prep courses and practice tests included.
          </div>
          <div style="display: flex; gap: 14px; flex-wrap: wrap; font-size: 11px; color: #c084fc;">
            <span>⚡ <strong>AWS Second Chance:</strong> 2 exam attempts for 1 price (save 40%)</span>
            <span>✓ CompTIA &amp; Microsoft Exam Aligned</span>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px; align-items: stretch; min-width: 220px;">
          <a href="${voucherLink}" target="_blank" rel="noopener sponsored" style="
            background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 10px 18px;
            border-radius: 8px;
            font-weight: 800;
            font-size: 12px;
            letter-spacing: 0.3px;
            text-align: center;
            white-space: nowrap;
            transition: transform 0.15s, box-shadow 0.15s;
            box-shadow: 0 4px 14px rgba(168, 85, 247, 0.4);
          ">
            Book Exam Voucher (Save 10%+) →
          </a>
          <a href="${secondChanceLink}" target="_blank" rel="noopener sponsored" style="
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(168, 85, 247, 0.4);
            color: #d8b4fe;
            text-decoration: none;
            padding: 8px 14px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 11px;
            text-align: center;
            white-space: nowrap;
            transition: background 0.15s;
          ">
            AWS Second Chance Safety Net (Save 40%)
          </a>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div style="max-width: 660px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;">
            <span style="font-size: 18px;">🎓</span>
            <span style="font-weight: 800; font-size: 15px; color: #ffffff; letter-spacing: 0.3px;">Master Financial Modeling, Valuation &amp; CRE on Udemy</span>
            <span style="background: rgba(168, 85, 247, 0.3); color: #d8b4fe; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; border: 1px solid rgba(168, 85, 247, 0.5);">210k+ Courses</span>
            <span style="background: rgba(59, 130, 246, 0.2); color: #93c5fd; font-size: 10px; font-weight: 800; padding: 3px 8px; border-radius: 4px; text-transform: uppercase; border: 1px solid rgba(59, 130, 246, 0.4);">Official Partner</span>
          </div>
          <div style="font-size: 12px; color: #e9d5ff; line-height: 1.55; margin-bottom: 8px;">
            Level up your analytical career with top-rated courses in Commercial Real Estate Underwriting, DCF/LBO Financial Modeling, Excel Mastery, and Valuation Spreads. <strong>Now available:</strong> Save 10%–40% on certified credentials.
          </div>
          <div style="font-size: 11px; color: #c084fc;">
            📈 Master Wall Street-grade financial models and earn accredited career certificates.
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px; align-items: stretch; min-width: 220px;">
          <a href="${financeLink}" target="_blank" rel="noopener sponsored" style="
            background: linear-gradient(135deg, #a855f7 0%, #9333ea 100%);
            color: #ffffff;
            text-decoration: none;
            padding: 10px 18px;
            border-radius: 8px;
            font-weight: 800;
            font-size: 12px;
            letter-spacing: 0.3px;
            text-align: center;
            white-space: nowrap;
            transition: transform 0.15s, box-shadow 0.15s;
            box-shadow: 0 4px 14px rgba(168, 85, 247, 0.4);
          ">
            Financial Modeling Courses →
          </a>
          <a href="${voucherLink}" target="_blank" rel="noopener sponsored" style="
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(168, 85, 247, 0.4);
            color: #d8b4fe;
            text-decoration: none;
            padding: 8px 14px;
            border-radius: 8px;
            font-weight: 700;
            font-size: 11px;
            text-align: center;
            white-space: nowrap;
            transition: background 0.15s;
          ">
            Certification Exam Vouchers (Save 10%+)
          </a>
        </div>
      `;
    }

    const container = document.querySelector('.calc-container') || document.querySelector('main') || document.body;
    container.appendChild(card);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectUdemyCard);
  } else {
    injectUdemyCard();
  }
})();
