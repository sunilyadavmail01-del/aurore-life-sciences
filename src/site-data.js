// Asset paths are kept relative so browser-side rendering works without an
// origin. The build script (scripts/generate-api-pages.mjs) wraps them with
// baseUrl when emitting absolute URLs into JSON-LD and OG/Twitter image meta.
export const logoUrl = "/images/aurore_life_sciences_logo_vector_transparent.svg";
export const facilityOne = "/images/jeedimetla.jpg";
export const facilityTwo = "/images/kazhipally.jpg";
export const rndImage = "/images/rnd-lab.jpg";

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "products", label: "APIs" },
  { id: "cdmo", label: "CDMO Services" },
  { id: "peptides", label: "Peptides" }
];

export const utilityNavItems = [
  { id: "insights", label: "Insights" },
  { id: "contact", label: "Contact" },
  { id: "careers", label: "Careers" }
];

export const metrics = [
  ["60+", "Commercial APIs"],
  ["122+", "DMFs filed"],
  ["70+", "Countries served"],
  ["~890 KL", "Reactor capacity"],
  ["10", "Doctorates"]
];

export const approvals = [
  "USFDA",
  "EDQM",
  "WHO-Geneva",
  "TGA",
  "KFDA",
  "ANVISA",
  "COFEPRIS",
  "CDSCO"
];

