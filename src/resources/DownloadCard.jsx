export function DownloadCard({ item }) {
  return (
    <article className="resource-card download-card">
      <div className="download-card__icon" aria-hidden="true">
        PDF
      </div>
      <div>
        <span>{item.type}</span>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="download-card__footer">
          <small>{item.meta}</small>
          <a href={`/contact/#rfq?resource=${encodeURIComponent(item.title)}`}>{item.cta}</a>
        </div>
      </div>
    </article>
  );
}
