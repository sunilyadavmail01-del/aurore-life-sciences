import "./styles.css";

import { approvals, apiHref, findProductBySlug, products } from "./site-data.js";
import { attachCommonUi, renderApprovals, renderFooter, renderHeader } from "./site-shell.js";

const app = document.querySelector("#app");
const slug = window.__API_SLUG__;
const product = findProductBySlug(slug);

if (!product) {
  document.title = "API Not Found | Aurore Life Sciences";
  app.innerHTML = `
    ${renderHeader({ isApiDetail: true })}
    <main>
      <section class="page-hero">
        <div class="shell">
          <span class="eyebrow">API library</span>
          <h1>API page not found</h1>
          <p>The requested molecule page is not available yet. Return to the portfolio to browse the available API detail pages.</p>
          <a class="btn btn-secondary" href="/products/">Back to products</a>
        </div>
      </section>
    </main>
    ${renderFooter({ isApiDetail: true })}`;
  attachCommonUi();
} else {
  document.title = `${product.name} API Supplier | Aurore Life Sciences`;
  const relatedProducts = products.filter((candidate) => candidate.category === product.category && candidate.slug !== product.slug).slice(0, 3);
  const breadcrumb = `<a href="/">Home</a><span>/</span><a href="/products/">Products</a><span>/</span><strong>${product.name}</strong>`;

  app.innerHTML = `
    ${renderHeader({ activePage: "products", isApiDetail: true })}
    <main>
      <section class="page-hero api-hero">
        <div class="shell">
          <nav class="breadcrumb">${breadcrumb}</nav>
          <span class="eyebrow">${product.category}</span>
          <h1>${product.name}</h1>
          <p>${product.summary}</p>
          <div class="hero-actions">
            <a class="btn btn-primary" href="/?molecule=${encodeURIComponent(product.slug)}#contact">Request RFQ</a>
            <a class="btn btn-secondary" href="/products/">Back to API library</a>
          </div>
        </div>
      </section>
      ${renderApprovals(approvals)}
      <section class="section">
        <div class="shell split api-split">
          <div>
            <span class="eyebrow">Molecule overview</span>
            <h2>Supplier-ready technical summary</h2>
            <p>${product.summary}</p>
            <div class="proof-grid">
              ${product.highlights.map((item) => `<article><h3>Key point</h3><p>${item}</p></article>`).join("")}
            </div>
          </div>
          <aside class="detail-panel">
            <h3>${product.name}</h3>
            <dl class="detail-list">
              <dt>Therapeutic area</dt><dd>${product.category}</dd>
              <dt>Filing status</dt><dd>${product.filings}</dd>
              <dt>Capacity</dt><dd>${product.capacity}</dd>
              <dt>CAS number</dt><dd>${product.casNumber}</dd>
              <dt>Molecular formula</dt><dd>${product.formula}</dd>
              <dt>Dosage support</dt><dd>${product.dosageForms}</dd>
              <dt>Market focus</dt><dd>${product.marketFocus}</dd>
            </dl>
          </aside>
        </div>
      </section>
      <section class="section muted-section">
        <div class="shell split api-split">
          <div>
            <span class="eyebrow">Commercial use</span>
            <h2>Built for procurement and qualification conversations</h2>
            <p>This molecule page gives Aurore a shareable URL for buyer outreach, organic discovery, portfolio comparison, and molecule-specific enquiry workflows.</p>
            <table class="spec-table">
              <tbody>
                <tr><th>RFQ path</th><td>Use the global contact form and mention <strong>${product.name}</strong> to route the enquiry.</td></tr>
                <tr><th>Portfolio role</th><td>${product.category} API within Aurore's broader regulated-market supply portfolio.</td></tr>
                <tr><th>Regulatory narrative</th><td>${product.filings}</td></tr>
                <tr><th>Commercial scale</th><td>${product.capacity}</td></tr>
              </tbody>
            </table>
          </div>
          <form class="rfq-form" data-form="rfq" data-context="${product.name}" data-request-type="Molecule RFQ" data-route="Commercial Supply and Regulatory Affairs" data-reference-prefix="RFQ">
            <h2>Request ${product.name}</h2>
            <label><span>Company name</span><input name="company" required placeholder="Your pharmaceutical company" /></label>
            <label><span>Contact person</span><input name="name" required placeholder="Full name" /></label>
            <label><span>Email</span><input type="email" name="email" required placeholder="name@company.com" /></label>
            <label><span>Required quantity</span><input name="quantity" placeholder="100 kg, 1 MT, pilot batch..." /></label>
            <label><span>Notes</span><textarea name="notes" placeholder="Grade, destination market, timeline, sample request, impurity specs...">${product.name}</textarea></label>
            <button class="btn btn-primary" type="submit">Submit RFQ</button>
            <strong class="form-note" role="status" tabindex="-1" hidden></strong>
          </form>
        </div>
      </section>
      <section class="section">
        <div class="shell section-head">
          <span class="eyebrow">Related APIs</span>
          <h2>More in ${product.category}</h2>
          <p>Related molecules help buyers compare options across the portfolio and continue sourcing conversations with the right technical context.</p>
        </div>
        <div class="shell product-grid">
          ${relatedProducts
            .map(
              (item) => `
                <article class="product-card">
                  <div>
                    <span>${item.category}</span>
                    <h3>${item.name}</h3>
                  </div>
                  <dl>
                    <dt>Filing status</dt><dd>${item.filings}</dd>
                    <dt>Capacity</dt><dd>${item.capacity}</dd>
                  </dl>
                  <a class="btn btn-secondary" href="${apiHref(item.slug)}">Open API page</a>
                </article>`
            )
            .join("")}
        </div>
      </section>
    </main>
    ${renderFooter({ isApiDetail: true })}`;

  attachCommonUi();
}
