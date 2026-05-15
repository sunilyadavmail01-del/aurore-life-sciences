import {
  apiHref,
  approvals,
  facilities,
  findProductBySlug,
  products,
  regulatoryDashboard,
  slugify
} from "../site-data.js";

export const portfolioSegments = [
  {
    id: "commercial",
    label: "Commercial APIs",
    shortLabel: "Commercial",
    description: "Market-facing molecules for regulated and growth-market sourcing conversations."
  },
  {
    id: "niche",
    label: "Niche APIs",
    shortLabel: "Niche",
    description: "Specialty opportunities where early engagement, samples, and technical fit matter."
  },
  {
    id: "validation",
    label: "APIs Under Validation",
    shortLabel: "Validation",
    description: "Programs moving through validation and documentation readiness."
  },
  {
    id: "scale-up",
    label: "Scale-up APIs",
    shortLabel: "Scale-up",
    description: "Active scale-up candidates for qualification, samples, and future commercial planning."
  },
  {
    id: "development",
    label: "Under Development APIs",
    shortLabel: "Development",
    description: "Pipeline molecules in development for strategic sourcing and early technical dialogue."
  }
];

const segmentById = new Map(portfolioSegments.map((segment) => [segment.id, segment]));

const existingProductByName = new Map(products.map((product) => [product.name.toLowerCase(), product]));

const productAliases = new Map([
  ["amlodipine besylate", "Amlodipine"],
  ["dabigatran etexilate mesylate", "Dabigatran Etexilate Mesilate"],
  ["dolutegravir sodium", "Dolutegravir Sodium"],
  ["levetiracetam form i / iv", "Levetiracetam"],
  ["levothyroxine sodium", "Levothyroxine Sodium"],
  ["nafamostat mesylate", "Nafamostat"],
  ["raloxifene hcl", "Raloxifene Hydrochloride"],
  ["sacubitril sodium & valsartan", "Sacubitril"],
  ["sodium cromoglycate", "Sodium Cromoglycate",
  ],
  ["valacyclovir hcl", "Valacyclovir HCL"],
  ["valacyclovir hcl hydrate", "Valacyclovir HCL"],
  ["valganciclovir", "Valganciclovir HCL"],
  ["tofacitinib citrate", "Tofacitinib Citrate"],
  ["pinaverium bromide", "Pinaverium Bromide"],
  ["fimasartan", "Fimasartan"],
  ["palbociclib", "Palbociclib"],
  ["zaltoprofen", "Zaltoprofen"]
]);

