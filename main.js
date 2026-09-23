import { profile, renderProfileLinks, renderBio, mountBio } from "./bio.js";
import { renderWorkingPapers } from "./working-papers.js";
import { renderPublications, mountPublications } from "./publications.js";
import { renderProjects } from "./projects.js";
import { renderTeaching } from "./teaching.js";
import { escapeHtml } from "./ui.js";

// Single registry for section order, sidebar labels, and navigation.
const sections = [
  { id: "bio", label: "Bio", render: renderBio },
  { id: "working-papers", label: "Working Papers", render: renderWorkingPapers },
  { id: "publications", label: "Publications", render: renderPublications },
  { id: "projects", label: "Projects", render: renderProjects },
  { id: "teaching", label: "Teaching", render: renderTeaching }
];

document.getElementById("app").innerHTML = `
  <a class="skip-link" href="#main-content">Skip to content</a>
  <div class="site-shell">
    <aside class="sidebar" aria-label="Profile and navigation">
      <div class="sidebar-profile">
        <a class="portrait-link" href="#bio" aria-label="Go to biography"><img class="portrait" src="${escapeHtml(profile.image)}" alt="${escapeHtml(profile.name)}" width="200" height="220"></a>
        <div><p class="profile-name">${escapeHtml(profile.name)}</p>
          <p class="profile-affiliation">${escapeHtml(profile.role)}<br>${escapeHtml(profile.department)}<br>${escapeHtml(profile.institution)}</p></div>
      </div>
      <nav class="section-nav" aria-label="Main navigation">
        ${sections.map(({ id, label }) => `<a href="#${id}" data-section="${id}">${label}</a>`).join("")}
      </nav>
      <div class="profile-links" aria-label="Contact and academic profiles">${renderProfileLinks()}</div>
    </aside>
    <main id="main-content" class="main-content" tabindex="-1">
      ${sections.map(({ render }) => render()).join("")}
      <footer class="site-footer">© ${new Date().getFullYear()} ${escapeHtml(profile.name)}. All rights reserved.</footer>
    </main>
  </div>`;

const navigation = [...document.querySelectorAll(".section-nav a")];
const sectionElements = sections.map(({ id }) => document.getElementById(id));

function setActiveSection(id) {
  navigation.forEach((link) => {
    if (link.dataset.section === id) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

function navigateToHash(focus = false) {
  const section = sectionElements.find((element) => `#${element.id}` === location.hash);
  if (!section) return;
  section.scrollIntoView({ behavior: "instant", block: "start" });
  if (focus) section.querySelector("h1, h2").focus({ preventScroll: true });
  setActiveSection(section.id);
}

// Native anchors preserve deep links, browser history, and keyboard navigation.
window.addEventListener("hashchange", () => navigateToHash(true));
let scrollPending = false;
function updateActiveSection() {
  scrollPending = false;
  let current = sectionElements[0];
  for (const section of sectionElements) {
    if (section.getBoundingClientRect().top <= 100) current = section;
  }
  if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
    current = sectionElements.at(-1);
  }
  setActiveSection(current.id);
}
window.addEventListener("scroll", () => {
  if (!scrollPending) {
    scrollPending = true;
    requestAnimationFrame(updateActiveSection);
  }
}, { passive: true });
setActiveSection("bio");
navigateToHash();

// Fetch once so the feed and publication list stay in sync. Other sections
// render immediately and remain available if publication loading fails.
let data = null;
let dataError = null;
try {
  const response = await fetch("scholar_complete.json");
  if (!response.ok) throw new Error(`Publication request failed (${response.status})`);
  data = await response.json();
  if (!Array.isArray(data.articles)) throw new Error("Invalid publication data");
} catch (error) {
  dataError = error;
  console.error(error);
}
mountBio(data, dataError);
mountPublications(data, dataError);
// Restore deep links after asynchronous content takes up its space.
requestAnimationFrame(() => {
  navigateToHash();
  updateActiveSection();
});
