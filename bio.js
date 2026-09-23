import { initializeResearchFeed } from "./app.js";
import { escapeHtml, safeUrl } from "./ui.js";

// Edit profile copy and links here. The portrait is shared with the sidebar.
export const profile = {
  name: "Souryabrata Mohapatra",
  role: "Assistant Professor",
  department: "Department of Economics",
  institution: "IIT Jodhpur",
  image: "sourya.jpg",
  heading: "Welcome to my site!",
  paragraphs: [
    "I am an Assistant Professor in the Department of Economics at IIT Jodhpur. I completed my PhD in Economics from the University of Auckland Business School.",
    "My research examines climate risks, agricultural transformation, circular systems, energy transitions, and distress migration, particularly in contexts shaped by structural development challenges.",
    "Teaching is one of the most fulfilling aspects of my work. I especially enjoy teaching microeconomics, environmental economics, and econometrics.",
    "I am always open to new ideas. Please feel free to drop me an email."
  ],
  interests: ["Applied Economics", "Climate Change", "Agricultural Transformation", "Green Transition", "Just Migration"],
  links: [
    { label: "Email", icon: "✉", href: "mailto:smohapatra@iitj.ac.in" },
    { label: "CV", icon: "CV", href: "https://drive.google.com/file/d/1U140KvmDrV1PHdIoye6PJWZWILVVoAxL/view?usp=sharing" },
    { label: "Google Scholar", icon: "g", href: "https://scholar.google.com/citations?user=TKbYqt0AAAAJ&hl=en" },
    { label: "LinkedIn", icon: "in", href: "https://www.linkedin.com/in/souryabrata" },
    { label: "ORCID", icon: "iD", href: "https://orcid.org/0000-0002-3627-8739" }
  ],

};

export function renderProfileLinks() {
  return profile.links.map(({ label, icon, href }) =>
    `<a href="${safeUrl(href)}" aria-label="${escapeHtml(label)}" title="${escapeHtml(label)}" class="social-icon"${href.startsWith("mailto:") ? "" : ' target="_blank" rel="noopener noreferrer"'}><span aria-hidden="true">${escapeHtml(icon || label)}</span></a>`
  ).join("");
}

export function renderBio() {
  return `<section id="bio" class="page-section bio-section" aria-labelledby="bio-title">
    <h1 id="bio-title" class="page-title" tabindex="-1">${escapeHtml(profile.heading)}</h1>
    <div class="bio-copy">${profile.paragraphs.map((text) => `<p>${escapeHtml(text)}</p>`).join("")}</div>
    <ul class="interest-list" aria-label="Research interests">${profile.interests.map((interest) => `<li class="label">${escapeHtml(interest)}</li>`).join("")}</ul>
    <div class="research-feed" aria-labelledby="research-feed-title">
      <h2 id="research-feed-title" class="section-title">Research Feed</h2>
      <div id="research-feed"><p class="empty-state" role="status">Loading research feed…</p></div>
    </div>
  </section>`;
}

export function mountBio(data, error) {
  if (error) {
    document.getElementById("research-feed").innerHTML = '<p class="empty-state" role="status">The research feed is temporarily unavailable. Please try again later.</p>';
    return;
  }
  initializeResearchFeed(data);
}