const commercialApis = [
  ["Acyclovir", "Antiviral", "*", "*", ""],
  ["Amlodipine Besylate", "Anti-Hypertensive", "*", "*", "Korea, China, RUS-CIS"],
  ["Aripiprazole", "Anti-psychotic drug", "", "*", ""],
  ["Bedaquiline", "Tuberculosis", "", "", "DMF Available"],
  ["Bilastine", "Anti-Histamine", "", "*", ""],
  ["Camostat", "Anti-inflammatory", "", "", "Korea"],
  ["Celecoxib", "Anti-inflammatory", "*", "*", "Korea, China & Japan"],
  ["Cloperastine Fendizoate / HCl", "Anti-Histamine", "", "", "Commercial"],
  ["Clozapine", "Anti-psychotic", "*", "*", "Canada"],
  ["Dabigatran Etexilate Mesylate", "Anti-coagulant", "*", "*", ""],
  ["Dapagliflozin", "Anti-Diabetic", "", "*", ""],
  ["Dolutegravir sodium", "Antiviral", "", "", "WHO GMP"],
  ["Dronedarone", "Cardiac Arrhythmias", "*", "*", "Korea, China"],
  ["Edoxaban Tosylate", "Anti-coagulant", "*", "*", "Turkey"],
  ["Eltrombopag Olamine", "Immuno-Suppressant", "*", "*", "Turkey"],
  ["Empagliflozin", "Anti-Diabetic", "", "", "DMF Ready to file"],
  ["Erdosteine", "Mucolytic", "", "*", "Korea"],
  ["Etoricoxib", "Anti-inflammatory", "", "*", "China, Brazil"],
  ["Fesoterodine", "Overactive bladder", "*", "*", ""],
  ["Fimasartan", "Anti-Hypertensive", "*", "", "Korea"],
  ["Flecainide Acetate", "Anti-arrhythmic", "", "*", ""],
  ["Fluphenazine HCL", "Anti-psychotic", "*", "", ""],
  ["Ganciclovir", "Antiviral", "", "", "DMF Ready to file"],
  ["Indomethacin", "Anti-inflammatory", "*", "", ""],
  ["Ivacaftor", "Cystic Fibrosis", "", "", "Under Validation"],
  ["Levetiracetam Form I / IV", "Anti-epileptic", "*", "*", "China"],
  ["Levothyroxine sodium", "Hypothyroidism", "*", "*", "China"],
  ["Linagliptin", "Anti-Diabetic", "", "", "DMF Available"],
  ["Marbofloxacin", "Veterinary medicine", "*", "*", ""],
  ["Nafamostat Mesylate", "Anti-coagulant", "*", "", "Korea, China"],
  ["Olopatadine", "Anti-Histamine", "", "", "Korea, Japan"],
  ["Oxcarbazepine", "Anti-convulsant", "*", "*", ""],
  ["Pinaverium Bromide", "IBS", "", "*", "China, Korea & Mexico"],
  ["Prazosin", "Cardiovascular Agent", "*", "*", "Campaign Molecule"],
  ["Raloxifene HCl", "Osteoporosis", "*", "*", "Korea, Japan"],
  ["Raltegravir", "Antiviral", "", "*", "Commercial"],
  ["Ramelteon", "Sedative", "*", "", ""],
  ["Rebamipide", "Anti-ulcerative", "", "", "Korea, Japan"],
  ["Risperidone", "Antipsychotic", "", "*", ""],
  ["Sacubitril Sodium & Valsartan", "Cardio", "", "", "Commercial Calcium; DMF Available"],
  ["Sodium Cromoglycate", "Anti-Asthma / Anti-Allergic", "", "*", "China"],
  ["Sulindac", "Anti-inflammatory", "*", "", "Mexico, China"],
  ["Tafamidis Free Acid", "Transthyretin", "*", "", "China Amyloidosis"],
  ["Tafamidis", "Cardio treatment", "*", "", "Meglumine"],
  ["Tenofovir Succinate", "Antiviral", "", "*", ""],
  ["Tofacitinib Citrate", "Rheumatoid Arthritis", "*", "*", "China"],
  ["Tolvaptan", "Congestive heart failure", "*", "*", "China"],
  ["Tolvaptan (Crystalline)", "Congestive heart failure", "*", "*", "Crystalline heart failure"],
  ["Valacyclovir HCl", "Antiviral", "*", "*", "Anhydrous"],
  ["Valacyclovir HCl Hydrate", "Antiviral", "*", "*", "China, Iran & Brazil"],
  ["Valganciclovir", "Antiviral", "*", "*", "China"],
  ["Verapamil HCl", "Antihypertensive", "*", "*", "China"],
  ["Vigabatrin", "Anti-epileptic", "", "", "Mexico"],
  ["Zaltoprofen", "Anti-Inflammatory", "", "", "Korea"]
];

const nicheApis = [
  ["Lumateperone Tosylate", "Anti-psychotic drug", "-", "-", "Samples Available"],
  ["Opicapone", "Antiparkinson", "-", "-", "Samples Available"]
];

const validationApis = [
  ["Pelubiprofen", "Anti-Inflammatory", "-", "-", "Samples Available"],
  ["Bedaquiline Fumarate", "Anti-mycobacterial", "-", "-", "Samples Available"],
  ["Ormeloxifene", "Under development", "-", "-", "-"],
  ["Mavacoxib", "Under development", "-", "-", "-"]
];

const scaleUpApis = [
  ["Bepotastine Besylate", "Anti-Histamine", "Scale-up", "", "Samples Available"],
  ["Ruxolitinib", "Myelofibrosis", "Scale-up", "", "Samples Available"],
  ["Carprofen", "Anti-Inflammatory", "Scale-up", "", "Samples Available"],
  ["Lumateperone Tosylate", "Anti-psychotic drug", "Scale-up", "", "Samples Available"]
];

