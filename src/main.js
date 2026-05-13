import "./styles.css";

import {
  apiHref,
  approvals,
  facilityOne,
  facilityTwo,
  facilities,
  findProductBySlug,
  intermediateFamilies,
  intermediates,
  insights,
  markets,
  metrics,
  navItems,
  products,
  regulatoryDashboard,
  rndImage,
  scientists,
  therapyHubs,
  therapeuticAreas,
  utilityNavItems
} from "./site-data.js";
import {
  attachCommonUi,
  pageButton,
  pageLink,
  renderApiCard,
  renderApprovals,
  renderFooter,
  renderHeader
} from "./site-shell.js";

const app = document.querySelector("#app");
let activePage = "home";
let productQuery = "";
let productTherapy = "All categories";

// SEO-tightened SPA route titles. Each is ≤60 chars (the SERP truncation
// boundary), keyword-first, brand last. The `home`, `products`, and
// `insights` entries deliberately mirror the static HTML titles in
// index.html / products/index.html / insights/index.html so navigating
// between SPA and static contexts doesn't flicker the document.title.
const titleMap = {
  home:          "API Manufacturer India | Aurore Life Sciences",
  about:         "About Aurore | Pure-play API Manufacturer India",
  products:      "API Library | Aurore Life Sciences",
  cdmo:          "API CDMO Services India | Aurore Life Sciences",
  peptides:      "Peptide API Manufacturer | Aurore Life Sciences",
  manufacturing: "GMP API Manufacturing Hyderabad | Aurore Life Sciences",
  rnd:           "R&D & Process Chemistry | Aurore Life Sciences",
  insights:      "Insights Hub | Aurore Life Sciences",
  careers:       "Careers in API Science | Aurore Life Sciences",
  contact:       "Contact & RFQ | Aurore Life Sciences"
};

const heroSlides = [
  {
    kicker: "Pure-play API & Intermediates Manufacturer",
    title: "Driven by R&D Excellence.",
    accent: "Excellence.",
    description:
      "Aurore Life Sciences develops and manufactures high-quality APIs and intermediates for regulated global markets with strong process chemistry and backward integration.",
    image: facilityTwo,
    imageAlt: "Aurore Kazhipally API manufacturing facility",
    panelLabel: "Manufacturing platform",
    panelValue: "~890 KL reactor capacity",
    ctas: [
      { label: "Explore Portfolio", href: "/products/", variant: "primary" },
      { label: "Request RFQ", href: "/#contact", variant: "outline" }
    ]
  },
  {
    kicker: "Global pharma events",
    title: "Meet Us at CPHI Shanghai 2026",
    accent: "CPHI Shanghai 2026",
    description:
      "Connect with our business and scientific teams from 16-18 June 2026 at Shanghai New International Expo Center to explore API capabilities, CDMO partnerships, and global supply opportunities.",
    image: facilityOne,
    imageAlt: "Aurore manufacturing campus prepared for global business meetings",
    panelLabel: "CPHI China 2026",
    panelValue: "16-18 June · Shanghai",
    ctas: [
      { label: "Schedule Meeting", href: "/#contact", variant: "primary" },
      { label: "Contact Team", href: "/#contact", variant: "outline" }
    ]
  },
  {
    kicker: "Complex chemistry & scale-up",
    title: "Expanding Complex API Capabilities",
    accent: "Complex API Capabilities",
    description:
      "Strengthening specialty and high-value molecule programs with scalable process development, analytical depth, and regulatory-focused manufacturing transfer.",
    image: rndImage,
    imageAlt: "Advanced Aurore R&D laboratory",
    panelLabel: "R&D depth",
    panelValue: "Process, analytical & regulatory teams",
    ctas: [
      { label: "Explore Capabilities", href: "/scientists/", variant: "primary" }
    ]
  },
  {
    kicker: "Regulated market supply",
    title: "Global Manufacturing. Regulatory Confidence.",
    accent: "Regulatory Confidence.",
    description:
      "Supporting regulated market customers through reliable manufacturing, quality systems, filing readiness, and long-term supply partnerships.",
    image: facilityTwo,
    imageAlt: "Large-scale API manufacturing operations",
    panelLabel: "Global readiness",
    panelValue: "122+ DMFs · 70+ countries",
    ctas: [
      { label: "Manufacturing Overview", href: "/facilities/jeedimetla/", variant: "primary" },
      { label: "Regulatory Dashboard", href: "/regulatory/", variant: "outline" }
    ]
  }
];

function isKnownPage(page) {
  return [...navItems, ...utilityNavItems].some((item) => item.id === page);
}