const rawProducts = [
  {
    name: "Acyclovir",
    category: "Antiviral",
    filings: "CEP/EDMF, TDMF, USDMF",
    capacity: "200 MT annually",
    summary: "Aurore positions Acyclovir as a large-scale antiviral API supported by filings suited for regulated-market supplier evaluation.",
    casNumber: "59277-89-3",
    formula: "C8H11N5O3",
    dosageForms: "Tablets, capsules, and formulation development support",
    marketFocus: "US, EU, and other regulated export markets",
    highlights: [
      "Established antiviral API with global filing support",
      "Commercial-scale annual capacity for strategic supply discussions",
      "Suitable for RFQ, sample request, and qualification workflows"
    ]
  },
  {
    name: "Amlodipine",
    category: "Anti-Hypertensive",
    filings: "CEP/EDMF, MFDS, NMPA, Russia DMF, TPD Canada, USDMF",
    capacity: "280 MT annually",
    summary: "Amlodipine is presented as a high-volume cardiovascular API with broad filing coverage across key global markets.",
    casNumber: "88150-42-9",
    formula: "C20H25ClN2O5",
    dosageForms: "Oral solid dosage development and commercial supply",
    marketFocus: "North America, Europe, APAC, CIS, and Canada",
    highlights: [
      "Broad international filing footprint",
      "Strong annual capacity suited to long-term supply programs",
      "Fit for regulated market procurement conversations"
    ]
  },
  {
    name: "Bilastine",
    category: "Anti Histamine",
    filings: "ASMF, USDMF",
    capacity: "50 MT annually",
    summary: "Bilastine expands the allergy portfolio with filing-backed commercial capability for regulated-market buyers.",
    casNumber: "202189-78-4",
    formula: "C28H37N3O3",
    dosageForms: "Oral dosage support",
    marketFocus: "US and selected regulated export markets",
    highlights: [
      "ASMF and USDMF backed positioning",
      "Commercial capacity suitable for launch and lifecycle planning",
      "Relevant for anti-allergy sourcing programs"
    ]
  },
  {
    name: "Celecoxib",
    category: "Anti-inflammatory",
    filings: "Brazil DMF, CEP/EDMF, MFDS, USDMF",
    capacity: "162 MT annually",
    summary: "Celecoxib is framed as a large-scale anti-inflammatory API with multi-market filing depth and reliable annual capacity.",
    casNumber: "169590-42-5",
    formula: "C17H14F3N3O2S",
    dosageForms: "Oral solid dosage support",
    marketFocus: "US, EU, Brazil, Korea, and regulated exports",
    highlights: [
      "Broad filing package for regulated procurement",
      "High annual output for continuity planning",
      "Useful for strategic anti-inflammatory portfolio coverage"
    ]
  },
  {
    name: "Clozapine",
    category: "Anti-psychotic",
    filings: "CEP/EDMF, Russia DMF, TPD Canada, USDMF",
    capacity: "70 MT annually",
    summary: "Clozapine supports CNS portfolio sourcing with multiple export filings and commercial manufacturing readiness.",
    casNumber: "5786-21-0",
    formula: "C18H19ClN4",
    dosageForms: "Oral solid dosage support",
    marketFocus: "US, EU, Canada, and CIS",
    highlights: [
      "CNS API with regulated filing support",
      "Suitable for qualification and secondary-source planning",
      "Commercial-scale output for recurring supply"
    ]
  },
  {
    name: "Dabigatran Etexilate Mesilate",
    category: "Anti-Coagulant",
    filings: "CEP/EDMF, USDMF",
    capacity: "35 MT annually",
    summary: "Dabigatran Etexilate Mesilate adds a high-value anti-coagulant option with regulated filing support and commercial capacity.",
    casNumber: "872728-81-9",
    formula: "C34H41N7O5.CH4O3S",
    dosageForms: "Oral dosage support",
    marketFocus: "US and EU-focused regulated markets",
    highlights: [
      "Regulated market filing profile",
      "High-value cardiovascular therapy relevance",
      "RFQ-ready commercial capacity discussion"
    ]
  },
  {
    name: "Dapagliflozin",
    category: "Anti-Diabetic",
    filings: "Ready to be filed in key markets",
    capacity: "40 MT annually",
    summary: "Dapagliflozin is positioned for forward-looking anti-diabetic programs where buyers need scale and filing readiness.",
    casNumber: "461432-26-8",
    formula: "C21H25ClO6",
    dosageForms: "Oral solid dosage support",
    marketFocus: "Regulated and semi-regulated diabetes markets",
    highlights: [
      "Commercial anti-diabetic portfolio expansion",
      "Built for future filing activation in key markets",
      "Useful for early sourcing and launch planning"
    ]
  },
  {
    name: "Darunavir",
    category: "Protease Inhibitor",
    filings: "Ready to be filed in key markets",
    capacity: "10 MT annually",
    summary: "Darunavir supports anti-retroviral sourcing with readiness for key-market filing pathways and focused annual capacity.",
    casNumber: "206361-99-1",
    formula: "C27H37N3O7S",
    dosageForms: "ARV formulation support",
    marketFocus: "Global anti-retroviral procurement programs",
    highlights: [
      "ARV portfolio relevance",
      "Commercial positioning with filing-readiness messaging",
      "Appropriate for targeted program qualification"
    ]
  },
  {
    name: "Desvenlafaxine Succinate",
    category: "Anti-depressant",
    filings: "Brazil DMF, MFDS, USDMF",
    capacity: "96 MT annually",
    summary: "Desvenlafaxine Succinate strengthens the CNS portfolio with filing support across major regulated and semi-regulated markets.",
    casNumber: "386750-22-7",
    formula: "C16H25NO2.C4H6O4",
    dosageForms: "Oral solid dosage support",
    marketFocus: "US, Brazil, Korea, and export programs",
    highlights: [
      "Established antidepressant API profile",
      "Multi-market filing footprint",
      "Commercial annual output for recurring sourcing"
    ]
  },
  {
    name: "Dolutegravir Sodium",
    category: "Anti-Retroviral",
    filings: "WHO DMF",
    capacity: "30 MT annually",
    summary: "Dolutegravir Sodium is tailored for anti-retroviral sourcing programs, especially buyers aligned with WHO-supported pathways.",
    casNumber: "1051375-19-9",
    formula: "C20H18F2N3NaO5",
    dosageForms: "ARV dosage support",
    marketFocus: "WHO-centric and emerging-market ARV programs",
    highlights: [
      "WHO DMF-backed positioning",
      "Relevant to public-health and ARV procurement channels",
      "Commercial-scale annual output"
    ]
  },
  {
    name: "Dronedarone",
    category: "Anti-Arrhythmic",
    filings: "ASMF, CEP/EDMF, Israel, MFDS, NMPA, USDMF",
    capacity: "50 MT annually",
    summary: "Dronedarone brings broad international filing depth to a specialized anti-arrhythmic category.",
    casNumber: "141626-36-0",
    formula: "C31H44N2O5S",
    dosageForms: "Oral solid dosage support",
    marketFocus: "US, EU, China, Korea, Israel, and export programs",
    highlights: [
      "Wide filing coverage across major geographies",
      "Cardiovascular specialty API positioning",
      "Commercial output suited for qualification and expansion"
    ]
  },
  {
    name: "Empagliflozin",
    category: "Anti-Diabetic",
    filings: "Commercial",
    capacity: "20 MT annually",
    summary: "Empagliflozin contributes to a diabetes-focused API lineup with commercial readiness and procurement-friendly presentation.",
    casNumber: "864070-44-0",
    formula: "C23H27ClO7",
    dosageForms: "Oral solid dosage support",
    marketFocus: "Global diabetes therapy sourcing",
    highlights: [
      "Commercial anti-diabetic API positioning",
      "Suitable for early-stage vendor review",
      "Useful in SGLT2 portfolio conversations"
    ]
  },
  {
    name: "Etoricoxib",
    category: "Anti-inflammatory",
    filings: "ASMF, Egypt DMF, Malaysia DMF, NMPA, Pharmacy and Poison Board",
    capacity: "90 MT annually",
    summary: "Etoricoxib extends anti-inflammatory coverage with multi-region filings and steady commercial output.",
    casNumber: "202409-33-4",
    formula: "C18H15ClN2O2S",
    dosageForms: "Oral solid dosage support",
    marketFocus: "Asia, Africa, Middle East, and selected regulated markets",
    highlights: [
      "Regional filing diversity",
      "Strong annual output for program continuity",
      "Corrected Pharmacy and Poison Board naming for Kenya"
    ]
  },
  {
    name: "Favipiravir",
    category: "Antiviral",
    filings: "Indonesia MOH, Malaysia DMF, USDMF, Vietnam",
    capacity: "50 MT annually",
    summary: "Favipiravir is framed for antiviral sourcing opportunities across Asia and regulated export programs.",
    casNumber: "259793-96-9",
    formula: "C5H4FN3O2",
    dosageForms: "Oral antiviral formulations",
    marketFocus: "Southeast Asia and global export opportunities",
    highlights: [
      "Regionally diversified filing profile",
      "Commercial antiviral capacity",
      "Useful for pandemic-response and antiviral portfolio coverage"
    ]
  },
  {
    name: "Flecainide Acetate",
    category: "Anti-Arrhythmic",
    filings: "CEP/EDMF",
    capacity: "50 MT annually",
    summary: "Flecainide Acetate offers focused filing support and commercial scale within the anti-arrhythmic category.",
    casNumber: "54143-56-5",
    formula: "C17H20F6N2O3",
    dosageForms: "Oral solid dosage support",
    marketFocus: "EU and export-focused cardiovascular sourcing",
    highlights: [
      "CEP/EDMF-supported positioning",
      "Specialty cardiovascular sourcing relevance",
      "Commercial capacity for recurring supply"
    ]
  },
  {
    name: "Levetiracetam",
    category: "Anti-Epileptic",
    filings: "CEP/EDMF, USDMF",
    capacity: "200 MT annually",
    summary: "Levetiracetam is one of the larger-scale CNS APIs in the portfolio, suitable for high-volume regulated supply discussions.",
    casNumber: "102767-28-2",
    formula: "C8H14N2O2",
    dosageForms: "Oral solid dosage and neuro portfolio support",
    marketFocus: "US, EU, and broad export markets",
    highlights: [
      "Large annual capacity",
      "Regulated filings across major markets",
      "Strong fit for primary and secondary-source planning"
    ]
  },
  {
    name: "Levothyroxine Sodium",
    category: "Hormones",
    filings: "CEP/EDMF, Iran DMF, NMPA, USDMF",
    capacity: "500 KG annually",
    summary: "Levothyroxine Sodium adds a hormone API with tighter-volume specialty manufacturing and regulated filing support.",
    casNumber: "25416-65-3",
    formula: "C15H10I4NNaO4",
    dosageForms: "Hormone formulation support",
    marketFocus: "US, EU, China, and specialty exports",
    highlights: [
      "Specialty hormone API positioning",
      "Regulated and semi-regulated filing footprint",
      "Appropriate for precision, low-volume sourcing"
    ]
  },
  {
    name: "Linagliptin",
    category: "Anti-Diabetic",
    filings: "Commercial",
    capacity: "28 MT annually",
    summary: "Linagliptin contributes to the anti-diabetic platform with commercial readiness for screening and RFQ workflows.",
    casNumber: "668270-12-0",
    formula: "C25H28N8O2",
    dosageForms: "Oral diabetic dosage support",
    marketFocus: "Global diabetes therapy sourcing",
    highlights: [
      "Commercial anti-diabetic portfolio extension",
      "Relevant for DPP-4 inhibitor sourcing",
      "Suitable for forward qualification discussions"
    ]
  },
  {
    name: "Molnupiravir",
    category: "Antiviral",
    filings: "Ghana FDA, Indonesia MOH, Malaysia DMF, WHO DMF",
    capacity: "5 MT annually",
    summary: "Molnupiravir is positioned as a focused antiviral API with regional and WHO-aligned filing coverage.",
    casNumber: "2349386-89-4",
    formula: "C13H19N3O7",
    dosageForms: "Oral antiviral dosage support",
    marketFocus: "WHO-linked and regional antiviral procurement",
    highlights: [
      "WHO and regional filing profile",
      "Corrected Indonesia authority naming",
      "Targeted annual capacity for specialized programs"
    ]
  },
  {
    name: "Nafamostat",
    category: "Serine protease inhibitor",
    filings: "MFDS, NMPA, USDMF",
    capacity: "2 MT annually",
    summary: "Nafamostat adds a specialized high-value API with targeted filing support and focused output.",
    casNumber: "81525-10-2",
    formula: "C19H17N5O2.2CH4O3S",
    dosageForms: "Specialty formulation support",
    marketFocus: "US and Asian regulated markets",
    highlights: [
      "Specialty API with focused regulated filings",
      "Low-volume, higher-complexity sourcing profile",
      "Useful for differentiated procurement programs"
    ]
  },
  {
    name: "Raltegravir",
    category: "Anti-Retroviral",
    filings: "Commercial",
    capacity: "5 MT annually",
    summary: "Raltegravir supports targeted anti-retroviral sourcing conversations with commercial positioning and specialty output.",
    casNumber: "518048-05-0",
    formula: "C20H21FN6O5",
    dosageForms: "ARV formulation support",
    marketFocus: "ARV procurement and export programs",
    highlights: [
      "Commercial ARV category presence",
      "Focused annual output for specialty sourcing",
      "Appropriate for qualification-led programs"
    ]
  },
  {
    name: "Remdesivir",
    category: "Antiviral",
    filings: "Commercial",
    capacity: "1 MT annually",
    summary: "Remdesivir is presented as a specialized antiviral API with limited-volume commercial capability.",
    casNumber: "1809249-37-3",
    formula: "C27H35N6O8P",
    dosageForms: "Injectable and specialty antiviral support",
    marketFocus: "Targeted institutional and specialty programs",
    highlights: [
      "Specialty antiviral sourcing relevance",
      "Low-volume commercial availability",
      "Useful in strategic therapeutic discussions"
    ]
  },
  {
    name: "Sacubitril",
    category: "ARNI",
    filings: "Commercial",
    capacity: "150 MT annually",
    summary: "Sacubitril strengthens the cardiovascular portfolio with strong annual output for commercial supply planning.",
    casNumber: "149709-62-6",
    formula: "C24H29NO5",
    dosageForms: "Cardiovascular dosage support",
    marketFocus: "Global cardiovascular sourcing programs",
    highlights: [
      "High-volume ARNI ingredient positioning",
      "Commercial annual capacity",
      "Suitable for large-scale qualification programs"
    ]
  },
  {
    name: "Sodium Cromoglycate",
    category: "Anti-Allergic / Anti-Asthma",
    filings: "CEP/EDMF",
    capacity: "100 MT annually",
    summary: "Sodium Cromoglycate adds a respiratory and anti-allergy API with meaningful capacity and filing-backed credibility.",
    casNumber: "15826-37-6",
    formula: "C23H14Na2O11",
    dosageForms: "Respiratory and anti-allergy dosage support",
    marketFocus: "EU-led and export programs",
    highlights: [
      "CEP/EDMF supported positioning",
      "Good annual output for respiratory sourcing",
      "Appropriate for tender and commercial screening"
    ]
  },
  {
    name: "Tafamidis",
    category: "Transthyretin Stabilizer",
    filings: "USDMF",
    capacity: "1.8 MT annually",
    summary: "Tafamidis is a specialty cardiovascular API with targeted regulated-market filing support and focused output.",
    casNumber: "594839-88-0",
    formula: "C14H7Cl2NO3",
    dosageForms: "Specialty rare-disease dosage support",
    marketFocus: "US-led specialty market programs",
    highlights: [
      "Specialty orphan/rare-disease relevance",
      "USDMF-backed positioning",
      "Focused output for strategic sourcing"
    ]
  },
  {
    name: "Valacyclovir HCL",
    category: "Antiviral",
    filings: "Brazil DMF, CEP/EDMF, Iran DMF, Singapore DMF, TGA DMF, USDMF",
    capacity: "50 MT annually",
    summary: "Valacyclovir HCL is one of the stronger examples for an individually indexable page because it combines broad filing depth with meaningful commercial capacity.",
    casNumber: "124832-27-5",
    formula: "C13H21N6O4Cl",
    dosageForms: "Oral antiviral dosage support",
    marketFocus: "US, EU, APAC, LATAM, and regulated exports",
    highlights: [
      "Broad filing coverage across major export markets",
      "Commercial antiviral capacity suited for long-term planning",
      "Strong candidate for SEO-oriented molecule landing pages"
    ]
  }
];

