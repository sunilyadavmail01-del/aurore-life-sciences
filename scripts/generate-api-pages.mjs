import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  apiHref,
  capabilityFaqs,
  facilities,
  intermediateFamilies,
  intermediateHref,
  intermediates,
  insights,
  logoUrl,
  markets,
  navItems,
  products,
  regulatoryDashboard,
  scientists,
  therapyHubs
} from "../src/site-data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const baseUrl = "https://aurorels.com";
const defaultOgImage = `${baseUrl}/images/kazhipally-og.jpg`;
const brandColor = "#009a44";

// Promote relative asset paths from site-data.js to absolute URLs (required
// by JSON-LD consumers and social-meta scrapers, which receive the markup
// without an origin context).
const absoluteUrl = (path) => (path && path.startsWith("http") ? path : `${baseUrl}${path}`);

const facilityGeo = {
  jeedimetla: { lat: 17.5169, lng: 78.4530, address: "Jeedimetla Industrial Area, Hyderabad, Telangana 500055, India" },
  kazhipally: { lat: 17.5710, lng: 78.3070, address: "Kazhipally Village, Sangareddy District, Telangana 502319, India" }
};

const insightDates = {
  "controlling-impurity-profiles-in-antiviral-apis": { published: "2025-09-15", modified: "2026-02-01" },
  "usdmf-vs-cep-filing-strategy-for-global-api-launches": { published: "2025-11-08", modified: "2026-02-01" },
  "backward-integration-and-api-supply-resilience": { published: "2026-02-14", modified: "2026-02-14" }
};

const generatedRoots = ["api", "products", "intermediates", "facilities", "therapy-areas", "scientists", "regulatory", "insights", "markets"];
const eventPath = "/events/cphi-shanghai-2026/";

function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Aurore Life Sciences Private Limited",
    legalName: "Aurore Life Sciences Private Limited",
    url: `${baseUrl}/`,
    logo: absoluteUrl(logoUrl),
    foundingDate: "2017",
    sameAs: [
      "https://linkedin.com/company/aurore-life-sciences",
      "https://www.pharmacompass.com/pharma-company-profile/aurore-life-sciences"
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Plot #68, 69, Jubilee Heights, Madhapur",
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      postalCode: "500081",
      addressCountry: "IN"
    }
  };
}

function breadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.path}`
    }))
  };
}

function faqSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

function productSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.casNumber,
    brand: {
      "@type": "Brand",
      name: "Aurore Life Sciences"
    },
    manufacturer: {
      "@type": "Organization",
      name: "Aurore Life Sciences Private Limited"
    },
    category: product.category,
    description: product.summary,
    additionalProperty: [
      { "@type": "PropertyValue", name: "DMF status", value: product.dmfStatus },
      { "@type": "PropertyValue", name: "Backward integrated", value: product.backwardIntegrated },
      { "@type": "PropertyValue", name: "Scale range", value: product.scaleRange }
    ]
  };
}

function intermediateFamilySchema(family) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${family.apiName} intermediates`,
    description: family.summary,
    numberOfItems: family.intermediates.length,
    itemListElement: family.intermediates.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "ChemicalSubstance",
        name: item.chemicalName,
        identifier: item.casNumber
      }
    }))
  };
}

function articleSchema({ title, excerpt, author, slug, datePublished, dateModified, image }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    image,
    author: { "@type": "Organization", name: author },
    publisher: {
      "@type": "Organization",
      name: "Aurore Life Sciences Private Limited",
      logo: { "@type": "ImageObject", url: absoluteUrl(logoUrl) }
    },
    datePublished,
    dateModified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/insights/${slug}/`
    }
  };
}

function localBusinessSchema(facility) {
  const geo = facilityGeo[facility.slug];
  if (!geo) return null;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Aurore Life Sciences — ${facility.name}`,
    url: `${baseUrl}/facilities/${facility.slug}/`,
    image: absoluteUrl(facility.image),
    telephone: "+91-40-68303211",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: geo.address,
      addressLocality: "Hyderabad",
      addressRegion: "Telangana",
      addressCountry: "IN"
    },
    geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00"
    },
    parentOrganization: {
      "@type": "Organization",
      name: "Aurore Life Sciences Private Limited",
      url: `${baseUrl}/`
    }
  };
}

function cphiEventSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "CPHI & PMEC China 2026",
    startDate: "2026-06-16",
    endDate: "2026-06-18",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Shanghai New International Expo Center",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Shanghai",
        addressCountry: "CN"
      }
    },
    organizer: {
      "@type": "Organization",
      name: "CPHI & PMEC China"
    },
    attendee: {
      "@type": "Organization",
      name: "Aurore Life Sciences Private Limited",
      url: `${baseUrl}${eventPath}`
    }
  };
}

function productFaqSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the CAS number for ${product.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `${product.name} carries CAS number ${product.casNumber}, with molecular formula ${product.formula}.` }
      },
      {
        "@type": "Question",
        name: `Which regulatory filings does Aurore hold for ${product.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `Aurore supports ${product.name} with the following filings: ${product.filings}. Refer to /regulatory/ for the full DMF and approval dashboard.` }
      },
      {
        "@type": "Question",
        name: `What is the production capacity for ${product.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `${product.name} is produced at ${product.capacity}. Capacity allocation, lead time, and packaging options are confirmed during the RFQ process.` }
      },
      {
        "@type": "Question",
        name: `Which markets does Aurore supply ${product.name} to?`,
        acceptedAnswer: { "@type": "Answer", text: `${product.marketFocus}. Sample requests, quality documentation, and DMF access can be initiated via the RFQ form.` }
      },
      {
        "@type": "Question",
        name: `How can I request a sample or quotation for ${product.name}?`,
        acceptedAnswer: { "@type": "Answer", text: `Submit an RFQ via /regulatory/ specifying molecule, target market, quantity, grade, and required documentation. Aurore's BD team responds with technical pack, COA, and pricing context within 48 hours.` }
      }
    ]
  };
}