const developmentApis = [
  ["Delamanid", "Tuberculosis"],
  ["Gemigliptin tartrate", "Anti-Diabetic"],
  ["Rifapentine", "Tuberculosis"],
  ["Palbociclib", "Oncology"],
  ["Pretomanid", "Tuberculosis"],
  ["Maribavir", "Antiviral"],
  ["Olaparib", "Oncology"],
  ["Trametinib", "Oncology"],
  ["Ribociclib", "Oncology"],
  ["Abiraterone", "Oncology"],
  ["Tucatinib", "Oncology"],
  ["Dabrafenib", "Oncology"],
  ["Iptacopan", "Complement inhibitor"],
  ["Fexuprazan", "Gastrointestinal"],
  ["Eplerenone", "Cardiovascular"],
  ["Elexacaftor", "Cystic Fibrosis"],
  ["Elafibranor", "Hepatic / metabolic"],
  ["Avacopan", "Immunology"]
].map(([name, category]) => [name, category, "", "", "Under development"]);

const rawApiProducts = [
  ...commercialApis.map((row) => [...row, "commercial"]),
  ...nicheApis.map((row) => [...row, "niche"]),
  ...validationApis.map((row) => [...row, "validation"]),
  ...scaleUpApis.map((row) => [...row, "scale-up"]),
  ...developmentApis.map((row) => [...row, "development"])
];

function normalizeName(name) {
  return name.toLowerCase().replace(/\bhcl\b/g, "hcl").replace(/\s+/g, " ").trim();
}

function existingProductFor(name) {
  const normalized = normalizeName(name);
  const alias = productAliases.get(normalized);
  if (alias) return existingProductByName.get(alias.toLowerCase()) || findProductBySlug(slugify(alias));
  return existingProductByName.get(normalized) || findProductBySlug(slugify(name));
}

function filingLabel(value) {
  if (!value || value === "-") return "On request";
  if (value === "*") return "Filed";
  return value;
}

function filingTokens(usdmf, cepEdmf) {
  const tokens = [];
  if (usdmf && usdmf !== "-") tokens.push(usdmf === "*" ? "USDMF" : usdmf);
  if (cepEdmf && cepEdmf !== "-") tokens.push(cepEdmf === "*" ? "CEP/EDMF" : cepEdmf);
  return tokens;
}

function statusFor(segmentId, usdmf, cepEdmf, others) {
  if (segmentId === "development") return "Under development";
  if (segmentId === "scale-up") return "Scale-up";
  if (segmentId === "validation") return "Under validation";
  if (segmentId === "niche") return "Samples available";
  const text = [usdmf, cepEdmf, others].join(" ").toLowerCase();
  if (text.includes("ready to file")) return "DMF ready to file";
  if (text.includes("dmf available")) return "DMF available";
  if (text.includes("under validation")) return "Under validation";
  return "Commercial";
}

function summaryFor(name, category, segment, status, existingProduct) {
  if (existingProduct?.summary) return existingProduct.summary;
  return `${name} is positioned in Aurore's ${segment.label.toLowerCase()} portfolio for ${category.toLowerCase()} sourcing, documentation review, and qualified RFQ discussion.`;
}

function marketFocusFor(segmentId, others, existingProduct) {
  if (others && others !== "-") return others;
  if (existingProduct?.marketFocus) return existingProduct.marketFocus;
  if (segmentId === "development") return "Early technical discussion and strategic sourcing watchlist";
  if (segmentId === "scale-up") return "Scale-up review, sample request, and future commercial planning";
  if (segmentId === "validation") return "Validation-stage documentation and qualification planning";
  if (segmentId === "niche") return "Specialty API samples and technical fit assessment";
  return "Commercial RFQ and regulated-market supplier qualification";
}

function keywordsFor(values) {
  return [
    ...new Set(
      values
        .flatMap((value) => String(value || "").split(/[\s,;/()&+-]+/))
        .map((value) => value.trim())
        .filter(Boolean)
    )
  ];
}

