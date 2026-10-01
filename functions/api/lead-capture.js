/**
 * Cloudflare Pages Function: /api/lead-capture
 * Receives lead/subscriber POST requests, validates data,
 * and persists seamlessly to Cloudflare D1 (SQL) or KV with zero external server dependencies.
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const payload = await request.json();
    const email = payload.email || '';
    const phone = payload.phone || payload.contact || '';
    const name = payload.name || payload.company || 'Anonymous Client';
    const trade = payload.trade || 'General Commercial';
    const zip = payload.zip || '';
    const budget = payload.budget || '';
    const notes = payload.notes || '';
    const leadMagnet = payload.leadMagnet || payload.type || 'Direct Quote';
    const sourceUrl = payload.source || payload.url || payload.page || '';
    const metrics = payload.metrics || [];
    const timestamp = new Date().toISOString();

    // Accept either valid email OR valid phone number
    const hasValidEmail = email && email.includes('@');
    const hasValidPhone = phone && phone.replace(/[^0-9]/g, '').length >= 7;

    if (!hasValidEmail && !hasValidPhone) {
      return new Response(JSON.stringify({ success: false, error: 'Valid email or phone number is required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const leadId = 'LEAD-' + Math.random().toString(36).substr(2, 8).toUpperCase();

    // 1. Cloudflare D1 SQL Persistence (if DB binding is present)
    if (env && env.DB) {
      try {
        await env.DB.prepare(
          'INSERT INTO leads (id, name, email, phone, zip, trade, budget, notes, lead_magnet, source_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        ).bind(leadId, name, email || phone, phone, zip, trade, budget, notes, leadMagnet, sourceUrl).run();
      } catch (dbErr) {
        console.warn('D1 insert warning:', dbErr.message);
      }
    }

    // 2. Cloudflare KV Persistence (if KV binding is present)
    if (env && env.LEADS_KV) {
      await env.LEADS_KV.put(leadId, JSON.stringify({
        id: leadId, email, phone, name, trade, zip, budget, notes, leadMagnet, sourceUrl, metrics, timestamp
      }));
    }

    // 3. Programmatic Webhook Forwarder (Make.com, Discord, Telegram, Slack, Zapier)
    const webhookUrl = (env && env.DISPATCH_WEBHOOK_URL) || 'https://hook.us2.make.com/usoismxy4do6jxquwhvh0opi7fv7rf7l';
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'NEW_HIGH_INTENT_LEAD',
            leadId,
            name,
            email,
            phone,
            zip,
            trade,
            budget,
            notes,
            leadMagnet,
            sourceUrl,
            metrics,
            formattedAlertHtml: `
              <div style="font-family:sans-serif; padding:16px; border:1px solid #e2e8f0; border-radius:12px;">
                <h3 style="color:#0f172a; margin-top:0;">⚡ New Verified Contractor Lead Dispatched</h3>
                <p><strong>Lead ID:</strong> ${leadId}<br>
                <strong>ZIP Code:</strong> ${zip}<br>
                <strong>Trade:</strong> ${trade}<br>
                <strong>Contact:</strong> ${email || phone}<br>
                <strong>Source:</strong> ${sourceUrl}</p>
              </div>
            `,
            timestamp
          })
        });
      } catch (fwdErr) {
        console.warn('Webhook dispatch warning:', fwdErr.message);
      }
    }

    // 3b. Redundant Direct Email Dispatch (FormSubmit.co to John Granbridge)
    try {
      await fetch('https://formsubmit.co/ajax/toolsvault78@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Referer': sourceUrl || 'https://tools-vault-4ml.pages.dev/'
        },
        body: JSON.stringify({
          _subject: `[ToolsVault New Lead] ${trade} - ZIP ${zip} (${name})`,
          leadId,
          name,
          contact: email || phone,
          trade,
          zip,
          budget,
          leadMagnet,
          notes,
          sourceUrl,
          timestamp
        })
      });
    } catch (fsErr) {
      console.warn('FormSubmit email dispatch warning:', fsErr.message);
    }

    // Generate Instant Personalized Project Sizing & Incentives Brief
    const auditMemo = {
      leadId,
      status: "DISPATCHED_TO_TERRITORY_NETWORK",
      assignedTerritoryZip: zip,
      primaryTrade: trade,
      incentiveHighlights: [
        "IRA Section 25C: 30% credit up to $2,000 for qualifying heat pumps/insulation",
        "IRA Section 48: 30% to 50% Clean Energy ITC for Commercial Solar & BESS",
        "Local Utility Rebates: Up to $500–$3,000 in utility demand-side rebates depending on provider"
      ],
      downloadableChecklistUrl: "https://tools-vault-4ml.pages.dev/downloads/contractor_csi_16_division_estimating_cheat_sheet.svg",
      dispatchedTimestamp: timestamp
    };

    return new Response(JSON.stringify({ 
      success: true, 
      leadId, 
      zip, 
      trade, 
      report: auditMemo,
      timestamp 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}


export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const pin = url.searchParams.get('pin');

  // Verify PIN protection for executive dashboard
  if (pin !== '2026') {
    return new Response(JSON.stringify({ error: 'Unauthorized. PIN required.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }

  let leads = [];

  // Query D1 if configured
  if (env && env.DB) {
    try {
      const results = await env.DB.prepare('SELECT * FROM leads ORDER BY created_at DESC LIMIT 50').all();
      leads = results.results || [];
    } catch (e) {}
  }

  // Fallback / supplement from KV if configured
  if (leads.length === 0 && env && env.LEADS_KV) {
    try {
      const list = await env.LEADS_KV.list({ limit: 50 });
      for (const key of list.keys) {
        const item = await env.LEADS_KV.get(key.name, 'json');
        if (item) leads.push(item);
      }
    } catch (e) {}
  }

  return new Response(JSON.stringify({
    success: true,
    totalCount: leads.length,
    leads: leads,
    timestamp: new Date().toISOString()
  }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store'
    }
  });
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
