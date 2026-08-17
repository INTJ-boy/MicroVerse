window.MV = window.MV || {}; MV.data = MV.data || {};
/* Each tree is a set of nodes with id, question/result, and options pointing to next node ids.
   These are educational reasoning aids, not diagnostic tools. */
MV.data.decisionTrees = [
  {
    id:"dt-gram",
    title:{en:"Gram reaction reasoning",fr:"Raisonnement sur la réaction de Gram",ar:"الاستدلال حول تفاعل الغرام"},
    status:"simplified",
    start:"n1",
    nodes:{
      n1:{ q:{en:"Does the cell retain crystal violet stain after decolorization?",fr:"La cellule retient-elle le violet de gentiane après décoloration ?"},
           options:[{label:{en:"Yes, stains purple",fr:"Oui, coloration violette"}, next:"n2"},{label:{en:"No, stains pink/red",fr:"Non, coloration rose/rouge"}, next:"n3"}] },
      n2:{ result:{en:"Consistent with Gram-positive: a thick peptidoglycan cell wall retains the primary stain.",fr:"Cohérent avec Gram-positif : une paroi de peptidoglycane épaisse retient la coloration primaire."} },
      n3:{ result:{en:"Consistent with Gram-negative: a thinner peptidoglycan layer and outer membrane allow the primary stain to wash out, revealing the counterstain.",fr:"Cohérent avec Gram-négatif : une couche de peptidoglycane plus fine et une membrane externe laissent la coloration primaire se rincer, révélant la contre-coloration."} }
    }
  },
  {
    id:"dt-food-temp",
    title:{en:"Food temperature-abuse reasoning",fr:"Raisonnement sur un abus de température alimentaire",ar:"الاستدلال حول إساءة استخدام درجة حرارة الطعام"},
    status:"simplified",
    start:"n1",
    nodes:{
      n1:{ q:{en:"Has the food spent more than about 2 hours in the 5-60°C danger zone?",fr:"L'aliment a-t-il passé plus de 2 heures environ dans la zone de danger 5-60°C ?"},
           options:[{label:{en:"Yes",fr:"Oui"}, next:"n2"},{label:{en:"No",fr:"Non"}, next:"n3"}] },
      n2:{ result:{en:"Elevated risk: extended time in the danger zone allows many foodborne pathogens to multiply substantially. Consider discarding or further evaluating the product.",fr:"Risque accru : un temps prolongé dans la zone de danger permet à de nombreux pathogènes alimentaires de se multiplier de façon importante. Envisagez d'écarter le produit ou de l'évaluer davantage."} },
      n3:{ result:{en:"Lower risk from this factor alone, though other contamination routes should still be considered.",fr:"Risque plus faible pour ce seul facteur, bien que d'autres voies de contamination doivent tout de même être envisagées."} }
    }
  },
  {
    id:"dt-contamination-source",
    title:{en:"Recurring contamination, reintroduction or survival?",fr:"Contamination récurrente, réintroduction ou survie ?",ar:"تلوث متكرر, إعادة إدخال أم بقاء؟"},
    status:"fictional",
    start:"n1",
    nodes:{
      n1:{ q:{en:"Does the organism reappear even when cleaning/disinfection records show the process was performed correctly?",fr:"L'organisme réapparaît-il même lorsque les registres de nettoyage/désinfection montrent que le procédé a été correctement effectué ?"},
           options:[{label:{en:"Yes",fr:"Oui"}, next:"n2"},{label:{en:"No, cleaning was sometimes skipped or incomplete",fr:"Non, le nettoyage a parfois été omis ou incomplet"}, next:"n3"}] },
      n2:{ result:{en:"Consider a reintroduction pathway after cleaning (traffic, water splash, air movement) rather than disinfectant failure.",fr:"Envisagez une voie de réintroduction après le nettoyage (passage, éclaboussures, mouvement d'air) plutôt qu'un échec du désinfectant."} },
      n3:{ result:{en:"Process compliance gaps are a more parsimonious explanation than reintroduction, verify and reinforce the cleaning procedure first.",fr:"Des lacunes de conformité au procédé constituent une explication plus parcimonieuse que la réintroduction, vérifiez et renforcez d'abord la procédure de nettoyage."} }
    }
  },
  {
    id:"dt-culture-growth",
    title:{en:"Interpreting a no-growth culture result",fr:"Interpréter un résultat de culture sans croissance",ar:"تفسير نتيجة زرع بدون نمو"},
    status:"simplified",
    start:"n1",
    nodes:{
      n1:{ q:{en:"Was a positive control included and did it show expected growth?",fr:"Un témoin positif était-il inclus et a-t-il montré la croissance attendue ?"},
           options:[{label:{en:"Yes, positive control grew as expected",fr:"Oui, le témoin positif a poussé comme attendu"}, next:"n2"},{label:{en:"No positive control was included, or it failed to grow",fr:"Aucun témoin positif inclus, ou il n'a pas poussé"}, next:"n3"}] },
      n2:{ result:{en:"The no-growth result can be interpreted with reasonable confidence, within the limits of the method's detection sensitivity.",fr:"Le résultat de non-croissance peut être interprété avec une confiance raisonnable, dans les limites de sensibilité de détection de la méthode."} },
      n3:{ result:{en:"The no-growth result is not reliably interpretable, without a working positive control, a method or incubation failure cannot be ruled out.",fr:"Le résultat de non-croissance n'est pas interprétable de façon fiable, sans témoin positif fonctionnel, une défaillance de méthode ou d'incubation ne peut être exclue."} }
    }
  },
  {
    id:"dt-cleanroom-trend",
    title:{en:"Environmental monitoring trend triage",fr:"Triage d'une tendance de surveillance environnementale",ar:"فرز اتجاه المراقبة البيئية"},
    status:"simplified",
    start:"n1",
    nodes:{
      n1:{ q:{en:"Is the rise in counts a single sharp spike, or a gradual trend over several sampling events?",fr:"La hausse des comptages est-elle un pic isolé et net, ou une tendance progressive sur plusieurs relevés ?"},
           options:[{label:{en:"Single sharp spike",fr:"Pic isolé et net"}, next:"n2"},{label:{en:"Gradual trend",fr:"Tendance progressive"}, next:"n3"}] },
      n2:{ result:{en:"Investigate for a discrete, identifiable event around that sampling date, equipment intervention, personnel breach, or a maintenance activity.",fr:"Recherchez un événement discret et identifiable autour de cette date de prélèvement, intervention sur un équipement, manquement du personnel, activité de maintenance."} },
      n3:{ result:{en:"Investigate systemic factors that change slowly, gowning compliance drift, airflow pattern changes, or gradual filter performance decline.",fr:"Recherchez des facteurs systémiques évoluant lentement, dérive de conformité de l'habillage, changement du profil de flux d'air, déclin progressif de la performance des filtres."} }
    }
  }
];
