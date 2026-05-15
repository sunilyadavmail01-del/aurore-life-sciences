import {
  approvals,
  facilities,
  facilityOne,
  facilityTwo,
  insights,
  intermediateFamilies,
  products,
  regulatoryDashboard,
  rndImage
} from "../site-data.js";

const featuredApis = products.slice(0, 5).map((product) => product.name);
const featuredIntermediates = intermediateFamilies.slice(0, 4).map((family) => family.apiName);

export const resourceStats = {
  scale: [
    { value: "122+", label: "DMFs and regulatory filings" },
    { value: "70+", label: "countries supplied" },
    { value: "~890 KL", label: "combined reactor capacity" },
    { value: "2", label: "cGMP manufacturing sites" }
  ],
  quality: [
    { value: "24/7", label: "quality oversight mindset" },
    { value: "QA/QC", label: "integrated release systems" },
    { value: "GMP", label: "regulated manufacturing framework" },
    { value: "ALCOA+", label: "data integrity controls" }
  ],
  partnership: [
    { value: "API", label: "commercial supply" },
    { value: "CDMO", label: "development and scale-up" },
    { value: "DMF", label: "registration support" },
    { value: "QoS", label: "technical documentation" }
  ]
};

export const downloads = [
  {
    title: "API and intermediates portfolio",
    type: "Product brochure",
    description: "Commercial API and intermediate portfolio summary for sourcing, molecule screening, and technical shortlist creation.",
    meta: "Portfolio PDF",
    cta: "Request portfolio"
  },
  {
    title: "Corporate capabilities overview",
    type: "Company deck",
    description: "Enterprise overview covering Aurore's manufacturing footprint, regulatory reach, R&D model, and global supply posture.",
    meta: "Capability deck",
    cta: "Request deck"
  },
  {
    title: "Facility and manufacturing summary",
    type: "Site overview",
    description: "Manufacturing infrastructure summary for Jeedimetla and Kazhipally, including capacity, compliance, and technology fit.",
    meta: "Facility PDF",
    cta: "Request overview"
  },
  {
    title: "Regulatory documentation checklist",
    type: "Buyer support",
    description: "Structured guide for DMF access, samples, COA, MSDS, technical packs, audit readiness, and procurement qualification.",
    meta: "Checklist",
    cta: "Request checklist"
  },
  {
    title: "CDMO collaboration brief",
    type: "Technical brief",
    description: "Process development, route scouting, scale-up, impurity control, analytical method support, and lifecycle manufacturing fit.",
    meta: "CDMO PDF",
    cta: "Request brief"
  }
];

export const insightTopics = [
  {
    title: "API supply chain reliability in regulated markets",
    category: "Supply resilience",
    description: "How backward integration, qualified alternatives, and documentation discipline reduce supply risk for global buyers.",
    href: "/insights/backward-integration-and-api-supply-resilience/"
  },
  {
    title: "USDMF vs CEP strategy for global launches",
    category: "Regulatory strategy",
    description: "A practical framework for aligning filing pathways with market sequence, customer access letters, and lifecycle changes.",
    href: "/insights/usdmf-vs-cep-filing-strategy-for-global-api-launches/"
  },
  {
    title: "Impurity control in antiviral API programs",
    category: "Analytical science",
    description: "Technical considerations for route control, method transfer, specification design, and documentation readiness.",
    href: "/insights/controlling-impurity-profiles-in-antiviral-apis/"
  },
  {
    title: "CNS API market growth and supplier qualification",
    category: "Molecule spotlight",
    description: "Commercial and technical signals procurement teams should review when qualifying CNS API sources.",
    href: "/products/"
  },
  {
    title: "Peptide and complex chemistry readiness",
    category: "Manufacturing trends",
    description: "Why specialized process controls and analytical depth matter as portfolios shift toward higher-complexity molecules.",
    href: "/#peptides"
  }
];

