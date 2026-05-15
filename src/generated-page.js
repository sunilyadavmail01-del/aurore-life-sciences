import "./styles.css";

import {
  apiHref,
  approvals,
  capabilityFaqs,
  facilities,
  facilityOne,
  facilityTwo,
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
  rndImage,
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
        <p>Procurement and technical teams can narrow the API library before requesting RFQs, documentation, or scientist-led qualification support.</p>
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
    `<div id="portfolio-root"></div>`
  );
  import("./portfolio/PortfolioApp.jsx").then(({ mountPortfolioApp }) => {
    const root = document.querySelector("#portfolio-root");
    if (root) mountPortfolioApp(root);
  });
}

function renderCphiShanghaiPage() {
  const eventFacts = [
    ["Event", "CPHI & PMEC China 2026"],
    ["Dates", "16-18 June 2026"],
    ["Venue", "Shanghai New International Expo Center"],
    ["Meeting focus", "API supply, CDMO projects, regulatory documentation, and portfolio qualification"]
  ];
  const meetingReasons = [
    ["API supply resilience", "Discuss commercial API availability, second-source programs, backward integration, and continuity planning for regulated and growth markets."],
    ["Technical fit in one conversation", "Bring molecule, impurity, route, filing, and scale-up questions into a single meeting with context for Aurore's BD, R&D, and regulatory teams."],
    ["Documentation-ready follow-up", "Use the event request path to preserve market, molecule, timing, and requested documents so the right pack can be prepared before or after Shanghai."],
    ["CDMO and lifecycle programs", "Explore route development, pilot batches, tech transfer, and commercial API manufacturing where speed, evidence, and cost control matter."]
  ];
  const focusAreas = [
    "Commercial API sourcing and second-source qualification",
    "Intermediates and backward-integrated supply conversations",
    "CDMO route scouting, scale-up, and registration support",
    "DMF, CEP, COA, sample, and audit-readiness documentation"
  ];
  return pageShell(
    "contact",
    `
      <main>
        <section class="event-hero">
          <div class="event-hero__media" aria-hidden="true">
            <img src="${facilityTwo}" alt="" />
          </div>
          <div class="event-hero__overlay" aria-hidden="true"></div>
          <div class="shell event-hero__inner">
            <div class="event-hero__copy">
              <span class="hl-eyebrow event-hero__eyebrow">CPHI Shanghai 2026</span>
              <h1>Meet Aurore at CPHI &amp; PMEC China 2026.</h1>
              <p>Plan a focused supplier conversation in Shanghai with the Aurore team for APIs, intermediates, CDMO programs, documentation access, and global supply qualification.</p>
              <div class="event-hero__actions">
                <a class="hl-btn hl-btn--primary" href="#meeting-request">Request a meeting</a>
                <a class="hl-btn hl-btn--outline" href="/products/">Review API portfolio</a>
              </div>
            </div>
            <aside class="event-card event-card--dark" aria-label="Event details">
              ${eventFacts.map(([label, value]) => `
                <div class="event-card__fact">
                  <span>${label}</span>
                  <strong>${value}</strong>
                </div>`).join("")}
            </aside>
          </div>
        </section>

        <section class="hl-section event-intent">
          <div class="shell event-intent__grid">
            <div>
              <span class="hl-eyebrow">Why meet Aurore there</span>
              <h2 class="hl-section__title">Turn a busy trade-show visit into a qualified supply discussion.</h2>
              <p class="hl-section__body">CPHI is most useful when the meeting starts with the right context. This page captures your molecule, market, documents, and timeline so the conversation can move beyond a generic contact exchange.</p>
            </div>
            <div class="event-reason-grid">
              ${meetingReasons.map(([title, body], i) => `
                <article class="event-reason-card reveal-up" style="--delay:${0.07 * i}s">
                  <span>0${i + 1}</span>
                  <h3>${title}</h3>
                  <p>${body}</p>
                </article>`).join("")}
            </div>
          </div>
        </section>

        <section class="hl-section hl-section--soft event-proof">
          <div class="shell event-proof__grid">
            <div class="event-proof__visual reveal-fade">
              <img src="${rndImage}" alt="Aurore R&D laboratory for process and analytical development" />
            </div>
            <div class="event-proof__copy">
              <span class="hl-eyebrow">Meeting agenda</span>
              <h2>Bring a live sourcing question, not a business card.</h2>
              <p>Use your Shanghai meeting to align on technical, commercial, and regulatory requirements while the opportunity is still fresh.</p>
              <ul class="event-checklist">
                ${focusAreas.map((item) => `<li>${item}</li>`).join("")}
              </ul>
              <div class="event-proof__links">
                <a class="hl-btn hl-btn--primary" href="#meeting-request">Share meeting brief</a>
                <a class="hl-btn hl-btn--outline-light" href="/regulatory/">View regulatory dashboard</a>
              </div>
            </div>
          </div>
        </section>

        <section class="hl-section event-request" id="meeting-request">
          <div class="shell event-request__grid">
            <div class="event-request__intro">
              <span class="hl-eyebrow">Lead capture path</span>
              <h2>Request a CPHI Shanghai meeting with context attached.</h2>
              <p>This event form keeps the enquiry tied to CPHI Shanghai 2026 and stages it for the business development, regulatory, and scientific review teams.</p>
              <div class="event-mini-panel">
                <strong>Context preserved</strong>
                <span>Event: CPHI &amp; PMEC China 2026</span>
                <span>Dates: 16-18 June 2026</span>
                <span>Venue: Shanghai New International Expo Center</span>
              </div>
            </div>
            <form class="ct-form event-form" data-form="rfq"
              data-context="CPHI Shanghai 2026 meeting request"
              data-request-type="CPHI Shanghai 2026 meeting / supplier qualification request"
              data-route="Aurore Business Development, Regulatory Affairs, and Scientific leadership"
              data-reference-prefix="CPHI">
              <input type="hidden" name="event" value="CPHI &amp; PMEC China 2026" />
              <input type="hidden" name="event_dates" value="16-18 June 2026" />
              <input type="hidden" name="event_venue" value="Shanghai New International Expo Center" />
              <div class="ct-form__head">
                <p class="ct-form__title">CPHI Shanghai meeting request</p>
                <p class="ct-form__sub">Share enough detail for Aurore to prepare the right person, documents, and next step.</p>
              </div>
              <div class="ct-form__body">
                <p class="form-context">Event context: <strong>CPHI &amp; PMEC China 2026 · 16-18 June · Shanghai</strong></p>
                <div class="ct-form__row">
                  <label><span>Company name *</span><input name="company" required placeholder="Your pharmaceutical company" /></label>
                  <label><span>Contact person *</span><input name="name" required placeholder="Full name" /></label>
                </div>
                <div class="ct-form__row">
                  <label><span>Email *</span><input type="email" name="email" required placeholder="name@company.com" /></label>
                  <label><span>Phone / WhatsApp</span><input name="phone" placeholder="+86, +91, +1..." /></label>
                </div>
                <div class="ct-form__row">
                  <label><span>Molecule / project focus *</span><input name="molecule" required placeholder="API, intermediate, or CDMO project" /></label>
                  <label><span>Target market *</span><input name="market" required placeholder="US, EU, China, LATAM, WHO..." /></label>
                </div>
                <div class="ct-form__row">
                  <label><span>Meeting interest</span><select name="request_type">
                    <option>Supplier qualification meeting</option>
                    <option>API RFQ / commercial supply</option>
                    <option>CDMO or route development discussion</option>
                    <option>DMF / COA / sample request</option>
                    <option>Regulatory or audit readiness discussion</option>
                  </select></label>
                  <label><span>Preferred meeting window</span><input name="timeline_market" placeholder="16 June morning, 17 June afternoon..." /></label>
                </div>
                <label>
                  <span>Agenda and documents needed</span>
                  <textarea name="notes" placeholder="Quantity, launch timing, specification, required filings, samples, quality documents, or people you want in the meeting..."></textarea>
                </label>
                <button class="hl-btn hl-btn--primary ct-form__submit" type="submit">Request CPHI meeting</button>
                <strong class="form-note" role="status" tabindex="-1" hidden></strong>
              </div>
            </form>
          </div>
        </section>

        <section class="event-final">
          <div class="shell event-final__inner">
            <img src="${facilityOne}" alt="Aurore manufacturing campus supporting API supply discussions" />
            <div>
              <span class="hl-eyebrow">Before Shanghai</span>
              <h2>Review the portfolio, then arrive with a shortlist.</h2>
              <p>Pair the meeting request with product, regulatory, and scientist pages so your team can screen Aurore before the event.</p>
              <div class="event-final__actions">
                <a class="hl-btn hl-btn--primary" href="/products/">Browse APIs</a>
                <a class="hl-btn hl-btn--outline" href="/scientists/">Meet scientific leadership</a>
              </div>
            </div>
          </div>
        </section>
      </main>`
  );
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
            <h1>Intermediates for API sourcing</h1>
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
              <h2>Molecule profile for supplier qualification</h2>
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
              <span class="eyebrow">Connected portfolio</span>
              <h2>Designed to interlink the whole buyer journey</h2>
              <table class="spec-table">
                <tbody>
                  <tr><th>Parent hub</th><td><a href="/therapy-areas/${hub.slug}/">${product.category}</a></td></tr>
                  <tr><th>Facility page</th><td><a href="/facilities/${facility.slug}/">${facility.name}</a></td></tr>
                  <tr><th>Regulatory dashboard</th><td><a href="/regulatory/">Audit history, DMF counts, and approval signals</a></td></tr>
                  <tr><th>Scientific route</th><td><a href="/scientists/">Meet the scientific leadership team</a></td></tr>
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
            <p>Every API page links to related products, technical context, and enquiry paths so buyers can continue evaluation without losing momentum.</p>
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
              <a class="btn btn-primary" href="/regulatory/">Request quality pack</a>
              <a class="btn btn-secondary" href="/scientists/">Connect with a Scientist</a>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="shell split api-split">
            <aside class="image-panel"><img src="${facility.image}" alt="${facility.name} manufacturing facility" /></aside>
            <div>
              <span class="eyebrow">Facility facts</span>
              <h2>Capacity, certifications, and qualification cadence</h2>
              <div class="proof-grid">
                <article><h3>Reactor capacity</h3><p>${facility.capacity}</p></article>
                <article><h3>Primary focus</h3><p>${facility.focus}</p></article>
                <article><h3>Certifications</h3><p>${facility.certifications.join(", ")}</p></article>
                <article><h3>Inspection readiness</h3><p>${facility.auditHistory[0]}</p></article>
              </div>
            </div>
          </div>
        </section>
        <section class="section muted-section">
          <div class="shell split api-split">
            <div>
              <span class="eyebrow">Qualification support</span>
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
            <span class="eyebrow">Scientific leadership</span>
            <h1>Meet our scientific leadership</h1>
            <p>Aurore's scientific leadership supports route scouting, impurity strategy, analytical validation, technology transfer, and regulated-market qualification discussions.</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="/regulatory/">Request RFQ</a>
              <a class="btn btn-secondary" href="/#contact">Talk to the team</a>
            </div>
          </div>
        </section>
        <section class="section">
          <div class="shell section-head">
            <span class="eyebrow">Doctoral bench</span>
            <h2>Scientific authority across API development</h2>
            <p>Expertise areas are organized around process chemistry, analytical science, regulatory support, scale-up, solid-state strategy, and custom synthesis.</p>
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
            <span class="eyebrow">Regulatory confidence</span>
            <h1>Regulatory dashboard</h1>
            <p>Aurore brings together DMF counts, certifications, inspections, quality systems, and capability FAQs to support buyer due diligence.</p>
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
              <span class="eyebrow">Inspection record</span>
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
            <h2>Related pages for deeper evaluation</h2>
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
              <p>${market.name} positioning links regional regulatory expectations directly to relevant products, facilities, and request paths.</p>
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
            <h1>This page is not available yet</h1>
            <p>Return to the library or home page to keep exploring Aurore Life Sciences.</p>
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
  market: renderMarketPage,
  cphiShanghai: renderCphiShanghaiPage
};

(renderers[pageType] || (() => renderNotFound("home")))();
