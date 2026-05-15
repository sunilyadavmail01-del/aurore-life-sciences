export function ProductFilters({ filters, options, onFilterChange, onReset, activeCount }) {
  return (
    <div className="portfolio-filters" aria-label="Portfolio filters">
      <label>
        <span>Portfolio segment</span>
        <select value={filters.segment} onChange={(event) => onFilterChange("segment", event.target.value)}>
          {options.segments.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Therapeutic category</span>
        <select value={filters.category} onChange={(event) => onFilterChange("category", event.target.value)}>
          {options.categories.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Development stage</span>
        <select value={filters.status} onChange={(event) => onFilterChange("status", event.target.value)}>
          {options.statuses.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>
      <label>
        <span>Filing profile</span>
        <select value={filters.filing} onChange={(event) => onFilterChange("filing", event.target.value)}>
          {options.filings.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </label>
      <button
        className="portfolio-reset"
        type="button"
        onClick={onReset}
        aria-label={activeCount > 0 ? `Reset ${activeCount} active filter${activeCount !== 1 ? "s" : ""}` : "Reset filters"}
      >
        {activeCount > 0 ? `Reset (${activeCount})` : "Reset"}
      </button>
    </div>
  );
}
