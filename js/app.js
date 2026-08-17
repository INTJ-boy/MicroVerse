(function(){
'use strict';
const pick = (en,fr,ar)=> MV.lang==='ar' ? (ar||en) : (MV.lang==='fr' ? fr : en);
const t = (k)=> MV.t(k);
function esc(s){ return (s==null?'':String(s)).replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }
function statusBadge(status){
  const map = { established:"statusEstablished", simplified:"statusSimplified", conceptual:"statusConceptual", fictional:"statusFictional" };
  return `<span class="status-badge status-${status||'simplified'}"><span class="dot"></span>${t(map[status]||"statusSimplified")}</span>`;
}
function diffTag(d){ return d ? `<span class="tag diff-${d}">${t('difficulty')}: ${d}</span>` : ''; }

function allSpecies(){ return [].concat(MV.data.speciesBacteria, MV.data.speciesFungi, MV.data.speciesProtozoa, MV.data.speciesVirus, MV.data.speciesAlgae); }
const KINGDOM_LABELS = { bacteria:{en:"Bacteria",fr:"Bactéries",icon:"🦠"}, fungi:{en:"Fungi",fr:"Champignons",icon:"🍄"},
  protozoa:{en:"Protozoa",fr:"Protozoaires",icon:"🔵"}, virus:{en:"Viruses",fr:"Virus",icon:"🧿"}, algae:{en:"Algae",fr:"Algues",icon:"🌿"} };
const KINGDOM_KEYS = { bacteria:"speciesBacteria", fungi:"speciesFungi", protozoa:"speciesProtozoa", virus:"speciesVirus", algae:"speciesAlgae" };

/* ================= NAV ================= */
const NAV_ITEMS = [
  {href:"#/worlds", key:"navWorlds"}, {href:"#/species", key:"navMicrobes"}, {href:"#/lab", key:"navLab"},
  {href:"#/investigations", key:"navInvestigations"}, {href:"#/unknown", key:"navUnknown"},
  {href:"#/think", key:"navThink"}, {href:"#/experiments", key:"navExperiments"},
  {href:"#/myths", key:"navMyths"}, {href:"#/glossary", key:"navGlossary"}, {href:"#/map", key:"navMap"}
];
function renderNav(){
  document.getElementById('brandTagline').textContent = t('tagline');
  const links = NAV_ITEMS.map(i=>`<a class="nav-link" href="${i.href}">${t(i.key)}</a>`).join('');
  document.getElementById('navLinks').innerHTML = links;
  document.getElementById('mobileDrawer').innerHTML = links + `<a class="nav-link" href="#/creator">${t('navCreator')}</a>`;
  const langs = ['en','fr','ar'];
  document.getElementById('langSwitch').innerHTML = langs.map(l=>`<button class="lang-btn ${MV.lang===l?'active':''}" data-lang="${l}">${l.toUpperCase()}</button>`).join('');
  document.getElementById('langSwitch').querySelectorAll('.lang-btn').forEach(b=>{
    b.addEventListener('click', ()=>{ MV.lang = b.dataset.lang; localStorage.setItem('mv_lang', MV.lang); applyLangAttrs(); renderAll(); });
  });
  document.getElementById('mobileNavToggle').addEventListener('click', ()=>{
    document.getElementById('mobileDrawer').classList.toggle('open');
  });
  wireNavSearch();
}

/* ---- Expanding nav search ---- */
function wireNavSearch(){
  const wrap = document.getElementById('navSearch');
  const input = document.getElementById('navSearchInput');
  const dropdown = document.getElementById('navSearchDropdown');
  const toggle = document.getElementById('searchToggle');
  let idx = null;

  function open(){
    wrap.classList.add('open');
    input.placeholder = t('searchPlaceholder');
    setTimeout(()=> input.focus(), 200);
  }
  function close(){
    wrap.classList.remove('open');
    dropdown.classList.remove('open');
    input.value = '';
  }
  toggle.addEventListener('click', (e)=>{
    e.stopPropagation();
    if(wrap.classList.contains('open')) close(); else open();
  });
  input.addEventListener('input', ()=>{
    if(!idx) idx = buildSearchIndex();
    const q = input.value.toLowerCase().trim();
    if(!q){ dropdown.classList.remove('open'); dropdown.innerHTML=''; return; }
    const results = idx.filter(r=> r.text.toLowerCase().includes(q)).slice(0,10);
    dropdown.innerHTML = results.length
      ? results.map(r=>`<a href="${r.href}"><span class="ns-type">${r.type}</span>${r.label}</a>`).join('')
      : `<div class="ns-empty">${t('noResults')}</div>`;
    dropdown.classList.add('open');
  });
  input.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });
  dropdown.addEventListener('click', close);
  document.addEventListener('click', (e)=>{
    if(!wrap.contains(e.target) && !dropdown.contains(e.target) && e.target!==toggle) close();
  });
}
function applyLangAttrs(){
  const dir = MV.i18n[MV.lang].dir;
  document.documentElement.setAttribute('lang', MV.lang);
  document.documentElement.setAttribute('dir', dir);
}
function renderFooter(){
  document.getElementById('footerGrid').innerHTML = `
    <div class="footer-col">
      <h4>MICROVERSE 🦑</h4>
      <p>${t('footerAbout')}</p>
    </div>
    <div class="footer-col">
      <h4>${t('footerNav')}</h4>
      <a href="#/worlds">${t('navWorlds')}</a>
      <a href="#/lab">${t('navLab')}</a>
      <a href="#/glossary">${t('navGlossary')}</a>
      <a href="#/references">${t('referencesTitle')}</a>
    </div>
    <div class="footer-col">
      <h4>${t('footerLegal')}</h4>
      <a href="#/creator">${t('navCreator')}</a>
      <a href="#/donate">${t('donateTitle')}</a>
      <a href="#/websites">${pick("Our Other Websites","Nos autres sites")}</a>
      <a href="#/achievements">${t('achievementsTitle')}</a>
    </div>
    <div class="footer-col">
      <h4>${t('footerFollow')}</h4>
      <div class="social-row"><a href="https://www.linkedin.com/in/zekraouirabahallaaeddine" target="_blank" rel="noopener">LinkedIn</a></div>
    </div>`;
  document.getElementById('footerCopy').textContent = "© 2026 Zekraoui Rabah AllaaEddine 🦑. " + pick("All rights reserved.","Tous droits réservés.");
}

