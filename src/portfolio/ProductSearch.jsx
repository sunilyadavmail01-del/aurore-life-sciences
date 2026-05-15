export function ProductSearch({ query, onQueryChange, resultCount }) {
  return (
    <div className="portfolio-search">
      <label className="portfolio-search__label" htmlFor="portfolio-q">
        Enterprise search
      </label>
      <div className="portfolio-search__input-wrap">
        <input
          id="portfolio-q"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          type="search"
          placeholder="API name, therapy area, filing status, market..."
          aria-label={`Search portfolio. ${resultCount} matching record${resultCount !== 1 ? "s" : ""}`}
          autoComplete="off"
          spellCheck="false"
        />
      </div>
      <p className="portfolio-search__meta" aria-live="polite">
        {resultCount} matching API{resultCount !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
