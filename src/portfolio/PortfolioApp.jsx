import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./portfolio.css";
import { ProductCard } from "./ProductCard.jsx";
import { ProductDetailModal } from "./ProductDetailModal.jsx";
import { ProductFilters } from "./ProductFilters.jsx";
import { ProductSearch } from "./ProductSearch.jsx";
import { ProductTable } from "./ProductTable.jsx";
import {
  portfolioApprovals,
  portfolioFilterOptions,
  portfolioProducts,
  portfolioSegments,
  portfolioStats
} from "./productData.js";

const PAGE_SIZE = 18;

const SPOTLIGHT_APIS = portfolioProducts.filter((item) => item.type === "API").slice(0, 4);

const fuse = new Fuse(portfolioProducts, {
  keys: [
    { name: "name", weight: 0.42 },
    { name: "therapeuticCategory", weight: 0.22 },
    { name: "portfolioType", weight: 0.14 },
    { name: "status", weight: 0.12 },
    { name: "others", weight: 0.12 },
    { name: "searchableKeywords", weight: 0.16 }
  ],
  threshold: 0.35,
  ignoreLocation: true,
  includeScore: true
});

function filterPortfolio(items, query, filters, activeLetter) {
  let candidates = items;
  if (query.trim()) {
    candidates = fuse.search(query.trim()).map((r) => r.item);
  }
  return candidates.filter((item) => {
    const matchesSegment = filters.segment === "All portfolio segments" || item.portfolioTypeId === filters.segment;
    const matchesCategory = filters.category === "All therapeutic categories" || item.therapeuticCategory === filters.category;
    const matchesStatus = filters.status === "All development stages" || item.status === filters.status;
    const matchesFiling =
      filters.filing === "All filing profiles" ||
      item.regulatoryRelevance.includes(filters.filing) ||
      item.usdmf === filters.filing ||
      item.cepEdmf === filters.filing;
    const matchesLetter = query.trim() || activeLetter === "All" || item.name.toUpperCase().startsWith(activeLetter);
    return matchesSegment && matchesCategory && matchesStatus && matchesFiling && matchesLetter;
  });
}

