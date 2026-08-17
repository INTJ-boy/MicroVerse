/* MICROVERSE (Educational qualitative simulation engine.
   This produces simplified, labeled educational outputs) never presented as validated
   clinical or industrial predictions. Inputs are 0-100 sliders representing relative levels. */
window.MV = window.MV || {};
MV.engine = (function(){

  function score(vars){
    // vars: {temperature, moisture, nutrients, oxygenTolerance, cleaning, competition, contactFrequency, disinfectant}
    const v = Object.assign({temperature:50, moisture:50, nutrients:50, oxygenTolerance:50,
                              cleaning:30, competition:30, contactFrequency:50, disinfectant:20}, vars);

    const permissiveness = (v.temperature*0.9 + v.moisture*1.1 + v.nutrients*1.0 + v.oxygenTolerance*0.6) / 4;
    const suppression = (v.cleaning*1.0 + v.disinfectant*0.9 + v.competition*0.8) / 3;

    const survival = clamp(permissiveness - suppression*0.5);
    const colonization = clamp(survival*0.7 + v.contactFrequency*0.3 - v.competition*0.3);
    const biofilm = clamp(colonization*0.6 + v.moisture*0.3 - v.cleaning*0.4);
    const stress = clamp(suppression - permissiveness*0.3);
    const persistence = clamp(biofilm*0.6 + survival*0.3 - v.cleaning*0.2);

    return {
      survival: level(survival), colonization: level(colonization),
      biofilm: level(biofilm), stress: level(stress), persistence: level(persistence),
      raw: {survival, colonization, biofilm, stress, persistence}
    };
  }

  function clamp(n){ return Math.max(0, Math.min(100, n)); }
  function level(n){
    if(n < 25) return "low";
    if(n < 50) return "moderate";
    if(n < 75) return "high";
    return "very-high";
  }

  function whyFactors(vars, outputKey){
    const v = vars;
    const reasons = [];
    if(outputKey === "persistence" || outputKey === "biofilm"){
      if(v.moisture > 55) reasons.push({en:"elevated moisture supports matrix formation",fr:"une humidité élevée favorise la formation de la matrice"});
      if(v.cleaning < 40) reasons.push({en:"low cleaning frequency allows uninterrupted maturation",fr:"une faible fréquence de nettoyage permet une maturation ininterrompue"});
      if(v.temperature > 55) reasons.push({en:"favorable temperature supports sustained growth",fr:"une température favorable soutient une croissance continue"});
    }
    if(outputKey === "survival"){
      if(v.temperature > 55) reasons.push({en:"temperature falls within a permissive range",fr:"la température se situe dans une plage favorable"});
      if(v.nutrients > 55) reasons.push({en:"nutrient availability is not limiting",fr:"la disponibilité en nutriments n'est pas limitante"});
      if(v.disinfectant > 55) reasons.push({en:"disinfectant exposure reduces viable population",fr:"l'exposition au désinfectant réduit la population viable"});
    }
    if(outputKey === "colonization"){
      if(v.contactFrequency > 55) reasons.push({en:"frequent contact increases opportunities for transfer",fr:"un contact fréquent augmente les occasions de transfert"});
      if(v.competition > 55) reasons.push({en:"established competing organisms limit new establishment",fr:"des organismes concurrents déjà établis limitent une nouvelle implantation"});
    }
    if(outputKey === "stress"){
      if(v.cleaning > 55) reasons.push({en:"regular cleaning increases environmental stress",fr:"un nettoyage régulier augmente le stress environnemental"});
      if(v.disinfectant > 55) reasons.push({en:"disinfectant exposure adds direct chemical stress",fr:"l'exposition au désinfectant ajoute un stress chimique direct"});
    }
    if(reasons.length === 0){ reasons.push({en:"conditions are close to a neutral balance point",fr:"les conditions sont proches d'un point d'équilibre neutre"}); }
    return reasons;
  }

  return { score, whyFactors };
})();