const mechanismMap = {
  Antiviral: "Nucleoside and antiviral process chemistry for regulated-market supply programs.",
  "Anti-Hypertensive": "Cardiovascular API used in blood-pressure management portfolios.",
  "Anti Histamine": "Allergy-focused API for respiratory and antihistamine formulation programs.",
  "Anti-inflammatory": "Anti-inflammatory API chemistry aligned to pain and inflammation portfolios.",
  "Anti-psychotic": "Central nervous system API relevant to psychiatric and neuro portfolios.",
  "Anti-Coagulant": "Anticoagulant API for thrombosis and cardiovascular treatment portfolios.",
  "Anti-Diabetic": "Metabolic and diabetes portfolio API supporting oral solid dosage programs.",
  "Protease Inhibitor": "Protease-inhibitor API aligned to antiviral and anti-retroviral treatment programs.",
  "Anti-depressant": "CNS API chemistry for antidepressant and neuropsychiatric sourcing programs.",
  "Anti-Retroviral": "API supporting anti-retroviral therapy programs and global public-health supply.",
  "Anti-Arrhythmic": "Cardiovascular rhythm-management API suited to regulated commercial supply.",
  Hormones: "Hormone API requiring precision manufacturing and specialty regulatory discipline.",
  "Serine protease inhibitor": "Specialty API for complex, lower-volume regulated-market procurement.",
  ARNI: "Cardiovascular API used in heart-failure and related portfolio programs.",
  "Anti-Allergic / Anti-Asthma": "Respiratory and allergy API for inhalation and oral therapy portfolios.",
  "Transthyretin Stabilizer": "Specialty rare-disease API supporting focused global commercial programs."
};

const facilityByCategory = {
  Antiviral: "kazhipally",
  "Anti-Hypertensive": "jeedimetla",
  "Anti Histamine": "jeedimetla",
  "Anti-inflammatory": "kazhipally",
  "Anti-psychotic": "jeedimetla",
  "Anti-Coagulant": "kazhipally",
  "Anti-Diabetic": "kazhipally",
  "Protease Inhibitor": "kazhipally",
  "Anti-depressant": "jeedimetla",
  "Anti-Retroviral": "kazhipally",
  "Anti-Arrhythmic": "jeedimetla",
  Hormones: "jeedimetla",
  "Serine protease inhibitor": "kazhipally",
  ARNI: "kazhipally",
  "Anti-Allergic / Anti-Asthma": "jeedimetla",
  "Transthyretin Stabilizer": "kazhipally"
};

const geographyMap = {
  USDMF: "United States",
  "CEP/EDMF": "Europe",
  WHO: "WHO-linked markets",
  KFDA: "South Korea",
  MFDS: "South Korea",
  COFEPRIS: "Mexico",
  TGA: "Australia",
  ANVISA: "Brazil",
  Brazil: "Brazil",
  NMPA: "China",
  Canada: "Canada",
  Iran: "Middle East",
  Singapore: "Southeast Asia",
  Malaysia: "Southeast Asia",
  Indonesia: "Southeast Asia",
  Ghana: "Africa",
  Vietnam: "Vietnam",
  Egypt: "Middle East & Africa",
  Israel: "Israel",
  Russia: "CIS"
};

export const products = rawProducts.map((product) => ({
  ...product,
  slug: slugify(product.name),
  mechanism: mechanismMap[product.category] || "Specialty API positioned for regulated-market manufacturing partnerships.",
  dmfStatus: product.filings,
  backwardIntegrated: product.name === "Valacyclovir HCL" ? "Yes - backward integrated from in-house Acyclovir route" : "Selected route and intermediate integration available on request",
  polymorph: product.name.includes("Tafamidis") ? "Specific form and solid-state controls available during technical discussion" : "Polymorph and form controls available on request",
  scaleRange: product.capacity,
  manufacturingFacility: facilityByCategory[product.category] || "jeedimetla",
  regulatoryGeographies: Object.entries(geographyMap)
    .filter(([token]) => product.filings.includes(token))
    .map(([, geography]) => geography),
  relatedCategories: rawProducts
    .filter((candidate) => candidate.category === product.category && candidate.name !== product.name)
    .slice(0, 3)
    .map((candidate) => candidate.name)
}));

