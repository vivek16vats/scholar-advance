import { escapeHtml } from "./ui.js";

// Teaching history carried over from the original profile.
export const teaching = [
  {
    institution: "IIT Jodhpur", role: "Instructor",
    courses: [
      "Introduction to Climate Change Economics (UG) — 2026",
      "Markets and the Economy (UG) — 2026",
      "Fundamentals of Economics (UG) — 2026",
      "Introduction to Green Economy (UG) — 2026",
      "Environmental Economics and Management (PG) — 2025",
      "Development and Environment (UG) — 2025",
      "Health and Development (UG) — 2025",
      "Engineering Design (UG) — 2025 (×2)"
    ]
  },
  {
    institution: "University of Auckland", role: "Teaching Fellow",
    courses: [
      "Principles of Economics (UG) — 2023 (×2)",
      "Economics, Markets and Law (UG) — 2021; 2022 (×2); 2023 (×2)",
      "Understanding the Global Economy (UG Summer School) — 2021; 2022"
    ]
  },
  {
    institution: "University of Auckland", role: "Teaching Assistant",
    courses: [
      "Energy and Environmental Economics (UG) — 2021; 2022",
      "Microeconomic Analysis (UG) — 2021 (×2); 2022",
      "Energy Economics (PG) — 2020",
      "Public Economics and Policy (PG) — 2020",
      "Understanding the Global Economy (UG) — 2019; 2020 (×2)"
    ]
  }
];

export function renderTeaching() {
  return `<section id="teaching" class="page-section" aria-labelledby="teaching-title">
    <h2 id="teaching-title" class="section-title" tabindex="-1">Teaching</h2>
    ${teaching.map(({ institution, role, courses }) => `<article class="entry">
      <h3 class="entry-title">${escapeHtml(institution)}</h3>
      <p class="entry-meta">${escapeHtml(role)}</p>
      <ul class="course-list">${courses.map((course) => `<li>${escapeHtml(course)}</li>`).join("")}</ul>
    </article>`).join("")}
  </section>`;
}