export const apiProducts = rawApiProducts.map(([name, therapeuticCategory, usdmf, cepEdmf, others, segmentId], index) => {
  const segment = segmentById.get(segmentId);
  const existingProduct = existingProductFor(name);
  const slug = existingProduct?.slug || slugify(name);
  const filings = filingTokens(usdmf, cepEdmf);
  const status = statusFor(segmentId, usdmf, cepEdmf, others);
  const searchValues = [name, therapeuticCategory, usdmf, cepEdmf, others, segment.label, status, existingProduct?.casNumber, existingProduct?.filings];

  return {
    id: `${segmentId}-${slug}-${index + 1}`,
    name,
    api: name,
    therapeuticCategory,
    category: therapeuticCategory,
    usdmf: filingLabel(usdmf),
    cepEdmf: filingLabel(cepEdmf),
    others: others && others !== "-" ? others : "Available on request",
    portfolioType: segment.label,
    portfolioTypeId: segmentId,
    portfolioShortLabel: segment.shortLabel,
    status,
    searchableKeywords: keywordsFor(searchValues),
    searchKeywords: keywordsFor(searchValues),
    type: "API",
    regulatoryRelevance: filings,
    filings: filings.length ? filings.join(", ") : "Available on request",
    capacity: existingProduct?.capacity || (segmentId === "development" ? "Program dependent" : "Available on request"),
    facility: existingProduct?.manufacturingFacility || "",
    href: existingProduct ? apiHref(existingProduct.slug) : `/#contact?product=${encodeURIComponent(name)}`,
    slug,
    casNo: existingProduct?.casNumber || "",
    summary: summaryFor(name, therapeuticCategory, segment, status, existingProduct),
    marketFocus: marketFocusFor(segmentId, others, existingProduct),
    regulatoryGeographies: existingProduct?.regulatoryGeographies || [],
    relatedIds: []
  };
});

export const portfolioProducts = apiProducts;

export const portfolioApprovals = approvals;

const categoryCounts = apiProducts.reduce((acc, item) => {
  acc[item.therapeuticCategory] = (acc[item.therapeuticCategory] || 0) + 1;
  return acc;
}, {});

const segmentCounts = apiProducts.reduce((acc, item) => {
  acc[item.portfolioTypeId] = (acc[item.portfolioTypeId] || 0) + 1;
  return acc;
}, {});

const statusCounts = apiProducts.reduce((acc, item) => {
  acc[item.status] = (acc[item.status] || 0) + 1;
  return acc;
}, {});

const filingCounts = apiProducts.reduce((acc, item) => {
  item.regulatoryRelevance.forEach((filing) => {
    acc[filing] = (acc[filing] || 0) + 1;
  });
  return acc;
}, {});

export const portfolioStats = {
  apiCount: apiProducts.length,
  commercialCount: segmentCounts.commercial || 0,
  pipelineCount: apiProducts.length - (segmentCounts.commercial || 0),
  validationCount: segmentCounts.validation || 0,
  developmentCount: segmentCounts.development || 0,
  approvalCount: approvals.length,
  countries: regulatoryDashboard.countries,
  capacity: regulatoryDashboard.capacity,
  categoryCount: Object.keys(categoryCounts).length
};

export const portfolioFilterOptions = {
  segments: [
    { value: "All portfolio segments", label: `All segments (${apiProducts.length})` },
    ...portfolioSegments.map((segment) => ({
      value: segment.id,
      label: `${segment.label} (${segmentCounts[segment.id] || 0})`
    }))
  ],
  categories: [
    { value: "All therapeutic categories", label: "All therapeutic categories" },
    ...Object.keys(categoryCounts).sort().map((cat) => ({
      value: cat,
      label: `${cat} (${categoryCounts[cat]})`
    }))
  ],
  statuses: [
    { value: "All development stages", label: "All development stages" },
    ...Object.keys(statusCounts).sort().map((status) => ({
      value: status,
      label: `${status} (${statusCounts[status]})`
    }))
  ],
  filings: [
    { value: "All filing profiles", label: "All filing profiles" },
    ...Object.keys(filingCounts).sort().map((filing) => ({
      value: filing,
      label: `${filing} (${filingCounts[filing]})`
    }))
  ],
  letters: ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")]
};

export function segmentSummary(segmentId) {
  return {
    ...segmentById.get(segmentId),
    count: segmentCounts[segmentId] || 0
  };
}

export function facilityLabel(facilitySlug) {
  if (!facilitySlug) return "Aurore manufacturing network";
  return facilities.find((facility) => facility.slug === facilitySlug)?.name || "Aurore manufacturing network";
}

export function filingValue(value) {
  return value && value !== "On request" ? value : "On request";
}

export function relatedPortfolioItems(selected) {
  if (!selected) return [];
  const sameCategory = apiProducts.filter(
    (item) => item.id !== selected.id && item.therapeuticCategory === selected.therapeuticCategory
  );
  const sameSegment = apiProducts.filter(
    (item) => item.id !== selected.id && item.portfolioTypeId === selected.portfolioTypeId
  );
  return [...sameCategory, ...sameSegment].filter((item, index, arr) => arr.findIndex((candidate) => candidate.id === item.id) === index).slice(0, 5);
}