/* ================= HOME ================= */
function statTotal(){
  return {
    worlds: MV.data.worlds.length, spaces: MV.data.spaces.length, scenarios: MV.data.scenarios.length,
    terms: MV.data.glossary.length, species: allSpecies().length, investigations: MV.data.investigations.length,
    experiments: 9, myths: MV.data.myths.length
  };
}
function home(){
  const s = statTotal();
  const portals = [
    {href:"#/worlds", icon:"🧫", key:"navWorlds", d:{en:"Explore microbial environments.",fr:"Explorez les environnements microbiens."}},
    {href:"#/map", icon:"🌍", key:"navEcosystems", d:{en:"Understand microbial communities and connections.",fr:"Comprenez les communautés microbiennes et leurs connexions."}},
    {href:"#/lab", icon:"🔬", key:"navLab", d:{en:"Perform virtual educational experiments.",fr:"Réalisez des expériences éducatives virtuelles."}},
    {href:"#/investigations", icon:"🕵️", key:"navInvestigations", d:{en:"Solve contamination cases from evidence.",fr:"Résolvez des cas de contamination à partir de preuves."}},
    {href:"#/unknown", icon:"🧬", key:"navUnknown", d:{en:"Identify microorganisms through evidence.",fr:"Identifiez des micro-organismes à partir de preuves."}},
    {href:"#/think", icon:"🧠", key:"navThink", d:{en:"Reason through complex scenarios.",fr:"Raisonnez à travers des scénarios complexes."}},
    {href:"#/species", icon:"🦠", key:"navMicrobes", d:{en:"Explore organisms and their characteristics.",fr:"Explorez les organismes et leurs caractéristiques."}},
    {href:"#/experiments", icon:"⚗️", key:"navExperiments", d:{en:"Change variables and observe simulated outcomes.",fr:"Changez des variables et observez des résultats simulés."}},
    {href:"#/myths", icon:"❓", key:"navMyths", d:{en:"Test common microbiology claims.",fr:"Testez des affirmations courantes en microbiologie."}}
  ];
  return `
    <section class="hero">
      <div class="hero-canvas-wrap"><canvas id="heroCanvas"></canvas></div>
      <div class="hero-tag">MICROVERSE 🦑</div>
      <h1>${revealWords(pick("The invisible world","Le monde invisible"))} <span class="accent gradient-text">${revealWords(pick("is not empty.","n'est pas vide."), 4)}</span></h1>
      <p class="hero-sub">${t('tagline')}</p>
      <p class="hero-desc">${t('heroSupport')}</p>
      <div class="hero-ctas">
        <a href="#/worlds" class="btn btn-primary">${t('enter')}</a>
        <a href="#/species" class="btn">${t('exploreNoAccount')}</a>
        <button class="btn" id="surpriseBtn">🦑 ${t('surpriseMe')}</button>
      </div>
      <div class="stat-strip">
        <div class="stat"><div class="num">${s.worlds}+</div><div class="label">${t('statsWorlds')}</div></div>
        <div class="stat"><div class="num">${s.spaces}+</div><div class="label">${t('statsSpaces')}</div></div>
        <div class="stat"><div class="num">${s.scenarios}+</div><div class="label">${t('statsScenarios')}</div></div>
        <div class="stat"><div class="num">${s.terms}+</div><div class="label">${t('statsTerms')}</div></div>
        <div class="stat"><div class="num">${s.species}+</div><div class="label">${t('statsSpecies')}</div></div>
        <div class="stat"><div class="num">${s.investigations}+</div><div class="label">${t('statsInvestigations')}</div></div>
        <div class="stat"><div class="num">${s.experiments}+</div><div class="label">${t('statsExperiments')}</div></div>
        <div class="stat"><div class="num">${s.myths}+</div><div class="label">${t('statsMyths')}</div></div>
      </div>
    </section>

    <section class="narrative-section reveal-on-scroll">
      <div class="narrative-kicker k-problem"><span class="kicker-num">1</span>${pick("The problem","Le problème")}</div>
      <h2 class="narrative-title">${pick("Microbiology gets taught as a list to memorize, not a system to reason through.",
                                          "La microbiologie est enseignée comme une liste à mémoriser, pas comme un système à comprendre.")}</h2>
      <p class="narrative-body">${pick(
        "Gram reactions, taxonomies, disease names. Flashcards test recall, not the reasoning a real investigation demands: why did this organism survive here, what changed, what would you check first. That reasoning is the part that transfers to an actual lab bench or an actual outbreak.",
        "Réactions de Gram, taxonomies, noms de maladies. Les fiches testent la mémorisation, pas le raisonnement qu'exige une véritable investigation : pourquoi cet organisme a survécu ici, ce qui a changé, ce qu'il faut vérifier en premier. C'est ce raisonnement qui se transfère réellement à une paillasse de laboratoire ou à une véritable épidémie."
      )}</p>
    </section>

    <section class="narrative-section reveal-on-scroll">
      <div class="narrative-kicker k-solution"><span class="kicker-num">2</span>${pick("The approach","L'approche")}</div>
      <h2 class="narrative-title">${pick("Every module is built around a decision, not a definition.",
                                          "Chaque module est construit autour d'une décision, pas d'une définition.")}</h2>
      <p class="narrative-body">${pick(
        "Change a variable in the simulation engine and see the consequence, then ask why. Reconstruct a contamination timeline from evidence instead of reading one. Run a Gram stain, a culture, a biochemical test, and watch the result depend on what you actually did.",
        "Modifiez une variable dans le moteur de simulation et observez la conséquence, puis demandez pourquoi. Reconstituez une chronologie de contamination à partir de preuves plutôt que de la lire. Réalisez une coloration de Gram, une culture, un test biochimique, et observez que le résultat dépend de ce que vous avez réellement fait."
      )}</p>
      <div class="portal-grid mt-24">
        ${portals.map(p=>`<a class="portal-card" href="${p.href}"><span class="emoji">${p.icon}</span><h3>${t(p.key)}</h3><p>${pick(p.d.en,p.d.fr)}</p></a>`).join('')}
      </div>
    </section>

    <section class="narrative-section reveal-on-scroll">
      <div class="narrative-kicker k-proof"><span class="kicker-num">3</span>${pick("Why it holds up","Pourquoi c'est rigoureux")}</div>
      <h2 class="narrative-title">${pick("Every module carries a scientific-integrity label. Nothing pretends to be a real diagnosis.",
                                          "Chaque module porte une étiquette d'intégrité scientifique. Rien ne se fait passer pour un vrai diagnostic.")}</h2>
      <p class="narrative-body">${pick(
        "Established principle, simplified model, conceptual simulation, or fictional scenario: every result on this site tells you which one it is before you read it. References point to WHO, CDC, FDA, ISO, EPA, USP, ASM and NOAA rather than invented citations.",
        "Principe établi, modèle simplifié, simulation conceptuelle ou scénario fictif : chaque résultat sur ce site vous indique lequel avant même que vous le lisiez. Les références renvoient vers l'OMS, le CDC, la FDA, l'ISO, l'EPA, l'USP, l'ASM et la NOAA plutôt que vers des citations inventées."
      )}</p>
      <div class="proof-grid">
        <div class="proof-item"><div class="proof-num">${s.species}</div><div class="proof-label">${pick("real organisms, not filler entries","organismes réels, pas de contenu de remplissage")}</div></div>
        <div class="proof-item"><div class="proof-num">4</div><div class="proof-label">${pick("integrity labels applied throughout","niveaux d'intégrité appliqués partout")}</div></div>
        <div class="proof-item"><div class="proof-num">10</div><div class="proof-label">${pick("cited source organizations","organismes sources cités")}</div></div>
        <div class="proof-item"><div class="proof-num">0</div><div class="proof-label">${pick("accounts required to explore","compte requis pour explorer")}</div></div>
      </div>
    </section>

    <section class="section" style="padding-top:24px">
      <div class="section-head"><div><div class="section-eyebrow">🦑</div><div class="section-title">${pick("Microbe of the day","Microbe du jour")}</div></div></div>
      <div id="dailyMicrobeHost"></div>
    </section>

    <section class="narrative-section reveal-on-scroll" style="border-top:none">
      <div class="action-band glass-panel">
        <div class="narrative-kicker k-action" style="justify-content:center">${pick("Start now","Commencez maintenant")}</div>
        <h2>${pick("Pick one organism. Follow it into a scenario.","Choisissez un organisme. Suivez-le dans un scénario.")}</h2>
        <p>${pick("No account, no setup. Your local progress and achievements save automatically on this device, and you can reset them anytime.",
                   "Aucun compte, aucune configuration. Votre progression et vos distinctions locales s'enregistrent automatiquement sur cet appareil, et vous pouvez les réinitialiser à tout moment.")}</p>
        <a href="#/worlds" class="btn btn-primary">${t('enter')}</a>
      </div>
    </section>`;
}
function dailyMicrobe(){
  const all = allSpecies();
  const day = Math.floor(Date.now()/86400000);
  const sp = all[day % all.length];
  document.getElementById('dailyMicrobeHost').innerHTML = `
    <a class="card" href="#/organism/${sp.id}" style="max-width:420px">
      <h3>${sp.latin}</h3>
      <p>${sp.notable}</p>
      <div class="card-meta"><span class="tag tag-teal">${KINGDOM_LABELS[sp.kingdom].icon} ${pick(KINGDOM_LABELS[sp.kingdom].en,KINGDOM_LABELS[sp.kingdom].fr)}</span></div>
    </a>`;
}
function revealWords(str, delayStartIndex){
  const words = str.split(' ');
  return words.map((w,i)=> `<span class="reveal-word" style="animation-delay:${((delayStartIndex||0)+i)*0.09}s">${esc(w)}</span>`).join(' ');
}
function initSpotlight(){
  document.querySelectorAll('.card, .portal-card').forEach(el=>{
    if(el._mvSpotlightBound) return;
    el._mvSpotlightBound = true;
    el.addEventListener('mousemove', (e)=>{
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
}
function animateCounters(){
  document.querySelectorAll('.stat .num').forEach(el=>{
    const match = el.textContent.match(/^(\d+)(\+?)$/);
    if(!match) return;
    const target = parseInt(match[1]);
    const suffix = match[2] || '';
    const dur = 900;
    const start = performance.now();
    function tick(now){
      const p = Math.min(1, (now-start)/dur);
      const eased = 1 - Math.pow(1-p, 3);
      el.textContent = Math.round(eased*target) + suffix;
      if(p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}
function initScrollReveal(){
  const els = document.querySelectorAll('.reveal-on-scroll:not(.in-view)');
  if(!els.length) return;
  if(!('IntersectionObserver' in window)){
    els.forEach(el=> el.classList.add('in-view'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el=> io.observe(el));
}
function initHeroCanvas(){
  const canvas = document.getElementById('heroCanvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  function resize(){ canvas.width = canvas.clientWidth * devicePixelRatio; canvas.height = canvas.clientHeight * devicePixelRatio; }
  resize();
  window.addEventListener('resize', resize);
  const N = 46;
  const pts = Array.from({length:N}, ()=>({
    x: Math.random()*canvas.width, y: Math.random()*canvas.height,
    vx: (Math.random()-0.5)*0.25*devicePixelRatio, vy: (Math.random()-0.5)*0.25*devicePixelRatio
  }));
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function frame(){
    if(!document.getElementById('heroCanvas')) return; // view changed
    ctx.clearRect(0,0,canvas.width,canvas.height);
    pts.forEach(p=>{
      if(!reduced){ p.x+=p.vx; p.y+=p.vy; }
      if(p.x<0||p.x>canvas.width) p.vx*=-1;
      if(p.y<0||p.y>canvas.height) p.vy*=-1;
    });
    for(let i=0;i<N;i++){
      for(let j=i+1;j<N;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y;
        const d = Math.sqrt(dx*dx+dy*dy);
        if(d < 110*devicePixelRatio){
          ctx.strokeStyle = `rgba(45,220,203,${0.14*(1-d/(110*devicePixelRatio))})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y); ctx.stroke();
        }
      }
    }
    pts.forEach(p=>{
      ctx.fillStyle = 'rgba(45,220,203,0.7)';
      ctx.beginPath(); ctx.arc(p.x,p.y,1.6*devicePixelRatio,0,7); ctx.fill();
    });
    if(!reduced) requestAnimationFrame(frame);
  }
  frame();
}

/* ================= WORLDS ================= */
function worldsList(){
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / ${t('navWorlds')}</div>
    <div class="detail-header"><h1>🧫 ${t('navWorlds')}</h1></div>
    <div class="card-grid">
      ${MV.data.worlds.map(w=>`
        <a class="card" href="#/worlds/${w.id}">
          <div class="card-top"><span style="font-size:1.4rem">${w.icon}</span></div>
          <h3>${pick(w.name.en,w.name.fr,w.name.ar)}</h3>
          <p>${pick(w.description.en,w.description.fr,w.description.ar)}</p>
        </a>`).join('')}
    </div>`;
}
const ENV_PARAM_LABELS = {
  humanTraffic:{en:"Human traffic",fr:"Fréquentation humaine"}, cleaningFrequency:{en:"Cleaning frequency",fr:"Fréquence de nettoyage"},
  antimicrobialPressure:{en:"Antimicrobial pressure",fr:"Pression antimicrobienne"}, temperatureRange:{en:"Temperature range",fr:"Plage de température"},
  nutrientAvailability:{en:"Nutrient availability",fr:"Disponibilité en nutriments"}, moisture:{en:"Moisture",fr:"Humidité"},
  oxygenGradient:{en:"Oxygen gradient",fr:"Gradient d'oxygène"}, flowRegime:{en:"Flow regime",fr:"Régime d'écoulement"},
  temperature:{en:"Temperature",fr:"Température"}, salinity:{en:"Salinity",fr:"Salinité"},
  pressureGradient:{en:"Pressure gradient",fr:"Gradient de pression"}, cleanroomClass:{en:"Cleanroom class",fr:"Classe de salle blanche"},
  monitoring:{en:"Monitoring",fr:"Surveillance"}, pH:{en:"pH",fr:"pH"}, competitionDesign:{en:"Competition design",fr:"Conception de la compétition"},
  hostImmuneModulation:{en:"Host immune modulation",fr:"Modulation immunitaire de l'hôte"}, nutrientSource:{en:"Nutrient source",fr:"Source de nutriments"},
  interSpeciesCompetition:{en:"Inter-species competition",fr:"Compétition inter-espèces"}, scale:{en:"Scale",fr:"Échelle"},
  processControl:{en:"Process control",fr:"Contrôle du procédé"}, biofoulingRisk:{en:"Biofouling risk",fr:"Risque de biofouling"},
  pressure:{en:"Pressure",fr:"Pression"}, surfaceType:{en:"Surface type",fr:"Type de surface"}, biofilmMaturity:{en:"Biofilm maturity",fr:"Maturité du biofilm"},
  evidenceType:{en:"Evidence type",fr:"Type de preuve"}, timeSensitivity:{en:"Time sensitivity",fr:"Sensibilité au temps"}
};
function envLabel(k){
  if(ENV_PARAM_LABELS[k]) return pick(ENV_PARAM_LABELS[k].en, ENV_PARAM_LABELS[k].fr);
  return k.replace(/([A-Z])/g,' $1').replace(/^./,c=>c.toUpperCase());
}
function worldDetail(id){
  const w = MV.data.worlds.find(x=>x.id===id);
  if(!w) return MV.interactive.emptyState();
  MV.progress.markVisited('worlds', id);
  const spaces = MV.data.spaces.filter(s=>s.world===id);
  const scenarios = MV.data.scenarios.filter(s=>s.world===id);
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / <a href="#/worlds">${t('navWorlds')}</a></div>
    <div class="detail-header">
      <h1>${w.icon} ${pick(w.name.en,w.name.fr,w.name.ar)}</h1>
      <p class="lede">${pick(w.description.en,w.description.fr,w.description.ar)}</p>
    </div>
    <div class="panel"><div class="panel-title">${pick("Environmental parameters","Paramètres environnementaux")}</div>
      <table class="data-table">${Object.entries(w.envParams).map(([k,v])=>`<tr><td>${envLabel(k)}</td><td>${pick(v.en,v.fr,v.ar)}</td></tr>`).join('')}</table>
    </div>
    <div class="panel"><div class="panel-title">${pick("Hazards & relevant processes","Dangers et processus pertinents")}</div>
      <div class="flex gap-8 wrap">${w.hazards.map(h=>`<span class="tag tag-amber">${pick(h.en,h.fr,h.ar)}</span>`).join('')}</div>
    </div>
    <div class="section-head mt-24"><div class="section-title" style="font-size:1.2rem">${t('relatedSpaces')}</div></div>
    <div class="card-grid">${spaces.map(s=>`<a class="card" href="#/spaces/${s.id}"><h3>${pick(s.name.en,s.name.fr,s.name.ar)}</h3><p>${s.environment}</p></a>`).join('') || `<p class="text-muted">${t('underConstruction')}</p>`}</div>
    <div class="section-head mt-24"><div class="section-title" style="font-size:1.2rem">${t('relatedScenarios')}</div></div>
    <div class="card-grid">${scenarios.map(sc=>`<a class="card" href="#/scenarios/${sc.id}"><h3>${pick(sc.title.en,sc.title.fr,sc.title.ar)}</h3>${diffTag(sc.difficulty)}</a>`).join('') || `<p class="text-muted">${t('underConstruction')}</p>`}</div>
    <div class="section-head mt-24"><div class="section-title" style="font-size:1.2rem">${t('relatedWorlds')}</div></div>
    <div class="flex gap-8 wrap">${(w.relatedWorlds||[]).map(rw=>{ const rwo = MV.data.worlds.find(x=>x.id===rw); return rwo ? `<a class="tag tag-teal" href="#/worlds/${rw}">${rwo.icon} ${pick(rwo.name.en,rwo.name.fr,rwo.name.ar)}</a>` : ''; }).join('')}</div>`;
}

/* ================= SPACES ================= */
function spaceDetail(id){
  const sp = MV.data.spaces.find(x=>x.id===id);
  if(!sp) return MV.interactive.emptyState();
  const w = MV.data.worlds.find(x=>x.id===sp.world);
  const fieldLabels = {
    environment: pick("Environment","Environnement"), temperature: pick("Temperature","Température"),
    moisture: pick("Moisture","Humidité"), oxygen: pick("Oxygen","Oxygène"), nutrients: pick("Nutrients","Nutriments"),
    surface: pick("Surface","Surface"), humanInteraction: pick("Human interaction","Interaction humaine"),
    microbialPressure: pick("Microbial pressure","Pression microbienne"), biofilmRelevance: pick("Biofilm relevance","Pertinence du biofilm")
  };
  const fields = Object.keys(fieldLabels);
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / <a href="#/worlds/${sp.world}">${w?pick(w.name.en,w.name.fr,w.name.ar):sp.world}</a></div>
    <div class="detail-header"><h1>📍 ${pick(sp.name.en,sp.name.fr,sp.name.ar)}</h1>${diffTag(sp.difficulty)}</div>
    <div class="panel"><table class="data-table">
      ${fields.map(f=> sp[f] ? `<tr><td>${fieldLabels[f]}</td><td>${sp[f]}</td></tr>` : '').join('')}
    </table></div>
    <div class="panel"><div class="panel-title">${pick("Typical processes","Processus typiques")}</div>
      <div class="flex gap-8 wrap">${(sp.processes||[]).map(p=>`<span class="tag">${pick(p.en,p.fr,p.ar)}</span>`).join('')}</div>
    </div>`;
}

/* ================= SPECIES ================= */
function speciesHome(){
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / ${t('navMicrobes')}</div>
    <div class="detail-header"><h1>🦠 ${t('navMicrobes')}</h1></div>
    <div class="portal-grid">
      ${Object.keys(KINGDOM_LABELS).map(k=>`
        <a class="portal-card" href="#/species/${k}"><span class="emoji">${KINGDOM_LABELS[k].icon}</span><h3>${pick(KINGDOM_LABELS[k].en,KINGDOM_LABELS[k].fr)}</h3><p>${MV.data[KINGDOM_KEYS[k]].length} ${pick("organisms","organismes")}</p></a>`).join('')}
    </div>`;
}
function speciesKingdom(k){
  const list = MV.data[KINGDOM_KEYS[k]];
  if(!list) return MV.interactive.emptyState();
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / <a href="#/species">${t('navMicrobes')}</a></div>
    <div class="detail-header"><h1>${KINGDOM_LABELS[k].icon} ${pick(KINGDOM_LABELS[k].en,KINGDOM_LABELS[k].fr)}</h1></div>
    <div class="card-grid">
      ${list.map(s=>`<a class="card" href="#/organism/${s.id}"><h3>${s.latin}</h3><p>${s.common ? pick(s.common.en,s.common.fr,s.common.ar) : ''}</p>${diffTag(s.difficulty)}</a>`).join('')}
    </div>`;
}
function organismDetail(id){
  const sp = allSpecies().find(s=>s.id===id);
  if(!sp) return MV.interactive.emptyState();
  MV.progress.markVisited('species', id);
  const fields = [["gram",pick("Gram reaction","Réaction de Gram")],["morphology",pick("Morphology","Morphologie")],
    ["habitat",pick("Habitat","Habitat")],["ecologicalRole",pick("Ecological role","Rôle écologique")],
    ["labRelevance",pick("Laboratory relevance","Pertinence en laboratoire")]];
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / <a href="#/species/${sp.kingdom}">${pick(KINGDOM_LABELS[sp.kingdom].en,KINGDOM_LABELS[sp.kingdom].fr)}</a></div>
    <div class="detail-header">
      <h1 style="font-style:italic">${sp.latin}</h1>
      <p class="lede">${sp.common ? pick(sp.common.en,sp.common.fr,sp.common.ar) : ''}</p>
      ${diffTag(sp.difficulty)}
    </div>
    <div class="panel"><table class="data-table">
      ${fields.map(([f,label])=> sp[f] ? `<tr><td>${label}</td><td>${sp[f]}</td></tr>` : '').join('')}
    </table></div>
    <div class="panel"><div class="panel-title">${pick("Notable characteristic","Caractéristique notable")}</div><p>${sp.notable}</p></div>
    <div class="section-head mt-24"><div class="section-title" style="font-size:1.2rem">${t('relatedWorlds')}</div></div>
    <div class="flex gap-8 wrap">${(sp.relatedWorlds||[]).map(rw=>{ const w = MV.data.worlds.find(x=>x.id===rw); return w ? `<a class="tag tag-teal" href="#/worlds/${rw}">${w.icon} ${pick(w.name.en,w.name.fr,w.name.ar)}</a>` : ''; }).join('')}</div>`;
}

/* ================= SCENARIOS ================= */
function scenariosList(){
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / ${pick("Scenarios","Scénarios")}</div>
    <div class="detail-header"><h1>📋 ${pick("Scenarios","Scénarios")}</h1></div>
    <div class="card-grid">
      ${MV.data.scenarios.map(sc=>`
        <a class="card" href="#/scenarios/${sc.id}">
          <h3>${pick(sc.title.en,sc.title.fr,sc.title.ar)}</h3>
          <p>${pick(sc.context.en,sc.context.fr)}</p>
          <div class="card-meta">${statusBadge(sc.status)}${diffTag(sc.difficulty)}</div>
        </a>`).join('')}
    </div>`;
}
function scenarioDetail(id){
  const sc = MV.data.scenarios.find(x=>x.id===id);
  if(!sc) return MV.interactive.emptyState();
  MV.progress.markVisited('scenarios', id);
  const w = MV.data.worlds.find(x=>x.id===sc.world);
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / <a href="#/worlds/${sc.world}">${w?pick(w.name.en,w.name.fr,w.name.ar):sc.world}</a></div>
    <div class="detail-header">
      <h1>${pick(sc.title.en,sc.title.fr,sc.title.ar)}</h1>
      <p class="lede">${pick(sc.context.en,sc.context.fr)}</p>
      <div class="detail-tags">${statusBadge(sc.status)}${diffTag(sc.difficulty)}</div>
    </div>
    <div class="panel"><div class="panel-title">${pick("Evidence","Éléments")}</div>
      <ul>${sc.evidence.map(e=>`<li style="margin-bottom:6px">🔎 ${pick(e.en,e.fr,e.ar)}</li>`).join('')}</ul></div>
    <div class="panel"><div class="panel-title">${pick("Possible actions","Actions possibles")}</div>
      <ul>${sc.possibleActions.map(a=>`<li style="margin-bottom:6px">→ ${pick(a.en,a.fr,a.ar)}</li>`).join('')}</ul></div>
    <div class="panel">
      <button class="why-btn" onclick="this.nextElementSibling.classList.toggle('open')">${t('whyBtn')}</button>
      <div class="why-panel"><p>${pick(sc.reasoning.en,sc.reasoning.fr)}</p></div>
    </div>
    <div class="panel"><div class="panel-title">${pick("Common misconception","Idée reçue courante")}</div><p>${pick(sc.misconception.en,sc.misconception.fr)}</p></div>
    <div class="panel"><div class="panel-title">${pick("Learning objectives","Objectifs d'apprentissage")}</div>
      <div class="flex gap-8 wrap">${sc.learningObjectives.map(l=>`<span class="tag tag-teal">${pick(l.en,l.fr,l.ar)}</span>`).join('')}</div></div>`;
}

/* ================= GLOSSARY ================= */
function glossaryView(){
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / ${t('navGlossary')}</div>
    <div class="detail-header"><h1>📖 ${t('navGlossary')}</h1></div>
    <div class="search-box"><span class="search-icon">🔍</span><input type="text" id="glossFilter" placeholder="${t('searchPlaceholder')}"></div>
    <div id="glossList" class="card-grid"></div>`;
}
function wireGlossary(){
  const input = document.getElementById('glossFilter');
  function render(q){
    q = (q||'').toLowerCase();
    const list = MV.data.glossary.filter(g => !q || pick(g.term.en,g.term.fr,g.term.ar).toLowerCase().includes(q) || pick(g.def.en,g.def.fr,g.def.ar).toLowerCase().includes(q));
    document.getElementById('glossList').innerHTML = list.map(g=>`
      <div class="card"><h3>${pick(g.term.en,g.term.fr,g.term.ar)}</h3><p>${pick(g.def.en,g.def.fr,g.def.ar)}</p></div>`).join('') || `<p class="text-muted">${t('noResults')}</p>`;
  }
  render('');
  input.addEventListener('input', ()=> render(input.value));
}

/* ================= REFERENCES ================= */
function referencesView(){
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / ${t('referencesTitle')}</div>
    <div class="detail-header"><h1>📚 ${t('referencesTitle')}</h1>
      <p class="lede">${pick("MICROVERSE draws on established organizations and standard bodies. Exact citation details are omitted where unavailable rather than fabricated.","MICROVERSE s'appuie sur des organisations et organismes de normalisation reconnus. Les détails de citation exacts sont omis lorsqu'indisponibles plutôt que fabriqués.")}</p></div>
    <div class="card-grid">
      ${MV.data.references.map(r=>`
        <div class="card"><h3>${r.org}</h3><p>${pick(r.scope.en,r.scope.fr,r.scope.ar)}</p>
        ${r.url ? `<a class="btn btn-sm" href="${r.url}" target="_blank" rel="noopener">${pick("Visit site","Visiter le site")} ↗</a>` : ''}</div>`).join('')}
    </div>`;
}

/* ================= CREATOR ================= */
function creatorView(){
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / ${t('navCreator')}</div>
    <div class="detail-header"><h1>🦑 Zekraoui Rabah AllaaEddine</h1>
      <p class="lede">${t('creatorRole')}</p></div>
    <div class="panel">
      <p>${pick("MICROVERSE is an independent educational project created to make microbiology more interactive, understandable and exploratory. It is not affiliated with any university, hospital, government organization or scientific society unless explicitly stated.",
                "MICROVERSE est un projet éducatif indépendant créé pour rendre la microbiologie plus interactive, compréhensible et explorable. Il n'est affilié à aucune université, aucun hôpital, aucune organisation gouvernementale ni société savante, sauf mention explicite contraire.")}</p>
    </div>
    <div class="panel"><div class="panel-title">${t('builtForCommunity')}</div>
      <p>${t('footerAbout')}</p>
    </div>
    <div class="panel"><div class="panel-title">${t('footerFollow')}</div>
      <div class="social-row"><a href="https://www.linkedin.com/in/zekraouirabahallaaeddine" target="_blank" rel="noopener">LinkedIn</a></div>
    </div>`;
}

/* ================= DONATE ================= */
function donateView(){
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / ${t('donateTitle')}</div>
    <div class="detail-header"><h1>🦑 ${t('donateTitle')}</h1><p class="lede">${t('donateDesc')}</p></div>
    <div class="donate-card">
      <div class="field-static"><span>${pick("Account holder","Titulaire du compte")}</span><span>Zekraoui Rabah Allaa Eddine</span></div>
      <div class="field-static"><span>CCP</span><span>0040145075</span></div>
      <div class="field-static"><span>${pick("Key","Clé")}</span><span>84</span></div>
      <div class="field-static"><span>BaridiMob</span><span>00799999004014507584</span></div>
    </div>`;
}

/* ================= OTHER WEBSITES ================= */
function otherWebsitesView(){
  const sites = MV.data.otherSites;
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / ${pick("Our Other Websites","Nos autres sites")}</div>
    <div class="detail-header"><h1>🌐 ${pick("Check Our Other Websites","Découvrez nos autres sites")}</h1>
      <p class="lede">${pick("Other independent projects by the creator of MICROVERSE.","D'autres projets indépendants du créateur de MICROVERSE.")}</p></div>
    <div class="card-grid">
      ${sites.map(s=>{
        if(s.url){
          return `<a class="card" href="${esc(s.url)}" target="_blank" rel="noopener">
            <div class="card-top"><span class="emoji">🌐</span></div>
            <h3>${esc(pick(s.name.en,s.name.fr,s.name.ar))}</h3>
            ${s.desc ? `<p>${esc(pick(s.desc.en,s.desc.fr,s.desc.ar))}</p>` : ''}
          </a>`;
        }
        return `<div class="card site-placeholder">
          <div class="card-top"><span class="emoji">🌐</span><span class="status-badge status-simplified"><span class="dot"></span>${pick("Coming soon","Bientôt disponible")}</span></div>
          <h3>${pick("Website","Site")} ${s.id}</h3>
          <p class="text-muted">${pick("This link will be added soon.","Ce lien sera ajouté prochainement.")}</p>
        </div>`;
      }).join('')}
    </div>`;
}

/* ================= EXPERIMENTS HUB ================= */
function experimentsHub(){
  const items = [
    {href:"#/experiments/designer", en:"Experiment designer", fr:"Concepteur d'expérience", icon:"⚗️"},
    {href:"#/experiments/whatif", en:"What Happens If…?", fr:"Que se passe-t-il si… ?", icon:"❓"},
    {href:"#/experiments/errors", en:"Lab error detector", fr:"Détecteur d'erreur de laboratoire", icon:"🔎"},
    {href:"#/experiments/omfw", en:"One microbe, five worlds", fr:"Un microbe, cinq mondes", icon:"🧫"},
    {href:"#/domino", en:"Microbial Domino", fr:"Domino microbien", icon:"🁢"}
  ];
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / ${t('navExperiments')}</div>
    <div class="detail-header"><h1>⚗️ ${t('navExperiments')}</h1></div>
    <div class="portal-grid">${items.map(i=>`<a class="portal-card" href="${i.href}"><span class="emoji">${i.icon}</span><h3>${pick(i.en,i.fr)}</h3></a>`).join('')}</div>`;
}

/* ================= SEARCH ================= */
function searchView(prefill){
  return `
    <div class="breadcrumb"><a href="#/">${t('backHome')}</a> / ${t('navSearch')}</div>
    <div class="detail-header"><h1>🔍 ${t('navSearch')}</h1></div>
    <div class="search-box"><span class="search-icon">🔍</span><input type="text" id="searchInput" value="${esc(prefill||'')}" placeholder="${t('searchPlaceholder')}"></div>
    <div id="searchResults"></div>`;
}
function buildSearchIndex(){
  const idx = [];
  MV.data.worlds.forEach(w=> idx.push({type:'World',label:pick(w.name.en,w.name.fr,w.name.ar),href:`#/worlds/${w.id}`,text:pick(w.name.en,w.name.fr,w.name.ar)+' '+pick(w.description.en,w.description.fr,w.description.ar)}));
  MV.data.spaces.forEach(s=> idx.push({type:'Space',label:pick(s.name.en,s.name.fr,s.name.ar),href:`#/spaces/${s.id}`,text:pick(s.name.en,s.name.fr,s.name.ar)+' '+(s.environment||'')}));
  allSpecies().forEach(s=> idx.push({type:'Organism',label:s.latin,href:`#/organism/${s.id}`,text:s.latin+' '+(s.common?pick(s.common.en,s.common.fr,s.common.ar):'')+' '+(s.habitat||'')}));
  MV.data.scenarios.forEach(sc=> idx.push({type:'Scenario',label:pick(sc.title.en,sc.title.fr,sc.title.ar),href:`#/scenarios/${sc.id}`,text:pick(sc.title.en,sc.title.fr,sc.title.ar)+' '+pick(sc.context.en,sc.context.fr)}));
  MV.data.glossary.forEach(g=> idx.push({type:'Glossary',label:pick(g.term.en,g.term.fr,g.term.ar),href:`#/glossary`,text:pick(g.term.en,g.term.fr,g.term.ar)+' '+pick(g.def.en,g.def.fr,g.def.ar)}));
  MV.data.myths.forEach(m=> idx.push({type:'Myth',label:pick(m.claim.en,m.claim.fr,m.claim.ar),href:`#/myths`,text:pick(m.claim.en,m.claim.fr,m.claim.ar)}));
  MV.data.investigations.forEach(c=> idx.push({type:'Investigation',label:pick(c.title.en,c.title.fr,c.title.ar),href:`#/investigations/${c.id}`,text:pick(c.title.en,c.title.fr,c.title.ar)+' '+pick(c.briefing.en,c.briefing.fr)}));
  return idx;
}
function wireSearch(prefill){
  const input = document.getElementById('searchInput');
  const idx = buildSearchIndex();
  function render(q){
    q = (q||'').toLowerCase().trim();
    if(!q){ document.getElementById('searchResults').innerHTML=''; return; }
    const results = idx.filter(r=> r.text.toLowerCase().includes(q)).slice(0,40);
    document.getElementById('searchResults').innerHTML = results.length ? `<div class="card-grid mt-16">${results.map(r=>`
      <a class="card" href="${r.href}"><span class="tag tag-teal">${r.type}</span><h3 class="mt-8">${r.label}</h3></a>`).join('')}</div>` : `<p class="text-muted mt-16">${t('noResults')}</p>`;
  }
  input.addEventListener('input', ()=> render(input.value));
  if(prefill) render(prefill);
}

/* ================= RANDOM DISCOVERY ================= */
function surpriseMe(){
  const pools = [
    ()=> `#/worlds/${MV.data.worlds[Math.floor(Math.random()*MV.data.worlds.length)].id}`,
    ()=> `#/organism/${allSpecies()[Math.floor(Math.random()*allSpecies().length)].id}`,
    ()=> `#/scenarios/${MV.data.scenarios[Math.floor(Math.random()*MV.data.scenarios.length)].id}`,
    ()=> `#/investigations/${MV.data.investigations[Math.floor(Math.random()*MV.data.investigations.length)].id}`,
    ()=> `#/spaces/${MV.data.spaces[Math.floor(Math.random()*MV.data.spaces.length)].id}`,
    ()=> `#/myths`
  ];
  location.hash = pools[Math.floor(Math.random()*pools.length)]();
}

/* ================= ROUTER ================= */
const routes = [
  { p:/^#\/$/, view: ()=>({html:home(), after:()=>{ initHeroCanvas(); dailyMicrobe(); animateCounters(); document.getElementById('surpriseBtn').addEventListener('click', surpriseMe); }}) },
  { p:/^#\/worlds$/, view: ()=>({html:worldsList()}) },
  { p:/^#\/worlds\/([\w-]+)$/, view: (m)=>({html:worldDetail(m[1])}) },
  { p:/^#\/spaces\/([\w-]+)$/, view: (m)=>({html:spaceDetail(m[1])}) },
  { p:/^#\/species$/, view: ()=>({html:speciesHome()}) },
  { p:/^#\/species\/([\w-]+)$/, view: (m)=>({html:speciesKingdom(m[1])}) },
  { p:/^#\/organism\/([\w-]+)$/, view: (m)=>({html:organismDetail(m[1])}) },
  { p:/^#\/scenarios$/, view: ()=>({html:scenariosList()}) },
  { p:/^#\/scenarios\/([\w-]+)$/, view: (m)=>({html:scenarioDetail(m[1])}) },
  { p:/^#\/lab$/, view: ()=>({html:MV.lab.labHome()}) },
  { p:/^#\/lab\/microscopy$/, view: ()=>({html:MV.lab.microscopy(), after:()=> document.getElementById('morphRun').addEventListener('click', MV.lab.microscopyRun)}) },
  { p:/^#\/lab\/culture$/, view: ()=>({html:MV.lab.culture(), after:()=>{ MV.lab.cultureWire(); document.getElementById('cultRun').addEventListener('click', MV.lab.cultureRun); }}) },
  { p:/^#\/lab\/biochem$/, view: ()=>({html:MV.lab.biochem()}) },
  { p:/^#\/lab\/molecular$/, view: ()=>({html:MV.lab.molecular()}) },
  { p:/^#\/lab\/sampling$/, view: ()=>({html:MV.lab.sampling()}) },
  { p:/^#\/domino$/, view: ()=>({html:MV.interactive.domino(MV.data.domino[0].id)}) },
  { p:/^#\/think$/, view: ()=>({html:MV.interactive.thinkHome()}) },
  { p:/^#\/think\/([\w-]+)$/, view: (m)=>({html:MV.interactive.tree(m[1]), after:()=> MV.interactive.renderTreeNode()}) },
  { p:/^#\/investigations$/, view: ()=>({html:MV.interactive.investigationsHome()}) },
  { p:/^#\/investigations\/([\w-]+)$/, view: (m)=>({html:MV.interactive.investigation(m[1])}) },
  { p:/^#\/unknown$/, view: ()=>({html:MV.interactive.unknownHome(), after:()=> MV.interactive.renderUnknownPanel()}) },
  { p:/^#\/myths$/, view: ()=>({html:MV.interactive.mythsHome()}) },
  { p:/^#\/glossary$/, view: ()=>({html:glossaryView(), after:wireGlossary}) },
  { p:/^#\/references$/, view: ()=>({html:referencesView()}) },
  { p:/^#\/creator$/, view: ()=>({html:creatorView()}) },
  { p:/^#\/donate$/, view: ()=>({html:donateView()}) },
  { p:/^#\/websites$/, view: ()=>({html:otherWebsitesView()}) },
  { p:/^#\/experiments$/, view: ()=>({html:experimentsHub()}) },
  { p:/^#\/experiments\/designer$/, view: ()=>({html:MV.interactive.experimentDesigner()}) },
  { p:/^#\/experiments\/whatif$/, view: ()=>({html:MV.interactive.whatIf()}) },
  { p:/^#\/experiments\/errors$/, view: ()=>({html:MV.interactive.labErrorDetector()}) },
  { p:/^#\/experiments\/omfw$/, view: ()=>({html:MV.interactive.oneMicrobeFiveWorlds()}) },
  { p:/^#\/map$/, view: ()=>({html:MV.interactive.constellation()}) },
  { p:/^#\/achievements$/, view: ()=>({html:MV.interactive.achievements()}) },
  { p:/^#\/search$/, view: ()=>({html:searchView(), after:()=>wireSearch()}) },
];

let _mvLoaderTimer = null;
function showLoader(){
  const el = document.getElementById('pageLoader');
  if(!el) return;
  el.classList.add('show');
}
function hideLoader(){
  const el = document.getElementById('pageLoader');
  if(!el) return;
  el.classList.remove('show');
}
function router(){
  showLoader();
  clearTimeout(_mvLoaderTimer);
  // Brief squid transition, long enough to register as a moment, short enough to never feel like a wait.
  _mvLoaderTimer = setTimeout(()=>{
    const hash = location.hash || '#/';
    const view = document.getElementById('view');
    let matched = false;
    for(const r of routes){
      const m = hash.match(r.p);
      if(m){
        const res = r.view(m);
        view.innerHTML = res.html;
        window.scrollTo(0,0);
        updateActiveNav(hash);
        if(res.after) res.after();
        initSpotlight();
        initScrollReveal();
        matched = true;
        break;
      }
    }
    if(!matched) view.innerHTML = MV.interactive.emptyState();
    requestAnimationFrame(()=> requestAnimationFrame(hideLoader));
  }, 260);
}
function updateActiveNav(hash){
  document.querySelectorAll('.nav-link').forEach(a=>{
    a.classList.toggle('active', hash.indexOf(a.getAttribute('href'))===0 && a.getAttribute('href')!=='#/');
  });
}

function renderAll(){
  renderNav();
  renderFooter();
  router();
}

document.addEventListener('DOMContentLoaded', ()=>{
  applyLangAttrs();
  renderAll();
  window.addEventListener('hashchange', router);
});
})();