const rawIntermediates = [
  [1, "Acotiamide", "Ethyl 2-aminothiazole-4-carboxylate", "5398-36-7"],
  [2, "Amisulpride", "4-Amino-5-(ethylsulfonyl)-2-methoxybenzoic acid", "71675-87-1"],
  [3, "Amlodipine besylate", "2-[(2-Aminoethoxy)methyl]-4-(2-chlorophenyl)-3-ethoxycarbonyl-5-methoxycarbonyl-6-methyl-1,4-dihydropyridine (Amlodipine Base)", "88150-62-3"],
  [4, "Amlodipine besylate", "4-(2-Chlorophenyl)-2-[[2-(1,3-dihydro-1,3-dioxo-2H-isoindol-2-yl)ethoxy]methyl]-1,4-dihydro-6-methyl-3,5-pyridinedicarboxylic acid 3-ethyl 5-methyl ester (Phthaloyl amlodipine)", "88150-42-9"],
  [5, "Bilastine", "Methyl 2-(4-(2-chloroethyl)phenyl)-2-methylpropanoate", "1181267-33-3"],
  [6, "Bilastine", "1-(2-Ethoxyethyl)-2-(piperidin-4-yl)-1H-benzo[d]imidazole hydrochloride sesquihydrate", "1841081-72-8"],
  [7, "Celecoxib", "4-Sulphanamido phenyl hydrazine hydrochloride (4-SAPH)", "17852-52-7"],
  [8, "Celecoxib", "1-(4-Methylphenyl)-4,4,4-trifluoro-butane-1,3-dione", "720-94-5"],
  [9, "Clozapine", "8-Chloro-5,10-dihydro-11H-dibenzo[b,e][1,4]diazepin-11-one", "50892-62-1"],
  [10, "Clozapine", "2-(2-Amino-4-chlorophenylamino)benzoic acid", "67990-66-3"],
  [11, "Dabigatran", "Ethyl 3-[3-amino-4-(methylamino)-N-(2-pyridyl)benzamido]propionate", "2126144-72-5"],
  [12, "Dabigatran", "Hexyl N-[(4-aminophenyl)iminomethyl]carbamate hydrochloride", "212322-56-0"],
  [13, "Dabigatran", "N-(4-Cyanophenyl)glycine", "1307233-93-7"],
  [14, "Dabigatran", "Dabigatran ethyl ester", "429658-95-7"],
  [15, "Dapagliflozin", "5-Bromo-2-chlorobenzoic acid", "21739-92-4"],
  [16, "Dapagliflozin", "(5-Bromo-2-chlorophenyl)(4-ethoxyphenyl)methanone", "461432-22-4"],
  [17, "Dapagliflozin", "4-Bromo-1-chloro-2-(4-ethoxybenzyl)benzene", "461432-23-5"],
  [18, "Dapagliflozin", "(2R,3R,4R,5S,6S)-2-(acetoxymethyl)-6-(4-chloro-3-(4-ethoxybenzyl)phenyl)tetrahydro-2H-pyran-3,4,5-triyl triacetate (Dapa Acetate)", "461432-25-7"],
  [19, "Dapagliflozin & Empagliflozin", "(3R,4S,5R,6R)-3,4,5-tris((trimethylsilyl)oxy)-6-(((trimethylsilyl)oxy)methyl)tetrahydro-2H-pyran-2-one", "32384-65-9"],
  [20, "Darunavir", "4-Amino-N-((2R,3S)-3-amino-2-hydroxy-4-phenylbutyl)-N-isobutylbenzenesulfonamide", "169280-56-2"],
  [21, "Darunavir", "tert-Butyl ((2R,3R)-4-(4-acetamido-N-isobutylphenylsulfonamido)-3-hydroxy-1-phenylbutan-2-yl)carbamate", "2126144-72-5"],
  [22, "Dolutegravir Sodium", "(4R,12aS)-7-Methoxy-4-methyl-6,8-dioxo-3,4,6,8,12,12a-hexahydro-2H-pyrido[1',2':4,5]pyrazino[2,1-b][1,3]oxazine-9-carboxylic acid", "1335210-34-8"],
  [23, "Dolutegravir Sodium", "(4S,12aR)-N-[(2,4-Difluorophenyl)methyl]-3,4,6,8,12,12a-hexahydro-7-methoxy-4-methyl-6,8-dioxo-2H-pyrido[1',2':4,5]pyrazino[2,1-b][1,3]oxazine-9-carboxamide", "1335210-35-9"],
  [24, "Dolutegravir Sodium", "(4R,12aS)-9-((2,4-difluorobenzyl)carbamoyl)-4-methyl-6,8-dioxo-3,4,6,8,12,12a-hexahydro-2H-pyrido[1,2,4,5]pyrazino[2,1-b][1,3]oxazin-7-olate / Dolutegravir free base", "1051375-16-6"],
  [25, "Dronedarone", "(4-(3-(dibutylamino)propoxy)phenyl)(2-butyl-5-nitrobenzofuran-3-yl)methanone", "141645-23-0"],
  [26, "Dronedarone", "(2-Butyl-5-nitrobenzofuran-3-yl)(4-hydroxyphenyl)methanone", "141645-16-1"],
  [27, "Empagliflozin", "(S)-3-(4-(5-bromo-2-chlorobenzyl)phenoxy)tetrahydrofuran", "915095-89-5"],
  [28, "Empagliflozin", "(S)-(+)-3-hydroxy-tetrahydrofuran", "86087-23-2"],
  [29, "Empagliflozin", "(5-Bromo-2-chlorophenyl)-(4-fluorophenyl)methanone", "915095-85-1"],
  [30, "Empagliflozin", "(2,3,4,6-Tetra-O-acetyl-1-C-(4-chloro-3-{4-[(3S)-tetrahydrofuran-3-yloxy]benzyl}benzene base)-beta-D-glucopyranose (Empa Acetate)", "915095-99-7"],
  [31, "Empagliflozin", "(3S)-3-[4-[(2-Chloro-5-iodophenyl)methyl]phenoxy]tetrahydrofuran (Empa Iodo)", "915095-94-2"],
  [32, "Levothyroxine Sodium", "3,5-Diiodo-L-thyronine", "1041-01-6"],
  [33, "Levothyroxine Sodium", "3,5-Diiodo-L-tyrosine dihydrate", "18835-59-1"],
  [34, "Linagliptin", "8-Bromo-7-(but-2-yn-1-yl)-3-methyl-3,7-dihydro-1H-purine-2,6-dione", "666816-98-4"],
  [35, "Linagliptin", "8-Bromo-7-(but-2-yn-1-yl)-3-methyl-1-((4-methyl quinazolin-2-yl)methyl)-3,7-dihydro-1H-purine-2,6-dione", "853029-57-9"],
  [36, "Linagliptin", "Tert-butyl N-[(3R)-piperidin-3-yl]carbamate", "309956-78-3"],
  [37, "Linagliptin", "Tert-butyl N-[(3R)-1-[7-but-2-ynyl-3-methyl-1-[(4-methylquinazolin-2-yl)methyl]-2,6-dioxopurin-8-yl]piperidin-3-yl]carbamate (Boc-Linagliptin)", "668273-75-4"],
  [38, "Loratadine", "8-Chloro-11-[(N-methyl)-4-piperidylidene]-6,11-dihydro-5H-benzo[5,6]cyclohepta[1,2-b]pyridine (Methyl Loratadine)", "38092-89-6"],
  [39, "Marbofloxacin", "6,7,8-Trifluoro-1-(formylmethylamino)-4-oxo-1,4-dihydroquinoline-3-carboxylic acid ethyl ester", "100276-65-1"],
  [40, "Nafamostat mesylate", "4-Guanidino benzoic acid hydrochloride (PGBA)", "42823-46-1"],
  [41, "Nafamostat mesylate", "6-Amidino-2-naphthol methane sulfonate (NFT-III)", "82957-06-0"],
  [42, "Olopatadine", "2-(11-Oxo-6,11-dihydrodibenzo[b,e]oxepin-2-yl)acetic acid (Keto Acid)", "55453-87-7"],
  [43, "Olopatadine", "3-Chloro-N,N-dimethylpropan-1-amine", "109-54-6"],
  [44, "Palbociclib", "Tert-butyl 4-(6-aminopyridin-3-yl)piperazine-1-carboxylate", "571189-16-7"],
  [45, "Palbociclib", "2-Chloro-8-cyclopentyl-5-methylpyrido[2,3-d]pyrimidin-7(8H)-one", "1013916-37-4"],
  [46, "Pinaverium Bromide", "2-Bromo-4,5-dimethoxy benzyl bromide", "53207-00-4"],
  [47, "Pinaverium Bromide", "2-(2-(6,6-dimethylbicyclo[3.1.1]heptan-2-yl)ethoxy)ethyl)morpholine", "38284-47-8"],
  [48, "Pitavastatin", "tert-Butyl (4R-cis)-6-formaldehyde-2,2-dimethyl-1,3-dioxane-4-acetate (FDDA)", "124752-23-4"],
  [49, "Prazosin Hydrochloride", "1-(2-Furoyl)piperazine", "40172-95-0"],
  [50, "Raloxifene Hydrochloride", "Methyl 4-(2-(piperidin-1-yl)ethoxy)benzoate", "89407-97-6"],
  [51, "Raloxifene Hydrochloride", "4-(2-Piperidinoethoxy)benzoic acid hydrochloride", "84449-80-9"],
  [52, "Ramelteon", "Diethyl cyanomethylphosphonate", "2537-48-6"],
  [53, "Ramelteon", "(1,6,7,8-Tetrahydro-2H-indeno-[5,4-b]furan-8-ylidene)-acetonitrile", "196597-79-2"],
  [54, "Ramelteon", "2-((S)-2,6,7,8-tetrahydro-1H-indeno[5,4-b]furan-8-yl)ethanamine-ibuprofen salt", "NA"],
  [55, "Rebamipide", "2-Amino-3-(1,2-dihydro-2-oxoquinoline-4-yl)propanoic acid", "132210-24-3"],
  [56, "Rebamipide", "Diethylacetamido malonate", "1068-90-2"],
  [57, "Rebamipide", "4-Bromomethyl 2,2-dihydroquinoline-2-one", "1087239"],
  [58, "Risperidone", "6-Fluoro-3-(4-piperidinyl)-1,2-benzisoxazole hydrochloride (RS1)", "84163-13-3"],
  [59, "Risperidone", "3-(2-Chloroethyl)-2-methyl-6,7,8,9-tetrahydro-4H-pyrido-(1,2-a)pyridine-4-one hydrochloride (RS2)", "93076-03-0"],
  [60, "Risperidone", "2,4-Difluorophenyl-(4-piperidinyl)methanone oxime hydrochloride", "135634-18-3"],
  [61, "Sacubitril Valsartan", "N-[(1R)-2-[1,1'-Biphenyl]-4-yl-1-(hydroxymethyl)ethyl]carbamic acid 1,1-dimethylethyl ester", "149690-05-1"],
  [62, "Sacubitril Valsartan", "(2R,4S)-2-Methyl-4-[(2-methylpropan-2-yl)oxycarbonylamino]-5-(4-phenylphenyl)pentanoic acid", "1426129-50-1"],
  [63, "Sacubitril Valsartan", "(2R,4S)-4-[(3-Carboxy-1-oxopropyl)amino]-4-[(p-phenylphenyl)methyl]-2-methylbutanoic acid ethyl ester (Sacubitril)", "1012341-50-2"],
  [64, "Sacubitril Valsartan", "Sodium 4-[[(2S,4R)-5-ethoxy-4-methyl-5-oxo-1-(4-phenylphenyl)pentan-2-yl]amino]-4-oxobutanoate (Sacubitril sodium salt)", "149709-62-6"],
  [65, "Sitagliptin", "(3R)-3-amino-1-[3-(trifluoromethyl)-6,8-dihydro-5H-[1,2,4]triazolo[4,3-a]pyrazin-7-yl]-4-(2,4,5-trifluorophenyl)butan-1-one (Sitagliptin Base)", "132210-24-3"],
  [66, "Sitagliptin", "3-(Trifluoromethyl)-5,6,7,8-tetrahydrotriazolopyrazine hydrochloride (SIP-III)", "1068-90-2"],
  [67, "Sitagliptin", "1-[3-(Trifluoromethyl)-5,6-dihydro-[1,2,4]triazolo[4,3-a]pyrazine-7(8H)-yl]-4-(2,4,5-trifluorophenyl)butane-1,3-dione (SIF-I)", "1087239"],
  [68, "Sodium Cromoglycate", "2,6-Dihydroxyacetophenone", "84163-13-3"],
  [69, "Sulindac", "2-(5-Fluoro-2-methyl-1H-inden-3-yl)acetic acid (SDC-III)", "32004-67-4"],
  [70, "Sulindac", "6-Fluoro-2,3-dihydro-2-methylinden-1-one (SDC-I)", "32004-66-3"],
  [71, "Sulindac", "2-(4-Fluorobenzyl)propanoic acid (FBPA-II)", "37794-19-7"],
  [72, "Sulindac", "2-((1Z)-1-(4-(methylthio)benzylidene)-5-fluoro-2-methyl-1H-inden-3-yl)acetic acid (SDC-IV)", "NA"],
  [73, "Sulindac", "3-(4-Fluorophenyl)-2-methylacrylic acid (FBPA-I)", "22138-72-3"],
  [74, "Tafamidis", "4-(3,5-Dichlorobenzamido)-3-hydroxybenzoic acid", "1184581-58-5"],
  [75, "Tafamidis", "2-(3,5-Dichlorophenyl)-1,3-benzoxazole-6-carboxylic acid (Tafamidis Tech)", "594839-88-0"],
  [76, "Tegoprazan", "4-Hydroxy-N,N,2-trimethyl-1-tosyl-1H-benzo[d]imidazole-6-carboxamide", "942195-86-0"],
  [77, "Tegoprazan", "(R)-5,7-Difluorochroman-ol", "1270294-05-7"],
  [78, "Tofacitinib citrate", "4-Chloro-7H-pyrrolo[2,3-d]pyrimidine", "3680-69-1"],
  [79, "Tofacitinib citrate", "2,4-Dichloro-7H-pyrrolo[2,3-d]pyrimidine", "90213-66-4"],
  [80, "Tofacitinib citrate", "(3R,4R)-1-Benzyl-N,4-dimethylpiperidin-3-amine dihydrochloride", "1062580-52-2"],
  [81, "Tofacitinib citrate", "bis-(3R,4R)-(1-benzyl-4-methyl-piperidine-3-yl)-methylamine di-p-toluoyl-L-tartaric acid", "477600-71-8"],
  [82, "Tolvaptan", "7-Chloro-3,4-dihydro-1H-benzo[b]azepin-5(2H)-one", "160129-45-3"],
  [83, "Tolvaptan", "7-Chloro-1-(2-methyl-4-nitrobenzoyl)-3,4-dihydro-1H-benzo[b]azepin-5(2H)-one", "137982-91-3"],
  [84, "Tolvaptan", "1-(4-Amino-2-methylbenzoyl)-7-chloro-3,4-dihydro-1H-benzo[b]azepin-5(2H)-one", "137977-97-0"],
  [85, "Tolvaptan", "O-Toluyl chloride / 2-methylbenzoyl chloride", "933-88-0"],
  [86, "Valaciclovir Hcl", "(2S)-2-((2-amino-6-oxo-1H-purin-9(6H)-yl)methoxy)-3-hydroxypropyl-2-(((benzyloxy)carbonyl)amino)-3-methylbutanoate", "124832-31-1"],
  [87, "Valganciclovir Hcl", "2-Amino-9-[[2-hydroxy-1-(hydroxymethyl)ethoxy]methyl]-1,9-dihydro-6H-purin-6-one / Ganciclovir", "82410-32-0"],
  [88, "Valganciclovir Hcl", "[2-[(2-amino-6-oxo-3H-purin-9-yl)methoxy]-3-hydroxypropyl] acetate / Monoacetyl ganciclovir", "88110-89-8"],
  [89, "Valganciclovir Hcl", "2-Benzyloxy carbonylamino-3-methylbutyric acid 2-(2-amino-6-oxo-1,6-dihydro-purin-9-yl methoxy)-3-acetoxy-propyl ester", "194159-22-3"],
  [90, "Valganciclovir Hcl", "2-Benzyloxy carbonylamino-3-methylbutyric acid 2-(2-amino-6-oxo-1,6-dihydro-purin-9-yl methoxy)-3-hydroxy-propyl ester", "194154-40-0"],
  [91, "Vildagliptin", "(S)-1-(2-Chloroacetyl)pyrrolidine-2-carbonitrile", "207557-35-5"],
  [92, "Voriconazole", "4-Chloro-6-ethyl-5-fluoropyrimidine", "137234-74-3"],
  [93, "Edoxaban", "tert-Butyl [(1R,2S,5S)-2-[[2-[(5-chloropyridin-2-yl)amino]-2-oxoacetyl]amino]-5-(dimethylaminocarbonyl)cyclohexyl]carbamate (Edoxaban)", "480452-36-6"],
  [94, "Edoxaban", "N1-(5-Chloropyridin-2-yl)-N2-((1S,2R,4R)-4-(dimethylcarbamoyl)-2-(5-methyl-4,5,6,7-tetrahydrothiazolo[5,4-c]pyridine-2-carboxamido)cyclohexyl) oxalamide (Edoxaban Base)", "1255529-26-0"],
  [95, "Etoricoxib", "1-(6-Methylpyridin-3-yl)-2-(4-(methylsulfonyl)phenyl)ethanone (Etoricoxib Ketosulfone)", "221615-75-4"],
  [96, "Etoricoxib", "2-Chloro-1,3-bis(dimethylamino)trimethinium hexafluorophosphate (Etoricoxib sodium hexafluorophosphate)", "291756-75-8"],
  [97, "Fesoterodine fumarate", "2-[3-[di(propan-2-yl)amino]-1-phenylpropyl]-4-(hydroxymethyl)phenol", "200801-70-3"],
  [98, "Fesoterodine fumarate", "2-Oxo-4-phenyl-3,4-dihydrochromene-6-carboxylic acid", "356782-33-7"],
  [99, "Fesoterodine fumarate", "Methyl 2-oxo-4-phenyl-3,4-dihydrochromen-6-carboxylate", "380636-42-0"],
  [100, "Fesoterodine fumarate", "6-(Hydroxymethyl)-4-phenyl-3,4-dihydro-2H-chromen-2-ol", "959624-24-9"],
  [101, "Fimasartan", "2-(2-Butyl-4-methyl-6-oxo-1-[[4-[2-(1-trityltetrazol-5-yl)phenyl]phenyl]methyl]pyrimidin-5-yl)-N,N-dimethylacetamide", "503155-67-7"],
  [102, "Flecainide Acetate", "2,5-Bis(trifluoroethoxy)benzoic acid", "35480-52-5"],
  [103, "Flecainide Acetate", "N-(Piperidin-2-ylmethyl)-2,5-bis(2,2,2-trifluoroethoxy)benzamide (Flecainide Base)", "54143-55-4"],
  [104, "Ganciclovir", "1,3-Dichloro-2-(methoxymethoxy)propane", "70905-45-2"],
  [105, "Ganciclovir", "1,3-Diacetoxy-2-(acetoxymethoxy)propane", "86357-13-3"],
  [106, "Ganciclovir", "1,3-Diacetoxy-2-(methoxymethoxy)propane", "103824-51-7"],
  [107, "Zaltoprofen", "5-(1-Carboxyethyl)-2-(phenylthio)phenylacetic acid", "83237-49-4"]
];