export const globalRegions = [
  {
    name: "North America",
    markets: "United States and Canada",
    focus: "USDMF-backed API programs, customer authorization support, and regulated-market documentation.",
    approvals: ["USFDA", "TPD Canada", "USDMF"]
  },
  {
    name: "Europe",
    markets: "EU and UK-linked procurement channels",
    focus: "CEP, EDMF, ASMF, and technical documentation alignment for European registration pathways.",
    approvals: ["EDQM", "CEP", "EDMF", "ASMF"]
  },
  {
    name: "Latin America",
    markets: "Brazil, Mexico, and regional partners",
    focus: "Regional filings, customer qualification packs, and supply continuity for expanding branded and generic programs.",
    approvals: ["ANVISA", "COFEPRIS", "Regional DMFs"]
  },
  {
    name: "Asia Pacific",
    markets: "Korea, Australia, China, India, and APAC partners",
    focus: "Regulatory files, site support, and commercial API supply for growth and regulated APAC markets.",
    approvals: ["KFDA", "TGA", "NMPA", "CDSCO"]
  },
  {
    name: "Global health channels",
    markets: "WHO-aligned and emerging-market programs",
    focus: "Public-health relevant molecules, ARV programs, and documentation support for multinational procurement.",
    approvals: ["WHO-Geneva", "WHO DMF", "Quality packs"]
  }
];

export const regulatoryTimeline = [
  {
    step: "01",
    title: "Molecule and market strategy",
    body: "Align the API, target market, filing pathway, technical pack, and customer documentation needs before a sourcing decision is made."
  },
  {
    step: "02",
    title: "DMF, CEP, EDMF, or ASMF support",
    body: "Prepare and maintain registration documentation, quality modules, customer authorization letters, and lifecycle updates."
  },
  {
    step: "03",
    title: "Inspection and audit readiness",
    body: "Support customer audits, regulatory inspections, CAPA discipline, data integrity review, and evidence-backed quality responses."
  },
  {
    step: "04",
    title: "Post-approval lifecycle",
    body: "Manage change controls, ongoing compliance communication, technical query responses, and long-term supply continuity."
  }
];

const sharedCta = {
  eyebrow: "Commercial and technical enquiry",
  title: "Move from portfolio discovery to a qualified supplier conversation.",
  body: "Share molecule, market, quantity, timeline, and documentation needs so Aurore can route the request to commercial, regulatory, and technical specialists.",
  primary: { label: "Request RFQ", href: "/contact/#rfq" },
  secondary: { label: "Explore API portfolio", href: "/products/" }
};

