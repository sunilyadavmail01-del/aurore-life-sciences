import { apiHref, logoUrl, navItems, utilityNavItems } from "./site-data.js";

export function pageButton(label, target, className = "btn btn-primary") {
  return `<button class="${className}" data-page="${target}">${label}</button>`;
}

export function pageLink(label, href, className = "btn btn-primary") {
  return `<a class="${className}" href="${href}">${label}</a>`;
}

const staticNavHref = {
  home: "/",
  about: "/#about",
  products: "/products/",
  cdmo: "/#cdmo",
  peptides: "/#peptides",
  manufacturing: "/facilities/jeedimetla/",
  rnd: "/scientists/",
  insights: "/insights/",
  contact: "/#contact",
  careers: "/#careers"
};

function renderNavItem(item, activePage, isStaticPage) {
  const active = activePage === item.id ? "active" : "";
  if (isStaticPage) {
    return `<a class="nav-link ${active}" href="${staticNavHref[item.id]}">${item.label}</a>`;
  }
  return `<button class="nav-link ${active}" data-page="${item.id}">${item.label}</button>`;
}

function renderMobileRfq(isStaticPage) {
  if (isStaticPage) {
    return `<a class="nav-link nav-link--rfq-mobile" href="/#contact">Request RFQ</a>`;
  }
  return pageButton("Request RFQ", "contact", "nav-link nav-link--rfq-mobile");
}

export function renderHeader({ activePage = "", isApiDetail = false, isStaticPage = false } = {}) {
  const homeHref = isApiDetail || isStaticPage ? "/" : "#home";
  const staticContext = isApiDetail || isStaticPage;
  return `
    <div class="utility-bar">
      <div class="shell utility-inner">
        <span>Plot #68, 69, Jubilee Heights, Madhapur, Hyderabad</span>
        <span class="utility-links">
          <a href="tel:04068303211">040-68303211</a>
          <a href="mailto:info@aurorels.com">info@aurorels.com</a>
          <a href="https://linkedin.com/company/aurore-life-sciences" target="_blank" rel="noreferrer">LinkedIn</a>
        </span>
      </div>
    </div>
    <header class="site-header">
      <div class="shell header-shell">
        <div class="header-top-links">
          ${utilityNavItems.map((item) => renderNavItem(item, activePage, isApiDetail || isStaticPage)).join("")}
        </div>
        <div class="nav-shell">
          <a class="brand-link" href="${homeHref}" aria-label="Aurore Life Sciences home">
            <img src="${logoUrl}" alt="Aurore Life Sciences" />
          </a>
          <button class="menu-toggle" aria-label="Toggle navigation" aria-expanded="false">Menu</button>
          <nav class="site-nav" aria-label="Primary navigation">
            ${navItems.map((item) => renderNavItem(item, activePage, staticContext)).join("")}
            ${renderMobileRfq(staticContext)}
          </nav>
          ${staticContext ? `<a class="btn btn-primary nav-cta" href="/#contact">Request RFQ</a>` : pageButton("Request RFQ", "contact", "btn btn-primary nav-cta")}
        </div>
      </div>
    </header>`;
}

