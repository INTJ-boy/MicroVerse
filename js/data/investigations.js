window.MV = window.MV || {}; MV.data = MV.data || {};
/* All cases are FICTIONAL EDUCATIONAL SCENARIOS. Status is always "fictional". */
MV.data.investigations = [
  { id:"inv-001", world:"hospital", difficulty:"advanced",
    title:{en:"The recurring surgical-site organism",fr:"L'organisme récurrent du site opératoire",ar:"الكائن المتكرر في موقع العملية الجراحية"},
    briefing:{en:"Three unrelated patients in the same operating theatre develop surgical-site colonization with a genetically similar organism over a six-week period.",
              fr:"Trois patients sans lien entre eux, opérés dans la même salle d'opération, développent une colonisation du site opératoire par un organisme génétiquement similaire sur six semaines."},
    timeline:[
      {t:"Week 1", event:{en:"First case identified during routine post-operative monitoring.",fr:"Premier cas identifié lors de la surveillance postopératoire de routine."}},
      {t:"Week 3", event:{en:"Second case identified; environmental swabs of the theatre are taken.",fr:"Deuxième cas identifié ; des écouvillons environnementaux de la salle sont prélevés."}},
      {t:"Week 6", event:{en:"Third case identified; strain typing shows high similarity to the first two.",fr:"Troisième cas identifié ; le typage de souche montre une forte similarité avec les deux premiers."}}
    ],
    evidenceBoard:[
      {en:"Air-handling filter maintenance was overdue by several weeks.",fr:"La maintenance du filtre de traitement d'air accusait plusieurs semaines de retard."},
      {en:"All three cases used the same specific piece of reusable equipment.",fr:"Les trois cas ont utilisé la même pièce d'équipement réutilisable spécifique."},
      {en:"Terminal cleaning logs for the theatre show no missed cycles.",fr:"Les registres de nettoyage terminal de la salle ne montrent aucun cycle manqué."}
    ],
    hypothesis:{en:"The shared reusable equipment is the more parsimonious explanation than air handling, since terminal cleaning was consistently performed but equipment-specific reprocessing was not confirmed in the record.",
                fr:"L'équipement réutilisable partagé constitue une explication plus parcimonieuse que le traitement d'air, le nettoyage terminal ayant été systématiquement effectué alors que le retraitement spécifique de l'équipement n'était pas confirmé dans le registre."},
    status:"fictional" },

  { id:"inv-002", world:"food", difficulty:"intermediate",
    title:{en:"The catering complaint cluster",fr:"Le groupe de plaintes lié à un traiteur",ar:"مجموعة شكاوى مرتبطة بخدمة تموين"},
    briefing:{en:"A cluster of gastrointestinal illness reports traces back to a single catered event, but the kitchen's cleaning records appear complete.",
              fr:"Un groupe de signalements de maladie gastro-intestinale remonte à un même événement traiteur, alors que les registres de nettoyage de la cuisine paraissent complets."},
    timeline:[
      {t:"Day 0", event:{en:"Catered event served, including a cold rice-based side dish.",fr:"Événement traiteur servi, incluant un accompagnement froid à base de riz."}},
      {t:"Day 1", event:{en:"First illness reports received.",fr:"Premiers signalements de maladie reçus."}},
      {t:"Day 3", event:{en:"Kitchen inspected; time-temperature logs for the rice dish are found incomplete for the holding period.",fr:"Cuisine inspectée ; les relevés temps-température du plat de riz s'avèrent incomplets pour la période de maintien."}}
    ],
    evidenceBoard:[
      {en:"The rice dish was cooked properly but held at ambient temperature for an extended period before service.",fr:"Le plat de riz a été correctement cuit mais maintenu à température ambiante pendant une période prolongée avant service."},
      {en:"Certain spore-forming organisms can survive cooking and multiply during extended ambient holding.",fr:"Certains organismes sporulants peuvent survivre à la cuisson et se multiplier lors d'un maintien prolongé à température ambiante."},
      {en:"Kitchen surface cleaning logs are complete and unremarkable.",fr:"Les registres de nettoyage des surfaces de cuisine sont complets et sans anomalie."}
    ],
    hypothesis:{en:"Extended ambient holding time of a cooked starch dish is the more consistent explanation, since surface hygiene records show no gap.",
                fr:"Un temps de maintien prolongé à température ambiante d'un plat à base d'amidon cuit constitue l'explication la plus cohérente, les registres d'hygiène des surfaces ne montrant aucune lacune."},
    status:"fictional" },

  { id:"inv-003", world:"pharmaceutical", difficulty:"expert",
    title:{en:"The intermittent sterility test failure",fr:"L'échec intermittent du test de stérilité",ar:"فشل متقطّع في اختبار التعقيم"},
    briefing:{en:"A sterile-product batch passes environmental monitoring but occasionally fails sterility testing, with no consistent pattern by shift or operator.",
              fr:"Un lot de produit stérile réussit la surveillance environnementale mais échoue occasionnellement au test de stérilité, sans schéma constant selon l'équipe ou l'opérateur."},
    timeline:[
      {t:"Month 1", event:{en:"First isolated sterility test failure recorded.",fr:"Premier échec isolé de test de stérilité enregistré."}},
      {t:"Month 2", event:{en:"A second, unrelated batch fails; investigation broadened to include the water system.",fr:"Un second lot, sans lien apparent, échoue ; l'investigation est élargie au système d'eau."}},
      {t:"Month 3", event:{en:"Low-level organism recovery is traced to a rarely used branch of the purified water loop.",fr:"Une faible récupération d'organismes est retracée jusqu'à une branche rarement utilisée de la boucle d'eau purifiée."}}
    ],
    evidenceBoard:[
      {en:"Environmental monitoring of the fill room shows no significant excursions.",fr:"La surveillance environnementale de la salle de remplissage ne montre aucune excursion significative."},
      {en:"The purified water loop includes a dead-leg section not on the routine sampling plan.",fr:"La boucle d'eau purifiée comporte une section en branche morte absente du plan d'échantillonnage de routine."},
      {en:"Failures do not correlate with shift, operator or specific fill-line component.",fr:"Les échecs ne sont corrélés ni à l'équipe, ni à l'opérateur, ni à un composant spécifique de la ligne de remplissage."}
    ],
    hypothesis:{en:"An intermittent, low-level water-system source is more consistent with the evidence than an operator- or fill-line-specific cause, given the absence of correlation with either.",
                fr:"Une source intermittente et de faible niveau liée au système d'eau est plus cohérente avec les éléments recueillis qu'une cause liée à l'opérateur ou à la ligne de remplissage, compte tenu de l'absence de corrélation avec ceux-ci."},
    status:"fictional" },

  { id:"inv-004", world:"freshwater", difficulty:"intermediate",
    title:{en:"The discolored-water complaint cluster",fr:"Le groupe de plaintes pour eau décolorée",ar:"مجموعة شكاوى عن مياه متغيّرة اللون"},
    briefing:{en:"A neighborhood reports discolored tap water the morning after a large fire-hydrant flow test was conducted nearby.",
              fr:"Un quartier signale une eau du robinet décolorée le lendemain matin d'un important test de débit de bouche d'incendie effectué à proximité."},
    timeline:[
      {t:"Day 0, evening", event:{en:"Fire-hydrant flow test conducted, sharply increasing local flow velocity.",fr:"Test de débit de bouche d'incendie effectué, augmentant fortement la vitesse d'écoulement locale."}},
      {t:"Day 1, morning", event:{en:"Multiple discolored-water complaints received from the same distribution zone.",fr:"Plusieurs plaintes pour eau décolorée reçues depuis la même zone de distribution."}}
    ],
    evidenceBoard:[
      {en:"Discoloration is consistent with disturbed pipe-wall sediment and biofilm material, not a treatment-plant issue.",fr:"La décoloration est cohérente avec des sédiments et du biofilm de paroi de canalisation perturbés, non avec un problème à l'usine de traitement."},
      {en:"Treatment plant records show no process deviation that evening.",fr:"Les registres de l'usine de traitement ne montrent aucune déviation de procédé ce soir-là."},
      {en:"The affected zone matches the area downstream of the flow-test hydrant.",fr:"La zone touchée correspond à la zone en aval de la bouche d'incendie testée."}
    ],
    hypothesis:{en:"The flow test's shear-stress increase most plausibly dislodged accumulated pipe-wall material, rather than a treatment-side failure.",
                fr:"L'augmentation de la contrainte de cisaillement due au test de débit a le plus probablement délogé du matériau accumulé en paroi de canalisation, plutôt qu'une défaillance côté traitement."},
    status:"fictional" }
];