export const resourcePages = {
  quality: {
    nav: "quality",
    label: "Quality",
    eyebrow: "Quality and GMP systems",
    title: "Quality systems for regulated-market API manufacturing.",
    description:
      "Aurore's quality model connects GMP manufacturing discipline, analytical infrastructure, documentation control, and audit readiness for global pharmaceutical customers.",
    image: facilityOne,
    stats: resourceStats.quality,
    intro: {
      eyebrow: "Quality philosophy",
      title: "Built for evidence, consistency, and customer confidence.",
      body:
        "Quality is treated as an operating system across process development, manufacturing, QC release, documentation, supplier control, and regulatory response. The goal is not only batch release, but reliable, reviewable evidence for procurement, technical, and regulatory stakeholders."
    },
    pillars: [
      {
        title: "GMP manufacturing systems",
        body: "Controlled batch execution, validated equipment practices, deviation handling, CAPA, change control, cleaning discipline, and production documentation designed for regulated-market expectations."
      },
      {
        title: "QA/QC and analytical infrastructure",
        body: "Integrated quality assurance and quality control workflows support method validation, impurity profile review, stability programs, COA generation, and release documentation."
      },
      {
        title: "Compliance documentation",
        body: "Technical packs, MSDS, specifications, audit responses, regulatory query support, and customer-specific documentation are prepared for supplier qualification workflows."
      },
      {
        title: "Audit readiness",
        body: "Quality systems are organized around inspection readiness, data integrity, document traceability, and timely response to customer and agency observations."
      }
    ],
    bands: [
      {
        title: "Analytical and release capability",
        body: "Aurore's quality platform supports API release through analytical method control, impurity characterization, stability monitoring, and documentation review across commercial and development-stage molecules.",
        links: [
          { label: "Review regulatory readiness", href: "/regulatory/" },
          { label: "Talk to quality team", href: "/contact/#rfq" }
        ]
      }
    ],
    proof: [
      "GMP-aligned batch manufacturing and quality review",
      "Analytical method validation and transfer support",
      "COA, MSDS, specification, and technical pack support",
      "Customer audit and regulatory inspection response discipline"
    ],
    cta: sharedCta
  },
  regulatory: {
    nav: "regulatory",
    label: "Regulatory",
    eyebrow: "Regulated-market API partner",
    title: "Regulatory support for global API registrations.",
    description:
      "Aurore supports global pharmaceutical customers with DMFs, CEP/EDMF/ASMF pathways, customer authorization support, inspection readiness, and lifecycle documentation.",
    image: rndImage,
    stats: [
      { value: "122+", label: "DMFs and global filings" },
      { value: approvals.length, label: "approval and agency pathways" },
      { value: "USDMF", label: "regulated-market support" },
      { value: "CEP/EDMF", label: "European documentation pathways" }
    ],
    intro: {
      eyebrow: "Regulatory strategy",
      title: "Documentation depth for qualification, registration, and lifecycle control.",
      body:
        "For API buyers, regulatory support is inseparable from supply reliability. Aurore's regulatory operating model is built around filing readiness, customer access letters, agency query support, and disciplined change communication."
    },
    timeline: regulatoryTimeline,
    pillars: [
      {
        title: "DMF capabilities",
        body: "USDMF, WHO DMF, regional DMF, customer authorization, annual maintenance, and product-specific regulatory documentation support."
      },
      {
        title: "CEP, EDMF, and ASMF support",
        body: "European registration pathways supported through structured documentation, quality modules, and technical query response."
      },
      {
        title: "Inspection readiness",
        body: "Cross-functional preparation for customer audits and agency inspections, including quality records, CAPA evidence, and change histories."
      },
      {
        title: "Global approvals footprint",
        body: `Relevant pathways include ${approvals.join(", ")} and market-specific filing support for global procurement programs.`
      }
    ],
    dashboard: regulatoryDashboard,
    proof: [
      "122+ DMFs and global filings across Aurore's portfolio",
      "Regulatory documentation for regulated and emerging markets",
      "Customer access letter and technical query support",
      "Lifecycle management for post-approval changes"
    ],
    cta: sharedCta
  },
  insights: {
    nav: "insights",
    label: "Insights",
    eyebrow: "API market intelligence",
    title: "Pharmaceutical API insights for sourcing and regulated-market readiness.",
    description:
      "Read Aurore Life Sciences perspectives on API supply resilience, impurity control, filing strategy, CDMO collaboration, and portfolio intelligence.",
    image: facilityTwo,
    stats: [
      { value: insights.length + insightTopics.length, label: "editorial topics" },
      { value: featuredApis.length, label: "molecule spotlights" },
      { value: "API", label: "market intelligence" },
      { value: "CDMO", label: "technical collaboration" }
    ],
    intro: {
      eyebrow: "Thought leadership",
      title: "A research-led content engine for pharmaceutical buyers.",
      body:
        "The insights hub is structured for procurement, regulatory affairs, formulation teams, and supply-chain leaders evaluating API sources, filing pathways, and manufacturing risk."
    },
    topics: insightTopics,
    moleculeSpotlight: {
      title: "Molecule spotlight pipeline",
      body: "Featured molecules and intermediate families that procurement teams frequently evaluate when building second-source, launch, or lifecycle programs.",
      apis: featuredApis,
      intermediates: featuredIntermediates
    },
    cta: {
      ...sharedCta,
      secondary: { label: "Browse product intelligence", href: "/products/" }
    }
  },
  downloads: {
    nav: "downloads",
    label: "Downloads",
    eyebrow: "Technical resources",
    title: "Business and technical resources for API qualification.",
    description:
      "Request Aurore Life Sciences product brochures, corporate presentation, facility overview, technical datasheets, and capability briefs for API sourcing.",
    image: rndImage,
    stats: resourceStats.scale,
    intro: {
      eyebrow: "Resource library",
      title: "Collateral designed for serious supplier evaluation.",
      body:
        "Resource requests should help teams move faster: portfolio screening for procurement, technical packs for R&D, facility context for quality, and documentation checklists for regulatory review."
    },
    downloads,
    cta: {
      ...sharedCta,
      primary: { label: "Request gated resources", href: "/contact/#rfq" }
    }
  },
  contact: {
    nav: "contact",
    label: "Contact",
    eyebrow: "Enterprise enquiry routing",
    title: "Connect with Aurore for API supply, RFQs, and technical discussions.",
    description:
      "Route API supplier enquiries, pharmaceutical manufacturing RFQs, CDMO collaboration requests, and documentation needs to Aurore Life Sciences.",
    image: facilityOne,
    stats: resourceStats.scale,
    intro: {
      eyebrow: "Inquiry routing",
      title: "Send the right context to the right team.",
      body:
        "Aurore handles commercial RFQs, technical discussions, regulatory documentation requests, sample enquiries, CDMO collaboration, and global procurement qualification from a single enterprise contact path."
    },
    contactRoutes: [
      {
        title: "Commercial API supply",
        body: "Share molecule, quantity, annual demand, target market, Incoterms, and expected launch or replenishment timeline."
      },
      {
        title: "Technical and regulatory discussion",
        body: "Request specifications, COA, MSDS, impurity profile context, DMF access, filing status, or customer audit coordination."
      },
      {
        title: "CDMO and process collaboration",
        body: "Discuss route scouting, process optimization, kilo-lab or pilot requirements, scale-up, and lifecycle manufacturing support."
      }
    ],
    office: {
      title: "Hyderabad corporate office",
      address: "Plot #68, 69, Jubilee Heights, Madhapur, Hyderabad, Telangana 500081, India",
      phone: "040-68303211",
      email: "info@aurorels.com"
    }
  },
  "global-presence": {
    nav: "global",
    label: "Global Presence",
    eyebrow: "Global API supplier",
    title: "Supplying pharmaceutical programs across regulated and growth markets.",
    description:
      "Aurore supports pharmaceutical exports, global API supply, regulatory documentation, and long-term partnerships across more than 70 countries.",
    image: facilityTwo,
    stats: [
      { value: "70+", label: "countries served" },
      { value: "122+", label: "global filings" },
      { value: "2", label: "manufacturing sites" },
      { value: "APAC/EU/US", label: "market support" }
    ],
    intro: {
      eyebrow: "Market reach",
      title: "A global footprint supported by regulatory and manufacturing discipline.",
      body:
        "International supply requires more than export paperwork. It requires market-aware documentation, dependable manufacturing, customer communication, and the ability to support procurement teams across launch and lifecycle stages."
    },
    regions: globalRegions,
    facilities,
    cta: {
      ...sharedCta,
      secondary: { label: "Review regulatory support", href: "/regulatory/" }
    }
  },
  "partner-with-us": {
    nav: "partner",
    label: "Partner With Us",
    eyebrow: "Strategic API and CDMO partnership",
    title: "Partner with Aurore for development, scale-up, and long-term API supply.",
    description:
      "Build pharmaceutical CDMO partnerships, API development collaborations, scale-up programs, and strategic supply relationships with Aurore Life Sciences.",
    image: rndImage,
    stats: resourceStats.partnership,
    intro: {
      eyebrow: "Partnership philosophy",
      title: "Scientific collaboration with the discipline of a commercial supply partner.",
      body:
        "Aurore works with pharmaceutical companies from early technical evaluation through commercial supply, combining process development, analytical support, regulatory readiness, and manufacturing execution."
    },
    pillars: [
      {
        title: "CDMO collaboration",
        body: "Route scouting, proof-of-concept batches, impurity control strategy, method development, technology transfer, and scale-up planning."
      },
      {
        title: "Process development support",
        body: "Scientific review focused on robust, scalable, cost-aware, and quality-aligned processes for API and intermediate programs."
      },
      {
        title: "Scale-up and manufacturing",
        body: "Kilo-lab, pilot, and commercial transition support across GMP manufacturing sites with documentation and quality oversight."
      },
      {
        title: "Long-term supply model",
        body: "Supply agreements structured around forecast visibility, regulatory commitments, lifecycle changes, and reliable commercial execution."
      }
    ],
    proof: [
      "Technical feasibility and route assessment",
      "Process validation and analytical method support",
      "Regulatory documentation and customer audit coordination",
      "Commercial API supply with lifecycle governance"
    ],
    cta: {
      ...sharedCta,
      primary: { label: "Start partnership discussion", href: "/contact/#rfq" }
    }
  }
};