export const intermediates = rawIntermediates.map(([sourceNumber, apiName, chemicalName, casNumber]) => ({
  sourceNumber,
  apiName,
  chemicalName,
  casNumber,
  slug: `${slugify(apiName)}-${sourceNumber}`
}));

export const intermediateFamilies = Object.values(
  intermediates.reduce((families, intermediate) => {
    const slug = slugify(intermediate.apiName);
    if (!families[slug]) {
      families[slug] = {
        slug,
        apiName: intermediate.apiName,
        intermediates: []
      };
    }
    families[slug].intermediates.push(intermediate);
    return families;
  }, {})
).map((family) => ({
  ...family,
  summary: `${family.intermediates.length} PDF-listed intermediate${family.intermediates.length === 1 ? "" : "s"} associated with ${family.apiName} manufacturing and sourcing workflows.`
}));

export const therapeuticAreas = ["All categories", ...new Set(products.map((item) => item.category))];

export const facilities = [
  {
    slug: "jeedimetla",
    name: "Jeedimetla",
    label: "The Epicenter of Innovation",
    capacity: "~450 KL",
    auditHistory: ["USFDA readiness program maintained", "EDQM-aligned quality systems", "Quarterly compliance review rhythm"],
    certifications: ["USFDA", "EDQM", "WHO-Geneva", "COFEPRIS", "KFDA"],
    focus: "Process validation, commercial API supply, and established molecule scale-up",
    image: facilityOne,
    narrative: "Jeedimetla anchors mature commercial API programs with multi-block manufacturing, clean-room capability, and an audit-ready operating cadence for regulated buyers."
  },
  {
    slug: "kazhipally",
    name: "Kazhipally",
    label: "Pioneering Excellence",
    capacity: "~440 KL",
    auditHistory: ["Greenfield scale-up and compliance expansion", "Integrated quality and EHS reviews", "Commercial transfer and route optimization support"],
    certifications: ["USFDA", "EDQM", "WHO-Geneva", "COFEPRIS", "KFDA"],
    focus: "Large-scale antiviral, anti-diabetic, and anti-retroviral programs with expansion headroom",
    image: facilityTwo,
    narrative: "Kazhipally is positioned as the expansion engine for higher-volume, future-facing commercial programs with strong alignment to Aurore's scale and integration story."
  }
];