function PortfolioApp() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    segment: "All portfolio segments",
    category: "All therapeutic categories",
    status: "All development stages",
    filing: "All filing profiles"
  });
  const [activeLetter, setActiveLetter] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [selected, setSelected] = useState(null);
  const [viewMode, setViewMode] = useState("cards");

  const filteredProducts = useMemo(
    () => filterPortfolio(portfolioProducts, query, filters, activeLetter),
    [activeLetter, filters, query]
  );
  const visibleProducts = filteredProducts.slice(0, visibleCount);

  const activeFilters = useMemo(() => {
    const chips = [];
    if (query.trim()) chips.push(`"${query.trim()}"`);
    if (filters.segment !== "All portfolio segments") chips.push(portfolioSegments.find((segment) => segment.id === filters.segment)?.label || filters.segment);
    if (filters.category !== "All therapeutic categories") chips.push(filters.category);
    if (filters.status !== "All development stages") chips.push(filters.status);
    if (filters.filing !== "All filing profiles") chips.push(filters.filing);
    if (activeLetter !== "All") chips.push(`A–Z: ${activeLetter}`);
    return chips;
  }, [query, filters, activeLetter]);

  function updateFilter(key, value) {
    setFilters((current) => ({ ...current, [key]: value }));
    setVisibleCount(PAGE_SIZE);
  }

  function resetFilters() {
    setQuery("");
    setFilters({
      segment: "All portfolio segments",
      category: "All therapeutic categories",
      status: "All development stages",
      filing: "All filing profiles"
    });
    setActiveLetter("All");
    setVisibleCount(PAGE_SIZE);
  }

  return (
    <main className="portfolio-platform">

      {/* ── Hero ── */}
      <section className="portfolio-hero">
        <div className="shell portfolio-hero__inner">
          <div>
            <span className="portfolio-kicker">API intelligence platform</span>
            <h1>API portfolio intelligence for regulated global sourcing.</h1>
            <p>
              Search Aurore's commercial, niche, validation, scale-up, and development API portfolio with filing signals,
              therapeutic categories, market notes, and RFQ-ready product profiles.
            </p>
            <div className="portfolio-hero__actions">
              <a className="btn btn-primary" href="#portfolio-explorer">
                Explore portfolio
              </a>
              <a className="btn btn-secondary" href="/#contact">
                Request technical discussion
              </a>
            </div>
          </div>
          <aside className="portfolio-hero__visual" aria-label="Portfolio coverage summary">
            <div>
              <strong>{portfolioStats.apiCount}</strong>
              <span>Total APIs mapped</span>
            </div>
            <div>
              <strong>{portfolioStats.commercialCount}</strong>
              <span>Commercial APIs</span>
            </div>
            <div>
              <strong>{portfolioStats.pipelineCount}</strong>
              <span>Pipeline / specialty APIs</span>
            </div>
            <div>
              <strong>{portfolioStats.categoryCount}</strong>
              <span>Therapy categories</span>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Regulatory approval strip ── */}
      <div className="portfolio-approvals" aria-label="Regulatory approvals">
        <div className="shell portfolio-approvals__inner">
          <span className="portfolio-approvals__label">Regulatory approvals</span>
          {portfolioApprovals.map((label) => (
            <span key={label} className="portfolio-approval-badge">{label}</span>
          ))}
        </div>
      </div>

      {/* ── Molecule spotlight ── */}
      <section className="portfolio-section portfolio-spotlight" aria-labelledby="portfolio-spotlight-title">
        <div className="shell">
          <div className="portfolio-section__head">
            <span className="portfolio-kicker">Molecule spotlight</span>
            <h2 id="portfolio-spotlight-title">High-signal starting points for supplier evaluation</h2>
            <p>Open any molecule profile to review filing status, market notes, and enquiry routes.</p>
          </div>
          <div className="portfolio-spotlight__grid">
            {SPOTLIGHT_APIS.map((item) => (
              <button key={item.id} type="button" onClick={() => setSelected(item)}>
                <span>{item.category}</span>
                <strong>{item.name}</strong>
                <small>{item.status} · {item.filings}</small>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-section portfolio-segments" aria-labelledby="portfolio-segments-title">
        <div className="shell">
          <div className="portfolio-section__head">
            <span className="portfolio-kicker">Portfolio architecture</span>
            <h2 id="portfolio-segments-title">Segmented for procurement, technical, and BD workflows</h2>
            <p>Each portfolio group is filterable, searchable, and wired into the same product profile and RFQ flow.</p>
          </div>
          <div className="portfolio-segments__grid">
            {portfolioSegments.map((segment) => {
              const count = portfolioProducts.filter((item) => item.portfolioTypeId === segment.id).length;
              return (
                <button key={segment.id} type="button" onClick={() => updateFilter("segment", segment.id)}>
                  <span>{String(count).padStart(2, "0")}</span>
                  <strong>{segment.label}</strong>
                  <small>{segment.description}</small>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Portfolio explorer ── */}
      <section className="portfolio-section" id="portfolio-explorer" aria-labelledby="portfolio-explorer-title">
        <div className="shell">
          <div className="portfolio-section__head">
            <span className="portfolio-kicker">Searchable portfolio</span>
            <h2 id="portfolio-explorer-title">API portfolio explorer</h2>
            <p>
              Search across API names, therapeutic categories, development stages, filing status, and regional market notes.
              Fuzzy search handles typos and alternate spelling.
            </p>
          </div>
        </div>

        <div className="portfolio-toolbar">
          <div className="shell portfolio-toolbar__inner">
            <ProductSearch query={query} onQueryChange={(val) => { setQuery(val); setVisibleCount(PAGE_SIZE); }} resultCount={filteredProducts.length} />
            <ProductFilters
              filters={filters}
              options={portfolioFilterOptions}
              onFilterChange={updateFilter}
              onReset={resetFilters}
              activeCount={activeFilters.length}
            />
            <div className="portfolio-view-toggle" aria-label="View mode">
              <button type="button" className={viewMode === "cards" ? "is-active" : ""} onClick={() => setViewMode("cards")}>
                Cards
              </button>
              <button type="button" className={viewMode === "table" ? "is-active" : ""} onClick={() => setViewMode("table")}>
                Table
              </button>
            </div>
            <div className="portfolio-letters" aria-label="Browse alphabetically">
              {portfolioFilterOptions.letters.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  className={activeLetter === letter ? "is-active" : ""}
                  aria-pressed={activeLetter === letter}
                  onClick={() => {
                    setActiveLetter(letter);
                    setVisibleCount(PAGE_SIZE);
                  }}
                >
                  {letter}
                </button>
              ))}
            </div>
            {activeFilters.length > 0 && (
              <div className="portfolio-active-filters" aria-live="polite">
                <span className="portfolio-active-filters__label">Filtered by</span>
                {activeFilters.map((chip) => (
                  <span key={chip} className="portfolio-active-filter">{chip}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="shell portfolio-results">
          {filteredProducts.length ? (
            viewMode === "cards" ? (
              <div className="portfolio-grid">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onSelect={setSelected} />
                ))}
              </div>
            ) : (
              <ProductTable products={visibleProducts} onSelect={setSelected} />
            )
          ) : (
            <div className="portfolio-empty" role="status">
              <div className="portfolio-empty__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                </svg>
              </div>
              <h3>No matching products found</h3>
              <p>Try a different API name, CAS number, or therapy area, or clear the active filters.</p>
              <button type="button" onClick={resetFilters}>Reset portfolio</button>
            </div>
          )}
          {visibleCount < filteredProducts.length ? (
            <button className="portfolio-load" type="button" onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}>
              Load more ({filteredProducts.length - visibleCount} remaining)
            </button>
          ) : null}
        </div>
      </section>

      {/* ── Proof stats ── */}
      <section className="portfolio-section portfolio-proof" aria-labelledby="portfolio-proof-title">
        <div className="shell portfolio-proof__inner">
          <div className="portfolio-proof__copy">
            <span className="portfolio-kicker">Regulatory depth</span>
            <h2 id="portfolio-proof-title">Built for regulated-market qualification.</h2>
            <p>
              Each product record connects portfolio stage, therapeutic category, DMF signals, facility context, and
              direct RFQ paths — so commercial, regulatory, and technical teams evaluate the portfolio with less friction.
            </p>
          </div>
          <div className="portfolio-proof__metrics">
            <div>
              <strong>{portfolioStats.approvalCount}</strong>
              <span>regulatory approval signals</span>
            </div>
            <div>
              <strong>{portfolioStats.validationCount}</strong>
              <span>validation-stage APIs</span>
            </div>
            <div>
              <strong>{portfolioStats.commercialCount}</strong>
              <span>commercial APIs</span>
            </div>
            <div>
              <strong>{portfolioStats.developmentCount}</strong>
              <span>development APIs</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="portfolio-final">
        <div className="shell">
          <span className="portfolio-kicker">Commercial engagement</span>
          <h2>Move from search to supplier qualification.</h2>
          <p>Share molecule, market, volume, documentation, and timeline context so Aurore can route the enquiry to the right team.</p>
          <div className="portfolio-final__actions">
            <a className="btn btn-primary" href="/#contact">Request RFQ</a>
            <a className="btn btn-secondary" href="/regulatory/">View regulatory dashboard</a>
          </div>
        </div>
      </section>

      <ProductDetailModal product={selected} onClose={() => setSelected(null)} />
    </main>
  );
}

export function mountPortfolioApp(target) {
  const root = createRoot(target);
  root.render(<PortfolioApp />);
}
