import { useEffect, useMemo, useState } from "react";
import { facilityLabel, relatedPortfolioItems } from "./productData.js";

function makeReference(product) {
  const date = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const cleanApi = product.api.replace(/[^a-z0-9]+/gi, "").slice(0, 8).toUpperCase();
  return `ALS-${product.type === "API" ? "API" : "INT"}-${cleanApi}-${date}`;
}

function downloadProfile(product) {
  const ref = makeReference(product);
  const regulatory = product.regulatoryRelevance.length
    ? product.regulatoryRelevance.join(", ")
    : product.filings;
  const content = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${product.api} — Product Profile | Aurore Life Sciences</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Arial, Helvetica, sans-serif; max-width: 820px; margin: 48px auto; padding: 0 32px; color: #1a2b1e; }
    header { border-bottom: 3px solid #009a44; padding-bottom: 20px; margin-bottom: 28px; }
    header .badge { display: inline-block; background: #eef8f1; color: #004d28; font-size: 10px; font-weight: bold; letter-spacing: 0.1em; text-transform: uppercase; padding: 4px 10px; border-radius: 999px; margin-bottom: 12px; }
    h1 { font-size: 32px; color: #004d28; line-height: 1.1; }
    h1 small { display: block; font-size: 14px; font-weight: normal; color: #5c665f; margin-top: 6px; }
    .grid { display: grid; grid-template-columns: 170px 1fr; gap: 10px 20px; margin: 24px 0; }
    .label { font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.08em; color: #5c665f; padding-top: 2px; }
    .value { font-size: 13px; line-height: 1.5; }
    .summary { background: #f6f9f6; border-left: 3px solid #009a44; padding: 16px 20px; border-radius: 0 6px 6px 0; margin: 20px 0; font-size: 13px; line-height: 1.7; }
    footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #dce5de; display: flex; justify-content: space-between; align-items: center; font-size: 11px; color: #5c665f; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <header>
    <div class="badge">${product.type}</div>
    <h1>${product.api}<small>${product.intermediate || product.category}</small></h1>
  </header>
  <div class="grid">
    <span class="label">CAS Number</span><span class="value" style="font-family:monospace">${product.casNo || "Available on request"}</span>
    <span class="label">Therapeutic category</span><span class="value">${product.category}</span>
    <span class="label">Regulatory filings</span><span class="value">${regulatory}</span>
    <span class="label">Annual capacity</span><span class="value">${product.capacity || "Program dependent"}</span>
    <span class="label">Manufacturing network</span><span class="value">${facilityLabel(product.facility)}</span>
    <span class="label">Market focus</span><span class="value">${product.marketFocus}</span>
    <span class="label">Reference</span><span class="value" style="font-family:monospace;font-size:11px">${ref}</span>
  </div>
  <div class="summary">${product.summary}</div>
  <footer>
    <span>Aurore Life Sciences Private Limited — aurorels.com</span>
    <span>Generated ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</span>
  </footer>
</body>
</html>`;
  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${product.slug || product.api.replace(/\s+/g, "-").toLowerCase()}-product-profile.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function ReadinessPanel({ product }) {
  const signals = [
    ["USDMF", product.usdmf],
    ["CEP / EDMF", product.cepEdmf],
    ["Stage", product.status]
  ];
  return (
    <aside className="portfolio-readiness" aria-label={`${product.name} readiness signals`}>
      {signals.map(([label, value]) => (
        <div key={label}>
          <span>{label}</span>
          <strong>{value || "On request"}</strong>
        </div>
      ))}
      <small>{product.portfolioType}</small>
    </aside>
  );
}

export function ProductDetailModal({ product, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const related = useMemo(() => relatedPortfolioItems(product), [product]);

  useEffect(() => {
    if (!product) return undefined;
    setSubmitted(false);
    setIsLoading(false);
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("portfolio-modal-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("portfolio-modal-open");
    };
  }, [onClose, product]);

  if (!product) return null;

  const ref = makeReference(product);

  return (
    <div className="portfolio-modal" role="dialog" aria-modal="true" aria-labelledby="portfolio-modal-title">
      <button className="portfolio-modal__shade" type="button" aria-label="Close product details" onClick={onClose} />
      <div className="portfolio-modal__panel">
        <button className="portfolio-modal__close" type="button" onClick={onClose} aria-label="Close">
          ×
        </button>

        <div className="portfolio-modal__header">
          <span>{product.portfolioType}</span>
          <h2 id="portfolio-modal-title">{product.name}</h2>
          <p>{product.summary}</p>
        </div>

        <div className="portfolio-modal__grid">
          <section className="portfolio-modal__intel">
            <div className="portfolio-modal__intel-top">
              <div>
                <h3>Product intelligence</h3>
                <dl className="portfolio-detail-list">
                  <div>
                    <dt>CAS number</dt>
                    <dd style={{ fontFamily: "monospace", fontSize: "13px" }}>
                      {product.casNo || "Available on request"}
                    </dd>
                  </div>
                  <div>
                    <dt>Therapeutic category</dt>
                    <dd>{product.therapeuticCategory}</dd>
                  </div>
                  <div>
                    <dt>Portfolio segment</dt>
                    <dd>{product.portfolioType}</dd>
                  </div>
                  <div>
                    <dt>USDMF</dt>
                    <dd>{product.usdmf}</dd>
                  </div>
                  <div>
                    <dt>CEP / EDMF</dt>
                    <dd>{product.cepEdmf}</dd>
                  </div>
                  <div>
                    <dt>Current status</dt>
                    <dd>{product.status}</dd>
                  </div>
                  <div>
                    <dt>Market / technical note</dt>
                    <dd>{product.marketFocus}</dd>
                  </div>
                  <div>
                    <dt>Manufacturing network</dt>
                    <dd>{facilityLabel(product.facility)}</dd>
                  </div>
                </dl>
              </div>
              <ReadinessPanel product={product} />
            </div>

            <button
              type="button"
              className="portfolio-download"
              onClick={() => downloadProfile(product)}
              aria-label={`Download product profile for ${product.api}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download product profile
            </button>

            {related.length > 0 && (
              <div className="portfolio-related">
                <h3>Related molecules</h3>
                <div className="portfolio-related__pills">
                  {related.map((item) => (
                    <a key={item.id} href={item.href}>
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </section>

          <form
            key={product.id}
            className="portfolio-rfq"
            onSubmit={async (event) => {
              event.preventDefault();
              setIsLoading(true);
              const formData = new FormData(event.currentTarget);
              formData.append("form-name", "portfolio-rfq");
              formData.append("molecule", product.api);
              formData.append("casNo", product.casNo || "");
              try {
                await fetch("/", {
                  method: "POST",
                  headers: { "Content-Type": "application/x-www-form-urlencoded" },
                  body: new URLSearchParams(formData).toString()
                });
              } catch (_) {}
              setIsLoading(false);
              setSubmitted(true);
            }}
          >
            <h3>Start RFQ or technical discussion</h3>

            <label>
              <span>Company name *</span>
              <input type="text" name="company" placeholder="Your pharmaceutical company" required />
            </label>
            <label>
              <span>Business email *</span>
              <input type="email" name="email" placeholder="name@company.com" required />
            </label>
            <label>
              <span>Phone / WhatsApp</span>
              <input type="tel" name="phone" placeholder="+1 555 000 0000" />
            </label>
            <label>
              <span>Request focus</span>
              <select name="requestType">
                <option>RFQ / commercial quote</option>
                <option>Technical discussion</option>
                <option>COA / documentation request</option>
                <option>Commercial supply review</option>
                <option>Regulatory support / DMF query</option>
              </select>
            </label>
            <div className="portfolio-rfq__row">
              <label>
                <span>Target market</span>
                <select name="targetMarket">
                  <option value="">Select region</option>
                  <option>United States</option>
                  <option>European Union</option>
                  <option>United Kingdom</option>
                  <option>Japan</option>
                  <option>Canada</option>
                  <option>Australia</option>
                  <option>Latin America</option>
                  <option>Middle East &amp; Africa</option>
                  <option>South East Asia</option>
                  <option>India</option>
                  <option>Other / Multiple</option>
                </select>
              </label>
              <label>
                <span>Annual volume (kg)</span>
                <select name="volume">
                  <option value="">Select range</option>
                  <option>&lt; 10 kg</option>
                  <option>10 – 100 kg</option>
                  <option>100 – 500 kg</option>
                  <option>500 – 2,000 kg</option>
                  <option>2,000 – 10,000 kg</option>
                  <option>&gt; 10,000 kg</option>
                </select>
              </label>
            </div>
            <label>
              <span>Timeline</span>
              <select name="timeline">
                <option value="">Select timeline</option>
                <option>Immediate — within 30 days</option>
                <option>Short-term — 1–3 months</option>
                <option>Mid-term — 3–6 months</option>
                <option>Long-term — 6–12 months</option>
                <option>Strategic planning — 12+ months</option>
              </select>
            </label>
            <label>
              <span>Notes (molecule, specification, documentation needs)</span>
              <textarea
                name="notes"
                defaultValue={`${product.name} — ${product.portfolioType}`}
              />
            </label>

            {!submitted ? (
              <button type="submit" className="portfolio-rfq__submit" disabled={isLoading}>
                {isLoading ? "Submitting…" : "Submit enquiry"}
              </button>
            ) : null}

            <a className="portfolio-rfq__contact" href={`/#contact?product=${encodeURIComponent(product.api)}`}>
              Full RFQ form → commercial team
            </a>

            {submitted && (
              <div className="portfolio-rfq__success" role="status">
                <strong>Enquiry received — thank you.</strong>
                <p>
                  Your request for <strong>{product.api}</strong> has been routed to the commercial team.
                  Expect a response within one business day.
                </p>
                <span className="portfolio-rfq__ref">Reference: {ref}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
