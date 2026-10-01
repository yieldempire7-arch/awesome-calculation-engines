/**
 * ToolsVault & YieldEmpire Master High-Bounty Affiliate Partner Registry
 * Awin Publisher ID: 3064767
 * Amazon Associates Tag: resellerhub20-20
 * DealMachine Partner Tag: yield (Promo: YIELD)
 */
window.AFFILIATE_CONFIG = {
  awin_publisher_id: '3064767',
  impact_media_partner_id: '7704556',
  amazon_tag: 'resellerhub20-20',
  dealmachine_promo: 'YIELD',

  // Awin Direct Tracking Link Generator
  getAwinLink: function(advertiserId, destinationUrl) {
    const pid = window.AFFILIATE_CONFIG.awin_publisher_id;
    let link = `https://www.awin1.com/cread.php?awinmid=${advertiserId}&awinaffid=${pid}&clickref=tools_vault`;
    if (destinationUrl) {
      link += `&ued=${encodeURIComponent(destinationUrl)}`;
    }
    return link;
  },

  // Active Approved & Connected Awin Merchants
  awin_merchants: {
    iedm: { aid: '71579', name: 'iEDM Festival & Rave Apparel', default_url: 'https://iedm.com' },
    truthbrush: { aid: '19976', name: 'Truthbrush Eco-Oral Care', default_url: 'https://www.thetruthbrush.com' },
    imalent: { aid: '94223', name: 'IMALENT Tactical Searchlights', default_url: 'https://www.imalentstore.com' },
    bluetti: { aid: '59271', name: 'BLUETTI Solar Storage', default_url: 'https://www.bluettipower.com' },
    bluetti_eu: { aid: '95479', name: 'BLUETTI Europe', default_url: 'https://de.bluettipower.eu' },
    dakota_lithium: { aid: '79634', name: 'Dakota Lithium Batteries', default_url: 'https://dakotalithium.com' },
    gosun: { aid: '88749', name: 'GoSun Solar Appliances', default_url: 'https://gosun.co' },
    octopus_energy: { aid: '67000', name: 'Octopus Energy', default_url: 'https://octopus.energy' },
    town_square_energy: { aid: '50655', name: 'Town Square Energy', default_url: 'https://www.townsquareenergy.com' },
    rhythm_energy: { aid: '69318', name: 'Rhythm Energy', default_url: 'https://www.gotrhythm.com' },
    perch_energy: { aid: '73982', name: 'Perch Community Solar', default_url: 'https://www.perchenergy.com' },
    saatva: { aid: '88129', name: 'Saatva Luxury Mattresses', default_url: 'https://www.saatva.com' },
    plushbeds: { aid: '89181', name: 'PlushBeds Organic Latex', default_url: 'https://www.plushbeds.com' },
    dock_and_bay: { aid: '30947', name: 'Dock & Bay Travel Gear', default_url: 'https://us.dockandbay.com' },
    leaf_shave: { aid: '71287', name: 'Leaf Shave Plastic-Free Razors', default_url: 'https://leafshave.com' },
    high_sierra: { aid: '82965', name: 'High Sierra Low-Flow Showerheads', default_url: 'https://www.highsierrashowerheads.com' },
    olight: { aid: '90861', name: 'Olight Tactical Flashlights', default_url: 'https://www.olightstore.com' },
    ge_appliances: { aid: '71165', name: 'GE Appliances Pro', default_url: 'https://www.geappliances.com' },
    home_air_check: { aid: '82641', name: 'Home Air Check (Enthalpy)', default_url: 'https://www.homeaircheck.com' },
    nordvpn: { aid: '11227', name: 'NordVPN Cybersecurity', default_url: 'https://nordvpn.com' },
    fiverr: { aid: '14097', name: 'Fiverr Pro Services', default_url: 'https://www.fiverr.com' },
    bizee: { aid: '17877', name: 'Bizee LLC Formation', default_url: 'https://bizee.com' },
    dankstop: { aid: '70018', name: 'DankStop Glassware & Lifestyle', default_url: 'https://dankstop.com' },
    thebudgrower: { aid: '82211', name: 'TheBudGrower Grow Kits', default_url: 'https://thebudgrower.com' },
    national_debt_relief: { aid: '17666', name: 'National Debt Relief', default_url: 'https://www.nationaldebtrelief.com' },
    curadebt: { aid: '18055', name: 'CuraDebt Tax & Debt Relief', default_url: 'https://www.curadebt.com' },
    gate_operators_direct: { aid: '114678', name: 'Gate Operators Direct', default_url: 'https://gateoperatorsdirect.com' },
    shibao_jewelry: { aid: '91177', name: 'Shenzhen Shibao Jewelry', default_url: 'https://www.shibaojewelry.com' },
    knopf_watches: { aid: '35287', name: 'KNOPF New York Watches', default_url: 'https://knopfwatches.com' },
    sutera: { aid: '34123', name: 'Sutera Stone Bath Mats & Sleep', default_url: 'https://sutera.com' },
    shed_supplements: { aid: '125186', name: 'Shed Supplements (Fat Burners & Performance)', default_url: 'https://shedsupplements.com' },
    whitelotus: { aid: '84223', name: 'White Lotus Home Handcrafted Organic Mattresses & Bedding', default_url: 'https://www.whitelotushome.com' },
    wovenwoven: { aid: '102547', name: 'Woven Woven Kids Natural Weighted Blankets', default_url: 'https://wovenwoven.com.au' },
    cozeware: { aid: '123618', name: 'Cozeware Energy-Efficient Mini Split Air Conditioners', default_url: 'https://cozeware.com', promo_code: 'AWIN20', discount: '20% OFF' },
    green_kid_crafts: { aid: '83693', name: 'Green Kid Crafts Eco-Friendly STEM Activity Boxes', default_url: 'https://www.greenkidcrafts.com', promo_code: 'FALL15', discount: '15% OFF Sitewide', commission: '15%' },
    printsafari: { aid: '126001', name: 'PrintSafari Commercial Printing & Business Cards', default_url: 'https://www.printsafari.com', promo_code: 'NEW25', discount: '10% OFF' },
    wondercide: { aid: '102533', name: 'Wondercide Plant-Powered Flea, Tick & Mosquito Protection (Pets, People & Yard)', default_url: 'https://www.wondercide.com', commission: '5%' },
    outfitr: { name: 'OutfitR Rugged Outdoor & Jobsite Tactical Gear', default_url: 'https://outfitr.com', commission: '15%', badge: 'Jobsite & Tactical Gear' },
    hey_happiness: { name: 'Hey Happiness Eco-Friendly Waterproof Jewelry & Gifts', default_url: 'https://www.happinessbtq.com', badge: 'Eco-Friendly Gifts' },
    erverte_paris: { name: 'Erverte Paris Sustainable French Natural Fiber Menswear', default_url: 'https://erverte.com', badge: 'Sustainable Luxury' },
    udemy_certification: { name: 'Udemy Certification Exam Vouchers & AWS Second Chance', partner_id: '7704556', program_id: '39854', default_url: 'https://www.udemy.com/topic/certification/', commission: '$5.00 per voucher sale', discounts: '10% to 40% OFF Exams', certifications: 'AWS, CompTIA, Microsoft' },
    easyclaw: { aid: '126975', name: 'EasyClaw Autonomous AI Automation Platform', default_url: 'https://easyclaw.com', promo_code: 'MJLH8QY7', discount: '5% OFF', commission: '10% ($19 - $1,920 plans -> up to $192/sale)' }
  },

  // Direct & Impact Partner Links
  wondercide: 'https://www.awin1.com/cread.php?awinmid=102533&awinaffid=3064767&clickref=tools_vault_wondercide&ued=' + encodeURIComponent('https://www.wondercide.com'),
  iedm: 'https://www.awin1.com/cread.php?awinmid=71579&awinaffid=3064767&clickref=tools_vault_iedm&ued=https%3A%2F%2Fiedm.com',
  bookseats: 'https://bookseats.pxf.io/dyvD1Q',
  etal_beauty: 'https://iiaa.pxf.io/c/7704556/3965251/55404',
  alison: 'https://alison.com?utm_source=impact&utm_medium=affiliate&utm_campaign=yield_empire',
  udemy: 'https://trk.udemy.com/c/7704556/3193860/39854',
  udemy_vouchers: 'https://trk.udemy.com/c/7704556/3193860/39854?u=' + encodeURIComponent('https://www.udemy.com/topic/certification/'),
  udemy_second_chance: 'https://trk.udemy.com/c/7704556/3193860/39854?u=' + encodeURIComponent('https://www.udemy.com/topic/aws-certification/'),
  oiioii: 'https://oiioii.sjv.io/c/7704556/3991534/56364',
  ultra_pouches: 'https://ultrapouches.pxf.io/4axDML',
  cozeware: 'https://www.awin1.com/cread.php?awinmid=123618&awinaffid=3064767&clickref=tools_vault_hvac&ued=' + encodeURIComponent('https://cozeware.com'),
  dromme: 'https://dromme.sjv.io/KBvLEv',
  wordtosite: 'https://wordtosite.sjv.io/7X9rKV',
  tarran: 'https://tarran.pxf.io/DWZgaG',
  moonpreneur: 'https://moonpreneur.pxf.io/9VjPqY',
  green_kid_crafts: 'https://www.awin1.com/cread.php?awinmid=83693&awinaffid=3064767&clickref=tools_vault_stem&ued=' + encodeURIComponent('https://www.greenkidcrafts.com'),
  green_kid_crafts_halloween: 'https://www.awin1.com/cread.php?awinmid=83693&awinaffid=3064767&clickref=tools_vault_halloween&ued=' + encodeURIComponent('https://www.greenkidcrafts.com/product/halloween-stem-3-pack-sweet-science-spooky-magic-slime-lab/'),
  green_kid_crafts_commission: '15% through October 31',
  printsafari: 'https://www.awin1.com/cread.php?awinmid=126001&awinaffid=3064767&clickref=tools_vault_print&ued=' + encodeURIComponent('https://www.printsafari.com'),
  printsafari_promo: 'NEW25',
  gearup_promo: 'VAULT10',
  gearup: 'https://www.gearupbooster.com/?ref=toolsvault',
  bookbolt: 'https://bookboltio.pxf.io/rEq3Wd',
  kestos: 'https://kestos.sjv.io/jRG3ab',
  rvca: 'https://rvca.pxf.io/Pzv9nM',
  expatsi: 'https://expatsiinc.sjv.io/5kDQzo',
  granite_prints: 'https://graniteprints.pxf.io/en5Mj6',
  small_engine_warehouse: 'https://smallenginewarehouse.pxf.io/L0yqY3',
  florida_premium_beef: 'https://floridapremiumbeef.sjv.io/dyP0q3',
  goodstone_jewels: 'https://goodstone.sjv.io/R0NjD2',
  protoarc: 'https://protoarc.sjv.io/NGvDYP',
  protoarc_campaign: {
    event: 'ProtoArc Prime Big Deal Days',
    dates: 'October 6–7',
    impact_id: '56905',
    media_partner_id: '7704556',
    discount: 'Up to 37.5% OFF',
    tracking_link: 'https://protoarc.sjv.io/NGvDYP',
    deals: [
      { model: 'EC200 Pro', original: '$289.99', sale: '$218.99', save: '$71.00 (24.5% OFF)' },
      { model: 'EM11 NL Ergonomic Vertical Mouse', original: '$31.99', sale: '$21.99', save: '$10.00 (31.3% OFF)' },
      { model: 'XK01 Foldable Bluetooth Keyboard', original: '$53.99', sale: '$33.99', save: '$20.00 (37.0% OFF)' },
      { model: 'XK04 Compact Keyboard', original: '$39.99', sale: '$24.99', save: '$15.00 (37.5% OFF)' },
      { model: 'XKM01 CaseUp Keyboard & Mouse Combo', original: '$99.99', sale: '$79.99', save: '$20.00 (20.0% OFF)' }
    ]
  },
  xtiles: 'https://xtiles.sjv.io/vD93gW',
  rouvy: 'https://rouvy.pxf.io/xJj3q3',
  izone: 'https://izone.pxf.io/6kQ9RE',
  kurk: 'https://kurk.pxf.io/OYvQLK',
  driver_ai: 'https://driverai.sjv.io/qWL3Gq',
  pixazo_ai: 'https://goto.pixazo.ai/2RLqBM',
  flowtica: 'https://flowtica.sjv.io/3kqxMy',
  orion_vpn: 'https://orionvpn.pxf.io/yZP3xB',
  vector_tech: 'https://vector.sjv.io/4axDBL',
  arccaptain: 'https://arccaptain.pxf.io/3kqgyy',
  arccaptain_promo: 'WIN50',
  arccaptain_promos: {
    win50: '$50 OFF storewide (min. $400)',
    win10: '$10 OFF (min. $300)',
    win04: '4% OFF storewide',
    win06: '6% OFF selected collections'
  },
  dealmachine: 'https://www.dealmachine.com/partner/yield',
  energysage: 'https://www.energysage.com/partner/',
  propstream: 'https://www.propstream.com/partners',
  quickbooks: 'https://quickbooks.intuit.com/partners/business-affiliates/',
  wise: 'https://wise.com/help/articles/2978051/whats-the-wise-partnership-program',
  pirateship: 'https://www.pirateship.com/',
  ledger: 'https://affiliate.ledger.com/',
  outfitr: 'https://outfitr.com',
  hey_happiness: 'https://www.happinessbtq.com',
  erverte_paris: 'https://erverte.com',
  world_businesses_for_sale: 'https://www.awin1.com/cread.php?awinmid=116725&awinaffid=3064767&clickref=tools_vault_bizsale&ued=' + encodeURIComponent('https://www.worldbusinessesforsale.com'),
  world_businesses_for_sale_promo: 'AWN10',
  easyclaw: 'https://www.awin1.com/cread.php?awinmid=126975&awinaffid=3064767&p=https%3A%2F%2Feasyclaw.com%2F',
  easyclaw_promo: 'MJLH8QY7',

  // Amazon Associates Verified Product Links
  amazon: {
    rollo_printer: 'https://www.amazon.com/dp/B01MA3EYC5?tag=resellerhub20-20',
    munbyn_printer: 'https://www.amazon.com/dp/B088TBPQ8Z?tag=resellerhub20-20',
    postal_scale: 'https://www.amazon.com/dp/B000FSWB9K?tag=resellerhub20-20',
    thermal_labels: 'https://www.amazon.com/dp/B07Y9ZKP28?tag=resellerhub20-20',
    barcode_scanner: 'https://www.amazon.com/dp/B07V4TSS76?tag=resellerhub20-20',
    poly_mailers: 'https://www.amazon.com/dp/B07T48281V?tag=resellerhub20-20',
    contractor_logbook: 'https://www.amazon.com/dp/B0HJLPFQCY?tag=resellerhub20-20',
    landlord_logbook: 'https://www.amazon.com/dp/B0HJLRPYT4?tag=resellerhub20-20',
    hvac_logbook: 'https://www.amazon.com/s?k=ToolsVault+HVAC+Service+Logbook&tag=resellerhub20-20',
    roofing_logbook: 'https://www.amazon.com/s?k=ToolsVault+Commercial+Roofing+Logbook&tag=resellerhub20-20'
  }
};
