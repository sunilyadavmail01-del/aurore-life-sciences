import { facilityLabel } from "./productData.js";

function chipClass(segmentId) {
  if (segmentId === "commercial") return "is-api";
  if (segmentId === "development") return "is-development";
  if (segmentId === "scale-up") return "is-scale-up";
  return "is-specialty";
}

export function ProductCard({ product, onSelect }) {
  return (
    <article className="portfolio-card">
      <div className="portfolio-card__top">
        <span className={`portfolio-chip ${chipClass(product.portfolioTypeId)}`}>{product.portfolioShortLabel}</span>
        <span>{product.status}</span>
      </div>
      <h3>{product.name}</h3>
      <dl>
        <div>
          <dt>Therapy</dt>
          <dd>{product.therapeuticCategory}</dd>
        </div>
        <div>
          <dt>USDMF</dt>
          <dd>{product.usdmf}</dd>
        </div>
        <div>
          <dt>CEP/EDMF</dt>
          <dd>{product.cepEdmf}</dd>
        </div>
        <div>
          <dt>Market note</dt>
          <dd>{product.others}</dd>
        </div>
      </dl>
      <p className="portfolio-card__note">{facilityLabel(product.facility)}</p>
      <div className="portfolio-card__actions">
        <button type="button" onClick={() => onSelect(product)}>
          View profile
        </button>
        <a href={`/#contact?product=${encodeURIComponent(product.name)}`}>Request RFQ</a>
      </div>
    </article>
  );
}