export const scientists = [
  { slug: "process-chemistry-lead", name: "Process Chemistry Lead", role: "Scientific leadership profile", expertise: "Antiviral route scouting and backward-integration strategy", qualification: "Doctoral profile available through business development review" },
  { slug: "analytical-sciences-lead", name: "Analytical Sciences Lead", role: "Scientific leadership profile", expertise: "Impurity profiling, method validation, and stability analytics", qualification: "Doctoral profile available through business development review" },
  { slug: "regulatory-sciences-lead", name: "Regulatory Sciences Lead", role: "Scientific leadership profile", expertise: "USDMF, CEP, and market-specific documentation workflows", qualification: "Doctoral profile available through business development review" },
  { slug: "antiviral-platform-lead", name: "Antiviral Platform Lead", role: "Scientific leadership profile", expertise: "Antiviral scale-up and technology transfer", qualification: "Doctoral profile available through business development review" },
  { slug: "cns-platform-lead", name: "CNS Platform Lead", role: "Scientific leadership profile", expertise: "CNS API route optimization and polymorph control", qualification: "Doctoral profile available through business development review" },
  { slug: "cardio-metabolic-lead", name: "Cardio-Metabolic Lead", role: "Scientific leadership profile", expertise: "Anti-diabetic and anti-hypertensive process development", qualification: "Doctoral profile available through business development review" },
  { slug: "scale-up-lead", name: "Scale-Up Lead", role: "Scientific leadership profile", expertise: "Lab-to-plant transfer and pilot-to-commercial readiness", qualification: "Doctoral profile available through business development review" },
  { slug: "quality-systems-lead", name: "Quality Systems Lead", role: "Scientific leadership profile", expertise: "Quality systems, audit readiness, and cross-site compliance", qualification: "Doctoral profile available through business development review" },
  { slug: "solid-state-lead", name: "Solid-State Lead", role: "Scientific leadership profile", expertise: "Polymorph, crystallization, and physical-form strategy", qualification: "Doctoral profile available through business development review" },
  { slug: "custom-synthesis-lead", name: "Custom Synthesis Lead", role: "Scientific leadership profile", expertise: "Route scouting, complex chemistry, and custom development projects", qualification: "Doctoral profile available through business development review" }
];

