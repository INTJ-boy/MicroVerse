/* MICROVERSE (Worlds dataset. Each World is a thematic microbiology domain. */
window.MV = window.MV || {};
MV.data = MV.data || {};

MV.data.worlds = [
  {
    id: "hospital",
    icon: "🏥",
    name: { en: "Hospital World", fr: "Monde Hospitalier", ar: "العالم الاستشفائي" },
    description: {
      en: "The clinical environment, where surfaces, devices, hands and airflow constantly negotiate the boundary between sterility and colonization.",
      fr: "L'environnement clinique, où surfaces, dispositifs, mains et flux d'air négocient en permanence la frontière entre stérilité et colonisation.",
      ar: "البيئة السريرية، حيث تتفاوض الأسطح والأجهزة والأيدي وتدفق الهواء باستمرار على الحدود الفاصلة بين التعقيم والاستعمار الميكروبي."
    },
    envParams: { humanTraffic: {en:"very high",fr:"très élevée"}, cleaningFrequency: {en:"high",fr:"élevée"}, antimicrobialPressure: {en:"very high",fr:"très élevée"} },
    hazards: [{en:"healthcare-associated colonization",fr:"colonisation associée aux soins"}, {en:"device-related biofilm",fr:"biofilm lié à un dispositif"}, {en:"cross-contamination via hands",fr:"contamination croisée par les mains"}],
    relatedWorlds: ["pharmaceutical", "forensic", "human-microbiome"]
  },
  {
    id: "food",
    icon: "🍽️",
    name: { en: "Food World", fr: "Monde Alimentaire", ar: "عالم الأغذية" },
    description: {
      en: "Processing lines, storage and preparation surfaces where microbial growth, spoilage and fermentation intersect with food safety.",
      fr: "Lignes de transformation, surfaces de stockage et de préparation où croissance microbienne, altération et fermentation croisent la sécurité alimentaire.",
      ar: "خطوط التصنيع وأسطح التخزين والتحضير حيث يتقاطع النمو الميكروبي والتلف والتخمر مع سلامة الأغذية."
    },
    envParams: { temperatureRange: {en:"variable (cold chain to ambient)",fr:"variable (chaîne du froid à ambiante)"}, nutrientAvailability: {en:"very high",fr:"très élevée"}, moisture: {en:"variable",fr:"variable"} },
    hazards: [{en:"cross-contamination raw/ready-to-eat",fr:"contamination croisée cru/prêt à consommer"}, {en:"temperature abuse",fr:"abus de température"}, {en:"biofilm in drains",fr:"biofilm dans les siphons"}],
    relatedWorlds: ["fermentation", "industrial", "water-safety"]
  },
  {
    id: "soil",
    icon: "🌱",
    name: { en: "Soil World", fr: "Monde du Sol", ar: "عالم التربة" },
    description: {
      en: "One of the most microbially dense habitats on Earth, where nutrient cycling, decomposition and plant-microbe interactions shape ecosystem function.",
      fr: "L'un des habitats les plus denses en micro-organismes sur Terre, où cycles des nutriments, décomposition et interactions plante-microbe façonnent l'écosystème.",
      ar: "أحد أكثر الموائل كثافة ميكروبية على الأرض، حيث تُشكّل دورات المغذيات والتحلل والتفاعلات بين النبات والميكروبات وظيفة النظام البيئي."
    },
    envParams: { oxygenGradient: {en:"variable with depth",fr:"variable avec la profondeur"}, moisture: {en:"seasonal",fr:"saisonnière"}, nutrientAvailability: {en:"heterogeneous",fr:"hétérogène"} },
    hazards: [{en:"pathogenic soil-borne spores",fr:"spores pathogènes telluriques"}, {en:"agricultural contamination routes",fr:"voies de contamination agricoles"}],
    relatedWorlds: ["agricultural", "bioremediation", "environmental"]
  },
  {
    id: "freshwater",
    icon: "💧",
    name: { en: "Freshwater World", fr: "Monde d'Eau Douce", ar: "عالم المياه العذبة" },
    description: {
      en: "Rivers, lakes and groundwater systems, where microbial communities respond rapidly to nutrient input, temperature and human activity.",
      fr: "Rivières, lacs et systèmes souterrains, où les communautés microbiennes répondent rapidement aux apports en nutriments, à la température et à l'activité humaine.",
      ar: "الأنهار والبحيرات والمياه الجوفية، حيث تستجيب المجتمعات الميكروبية بسرعة لمدخلات المغذيات ودرجة الحرارة والنشاط البشري."
    },
    envParams: { flowRegime: {en:"variable",fr:"variable"}, nutrientAvailability: {en:"eutrophication-sensitive",fr:"sensible à l'eutrophisation"}, temperature: {en:"seasonal",fr:"saisonnière"} },
    hazards: [{en:"waterborne pathogens",fr:"pathogènes hydriques"}, {en:"harmful algal blooms",fr:"efflorescences algales nuisibles"}, {en:"biofilm in distribution pipes",fr:"biofilm dans les canalisations de distribution"}],
    relatedWorlds: ["water-safety", "marine", "environmental"]
  },
  {
    id: "marine",
    icon: "🌊",
    name: { en: "Marine World", fr: "Monde Marin", ar: "العالم البحري" },
    description: {
      en: "Ocean surface, water column and sediment habitats, home to the majority of Earth's microbial biomass and central to global biogeochemical cycles.",
      fr: "Habitats de surface, de la colonne d'eau et des sédiments océaniques, abritant l'essentiel de la biomasse microbienne terrestre et centraux aux cycles biogéochimiques.",
      ar: "موائل سطح المحيط وعمود الماء والرواسب، موطن لمعظم الكتلة الحيوية الميكروبية على الأرض ومحورية في الدورات الجيوكيميائية الحيوية العالمية."
    },
    envParams: { salinity: {en:"high",fr:"élevée"}, pressureGradient: {en:"variable with depth",fr:"variable avec la profondeur"}, nutrientAvailability: {en:"generally low",fr:"généralement faible"} },
    hazards: [{en:"biofouling",fr:"biofouling"}, {en:"vibrio-associated shellfish risk",fr:"risque lié à Vibrio dans les coquillages"}],
    relatedWorlds: ["freshwater", "environmental", "biotechnology"]
  },
  {
    id: "pharmaceutical",
    icon: "💊",
    name: { en: "Pharmaceutical World", fr: "Monde Pharmaceutique", ar: "العالم الصيدلاني" },
    description: {
      en: "Cleanrooms and controlled manufacturing environments where microbial contamination control is a regulated, quantified discipline.",
      fr: "Salles blanches et environnements de fabrication contrôlés où la maîtrise de la contamination microbienne est une discipline réglementée et quantifiée.",
      ar: "الغرف النظيفة وبيئات التصنيع الخاضعة للرقابة حيث تُعد مكافحة التلوث الميكروبي تخصصاً منظماً وقابلاً للقياس."
    },
    envParams: { cleanroomClass: {en:"ISO-graded",fr:"classée ISO"}, humanTraffic: {en:"restricted",fr:"restreinte"}, monitoring: {en:"continuous",fr:"continue"} },
    hazards: [{en:"objectionable organisms in non-sterile product",fr:"organismes indésirables dans un produit non stérile"}, {en:"sterility assurance failure",fr:"échec de l'assurance de stérilité"}],
    relatedWorlds: ["cleanroom", "hospital", "industrial"]
  },
  {
    id: "fermentation",
    icon: "🫙",
    name: { en: "Fermentation World", fr: "Monde de la Fermentation", ar: "عالم التخمير" },
    description: {
      en: "Controlled microbial metabolism harnessed deliberately, from dairy cultures to brewing, where the same organisms that spoil food elsewhere are put to work.",
      fr: "Le métabolisme microbien maîtrisé et exploité délibérément, des cultures laitières au brassage, où les mêmes organismes qui altèrent ailleurs sont mis au travail.",
      ar: "استغلال متعمّد للأيض الميكروبي المُتحكَّم فيه، من مزارع الألبان إلى التخمير، حيث تُستثمر نفس الكائنات التي تُفسد الطعام في أماكن أخرى."
    },
    envParams: { temperature: {en:"controlled",fr:"contrôlée"}, pH: {en:"actively managed",fr:"gérée activement"}, competitionDesign: {en:"starter-culture dominance",fr:"dominance de la culture starter"} },
    hazards: [{en:"contaminating wild yeast/bacteria",fr:"levures/bactéries sauvages contaminantes"}, {en:"off-flavor spoilage organisms",fr:"organismes d'altération générant des goûts anormaux"}],
    relatedWorlds: ["food", "biotechnology", "industrial"]
  },
  {
    id: "human-microbiome",
    icon: "🧑‍🔬",
    name: { en: "Human Microbiome World", fr: "Monde du Microbiote Humain", ar: "عالم الميكروبيوم البشري" },
    description: {
      en: "The vast resident microbial communities of skin, gut, oral cavity and other body sites, in dynamic balance with the host.",
      fr: "Les vastes communautés microbiennes résidentes de la peau, de l'intestin, de la cavité buccale et d'autres sites corporels, en équilibre dynamique avec l'hôte.",
      ar: "المجتمعات الميكروبية المقيمة الواسعة في الجلد والأمعاء والفم ومواقع أخرى من الجسم، في توازن ديناميكي مع المضيف."
    },
    envParams: { hostImmuneModulation: {en:"constant",fr:"constant"}, nutrientSource: {en:"host-derived",fr:"dérivée de l'hôte"}, interSpeciesCompetition: {en:"intense",fr:"intense"} },
    hazards: [{en:"dysbiosis",fr:"dysbiose"}, {en:"opportunistic overgrowth",fr:"prolifération opportuniste"}],
    relatedWorlds: ["oral", "skin", "hospital"]
  },
  {
    id: "industrial",
    icon: "⚙️",
    name: { en: "Industrial Microbiology World", fr: "Monde de la Microbiologie Industrielle", ar: "عالم الأحياء الدقيقة الصناعية" },
    description: {
      en: "Bioreactors, cooling towers and manufacturing utilities, where microbial activity is either engineered output or an unwanted process fault.",
      fr: "Bioréacteurs, tours de refroidissement et utilités industrielles, où l'activité microbienne est soit un produit voulu, soit un défaut de procédé indésirable.",
      ar: "المفاعلات الحيوية وأبراج التبريد ومرافق التصنيع، حيث يكون النشاط الميكروبي إما ناتجاً مصمّماً هندسياً أو عيباً غير مرغوب فيه في العملية."
    },
    envParams: { scale: {en:"industrial",fr:"industrielle"}, processControl: {en:"engineered",fr:"conçue techniquement"}, biofoulingRisk: {en:"significant",fr:"significatif"} },
    hazards: [{en:"biofouling of equipment",fr:"biofouling des équipements"}, {en:"microbially influenced corrosion",fr:"corrosion induite par les micro-organismes"}],
    relatedWorlds: ["fermentation", "biotechnology", "wastewater"]
  },
  {
    id: "extreme-environment",
    icon: "🌋",
    name: { en: "Extreme Environment World", fr: "Monde des Environnements Extrêmes", ar: "عالم البيئات القصوى" },
    description: {
      en: "Hydrothermal vents, hypersaline lakes, polar ice and acidic springs, home to extremophiles that redefine the known limits of life.",
      fr: "Sources hydrothermales, lacs hypersalins, glace polaire et sources acides, abritant des extrêmophiles qui redéfinissent les limites connues de la vie.",
      ar: "الفتحات الحرارية المائية والبحيرات فرطة الملوحة والجليد القطبي والينابيع الحمضية، موطن للكائنات المتطرفة التي تعيد تعريف حدود الحياة المعروفة."
    },
    envParams: { temperature: {en:"extreme (hot or cold)",fr:"extrême (chaude ou froide)"}, pH: {en:"extreme",fr:"extrême"}, pressure: {en:"variable",fr:"variable"} },
    hazards: [{en:"none directly human-relevant, primarily research interest",fr:"aucun directement pertinent pour l'humain, intérêt principalement scientifique"}],
    relatedWorlds: ["marine", "environmental", "biotechnology"]
  },
  {
    id: "oral",
    icon: "🦷",
    name: { en: "Oral Microbiology World", fr: "Monde de la Microbiologie Orale", ar: "عالم أحياء الفم الدقيقة" },
    description: {
      en: "The tooth surface, gingival crevice and mucosa, where structured biofilm communities form some of the best-studied biofilms in biology.",
      fr: "La surface dentaire, le sillon gingival et la muqueuse, où des communautés de biofilm structurées forment certains des biofilms les mieux étudiés en biologie.",
      ar: "سطح الأسنان والشق اللثوي والغشاء المخاطي، حيث تُشكّل مجتمعات الأغشية الحيوية المنظمة بعضاً من أفضل الأغشية الحيوية المدروسة في علم الأحياء."
    },
    envParams: { surfaceType: {en:"tooth enamel / mucosa",fr:"émail dentaire / muqueuse"}, nutrientSource: {en:"diet-derived",fr:"dérivée de l'alimentation"}, biofilmMaturity: {en:"highly structured",fr:"hautement structurée"} },
    hazards: [{en:"dental plaque biofilm",fr:"biofilm de la plaque dentaire"}, {en:"acid-driven demineralization",fr:"déminéralisation induite par l'acide"}],
    relatedWorlds: ["human-microbiome", "hospital"]
  },
  {
    id: "forensic",
    icon: "🕵️",
    name: { en: "Forensic Microbiology World", fr: "Monde de la Microbiologie Légale", ar: "عالم الأحياء الدقيقة الشرعية" },
    description: {
      en: "The reconstruction of contamination events and microbial evidence trails, applying microbiological reasoning to investigative questions.",
      fr: "La reconstruction d'événements de contamination et des traces microbiennes, appliquant le raisonnement microbiologique à des questions d'investigation.",
      ar: "إعادة بناء أحداث التلوث ومسارات الأدلة الميكروبية، بتطبيق المنطق الميكروبيولوجي على أسئلة التحقيق."
    },
    envParams: { evidenceType: {en:"microbial trace / contact record",fr:"trace microbienne / registre de contact"}, timeSensitivity: {en:"high",fr:"élevée"} },
    hazards: [{en:"contamination during evidence handling",fr:"contamination lors de la manipulation des preuves"}],
    relatedWorlds: ["hospital", "food", "epidemiology"]
  }
];