function htmlPage({
  title,
  description,
  canonicalPath,
  pageType,
  pageSlug = "",
  schemas = [],
  ogTitle,
  ogDescription,
  ogImage = defaultOgImage,
  ogType = "website"
}) {
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  const canonicalUrl = `${baseUrl}${canonicalPath}`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="${brandColor}" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/images/favicon-180.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <meta property="og:type" content="${ogType}" />
    <meta property="og:site_name" content="Aurore Life Sciences" />
    <meta property="og:title" content="${finalOgTitle}" />
    <meta property="og:description" content="${finalOgDescription}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${finalOgTitle}" />
    <meta name="twitter:description" content="${finalOgDescription}" />
    <meta name="twitter:image" content="${ogImage}" />
    ${schemas
      .filter(Boolean)
      .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
      .join("\n    ")}
  </head>
  <body>
    <div id="app"></div>
    <script>window.__PAGE_TYPE__ = "${pageType}"; window.__PAGE_SLUG__ = "${pageSlug}";</script>
    <script type="module" src="/src/generated-page.js"></script>
  </body>
</html>
`;
}

async function writePage(relativeDir, page) {
  const pageDir = path.join(rootDir, relativeDir);
  await mkdir(pageDir, { recursive: true });
  await writeFile(path.join(pageDir, "index.html"), page, "utf8");
}

async function generatePages() {
  await Promise.all([...generatedRoots, "events"].map((dir) => rm(path.join(rootDir, dir), { recursive: true, force: true })));

  await writePage(
    "products",
    htmlPage({
      title: "API Library | Aurore Life Sciences",
      description: "Browse Aurore Life Sciences' API library with individually indexable product pages, RFQ flows, and capability filters.",
      keywords: "Aurore API library, API manufacturer India, RFQ, pharmaceutical APIs",
      canonicalPath: "/products/",
      pageType: "productIndex",
      schemas: [organizationSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Products", path: "/products/" }]), faqSchema(capabilityFaqs)]
    })
  );

  await writePage(
    path.join("events", "cphi-shanghai-2026"),
    htmlPage({
      title: "Meet Aurore at CPHI Shanghai 2026",
      description: "Schedule a focused CPHI Shanghai 2026 meeting with Aurore Life Sciences for APIs, CDMO projects, documentation, and supplier qualification.",
      canonicalPath: eventPath,
      pageType: "cphiShanghai",
      schemas: [
        organizationSchema(),
        cphiEventSchema(),
        breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Events", path: eventPath },
          { name: "CPHI Shanghai 2026", path: eventPath }
        ])
      ]
    })
  );

  await Promise.all(
    products.map((product) =>
      writePage(
        path.join("products", product.slug),
        htmlPage({
          title: `${product.name} API Manufacturer & Supplier | CAS ${product.casNumber} | Aurore Life Sciences`,
          description: `Aurore manufactures ${product.name} (CAS ${product.casNumber}) at GMP-certified facilities in Hyderabad. ${product.dmfStatus}. Request RFQ.`,
          keywords: `${product.name} API, CAS ${product.casNumber}, ${product.category} API supplier, Aurore Life Sciences`,
          canonicalPath: apiHref(product.slug),
          pageType: "api",
          pageSlug: product.slug,
          schemas: [
            organizationSchema(),
            productSchema(product),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Products", path: "/products/" },
              { name: product.name, path: apiHref(product.slug) }
            ]),
            productFaqSchema(product)
          ]
        })
      )
    )
  );

  await writePage(
    "intermediates",
    htmlPage({
      title: "Intermediates Library | Aurore Life Sciences",
      description: `Browse ${intermediates.length} Aurore Life Sciences intermediates grouped across ${intermediateFamilies.length} API families with chemical names and CAS numbers.`,
      keywords: "Aurore intermediates, API intermediates India, pharmaceutical intermediates, CAS intermediates",
      canonicalPath: "/intermediates/",
      pageType: "intermediateIndex",
      schemas: [
        organizationSchema(),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Intermediates", path: "/intermediates/" }])
      ]
    })
  );

  await Promise.all(
    intermediateFamilies.map((family) =>
      writePage(
        path.join("intermediates", family.slug),
        htmlPage({
          title: `${family.apiName} Intermediates | Aurore Life Sciences`,
          description: `${family.summary} Includes chemical names and CAS numbers from Aurore's product list.`,
          keywords: `${family.apiName} intermediates, API intermediate CAS, Aurore Life Sciences intermediates`,
          canonicalPath: intermediateHref(family.slug),
          pageType: "intermediateFamily",
          pageSlug: family.slug,
          schemas: [
            organizationSchema(),
            intermediateFamilySchema(family),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Intermediates", path: "/intermediates/" },
              { name: family.apiName, path: intermediateHref(family.slug) }
            ])
          ]
        })
      )
    )
  );

  await Promise.all(
    facilities.map((facility) =>
      writePage(
        path.join("facilities", facility.slug),
        htmlPage({
          title: `${facility.name} Facility | Aurore Life Sciences`,
          description: `${facility.name} facility at Aurore Life Sciences: capacity, certifications, audit story, and relevant API manufacturing capabilities.`,
          keywords: `${facility.name} facility, Aurore manufacturing, API facility Hyderabad, GMP site`,
          canonicalPath: `/facilities/${facility.slug}/`,
          pageType: "facility",
          pageSlug: facility.slug,
          schemas: [
            organizationSchema(),
            localBusinessSchema(facility),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Facilities", path: `/facilities/${facility.slug}/` },
              { name: facility.name, path: `/facilities/${facility.slug}/` }
            ]),
            faqSchema(capabilityFaqs)
          ]
        })
      )
    )
  );

  await Promise.all(
    therapyHubs.map((hub) =>
      writePage(
        path.join("therapy-areas", hub.slug),
        htmlPage({
          title: `${hub.name} API Portfolio | Aurore Life Sciences`,
          description: `${hub.name} API portfolio at Aurore Life Sciences with linked product pages, facility pages, and related technical insights.`,
          keywords: `${hub.name} APIs, therapy area API portfolio, Aurore Life Sciences`,
          canonicalPath: `/therapy-areas/${hub.slug}/`,
          pageType: "therapy",
          pageSlug: hub.slug,
          schemas: [
            organizationSchema(),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Therapy Areas", path: `/therapy-areas/${hub.slug}/` },
              { name: hub.name, path: `/therapy-areas/${hub.slug}/` }
            ])
          ]
        })
      )
    )
  );

  await writePage(
    "scientists",
    htmlPage({
      title: "Scientific Leadership | Aurore Life Sciences",
      description: "Scientific leadership structure for Aurore Life Sciences, featuring doctoral and R&D expertise scaffolding for the rebuilt API website.",
      keywords: "Aurore scientists, API experts, pharma R&D leadership, scientific leadership",
      canonicalPath: "/scientists/",
      pageType: "scientists",
      schemas: [
        organizationSchema(),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Scientists", path: "/scientists/" }])
      ]
    })
  );

  await writePage(
    "regulatory",
    htmlPage({
      title: "Regulatory Dashboard | Aurore Life Sciences",
      description: "Aurore Life Sciences regulatory dashboard with DMF counts, approvals, audit-facing trust signals, and FAQ-driven SEO structure.",
      keywords: "Aurore regulatory dashboard, DMF count, pharma approvals, USFDA EDQM WHO COFEPRIS KFDA",
      canonicalPath: "/regulatory/",
      pageType: "regulatory",
      schemas: [
        organizationSchema(),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Regulatory Dashboard", path: "/regulatory/" }]),
        faqSchema(capabilityFaqs)
      ]
    })
  );

  await writePage(
    "insights",
    htmlPage({
      title: "Insights Hub | Aurore Life Sciences",
      description: "Technical insights, filing strategy content, and editorial authority pages for the Aurore Life Sciences website rebuild.",
      keywords: "Aurore insights, pharma SEO content, technical API articles, filing strategy",
      canonicalPath: "/insights/",
      pageType: "insightIndex",
      schemas: [
        organizationSchema(),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights/" }])
      ]
    })
  );

  await Promise.all(
    insights.map((insight) => {
      const dates = insightDates[insight.slug] || { published: "2026-01-15", modified: "2026-01-15" };
      return writePage(
        path.join("insights", insight.slug),
        htmlPage({
          title: `${insight.title} | Aurore Life Sciences`,
          description: insight.excerpt,
          canonicalPath: `/insights/${insight.slug}/`,
          pageType: "insight",
          pageSlug: insight.slug,
          ogType: "article",
          schemas: [
            organizationSchema(),
            articleSchema({
              title: insight.title,
              excerpt: insight.excerpt,
              author: insight.author,
              slug: insight.slug,
              datePublished: dates.published,
              dateModified: dates.modified,
              image: defaultOgImage
            }),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights/" },
              { name: insight.title, path: `/insights/${insight.slug}/` }
            ])
          ]
        })
      );
    })
  );

  await Promise.all(
    markets.map((market) =>
      writePage(
        path.join("markets", market.slug),
        htmlPage({
          title: `${market.name} API Market Page | Aurore Life Sciences`,
          description: `${market.name} market page for Aurore Life Sciences with regulatory positioning, relevant APIs, and regional contact framing.`,
          keywords: `${market.name} API supplier, regional API page, Aurore Life Sciences`,
          canonicalPath: `/markets/${market.slug}/`,
          pageType: "market",
          pageSlug: market.slug,
          schemas: [
            organizationSchema(),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Markets", path: `/markets/${market.slug}/` },
              { name: market.name, path: `/markets/${market.slug}/` }
            ])
          ]
        })
      )
    )
  );
}

