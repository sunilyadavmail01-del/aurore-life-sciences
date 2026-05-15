export function CTASection({ cta }) {
  if (!cta) return null;

  return (
    <section className="resource-cta" aria-labelledby="resource-cta-title">
      <div className="resource-shell resource-cta__inner">
        <div>
          <span className="resource-eyebrow">{cta.eyebrow}</span>
          <h2 id="resource-cta-title">{cta.title}</h2>
          <p>{cta.body}</p>
        </div>
        <div className="resource-cta__actions">
          <a className="resource-btn resource-btn--primary" href={cta.primary.href}>
            {cta.primary.label}
          </a>
          <a className="resource-btn resource-btn--outline" href={cta.secondary.href}>
            {cta.secondary.label}
          </a>
        </div>
      </div>
    </section>
  );
}
