window.MV = window.MV || {}; MV.data = MV.data || {};
/* status: established | simplified | conceptual | fictional */
MV.data.scenarios = [
  { id:"sc-001", world:"hospital", space:"hospital-sink-drain", difficulty:"intermediate", status:"fictional",
    title:{en:"The sink that keeps failing environmental checks",fr:"Le lavabo qui échoue sans cesse aux contrôles environnementaux",ar:"المغسلة التي تفشل باستمرار في الفحوصات البيئية"},
    context:{en:"A ward sink repeatedly tests positive for Pseudomonas aeruginosa despite daily surface disinfection of the sink bowl and taps.",
             fr:"Un lavabo de service teste positif de manière répétée à Pseudomonas aeruginosa malgré une désinfection quotidienne de la vasque et des robinets."},
    evidence:[
      {en:"Surface swabs of the bowl are negative immediately after disinfection",fr:"Les écouvillonnages de surface de la vasque sont négatifs immédiatement après désinfection"},
      {en:"Swabs taken from the drain trap are consistently positive",fr:"Les écouvillonnages prélevés dans le siphon sont systématiquement positifs"},
      {en:"Splash pattern testing shows droplets reach nearby surfaces during handwashing",fr:"Les tests de projection montrent que des gouttelettes atteignent les surfaces voisines lors du lavage des mains"}],
    possibleActions:[
      {en:"Intensify bowl disinfection frequency",fr:"Intensifier la fréquence de désinfection de la vasque"},
      {en:"Investigate and treat the drain/trap itself",fr:"Examiner et traiter le siphon lui-même"},
      {en:"Redesign splash geometry or install a drain cover",fr:"Repenser la géométrie des projections ou installer un couvre-siphon"}],
    reasoning:{en:"Because disinfection targets the visible bowl surface, not the drain biofilm, the reservoir persists and reseeds the sink after each cleaning cycle.",
               fr:"Comme la désinfection cible la vasque visible et non le biofilm du siphon, le réservoir persiste et recontamine le lavabo après chaque cycle de nettoyage."},
    misconception:{en:"Visible cleanliness of a surface does not mean the reservoir causing recontamination has been addressed.",
                   fr:"La propreté visible d'une surface ne signifie pas que le réservoir à l'origine de la recontamination a été traité."},
    learningObjectives:[
      {en:"Distinguish a surface event from a persistent reservoir",fr:"Distinguer un événement de surface d'un réservoir persistant"},
      {en:"Understand biofilm-protected niches in plumbing",fr:"Comprendre les niches protégées par biofilm dans la plomberie"}] },

  { id:"sc-002", world:"hospital", space:"hospital-medical-device", difficulty:"advanced", status:"simplified",
    title:{en:"Biofilm formation timeline on an indwelling device",fr:"Chronologie de formation d'un biofilm sur un dispositif à demeure",ar:"الجدول الزمني لتكوّن الغشاء الحيوي على جهاز مُقيم"},
    context:{en:"An educational simulation follows the stages a device surface goes through after insertion, from initial conditioning film to mature biofilm.",
             fr:"Une simulation pédagogique suit les étapes que traverse la surface d'un dispositif après son insertion, du film de conditionnement initial au biofilm mature."},
    evidence:[
      {en:"Conditioning film forms within hours of insertion",fr:"Le film de conditionnement se forme quelques heures après l'insertion"},
      {en:"Early colonizers attach reversibly at first, then irreversibly",fr:"Les premiers colonisateurs s'attachent d'abord de façon réversible, puis irréversible"},
      {en:"Extracellular matrix production increases over following days",fr:"La production de matrice extracellulaire augmente au cours des jours suivants"}],
    possibleActions:[
      {en:"Reduce dwell time where clinically appropriate",fr:"Réduire la durée de pose lorsque cela est cliniquement approprié"},
      {en:"Apply antimicrobial-coated materials",fr:"Utiliser des matériaux à revêtement antimicrobien"},
      {en:"Increase monitoring frequency for early signs of colonization",fr:"Augmenter la fréquence de surveillance pour détecter les premiers signes de colonisation"}],
    reasoning:{en:"Biofilm formation is a staged process; interventions are far more effective when applied before the matrix matures and shields the organisms.",
               fr:"La formation du biofilm est un processus par étapes ; les interventions sont bien plus efficaces lorsqu'elles sont appliquées avant que la matrice ne mûrisse et ne protège les organismes."},
    misconception:{en:"A biofilm is not simply \"a lot of bacteria\", it is a structured community embedded in a self-produced protective matrix.",
                   fr:"Un biofilm n'est pas simplement « beaucoup de bactéries », c'est une communauté structurée intégrée dans une matrice protectrice auto-produite."},
    learningObjectives:[
      {en:"Describe the staged biofilm formation process",fr:"Décrire le processus par étapes de formation du biofilm"},
      {en:"Identify the window where intervention is most effective",fr:"Identifier la fenêtre où l'intervention est la plus efficace"}] },

  { id:"sc-003", world:"food", space:"food-cutting-board", difficulty:"beginner", status:"established",
    title:{en:"Shared board, raw poultry, salad",fr:"Planche partagée, volaille crue, salade",ar:"لوح مشترك، دجاج نيء، سلطة"},
    context:{en:"A cutting board is used to portion raw chicken and, shortly after a quick rinse, to chop salad vegetables that will be eaten raw.",
             fr:"Une planche à découper sert à portionner du poulet cru puis, après un simple rinçage, à couper des légumes de salade destinés à être consommés crus."},
    evidence:[
      {en:"A quick rinse with water does not reliably remove bacterial residue from board grooves",fr:"Un simple rinçage à l'eau n'élimine pas de façon fiable les résidus bactériens des rainures de la planche"},
      {en:"Salmonella and Campylobacter are commonly associated with raw poultry",fr:"Salmonella et Campylobacter sont couramment associées à la volaille crue"}],
    possibleActions:[
      {en:"Use separate boards for raw meat and ready-to-eat produce",fr:"Utiliser des planches séparées pour la viande crue et les produits prêts à consommer"},
      {en:"Wash boards with hot soapy water and sanitize between uses",fr:"Laver les planches à l'eau chaude savonneuse et les désinfecter entre chaque usage"},
      {en:"Replace heavily grooved boards",fr:"Remplacer les planches fortement rainurées"}],
    reasoning:{en:"Because the salad receives no further cooking step, any organisms transferred from the raw poultry residue reach the consumer unchanged.",
               fr:"Comme la salade ne subit aucune cuisson ultérieure, tout organisme transféré depuis les résidus de volaille crue parvient au consommateur sans modification."},
    misconception:{en:"A quick water rinse is not equivalent to washing and sanitizing a food-contact surface.",
                   fr:"Un simple rinçage à l'eau n'équivaut pas à un lavage et une désinfection d'une surface au contact des aliments."},
    learningObjectives:[
      {en:"Explain cross-contamination between raw and ready-to-eat foods",fr:"Expliquer la contamination croisée entre aliments crus et prêts à consommer"},
      {en:"Identify why a cooking step changes the risk calculation",fr:"Identifier pourquoi une étape de cuisson change le calcul du risque"}] },

  { id:"sc-004", world:"food", space:"food-cold-storage", difficulty:"intermediate", status:"established",
    title:{en:"The door left ajar",fr:"La porte laissée entrouverte",ar:"الباب المتروك مفتوحاً قليلاً"},
    context:{en:"A refrigerated storage unit's door seal is found to be failing, letting internal temperature drift upward for several hours per day.",
             fr:"Le joint de porte d'une unité de stockage réfrigérée s'avère défectueux, laissant la température interne dériver vers le haut plusieurs heures par jour."},
    evidence:[
      {en:"Temperature logs show repeated excursions above the safe cold-chain threshold",fr:"Les relevés de température montrent des dépassements répétés du seuil sûr de la chaîne du froid"},
      {en:"Some psychrotolerant spoilage organisms can still grow slowly even at proper refrigeration temperatures",fr:"Certains organismes d'altération psychrotolérants peuvent encore croître lentement même à des températures de réfrigération correctes"}],
    possibleActions:[
      {en:"Repair or replace the door seal",fr:"Réparer ou remplacer le joint de la porte"},
      {en:"Discard product that spent extended time above threshold",fr:"Écarter le produit ayant passé une durée prolongée au-dessus du seuil"},
      {en:"Increase temperature-monitoring frequency",fr:"Augmenter la fréquence de surveillance de la température"}],
    reasoning:{en:"Refrigeration slows microbial growth rather than stopping it; repeated temperature excursions shorten the safe storage window even if food looks unchanged.",
               fr:"La réfrigération ralentit la croissance microbienne sans l'arrêter ; des excursions de température répétées raccourcissent la fenêtre de conservation sûre même si l'aliment paraît inchangé."},
    misconception:{en:"Cold storage does not make food sterile, it selects for organisms that tolerate cold rather than eliminating microbial growth.",
                   fr:"Le stockage au froid ne rend pas un aliment stérile, il sélectionne les organismes tolérant le froid plutôt que d'éliminer la croissance microbienne."},
    learningObjectives:[
      {en:"Understand psychrotroph selection under refrigeration",fr:"Comprendre la sélection des psychrotrophes sous réfrigération"},
      {en:"Explain why temperature logging matters even without visible spoilage",fr:"Expliquer pourquoi le relevé de température compte même sans altération visible"}] },

  { id:"sc-005", world:"soil", space:"soil-compost", difficulty:"intermediate", status:"established",
    title:{en:"Why a compost pile needs turning",fr:"Pourquoi un tas de compost doit être retourné",ar:"لماذا يحتاج كوم السماد إلى القلب"},
    context:{en:"A compost pile's center reaches thermophilic temperatures, but the outer edges stay cool and are not reliably reaching pathogen-reducing temperatures.",
             fr:"Le centre d'un tas de compost atteint des températures thermophiles, mais les bords extérieurs restent froids et n'atteignent pas de façon fiable les températures réduisant les pathogènes."},
    evidence:[
      {en:"Core temperature logs show sustained thermophilic range",fr:"Les relevés de température du cœur montrent une plage thermophile soutenue"},
      {en:"Edge temperature logs remain well below that range",fr:"Les relevés de température des bords restent bien en dessous de cette plage"},
      {en:"Turning redistributes material between core and edge zones",fr:"Le retournement redistribue le matériau entre les zones du cœur et des bords"}],
    possibleActions:[
      {en:"Turn the pile on a regular schedule",fr:"Retourner le tas selon un calendrier régulier"},
      {en:"Increase pile size to improve core insulation",fr:"Augmenter la taille du tas pour améliorer l'isolation du cœur"},
      {en:"Monitor temperature at multiple points, not just the core",fr:"Surveiller la température en plusieurs points, pas seulement au cœur"}],
    reasoning:{en:"Only material that spends sufficient time at sustained high temperature undergoes reliable pathogen die-off; untouched edge material bypasses that exposure entirely.",
               fr:"Seul le matériau ayant passé suffisamment de temps à haute température soutenue subit une réduction fiable des pathogènes ; le matériau des bords non retourné échappe entièrement à cette exposition."},
    misconception:{en:"A hot compost core does not guarantee the whole pile has reached pathogen-reducing conditions.",
                   fr:"Un cœur de compost chaud ne garantit pas que l'ensemble du tas ait atteint des conditions réduisant les pathogènes."},
    learningObjectives:[
      {en:"Explain thermophilic succession in composting",fr:"Expliquer la succession thermophile dans le compostage"},
      {en:"Identify why spatial temperature variation matters",fr:"Identifier pourquoi la variation spatiale de température compte"}] },

  { id:"sc-006", world:"soil", space:"soil-rhizosphere", difficulty:"intermediate", status:"established",
    title:{en:"Root exudates and the competition they invite",fr:"Les exsudats racinaires et la compétition qu'ils suscitent",ar:"إفرازات الجذور والتنافس الذي تستدعيه"},
    context:{en:"A plant root releases sugars and organic acids into the surrounding soil, and microbial density there is measured against bulk soil a few centimeters away.",
             fr:"Une racine de plante libère sucres et acides organiques dans le sol environnant, et la densité microbienne y est mesurée par rapport au sol non rhizosphérique à quelques centimètres."},
    evidence:[
      {en:"Microbial density in the rhizosphere zone is markedly higher than in bulk soil",fr:"La densité microbienne dans la zone rhizosphérique est nettement plus élevée que dans le sol non rhizosphérique"},
      {en:"Some rhizosphere organisms provide the plant with nutrients or pathogen protection in exchange",fr:"Certains organismes de la rhizosphère fournissent à la plante des nutriments ou une protection contre les pathogènes en échange"}],
    possibleActions:[
      {en:"Select crop varieties that recruit beneficial rhizosphere communities",fr:"Sélectionner des variétés de culture qui recrutent des communautés rhizosphériques bénéfiques"},
      {en:"Avoid excessive tillage that disrupts root-associated communities",fr:"Éviter un travail du sol excessif qui perturbe les communautés associées aux racines"}],
    reasoning:{en:"Root exudates act as a concentrated nutrient source, drawing far denser microbial colonization than the surrounding bulk soil.",
               fr:"Les exsudats racinaires agissent comme une source de nutriments concentrée, attirant une colonisation microbienne bien plus dense que le sol environnant."},
    misconception:{en:"Not all rhizosphere microbial activity is competitive with the plant, some of it is mutually beneficial.",
                   fr:"Toute l'activité microbienne rhizosphérique n'est pas compétitive vis-à-vis de la plante, une partie est mutuellement bénéfique."},
    learningObjectives:[
      {en:"Explain why nutrient gradients drive microbial density",fr:"Expliquer pourquoi les gradients de nutriments déterminent la densité microbienne"},
      {en:"Distinguish competitive and mutualistic rhizosphere interactions",fr:"Distinguer les interactions compétitives et mutualistes de la rhizosphère"}] },

  { id:"sc-007", world:"freshwater", space:"freshwater-distribution-pipe", difficulty:"advanced", status:"simplified",
    title:{en:"A biofilm sloughing event downstream",fr:"Un événement de décrochement de biofilm en aval",ar:"حدث انفصال غشاء حيوي في اتجاه مجرى التدفق"},
    context:{en:"A water utility receives a cluster of discolored-water complaints from a single neighborhood a day after unusually high water demand.",
             fr:"Un service des eaux reçoit une série de plaintes pour eau décolorée dans un même quartier, un jour après une demande en eau inhabituellement élevée."},
    evidence:[
      {en:"High-demand periods increase flow velocity through distribution pipes",fr:"Les périodes de forte demande augmentent la vitesse d'écoulement dans les canalisations de distribution"},
      {en:"Increased shear stress can dislodge portions of pipe-wall biofilm",fr:"Une contrainte de cisaillement accrue peut déloger des portions de biofilm de paroi"},
      {en:"Disinfectant residual typically decreases with distance from the treatment plant",fr:"Le résiduel de désinfectant diminue généralement avec la distance depuis l'usine de traitement"}],
    possibleActions:[
      {en:"Flush the affected line",fr:"Purger la conduite concernée"},
      {en:"Investigate biofilm accumulation at that section",fr:"Examiner l'accumulation de biofilm à cette section"},
      {en:"Review disinfectant residual monitoring along the distribution route",fr:"Réexaminer la surveillance du résiduel de désinfectant le long du réseau de distribution"}],
    reasoning:{en:"Flow changes alter shear stress on pipe walls; biofilm that had accumulated during low-flow periods can shed material when flow suddenly increases.",
               fr:"Les variations de débit modifient la contrainte de cisaillement sur les parois des canalisations ; un biofilm accumulé lors de périodes de faible débit peut se détacher lorsque le débit augmente soudainement."},
    misconception:{en:"Water leaving a treatment plant clean does not guarantee it stays uniformly clean throughout an entire distribution network.",
                   fr:"Une eau quittant une usine de traitement propre ne garantit pas qu'elle reste uniformément propre sur tout le réseau de distribution."},
    learningObjectives:[
      {en:"Explain the relationship between flow velocity and biofilm shear",fr:"Expliquer la relation entre vitesse d'écoulement et cisaillement du biofilm"},
      {en:"Understand disinfectant residual decay along a distribution system",fr:"Comprendre la décroissance du résiduel de désinfectant le long d'un réseau de distribution"}] },

  { id:"sc-008", world:"freshwater", space:"freshwater-lake-surface", difficulty:"intermediate", status:"established",
    title:{en:"Fertilizer runoff and a summer bloom",fr:"Ruissellement d'engrais et efflorescence estivale",ar:"جريان الأسمدة وإزهار صيفي"},
    context:{en:"Following a heavy spring rain that washed fertilizer from nearby farmland into a lake, a dense cyanobacterial bloom develops by midsummer.",
             fr:"Après une forte pluie printanière ayant entraîné des engrais des terres agricoles voisines vers un lac, une efflorescence dense de cyanobactéries se développe en plein été."},
    evidence:[
      {en:"Nitrogen and phosphorus concentrations rose sharply after the runoff event",fr:"Les concentrations d'azote et de phosphore ont fortement augmenté après l'épisode de ruissellement"},
      {en:"Warm summer temperatures favor cyanobacterial growth rates",fr:"Les températures estivales chaudes favorisent les taux de croissance des cyanobactéries"},
      {en:"Bloom-associated oxygen depletion is observed overnight",fr:"Un appauvrissement en oxygène lié à l'efflorescence est observé la nuit"}],
    possibleActions:[
      {en:"Reduce nutrient runoff through buffer strips and fertilizer timing",fr:"Réduire le ruissellement de nutriments via des bandes tampons et le calendrier de fertilisation"},
      {en:"Monitor bloom toxin levels before recreational use",fr:"Surveiller les niveaux de toxines de l'efflorescence avant tout usage récréatif"},
      {en:"Aerate affected zones to offset overnight oxygen depletion",fr:"Aérer les zones touchées pour compenser l'appauvrissement nocturne en oxygène"}],
    reasoning:{en:"Excess nutrients remove the growth-limiting factor for cyanobacteria, and warm temperatures then allow that released potential to be expressed as rapid bloom growth.",
               fr:"L'excès de nutriments supprime le facteur limitant la croissance des cyanobactéries, et les températures chaudes permettent ensuite l'expression de ce potentiel libéré sous forme de croissance rapide de l'efflorescence."},
    misconception:{en:"A bloom's timing often reflects a delayed combination of an earlier nutrient event and later favorable temperature, not a single cause alone.",
                   fr:"Le moment d'apparition d'une efflorescence reflète souvent une combinaison différée entre un apport antérieur en nutriments et des températures favorables ultérieures, non une cause unique."},
    learningObjectives:[
      {en:"Explain nutrient limitation and its removal",fr:"Expliquer la limitation en nutriments et sa levée"},
      {en:"Connect eutrophication to bloom dynamics",fr:"Relier l'eutrophisation à la dynamique des efflorescences"}] },

  { id:"sc-009", world:"marine", space:"marine-hull-surface", difficulty:"intermediate", status:"established",
    title:{en:"The order of biofouling succession",fr:"L'ordre de succession du biofouling",ar:"ترتيب تعاقب التلوث الحيوي السطحي"},
    context:{en:"A newly painted ship hull is tracked over several weeks in port to observe how a fouling community assembles on its surface.",
             fr:"La coque fraîchement peinte d'un navire est suivie pendant plusieurs semaines au port pour observer l'assemblage de la communauté de biofouling sur sa surface."},
    evidence:[
      {en:"A conditioning film of organic molecules forms within minutes of submersion",fr:"Un film de conditionnement de molécules organiques se forme quelques minutes après l'immersion"},
      {en:"Bacterial and diatom colonizers attach within hours to days",fr:"Les colonisateurs bactériens et les diatomées s'attachent en quelques heures à quelques jours"},
      {en:"Macrofoulers such as barnacles attach only after the microbial layer is established",fr:"Les macro-organismes fouling comme les balanes ne s'attachent qu'une fois la couche microbienne établie"}],
    possibleActions:[
      {en:"Apply antifouling coatings that disrupt early conditioning-film formation",fr:"Appliquer des revêtements antifouling qui perturbent la formation précoce du film de conditionnement"},
      {en:"Schedule regular hull cleaning before macrofouling establishes",fr:"Planifier un nettoyage régulier de la coque avant l'installation du macrofouling"}],
    reasoning:{en:"Each stage of fouling changes the surface chemistry in a way that makes the next stage more favorable, so intervening early in the sequence is more effective than waiting.",
               fr:"Chaque étape du biofouling modifie la chimie de surface d'une manière qui favorise l'étape suivante, ce qui rend une intervention précoce plus efficace qu'une intervention tardive."},
    misconception:{en:"Barnacles and other macrofoulers are not the first colonizers, they depend on a microbial groundwork being laid first.",
                   fr:"Les balanes et autres macro-organismes fouling ne sont pas les premiers colonisateurs, ils dépendent d'un travail préalable microbien."},
    learningObjectives:[
      {en:"Describe the stages of biofouling succession",fr:"Décrire les étapes de la succession du biofouling"},
      {en:"Explain why early-stage intervention is more efficient",fr:"Expliquer pourquoi une intervention précoce est plus efficace"}] },

  { id:"sc-010", world:"marine", space:"marine-shellfish-bed", difficulty:"intermediate", status:"established",
    title:{en:"Warm-water Vibrio risk in shellfish",fr:"Risque de Vibrio en eau chaude dans les coquillages",ar:"خطر ضمّة الفيبريو في المياه الدافئة على المحاريات"},
    context:{en:"A coastal shellfish advisory is issued during an unusually warm summer, well before any confirmed illness cases.",
             fr:"Un avis sanitaire côtier concernant les coquillages est émis pendant un été inhabituellement chaud, bien avant tout cas de maladie confirmé."},
    evidence:[
      {en:"Vibrio species multiply more rapidly in warmer coastal water",fr:"Les espèces de Vibrio se multiplient plus rapidement dans une eau côtière plus chaude"},
      {en:"Filter-feeding shellfish concentrate waterborne organisms from the surrounding water",fr:"Les coquillages filtreurs concentrent les organismes présents dans l'eau environnante"},
      {en:"Illness risk is linked to eating shellfish raw or undercooked",fr:"Le risque de maladie est lié à la consommation de coquillages crus ou insuffisamment cuits"}],
    possibleActions:[
      {en:"Issue advisories based on water temperature rather than waiting for illness reports",fr:"Émettre des avis fondés sur la température de l'eau plutôt que d'attendre des signalements de maladie"},
      {en:"Ensure adequate cooking of shellfish during warm-water periods",fr:"Garantir une cuisson adéquate des coquillages pendant les périodes d'eau chaude"}],
    reasoning:{en:"Because filter feeders concentrate whatever is in the surrounding water, a rise in water-column Vibrio levels translates directly into elevated levels within the shellfish itself.",
               fr:"Les filtreurs concentrant ce qui se trouve dans l'eau environnante, une hausse des niveaux de Vibrio dans la colonne d'eau se traduit directement par des niveaux élevés dans les coquillages eux-mêmes."},
    misconception:{en:"Advisories based on temperature act preemptively; waiting for confirmed illness means the exposure has already happened.",
                   fr:"Les avis fondés sur la température agissent de manière préventive ; attendre des cas confirmés signifie que l'exposition a déjà eu lieu."},
    learningObjectives:[
      {en:"Explain bioaccumulation in filter feeders",fr:"Expliquer la bioaccumulation chez les filtreurs"},
      {en:"Connect temperature to Vibrio growth rate",fr:"Relier la température au taux de croissance de Vibrio"}] },

  { id:"sc-011", world:"pharmaceutical", space:"pharma-water-system", difficulty:"expert", status:"simplified",
    title:{en:"A dead-leg in the purified water loop",fr:"Une branche morte dans la boucle d'eau purifiée",ar:"فرع ميت في حلقة المياه المنقّاة"},
    context:{en:"A section of piping that is rarely used, a \"dead-leg\", shows elevated microbial counts compared with the actively recirculating main loop.",
             fr:"Une section de tuyauterie rarement utilisée, une « branche morte », affiche des comptages microbiens élevés par rapport à la boucle principale en recirculation active."},
    evidence:[
      {en:"Flow velocity in the dead-leg is near zero most of the time",fr:"La vitesse d'écoulement dans la branche morte est proche de zéro la plupart du temps"},
      {en:"Stagnant sections lose the mechanical flushing effect of continuous flow",fr:"Les sections stagnantes perdent l'effet de rinçage mécanique du débit continu"},
      {en:"Biofilm accumulates preferentially at low-flow points in high-purity water systems",fr:"Le biofilm s'accumule préférentiellement aux points de faible débit dans les systèmes d'eau haute pureté"}],
    possibleActions:[
      {en:"Eliminate unnecessary dead-legs during system design",fr:"Éliminer les branches mortes inutiles dès la conception du système"},
      {en:"Increase flushing frequency at unavoidable low-flow points",fr:"Augmenter la fréquence de rinçage aux points de faible débit inévitables"},
      {en:"Include dead-leg sampling points in the routine monitoring plan",fr:"Inclure des points d'échantillonnage des branches mortes dans le plan de surveillance de routine"}],
    reasoning:{en:"Continuous flow provides a mechanical control against biofilm establishment; removing that flow removes the control, even though the water itself is highly purified.",
               fr:"Le débit continu constitue un contrôle mécanique contre l'installation d'un biofilm ; supprimer ce débit supprime ce contrôle, même si l'eau elle-même est hautement purifiée."},
    misconception:{en:"High water purity does not by itself prevent biofilm formation, flow and design also matter.",
                   fr:"Une haute pureté de l'eau n'empêche pas à elle seule la formation d'un biofilm, le débit et la conception du système comptent aussi."},
    learningObjectives:[
      {en:"Explain why dead-legs are a design risk in pharmaceutical water systems",fr:"Expliquer pourquoi les branches mortes sont un risque de conception dans les systèmes d'eau pharmaceutiques"},
      {en:"Connect flow velocity to biofilm control",fr:"Relier la vitesse d'écoulement à la maîtrise du biofilm"}] },

  { id:"sc-012", world:"pharmaceutical", space:"pharma-cleanroom-bench", difficulty:"advanced", status:"simplified",
    title:{en:"An unexplained rise in cleanroom environmental counts",fr:"Une hausse inexpliquée des comptages environnementaux en salle blanche",ar:"ارتفاع غير مفسَّر في تعداد الرصد البيئي بغرفة نظيفة"},
    context:{en:"Routine environmental monitoring in an ISO-classified cleanroom shows a gradual rise in recovered colony counts over several weeks, without any single dramatic spike.",
             fr:"La surveillance environnementale de routine d'une salle blanche classée ISO montre une hausse progressive des comptages de colonies récupérées sur plusieurs semaines, sans pic isolé marquant."},
    evidence:[
      {en:"Personnel gowning compliance logs show a slight decline in adherence",fr:"Les registres de conformité d'habillage du personnel montrent un léger recul de l'adhérence"},
      {en:"HVAC filter change records are within schedule",fr:"Les registres de remplacement des filtres CVC respectent le calendrier"},
      {en:"Airflow pattern testing has not been repeated recently",fr:"Les tests de profil de flux d'air n'ont pas été répétés récemment"}],
    possibleActions:[
      {en:"Reinforce gowning and aseptic technique training",fr:"Renforcer la formation à l'habillage et à la technique aseptique"},
      {en:"Retest airflow patterns for unexpected turbulence",fr:"Retester les profils de flux d'air à la recherche de turbulences inattendues"},
      {en:"Investigate whether new equipment altered airflow",fr:"Examiner si un nouvel équipement a modifié le flux d'air"}],
    reasoning:{en:"A gradual trend, rather than a single spike, more often points to a slowly changing systemic factor such as personnel behavior or airflow drift than to one isolated event.",
               fr:"Une tendance progressive, plutôt qu'un pic isolé, oriente plus souvent vers un facteur systémique évoluant lentement, comme le comportement du personnel ou une dérive du flux d'air, plutôt que vers un événement isolé."},
    misconception:{en:"Not every contamination trend has a single dramatic root cause, some reflect a gradual drift in an underlying control.",
                   fr:"Toute tendance de contamination n'a pas nécessairement une cause unique et spectaculaire, certaines reflètent une dérive progressive d'un contrôle sous-jacent."},
    learningObjectives:[
      {en:"Distinguish trend analysis from single-event investigation in monitoring data",fr:"Distinguer l'analyse de tendance de l'investigation d'un événement isolé dans les données de surveillance"},
      {en:"Identify systemic versus acute contamination causes",fr:"Identifier les causes de contamination systémiques par opposition aux causes aiguës"}] },

  { id:"sc-013", world:"fermentation", space:"fermentation-brewery-vessel", difficulty:"intermediate", status:"established",
    title:{en:"An off-flavor batch",fr:"Un lot au goût anormal",ar:"دفعة ذات نكهة غير معتادة"},
    context:{en:"A beer batch develops an unexpected sour, buttery off-flavor that the brewing strain of Saccharomyces would not normally produce.",
             fr:"Un lot de bière développe un goût acide et beurré inattendu, que la souche de Saccharomyces utilisée ne produirait normalement pas."},
    evidence:[
      {en:"Buttery off-flavors are commonly associated with certain contaminant bacteria in brewing",fr:"Les goûts anormaux beurrés sont couramment associés à certaines bactéries contaminantes en brasserie"},
      {en:"Inadequate sanitation of hoses and seals is a known contamination entry point",fr:"Une désinfection inadéquate des tuyaux et joints est une voie d'entrée de contamination connue"},
      {en:"The starter culture pitch rate was within normal range",fr:"Le taux d'ensemencement de la culture starter était dans la plage normale"}],
    possibleActions:[
      {en:"Trace and sanitize hoses, valves and seals for contamination sources",fr:"Tracer et désinfecter tuyaux, vannes et joints à la recherche de sources de contamination"},
      {en:"Verify starter culture purity before pitching",fr:"Vérifier la pureté de la culture starter avant ensemencement"},
      {en:"Review cleaning validation records for the fermenter",fr:"Réexaminer les registres de validation du nettoyage du fermenteur"}],
    reasoning:{en:"When a flavor compound is inconsistent with the intended starter organism's known metabolism, it points toward an unintended contaminant rather than a pitch-rate or temperature issue.",
               fr:"Lorsqu'un composé aromatique est incompatible avec le métabolisme connu de l'organisme starter prévu, cela oriente vers un contaminant involontaire plutôt que vers un problème de taux d'ensemencement ou de température."},
    misconception:{en:"Not every off-flavor stems from a process-parameter error, some point specifically to an unintended organism.",
                   fr:"Toute saveur anormale ne provient pas d'une erreur de paramètre de procédé, certaines pointent spécifiquement vers un organisme non désiré."},
    learningObjectives:[
      {en:"Connect flavor compounds to specific organism metabolism",fr:"Relier les composés aromatiques au métabolisme d'un organisme spécifique"},
      {en:"Identify common contamination entry points in fermentation equipment",fr:"Identifier les voies d'entrée courantes de contamination dans l'équipement de fermentation"}] },

  { id:"sc-014", world:"fermentation", space:"fermentation-dairy-culture", difficulty:"beginner", status:"established",
    title:{en:"Why the starter culture wins",fr:"Pourquoi la culture starter l'emporte",ar:"لماذا تفوز المزرعة البادئة"},
    context:{en:"A yogurt starter culture is added to pasteurized milk and rapidly dominates the fermentation, even though the milk was not sterile before pasteurization.",
             fr:"Une culture starter de yaourt est ajoutée à du lait pasteurisé et domine rapidement la fermentation, bien que le lait n'ait pas été stérile avant pasteurisation."},
    evidence:[
      {en:"Pasteurization greatly reduces the competing microbial load before inoculation",fr:"La pasteurisation réduit fortement la charge microbienne concurrente avant l'inoculation"},
      {en:"The starter culture is added at a high initial concentration",fr:"La culture starter est ajoutée à une concentration initiale élevée"},
      {en:"Lactic acid production quickly lowers pH to a level many competitors cannot tolerate",fr:"La production d'acide lactique abaisse rapidement le pH à un niveau que de nombreux concurrents ne tolèrent pas"}],
    possibleActions:[
      {en:"Maintain pasteurization validation to keep background competition low",fr:"Maintenir la validation de la pasteurisation pour garder la compétition de fond faible"},
      {en:"Verify starter culture viability and inoculation rate before each batch",fr:"Vérifier la viabilité de la culture starter et le taux d'inoculation avant chaque lot"}],
    reasoning:{en:"A combination of reduced competition after pasteurization, a numerically dominant starter inoculum, and a rapidly acidifying environment together secure starter-culture dominance.",
               fr:"La combinaison d'une compétition réduite après pasteurisation, d'un inoculum starter numériquement dominant et d'un environnement s'acidifiant rapidement assure ensemble la dominance de la culture starter."},
    misconception:{en:"Starter-culture dominance is not automatic, it depends on inoculum size and a head start, not simply on adding the culture.",
                   fr:"La dominance de la culture starter n'est pas automatique, elle dépend de la taille de l'inoculum et d'une longueur d'avance, pas simplement de l'ajout de la culture."},
    learningObjectives:[
      {en:"Explain competitive exclusion through inoculum size and pH change",fr:"Expliquer l'exclusion compétitive par la taille de l'inoculum et le changement de pH"},
      {en:"Connect pasteurization to reduced background competition",fr:"Relier la pasteurisation à une compétition de fond réduite"}] },

  { id:"sc-015", world:"human-microbiome", space:"microbiome-gut-colon", difficulty:"advanced", status:"established",
    title:{en:"Antibiotic course, then a new problem",fr:"Traitement antibiotique, puis un nouveau problème",ar:"دورة مضادات حيوية، ثم مشكلة جديدة"},
    context:{en:"Following a course of broad-spectrum antibiotics for an unrelated infection, a patient develops a new gastrointestinal illness caused by an opportunistic organism.",
             fr:"À la suite d'un traitement antibiotique à large spectre pour une infection sans rapport, un patient développe une nouvelle affection gastro-intestinale causée par un organisme opportuniste."},
    evidence:[
      {en:"Broad-spectrum antibiotics reduce diversity across much of the resident gut community, not only the intended target",fr:"Les antibiotiques à large spectre réduisent la diversité d'une grande partie de la communauté intestinale résidente, pas seulement de la cible visée"},
      {en:"A less diverse community offers fewer competitors to resist an opportunistic organism",fr:"Une communauté moins diversifiée offre moins de concurrents pour résister à un organisme opportuniste"},
      {en:"The opportunistic organism was likely present at low levels before treatment",fr:"L'organisme opportuniste était probablement présent à faible niveau avant le traitement"}],
    possibleActions:[
      {en:"Use narrow-spectrum antibiotics when clinically appropriate",fr:"Utiliser des antibiotiques à spectre étroit lorsque cela est cliniquement approprié"},
      {en:"Monitor for secondary gastrointestinal symptoms after broad-spectrum courses",fr:"Surveiller les symptômes gastro-intestinaux secondaires après des traitements à large spectre"}],
    reasoning:{en:"Removing broad swaths of the resident competing community creates an opening that an already-present but normally suppressed organism can exploit.",
               fr:"L'élimination de larges pans de la communauté résidente concurrente crée une ouverture qu'un organisme déjà présent mais normalement réprimé peut exploiter."},
    misconception:{en:"An antibiotic-associated secondary illness is not caused by the antibiotic directly, it results from disrupted competitive balance.",
                   fr:"Une maladie secondaire associée aux antibiotiques n'est pas causée directement par l'antibiotique, elle résulte d'un déséquilibre de la compétition microbienne."},
    learningObjectives:[
      {en:"Explain colonization resistance and its disruption",fr:"Expliquer la résistance à la colonisation et sa perturbation"},
      {en:"Connect antibiotic breadth to secondary infection risk",fr:"Relier le spectre d'un antibiotique au risque d'infection secondaire"}] },

  { id:"sc-016", world:"human-microbiome", space:"microbiome-skin-forearm", difficulty:"beginner", status:"established",
    title:{en:"Why skin flora differs from gut flora",fr:"Pourquoi la flore cutanée diffère de la flore intestinale",ar:"لماذا تختلف فلورا الجلد عن فلورا الأمعاء"},
    context:{en:"A comparison of microbial communities from forearm skin and colonic samples from the same person shows almost no overlap in dominant organisms.",
             fr:"Une comparaison des communautés microbiennes de la peau de l'avant-bras et d'échantillons coliques provenant de la même personne montre presque aucun recouvrement des organismes dominants."},
    evidence:[
      {en:"Forearm skin is dry, low-nutrient and oxygen-exposed",fr:"La peau de l'avant-bras est sèche, pauvre en nutriments et exposée à l'oxygène"},
      {en:"The colon is moist, nutrient-rich and anaerobic",fr:"Le côlon est humide, riche en nutriments et anaérobie"},
      {en:"Organisms recovered from each site differ almost entirely in their environmental tolerances",fr:"Les organismes récupérés à chaque site diffèrent presque entièrement par leurs tolérances environnementales"}],
    possibleActions:[
      {en:"Use site-specific sampling protocols rather than assuming one body site represents another",fr:"Utiliser des protocoles d'échantillonnage spécifiques au site plutôt que de supposer qu'un site corporel en représente un autre"}],
    reasoning:{en:"Each body site presents a distinct combination of moisture, oxygen and nutrients, and only organisms tolerant of that specific combination persist there.",
               fr:"Chaque site corporel présente une combinaison distincte d'humidité, d'oxygène et de nutriments, et seuls les organismes tolérant cette combinaison spécifique y persistent."},
    misconception:{en:"There is no single \"human microbiome\" uniform across the body, communities are strongly site-specific.",
                   fr:"Il n'existe pas un « microbiote humain » unique uniforme sur tout le corps, les communautés sont fortement spécifiques au site."},
    learningObjectives:[
      {en:"Explain habitat filtering across body sites",fr:"Expliquer le filtrage d'habitat entre les sites corporels"},
      {en:"Understand why sampling site matters in microbiome study design",fr:"Comprendre pourquoi le site d'échantillonnage compte dans la conception d'une étude du microbiote"}] },

  { id:"sc-017", world:"industrial", space:"industrial-cooling-tower", difficulty:"advanced", status:"established",
    title:{en:"Why cooling towers are monitored for Legionella-relevant conditions",fr:"Pourquoi les tours de refroidissement sont surveillées pour des conditions propices à Legionella",ar:"لماذا تُراقَب أبراج التبريد بحثاً عن ظروف مواتية لليجيونيلا"},
    context:{en:"A facility reviews its cooling tower maintenance schedule after learning that warm, stagnant, biofilm-rich water systems are a known amplification site for Legionella species, which can then aerosolize.",
             fr:"Un site révise son calendrier de maintenance de tour de refroidissement après avoir appris que les systèmes d'eau chaude, stagnante et riche en biofilm constituent un site d'amplification connu pour les espèces de Legionella, susceptibles ensuite d'être aérosolisées."},
    evidence:[
      {en:"Warm recirculating water in the 20-45°C range favors Legionella growth",fr:"Une eau recirculante chaude entre 20 et 45°C favorise la croissance de Legionella"},
      {en:"Biofilm and scale provide protective niches within amplifying systems",fr:"Le biofilm et le tartre offrent des niches protectrices au sein des systèmes amplificateurs"},
      {en:"Aerosolization from a cooling tower can expose people well beyond the immediate facility",fr:"L'aérosolisation depuis une tour de refroidissement peut exposer des personnes bien au-delà du site immédiat"}],
    possibleActions:[
      {en:"Maintain a documented water-management plan",fr:"Maintenir un plan documenté de gestion de l'eau"},
      {en:"Control biofilm and scale through regular cleaning and biocide dosing",fr:"Maîtriser le biofilm et le tartre par un nettoyage régulier et un dosage de biocide"},
      {en:"Monitor water temperature and disinfectant residual",fr:"Surveiller la température de l'eau et le résiduel de désinfectant"}],
    reasoning:{en:"The combination of a permissive temperature range, biofilm shelter and an aerosol-generating mechanism together create both an amplification site and an exposure pathway.",
               fr:"La combinaison d'une plage de température favorable, d'un abri en biofilm et d'un mécanisme générant des aérosols crée à la fois un site d'amplification et une voie d'exposition."},
    misconception:{en:"The risk from such systems is not only about water quality inside the tower, the aerosol pathway extends exposure beyond the water itself.",
                   fr:"Le risque de tels systèmes ne concerne pas uniquement la qualité de l'eau à l'intérieur de la tour, la voie aérosol étend l'exposition au-delà de l'eau elle-même."},
    learningObjectives:[
      {en:"Explain amplification-site conditions for waterborne bacteria",fr:"Expliquer les conditions d'un site d'amplification pour les bactéries hydriques"},
      {en:"Connect biofilm shelter to reduced biocide effectiveness",fr:"Relier l'abri du biofilm à une efficacité réduite du biocide"}] },

  { id:"sc-018", world:"industrial", space:"industrial-metalworking-fluid", difficulty:"intermediate", status:"established",
    title:{en:"A metalworking fluid that turned sour overnight",fr:"Un fluide de coupe devenu acide en une nuit",ar:"سائل تشغيل معادن تحوّل حامضياً بين عشية وضحاها"},
    context:{en:"A metalworking fluid sump develops a strong sour odor and reduced pH stability, with performance complaints from machinists soon after.",
             fr:"Un bac de fluide de coupe développe une forte odeur acide et une stabilité de pH réduite, suivies rapidement de plaintes de performance de la part des opérateurs."},
    evidence:[
      {en:"Recirculating oil-water emulsions provide abundant nutrients for spoilage organisms",fr:"Les émulsions huile-eau recirculantes fournissent des nutriments abondants aux organismes d'altération"},
      {en:"Biocide levels typically deplete over the service life of a fluid batch",fr:"Les niveaux de biocide s'épuisent généralement au fil de la durée de service d'un lot de fluide"},
      {en:"Anaerobic pockets can develop in poorly agitated sump zones",fr:"Des poches anaérobies peuvent se former dans des zones de bac mal agitées"}],
    possibleActions:[
      {en:"Test and replenish biocide levels on schedule",fr:"Tester et réapprovisionner les niveaux de biocide selon le calendrier"},
      {en:"Improve sump agitation to reduce anaerobic pockets",fr:"Améliorer l'agitation du bac pour réduire les poches anaérobies"},
      {en:"Replace the fluid batch if souring is advanced",fr:"Remplacer le lot de fluide si l'acidification est avancée"}],
    reasoning:{en:"As biocide depletes over time, the fluid's nutrient-rich emulsion becomes increasingly permissive for spoilage organisms, and anaerobic pockets accelerate souring.",
               fr:"À mesure que le biocide s'épuise, l'émulsion riche en nutriments du fluide devient de plus en plus permissive pour les organismes d'altération, et les poches anaérobies accélèrent l'acidification."},
    misconception:{en:"A biocide added once at the start of a fluid's service life does not remain protective indefinitely.",
                   fr:"Un biocide ajouté une seule fois en début de vie du fluide ne reste pas protecteur indéfiniment."},
    learningObjectives:[
      {en:"Explain biocide depletion over a fluid's service life",fr:"Expliquer l'épuisement du biocide au fil de la durée de service d'un fluide"},
      {en:"Connect fluid agitation to anaerobic pocket formation",fr:"Relier l'agitation du fluide à la formation de poches anaérobies"}] },

  { id:"sc-019", world:"extreme-environment", space:"extreme-acid-mine-drainage", difficulty:"expert", status:"established",
    title:{en:"A self-reinforcing acid feedback loop",fr:"Une boucle de rétroaction acide auto-entretenue",ar:"حلقة تغذية راجعة حمضية ذاتية التعزيز"},
    context:{en:"An abandoned mine site shows progressively decreasing stream pH over successive years, tracked alongside acidophile population data.",
             fr:"Un site minier abandonné montre un pH du ruisseau diminuant progressivement au fil des années, suivi conjointement à des données de population d'acidophiles."},
    evidence:[
      {en:"Acidophilic iron- and sulfur-oxidizing organisms accelerate the oxidation of exposed mineral sulfides",fr:"Les organismes acidophiles oxydant le fer et le soufre accélèrent l'oxydation des sulfures minéraux exposés"},
      {en:"Their metabolic activity generates additional acidity as a byproduct",fr:"Leur activité métabolique génère de l'acidité supplémentaire comme sous-produit"},
      {en:"Increasing acidity in turn favors further acidophile dominance",fr:"L'acidité croissante favorise à son tour une dominance accrue des acidophiles"}],
    possibleActions:[
      {en:"Apply engineered remediation to interrupt the chemical/biological feedback loop",fr:"Appliquer une remédiation technique pour interrompre la boucle de rétroaction chimique/biologique"},
      {en:"Monitor pH and microbial community composition together, not separately",fr:"Surveiller le pH et la composition de la communauté microbienne conjointement, pas séparément"}],
    reasoning:{en:"The organisms both respond to and actively worsen the acidic conditions they inhabit, creating a self-reinforcing cycle rather than a static equilibrium.",
               fr:"Les organismes répondent aux conditions acides qu'ils habitent tout en les aggravant activement, créant un cycle auto-entretenu plutôt qu'un équilibre statique."},
    misconception:{en:"Microorganisms in extreme environments are not merely passive survivors of the conditions, in this case, they actively drive further environmental change.",
                   fr:"Les micro-organismes des environnements extrêmes ne sont pas de simples survivants passifs des conditions, ici, ils entraînent activement un changement environnemental supplémentaire."},
    learningObjectives:[
      {en:"Explain microbially driven feedback loops",fr:"Expliquer les boucles de rétroaction pilotées par les micro-organismes"},
      {en:"Connect acidophile metabolism to environmental acidification",fr:"Relier le métabolisme des acidophiles à l'acidification environnementale"}] },

  { id:"sc-020", world:"extreme-environment", space:"extreme-hypersaline-lake", difficulty:"expert", status:"established",
    title:{en:"Surviving where water itself is the stressor",fr:"Survivre là où l'eau elle-même est le facteur de stress",ar:"البقاء حيث يكون الماء نفسه عامل الإجهاد"},
    context:{en:"Microbial mats persist at the margins of a hypersaline lake where salt concentration approaches saturation, a condition lethal to most microorganisms.",
             fr:"Des tapis microbiens persistent en bordure d'un lac hypersalin où la concentration en sel approche la saturation, une condition létale pour la plupart des micro-organismes."},
    evidence:[
      {en:"Extreme halophiles accumulate compatible solutes to balance internal and external osmotic pressure",fr:"Les halophiles extrêmes accumulent des solutés compatibles pour équilibrer la pression osmotique interne et externe"},
      {en:"High salt concentration would otherwise draw water out of an unadapted cell",fr:"Une forte concentration en sel ferait sinon sortir l'eau d'une cellule non adaptée"},
      {en:"Pigmentation in some halophiles is linked to protection against intense solar radiation at the lake surface",fr:"La pigmentation chez certains halophiles est liée à une protection contre le rayonnement solaire intense en surface du lac"}],
    possibleActions:[
      {en:"No intervention implied, this scenario is presented as an observational reasoning exercise, not a hazard to manage",fr:"Aucune intervention impliquée, ce scénario est présenté comme un exercice de raisonnement observationnel, pas un danger à gérer"}],
    reasoning:{en:"Osmotic balance through internal solute accumulation is what allows these organisms to avoid the lethal water loss that salt concentration would otherwise cause.",
               fr:"L'équilibre osmotique obtenu par l'accumulation de solutés internes est ce qui permet à ces organismes d'éviter la perte d'eau létale que la concentration en sel provoquerait autrement."},
    misconception:{en:"Extreme environments are not empty of life, they select for organisms with specific adaptive mechanisms rather than excluding life altogether.",
                   fr:"Les environnements extrêmes ne sont pas dépourvus de vie, ils sélectionnent des organismes dotés de mécanismes d'adaptation spécifiques plutôt que d'exclure toute vie."},
    learningObjectives:[
      {en:"Explain osmotic adaptation in extreme halophiles",fr:"Expliquer l'adaptation osmotique chez les halophiles extrêmes"},
      {en:"Understand extremophile survival as an active adaptation, not mere tolerance",fr:"Comprendre la survie des extrêmophiles comme une adaptation active, pas une simple tolérance"}] },

  { id:"sc-021", world:"oral", space:"oral-supragingival-plaque", difficulty:"intermediate", status:"established",
    title:{en:"The first hour after brushing",fr:"La première heure après le brossage",ar:"الساعة الأولى بعد التفريش"},
    context:{en:"Shortly after a tooth surface is thoroughly cleaned, a thin acquired pellicle reforms and early bacterial colonizers begin to attach within minutes to hours.",
             fr:"Peu après un nettoyage minutieux de la surface dentaire, une fine pellicule acquise se reforme et les premiers colonisateurs bactériens commencent à se fixer en quelques minutes à quelques heures."},
    evidence:[
      {en:"Salivary glycoproteins adsorb to clean enamel within minutes, forming the acquired pellicle",fr:"Les glycoprotéines salivaires s'adsorbent sur l'émail propre en quelques minutes, formant la pellicule acquise"},
      {en:"Early colonizing bacteria bind specifically to pellicle receptors",fr:"Les bactéries colonisatrices précoces se lient spécifiquement aux récepteurs de la pellicule"},
      {en:"Later colonizers attach to the early colonizers rather than directly to enamel",fr:"Les colonisateurs tardifs s'attachent aux colonisateurs précoces plutôt que directement à l'émail"}],
    possibleActions:[
      {en:"Understand plaque as an ongoing, recurring process rather than a one-time event to eliminate",fr:"Comprendre la plaque comme un processus continu et récurrent plutôt qu'un événement ponctuel à éliminer"},
      {en:"Maintain regular mechanical disruption through brushing to reset the succession",fr:"Maintenir une perturbation mécanique régulière par le brossage pour réinitialiser la succession"}],
    reasoning:{en:"Because pellicle formation and colonization begin almost immediately after cleaning, plaque is best understood as a recurring successional process rather than something permanently removable.",
               fr:"Comme la formation de la pellicule et la colonisation débutent presque immédiatement après le nettoyage, la plaque est mieux comprise comme un processus successionnel récurrent plutôt que quelque chose d'éliminable de façon permanente."},
    misconception:{en:"Brushing does not create a permanently sterile tooth surface, it resets a successional process that begins again immediately.",
                   fr:"Le brossage ne crée pas une surface dentaire stérile de façon permanente, il réinitialise un processus successionnel qui recommence immédiatement."},
    learningObjectives:[
      {en:"Describe pellicle formation and early colonizer attachment",fr:"Décrire la formation de la pellicule et la fixation des colonisateurs précoces"},
      {en:"Understand plaque formation as a recurring succession",fr:"Comprendre la formation de la plaque comme une succession récurrente"}] },

  { id:"sc-022", world:"oral", space:"oral-gingival-crevice", difficulty:"advanced", status:"established",
    title:{en:"From aerobic to anaerobic as plaque matures",fr:"De l'aérobie à l'anaérobie au fil de la maturation de la plaque",ar:"من الهوائي إلى اللاهوائي مع نضوج اللويحة"},
    context:{en:"As supragingival plaque thickens and extends below the gumline, the dominant organisms shift markedly compared with the early aerobic-surface community.",
             fr:"À mesure que la plaque supragingivale s'épaissit et s'étend sous la ligne gingivale, les organismes dominants changent nettement par rapport à la communauté aérobie initiale de surface."},
    evidence:[
      {en:"Oxygen is rapidly consumed by early aerobic colonizers as the biofilm thickens",fr:"L'oxygène est rapidement consommé par les colonisateurs aérobies précoces à mesure que le biofilm s'épaissit"},
      {en:"The gingival crevice itself is a low-oxygen environment even before plaque maturation",fr:"Le sillon gingivo-dentaire est lui-même un environnement pauvre en oxygène même avant la maturation de la plaque"},
      {en:"Anaerobic organisms in mature subgingival plaque are more strongly associated with periodontal tissue changes",fr:"Les organismes anaérobies de la plaque sous-gingivale mature sont plus fortement associés aux changements du tissu parodontal"}],
    possibleActions:[
      {en:"Target mechanical disruption before the community matures into an anaerobe-dominated state",fr:"Cibler la perturbation mécanique avant que la communauté ne mûrisse vers un état dominé par les anaérobies"},
      {en:"Recognize subgingival plaque as functionally distinct from supragingival plaque",fr:"Reconnaître que la plaque sous-gingivale est fonctionnellement distincte de la plaque supragingivale"}],
    reasoning:{en:"Oxygen consumption by the growing biofilm itself changes the local environment, which in turn selects for a different, more anaerobic community as depth and thickness increase.",
               fr:"La consommation d'oxygène par le biofilm en croissance modifie lui-même l'environnement local, ce qui sélectionne à son tour une communauté différente, plus anaérobie, à mesure que la profondeur et l'épaisseur augmentent."},
    misconception:{en:"Not all dental plaque is the same community at a different stage, its composition shifts fundamentally as conditions change.",
                   fr:"Toute la plaque dentaire n'est pas la même communauté à un stade différent, sa composition change fondamentalement avec l'évolution des conditions."},
    learningObjectives:[
      {en:"Explain how a biofilm can modify its own local environment",fr:"Expliquer comment un biofilm peut modifier son propre environnement local"},
      {en:"Connect oxygen gradients to community composition shifts",fr:"Relier les gradients d'oxygène aux changements de composition de la communauté"}] },

  { id:"sc-023", world:"forensic", space:"forensic-contact-surface", difficulty:"advanced", status:"fictional",
    title:{en:"Case file: the repeatedly contaminated \"sterile\" bench",fr:"Dossier : la paillasse « stérile » contaminée à répétition",ar:"ملف قضية: المقعد \"المعقّم\" الملوَّث مراراً"},
    context:{en:"FICTIONAL EDUCATIONAL CASE. A supposedly controlled laboratory bench repeatedly shows contamination despite documented cleaning. Cleaning logs, personnel movement records and sampling results are provided as evidence.",
             fr:"CAS ÉDUCATIF FICTIF. Une paillasse de laboratoire supposée contrôlée montre une contamination répétée malgré un nettoyage documenté. Les registres de nettoyage, les déplacements du personnel et les résultats d'échantillonnage sont fournis comme éléments."},
    evidence:[
      {en:"Cleaning logs show the bench was disinfected on schedule each time",fr:"Les registres de nettoyage montrent que la paillasse a été désinfectée à chaque fois selon le calendrier"},
      {en:"Personnel movement records show a nearby high-traffic corridor accessed the bench zone briefly between cleanings",fr:"Les registres de déplacement montrent qu'un couloir très fréquenté à proximité a brièvement donné accès à la zone de la paillasse entre les nettoyages"},
      {en:"Sampling results show the same organism recovered each time, consistent with airborne or contact reintroduction rather than survival through disinfection",fr:"Les résultats d'échantillonnage montrent le même organisme récupéré à chaque fois, cohérent avec une réintroduction aérienne ou par contact plutôt qu'une survie à la désinfection"}],
    possibleActions:[
      {en:"Reconstruct the most plausible contamination pathway using the evidence board",fr:"Reconstituer la voie de contamination la plus plausible à l'aide du tableau des preuves"},
      {en:"Consider reintroduction after cleaning, not disinfection failure, as a hypothesis",fr:"Envisager la réintroduction après nettoyage, et non l'échec de la désinfection, comme hypothèse"},
      {en:"Recommend a procedural change to the access pathway, not just to the disinfectant",fr:"Recommander un changement de procédure sur la voie d'accès, pas seulement sur le désinfectant"}],
    reasoning:{en:"When the same organism reappears despite documented effective cleaning, a reintroduction pathway after cleaning is often a more consistent explanation than the disinfectant itself failing.",
               fr:"Lorsque le même organisme réapparaît malgré un nettoyage documenté et efficace, une voie de réintroduction après le nettoyage constitue souvent une explication plus cohérente qu'un échec du désinfectant lui-même."},
    misconception:{en:"Recurring contamination is not automatic proof that a disinfectant is failing, the timeline of events needs to be reconstructed first.",
                   fr:"Une contamination récurrente ne prouve pas automatiquement l'échec d'un désinfectant, la chronologie des événements doit d'abord être reconstruite."},
    learningObjectives:[
      {en:"Practice evidence-based contamination pathway reconstruction",fr:"Pratiquer la reconstitution d'une voie de contamination fondée sur les preuves"},
      {en:"Distinguish disinfection failure from reintroduction after cleaning",fr:"Distinguer l'échec de désinfection de la réintroduction après nettoyage"}] },

  { id:"sc-024", world:"forensic", space:"forensic-transport-route", difficulty:"intermediate", status:"fictional",
    title:{en:"Case file: the sample that told two different stories",fr:"Dossier : l'échantillon qui racontait deux histoires différentes",ar:"ملف قضية: العيّنة التي روت قصتين مختلفتين"},
    context:{en:"FICTIONAL EDUCATIONAL CASE. Two samples taken from the same source at the same time give conflicting laboratory results, and the investigation must reconstruct why.",
             fr:"CAS ÉDUCATIF FICTIF. Deux échantillons prélevés à la même source et au même moment donnent des résultats de laboratoire contradictoires, et l'investigation doit en reconstruire la cause."},
    evidence:[
      {en:"One sample was transported and refrigerated per protocol",fr:"Un échantillon a été transporté et réfrigéré selon le protocole"},
      {en:"The second sample's transport log shows a multi-hour delay at ambient temperature before reaching the laboratory",fr:"Le registre de transport du second échantillon montre un retard de plusieurs heures à température ambiante avant d'atteindre le laboratoire"},
      {en:"Some organisms can multiply substantially during extended ambient-temperature transport, altering the result relative to the true original sample",fr:"Certains organismes peuvent se multiplier de façon importante lors d'un transport prolongé à température ambiante, modifiant le résultat par rapport à l'échantillon d'origine réel"}],
    possibleActions:[
      {en:"Reconstruct the transport timeline for both samples",fr:"Reconstituer la chronologie de transport des deux échantillons"},
      {en:"Recommend cold-chain compliance as a corrective action",fr:"Recommander le respect de la chaîne du froid comme action corrective"},
      {en:"Flag the delayed sample's result as unreliable for direct comparison",fr:"Signaler le résultat de l'échantillon retardé comme non fiable pour une comparaison directe"}],
    reasoning:{en:"A transport delay at ambient temperature is not a neutral event, it can actively change microbial counts before the sample ever reaches the laboratory.",
               fr:"Un retard de transport à température ambiante n'est pas un événement neutre, il peut activement modifier les comptages microbiens avant même que l'échantillon n'atteigne le laboratoire."},
    misconception:{en:"A laboratory result reflects the sample as it arrived, not necessarily the true state of the source at the moment of collection.",
                   fr:"Un résultat de laboratoire reflète l'échantillon tel qu'il est arrivé, pas nécessairement l'état réel de la source au moment du prélèvement."},
    learningObjectives:[
      {en:"Explain the impact of transport conditions on sample integrity",fr:"Expliquer l'impact des conditions de transport sur l'intégrité de l'échantillon"},
      {en:"Understand why chain-of-custody timing is treated as evidence in itself",fr:"Comprendre pourquoi le minutage de la chaîne de possession est traité comme une preuve en soi"}] }
];
