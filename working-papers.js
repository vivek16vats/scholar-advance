import { renderEntry } from "./ui.js";

// Add entries as { title, authors, year, description, link, abstract }.
export const workingPapers = [];

export function renderWorkingPapers() {
  return `<section id="working-papers" class="page-section" aria-labelledby="working-papers-title">
    <h2 id="working-papers-title" class="section-title" tabindex="-1">Working Papers</h2>
    ${workingPapers.length ? workingPapers.map(renderEntry).join("") : '<p class="empty-state">Details coming soon.</p>'}
  </section>`;
}
