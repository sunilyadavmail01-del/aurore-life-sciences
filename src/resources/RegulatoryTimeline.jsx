export function RegulatoryTimeline({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="resource-section resource-section--soft" aria-labelledby="regulatory-timeline-title">
      <div className="resource-shell resource-section__head">
        <span className="resource-eyebrow">Regulatory operating model</span>
        <h2 id="regulatory-timeline-title">From market strategy to lifecycle maintenance.</h2>
        <p>Each step is designed to help customers qualify Aurore with better documentation, clearer accountability, and faster technical response.</p>
      </div>
      <div className="resource-shell regulatory-timeline">
        {items.map((item) => (
          <article className="regulatory-timeline__item" key={item.step}>
            <span>{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
