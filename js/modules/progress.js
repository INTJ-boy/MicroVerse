window.MV = window.MV || {};
MV.progress = (function(){
  const KEY = "mv_progress_v1";

  function load(){
    try{
      const raw = localStorage.getItem(KEY);
      if(!raw) return def();
      return Object.assign(def(), JSON.parse(raw));
    }catch(e){ return def(); }
  }
  function def(){
    return { worlds:[], scenarios:[], species:[], investigations:[], reasoningCompleted:0, achievements:[] };
  }
  function save(state){
    try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){}
  }
  function reset(){
    localStorage.removeItem(KEY);
  }

  const ACHIEVEMENTS = [
    { id:"first-dive", emoji:"🦑", title:{en:"First Dive",fr:"Première plongée"}, desc:{en:"Explore your first World.",fr:"Explorez votre premier Monde."},
      test:(s)=> s.worlds.length >= 1 },
    { id:"lab-initiate", emoji:"🔬", title:{en:"Lab Initiate",fr:"Initié du laboratoire"}, desc:{en:"Complete your first virtual experiment.",fr:"Terminez votre première expérience virtuelle."},
      test:(s)=> s.labRuns >= 1 },
    { id:"detective", emoji:"🕵️", title:{en:"Contamination Detective",fr:"Détective de la contamination"}, desc:{en:"Solve your first investigation.",fr:"Résolvez votre première investigation."},
      test:(s)=> s.investigations.length >= 1 },
    { id:"unknown-hunter", emoji:"🧬", title:{en:"Unknown Hunter",fr:"Chasseur d'inconnu"}, desc:{en:"Identify your first unknown organism.",fr:"Identifiez votre premier organisme inconnu."},
      test:(s)=> s.unknownsSolved >= 1 },
    { id:"world-explorer", emoji:"🌍", title:{en:"World Explorer",fr:"Explorateur de mondes"}, desc:{en:"Visit 8 Worlds.",fr:"Visitez 8 Mondes."},
      test:(s)=> s.worlds.length >= 8 },
    { id:"thinker", emoji:"🧠", title:{en:"Microbial Thinker",fr:"Penseur microbien"}, desc:{en:"Complete 15 reasoning challenges.",fr:"Terminez 15 défis de raisonnement."},
      test:(s)=> s.reasoningCompleted >= 15 }
  ];

  function markVisited(kind, id){
    const s = load();
    if(!s[kind]) s[kind] = [];
    if(!s[kind].includes(id)) s[kind].push(id);
    save(s);
    checkAchievements(s);
  }
  function incr(field){
    const s = load();
    s[field] = (s[field]||0) + 1;
    save(s);
    checkAchievements(s);
  }
  function checkAchievements(s){
    ACHIEVEMENTS.forEach(a=>{
      if(!s.achievements.includes(a.id) && a.test(s)){
        s.achievements.push(a.id);
        save(s);
        toast(a);
      }
    });
  }
  function toast(a){
    const host = document.getElementById('toastHost');
    if(!host) return;
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<span class="t-emoji">${a.emoji}</span><span><span class="t-title">${MV.t('achievementsTitle')}</span><br><span class="t-desc">${a.title[MV.lang]||a.title.en}</span></span>`;
    host.appendChild(el);
    requestAnimationFrame(()=> el.classList.add('show'));
    setTimeout(()=>{ el.classList.remove('show'); setTimeout(()=> el.remove(), 350); }, 3800);
  }

  return { load, save, reset, ACHIEVEMENTS, markVisited, incr };
})();
