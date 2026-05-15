export function StatsStrip({ stats = [] }) {
  return (
    <section className="resource-stat-strip" aria-label="Aurore capability metrics">
      <div className="resource-shell resource-stat-strip__grid">
        {stats.map((stat) => (
          <article className="resource-stat" key={`${stat.value}-${stat.label}`}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
