window.MV = window.MV || {}; MV.data = MV.data || {};
MV.data.domino = [
  { id:"dom-001", title:{en:"Standard surface contamination chain",fr:"Chaîne standard de contamination de surface",ar:"سلسلة تلوث سطحي نموذجية"}, status:"simplified",
    stages:[
      { id:"contamination", label:{en:"Contamination",fr:"Contamination"}, desc:{en:"An organism arrives on a surface via contact, splash or airflow.",fr:"Un organisme arrive sur une surface par contact, éclaboussure ou flux d'air."} },
      { id:"survival", label:{en:"Survival",fr:"Survie"}, desc:{en:"The organism tolerates the local temperature, moisture and nutrient conditions long enough to remain viable.",fr:"L'organisme tolère la température, l'humidité et les nutriments locaux assez longtemps pour rester viable."} },
      { id:"attachment", label:{en:"Attachment",fr:"Fixation"}, desc:{en:"The organism adheres to the surface, often aided by a conditioning film.",fr:"L'organisme adhère à la surface, souvent facilité par un film de conditionnement."} },
      { id:"multiplication", label:{en:"Multiplication",fr:"Multiplication"}, desc:{en:"With sufficient nutrients and favorable temperature, the attached population begins to grow.",fr:"Avec suffisamment de nutriments et une température favorable, la population fixée commence à croître."} },
      { id:"microcolony", label:{en:"Microcolony",fr:"Microcolonie"}, desc:{en:"Growth produces small clustered groups of cells on the surface.",fr:"La croissance produit de petits groupes de cellules regroupées sur la surface."} },
      { id:"biofilm", label:{en:"Biofilm",fr:"Biofilm"}, desc:{en:"Cells produce extracellular matrix, forming a structured, protected community.",fr:"Les cellules produisent une matrice extracellulaire, formant une communauté structurée et protégée."} },
      { id:"persistence", label:{en:"Persistence",fr:"Persistance"}, desc:{en:"The mature biofilm resists routine cleaning and continues to reseed the surrounding surface.",fr:"Le biofilm mature résiste au nettoyage de routine et continue de recontaminer la surface environnante."} }
    ],
    interventions:{
      contamination:[{en:"Reduce contact frequency or improve hand hygiene at the point of contact.",fr:"Réduire la fréquence de contact ou améliorer l'hygiène des mains au point de contact."}],
      survival:[{en:"Modify temperature or moisture to make the surface less permissive.",fr:"Modifier la température ou l'humidité pour rendre la surface moins favorable."}],
      attachment:[{en:"Use surface materials or coatings that resist conditioning-film formation.",fr:"Utiliser des matériaux ou revêtements de surface résistant à la formation d'un film de conditionnement."}],
      multiplication:[{en:"Limit nutrient availability through more frequent cleaning.",fr:"Limiter la disponibilité en nutriments par un nettoyage plus fréquent."}],
      microcolony:[{en:"Increase cleaning frequency to disrupt early clusters before they mature.",fr:"Augmenter la fréquence de nettoyage pour perturber les premiers groupes avant leur maturation."}],
      biofilm:[{en:"Apply mechanical disruption (scrubbing) in addition to chemical disinfection, since matrix limits disinfectant penetration.",fr:"Appliquer une perturbation mécanique (brossage) en plus de la désinfection chimique, la matrice limitant la pénétration du désinfectant."}],
      persistence:[{en:"Consider redesign or replacement of the surface/component if routine intervention repeatedly fails.",fr:"Envisager une reconception ou un remplacement de la surface/du composant si l'intervention de routine échoue de façon répétée."}]
    } }
];