function setPage(page) {
  activePage = isKnownPage(page) ? page : "home";
  window.location.hash = activePage;
  document.title = titleMap[activePage];
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function filteredProducts() {
  const query = productQuery.trim().toLowerCase();
  return products.filter((product) => {
    const matchesQuery = [product.name, product.category, product.filings, product.summary].join(" ").toLowerCase().includes(query);
    const matchesTherapy = productTherapy === "All categories" || product.category === productTherapy;
    return matchesQuery && matchesTherapy;
  });
}

function selectedProductFromUrl() {
  const slug = new URLSearchParams(window.location.search).get("molecule");
  return slug ? findProductBySlug(slug) : null;
}

function parseMetricValue(value) {
  const isApprox = value.startsWith("~");
  const stripped = value.replace("~", "").trim();
  const numMatch = stripped.match(/^(\d+)/);
  const num = numMatch ? parseInt(numMatch[1], 10) : 0;
  const suffix = stripped.replace(/^\d+/, "").trim();
  return { num, suffix, isApprox };
}

function renderHeroTitle(slide) {
  const title = slide.title.replace(slide.accent, "").trim();
  return `
    ${title ? `
      <span class="hl-reveal-line">
        <span class="hl-reveal-line__inner">${title}</span>
      </span>` : ""}
    <span class="hl-reveal-line">
      <span class="hl-reveal-line__inner hl-hero__headline--accent">${slide.accent}</span>
    </span>`;
}

function renderHeroCarousel() {
  return `
    <section class="hl-hero" data-hero-carousel aria-label="Aurore Life Sciences enterprise announcements">
      <div class="hl-hero__slides">
        ${heroSlides.map((slide, i) => `
          <article class="hl-hero__slide ${i === 0 ? "is-active" : ""}" data-hero-slide aria-hidden="${i === 0 ? "false" : "true"}">
            <div class="hl-hero__bg" aria-hidden="true">
              <img src="${slide.image}" alt="${slide.imageAlt}" loading="${i === 0 ? "eager" : "lazy"}" decoding="async" ${i === 0 ? `fetchpriority="high"` : ""} />
              <div class="hl-hero__overlay"></div>
              <div class="hl-hero__glow"></div>
            </div>
            <div class="hl-hero__body">
              <div class="shell hl-hero__inner">
                <div class="hl-hero__content">
                  <span class="hl-eyebrow hl-hero__eyebrow">${slide.kicker}</span>
                  <h1 class="hl-hero__headline">${renderHeroTitle(slide)}</h1>
                  <p class="hl-hero__sub">${slide.description}</p>
                  <div class="hl-hero__actions">
                    ${slide.ctas.map((cta) => `
                      <a class="hl-btn ${cta.variant === "primary" ? "hl-btn--primary" : "hl-btn--outline"}" href="${cta.href}">${cta.label}</a>
                    `).join("")}
                  </div>
                </div>
                <aside class="hl-hero__announcement" aria-label="${slide.panelLabel}">
                  <span>${slide.panelLabel}</span>
                  <strong>${slide.panelValue}</strong>
                </aside>
              </div>
            </div>
          </article>`).join("")}
      </div>

      <div class="hl-hero__controls shell" aria-label="Hero carousel controls">
        <div class="hl-hero__progress">
          ${heroSlides.map((slide, i) => `
            <button class="hl-hero__dot ${i === 0 ? "is-active" : ""}" type="button" data-hero-dot="${i}" aria-label="Show slide ${i + 1}: ${slide.title}">
              <span></span>
            </button>`).join("")}
        </div>
        <div class="hl-hero__arrows">
          <button class="hl-hero__arrow" type="button" data-hero-prev aria-label="Previous announcement">‹</button>
          <button class="hl-hero__arrow" type="button" data-hero-next aria-label="Next announcement">›</button>
        </div>
      </div>

      <div class="hl-hero__statsbar" aria-label="Key figures">
        <div class="shell hl-hero__statsbar-inner">
          ${metrics.map(([value, label]) => `
            <div class="hl-hero__stat">
              <strong>${value}</strong>
              <span>${label}</span>
            </div>`).join("")}
        </div>
      </div>
    </section>`;
}

function renderHome() {
  const marqueeItems = [...approvals, ...approvals];

  return `
    <main>

      <!-- ═══ HERO ═══ -->
      ${renderHeroCarousel()}

      <!-- ═══ REGULATORY MARQUEE ═══ -->
      <div class="hl-marquee" aria-label="Regulatory approvals">
        <span class="hl-marquee__label">Regulatory Approvals</span>
        <div class="hl-marquee__viewport" aria-hidden="true">
          <div class="hl-marquee__track">
            ${marqueeItems.map((a) => `<span class="hl-marquee__item">${a}</span>`).join('<span class="hl-marquee__sep">·</span>')}
          </div>
        </div>
      </div>

      <!-- ═══ METRICS ═══ -->
      <section class="hl-metrics-section" aria-label="Aurore at a glance">
        <div class="shell hl-metrics-grid">
          ${metrics.map(([value, label]) => {
            const { num, suffix, isApprox } = parseMetricValue(value);
            return `
              <div class="hl-metric reveal-up">
                <div class="hl-metric__value">
                  ${isApprox ? `<span class="hl-metric__approx">~</span>` : ""}
                  <span class="hl-metric__count" data-count="${num}">0</span>
                  ${suffix ? `<span class="hl-metric__suffix">${suffix}</span>` : ""}
                </div>
                <span class="hl-metric__label">${label}</span>
              </div>`;
          }).join("")}
        </div>
      </section>

      <!-- ═══ WHY AURORE · dark section ═══ -->
      <section class="hl-section hl-section--dark">
        <div class="shell hl-split">
          <div class="hl-split__text">
            <span class="hl-eyebrow hl-eyebrow--dim reveal-up">Why Aurore</span>
            <h2 class="hl-section__title hl-section__title--light reveal-up" style="--delay:0.1s">
              Commercial scale.<br>Regulatory depth.
            </h2>
            <p class="hl-section__body hl-section__body--dim reveal-up" style="--delay:0.18s">
              Aurore combines early process identification, backward integration, and GMP manufacturing to help customers secure dependable API supply for key global markets.
            </p>
            <div class="hl-pillars">
              ${[
                ["01", "Backward Integration", "Full control across raw materials, intermediates, and final API supply."],
                ["02", "R&D-led Process Design", "60 scientists, 65 analytical experts, 10 doctorates on staff."],
                ["03", "Global Compliance", "Inspections across US, EU, WHO, TGA, Korea, Brazil, and Mexico."],
                ["04", "Buyer-Ready Access", "RFQ and sample request paths visible on every commercial page."]
              ].map(([num, title, body], i) => `
                <div class="hl-pillar reveal-up" style="--delay:${0.09 * i}s">
                  <span class="hl-pillar__num">${num}</span>
                  <div>
                    <h3 class="hl-pillar__title">${title}</h3>
                    <p class="hl-pillar__body">${body}</p>
                  </div>
                </div>`).join("")}
            </div>
          </div>
          <div class="hl-split__visual reveal-fade" style="--delay:0.22s">
            <img src="${facilityOne}" alt="Aurore Kazhipally manufacturing facility" class="hl-split__img" />
            <div class="hl-split__caption">
              <span>Kazhipally Facility · Hyderabad</span>
              <strong>~890 KL Combined Reactor Capacity</strong>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ THERAPY AREAS ═══ -->
      <section class="hl-section">
        <div class="shell">
          <div class="hl-section-head reveal-up">
            <span class="hl-eyebrow">Therapy Areas</span>
            <h2 class="hl-section__title">A portfolio built<br>for global demand.</h2>
            <p class="hl-section__body">Navigate our API portfolio by therapeutic area — each hub links to molecule pages, filings, and supplier-ready enquiries.</p>
          </div>
          <div class="hl-therapy-grid">
            ${therapyHubs.slice(0, 6).map((hub, i) => `
              <a class="hl-therapy-card reveal-up" href="/therapy-areas/${hub.slug}/" style="--delay:${0.07 * i}s">
                <span class="hl-therapy-card__num">0${i + 1}</span>
                <h3 class="hl-therapy-card__title">${hub.name}</h3>
                <p class="hl-therapy-card__body">${hub.overview}</p>
                <span class="hl-therapy-card__arrow">→</span>
              </a>`).join("")}
          </div>
        </div>
      </section>

      <!-- ═══ PORTFOLIO ═══ -->
      <section class="hl-section hl-section--soft">
        <div class="shell">
          <div class="hl-section-head reveal-up">
            <span class="hl-eyebrow">Portfolio</span>
            <h2 class="hl-section__title">APIs &amp; intermediates<br>for global supply.</h2>
          </div>
          <div class="hl-portfolio-grid">
            <a class="hl-portfolio-card reveal-up" href="/products/" style="--delay:0s">
              <div class="hl-portfolio-card__num">60+</div>
              <h3>API Products</h3>
              <p>Searchable portfolio with filings, therapeutic category, capability filtering, and dedicated pages per molecule.</p>
              <span class="hl-portfolio-card__link">Browse API library →</span>
            </a>
            <a class="hl-portfolio-card reveal-up" href="/intermediates/" style="--delay:0.1s">
              <div class="hl-portfolio-card__num">${intermediates.length}</div>
              <h3>Intermediates</h3>
              <p>${intermediateFamilies.length} API families with CAS-backed sourcing context and direct supplier qualification pathways.</p>
              <span class="hl-portfolio-card__link">Browse intermediates →</span>
            </a>
            <div class="hl-portfolio-card hl-portfolio-card--accent reveal-up" style="--delay:0.2s">
              <div class="hl-portfolio-card__num">CDMO</div>
              <h3>Custom Services</h3>
              <p>Process development, scale-up, registration support, and commercial transfer for regulated markets worldwide.</p>
              ${pageButton("View CDMO Services", "cdmo", "hl-btn hl-btn--yellow")}
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ ENTERPRISE PROOF ═══ -->
      <section class="enterprise-proof">
        <div class="shell enterprise-proof__inner">
          <div class="enterprise-proof__copy reveal-up">
            <span class="hl-eyebrow">Enterprise readiness</span>
            <h2>Built for regulated pharmaceutical supply chains.</h2>
            <p>Aurore combines API manufacturing scale, backward integration, R&amp;D depth, and documentation discipline for buyers evaluating long-term supply resilience.</p>
          </div>
          <div class="enterprise-proof__grid">
            ${[
              { icon: "DMF", raw: regulatoryDashboard.dmfCount, label: "DMFs filed", sub: "Regulated and semi-regulated market support" },
              { icon: "GMP", raw: String(facilities.length), label: "Manufacturing sites", sub: "Hyderabad-based API production network" },
              { icon: "GLB", raw: "70+", label: "Countries served", sub: "Global customer and market orientation" },
              { icon: "R&D", raw: String(scientists.length), label: "Scientific leads", sub: "Process, analytical, and regulatory expertise" }
            ].map(({ icon, raw, label, sub }, i) => {
              const num = parseInt(raw.replace(/\D/g, ""), 10);
              const suf = raw.replace(/[\d~]/g, "").trim();
              return `
                <article class="enterprise-proof__card reveal-up" style="--delay:${0.08 * i}s">
                  <span class="enterprise-proof__icon">${icon}</span>
                  <div>
                    <strong><span data-count="${num}">0</span>${suf}</strong>
                    <h3>${label}</h3>
                    <p>${sub}</p>
                  </div>
                </article>`;
            }).join("")}
          </div>
        </div>
      </section>

      <!-- ═══ INTELLIGENCE / RESOURCES ═══ -->
      <section class="hl-section enterprise-resources">
        <div class="shell">
          <div class="enterprise-resources__head reveal-up">
            <div class="hl-section-head">
              <span class="hl-eyebrow">Regulatory intelligence</span>
              <h2 class="hl-section__title">Technical insight for<br>supplier qualification.</h2>
              <p class="hl-section__body">Practical filing, impurity-control, and supply-resilience guidance for procurement, regulatory, and technical review teams.</p>
            </div>
            <a class="hl-btn hl-btn--primary" href="/insights/">Open insights hub</a>
          </div>
          <div class="enterprise-resources__grid">
            ${insights.map((insight, i) => `
              <a class="hl-insight-card enterprise-resource-card reveal-up" href="/insights/${insight.slug}/" style="--delay:${0.08 * i}s">
                <span class="hl-insight-card__cat">${insight.category}</span>
                <h3 class="hl-insight-card__title">${insight.title}</h3>
                <p class="hl-insight-card__excerpt">${insight.excerpt}</p>
                <span class="hl-insight-card__cta">Read insight →</span>
              </a>`).join("")}
          </div>
        </div>
      </section>

      <!-- ═══ QUALIFICATION CTA ═══ -->
      <section class="enterprise-cta">
        <div class="shell enterprise-cta__inner reveal-up">
          <div>
            <span class="hl-eyebrow">Partner qualification</span>
            <h2>Start a structured API supply conversation.</h2>
            <p>Share molecule, market, timeline, and documentation requirements. Aurore can route your enquiry to the appropriate commercial, regulatory, and scientific teams.</p>
          </div>
          <div class="enterprise-cta__actions">
            <a class="hl-btn hl-btn--primary" href="/#contact">Request RFQ</a>
            <a class="hl-btn hl-btn--outline" href="/regulatory/">View regulatory dashboard</a>
            <a class="hl-btn hl-btn--outline" href="/scientists/">Connect with scientists</a>
          </div>
        </div>
      </section>

    </main>`;
}

function renderAbout() {
  const milestones = [
    ["2017", "Founded with the establishment of the R&D facility in Hyderabad."],
    ["2018", "Acquired Jeedimetla API facility, formerly Mylan Unit-II."],
    ["2019", "Greenfield Kazhipally site initiated — Aurore's largest operating site."],
    ["2020", "Phase I production began with approximately 200 KL reactor capacity."],
    ["2021", "Kazhipally expanded; combined capacity reaching ~890 KL."]
  ];

  return `
    <main>

      <!-- ═══ PAGE HERO ═══ -->
      <section class="ph-hero">
        <div class="ph-hero__glow" aria-hidden="true"></div>
        <div class="shell ph-hero__inner">
          <span class="hl-eyebrow ph-hero__eyebrow">About Aurore</span>
          <h1 class="ph-hero__title">A pure-play API partner<br>built on process chemistry.</h1>
          <p class="ph-hero__body">Founded in 2017. Built around ingenuity, reliability, collaboration, and agility — with 60+ commercial APIs across 70+ countries.</p>
        </div>
      </section>

      <!-- ═══ WHO WE ARE ═══ -->
      <section class="hl-section">
        <div class="shell hl-split">
          <div>
            <span class="hl-eyebrow reveal-up">Who we are</span>
            <h2 class="hl-section__title reveal-up" style="--delay:0.1s">High-quality APIs for<br>regulated global markets.</h2>
            <p class="hl-section__body reveal-up" style="--delay:0.18s">
              Aurore Life Sciences is a pure-play API and intermediates manufacturer with a singular focus on quality, supply chain reliability, and regulatory depth. We operate two GMP-compliant manufacturing sites in Hyderabad, supported by dedicated R&D infrastructure and a team of 60+ scientists.
            </p>
            <div class="ab-stat-row reveal-up" style="--delay:0.26s">
              <div class="ab-stat-row__item">
                <span class="ab-stat-row__num">2017</span>
                <span class="ab-stat-row__label">Founded</span>
              </div>
              <div class="ab-stat-row__item">
                <span class="ab-stat-row__num">60+</span>
                <span class="ab-stat-row__label">Commercial APIs</span>
              </div>
              <div class="ab-stat-row__item">
                <span class="ab-stat-row__num">70+</span>
                <span class="ab-stat-row__label">Countries served</span>
              </div>
              <div class="ab-stat-row__item">
                <span class="ab-stat-row__num">122+</span>
                <span class="ab-stat-row__label">DMFs filed</span>
              </div>
            </div>
          </div>
          <div class="ab-timeline reveal-fade" style="--delay:0.22s">
            ${milestones.map(([year, text]) => `
              <div class="ab-timeline__item">
                <p class="ab-timeline__year">${year}</p>
                <p class="ab-timeline__text">${text}</p>
              </div>`).join("")}
          </div>
        </div>
      </section>

      <!-- ═══ VALUES · dark section ═══ -->
      <section class="hl-section hl-section--dark">
        <div class="shell">
          <div class="hl-section-head reveal-up">
            <span class="hl-eyebrow hl-eyebrow--dim">Values</span>
            <h2 class="hl-section__title hl-section__title--light">The operating culture<br>buyers need to see.</h2>
            <p class="hl-section__body hl-section__body--dim">
              Four principles that govern how Aurore designs processes, partners with customers, and delivers supply.
            </p>
          </div>
          <div class="ab-value-grid">
            ${[
              ["01", "Ingenuity",      "Resourceful chemistry and practical problem solving in every process decision."],
              ["02", "Reliability",    "Commitments kept through transparent, disciplined operations at commercial scale."],
              ["03", "Collaboration",  "Shared technical ownership with customers and partners across the supply chain."],
              ["04", "Agility",        "Fast adaptation across R&D, scale-up, manufacturing, and global supply."]
            ].map(([num, title, body], i) => `
              <div class="ab-value-card reveal-up" style="--delay:${0.08 * i}s">
                <p class="ab-value-card__num">${num}</p>
                <h3 class="ab-value-card__title">${title}</h3>
                <p class="ab-value-card__body">${body}</p>
              </div>`).join("")}
          </div>
        </div>
      </section>

      <!-- ═══ AUTHORITY & TRUST · soft section ═══ -->
      <section class="hl-section hl-section--soft">
        <div class="shell">
          <div class="hl-section-head reveal-up">
            <span class="hl-eyebrow">Authority &amp; Trust</span>
            <h2 class="hl-section__title">Credibility expressed<br>structurally.</h2>
            <p class="hl-section__body">
              Supplier credibility lives in evidence — DMF counts, inspections, facilities, and scientist profiles visible as dedicated pages, not buried copy.
            </p>
          </div>
          <div class="ab-authority-grid">
            ${[
              { num: regulatoryDashboard.dmfCount, label: "DMFs Filed",        sub: "Quarterly dashboard with approvals, audit history, and market-specific trust signals.", href: "/regulatory/" },
              { num: String(scientists.length),    label: "Scientist Profiles", sub: "Scientific leadership authority pages for E-E-A-T and technical buyer confidence.",    href: "/scientists/" },
              { num: String(facilities.length),    label: "GMP Facilities",     sub: "Per-facility pages with capacity, certifications, and inspection narrative.",           href: "/facilities/jeedimetla/" },
              { num: String(markets.length),       label: "Market Pages",       sub: "Regional landing pages for long-tail SEO and buyer-specific procurement pathways.",     href: "/markets/north-america/" }
            ].map(({ num, label, sub, href }, i) => `
              <a class="ab-authority-card reveal-up" href="${href}" style="--delay:${0.09 * i}s">
                <span class="ab-authority-card__num">${num}</span>
                <div>
                  <p class="ab-authority-card__label">${label}</p>
                  <p class="ab-authority-card__sub">${sub}</p>
                </div>
              </a>`).join("")}
          </div>
        </div>
      </section>

      <!-- ═══ CTA BANNER ═══ -->
      <section class="hl-cta-banner">
        <div class="hl-cta-banner__glow" aria-hidden="true"></div>
        <div class="shell hl-cta-banner__inner reveal-up">
          <div>
            <h2 class="hl-cta-banner__title">Ready to qualify Aurore<br>as your API supplier?</h2>
            <p class="hl-cta-banner__sub">Start with an RFQ, a sample request, or a conversation with our regulatory team.</p>
          </div>
          <div class="hl-cta-banner__actions">
            <a class="hl-btn hl-btn--primary" href="/regulatory/">Request RFQ</a>
            <a class="hl-btn hl-btn--outline" href="/scientists/">Meet our scientists</a>
          </div>
        </div>
      </section>

    </main>`;
}

function renderProducts() {
  const visible = filteredProducts();
  return `
    <main>

      <!-- ═══ PAGE HERO ═══ -->
      <section class="ph-hero">
        <div class="ph-hero__glow" aria-hidden="true"></div>
        <div class="shell ph-hero__inner">
          <span class="hl-eyebrow ph-hero__eyebrow">API Portfolio</span>
          <h1 class="ph-hero__title">60+ commercial APIs.<br>Filed across global markets.</h1>
          <p class="ph-hero__body">
            Search by molecule name, filing type, or therapeutic category. Every product links to its own specification page — built for procurement screening and supplier qualification.
          </p>
        </div>
      </section>

      <!-- ═══ FILTER TOOLBAR ═══ -->
      <div class="prd-toolbar">
        <div class="shell prd-toolbar__inner">
          <label class="prd-toolbar__search-wrap">
            <span>Search molecule, filing, or category</span>
            <input id="productSearch" type="search" value="${productQuery}" placeholder="Valacyclovir, CEP, anti-diabetic…" />
          </label>
          <label class="prd-toolbar__filter-wrap">
            <span>Therapeutic area</span>
            <select id="therapyFilter">
              ${therapeuticAreas.map((area) => `<option ${area === productTherapy ? "selected" : ""}>${area}</option>`).join("")}
            </select>
          </label>
          <span class="prd-count">${visible.length}<br>products</span>
        </div>
      </div>

      <!-- ═══ PRODUCT GRID ═══ -->
      <section style="padding: 52px 0 100px">
        <div class="shell product-grid">
          ${visible.map((product) => renderApiCard(product)).join("") || `<p class="empty-state">No products match your current filter.</p>`}
        </div>
      </section>

    </main>`;
}

function renderCdmo() {
  const steps = [
    ["Discovery",     "Route evaluation &amp; feasibility"],
    ["Process Dev",   "Optimisation &amp; impurity control"],
    ["Scale-up",      "Lab-to-pilot transfer"],
    ["Pilot Batch",   "Registration-ready supply"],
    ["Registration",  "DMF, CEP, ASMF filing"],
    ["Commercial",    "Long-term API supply"]
  ];

  return `
    <main>

      <!-- ═══ PAGE HERO ═══ -->
      <section class="ph-hero">
        <div class="ph-hero__glow" aria-hidden="true"></div>
        <div class="shell ph-hero__inner">
          <span class="hl-eyebrow ph-hero__eyebrow">CDMO Services</span>
          <h1 class="ph-hero__title">From process development<br>to commercial transfer.</h1>
          <p class="ph-hero__body">
            End-to-end contract development and manufacturing — route scouting, scale-up, registration documentation, and commercial API supply for regulated markets worldwide.
          </p>
          <div class="ph-hero__actions">
            ${pageButton("Discuss a project", "contact", "hl-btn hl-btn--primary")}
            <a class="hl-btn hl-btn--outline" href="/regulatory/">View regulatory dashboard</a>
          </div>
        </div>
      </section>

      <!-- ═══ PROCESS TRACK ═══ -->
      <section class="hl-section">
        <div class="shell">
          <div class="hl-section-head reveal-up">
            <span class="hl-eyebrow">Development Pathway</span>
            <h2 class="hl-section__title">From concept to<br>commercial supply.</h2>
            <p class="hl-section__body">A structured six-stage pathway from initial feasibility through commercial manufacturing — with regulatory documentation embedded at every step.</p>
          </div>
          <div class="cdmo-process">
            ${steps.map(([label, sub], i) => `
              <div class="cdmo-step reveal-up" style="--delay:${0.08 * i}s">
                <div class="cdmo-step__num">${i + 1}</div>
                <span class="cdmo-step__label">${label}</span>
                <span class="cdmo-step__sub">${sub}</span>
              </div>`).join("")}
          </div>
        </div>
      </section>

      <!-- ═══ TECHNICAL CAPABILITIES · dark section ═══ -->
      <section class="hl-section hl-section--dark">
        <div class="shell hl-split" style="align-items:start">
          <div>
            <span class="hl-eyebrow hl-eyebrow--dim reveal-up">Technical Capabilities</span>
            <h2 class="hl-section__title hl-section__title--light reveal-up" style="--delay:0.1s">
              Built for serious<br>technical evaluation.
            </h2>
            <table class="cdmo-spec reveal-up" style="--delay:0.18s">
              <tbody>
                <tr>
                  <th>Project types</th>
                  <td>NCE intermediates, APIs, route scouting, tech transfer, lifecycle management</td>
                </tr>
                <tr>
                  <th>Analytical</th>
                  <td>UHPLC, NMR, mass spectrometry, X-ray crystallography, impurity profiling</td>
                </tr>
                <tr>
                  <th>Scale</th>
                  <td>Lab development through pilot and commercial manufacturing (~890 KL capacity)</td>
                </tr>
                <tr>
                  <th>Regulatory</th>
                  <td>DMF, CEP, ASMF/EDMF and global market documentation — 122+ filings to date</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="cdmo-case reveal-fade" style="--delay:0.22s">
            <span class="cdmo-case__tag">Case study</span>
            <h3 class="cdmo-case__title">European generics launch support</h3>
            <p class="cdmo-case__body">
              An anonymised partner moved from route optimisation to registration-ready documentation with Aurore's R&D and manufacturing teams aligned on cost control, impurity profiling, and supply resilience across three markets.
            </p>
            ${pageButton("Discuss a CDMO project", "contact", "hl-btn hl-btn--yellow")}
          </div>
        </div>
      </section>

      <!-- ═══ WHY AURORE FOR CDMO · soft section ═══ -->
      <section class="hl-section hl-section--soft">
        <div class="shell">
          <div class="hl-section-head reveal-up">
            <span class="hl-eyebrow">Why Aurore for CDMO</span>
            <h2 class="hl-section__title">Science and scale<br>in one partnership.</h2>
          </div>
          <div class="cdmo-cap-grid">
            ${[
              ["Backward Integration",  "In-house intermediate capability means cost control and supply continuity across the full development-to-commercial pathway."],
              ["Regulatory Depth",      "122+ DMFs filed. Documentation support for USFDA, EDQM, WHO, KFDA, ANVISA, and COFEPRIS markets."],
              ["R&D Infrastructure",    "60 process chemists, 65 analytical experts, and 10 doctorates — route design and impurity profiling under one roof."],
              ["Manufacturing Scale",   "~890 KL combined reactor capacity across two GMP-compliant facilities in Hyderabad, India."]
            ].map(([title, body], i) => `
              <div class="cdmo-cap-card reveal-up" style="--delay:${0.09 * i}s">
                <h3>${title}</h3>
                <p>${body}</p>
              </div>`).join("")}
          </div>
        </div>
      </section>

      <!-- ═══ CTA BANNER ═══ -->
      <section class="hl-cta-banner">
        <div class="hl-cta-banner__glow" aria-hidden="true"></div>
        <div class="shell hl-cta-banner__inner reveal-up">
          <div>
            <h2 class="hl-cta-banner__title">Have a CDMO project<br>in mind?</h2>
            <p class="hl-cta-banner__sub">Molecule, market, timeline — share your brief and our development team will respond within 48 hours.</p>
          </div>
          <div class="hl-cta-banner__actions">
            ${pageButton("Start a conversation", "contact", "hl-btn hl-btn--primary")}
            <a class="hl-btn hl-btn--outline" href="/scientists/">Meet our scientists</a>
          </div>
        </div>
      </section>

    </main>`;
}

function renderPeptides() {
  return `
    <main>
      ${pageHero("Peptides", "Peptide development and supply pathway", "A focused entry point for peptide API, intermediate, and custom development conversations.")}
      <section class="section">
        <div class="shell split api-split">
          <div>
            <span class="eyebrow">Peptide capabilities</span>
            <h2>Built for early technical qualification</h2>
            <p>This tab gives peptide buyers a dedicated route into the portfolio while detailed molecule pages and qualification content are expanded.</p>
            <div class="proof-grid">
              <article><h3>Custom development</h3><p>Route evaluation, process development, and analytical method support for peptide programs.</p></article>
              <article><h3>Documentation path</h3><p>RFQ, technical pack, sample, and regulatory-readiness requests can be routed through the structured form.</p></article>
              <article><h3>Scale-up conversation</h3><p>Commercial and pilot requirements can be captured with market, quantity, and timeline context.</p></article>
              <article><h3>Scientific review</h3><p>Technical questions can be triaged into the R&D and regulatory review workflow.</p></article>
            </div>
          </div>
          <aside class="detail-panel">
            <h3>Start a peptide RFQ</h3>
            <p>Use the RFQ form to preserve molecule, market, quantity, and requested documentation context.</p>
            ${pageButton("Request peptide RFQ", "contact", "btn btn-primary")}
          </aside>
        </div>
      </section>
    </main>`;
}

function renderManufacturing() {
  return `
    <main>
      ${pageHero("Manufacturing Units", "State-of-the-art GMP sites in Hyderabad", "The site now clarifies the named operating sites and approximately 890 KL combined capacity.")}
      <section class="section">
        <div class="shell facility-grid">
          ${facilities
            .map(
              (facility) => `
                <article class="facility-card">
                  <img src="${facility.image}" alt="${facility.name} manufacturing unit" />
                  <div>
                    <span>${facility.label}</span>
                    <h2>${facility.name}</h2>
                    <p>${facility.narrative}</p>
                    <a class="text-button" href="/facilities/${facility.slug}/">Open facility page</a>
                  </div>
                </article>`
            )
            .join("")}
        </div>
      </section>
      <section class="section muted-section">
        <div class="shell card-grid five">
          ${["Uncompromising Quality", "Innovation-Driven Approach", "Regulatory Excellence", "Collaborative Partnerships", "Global Reach"].map((title) => `<article class="feature-card"><h3>${title}</h3><p>Evidence-led manufacturing content that supports supplier shortlisting and technical confidence.</p></article>`).join("")}
        </div>
      </section>
    </main>`;
}

function renderRnd() {
  return `
    <main>
      ${pageHero("Scientists", "Scientific leadership and process-development authority", "Public scientific leadership strengthens route-scouting confidence, technical due diligence, and regulated-market buyer trust.")}
      <section class="section">
        <div class="shell split">
          <div>
            <span class="eyebrow">Research nucleus</span>
            <h2>Process chemistry backed by analytical firepower</h2>
            <p>Aurore's R&D teams use advanced instrumentation and practical process expertise to optimise routes, control impurities, and support market-ready filings.</p>
            <div class="mini-metrics">
              <div><strong>60</strong><span>R&D scientists</span></div>
              <div><strong>65</strong><span>Analytical experts</span></div>
              <div><strong>10</strong><span>Doctorates</span></div>
            </div>
            <div class="hero-actions section-top-gap">
              <a class="btn btn-primary" href="/scientists/">Open scientists page</a>
              <a class="btn btn-secondary" href="/regulatory/">View regulatory dashboard</a>
            </div>
          </div>
          <aside class="image-panel">
            <img src="${rndImage}" alt="Aurore R&D laboratory" />
          </aside>
        </div>
      </section>
    </main>`;
}

function renderInsights() {
  const featured = findProductBySlug("valacyclovir-hcl");
  return `
    <main>
      ${pageHero("Insights", "Technical insights for API buyers", "Practical guidance on API filing strategy, impurity control, backward integration, and supplier qualification, written for procurement, regulatory, and technical teams.")}
      <section class="section">
        <div class="shell card-grid three">
          ${insights
            .map((insight) => `<article class="insight-card"><span>${insight.category}</span><h3>${insight.title}</h3><p>${insight.excerpt}</p><a class="text-button" href="/insights/${insight.slug}/">Read article</a></article>`)
            .join("")}
        </div>
        <div class="shell section-head section-top-gap">
          <span class="eyebrow">Internal linking</span>
          <h2>Move from article to qualification path</h2>
          <p>Each insight connects directly into product pages, therapy hubs, facilities, and RFQ actions so buyers can keep moving after they finish reading.</p>
          <div class="hero-actions">
            <a class="btn btn-secondary" href="${apiHref(featured.slug)}">Open ${featured.name}</a>
            <a class="btn btn-primary" href="/#contact">Request technical support</a>
          </div>
        </div>
        <div class="shell section-head section-top-gap">
          <span class="eyebrow">Editorial hub</span>
          <h2>Browse the full insights section</h2>
          <a class="btn btn-secondary" href="/insights/">Open insights hub</a>
        </div>
      </section>
    </main>`;
}

function renderCareers() {
  return `
    <main>
      ${pageHero("Careers", "Build meaningful API science at commercial scale", "A dedicated route for future hiring content, scientist roles, manufacturing careers, and early talent programs.")}
      <section class="section">
        <div class="shell split api-split">
          <div>
            <span class="eyebrow">Join Aurore</span>
            <h2>Careers in API science and manufacturing</h2>
            <p>Explore careers across process chemistry, analytical science, quality, regulatory affairs, manufacturing, and business development.</p>
            <div class="proof-grid">
              <article><h3>R&D and analytical science</h3><p>Process chemistry, impurity profiling, method development, and scale-up roles.</p></article>
              <article><h3>Manufacturing and quality</h3><p>Plant operations, quality systems, EHS, and regulatory documentation pathways.</p></article>
            </div>
          </div>
          <aside class="detail-panel">
            <h3>Career enquiries</h3>
            <p>For the demo, career interest routes through the contact page until a dedicated ATS or job board is connected.</p>
            ${pageButton("Contact HR", "contact", "btn btn-primary")}
          </aside>
        </div>
      </section>
    </main>`;
}

function renderContact() {
  const selectedProduct = selectedProductFromUrl();
  const selectedMolecule = selectedProduct?.name || "";
  return `
    <main>

      <!-- ═══ PAGE HERO ═══ -->
      <section class="ph-hero">
        <div class="ph-hero__glow" aria-hidden="true"></div>
        <div class="shell ph-hero__inner">
          <span class="hl-eyebrow ph-hero__eyebrow">Contact &amp; RFQ</span>
          <h1 class="ph-hero__title">Start a supplier<br>conversation.</h1>
          <p class="ph-hero__body">RFQ, documentation request, sample, or scientist connection — your enquiry routes directly to the regional BD desk and Regulatory Affairs.</p>
        </div>
      </section>

      <!-- ═══ CONTACT GRID ═══ -->
      <section class="hl-section">
        <div class="shell ct-grid">

          <!-- Form -->
          <form class="ct-form" data-form="rfq"
            data-context="${selectedMolecule || "commercial RFQ"}"
            data-request-type="Commercial RFQ / documentation request"
            data-route="the regional BD desk and Regulatory Affairs"
            data-reference-prefix="RFQ">
            <div class="ct-form__head">
              <p class="ct-form__title">Request for Quotation</p>
              <p class="ct-form__sub">All required fields are needed to route your enquiry accurately.</p>
            </div>
            <div class="ct-form__body">
              ${selectedMolecule ? `<p class="form-context">Pre-selected molecule: <strong>${selectedMolecule}</strong></p>` : ""}
              <div class="ct-form__row">
                <label><span>Company name *</span><input name="company" required placeholder="Your pharmaceutical company" /></label>
                <label><span>Contact person *</span><input name="name" required placeholder="Full name" /></label>
              </div>
              <div class="ct-form__row">
                <label><span>Email *</span><input type="email" name="email" required placeholder="name@company.com" /></label>
                <label><span>Phone</span><input name="phone" placeholder="+91 00000 00000" /></label>
              </div>
              <div class="ct-form__row">
                <label><span>Molecule *</span><input name="molecule" required value="${selectedMolecule}" placeholder="Acyclovir, Valacyclovir, CDMO project…" /></label>
                <label><span>Quantity</span><input name="quantity" placeholder="100 kg, 1 MT, pilot batch…" /></label>
              </div>
              <div class="ct-form__row">
                <label><span>Grade / specification</span><input name="grade" placeholder="USP, EP, IP, custom" /></label>
                <label><span>Destination market *</span><input name="market" required placeholder="US, EU, India, LATAM…" /></label>
              </div>
              <div class="ct-form__row">
                <label><span>Request type</span><input name="request_type" placeholder="RFQ, DMF, COA, scientist meeting…" /></label>
                <label><span>Regulatory focus</span><input name="regulatory_focus" placeholder="USDMF, CEP, WHO, COFEPRIS…" /></label>
              </div>
              <label>
                <span>Timeline and notes</span>
                <textarea name="notes" placeholder="Regulatory requirements, sample request, shipment timeline, impurity specs…"></textarea>
              </label>
              <button class="hl-btn hl-btn--primary ct-form__submit" type="submit">Submit RFQ</button>
              <strong class="form-note" role="status" tabindex="-1" hidden></strong>
            </div>
          </form>

          <!-- Right panel -->
          <div class="ct-panel">
            <div class="ct-info">
              <h2 class="ct-info__title">Get in touch</h2>
              <div class="ct-info__item">
                <span class="ct-info__label">Phone</span>
                <a class="ct-info__val" href="tel:04068303211">040-68303211</a>
              </div>
              <div class="ct-info__item">
                <span class="ct-info__label">Email</span>
                <a class="ct-info__val" href="mailto:info@aurorels.com">info@aurorels.com</a>
              </div>
              <div class="ct-info__item">
                <span class="ct-info__label">LinkedIn</span>
                <a class="ct-info__val" href="https://linkedin.com/company/aurore-life-sciences" target="_blank" rel="noreferrer">Aurore Life Sciences</a>
              </div>
              <div class="ct-info__item">
                <span class="ct-info__label">Corporate office</span>
                <span class="ct-info__val ct-info__val--plain">Plot #68, 69, 2nd Floor, Jubilee Heights, Madhapur, Hyderabad — 500081</span>
              </div>
            </div>
            <div class="ct-alt">
              <h3 class="ct-alt__title">Connect with a scientist</h3>
              <p class="ct-alt__body">Technical questions about a specific molecule, process, or filing? Our R&D and regulatory teams can respond directly.</p>
              <a class="hl-btn hl-btn--primary" href="/scientists/">Meet our scientists →</a>
            </div>
          </div>

        </div>
      </section>

    </main>`;
}

function pageHero(kicker, title, body) {
  return `
    <section class="page-hero">
      <div class="shell">
        <span class="eyebrow">${kicker}</span>
        <h1>${title}</h1>
        <p>${body}</p>
      </div>
    </section>`;
}

function renderPage() {
  const pages = {
    home: renderHome,
    about: renderAbout,
    products: renderProducts,
    cdmo: renderCdmo,
    peptides: renderPeptides,
    manufacturing: renderManufacturing,
    rnd: renderRnd,
    insights: renderInsights,
    careers: renderCareers,
    contact: renderContact
  };
  return pages[activePage]();
}

/* ── Scroll-reveal: adds .is-visible when elements enter viewport ── */
function initScrollReveal() {
  if (!("IntersectionObserver" in window)) {
    document.querySelectorAll(".reveal-up, .reveal-fade").forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
  );
  document.querySelectorAll(".reveal-up, .reveal-fade").forEach((el) => observer.observe(el));
}

/* ── Count-up: animates [data-count] numbers when they scroll into view ── */
function initCountUp() {
  if (!("IntersectionObserver" in window)) return;
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        if (!target) return;
        let startTime = null;
        const duration = 1500;
        function step(ts) {
          if (!startTime) startTime = ts;
          const p = Math.min((ts - startTime) / duration, 1);
          el.textContent = Math.floor(easeOutCubic(p) * target);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
        observer.unobserve(el);
      });
    },
    { threshold: 0.3 }
  );
  document.querySelectorAll("[data-count]").forEach((el) => observer.observe(el));
}

