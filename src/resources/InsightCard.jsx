export function InsightCard({ topic, featured = false }) {
  return (
    <article className={`resource-card insight-card${featured ? " insight-card--featured" : ""}`}>
      <span>{topic.category}</span>
      <h3>{topic.title}</h3>
      <p>{topic.description || topic.excerpt}</p>
      <a href={topic.href || `/insights/${topic.slug}/`}>Read perspective</a>
    </article>
  );
}
