window.MV = window.MV || {};
MV.lab = (function(){
  const t = ()=>MV.t;

  function statusBadge(status){
    const map = { established:"statusEstablished", simplified:"statusSimplified", conceptual:"statusConceptual", fictional:"statusFictional" };
    return `<span class="status-badge status-${status}"><span class="dot"></span>${MV.t(map[status]||"statusSimplified")}</span>`;
  }

  function labHome(){
    const items = [
      { href:"#/lab/microscopy", icon:"🔬", en:"Microscopy", fr:"Microscopie", d:{en:"Simulated Gram stain, wet mount and morphology observation.",fr:"Simulation de coloration de Gram, préparation à l'état frais et observation morphologique."} },
      { href:"#/lab/culture", icon:"🧫", en:"Culture", fr:"Culture", d:{en:"Choose a sample, medium and incubation conditions and observe an educational simulated result.",fr:"Choisissez un échantillon, un milieu et des conditions d'incubation et observez un résultat simulé pédagogique."} },
      { href:"#/lab/biochem", icon:"⚗️", en:"Biochemical testing", fr:"Tests biochimiques", d:{en:"Select tests and interpret simulated biochemical reactions.",fr:"Sélectionnez des tests et interprétez des réactions biochimiques simulées."} },
      { href:"#/lab/molecular", icon:"🧬", en:"Molecular microbiology", fr:"Microbiologie moléculaire", d:{en:"Conceptual walk-through of sample → extraction → PCR → detection.",fr:"Parcours conceptuel échantillon → extraction → PCR → détection."} },
      { href:"#/lab/sampling", icon:"🧪", en:"Environmental sampling", fr:"Échantillonnage environnemental", d:{en:"Compare swab, contact plate, rinse and wipe sampling approaches.",fr:"Comparez les approches d'échantillonnage par écouvillon, boîte de contact, rinçage et lingette."} },
    ];
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / ${MV.t('navLab')}</div>
      <div class="detail-header"><h1>🔬 ${MV.t('navLab')}</h1>
        <p class="lede">${escapeHtml(pick("Simulated laboratory modules for educational exploration. Results are simplified teaching models, never real diagnostic output.","Modules de laboratoire simulés à visée pédagogique. Les résultats sont des modèles d'enseignement simplifiés, jamais un résultat diagnostique réel."))}</p>
        ${statusBadge('simplified')}
      </div>
      <div class="portal-grid">
        ${items.map(i=>`<a class="portal-card" href="${i.href}"><span class="emoji">${i.icon}</span><h3>${pick(i.en,i.fr)}</h3><p>${pick(i.d.en,i.d.fr)}</p></a>`).join('')}
      </div>`;
  }

  function pick(en,fr,ar){ return MV.lang==='ar' ? (ar||en) : (MV.lang==='fr' ? fr : en); }
  function escapeHtml(s){ return (s||'').replace(/[&<>"]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c])); }

  // ---------- Microscopy ----------
  const MORPHOLOGIES = [
    { id:"coccus-cluster", en:"Spherical cells in grape-like clusters", fr:"Cellules sphériques en amas ressemblant à des grappes", gram:"positive" },
    { id:"coccus-chain", en:"Spherical cells in chains", fr:"Cellules sphériques en chaînes", gram:"positive" },
    { id:"rod-single", en:"Single rod-shaped cells", fr:"Cellules en bâtonnet isolées", gram:"variable" },
    { id:"rod-spore", en:"Rod-shaped cells with visible endospores", fr:"Cellules en bâtonnet avec endospores visibles", gram:"positive" },
    { id:"curved-rod", en:"Curved, comma-shaped rods", fr:"Bâtonnets courbés en forme de virgule", gram:"negative" },
    { id:"budding-yeast", en:"Oval budding cells, much larger than bacteria", fr:"Cellules ovales bourgeonnantes, bien plus grandes que des bactéries", gram:"n/a, eukaryote" }
  ];
  function microscopy(){
    const opts = MORPHOLOGIES.map(m=>`<option value="${m.id}">${pick(m.en,m.fr)}</option>`).join('');
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / <a href="#/lab">${MV.t('navLab')}</a> / Microscopy</div>
      <div class="detail-header"><h1>🔬 ${pick("Simulated Gram stain","Coloration de Gram simulée")}</h1>${statusBadge('conceptual')}</div>
      <div class="panel">
        <div class="field"><label>${pick("Observed morphology (wet mount / stained slide)","Morphologie observée (état frais / lame colorée)")}</label>
          <select id="morphSelect">${opts}</select>
        </div>
        <button class="btn btn-primary" id="morphRun">${pick("Interpret","Interpréter")}</button>
        <div id="morphResult" class="readout mt-16" style="display:none"></div>
      </div>`;
  }
  function microscopyRun(){
    const id = document.getElementById('morphSelect').value;
    const m = MORPHOLOGIES.find(x=>x.id===id) || MORPHOLOGIES[0];
    const box = document.getElementById('morphResult');
    box.style.display='block';
    let gramText = m.gram === "positive" ? pick("Consistent with Gram-positive cell wall structure.","Cohérent avec une structure de paroi Gram-positive.")
      : m.gram === "negative" ? pick("Consistent with Gram-negative cell wall structure.","Cohérent avec une structure de paroi Gram-négative.")
      : m.gram === "variable" ? pick("Gram reaction cannot be determined from morphology alone, a stain result is needed.","La réaction de Gram ne peut être déterminée par la morphologie seule, un résultat de coloration est nécessaire.")
      : pick("This morphology is characteristic of a eukaryotic organism, fungus, not a bacterium, Gram staining does not apply in the usual sense.","Cette morphologie est caractéristique d'un organisme eucaryote, champignon, pas d'une bactérie, la coloration de Gram ne s'applique pas au sens habituel.");
    box.innerHTML = `<div class="r-label">${pick("Interpretation","Interprétation")}</div><div class="r-value" style="font-size:0.95rem">${gramText}</div>
      <div class="text-muted" style="font-size:0.8rem">${pick("This is a simplified teaching interpretation of morphology, not a laboratory diagnosis.","Il s'agit d'une interprétation pédagogique simplifiée de la morphologie, pas d'un diagnostic de laboratoire.")}</div>`;
    MV.progress.incr('labRuns');
  }

  // ---------- Culture ----------
  const SAMPLES = ["Hospital sink drain swab","Cutting board swab","Soil sample","Pond water sample","Fermentation vessel sample"];
  const SAMPLES_FR = ["Écouvillon de siphon hospitalier","Écouvillon de planche à découper","Échantillon de sol","Échantillon d'eau d'étang","Échantillon de cuve de fermentation"];
  const MEDIA = ["General-purpose nutrient agar","Selective medium (inhibits many Gram-positives)","MacConkey-type differential medium","Anaerobic-only medium"];
  const MEDIA_FR = ["Gélose nutritive à usage général","Milieu sélectif (inhibe de nombreux Gram-positifs)","Milieu différentiel type MacConkey","Milieu anaérobie uniquement"];
  function culture(){
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / <a href="#/lab">${MV.t('navLab')}</a> / Culture</div>
      <div class="detail-header"><h1>🧫 ${pick("Culture simulator","Simulateur de culture")}</h1>${statusBadge('conceptual')}</div>
      <div class="panel">
        <div class="grid-2">
          <div class="field"><label>${pick("Sample","Échantillon")}</label>
            <select id="cultSample">${SAMPLES.map((s,i)=>`<option value="${i}">${pick(s,SAMPLES_FR[i])}</option>`).join('')}</select></div>
          <div class="field"><label>${pick("Medium","Milieu")}</label>
            <select id="cultMedium">${MEDIA.map((s,i)=>`<option value="${i}">${pick(s,MEDIA_FR[i])}</option>`).join('')}</select></div>
        </div>
        <div class="field"><label>${pick("Incubation temperature","Température d'incubation")}</label>
          <input type="range" min="4" max="65" value="35" id="cultTemp">
          <div class="slider-row"><span>4°C</span><span id="cultTempVal">35°C</span><span>65°C</span></div>
        </div>
        <button class="btn btn-primary" id="cultRun">${pick("Incubate & observe","Incuber et observer")}</button>
        <div id="cultResult" class="readout mt-16" style="display:none"></div>
      </div>`;
  }
  function cultureWire(){
    const temp = document.getElementById('cultTemp');
    temp.addEventListener('input', ()=> document.getElementById('cultTempVal').textContent = temp.value+"°C");
  }
  function cultureRun(){
    const s = parseInt(document.getElementById('cultSample').value);
    const m = parseInt(document.getElementById('cultMedium').value);
    const temp = parseInt(document.getElementById('cultTemp').value);
    const box = document.getElementById('cultResult');
    box.style.display='block';
    let outcome, why;
    if(temp < 15){
      outcome = pick("Minimal to no visible growth after standard incubation time.","Croissance visible minimale à nulle après le temps d'incubation standard.");
      why = pick("Most cultured organisms grow far too slowly below their optimal range to produce visible colonies in a standard incubation window.","La plupart des organismes cultivés croissent bien trop lentement en dessous de leur plage optimale pour produire des colonies visibles dans une fenêtre d'incubation standard.");
    } else if(temp > 55 && m !== 3){
      outcome = pick("Sparse growth, limited to thermotolerant organisms if any were present in the sample.","Croissance clairsemée, limitée aux organismes thermotolérants si présents dans l'échantillon.");
      why = pick("Most common mesophilic organisms cannot grow at this temperature; only a thermotolerant subset would appear.","La plupart des organismes mésophiles courants ne peuvent croître à cette température ; seul un sous-ensemble thermotolérant apparaîtrait.");
    } else if(m === 3){
      outcome = pick("Growth restricted to organisms tolerant of low-oxygen conditions.","Croissance restreinte aux organismes tolérant les faibles teneurs en oxygène.");
      why = pick("An anaerobic-only medium and incubation condition selects against strict aerobes.","Un milieu et une condition d'incubation strictement anaérobies excluent les aérobies stricts.");
    } else if(m === 1){
      outcome = pick("Reduced colony diversity, the selective medium suppresses many Gram-positive organisms.","Diversité de colonies réduite, le milieu sélectif inhibe de nombreux organismes Gram-positifs.");
      why = pick("Selective media are formulated to favor recovery of a target group by inhibiting others, which narrows what becomes visible.","Les milieux sélectifs sont formulés pour favoriser la récupération d'un groupe cible en inhibant les autres, ce qui restreint ce qui devient visible.");
    } else {
      outcome = pick("Visible colony growth within the expected incubation window, moderate diversity.","Croissance de colonies visible dans la fenêtre d'incubation attendue, diversité modérée.");
      why = pick("Temperature and medium both fall within a broadly permissive range for common environmental and clinical organisms.","La température et le milieu se situent tous deux dans une plage globalement favorable pour les organismes environnementaux et cliniques courants.");
    }
    box.innerHTML = `<div class="r-label">${pick("Simulated result","Résultat simulé")}</div><div class="r-value" style="font-size:0.95rem">${outcome}</div>
      <button class="why-btn mt-8" onclick="this.nextElementSibling.classList.toggle('open')">${MV.t('whyBtn')}</button>
      <div class="why-panel"><ul><li>${why}</li></ul></div>`;
    MV.progress.incr('labRuns');
  }

  // ---------- Biochemical testing ----------
  const BIOCHEM_TESTS = [
    { id:"catalase", en:"Catalase test", fr:"Test de la catalase", pos:{en:"Bubbling observed, catalase-positive.",fr:"Formation de bulles observée, catalase-positive."}, neg:{en:"No bubbling, catalase-negative.",fr:"Aucune bulle, catalase-négative."} },
    { id:"oxidase", en:"Oxidase test", fr:"Test de l'oxydase", pos:{en:"Color change observed, oxidase-positive.",fr:"Changement de couleur observé, oxydase-positive."}, neg:{en:"No color change, oxidase-negative.",fr:"Aucun changement de couleur, oxydase-négative."} },
    { id:"coagulase", en:"Coagulase test", fr:"Test de la coagulase", pos:{en:"Plasma clots, coagulase-positive.",fr:"Coagulation du plasma, coagulase-positive."}, neg:{en:"No clotting, coagulase-negative.",fr:"Aucune coagulation, coagulase-négative."} }
  ];
  function biochem(){
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / <a href="#/lab">${MV.t('navLab')}</a> / Biochemical</div>
      <div class="detail-header"><h1>⚗️ ${pick("Biochemical testing","Tests biochimiques")}</h1>${statusBadge('conceptual')}</div>
      <div class="panel">
        <p class="text-muted mt-8">${pick("Select tests to run on a simulated unknown sample and interpret the pattern of results.","Sélectionnez des tests à réaliser sur un échantillon inconnu simulé et interprétez le profil de résultats.")}</p>
        <div class="card-grid mt-16">
        ${BIOCHEM_TESTS.map(bt=>`
          <div class="card">
            <h3>${pick(bt.en,bt.fr)}</h3>
            <button class="btn btn-sm" onclick="MV.lab.runBiochem('${bt.id}')">${pick("Run test","Exécuter le test")}</button>
            <div id="bio-${bt.id}" class="readout" style="display:none"></div>
          </div>`).join('')}
        </div>
      </div>`;
  }
  function runBiochem(id){
    const bt = BIOCHEM_TESTS.find(x=>x.id===id);
    const positive = Math.random() > 0.5;
    const box = document.getElementById('bio-'+id);
    box.style.display='block';
    box.innerHTML = `<div class="r-value" style="font-size:0.9rem">${positive ? pick(bt.pos.en,bt.pos.fr) : pick(bt.neg.en,bt.neg.fr)}</div>`;
    MV.progress.incr('labRuns');
  }

  // ---------- Molecular ----------
  function molecular(){
    const steps = [
      {en:"Sample",fr:"Échantillon", d:{en:"A raw biological or environmental sample is collected.",fr:"Un échantillon biologique ou environnemental brut est prélevé."}},
      {en:"Extraction",fr:"Extraction", d:{en:"Cells are lysed and nucleic acids are purified away from other cellular material.",fr:"Les cellules sont lysées et les acides nucléiques sont purifiés du reste du matériel cellulaire."}},
      {en:"DNA",fr:"ADN", d:{en:"Purified genetic material is now available as a template.",fr:"Le matériel génétique purifié est maintenant disponible comme matrice."}},
      {en:"PCR",fr:"PCR", d:{en:"A targeted region of DNA is repeatedly copied using primers specific to the sequence of interest.",fr:"Une région ciblée de l'ADN est copiée de façon répétée à l'aide d'amorces spécifiques à la séquence d'intérêt."}},
      {en:"Amplification",fr:"Amplification", d:{en:"After repeated cycles, the targeted sequence exists in millions of copies.",fr:"Après des cycles répétés, la séquence ciblée existe en millions de copies."}},
      {en:"Detection",fr:"Détection", d:{en:"Amplified product is detected, commonly via fluorescence or gel visualization.",fr:"Le produit amplifié est détecté, couramment par fluorescence ou visualisation sur gel."}},
      {en:"Interpretation",fr:"Interprétation", d:{en:"A positive detection indicates the target sequence was present in the original sample above the method's detection limit.",fr:"Une détection positive indique que la séquence cible était présente dans l'échantillon d'origine au-dessus de la limite de détection de la méthode."}}
    ];
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / <a href="#/lab">${MV.t('navLab')}</a> / Molecular</div>
      <div class="detail-header"><h1>🧬 ${pick("Molecular microbiology, conceptual walk-through","Microbiologie moléculaire, parcours conceptuel")}</h1>${statusBadge('conceptual')}</div>
      <div class="panel">
        <div class="domino-chain">
          ${steps.map((s,i)=>`
            <div class="domino-node">
              <div class="connector"></div>
              <div class="node-dot">${i+1}</div>
              <div><div class="node-label">${pick(s.en,s.fr)}</div><div class="node-desc">${pick(s.d.en,s.d.fr)}</div></div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  // ---------- Sampling ----------
  const SAMPLING_METHODS = [
    { id:"swab", en:"Swab", fr:"Écouvillon", pro:{en:"Flexible for irregular or hard-to-reach surfaces.",fr:"Flexible pour surfaces irrégulières ou difficiles d'accès."}, con:{en:"Recovery efficiency is generally lower and less quantitative than a contact plate.",fr:"Efficacité de récupération généralement plus faible et moins quantitative qu'une boîte de contact."} },
    { id:"contact-plate", en:"Contact plate", fr:"Boîte de contact", pro:{en:"Directly quantitative for flat surfaces, widely used in cleanroom monitoring.",fr:"Directement quantitative pour surfaces planes, largement utilisée en surveillance de salle blanche."}, con:{en:"Only suitable for flat, accessible surfaces; leaves agar residue that must be cleaned.",fr:"Adaptée uniquement aux surfaces planes et accessibles ; laisse un résidu de gélose à nettoyer."} },
    { id:"rinse", en:"Rinse sample", fr:"Échantillon de rinçage", pro:{en:"Good for irregular equipment interiors, like pipe sections or containers.",fr:"Adapté aux intérieurs d'équipements irréguliers, comme des sections de tuyauterie ou des récipients."}, con:{en:"Dilutes the sample, which can lower sensitivity for low-level contamination.",fr:"Dilue l'échantillon, ce qui peut réduire la sensibilité pour une contamination de faible niveau."} },
    { id:"wipe", en:"Wipe sample", fr:"Lingette", pro:{en:"Covers a larger surface area than a swab or contact plate in a single sample.",fr:"Couvre une surface plus large qu'un écouvillon ou une boîte de contact en un seul échantillon."}, con:{en:"Recovery efficiency varies with surface texture and wipe material.",fr:"L'efficacité de récupération varie selon la texture de la surface et le matériau de la lingette."} }
  ];
  function sampling(){
    return `
      <div class="breadcrumb"><a href="#/">${MV.t('backHome')}</a> / <a href="#/lab">${MV.t('navLab')}</a> / Sampling</div>
      <div class="detail-header"><h1>🧪 ${pick("Environmental sampling methods","Méthodes d'échantillonnage environnemental")}</h1>${statusBadge('established')}</div>
      <div class="card-grid">
        ${SAMPLING_METHODS.map(m=>`
          <div class="card">
            <h3>${pick(m.en,m.fr)}</h3>
            <p><strong>${pick("Advantage:","Avantage :")}</strong> ${pick(m.pro.en,m.pro.fr)}</p>
            <p><strong>${pick("Limitation:","Limite :")}</strong> ${pick(m.con.en,m.con.fr)}</p>
          </div>`).join('')}
      </div>`;
  }

  return { labHome, microscopy, microscopyRun, culture, cultureWire, cultureRun, biochem, runBiochem, molecular, sampling, statusBadge, pick, escapeHtml };
})();
