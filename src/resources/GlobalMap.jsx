import { useMemo, useState } from "react";

export function GlobalMap({ regions = [] }) {
  const [activeRegion, setActiveRegion] = useState(regions[0]?.name || "");
  const selected = useMemo(
    () => regions.find((region) => region.name === activeRegion) || regions[0],
    [activeRegion, regions]
  );

  if (!regions.length) return null;

  return (
    <section className="resource-section resource-section--soft" aria-labelledby="global-footprint-title">
      <div className="resource-shell resource-section__head">
        <span className="resource-eyebrow">Global footprint</span>
        <h2 id="global-footprint-title">Regional market support with documentation depth.</h2>
        <p>Explore Aurore's global API supply posture by region, filing relevance, and buyer support needs.</p>
      </div>
      <div className="resource-shell global-map">
        <div className="global-map__visual" aria-label="Interactive regional footprint">
          {regions.map((region, index) => (
            <button
              className={`global-map__pin pin-${index + 1}${region.name === selected.name ? " is-active" : ""}`}
              key={region.name}
              type="button"
              onClick={() => setActiveRegion(region.name)}
            >
              <span>{region.name}</span>
            </button>
          ))}
        </div>
        <article className="global-map__detail">
          <span className="resource-eyebrow">Selected region</span>
          <h3>{selected.name}</h3>
          <p className="global-map__markets">{selected.markets}</p>
          <p>{selected.focus}</p>
          <div className="resource-chip-row">
            {selected.approvals.map((approval) => (
              <span className="resource-chip" key={approval}>
                {approval}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