export function renderFooter({ isApiDetail = false, isStaticPage = false } = {}) {
  const footerColumns = [
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/#about" },
        { label: "R&D", href: "/scientists/" },
        { label: "Manufacturing", href: "/facilities/jeedimetla/" },
        { label: "Sustainability & ESG", href: "/#about" },
        { label: "Careers", href: "/#careers" }
      ]
    },
    {
      title: "Capabilities",
      links: [
        { label: "APIs", href: "/products/" },
        { label: "Intermediates", href: "/intermediates/" },
        { label: "CDMO Services", href: "/#cdmo" },
        { label: "Process Development", href: "/#cdmo" },
        { label: "Analytical Services", href: "/scientists/" }
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Quality", href: "/regulatory/" },
        { label: "Regulatory", href: "/regulatory/" },
        { label: "Insights", href: "/insights/" },
        { label: "Downloads", href: "/#contact" },
        { label: "Contact", href: "/#contact" },
        { label: "Global Presence", href: "/markets/north-america/" },
        { label: "Partner With Us", href: "/#contact" }
      ]
    }
  ];

  const footerMetrics = [
    { icon: "GxP", value: "2", label: "cGMP manufacturing sites" },
    { icon: "DMF", value: "122+", label: "regulatory filings" },
    { icon: "GLB", value: "70+", label: "countries served" },
    { icon: "R&D", value: "10", label: "doctorates in scientific leadership" }
  ];

  return `
    <footer class="footer">
      <div class="footer-scale">
        <div class="shell footer-scale__grid">
          ${footerMetrics
            .map(
              (metric) => `
                <article class="footer-scale__item">
                  <span class="footer-scale__icon">${metric.icon}</span>
                  <strong>${metric.value}</strong>
                  <p>${metric.label}</p>
                </article>`
            )
            .join("")}
        </div>
      </div>
      <div class="shell footer-main">
        <section class="footer-brand" aria-label="Aurore Life Sciences overview">
          <a class="footer-logo-link" href="/" aria-label="Aurore Life Sciences home">
            <img class="footer-logo" src="${logoUrl}" alt="Aurore Life Sciences" />
          </a>
          <p>Pure-play API, intermediates, and CDMO manufacturing partner for regulated global pharmaceutical markets.</p>
          <a class="footer-brand__contact" href="mailto:info@aurorels.com">info@aurorels.com</a>
        </section>
        <nav class="footer-nav" aria-label="Footer navigation">
          ${footerColumns
            .map(
              (column) => `
                <div class="footer-nav__col">
                  <h3>${column.title}</h3>
                  ${column.links.map((link) => `<a class="footer-link-anchor" href="${link.href}">${link.label}</a>`).join("")}
                </div>`
            )
            .join("")}
        </nav>
        <form class="newsletter" data-form="newsletter">
          <span class="newsletter-kicker">Executive Intelligence</span>
          <h3>Regulatory & API Brief</h3>
          <input type="email" name="email" placeholder="name@company.com" required aria-label="Business email" />
          <button class="btn btn-primary" type="submit">Subscribe</button>
        </form>
      </div>
      <div class="footer-bottom">
        <div class="shell footer-bottom__inner">
          <span>© 2026 Aurore Life Sciences Pvt. Ltd. All rights reserved.</span>
          <div class="footer-social-icons" aria-label="Social and contact links">
            <a href="https://linkedin.com/company/aurore-life-sciences" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="mailto:info@aurorels.com" aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>
            </a>
            <a href="tel:04068303211" aria-label="Phone">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="18" height="18"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.81a16 16 0 0 0 5.55 5.55l.88-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 15.92z"/></svg>
            </a>
          </div>
        </div>
        <div class="shell footer-bottom__legal">
          <a href="/regulatory/">Quality & regulatory</a>
          <a href="/#contact">Business enquiries</a>
          <a href="/sitemap.xml">Sitemap</a>
        </div>
      </div>
    </footer>`;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fieldValue(formData, names) {
  for (const name of names) {
    const value = formData.get(name);
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

function requestReference(prefix) {
  const timestamp = new Date();
  const date = timestamp.toISOString().slice(0, 10).replaceAll("-", "");
  const time = timestamp.toTimeString().slice(0, 5).replace(":", "");
  return `ALS-${prefix}-${date}-${time}`;
}

function confirmationMarkup(form, formData) {
  const isNewsletter = form.dataset.form === "newsletter";
  if (isNewsletter) {
    const email = fieldValue(formData, ["email"]);
    return `Subscribed${email ? `: ${escapeHtml(email)}` : ""}. Quarterly regulatory updates would be sent from the CRM in production.`;
  }

  const molecule = fieldValue(formData, ["molecule", "api_focus", "product"]) || form.dataset.context || fieldValue(formData, ["notes"]) || "this request";
  const company = fieldValue(formData, ["company"]);
  const requestType =
    fieldValue(formData, ["request_type", "requested_document", "requested_pack", "review_type"]) ||
    form.dataset.requestType ||
    "RFQ / documentation request";
  const market = fieldValue(formData, ["market", "timeline_market", "regulatory_focus", "quantity"]);
  const route = form.dataset.route || "Business Development and Regulatory Affairs";
  const reference = requestReference(form.dataset.referencePrefix || "RFQ");

  return `
    <span class="form-note-title">Request staged: ${escapeHtml(molecule)}</span>
    <span>${escapeHtml(requestType)}${company ? ` for ${escapeHtml(company)}` : ""} is ready for ${escapeHtml(route)} review.</span>
    ${market ? `<span>Context preserved: ${escapeHtml(market)}.</span>` : ""}
    <span class="form-note-ref">Demo reference ${escapeHtml(reference)}</span>`;
}

export function attachCommonUi() {
  const menu = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".site-nav");
  menu?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
  });

  nav?.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest(".nav-link")) {
      nav.classList.remove("open");
      menu?.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav?.classList.contains("open")) {
      nav.classList.remove("open");
      menu?.setAttribute("aria-expanded", "false");
      menu?.focus();
    }
  });

  document.querySelectorAll("form[data-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const note = form.querySelector(".form-note");
      if (note) {
        note.innerHTML = confirmationMarkup(form, formData);
        note.hidden = false;
        note.focus?.();
      }
    });
  });
}

export function renderApprovals(approvals) {
  return `
    <section class="approval-strip" aria-label="Regulatory approvals">
      <div class="shell approval-inner">
        <strong>Regulatory approvals</strong>
        ${approvals.map((approval) => `<span>${approval}</span>`).join("")}
      </div>
    </section>`;
}

export function renderApiCard(product) {
  const contactHref = `/?molecule=${encodeURIComponent(product.slug)}#contact`;
  return `
    <article class="product-card">
      <div>
        <span>${product.category}</span>
        <h3>${product.name}</h3>
      </div>
      <dl>
        <dt>Filing status</dt><dd>${product.filings}</dd>
        <dt>Capacity</dt><dd>${product.capacity}</dd>
      </dl>
      <div class="product-card-actions">
        <a class="btn btn-secondary" href="${apiHref(product.slug)}">View API page</a>
        <a class="text-button" href="${contactHref}">Request RFQ</a>
        <a class="text-button" href="/scientists/">Connect with a Scientist</a>
      </div>
    </article>`;
}
