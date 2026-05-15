import { facilityLabel } from "./productData.js";

function typeChipClass(segmentId) {
  if (segmentId === "commercial") return "portfolio-chip is-api";
  if (segmentId === "development") return "portfolio-chip is-development";
  if (segmentId === "scale-up") return "portfolio-chip is-scale-up";
  return "portfolio-chip is-specialty";
}

export function ProductTable({ products, onSelect }) {
  return (
    <div className="portfolio-table-wrap">
      <table className="portfolio-table">
        <caption>Aurore Life Sciences — searchable API portfolio</caption>
        <thead>
          <tr>
            <th scope="col">API molecule</th>
            <th scope="col">Portfolio</th>
            <th scope="col">Therapeutic category</th>
            <th scope="col">USDMF</th>
            <th scope="col">CEP / EDMF</th>
            <th scope="col">Status</th>
            <th scope="col">Market / technical note</th>
            <th scope="col"><span className="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <strong>{product.name}</strong>
                <span>{facilityLabel(product.facility)}</span>
              </td>
              <td>
                <span className={typeChipClass(product.portfolioTypeId)}>{product.portfolioShortLabel}</span>
              </td>
              <td>{product.therapeuticCategory}</td>
              <td>{product.usdmf}</td>
              <td>{product.cepEdmf}</td>
              <td>{product.status}</td>
              <td>{product.others}</td>
              <td>
                <button type="button" onClick={() => onSelect(product)}>
                  Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