async function generateSupportFiles() {
  const allPaths = [
    "/",
    "/products/",
    eventPath,
    ...products.map((product) => apiHref(product.slug)),
    "/intermediates/",
    ...intermediateFamilies.map((family) => intermediateHref(family.slug)),
    ...facilities.map((facility) => `/facilities/${facility.slug}/`),
    ...therapyHubs.map((hub) => `/therapy-areas/${hub.slug}/`),
    "/scientists/",
    "/regulatory/",
    "/insights/",
    ...insights.map((insight) => `/insights/${insight.slug}/`),
    ...markets.map((market) => `/markets/${market.slug}/`)
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${allPaths
    .map((url) => `  <url><loc>${baseUrl}${url}</loc></url>`)
    .join("\n")}\n</urlset>\n`;
  const robots = `User-agent: *\nAllow: /products/\nAllow: /intermediates/\nAllow: /insights/\nAllow: /facilities/\nAllow: /therapy-areas/\nAllow: /markets/\nDisallow: /admin\nDisallow: /tmp\nSitemap: ${baseUrl}/sitemap.xml\n`;

  await writeFile(path.join(rootDir, "sitemap.xml"), sitemap, "utf8");
  await writeFile(path.join(rootDir, "robots.txt"), robots, "utf8");
}

await generatePages();
await generateSupportFiles();