export const insights = [
  {
    slug: "controlling-impurity-profiles-in-antiviral-apis",
    title: "Controlling impurity profiles in antiviral APIs",
    excerpt: "How procurement, regulatory, and technical teams can evaluate antiviral API impurity control before a supplier enters qualification.",
    author: "Aurore Technical Editorial Team",
    category: "Regulatory insight",
    readingTime: "7 min read",
    relatedSlugs: ["acyclovir", "valacyclovir-hcl", "molnupiravir"],
    body: [
      {
        heading: "Why impurity control belongs in the first supplier conversation",
        paragraphs: [
          "Antiviral APIs often sit at the intersection of urgent demand, complex route chemistry, and strict market-specific expectations. A buyer may start with price, lead time, and filing availability, but the supplier decision becomes defensible only when the impurity strategy is clear enough for quality, regulatory, and formulation teams to trust.",
          "For products such as Acyclovir, Valacyclovir HCL, and Molnupiravir, impurity control is not a final certificate-of-analysis exercise. It starts with route selection, raw-material qualification, intermediate control, solvent strategy, analytical method design, and the discipline used when the process moves from validation batches into recurring commercial manufacture."
        ]
      },
      {
        heading: "Three signals that separate a robust antiviral API program",
        paragraphs: [
          "The first signal is route understanding. A strong supplier can explain where impurities are likely to arise, which process parameters influence them, and how those risks are controlled before release testing. This matters because late-stage testing can confirm a batch, but it cannot replace a route that was designed to be stable.",
          "The second signal is analytical maturity. Buyers should expect validated or validation-ready methods, known impurity references where relevant, and stability-indicating analytics that support both registration and lifecycle supply. When method capability is weak, every scale-up, site transfer, or formulation change becomes harder to defend.",
          "The third signal is documentation readiness. A regulated-market buyer needs more than a verbal assurance; the technical package should connect specifications, impurity limits, method validation, residual solvents, elemental impurities, and change-control pathways into one coherent review trail."
        ]
      },
      {
        heading: "How Aurore frames antiviral qualification",
        paragraphs: [
          "Aurore's antiviral portfolio is built for buyers who need commercial supply conversations to be tied to filing support and technical review. The strongest qualification path is usually to begin with the target market, the intended dosage form, the launch or continuity timeline, and the documents required by the buyer's regulatory team.",
          "That context allows the discussion to move quickly from a generic API enquiry to the practical questions that decide supplier readiness: which impurity risks matter for the molecule, what evidence is available now, what can be shared under the appropriate confidentiality route, and which plant or technical team should support the next review."
        ]
      }
    ],
    takeaways: [
      "Treat impurity control as a process capability, not only a release-test outcome.",
      "Ask for route, method, and documentation evidence before locking a supplier shortlist.",
      "Connect impurity review with target market, formulation plan, and filing strategy."
    ],
    cta: {
      title: "Review an antiviral API package",
      text: "Share the molecule, target market, and expected document set so Aurore can route the enquiry to regulatory and technical teams.",
      primaryLabel: "Request antiviral RFQ",
      primaryHref: "/#contact",
      secondaryLabel: "View antiviral portfolio",
      secondaryHref: "/therapy-areas/antiviral/"
    },
    internalLinks: [
      { label: "Regulatory dashboard", href: "/regulatory/" },
      { label: "Kazhipally manufacturing site", href: "/facilities/kazhipally/" },
      { label: "Connect with scientific leadership", href: "/scientists/" }
    ]
  },
  {
    slug: "usdmf-vs-cep-filing-strategy-for-global-api-launches",
    title: "USDMF vs CEP filing strategy for global API launches",
    excerpt: "A practical guide to choosing API suppliers by matching filing coverage with the market geography of a launch or second-source program.",
    author: "Aurore Regulatory Affairs Team",
    category: "Filing strategy",
    readingTime: "8 min read",
    relatedSlugs: ["amlodipine", "celecoxib", "levetiracetam"],
    body: [
      {
        heading: "The filing question is really a launch geography question",
        paragraphs: [
          "USDMF and CEP coverage are often discussed as if one filing is universally better than the other. In practice, the right API supplier profile depends on where the finished dosage program will be registered, how quickly the buyer needs to file, and whether the API is being qualified for a new launch, a transfer, or a supply-continuity strategy.",
          "A USDMF is central to United States submissions because it gives the finished-dosage applicant a recognized route for referencing confidential API information through the FDA process. A CEP, issued through EDQM, is especially useful in Europe and in markets that recognize or value CEP-backed evidence for pharmacopoeial compliance and API quality."
        ]
      },
      {
        heading: "How buyers should compare filing coverage",
        paragraphs: [
          "The first step is to map the intended market sequence. A program launching first in the United States should prioritize USDMF readiness, annual maintenance discipline, and the supplier's ability to support deficiency responses. A Europe-led or EU-parallel strategy should weigh CEP or EDMF alignment, pharmacopoeial positioning, and the documentation expectations of the marketing authorization pathway.",
          "The second step is to look beyond the headline filing. Mature suppliers often support the same API across multiple regions, but the practical value lies in whether the filing is current, whether the supplier can support customer authorization letters or technical documents promptly, and whether the quality package aligns with the buyer's internal regulatory calendar.",
          "The third step is to compare operational readiness with regulatory readiness. Filing coverage has limited commercial value if the supplier cannot support forecasted volume, validation timing, change notification, and quality agreements in parallel."
        ]
      },
      {
        heading: "Where multi-market APIs create an advantage",
        paragraphs: [
          "High-volume APIs such as Amlodipine, Celecoxib, and Levetiracetam show why filing breadth matters. A buyer may begin with one geography, but commercial teams often need optionality for additional markets, tenders, or lifecycle extensions. A supplier with a broader documentation footprint can reduce the friction of adding markets later.",
          "For the CTO presentation, this article also demonstrates the role an insights hub can play in the website architecture: regulatory education can link directly into product pages, therapy hubs, and the regulatory dashboard, turning a general buyer question into a guided qualification path."
        ]
      }
    ],
    takeaways: [
      "Start with launch geography before comparing USDMF, CEP, EDMF, or regional filings.",
      "Check filing currency, response support, and authorization workflows, not only filing names.",
      "Pair filing strategy with capacity, quality-system maturity, and change-control discipline."
    ],
    cta: {
      title: "Map filings to your launch plan",
      text: "Send the API, target markets, and registration timeline so Aurore can identify the most relevant filing and documentation route.",
      primaryLabel: "Request filing support",
      primaryHref: "/#contact",
      secondaryLabel: "Open regulatory dashboard",
      secondaryHref: "/regulatory/"
    },
    internalLinks: [
      { label: "North America market page", href: "/markets/north-america/" },
      { label: "Europe market page", href: "/markets/europe/" },
      { label: "API portfolio index", href: "/products/" }
    ]
  },
  {
    slug: "backward-integration-and-api-supply-resilience",
    title: "Backward integration and API supply resilience",
    excerpt: "Why route control, intermediate access, and site-level scale-up discipline matter when API buyers evaluate supply resilience.",
    author: "Aurore Process Development Team",
    category: "Supply strategy",
    readingTime: "7 min read",
    relatedSlugs: ["valacyclovir-hcl", "sacubitril", "dronedarone"],
    body: [
      {
        heading: "Resilience starts upstream of the final API step",
        paragraphs: [
          "For commercial API buyers, supply resilience is usually tested during pressure: demand spikes, raw-material disruption, route changes, quality events, freight delays, or a sudden need for a qualified second source. The most resilient suppliers are the ones with visibility and control upstream of the final API stage.",
          "Backward integration gives a supplier more command over critical intermediates, process economics, change control, and scheduling. It does not remove every external dependency, but it reduces the number of fragile handoffs that can delay a batch, complicate investigation, or weaken long-term cost control."
        ]
      },
      {
        heading: "What backward integration changes for procurement",
        paragraphs: [
          "A procurement team should evaluate backward integration as a technical and operational capability, not simply a claim. The useful questions are specific: which intermediates are controlled in-house, which steps remain externally sourced, how alternate sources are qualified, how route changes are documented, and how the supplier protects continuity across validation and commercial batches.",
          "This is especially important for APIs with strategic volume or specialty complexity. Valacyclovir HCL brings broad antiviral filing relevance, Sacubitril connects to high-volume cardiovascular supply planning, and Dronedarone demonstrates the need to coordinate specialty chemistry with multi-market regulatory expectations."
        ]
      },
      {
        heading: "How integrated capability supports lifecycle supply",
        paragraphs: [
          "The commercial benefit of route control is not limited to first supply. Integrated process understanding can support yield improvement, impurity control, alternate raw-material qualification, and faster technical response when customer requirements change. It also gives quality and regulatory teams a clearer basis for assessing impact when changes are proposed.",
          "Aurore's site network and intermediate architecture are positioned to make those discussions more concrete. A buyer can move from a product page into relevant intermediate families, facility pages, and the RFQ route, which makes the website behave like a qualification tool rather than a static brochure."
        ]
      }
    ],
    takeaways: [
      "Backward integration improves resilience when it is tied to route knowledge and quality systems.",
      "Intermediate control can reduce fragile handoffs in commercial API programs.",
      "Supply discussions should include change control, alternate sourcing, and scale-up evidence."
    ],
    cta: {
      title: "Discuss supply continuity",
      text: "Share forecast range, target markets, and continuity risks so Aurore can frame the right product, intermediate, and facility discussion.",
      primaryLabel: "Start supply review",
      primaryHref: "/#contact",
      secondaryLabel: "Browse intermediates",
      secondaryHref: "/intermediates/"
    },
    internalLinks: [
      { label: "Intermediate families", href: "/intermediates/" },
      { label: "Jeedimetla manufacturing site", href: "/facilities/jeedimetla/" },
      { label: "Kazhipally manufacturing site", href: "/facilities/kazhipally/" }
    ]
  }
];

