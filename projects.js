import { renderEntry } from "./ui.js";

// Add entries as { title, description, authors, year, link }.
export const projects = [];

export function renderProjects() {
  return `<section id="projects" class="page-section" aria-labelledby="projects-title">
    <h2 id="projects-title" class="section-title" tabindex="-1">Projects</h2>
    ${projects.length ? projects.map(renderEntry).join("") : '<p class="empty-state">Details coming soon.</p>'}
  </section>`;
}