function initHeroCarousel() {
  const root = document.querySelector("[data-hero-carousel]");
  if (!root) return;

  const slides = Array.from(root.querySelectorAll("[data-hero-slide]"));
  const dots = Array.from(root.querySelectorAll("[data-hero-dot]"));
  const prev = root.querySelector("[data-hero-prev]");
  const next = root.querySelector("[data-hero-next]");
  const intervalMs = 5000;
  let active = 0;
  let timer = null;
  let touchStartX = 0;
  let touchStartY = 0;

  function setActive(index) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const isActive = i === active;
      slide.classList.toggle("is-active", isActive);
      slide.setAttribute("aria-hidden", String(!isActive));
      slide.querySelectorAll("a, button").forEach((element) => {
        element.tabIndex = isActive ? 0 : -1;
      });
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === active);
      dot.setAttribute("aria-current", i === active ? "true" : "false");
    });
  }

  function stop() {
    if (timer) window.clearInterval(timer);
    timer = null;
  }

  function start() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    stop();
    timer = window.setInterval(() => setActive(active + 1), intervalMs);
  }

  prev?.addEventListener("click", () => {
    setActive(active - 1);
    start();
  });

  next?.addEventListener("click", () => {
    setActive(active + 1);
    start();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      setActive(parseInt(dot.dataset.heroDot, 10));
      start();
    });
  });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", start);
  root.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
    stop();
  }, { passive: true });
  root.addEventListener("touchend", (event) => {
    const touch = event.changedTouches[0];
    const diffX = touch.clientX - touchStartX;
    const diffY = touch.clientY - touchStartY;
    if (Math.abs(diffX) > 48 && Math.abs(diffX) > Math.abs(diffY)) {
      setActive(active + (diffX < 0 ? 1 : -1));
    }
    start();
  }, { passive: true });

  setActive(0);
  start();
}

function attachEvents() {
  document.querySelectorAll("[data-page]").forEach((element) => {
    element.addEventListener("click", () => setPage(element.dataset.page));
  });

  const productSearch = document.querySelector("#productSearch");
  productSearch?.addEventListener("input", (event) => {
    productQuery = event.target.value;
    render();
    document.querySelector("#productSearch")?.focus();
  });

  const therapyFilter = document.querySelector("#therapyFilter");
  therapyFilter?.addEventListener("change", (event) => {
    productTherapy = event.target.value;
    render();
  });

  attachCommonUi();
  initHeroCarousel();
  initScrollReveal();
  initCountUp();
}

function render() {
  app.innerHTML = `${renderHeader({ activePage })}${renderPage()}${renderFooter()}`;
  attachEvents();
}

window.addEventListener("hashchange", () => {
  const page = window.location.hash.replace("#", "");
  activePage = isKnownPage(page) ? page : "home";
  document.title = titleMap[activePage];
  render();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

activePage = window.location.hash.replace("#", "") || "home";
render();
window.scrollTo({ top: 0 });
