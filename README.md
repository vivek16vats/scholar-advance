# Souryabrata Mohapatra — academic website

A static, single-page website with a fixed desktop sidebar and independently editable sections. On small screens the profile and navigation sit above the content. No build step is required.

## Preview locally

From this directory, run `python -m http.server 8000`, then open `http://localhost:8000`. Use an HTTP server rather than opening `index.html` directly because the page uses JavaScript modules and fetches JSON.

## File responsibilities

| File | Edit here |
| --- | --- |
| `main.js` | Page shell, section order, sidebar navigation, shared data loading |
| `bio.js` | Welcome heading, biography, interests, portrait path, contact/profile links |
| `app.js` | Research feed carousel, mounted inside Bio |
| `working-papers.js` | Working paper entries (currently empty) |
| `publications.js` | Publication list and optional curated overrides |
| `projects.js` | Project entries (currently empty) |
| `teaching.js` | Institutions, teaching roles, and course lists |
| `ui.js` | Shared entry markup and HTML/URL helpers |
| `style.css` | Design tokens, layout, shared components, responsive rules |
| `scholar_complete.json` | Publication data shared by the feed and Publications |

Navigation uses section anchors (`#bio`, `#working-papers`, `#publications`, `#projects`, `#teaching`). Links support direct loading and browser back/forward; the active sidebar item follows scrolling.

## Content format

Populate the arrays in `working-papers.js` and `projects.js` with objects:

```js
{
  title: "Paper or project title",
  authors: "Author names",
  year: "2026",
  description: "Optional description",
  link: "https://example.com/paper",
  abstract: "Optional expandable abstract"
}
```

Empty arrays display “Details coming soon.” Publications use all entries from the local Scholar dataset, newest first; set `publicationOverrides` in `publications.js` to an array if you want a curated list. Update the dataset through the existing `RSS.py` workflow.

## CSS standards

Use the variables at the top of `style.css` for site-wide changes:

| Role | Size token | Color token |
| --- | --- | --- |
| Body copy | `--font-body` (16px) | `--color-text` |
| Welcome heading | `--font-title` (responsive) | `--color-heading` |
| Section headings | `--font-section` (20px) | `--color-heading` |
| Paper/course headings | `--font-entry` (16px) | `--color-heading` |
| Supporting text | `--font-small` (14px) | `--color-muted` |
| Interest labels | `--font-label` (13px) | `--color-label` |
| Links | Inherited size | `--color-link` |

Reuse `.page-section`, `.section-title`, `.entry`, `.entry-title`, `.entry-meta`, and `.label` across sections. `.research-card` owns card appearance; `.carousel-*` rules own carousel layout and controls. Use the spacing tokens rather than adding separate typography or colors for each section.

The existing GitHub Pages and Scholar update workflows remain in place. A failed data request leaves the profile, navigation, and other sections usable, with a local unavailable message for the feed and Publications.
