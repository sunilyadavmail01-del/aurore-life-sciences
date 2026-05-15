import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { facilities, insights, products } from "../site-data.js";
import { CTASection } from "./CTASection.jsx";
import { DownloadCard } from "./DownloadCard.jsx";
import { GlobalMap } from "./GlobalMap.jsx";
import { HeroSection } from "./HeroSection.jsx";
import { InsightCard } from "./InsightCard.jsx";
import { RegulatoryTimeline } from "./RegulatoryTimeline.jsx";
import { StatsStrip } from "./StatsStrip.jsx";
import "./resource.css";
import { resourcePages } from "./resourceData.js";

function SectionIntro({ intro }) {
  if (!intro) return null;
  return (
    <section className="resource-section" aria-labelledby="resource-intro-title">
      <div className="resource-shell resource-intro">
        <div>
          <span className="resource-eyebrow">{intro.eyebrow}</span>
          <h2 id="resource-intro-title">{intro.title}</h2>
        </div>
        <p>{intro.body}</p>
      </div>
    </section>
  );
}

function PillarGrid({ page }) {
  if (!page.pillars?.length) return null;
  return (
    <section className="resource-section" aria-labelledby={`${page.nav}-pillars-title`}>
      <div className="resource-shell resource-section__head">
        <span className="resource-eyebrow">Operating framework</span>
        <h2 id={`${page.nav}-pillars-title`}>What enterprise buyers should be able to verify.</h2>
      </div>
      <div className="resource-shell resource-card-grid">
        {page.pillars.map((pillar, i) => (
          <article className="resource-card" key={pillar.title}>
            <span className="resource-card__num">{String(i + 1).padStart(2, "0")}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.body}</p>
            <span className="resource-card__arrow" aria-hidden="true">→</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProofPanel({ page }) {
  if (!page.proof?.length) return null;
  return (
    <section className="resource-section resource-proof" aria-labelledby={`${page.nav}-proof-title`}>
      <div className="resource-shell resource-proof__grid">
        <div className="resource-proof__copy">
          <span className="resource-eyebrow">Buyer confidence signals</span>
          <h2 id={`${page.nav}-proof-title`}>Evidence a procurement, quality, or regulatory team can act on.</h2>
          <p>
            These signals are designed to support supplier qualification, documentation review, launch planning, and
            long-term supply governance.
          </p>
        </div>
        <div className="resource-proof__list">
          {page.proof.map((item) => (
            <div className="resource-proof__item" key={item}>
              <span aria-hidden="true" />
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightBand({ band }) {
  return (
    <section className="resource-section resource-band" aria-labelledby="resource-band-title">
      <div className="resource-shell resource-band__inner">
        <div>
          <span className="resource-eyebrow">Technical readiness</span>
          <h2 id="resource-band-title">{band.title}</h2>
          <p>{band.body}</p>
        </div>
        <div className="resource-band__links">
          {band.links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function RegulatoryDashboard({ page }) {
  if (!page.dashboard) return null;
  const rows = [
    ["Global filing base", page.dashboard.dmfFiled],
    ["Approved filings", page.dashboard.dmfApproved],
    ["USDMF programs", page.dashboard.usdmf],
    ["CEP / EDMF pathways", page.dashboard.cepEdmf],
    ["WHO / global health", page.dashboard.who],
    ["Customer-facing FAQs", page.dashboard.faqs]
  ];
  return (
    <section className="resource-section" aria-labelledby="regulatory-dashboard-title">
      <div className="resource-shell resource-section__head">
        <span className="resource-eyebrow">Regulatory dashboard</span>
        <h2 id="regulatory-dashboard-title">A concise view of filing depth and customer support.</h2>
      </div>
      <div className="resource-shell regulatory-dashboard">
        {rows.map(([label, value]) => (
          <article key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function InsightsExperience({ page }) {
  const [query, setQuery] = useState("");
  const allTopics = useMemo(
    () => [
      ...page.topics,
      ...insights.map((insight) => ({
        ...insight,
        category: insight.category || "Technical article",
        description: insight.excerpt,
        href: `/insights/${insight.slug}/`
      }))
    ],
    [page.topics]
  );
  const filtered = allTopics.filter((topic) =>
    [topic.title, topic.category, topic.description].join(" ").toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <section className="resource-section resource-search-block" aria-labelledby="insights-search-title">
        <div className="resource-shell resource-section__head">
          <span className="resource-eyebrow">Searchable editorial architecture</span>
          <h2 id="insights-search-title">Find perspectives by molecule, market, regulation, or manufacturing theme.</h2>
        </div>
        <div className="resource-shell">
          <label className="resource-search">
            <span>Search insights</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search API supply, DMF, impurity, CDMO..."
            />
          </label>
        </div>
        <div className="resource-shell insight-grid">
          {filtered.map((topic, index) => (
            <InsightCard topic={topic} featured={index === 0} key={`${topic.title}-${topic.category}`} />
          ))}
        </div>
      </section>
      <section className="resource-section resource-section--soft">
        <div className="resource-shell molecule-spotlight">
          <div>
            <span className="resource-eyebrow">Molecule spotlight</span>
            <h2>{page.moleculeSpotlight.title}</h2>
            <p>{page.moleculeSpotlight.body}</p>
          </div>
          <div className="molecule-spotlight__columns">
            <div>
              <h3>Featured APIs</h3>
              {page.moleculeSpotlight.apis.map((api) => (
                <a key={api} href={`/products/?q=${encodeURIComponent(api)}`}>
                  {api}
                </a>
              ))}
            </div>
            <div>
              <h3>Intermediate families</h3>
              {page.moleculeSpotlight.intermediates.map((api) => (
                <a key={api} href="/intermediates/">
                  {api}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DownloadsExperience({ page }) {
  return (
    <section className="resource-section" aria-labelledby="downloads-title">
      <div className="resource-shell resource-section__head">
        <span className="resource-eyebrow">Download library</span>
        <h2 id="downloads-title">Request the resource pack that matches your qualification workflow.</h2>
      </div>
      <div className="resource-shell download-grid">
        {page.downloads.map((item) => (
          <DownloadCard item={item} key={item.title} />
        ))}
      </div>
    </section>
  );
}

function ContactExperience({ page }) {
  const [status, setStatus] = useState("");
  return (
    <>
      <section className="resource-section" aria-labelledby="contact-routing-title">
        <div className="resource-shell resource-section__head">
          <span className="resource-eyebrow">Inquiry routing</span>
          <h2 id="contact-routing-title">Choose the conversation you need to start.</h2>
        </div>
        <div className="resource-shell resource-card-grid">
          {page.contactRoutes.map((route, i) => (
            <article className="resource-card" key={route.title}>
              <span className="resource-card__num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{route.title}</h3>
              <p>{route.body}</p>
              <span className="resource-card__arrow" aria-hidden="true">→</span>
            </article>
          ))}
        </div>
      </section>
      <section className="resource-section resource-section--soft" id="rfq" aria-labelledby="rfq-title">
        <div className="resource-shell contact-grid">
          <form
            className="resource-form"
            onSubmit={(event) => {
              event.preventDefault();
              setStatus("Thank you. This RFQ would be routed to Aurore's commercial and technical teams in production.");
            }}
          >
            <span className="resource-eyebrow">RFQ and technical discussion</span>
            <h2 id="rfq-title">Submit an API, CDMO, or documentation enquiry.</h2>
            <div className="resource-form__grid">
              <label>
                <span>Name</span>
                <input required name="name" autoComplete="name" />
              </label>
              <label>
                <span>Business email</span>
                <input required name="email" type="email" autoComplete="email" />
              </label>
              <label>
                <span>Company</span>
                <input required name="company" autoComplete="organization" />
              </label>
              <label>
                <span>Inquiry type</span>
                <select name="requestType" defaultValue="API RFQ">
                  <option>API RFQ</option>
                  <option>Intermediate enquiry</option>
                  <option>CDMO discussion</option>
                  <option>Regulatory documentation</option>
                  <option>Technical discussion</option>
                </select>
              </label>
            </div>
            <label>
              <span>Molecule, quantity, market, and timeline</span>
              <textarea name="message" rows="5" placeholder="Example: Amlodipine, annual volume, US/EU target market, documentation needs..." />
            </label>
            <button className="resource-btn resource-btn--primary" type="submit">
              Route enquiry
            </button>
            {status ? <p className="resource-form__status">{status}</p> : null}
          </form>
          <aside className="contact-office">
            <span className="resource-eyebrow">Corporate office</span>
            <h3>{page.office.title}</h3>
            <p>{page.office.address}</p>
            <a href={`tel:${page.office.phone.replaceAll("-", "")}`}>{page.office.phone}</a>
            <a href={`mailto:${page.office.email}`}>{page.office.email}</a>
          </aside>
        </div>
      </section>
    </>
  );
}

function GlobalPresenceExperience({ page }) {
  return (
    <>
      <GlobalMap regions={page.regions} />
      <section className="resource-section" aria-labelledby="manufacturing-footprint-title">
        <div className="resource-shell resource-section__head">
          <span className="resource-eyebrow">Manufacturing footprint</span>
          <h2 id="manufacturing-footprint-title">Hyderabad-based manufacturing for global API supply.</h2>
        </div>
        <div className="resource-shell facility-mini-grid">
          {facilities.map((facility) => (
            <article className="resource-card facility-mini" key={facility.slug}>
              <img src={facility.image} alt={`${facility.name} manufacturing facility`} loading="lazy" />
              <h3>{facility.name}</h3>
              <p>{facility.summary}</p>
              <a href={`/facilities/${facility.slug}/`}>Review facility</a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ApiSignalStrip() {
  return (
    <section className="resource-section resource-api-strip" aria-labelledby="api-signal-title">
      <div className="resource-shell resource-api-strip__inner">
        <div>
          <span className="resource-eyebrow">Portfolio signal</span>
          <h2 id="api-signal-title">Portfolio coverage buyers can search, filter, and qualify.</h2>
          <p>
            Aurore's digital API portfolio is structured for molecule discovery, CAS-level lookup, therapy-area browsing,
            RFQ routing, and intermediate family review.
          </p>
        </div>
        <div className="resource-api-strip__list">
          {products.slice(0, 6).map((product) => (
            <a href={`/products/${product.slug}/`} key={product.slug}>
              <strong>{product.name}</strong>
              <span>{product.category}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResourcePage({ slug }) {
  const page = resourcePages[slug] || resourcePages.quality;

  return (
    <main className="resource-page">
      <HeroSection page={page} />
      <StatsStrip stats={page.stats} />
      <SectionIntro intro={page.intro} />
      {page.timeline ? <RegulatoryTimeline items={page.timeline} /> : null}
      <PillarGrid page={page} />
      {page.dashboard ? <RegulatoryDashboard page={page} /> : null}
      {page.bands?.map((band) => (
        <HighlightBand band={band} key={band.title} />
      ))}
      {slug === "insights" ? <InsightsExperience page={page} /> : null}
      {slug === "downloads" ? <DownloadsExperience page={page} /> : null}
      {slug === "contact" ? <ContactExperience page={page} /> : null}
      {slug === "global-presence" ? <GlobalPresenceExperience page={page} /> : null}
      {["quality", "regulatory", "partner-with-us"].includes(slug) ? <ProofPanel page={page} /> : null}
      {slug !== "insights" && slug !== "downloads" ? <ApiSignalStrip /> : null}
      <CTASection cta={page.cta} />
    </main>
  );
}

export function mountResourcePage(rootElement, slug) {
  createRoot(rootElement).render(<ResourcePage slug={slug} />);
}
