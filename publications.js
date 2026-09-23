import { renderEntry } from "./ui.js";

// By default use scholar_complete.json, also used by the Bio feed.
// Set an array of { title, authors, publication, year, link } to curate the list.
export const publicationOverrides = null;

export function renderPublications() {
  return `<section id="publications" class="page-section" aria-labelledby="publications-title">
    <h2 id="publications-title" class="section-title" tabindex="-1">Publications</h2>
    <div id="publication-list"><p class="empty-state" role="status">Loading publications…</p></div>
  </section>`;
}

export function mountPublications(data, error) {
  const entries = publicationOverrides ?? data?.articles ?? [];
  document.getElementById("publication-list").innerHTML = entries.length
    ? [...entries].sort((a, b) => Number(b.year || 0) - Number(a.year || 0)).map(renderEntry).join("")
    : `<p class="empty-state" role="status">${error ? "Publications are temporarily unavailable. Please try again later." : "Details coming soon."}</p>`;
}
