window.MV = window.MV || {};
MV.interactive = (function(){
  const pick = MV.lab.pick, statusBadge = MV.lab.statusBadge;

  // ---------- Domino ----------
  function domino(id){
    const d = MV.data.domino.find(x=>x.id===id) || MV.data.domino[0];
    const html = `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / Microbial Domino</div>
      <div class="detail-header"><h1>🁢 ${pick(d.title.en,d.title.fr,d.title.ar)}</h1>${statusBadge(d.status)}</div>
      <div class="panel">
        <div class="domino-chain" id="dominoChain">
          ${d.stages.map((s,i)=>`
            <div class="domino-node" data-stage="${s.id}" id="stage-${s.id}">
              <div class="connector"></div>
              <div class="node-dot">${i+1}</div>
              <div style="flex:1"><div class="node-label">${pick(s.label.en,s.label.fr)}</div><div class="node-desc">${pick(s.desc.en,s.desc.fr)}</div>
                <div class="mt-8"><button class="btn btn-sm" onclick="MV.interactive.intervene('${d.id}','${s.id}')">${pick("Intervene here","Intervenir ici")}</button></div>
                <div id="int-${s.id}" class="why-panel"></div>
              </div>
            </div>`).join('')}
        </div>
        <p class="text-muted mt-16">${pick("Click \"Intervene\" at any stage to see how breaking the chain there changes the outcome.","Cliquez sur « Intervenir » à n'importe quelle étape pour voir comment interrompre la chaîne à cet endroit change le résultat.")}</p>
      </div>`;
    return html;
  }
  function intervene(domId, stageId){
    const d = MV.data.domino.find(x=>x.id===domId);
    const opts = d.interventions[stageId] || [];
    const panel = document.getElementById('int-'+stageId);
    panel.classList.add('open');
    panel.innerHTML = `<ul>${opts.map(o=>`<li>${pick(o.en,o.fr)}</li>`).join('')}</ul>`;
    // mark subsequent stages broken
    const idx = d.stages.findIndex(s=>s.id===stageId);
    d.stages.forEach((s,i)=>{
      const node = document.getElementById('stage-'+s.id);
      if(i > idx) node.classList.add('broken'); else node.classList.remove('broken');
    });
    MV.progress.incr('reasoningCompleted');
  }

  // ---------- Decision trees ----------
  function thinkHome(){
    const trees = MV.data.decisionTrees;
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / ${MV.t('navThink')}</div>
      <div class="detail-header"><h1>🧠 ${MV.t('navThink')}</h1>
        <p class="lede">${pick("Interactive reasoning trees across common microbiology decision points. These are educational reasoning aids, not diagnostic tools.","Arbres de raisonnement interactifs sur des points de décision courants en microbiologie. Ce sont des aides pédagogiques au raisonnement, pas des outils diagnostiques.")}</p>
      </div>
      <div class="card-grid">
        ${trees.map(t=>`<a class="card" href="#/think/${t.id}"><h3>${pick(t.title.en,t.title.fr,t.title.ar)}</h3>${statusBadge(t.status)}</a>`).join('')}
      </div>`;
  }
  function tree(id){
    const tr = MV.data.decisionTrees.find(x=>x.id===id);
    if(!tr) return emptyState();
    window._mvTreeState = { id, node: tr.start };
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / <a href="#/think">${MV.t('navThink')}</a></div>
      <div class="detail-header"><h1>${pick(tr.title.en,tr.title.fr,tr.title.ar)}</h1>${statusBadge(tr.status)}</div>
      <div class="panel" id="treeHost"></div>`;
  }
  function renderTreeNode(){
    const st = window._mvTreeState;
    const tr = MV.data.decisionTrees.find(x=>x.id===st.id);
    const node = tr.nodes[st.node];
    const host = document.getElementById('treeHost');
    if(!host) return;
    if(node.result){
      host.innerHTML = `<div class="readout">${pick(node.result.en,node.result.fr)}</div>
        <button class="btn btn-sm mt-16" onclick="MV.interactive.resetTree()">${pick("Start over","Recommencer")}</button>`;
      MV.progress.incr('reasoningCompleted');
      return;
    }
    host.innerHTML = `<p style="font-weight:600;margin-bottom:14px">${pick(node.q.en,node.q.fr)}</p>
      <div class="flex gap-8 wrap">${node.options.map(o=>`<button class="btn" onclick="MV.interactive.treeStep('${o.next}')">${pick(o.label.en,o.label.fr)}</button>`).join('')}</div>`;
  }
  function treeStep(next){ window._mvTreeState.node = next; renderTreeNode(); }
  function resetTree(){
    const tr = MV.data.decisionTrees.find(x=>x.id===window._mvTreeState.id);
    window._mvTreeState.node = tr.start; renderTreeNode();
  }

  // ---------- Investigations ----------
  function investigationsHome(){
    const list = MV.data.investigations;
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / ${MV.t('navInvestigations')}</div>
      <div class="detail-header"><h1>🕵️ ${MV.t('navInvestigations')}</h1>
        <p class="lede">${pick("Fictional educational cases. Reconstruct the most plausible contamination pathway from the evidence provided.","Cas éducatifs fictifs. Reconstituez la voie de contamination la plus plausible à partir des éléments fournis.")}</p>
      </div>
      <div class="card-grid">
        ${list.map(c=>`
          <a class="card" href="#/investigations/${c.id}">
            <div class="card-top"><h3>${pick(c.title.en,c.title.fr,c.title.ar)}</h3></div>
            <p>${pick(c.briefing.en,c.briefing.fr)}</p>
            <div class="card-meta">${statusBadge(c.status)}<span class="tag diff-${c.difficulty}">${c.difficulty}</span></div>
          </a>`).join('')}
      </div>`;
  }
  function investigation(id){
    const c = MV.data.investigations.find(x=>x.id===id);
    if(!c) return emptyState();
    MV.progress.markVisited('investigations', id);
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / <a href="#/investigations">${MV.t('navInvestigations')}</a></div>
      <div class="detail-header"><h1>${pick(c.title.en,c.title.fr,c.title.ar)}</h1>${statusBadge(c.status)}
        <p class="lede mt-8">${pick(c.briefing.en,c.briefing.fr)}</p></div>
      <div class="panel"><div class="panel-title">${pick("Timeline","Chronologie")}</div>
        <div class="domino-chain">
          ${c.timeline.map((tl,i)=>`<div class="domino-node"><div class="connector"></div><div class="node-dot">${i+1}</div><div><div class="node-label">${tl.t}</div><div class="node-desc">${pick(tl.event.en,tl.event.fr)}</div></div></div>`).join('')}
        </div>
      </div>
      <div class="panel"><div class="panel-title">${pick("Evidence board","Tableau des preuves")}</div>
        <ul>${c.evidenceBoard.map(e=>`<li style="margin-bottom:8px">🔎 ${pick(e.en,e.fr)}</li>`).join('')}</ul>
      </div>
      <div class="panel"><div class="panel-title">${pick("Most supported hypothesis","Hypothèse la plus étayée")}</div>
        <p>${pick(c.hypothesis.en,c.hypothesis.fr)}</p>
      </div>`;
  }

  // ---------- Myth machine ----------
  function mythsHome(filter){
    let list = MV.data.myths;
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / ${MV.t('navMyths')}</div>
      <div class="detail-header"><h1>❓ ${MV.t('navMyths')}</h1>
        <p class="lede">${pick("Common microbiology claims, tested against evidence.","Affirmations courantes en microbiologie, testées face aux preuves.")}</p></div>
      <div class="card-grid" id="mythGrid">
        ${list.map(m=>`
          <div class="card">
            <div class="card-top"><h3 style="font-size:0.95rem">${pick(m.claim.en,m.claim.fr,m.claim.ar)}</h3></div>
            <button class="btn btn-sm" onclick="MV.interactive.revealMyth('${m.id}')">${pick("Reveal verdict","Révéler le verdict")}</button>
            <div id="myth-${m.id}" style="display:none">
              <div class="tag ${m.verdict==='false'?'tag-coral':m.verdict==='true'?'tag-green':'tag-amber'} mt-8">${m.verdict.toUpperCase()}</div>
              <p class="mt-8">${pick(m.why.en,m.why.fr,m.why.ar)}</p>
              <p class="text-muted mt-8" style="font-size:0.78rem"><strong>${pick("Principle:","Principe :")}</strong> ${pick(m.principle.en,m.principle.fr,m.principle.ar)}</p>
            </div>
          </div>`).join('')}
      </div>`;
  }
  function revealMyth(id){
    document.getElementById('myth-'+id).style.display = 'block';
    MV.progress.incr('reasoningCompleted');
  }

  // ---------- Unknown organism ----------
  const UNKNOWN_POOL = MV.data && MV.data.speciesBacteria ? null : null; // placeholder, resolved lazily
  function unknownHome(){
    const specimen = getDailyOrRandomUnknown();
    window._mvUnknown = { specimen, revealed:[] };
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / ${MV.t('navUnknown')}</div>
      <div class="detail-header"><h1>🧬 ${MV.t('navUnknown')} #${specimen.id.toUpperCase()}</h1>${statusBadge('simplified')}</div>
      <div class="panel" id="unknownPanel"></div>`;
  }
  function getDailyOrRandomUnknown(){
    const all = allSpecies();
    return all[Math.floor(Math.random()*all.length)];
  }
  function allSpecies(){
    return [].concat(MV.data.speciesBacteria, MV.data.speciesFungi, MV.data.speciesProtozoa, MV.data.speciesVirus, MV.data.speciesAlgae);
  }
  const CLUE_ORDER = ["kingdom","gram","morphology","habitat","ecologicalRole"];
  function renderUnknownPanel(){
    const st = window._mvUnknown;
    const sp = st.specimen;
    const host = document.getElementById('unknownPanel');
    if(!host) return;
    const remaining = CLUE_ORDER.filter(k=> !st.revealed.includes(k) && sp[k]);
    host.innerHTML = `
      <table class="data-table">
        ${st.revealed.map(k=>`<tr><td>${labelFor(k)}</td><td>${sp[k]}</td></tr>`).join('')}
      </table>
      <div class="flex gap-8 wrap mt-16">
        ${remaining.length ? `<button class="btn btn-sm" onclick="MV.interactive.revealClue()">${pick("Run next test","Exécuter le test suivant")}</button>` : ''}
        <button class="btn btn-primary btn-sm" onclick="MV.interactive.guessUnknown()">${pick("Show most supported identification","Afficher l'identification la plus étayée")}</button>
      </div>
      <div id="unknownResult" class="mt-16"></div>`;
  }
  function labelFor(k){
    const map = { kingdom:"Kingdom", gram:"Gram reaction", morphology:"Morphology", habitat:"Habitat", ecologicalRole:"Ecological role" };
    const mapFr = { kingdom:"Règne", gram:"Réaction de Gram", morphology:"Morphologie", habitat:"Habitat", ecologicalRole:"Rôle écologique" };
    return pick(map[k],mapFr[k]);
  }
  function revealClue(){
    const st = window._mvUnknown;
    const remaining = CLUE_ORDER.filter(k=> !st.revealed.includes(k) && st.specimen[k]);
    if(remaining.length) st.revealed.push(remaining[0]);
    renderUnknownPanel();
  }
  function guessUnknown(){
    const st = window._mvUnknown;
    document.getElementById('unknownResult').innerHTML = `
      <div class="readout">
        <div class="r-label">${pick("Most supported identification","Identification la plus étayée")}</div>
        <div class="r-value">${st.specimen.latin}</div>
        <p class="text-muted" style="font-size:0.82rem">${pick(st.specimen.notable, st.specimen.notable)}</p>
        <p class="text-muted mt-8" style="font-size:0.78rem">${pick("This decision-tree-style identification is a simplified educational exercise, not a substitute for laboratory identification.","Cette identification de type arbre décisionnel est un exercice pédagogique simplifié, pas un substitut à l'identification en laboratoire.")}</p>
      </div>`;
    MV.progress.incr('unknownsSolved');
  }

  // ---------- What happens if ----------
  const WHATIF_VARS = [
    { id:"temperature", en:"Temperature", fr:"Température" },
    { id:"moisture", en:"Moisture", fr:"Humidité" },
    { id:"nutrients", en:"Nutrient availability", fr:"Disponibilité en nutriments" },
    { id:"cleaning", en:"Cleaning frequency", fr:"Fréquence de nettoyage" },
    { id:"competition", en:"Microbial competition", fr:"Compétition microbienne" },
    { id:"contactFrequency", en:"Contact frequency", fr:"Fréquence de contact" }
  ];
  function whatIf(){
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / What Happens If…?</div>
      <div class="detail-header"><h1>❓ ${pick("What Happens If…?","Que se passe-t-il si… ?")}</h1>${statusBadge('conceptual')}</div>
      <div class="panel">
        ${WHATIF_VARS.map(v=>`
          <div class="field"><label>${pick(v.en,v.fr)}</label>
            <input type="range" min="0" max="100" value="50" id="wi-${v.id}" oninput="MV.interactive.whatIfLive()">
          </div>`).join('')}
        <div id="whatIfOut" class="readout mt-16"></div>
      </div>`;
  }
  function whatIfLive(){
    const vars = {};
    WHATIF_VARS.forEach(v=> vars[v.id] = parseInt(document.getElementById('wi-'+v.id).value));
    const res = MV.engine.score(vars);
    const out = document.getElementById('whatIfOut');
    out.innerHTML = `
      <div class="r-label">${pick("Survival potential","Potentiel de survie")}</div><div class="r-value">${res.survival.toUpperCase()}</div>
      <div class="r-label">${pick("Colonization potential","Potentiel de colonisation")}</div><div class="r-value">${res.colonization.toUpperCase()}</div>
      <div class="r-label">${pick("Biofilm potential","Potentiel de biofilm")}</div><div class="r-value">${res.biofilm.toUpperCase()}</div>
      <div class="r-label">${pick("Environmental stress","Stress environnemental")}</div><div class="r-value">${res.stress.toUpperCase()}</div>
      <div class="r-label">${pick("Persistence potential","Potentiel de persistance")}</div><div class="r-value">${res.persistence.toUpperCase()}</div>
      <button class="why-btn mt-8" onclick="this.nextElementSibling.classList.toggle('open')">${MV.t('whyBtn')}</button>
      <div class="why-panel"><ul>${MV.engine.whyFactors(vars,'persistence').map(r=>`<li>${pick(r.en,r.fr)}</li>`).join('')}</ul></div>
      <p class="text-muted mt-8" style="font-size:0.75rem">${pick("EDUCATIONAL SIMULATION, a simplified qualitative model, not a validated prediction.","SIMULATION ÉDUCATIVE, un modèle qualitatif simplifié, pas une prédiction validée.")}</p>`;
    MV.progress.incr('reasoningCompleted');
  }

  // ---------- Experiment designer ----------
  function experimentDesigner(){
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / ${MV.t('navExperiments')}</div>
      <div class="detail-header"><h1>⚗️ ${pick("Experiment designer","Concepteur d'expérience")}</h1>${statusBadge('simplified')}</div>
      <div class="panel">
        <div class="field"><label>${pick("Hypothesis","Hypothèse")}</label><input type="text" id="expHyp" placeholder="${pick('e.g. disinfectant X reduces surface counts more than water alone','ex. le désinfectant X réduit davantage les comptages que l\u2019eau seule')}"></div>
        <div class="field"><label>${pick("Negative control included?","Témoin négatif inclus ?")}</label>
          <select id="expNegControl"><option value="yes">${pick("Yes","Oui")}</option><option value="no">${pick("No","Non")}</option></select></div>
        <div class="field"><label>${pick("Positive control included?","Témoin positif inclus ?")}</label>
          <select id="expPosControl"><option value="yes">${pick("Yes","Oui")}</option><option value="no">${pick("No","Non")}</option></select></div>
        <div class="field"><label>${pick("Sample size per group","Taille d'échantillon par groupe")}</label>
          <select id="expSampleSize"><option value="1">1</option><option value="3">3</option><option value="10" selected>10</option></select></div>
        <button class="btn btn-primary" onclick="MV.interactive.evaluateExperiment()">${pick("Evaluate design","Évaluer le protocole")}</button>
        <div id="expOut" class="mt-16"></div>
      </div>`;
  }
  function evaluateExperiment(){
    const neg = document.getElementById('expNegControl').value;
    const pos = document.getElementById('expPosControl').value;
    const n = parseInt(document.getElementById('expSampleSize').value);
    const issues = [];
    if(neg==='no') issues.push(pick("Your experiment lacks a negative control, without one, you cannot rule out background contamination as the source of any observed effect.","Votre expérience manque d'un témoin négatif, sans lui, vous ne pouvez pas écarter une contamination de fond comme source de tout effet observé."));
    if(pos==='no') issues.push(pick("Your experiment lacks a positive control, without one, a \"no effect\" result could simply mean the method itself did not work.","Votre expérience manque d'un témoin positif, sans lui, un résultat « aucun effet » pourrait simplement signifier que la méthode elle-même n'a pas fonctionné."));
    if(n < 3) issues.push(pick("A sample size of 1 per group makes it hard to distinguish a real effect from normal variability.","Une taille d'échantillon de 1 par groupe rend difficile la distinction entre un effet réel et une variabilité normale."));
    const box = document.getElementById('expOut');
    if(issues.length===0){
      box.innerHTML = `<div class="readout"><div class="r-value" style="font-size:0.95rem">${pick("This design includes the core elements expected of a controlled comparison.","Ce protocole inclut les éléments essentiels attendus d'une comparaison contrôlée.")}</div></div>`;
    } else {
      box.innerHTML = `<div class="panel">${issues.map(i=>`<p style="margin-bottom:10px">⚠️ ${i}</p>`).join('')}</div>`;
    }
    MV.progress.incr('reasoningCompleted');
  }

  // ---------- Lab error detector ----------
  const LAB_ERRORS = [
    { id:"le1", scenario:{en:"A sample was collected correctly but left at room temperature for 6 hours before reaching the lab.",fr:"Un échantillon a été correctement prélevé mais laissé à température ambiante pendant 6 heures avant d'atteindre le laboratoire."},
      error:{en:"Delayed transport at ambient temperature",fr:"Transport retardé à température ambiante"},
      consequence:{en:"Organism counts may no longer reflect the true state of the original sample.",fr:"Les comptages d'organismes peuvent ne plus refléter l'état réel de l'échantillon d'origine."} },
    { id:"le2", scenario:{en:"A technician ran a sterility test without including a positive control.",fr:"Un technicien a réalisé un test de stérilité sans inclure de témoin positif."},
      error:{en:"Missing positive control",fr:"Témoin positif manquant"},
      consequence:{en:"A negative result cannot be confidently interpreted, since a failed test method would also look negative.",fr:"Un résultat négatif ne peut être interprété avec confiance, une méthode de test défaillante paraîtrait également négative."} },
    { id:"le3", scenario:{en:"An anaerobic culture was incubated on an open bench instead of in an anaerobic jar or chamber.",fr:"Une culture anaérobie a été incubée sur une paillasse ouverte au lieu d'une jarre ou d'une chambre anaérobie."},
      error:{en:"Inappropriate incubation atmosphere",fr:"Atmosphère d'incubation inappropriée"},
      consequence:{en:"Strict anaerobes will fail to grow, producing a false no-growth result.",fr:"Les anaérobies strictes ne pousseront pas, produisant un faux résultat de non-croissance."} }
  ];
  function labErrorDetector(){
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / Lab Error Detector</div>
      <div class="detail-header"><h1>🔎 ${pick("Lab error detector","Détecteur d'erreur de laboratoire")}</h1>${statusBadge('fictional')}</div>
      <div class="card-grid">
        ${LAB_ERRORS.map(e=>`
          <div class="card">
            <p>${pick(e.scenario.en,e.scenario.fr)}</p>
            <button class="btn btn-sm" onclick="MV.interactive.revealError('${e.id}')">${pick("What went wrong?","Qu'est-ce qui a mal tourné ?")}</button>
            <div id="err-${e.id}" style="display:none" class="mt-8">
              <div class="tag tag-coral">${pick(e.error.en,e.error.fr)}</div>
              <p class="mt-8 text-muted" style="font-size:0.85rem">${pick(e.consequence.en,e.consequence.fr)}</p>
            </div>
          </div>`).join('')}
      </div>`;
  }
  function revealError(id){ document.getElementById('err-'+id).style.display='block'; MV.progress.incr('reasoningCompleted'); }

  // ---------- One microbe, five worlds ----------
  function oneMicrobeFiveWorlds(){
    const species = allSpecies();
    const opts = species.map(s=>`<option value="${s.id}">${s.latin}</option>`).join('');
    const worlds = MV.data.worlds.slice(0,5);
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / One Microbe, Five Worlds</div>
      <div class="detail-header"><h1>🧫 ${pick("One microbe, five worlds","Un microbe, cinq mondes")}</h1>${statusBadge('conceptual')}</div>
      <div class="panel">
        <div class="field"><label>${pick("Choose an organism","Choisissez un organisme")}</label><select id="omfwSelect">${opts}</select></div>
        <button class="btn btn-primary" onclick="MV.interactive.runOMFW()">${pick("Compare across worlds","Comparer entre les mondes")}</button>
        <div id="omfwOut" class="mt-16"></div>
      </div>`;
  }
  function runOMFW(){
    const id = document.getElementById('omfwSelect').value;
    const sp = allSpecies().find(s=>s.id===id) || allSpecies()[0];
    const worlds = MV.data.worlds.slice(0,5);
    const rows = worlds.map(w=>{
      // deterministic pseudo-variation seeded by string hash for reproducibility
      const seed = hash(sp.id+w.id);
      const vars = { temperature: 30+(seed%50), moisture: 20+((seed>>2)%60), nutrients: 20+((seed>>4)%60), cleaning: (seed>>6)%50, competition:(seed>>3)%60, contactFrequency:(seed>>5)%60 };
      const res = MV.engine.score(vars);
      return `<tr><td>${pick(w.name.en,w.name.fr,w.name.ar)}</td><td>${res.survival}</td><td>${res.colonization}</td><td>${res.persistence}</td></tr>`;
    }).join('');
    document.getElementById('omfwOut').innerHTML = `
      <table class="data-table">
        <tr><td><strong>${pick("World","Monde")}</strong></td><td><strong>${pick("Survival","Survie")}</strong></td><td><strong>${pick("Colonization","Colonisation")}</strong></td><td><strong>${pick("Persistence","Persistance")}</strong></td></tr>
        ${rows}
      </table>
      <p class="text-muted mt-16" style="font-size:0.85rem">${pick("Microbial behavior is inseparable from environmental context, the same organism shows different outputs depending on where it is placed.","Le comportement microbien est indissociable du contexte environnemental, le même organisme montre des résultats différents selon le milieu où il est placé.")}</p>`;
    MV.progress.incr('reasoningCompleted');
  }
  function hash(str){ let h=0; for(let i=0;i<str.length;i++){ h = (h*31 + str.charCodeAt(i))|0; } return Math.abs(h); }

  // ---------- Constellation (simple SVG knowledge graph) ----------
  function constellation(){
    const nodes = [
      {id:"biofilm", label:"Biofilm", x:50, y:50},
      {id:"eps", label:"EPS matrix", x:20, y:20},
      {id:"surface", label:"Surface", x:80, y:20},
      {id:"persistence", label:"Persistence", x:20, y:80},
      {id:"cleaning", label:"Cleaning", x:80, y:80}
    ];
    const edges = [["biofilm","eps"],["biofilm","surface"],["biofilm","persistence"],["persistence","cleaning"]];
    const svgNodes = nodes.map(n=>`<circle cx="${n.x}" cy="${n.y}" r="3" fill="#2ddccb"/><text x="${n.x}" y="${n.y-4}" font-size="3" fill="#e7edf0" text-anchor="middle">${n.label}</text>`).join('');
    const svgEdges = edges.map(([a,b])=>{
      const na=nodes.find(n=>n.id===a), nb=nodes.find(n=>n.id===b);
      return `<line x1="${na.x}" y1="${na.y}" x2="${nb.x}" y2="${nb.y}" stroke="#223038" stroke-width="0.5"/>`;
    }).join('');
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / ${MV.t('navMap')}</div>
      <div class="detail-header"><h1>🌌 ${MV.t('navMap')}</h1><p class="lede">${pick("A small sample knowledge graph, the full constellation grows as more concepts are connected.","Un petit échantillon de graphe de connaissances, la constellation complète grandit à mesure que d'autres concepts sont connectés.")}</p></div>
      <div class="panel"><svg viewBox="0 0 100 100" style="width:100%;height:400px">${svgEdges}${svgNodes}</svg></div>`;
  }

  // ---------- Achievements page ----------
  function achievements(){
    const s = MV.progress.load();
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / ${MV.t('achievementsTitle')}</div>
      <div class="detail-header"><h1>🏅 ${MV.t('achievementsTitle')}</h1></div>
      <div class="card-grid">
        ${MV.progress.ACHIEVEMENTS.map(a=>{
          const got = s.achievements.includes(a.id);
          return `<div class="card" style="opacity:${got?1:0.4}"><span class="emoji" style="font-size:1.6rem">${a.emoji}</span><h3>${pick(a.title.en,a.title.fr,a.title.ar)}</h3><p>${pick(a.desc.en,a.desc.fr)}</p></div>`;
        }).join('')}
      </div>
      <button class="btn mt-24" onclick="if(confirm('${MV.t('resetProgress')}?')){MV.progress.reset(); location.reload();}">${MV.t('resetProgress')}</button>`;
  }

  function emptyState(){
    return `<div class="empty-state">
      <svg class="squid-mark" viewBox="0 0 48 48" fill="none"><circle cx="24" cy="18" r="16" fill="#2ddccb"/><rect x="10.9" y="25.1" width="6" height="14.1" rx="3" fill="#2ddccb"/><rect x="17.8" y="25.1" width="5.3" height="20.9" rx="2.65" fill="#2ddccb"/><rect x="24.9" y="25.1" width="5.3" height="20.9" rx="2.65" fill="#2ddccb"/><rect x="31.1" y="25.1" width="6" height="14.1" rx="3" fill="#2ddccb"/><circle cx="17.3" cy="18" r="3.6" fill="#04211d"/><circle cx="30.7" cy="18" r="3.6" fill="#04211d"/></svg>
      <p>${MV.t('underConstruction')}</p></div>`;
  }

  return { domino, intervene, thinkHome, tree, renderTreeNode, treeStep, resetTree,
    investigationsHome, investigation, mythsHome, revealMyth,
    unknownHome, renderUnknownPanel, revealClue, guessUnknown,
    whatIf, whatIfLive, experimentDesigner, evaluateExperiment,
    labErrorDetector, revealError, oneMicrobeFiveWorlds, runOMFW,
    constellation, achievements, emptyState };
})();