export const therapyHubs = therapeuticAreas
  .filter((area) => area !== "All categories")
  .map((area) => ({
    slug: slugify(area),
    name: area,
    overview: `Aurore's ${area.toLowerCase()} portfolio combines regulatory-ready filings, commercial scale, and cross-links to relevant product pages, facilities, and insights.`,
    apiSlugs: products.filter((product) => product.category === area).map((product) => product.slug)
  }));

export const markets = [
  { slug: "north-america", name: "North America", overview: "US-focused filings, commercial APIs, and RFQ pathways for regulated-market procurement.", approvals: ["USDMF"], contact: "North America BD Desk" },
  { slug: "europe", name: "Europe", overview: "EU- and EDQM-oriented API supply positioning with CEP-linked product highlights.", approvals: ["EDQM", "CEP/EDMF"], contact: "Europe Market Desk" },
  { slug: "latin-america", name: "Latin America", overview: "Brazil, Mexico, and broader LATAM-oriented regulatory positioning for export-market API supply.", approvals: ["ANVISA", "COFEPRIS", "Brazil DMF"], contact: "LATAM Market Desk" },
  { slug: "japan-asia-pacific", name: "Japan & Asia Pacific", overview: "Asia-Pacific expansion narrative with KFDA, TGA, Southeast Asia, and future regional localization potential.", approvals: ["KFDA", "TGA", "Singapore DMF"], contact: "APAC Market Desk" },
  { slug: "africa-and-who-markets", name: "Africa & WHO Markets", overview: "WHO-linked market access, public-health supply relevance, and region-oriented API support.", approvals: ["WHO-Geneva", "Ghana FDA"], contact: "WHO Markets Desk" }
];

export const regulatoryDashboard = {
  dmfCount: "122+",
  cepCount: "22+",
  countries: "70+",
  capacity: "~890 KL",
  inspections: [
    "USFDA-aligned quality and inspection readiness maintained across API operations",
    "EDQM-oriented documentation and audit cadence embedded in the quality narrative",
    "COFEPRIS, KFDA, WHO-Geneva, and related export-market approvals highlighted for buyers"
  ]
};

export const capabilityFaqs = [
  {
    question: "What regulatory approvals does Aurore hold?",
    answer: "Aurore highlights approvals and market-facing readiness across USFDA, EDQM, WHO-Geneva, COFEPRIS, KFDA, TGA, and other export geographies depending on product."
  },
  {
    question: "Do you offer custom synthesis and CDMO support?",
    answer: "Yes. Aurore supports route scouting, process development, scale-up, pilot supply, regulatory support, and commercial transfer discussions."
  },
  {
    question: "How can a buyer request RFQ or technical documentation?",
    answer: "Use the Request RFQ forms embedded throughout the product, facility, and regulatory pages to route the enquiry to the relevant team."
  }
];

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function apiHref(slug) {
  return `/products/${slug}/`;
}

export function intermediateHref(slug) {
  return `/intermediates/${slug}/`;
}

export function findProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export function findIntermediateFamilyBySlug(slug) {
  return intermediateFamilies.find((family) => family.slug === slug);
}

export function findFacilityBySlug(slug) {
  return facilities.find((facility) => facility.slug === slug);
}

export function findTherapyHubBySlug(slug) {
  return therapyHubs.find((hub) => hub.slug === slug);
}

export function findInsightBySlug(slug) {
  return insights.find((insight) => insight.slug === slug);
}

export function findMarketBySlug(slug) {
  return markets.find((market) => market.slug === slug);
}
