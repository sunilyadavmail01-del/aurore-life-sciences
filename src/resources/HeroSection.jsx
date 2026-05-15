export function HeroSection({ page }) {
  return (
    <section className="resource-hero">
      <div className="resource-hero__media" aria-hidden="true">
        <img src={page.image} alt="" loading="eager" />
      </div>
      <div className="resource-hero__overlay" aria-hidden="true" />
      <div className="resource-shell resource-hero__inner">
        <div className="resource-hero__copy">
          <span className="resource-eyebrow">{page.eyebrow}</span>
          <h1>{page.title}</h1>
          <p>{page.description}</p>
          <div className="resource-hero__actions">
            <a className="resource-btn resource-btn--primary" href="/contact/#rfq">
              Request RFQ
            </a>
            <a className="resource-btn resource-btn--secondary" href="/products/">
              View API portfolio
            </a>
          </div>
        </div>
        <aside className="resource-hero__panel" aria-label={`${page.label} page highlights`}>
          {page.stats?.slice(0, 4).map((stat) => (
            <div className="resource-hero__metric" key={`${stat.value}-${stat.label}`}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
