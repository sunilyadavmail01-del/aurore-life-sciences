import "./styles.css";

import {
  apiHref,
  approvals,
  capabilityFaqs,
  facilities,
  findFacilityBySlug,
  findIntermediateFamilyBySlug,
  findInsightBySlug,
  findMarketBySlug,
  findProductBySlug,
  findTherapyHubBySlug,
  intermediateFamilies,
  intermediateHref,
  intermediates,
  insights,
  logoUrl,
  markets,
  products,
  regulatoryDashboard,
  scientists,
  therapyHubs,
  therapeuticAreas
} from "./site-data.js";
import { attachCommonUi, renderApiCard, renderApprovals, renderFooter, renderHeader } from "./site-shell.js";

const app = document.querySelector("#app");
const pageType = window.__PAGE_TYPE__;
const pageSlug = window.__PAGE_SLUG__ || "";

function pageShell(activePage, main) {
  app.innerHTML = `${renderHeader({ activePage, isStaticPage: true })}${main}${renderFooter({ isStaticPage: true })}`;
  attachCommonUi();
}

function capabilityFinderMarkup() {
  const regions = ["All regions", ...new Set(products.flatMap((product) => product.regulatoryGeographies))];
  return `
    <section class="section muted-section">
      <div class="shell section-head">
        <span class="eyebrow">Capability finder</span>
        <h2>Filter by therapy, geography, and integration</h2>
        <p>The audit called for a procurement-friendly capability finder. This version lets buyers narrow the API library before they request RFQs or connect with a scientist.</p>
      </div>
      <div class="shell capability-finder">
        <label>
          <span>Search molecule</span>
          <input id="finderSearch" type="search" placeholder="Acyclovir, Valacyclovir, anti-diabetic..." />
        </label>
        <label>
          <span>Therapy area</span>
          <select id="finderTherapy">
            ${therapeuticAreas.map((area) => `<option>${area}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>Regulatory geography</span>
          <select id="finderRegion">
            ${regions.map((region) => `<option>${region}</option>`).join("")}
          </select>
        </label>
        <label>
          <span>Backward integration</span>
          <select id="finderIntegration">
            <option>All profiles</option>
            <option>Backward integrated</option>
            <option>Selective integration</option>
          </select>
        </label>
      </div>
      <div class="shell product-grid" id="finderResults">
        ${products.map((product) => renderApiCard(product)).join("")}
      </div>
    </section>`;
}

function attachCapabilityFinder() {
  const results = document.querySelector("#finderResults");
  const search = document.querySelector("#finderSearch");
  const therapy = document.querySelector("#finderTherapy");
  const region = document.querySelector("#finderRegion");
  const integration = document.querySelector("#finderIntegration");
  if (!results || !search || !therapy || !region || !integration) {
    return;
  }
  const rerender = () => {
    const query = search.value.trim().toLowerCase();
    const therapyValue = therapy.value;
    const regionValue = region.value;
    const integrationValue = integration.value;
    const filtered = products.filter((product) => {
      const queryMatch = [product.name, product.category, product.filings, product.summary, product.casNumber].join(" ").toLowerCase().includes(query);
      const therapyMatch = therapyValue === "All categories" || product.category === therapyValue;
      const regionMatch = regionValue === "All regions" || product.regulatoryGeographies.includes(regionValue);
      const integrationMatch =
        integrationValue === "All profiles" ||
        (integrationValue === "Backward integrated" && product.backwardIntegrated.startsWith("Yes")) ||
        (integrationValue === "Selective integration" && !product.backwardIntegrated.startsWith("Yes"));
      return queryMatch && therapyMatch && regionMatch && integrationMatch;
    });
    results.innerHTML = filtered.length
      ? filtered.map((product) => renderApiCard(product)).join("")
      : `<p class="empty-state">No APIs match the current procurement filters.</p>`;
  };
  [search, therapy, region, integration].forEach((element) => element.addEventListener("input", rerender));
  therapy.addEventListener("change", rerender);
  region.addEventListener("change", rerender);
  integration.addEventListener("change", rerender);
}

function renderProductsIndexPage() {
  pageShell(
    "products",
    `
      <main>
        <section class="page-hero api-hero">
          <div class="shell">
            <span class="eyebrow">API library</span>
            <h1>Individually indexable API portfolio</h1>
            <p>Each product now has its own supplier-ready page with CAS, filing context, facility linkage, related APIs, and dual conversion paths for regulatory and technical buyers.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="/regulatory/">Request RFQ</a>
              <a class="btn btn-secondary" href="/scientists/">Connect with a Scientist</a>
            </div>
          </div>
        </section>
        ${renderApprovals(approvals)}
        ${capabilityFinderMarkup()}
        <section class="section">
          <div class="shell split api-split">
            <div>
              <span class="eyebrow">DMF library</span>
              <h2>Gated request flow for DMF, COA, and capability packs</h2>
              <p>The audit recommended a lead-capture gate for technical documentation. This mock routes the buyer to a structured request instead of a dead-end contact link.</p>
              <div class="proof-grid">
                <article><h3>Request RFQ</h3><p>Trigger regulatory documentation review for a specific molecule or market.</p></article>
                <article><h3>Request COA / COE</h3><p>Signal quality-document interest without exposing sensitive files publicly.</p></article>
                <article><h3>Request plant tour</h3><p>Invite virtual or in-person facility qualification discussions.</p></article>
                <article><h3>Request scientist meeting</h3><p>Route technical questions directly to the scientific leadership structure.</p></article>
              </div>
            </div>
            <form class="rfq-form" data-form="rfq" data-context="API documentation pack" data-request-type="RFQ / COA documentation pack" data-route="Regulatory Affairs document review" data-reference-prefix="RFQ">
              <h2>Request technical documentation</h2>
              <label><span>Company name</span><input name="company" required placeholder="Your pharmaceutical company" /></label>
              <label><span>Email</span><input type="email" name="email" required placeholder="name@company.com" /></label>
              <label><span>API / therapy focus</span><input name="api_focus" placeholder="Acyclovir, antiretroviral portfolio, anti-diabetic range..." /></label>
              <label><span>Requested pack</span><input name="requested_pack" placeholder="DMF, COA, capability brochure, plant tour..." /></label>
              <label><span>Notes</span><textarea name="notes" placeholder="Market, timeline, qualification stage, required approvals..."></textarea></label>
              <button class="btn btn-primary" type="submit">Request RFQ pack</button>
              <strong class="form-note" role="status" tabindex="-1" hidden></strong>
            </form>
          </div>
        </section>
      </main>`
  );
  attachCapabilityFinder();
}

function renderIntermediateFamilyCard(family) {
  const casPreview = family.intermediates
    .map((item) => item.casNumber)
    .filter((value) => value && value !== "NA")
    .slice(0, 3)
    .join(", ");
  return `
    <article class="product-card">
      <div>
        <span>Intermediate family</span>
        <h3>${family.apiName}</h3>
      </div>
      <dl>
        <dt>Listed intermediates</dt><dd>${family.intermediates.length}</dd>
        <dt>CAS examples</dt><dd>${casPreview || "Available on request"}</dd>
      </dl>
      <div class="product-card-actions">
        <a class="btn btn-secondary" href="${intermediateHref(family.slug)}">View intermediates</a>
        <a class="text-button" href="/#contact">Request RFQ</a>
      </div>
    </article>`;
}

function renderIntermediatesIndexPage() {
  pageShell(
    "products",
    `
      <main>
        <section class="page-hero api-hero">
          <div class="shell">
            <span class="eyebrow">Intermediate library</span>
            <h1>Indexable intermediates for API sourcing</h1>
            <p>Aurore's product list includes ${intermediates.length} intermediates across ${intermediateFamilies.length} API families, with chemical names and CAS numbers captured from the official product PDF.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="/#contact">Request RFQ</a>
              <a class="btn btn-secondary" href="/products/">Browse APIs</a>
            </div>
          </div>
        </section>
        <section class="section muted-section">
          <div class="shell section-head">
            <span class="eyebrow">PDF-derived index</span>
            <h2>${intermediateFamilies.length} intermediate families</h2>
            <p>Each family page groups the listed intermediates by associated API, keeping the intermediate portfolio crawlable and easier for procurement teams to evaluate.</p>
          </div>
          <div class="shell product-grid">
            ${intermediateFamilies.map((family) => renderIntermediateFamilyCard(family)).join("")}
          </div>
        </section>
      </main>`
  );
}

function renderIntermediateFamilyPage() {
  const family = findIntermediateFamilyBySlug(pageSlug);
  if (!family) {
    renderNotFound("products");
    return;
  }
  const linkedProduct = products.find((product) => product.name.toLowerCase() === family.apiName.toLowerCase());
  pageShell(
    "products",
    `
      <main>
        <section class="page-hero api-hero">
          <div class="shell">
            <nav class="breadcrumb"><a href="/">Home</a><span>/</span><a href="/intermediates/">Intermediates</a><span>/</span><strong>${family.apiName}</strong></nav>
            <span class="eyebrow">Intermediate family</span>
            <h1>${family.apiName} intermediates</h1>
            <p>${family.summary}</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="/#contact">Request RFQ</a>
              ${linkedProduct ? `<a class="btn btn-secondary" href="${apiHref(linkedProduct.slug)}">View API page</a>` : `<a class="btn btn-secondary" href="/products/">Browse APIs</a>`}
            </div>
          </div>
        </section>
        <section class="section">
          <div class="shell section-head">
            <span class="eyebrow">Intermediate table</span>
            <h2>Chemical names and CAS numbers</h2>
            <p>Rows are sourced from the Aurore Life Sciences product list PDF, Intermediates section.</p>
          </div>
          <div class="shell table-wrap">
            <table class="spec-table">
              <thead>
                <tr><th>#</th><th>Intermediate chemical name</th><th>CAS No.</th></tr>
              </thead>
              <tbody>
                ${family.intermediates
                  .map((item) => `<tr><td>${item.sourceNumber}</td><td>${item.chemicalName}</td><td>${item.casNumber}</td></tr>`)
                  .join("")}
              </tbody>
            </table>
          </div>
        </section>
        <section class="section muted-section">
          <div class="shell split api-split">
            <div>
              <span class="eyebrow">Sourcing path</span>
              <h2>Route intermediate enquiries with context</h2>
              <p>Use the RFQ form to include the API family, intermediate name, CAS number, quantity, market, and qualification timeline.</p>
            </div>
            <form class="rfq-form" data-form="rfq" data-context="${family.apiName} intermediates" data-request-type="Intermediate RFQ" data-route="Commercial Supply and Process Development" data-reference-prefix="RFQ">
              <h2>Request ${family.apiName}</h2>
              <label><span>Company name</span><input name="company" required placeholder="Your pharmaceutical company" /></label>
              <label><span>Email</span><input type="email" name="email" required placeholder="name@company.com" /></label>
              <label><span>Intermediate / CAS</span><input name="requested_document" placeholder="${family.intermediates[0].casNumber}" /></label>
              <label><span>Quantity and market</span><input name="timeline_market" placeholder="Pilot quantity, commercial supply, market..." /></label>
              <label><span>Notes</span><textarea name="notes" placeholder="Technical, regulatory, and procurement details...">${family.apiName} intermediates</textarea></label>
              <button class="btn btn-primary" type="submit">Request RFQ</button>
              <strong class="form-note" role="status" tabindex="-1" hidden></strong>
            </form>
          </div>
        </section>
      </main>`
  );
}

function renderApiPage() {
  const product = findProductBySlug(pageSlug);
  if (!product) {
    renderNotFound("products");
    return;
  }
  const facility = findFacilityBySlug(product.manufacturingFacility);
  const hub = therapyHubs.find((item) => item.name === product.category);
  const relatedProducts = products.filter((candidate) => candidate.category === product.category && candidate.slug !== product.slug).slice(0, 3);
  pageShell(
    "products",
    `
      <main>
        <section class="page-hero api-hero">
          <div class="shell">
            <nav class="breadcrumb"><a href="/">Home</a><span>/</span><a href="/products/">Products</a><span>/</span><strong>${product.name}</strong></nav>
            <span class="eyebrow">${product.category}</span>
            <h1>${product.name}</h1>
            <p>${product.summary}</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="/regulatory/">Request RFQ</a>
              <a class="btn btn-secondary" href="/scientists/">Connect with a Scientist</a>
            </div>
          </div>
        </section>
        ${renderApprovals(approvals)}
        <section class="section">
          <div class="shell split api-split">
            <div>
              <span class="eyebrow">Molecule overview</span>
              <h2>Template fields aligned to the audit</h2>
              <p>${product.mechanism}</p>
              <div class="proof-grid">
                ${product.highlights.map((item) => `<article><h3>Key point</h3><p>${item}</p></article>`).join("")}
              </div>
            </div>
            <aside class="detail-panel">
              <h3>${product.name}</h3>
              <dl class="detail-list">
                <dt>CAS number</dt><dd>${product.casNumber}</dd>
                <dt>Therapy area</dt><dd><a href="/therapy-areas/${hub.slug}/">${product.category}</a></dd>
                <dt>Mechanism</dt><dd>${product.mechanism}</dd>
                <dt>DMF status</dt><dd>${product.dmfStatus}</dd>
                <dt>Polymorph / form</dt><dd>${product.polymorph}</dd>
                <dt>Scale range</dt><dd>${product.scaleRange}</dd>
                <dt>Backward integrated</dt><dd>${product.backwardIntegrated}</dd>
                <dt>Manufacturing facility</dt><dd><a href="/facilities/${facility.slug}/">${facility.name}</a></dd>
              </dl>
            </aside>
          </div>
        </section>
        <section class="section muted-section">
          <div class="shell split api-split">
            <div>
              <span class="eyebrow">Linked architecture</span>
              <h2>Designed to interlink the whole buyer journey</h2>
              <table class="spec-table">
                <tbody>
                  <tr><th>Parent hub</th><td><a href="/therapy-areas/${hub.slug}/">${product.category}</a></td></tr>
                  <tr><th>Facility page</th><td><a href="/facilities/${facility.slug}/">${facility.name}</a></td></tr>
                  <tr><th>Regulatory dashboard</th><td><a href="/regulatory/">Audit history, DMF counts, and approval signals</a></td></tr>
                  <tr><th>Scientific route</th><td><a href="/scientists/">Meet the scientific leadership scaffold</a></td></tr>
                </tbody>
              </table>
            </div>
            <form class="rfq-form" data-form="rfq" data-context="${product.name}" data-request-type="Molecule RFQ" data-route="Regulatory Affairs and Commercial Supply" data-reference-prefix="RFQ">
              <h2>Request ${product.name}</h2>
              <label><span>Company name</span><input name="company" required placeholder="Your pharmaceutical company" /></label>
              <label><span>Email</span><input type="email" name="email" required placeholder="name@company.com" /></label>
              <label><span>Requested document</span><input name="requested_document" placeholder="DMF, COA, COE, capability note..." /></label>
              <label><span>Timeline and market</span><input name="timeline_market" placeholder="US launch, EU filing, pilot batch, sample request..." /></label>
              <label><span>Notes</span><textarea name="notes" placeholder="Technical, regulatory, and procurement details...">${product.name}</textarea></label>
              <button class="btn btn-primary" type="submit">Request RFQ</button>
              <strong class="form-note" role="status" tabindex="-1" hidden></strong>
            </form>
          </div>
        </section>
        <section class="section">
          <div class="shell section-head">
            <span class="eyebrow">Related APIs</span>
            <h2>Continue through the therapy portfolio</h2>
            <p>Every API page links to related products so the product architecture behaves like a true indexable library instead of a dead-end datasheet.</p>
          </div>
          <div class="shell product-grid">
            ${relatedProducts.map((item) => renderApiCard(item)).join("")}
          </div>
        </section>
      </main>`
  );
}

function renderFacilityPage() {
  const facility = findFacilityBySlug(pageSlug);
  if (!facility) {
    renderNotFound("manufacturing");
    return;
  }
  const relevantProducts = products.filter((product) => product.manufacturingFacility === facility.slug).slice(0, 6);
  pageShell(
    "manufacturing",
    `
      <main>
        <section class="page-hero api-hero">
          <div class="shell">
            <nav class="breadcrumb"><a href="/">Home</a><span>/</span><a href="/facilities/${facility.slug}/">Facilities</a><span>/</span><strong>${facility.name}</strong></nav>
            <span class="eyebrow">${facility.label}</span>
            <h1>${facility.name} Facility</h1>
            <p>${facility.narrative}</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="/regulatory/">Request audit pack</a>
              <a class="btn btn-secondary" href="/scientists/">Connect with a Scientist</a>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="shell split api-split">
            <aside class="image-panel"><img src="${facility.image}" alt="${facility.name} manufacturing facility" /></aside>
            <div>
              <span class="eyebrow">Facility facts</span>
              <h2>Capacity, certifications, and audit rhythm</h2>
              <div class="proof-grid">
                <article><h3>Reactor capacity</h3><p>${facility.capacity}</p></article>
                <article><h3>Primary focus</h3><p>${facility.focus}</p></article>
                <article><h3>Certifications</h3><p>${facility.certifications.join(", ")}</p></article>
                <article><h3>Audit history</h3><p>${facility.auditHistory[0]}</p></article>
              </div>
            </div>
          </div>
        </section>
        <section class="section muted-section">
          <div class="shell split api-split">
            <div>
              <span class="eyebrow">Audit-ready story</span>
              <h2>What a procurement team expects to see</h2>
              <ul class="simple-list">
                ${facility.auditHistory.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </div>
            <form class="rfq-form" data-form="rfq" data-context="${facility.name} facility" data-request-type="Facility qualification pack" data-route="Quality, EHS, and Site Operations" data-reference-prefix="FAC">
              <h2>Schedule plant review</h2>
              <label><span>Company name</span><input name="company" required placeholder="Your pharmaceutical company" /></label>
              <label><span>Email</span><input type="email" name="email" required placeholder="name@company.com" /></label>
              <label><span>Review type</span><input name="review_type" placeholder="Virtual plant tour, audit pack, site visit..." /></label>
              <label><span>Notes</span><textarea name="notes" placeholder="Timeline, product family, audit scope...">${facility.name} facility</textarea></label>
              <button class="btn btn-primary" type="submit">Request facility pack</button>
              <strong class="form-note" role="status" tabindex="-1" hidden></strong>
            </form>
          </div>
        </section>
        <section class="section">
          <div class="shell section-head">
            <span class="eyebrow">Relevant APIs</span>
            <h2>Products aligned to ${facility.name}</h2>
          </div>
          <div class="shell product-grid">${relevantProducts.map((product) => renderApiCard(product)).join("")}</div>
        </section>
      </main>`
  );
}

function renderScientistsPage() {
  pageShell(
    "rnd",
    `
      <main>
        <section class="page-hero api-hero">
          <div class="shell">
            <span class="eyebrow">E-E-A-T</span>
            <h1>Meet our scientific leadership</h1>
            <p>The audit explicitly called for a visible scientist page. This mock provides the page structure, expertise framing, and conversion routes while the final approved roster, names, and photos are prepared.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="/regulatory/">Request RFQ</a>
              <a class="btn btn-secondary" href="/#contact">Talk to the team</a>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="shell section-head">
            <span class="eyebrow">Doctoral bench</span>
            <h2>10-scientist authority scaffold</h2>
            <p>Roles, expertise areas, and publication placeholders are set up so the final CTO presentation can show the E-E-A-T structure the audit recommends.</p>
          </div>
          <div class="shell scientist-grid">
            ${scientists
              .map(
                (scientist) => `
                  <article class="scientist-card">
                    <div class="scientist-avatar">${scientist.name
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")}</div>
                    <h3>${scientist.name}</h3>
                    <strong>${scientist.role}</strong>
                    <p>${scientist.expertise}</p>
                    <span>${scientist.qualification}</span>
                  </article>`
              )
              .join("")}
          </div>
        </section>
      </main>`
  );
}

function renderRegulatoryPage() {
  pageShell(
    "manufacturing",
    `
      <main>
        <section class="page-hero api-hero">
          <div class="shell">
            <span class="eyebrow">Trust signals</span>
            <h1>Regulatory dashboard</h1>
            <p>A public-facing trust page for DMF counts, certifications, inspections, and capability FAQs was one of the clearest recommendations in the audit.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="/products/">Request RFQ</a>
              <a class="btn btn-secondary" href="/scientists/">Connect with a Scientist</a>
            </div>
          </div>
        </section>
        ${renderApprovals(approvals)}
        <section class="section">
          <div class="shell dashboard-grid">
            <article><strong>${regulatoryDashboard.dmfCount}</strong><span>DMFs</span></article>
            <article><strong>${regulatoryDashboard.cepCount}</strong><span>CEP filings</span></article>
            <article><strong>${regulatoryDashboard.countries}</strong><span>Countries served</span></article>
            <article><strong>${regulatoryDashboard.capacity}</strong><span>Combined capacity</span></article>
          </div>
          <div class="shell split api-split section-top-gap">
            <div>
              <span class="eyebrow">Audit narrative</span>
              <h2>Inspection and certification story</h2>
              <ul class="simple-list">
                ${regulatoryDashboard.inspections.map((item) => `<li>${item}</li>`).join("")}
              </ul>
            </div>
            <div class="faq-panel">
              <h2>Capability FAQs</h2>
              ${capabilityFaqs.map((faq) => `<details><summary>${faq.question}</summary><p>${faq.answer}</p></details>`).join("")}
            </div>
          </div>
        </section>
      </main>`
  );
}

function renderTherapyPage() {
  const hub = findTherapyHubBySlug(pageSlug);
  if (!hub) {
    renderNotFound("products");
    return;
  }
  const hubProducts = hub.apiSlugs.map((slug) => findProductBySlug(slug)).filter(Boolean);
  const relatedInsights = insights.filter((insight) => insight.relatedSlugs.some((slug) => hub.apiSlugs.includes(slug)));
  pageShell(
    "products",
    `
      <main>
        <section class="page-hero api-hero">
          <div class="shell">
            <nav class="breadcrumb"><a href="/">Home</a><span>/</span><a href="/products/">Products</a><span>/</span><strong>${hub.name}</strong></nav>
            <span class="eyebrow">Therapy hub</span>
            <h1>${hub.name}</h1>
            <p>${hub.overview}</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="/products/">Browse APIs</a>
              <a class="btn btn-secondary" href="/regulatory/">Request RFQ</a>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="shell section-head">
            <span class="eyebrow">Relevant APIs</span>
            <h2>${hubProducts.length} molecules linked into this hub</h2>
          </div>
          <div class="shell product-grid">${hubProducts.map((product) => renderApiCard(product)).join("")}</div>
        </section>
        <section class="section muted-section">
          <div class="shell section-head">
            <span class="eyebrow">Related insights</span>
            <h2>Internal links that support long-tail authority</h2>
          </div>
          <div class="shell card-grid three">
            ${relatedInsights
              .map(
                (insight) => `
                  <article class="insight-card">
                    <span>${insight.category}</span>
                    <h3>${insight.title}</h3>
                    <p>${insight.excerpt}</p>
                    <a class="text-button" href="/insights/${insight.slug}/">Read article</a>
                  </article>`
              )
              .join("")}
          </div>
        </section>
      </main>`
  );
}

function renderInsightsIndexPage() {
  pageShell(
    "insights",
    `
      <main>
        <section class="page-hero api-hero">
          <div class="shell">
            <span class="eyebrow">Knowledge hub</span>
            <h1>Technical insights for API buyers</h1>
            <p>Practical guidance on API filing strategy, impurity control, backward integration, and supplier qualification, written for procurement, regulatory, and technical teams.</p>
            <div class="hero-actions section-top-gap">
              <a class="btn btn-primary" href="/#contact">Request technical support</a>
              <a class="btn btn-secondary" href="/products/">Browse API portfolio</a>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="shell card-grid three">
            ${insights
              .map(
                (insight) => `
                  <article class="insight-card">
                    <span>${insight.category}</span>
                    <h3>${insight.title}</h3>
                    <p>${insight.excerpt}</p>
                    <p class="insight-meta">${insight.author} &middot; ${insight.readingTime}</p>
                    <a class="text-button" href="/insights/${insight.slug}/">Read article</a>
                  </article>`
              )
              .join("")}
          </div>
        </section>
      </main>`
  );
}

function renderArticleBody(insight) {
  return insight.body
    .map(
      (section) => `
        <section class="article-section">
          <h2>${section.heading}</h2>
          ${section.paragraphs.map((paragraph) => `<p>${paragraph}</p>`).join("")}
        </section>`
    )
    .join("");
}

function renderInsightPage() {
  const insight = findInsightBySlug(pageSlug);
  if (!insight) {
    renderNotFound("insights");
    return;
  }
  const relatedProducts = insight.relatedSlugs.map((slug) => findProductBySlug(slug)).filter(Boolean);
  const relatedInsights = insights.filter((item) => item.slug !== insight.slug).slice(0, 2);
  pageShell(
    "insights",
    `
      <main>
        <section class="page-hero api-hero">
          <div class="shell">
            <nav class="breadcrumb"><a href="/">Home</a><span>/</span><a href="/insights/">Insights</a><span>/</span><strong>${insight.title}</strong></nav>
            <span class="eyebrow">${insight.category}</span>
            <h1>${insight.title}</h1>
            <p>${insight.excerpt}</p>
          </div>
        </section>
        <section class="section">
          <div class="shell article-layout">
            <article class="article-copy">
              <p class="article-byline"><strong>By ${insight.author}</strong><span>${insight.readingTime}</span></p>
              ${renderArticleBody(insight)}
              <section class="article-section article-takeaways">
                <h2>Key takeaways</h2>
                <ul class="simple-list">${insight.takeaways.map((item) => `<li>${item}</li>`).join("")}</ul>
              </section>
            </article>
            <aside class="detail-panel">
              <h3>${insight.cta.title}</h3>
              <p>${insight.cta.text}</p>
              <div class="article-cta-actions">
                <a class="btn btn-primary" href="${insight.cta.primaryHref}">${insight.cta.primaryLabel}</a>
                <a class="btn btn-secondary" href="${insight.cta.secondaryHref}">${insight.cta.secondaryLabel}</a>
              </div>
              <h3>Related product pages</h3>
              <ul class="simple-list">${relatedProducts.map((product) => `<li><a href="${apiHref(product.slug)}">${product.name}</a></li>`).join("")}</ul>
              <h3>Helpful next pages</h3>
              <ul class="simple-list">${insight.internalLinks.map((link) => `<li><a href="${link.href}">${link.label}</a></li>`).join("")}</ul>
              <h3>More insights</h3>
              <ul class="simple-list">${relatedInsights.map((item) => `<li><a href="/insights/${item.slug}/">${item.title}</a></li>`).join("")}</ul>
            </aside>
          </div>
        </section>
      </main>`
  );
}

function renderMarketPage() {
  const market = findMarketBySlug(pageSlug);
  if (!market) {
    renderNotFound("products");
    return;
  }
  const relatedProducts = products.filter((product) => market.approvals.some((approval) => product.filings.includes(approval))).slice(0, 6);
  pageShell(
    "products",
    `
      <main>
        <section class="page-hero api-hero">
          <div class="shell">
            <span class="eyebrow">Geographic market page</span>
            <h1>${market.name}</h1>
            <p>${market.overview}</p>
          </div>
        </section>
        <section class="section">
          <div class="shell split api-split">
            <div>
              <span class="eyebrow">Regional narrative</span>
              <h2>Regulatory and commercial positioning</h2>
              <p>${market.name} pages were recommended in the audit as long-tail capture surfaces. This mock links market positioning directly to relevant products and request paths.</p>
              <ul class="simple-list">
                ${market.approvals.map((approval) => `<li>${approval}</li>`).join("")}
              </ul>
            </div>
            <div class="detail-panel">
              <h3>${market.contact}</h3>
              <p>Use this page as the regional landing layer for tailored contact flows, localized approvals, and region-specific API showcases.</p>
              <a class="btn btn-primary" href="/#contact">Talk to regional BD</a>
            </div>
          </div>
        </section>
        <section class="section muted-section">
          <div class="shell section-head">
            <span class="eyebrow">Relevant APIs</span>
            <h2>Suggested starting portfolio</h2>
          </div>
          <div class="shell product-grid">${relatedProducts.map((product) => renderApiCard(product)).join("")}</div>
        </section>
      </main>`
  );
}

function renderNotFound(activePage) {
  pageShell(
    activePage,
    `
      <main>
        <section class="page-hero">
          <div class="shell">
            <span class="eyebrow">Page not found</span>
            <h1>This page is not in the mock yet</h1>
            <p>Return to the library or home page to keep exploring the Aurore website rebuild.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="/products/">Browse APIs</a>
              <a class="btn btn-secondary" href="/">Back home</a>
            </div>
          </div>
        </section>
      </main>`
  );
}

const renderers = {
  productIndex: renderProductsIndexPage,
  api: renderApiPage,
  intermediateIndex: renderIntermediatesIndexPage,
  intermediateFamily: renderIntermediateFamilyPage,
  facility: renderFacilityPage,
  scientists: renderScientistsPage,
  regulatory: renderRegulatoryPage,
  therapy: renderTherapyPage,
  insightIndex: renderInsightsIndexPage,
  insight: renderInsightPage,
  market: renderMarketPage
};

(renderers[pageType] || (() => renderNotFound("home")))();
