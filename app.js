let scholarData = null;
let visibleCount = 0;
let currentIndex = 0;
let autoPlayTimer = null;
let transitionTimer = null;
let isAnimating = false;
let isPointerOverCarousel = false;
let isFocusWithinCarousel = false;
let dragStartX = 0;
let dragDistance = 0;
let isDragging = false;
let didDrag = false;

const TOP_RESULTS_MOBILE = 6;
const TOP_RESULTS_DESKTOP = 10;
const AUTO_PLAY_DELAY = 2000;
const DRAG_MOVE_THRESHOLD = 50;

const profileText = {
  intro: "Hi, and welcome to my site!",
  headline:
    "I am Sourya, an Assistant Professor in the Department of Economics at IIT Jodhpur. I completed my PhD in Economics at the University of Auckland Business School.",
  body:
    "My research looks at climate risks, agricultural transformation, circular systems, energy transitions, and distress migration, particularly in contexts shaped by structural development challenges. I care about advancing an economics for the post-growth era that speaks to lived vulnerability, where data, policy, and everyday realities intersect.",
  teaching:
    "Teaching is one of the most fulfilling aspects of my role. I especially enjoy teaching microeconomics, environmental economics, and econometrics.",
  closing:
    "I am always interested in thoughtful conversations and new ideas. Drop me a line anytime via email."
};

const academicDetails = [
  {
    title: "IIT Jodhpur",
    subtitle: "Instructor",
    items: [
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
    title: "University of Auckland",
    subtitle: "Teaching Fellow",
    items: [
      "Principles of Economics (UG) — 2023 (×2)",
      "Economics, Markets and Law (UG) — 2021; 2022 (×2); 2023 (×2)",
      "Understanding the Global Economy (UG Summer School) — 2021; 2022"
    ]
  },
  {
    title: "University of Auckland",
    subtitle: "Teaching Assistant",
    items: [
      "Energy and Environmental Economics (UG) — 2021; 2022",
      "Microeconomic Analysis (UG) — 2021 (×2); 2022",
      "Energy Economics (PG) — 2020",
      "Public Economics and Policy (PG) — 2020",
      "Understanding the Global Economy (UG) — 2019; 2020 (×2)"
    ]
  }
];

const feedbackQuotes = [
  "The coursework was well-structured and relevant to the subject topic. The tasks were engaging and encouraged critical thinking. Overall, it was a valuable learning experience, and having more real-world examples made it better.",
  "The course was really good and much needed. The prof was really good in explaining topics in an easy manner under the understanding the student level. Iots of good activities and project. It was really good and interactive class course.",
  "The course was very smooth and understandable.",
  "Sir offered clear and well-structured concepts, supported by interactive quizzes that enhanced our understanding. It was my mistake that I didn't perform well. Thank you for your constant guidance and support throughout the course.",
  "Wonderful course! The sir taught with great clarity and real-world insights. I truly enjoyed the classes and learned a lot.",
  "Mark Millan and Sourya were absolutely the best part of this course, offering constructive help and advice, great at guiding the class and keeping students engaged. Their even consistent and never waning energy and commitment to sharing knowledge and conducting their workshops made BUS115 very enjoyable. Their workshops were what I personally looked forward to the most each week.",
  "Sourya was great at explaining things on a broader level. He was very clear with lesson objectives and was a very fun teacher to have.",
  "Everything he teaches is very helpful. I love his class.",
  "His openness and very obvious passion for the subject. This was a great driving factor, and quite inspiring for new students to the Uni like me.",
  "I found it useful that I was able to ask questions when I was stuck on something in this class and able to actively participate during the class; it helped me to stay engaged and actually learn the content that was being taught.",
  "Clear explanations and uplifting positive comments that encourages to excel!"
];

function renderApp() {
  const app = document.getElementById("app");
  app.innerHTML = `
    <div class="site-shell">
      <header class="topbar">
        <div class="brand">Souryabrata Mohapatra</div>
        <nav class="topnav" aria-label="Main navigation">
          <a href="#home">Home</a>
          <a href="#details">Teaching</a>
          <button class="search-button" type="button" aria-label="Search">⌕</button>
        </nav>
      </header>

      <main>
        <section id="home" class="hero">
          <div class="portrait-wrap">
            <img
              src="https://sites.google.com/sitesv-images-rt/AMxu72t_IwD5ZyBZQ9Hkk7ooZPAZsK6hEAOogCc8H5GUvkqCgB7TH9uV0KfNuy3AVShI_PWV4J9GVmtFvHwkMW3yxSs8pYHTAPt-BNrTrWrRBrRBybgdZZLXa2zxWslDEIS0YRhN5cLilnG8KF37clMk4v_VtiLlgiSLOL7-UY-Zcryz0ovMCROc--gMEwZo1wvEuqLhHouOsxtf-uu-fmPwT_DIEmcYgG2ehZ-oZpiI_H0=w1280"
              alt="Professor portrait"
              class="portrait"
            />
            <div class="social-row" aria-label="Social links">
              <a href="#" aria-label="Email" class="social-icon">✉</a>
              <a href="#" aria-label="CV" class="social-icon">CV</a>
              <a href="#" aria-label="Google Scholar" class="social-icon">g</a>
              <a href="#" aria-label="LinkedIn" class="social-icon">in</a>
              <a href="#" aria-label="Twitter" class="social-icon">x</a>
            </div>
          </div>

          <div class="bio-panel">
            <h1>${profileText.intro}</h1>
            <p>${profileText.headline}</p>
            <p>${profileText.body}</p>
            <p>${profileText.teaching}</p>
            <p>${profileText.closing}</p>
          </div>

          <aside class="research-card">
            <h2>Featured Paper</h2>
            <div class="research-card-copy">
              <p>Does commercial farming protect the environment? Evidence from chemical input use in Haryana, India</p>
              <div class="research-meta">
                <span>S Verma, KR Palta Singh, S Mohapatra</span>
                <span>Journal of Agribusiness in Developing and Emerging Economies 16 (4), 894-909, 2026</span>
              </div>
            </div>
            <div class="research-link-wrap">
              <span class="research-dot"></span>
              <a href="https://scholar.google.com" target="_blank" rel="noopener noreferrer">scholar.google.com</a>
            </div>
          </aside>
        </section>

        <section class="feed-section" aria-labelledby="research-feed-title">
          <div class="section-header">
            <h2 id="research-feed-title">Research Feed</h2>
          </div>
          <div id="publications" class="publications-wrap"></div>
        </section>

        <section id="details" class="details-section">
          <div class="details-grid">
            <div class="details-column details-column-left">
              <div class="entry-block">
                <h3>IIT Jodhpur</h3>
                <div class="role">Instructor</div>
                <ul class="detail-list">
                  <li>Introduction to Climate Change Economics (UG) — 2026</li>
                  <li>Markets and the Economy (UG) — 2026</li>
                  <li>Fundamentals of Economics (UG) — 2026</li>
                  <li>Introduction to Green Economy (UG) — 2026</li>
                  <li>Environmental Economics and Management (PG) — 2025</li>
                  <li>Development and Environment (UG) — 2025</li>
                  <li>Health and Development (UG) — 2025</li>
                  <li>Engineering Design (UG) — 2025 (×2)</li>
                </ul>
              </div>

              <div class="entry-block">
                <h3>University of Auckland</h3>
                <div class="role">Teaching Fellow</div>
                <ul class="detail-list">
                  <li>Principles of Economics (UG) — 2023 (×2)</li>
                  <li>Economics, Markets and Law (UG) — 2021; 2022 (×2); 2023 (×2)</li>
                  <li>Understanding the Global Economy (UG Summer School) — 2021; 2022</li>
                </ul>
              </div>

              <div class="entry-block">
                <h3>University of Auckland</h3>
                <div class="role">Teaching Assistant</div>
                <ul class="detail-list">
                  <li>Energy and Environmental Economics (UG) — 2021; 2022</li>
                  <li>Microeconomic Analysis (UG) — 2021 (×2); 2022</li>
                  <li>Energy Economics (PG) — 2020</li>
                  <li>Public Economics and Policy (PG) — 2020</li>
                  <li>Understanding the Global Economy (UG) — 2019; 2020 (×2)</li>
                </ul>
              </div>
            </div>

            <div class="details-column details-column-right">
              <div class="feedback-card">
                <h3>Student Feedback</h3>
                <div class="feedback-list">
                  ${feedbackQuotes
                    .map(
                      (quote) => `
                        <blockquote class="quote-item">
                          “${quote}”
                        </blockquote>
                      `,
                    )
                    .join("")}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  `;

  initializeCarousel();
  renderCarousel();
}

fetch("scholar_complete.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    scholarData = data;
    renderApp();
  })
  .catch((error) => {
    console.error("Failed to load publication data:", error);
    renderApp();
  });

function initializeCarousel() {
  const publicationsRoot = document.getElementById("publications");

  if (!publicationsRoot) {
    return;
  }

  publicationsRoot.innerHTML = `
    <div id="carouselWrapper" class="carousel-wrapper">
      <button id="carouselPrev" class="carousel-button carousel-button-prev" type="button" aria-label="Show previous publication">&#8249;</button>
      <div class="carousel-viewport">
        <div id="carouselTrack" class="carousel-track"></div>
      </div>
      <button id="carouselNext" class="carousel-button carousel-button-next" type="button" aria-label="Show next publication">&#8250;</button>
    </div>
  `;

  document.getElementById("carouselPrev").addEventListener("click", (event) => {
    event.preventDefault();
    moveCarousel(-1, true);
  });

  document.getElementById("carouselNext").addEventListener("click", (event) => {
    event.preventDefault();
    moveCarousel(1, true);
  });

  document.getElementById("carouselTrack").addEventListener("transitionend", handleTransitionEnd);

  const wrapper = document.getElementById("carouselWrapper");

  wrapper.addEventListener("mouseenter", () => {
    isPointerOverCarousel = true;
    pauseAutoPlay();
  });

  wrapper.addEventListener("mouseleave", () => {
    isPointerOverCarousel = false;
    scheduleAutoPlay();
  });

  wrapper.addEventListener("focusin", () => {
    isFocusWithinCarousel = true;
    pauseAutoPlay();
  });

  wrapper.addEventListener("focusout", (event) => {
    if (!wrapper.contains(event.relatedTarget)) {
      isFocusWithinCarousel = false;
      scheduleAutoPlay();
    }
  });

  wrapper.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveCarousel(-1, true);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      moveCarousel(1, true);
    }
  });

  wrapper.addEventListener("pointerdown", handleDragStart);
  wrapper.addEventListener("pointermove", handleDragMove);
  wrapper.addEventListener("pointerup", handleDragEnd);
  wrapper.addEventListener("pointercancel", handleDragEnd);
  wrapper.addEventListener("lostpointercapture", handleDragEnd);
  wrapper.addEventListener("dragstart", (event) => event.preventDefault());

  wrapper.addEventListener(
    "click",
    (event) => {
      if (didDrag) {
        event.preventDefault();
        event.stopPropagation();
        didDrag = false;
      }
    },
    true,
  );

  initializeSwipe();
  window.addEventListener("resize", handleResize);
}

function handleDragStart(event) {
  if (
    event.pointerType === "touch" ||
    event.button !== 0 ||
    event.target.closest(".carousel-button")
  ) {
    return;
  }

  const wrapper = document.getElementById("carouselWrapper");

  dragStartX = event.clientX;
  dragDistance = 0;
  isDragging = true;
  didDrag = false;
  pauseAutoPlay();
  wrapper.classList.add("is-dragging");
  wrapper.setPointerCapture(event.pointerId);
}

function handleDragMove(event) {
  if (!isDragging) {
    return;
  }

  dragDistance = event.clientX - dragStartX;

  if (Math.abs(dragDistance) >= 6) {
    didDrag = true;
    event.preventDefault();
  }
}

function handleDragEnd(event) {
  if (!isDragging) {
    return;
  }

  const wrapper = document.getElementById("carouselWrapper");
  isDragging = false;
  wrapper.classList.remove("is-dragging");

  if (event.pointerId !== undefined && wrapper.hasPointerCapture(event.pointerId)) {
    wrapper.releasePointerCapture(event.pointerId);
  }

  if (Math.abs(dragDistance) >= DRAG_MOVE_THRESHOLD) {
    moveCarousel(dragDistance < 0 ? 1 : -1, true);
  } else {
    scheduleAutoPlay();
  }

  dragDistance = 0;
}

function initializeSwipe() {
  const wrapper = document.getElementById("carouselWrapper");
  let startX = 0;

  wrapper.addEventListener(
    "touchstart",
    (event) => {
      startX = event.touches[0].clientX;
      pauseAutoPlay();
    },
    { passive: true },
  );

  wrapper.addEventListener(
    "touchend",
    (event) => {
      const distance = startX - event.changedTouches[0].clientX;

      if (Math.abs(distance) > 50) {
        moveCarousel(distance > 0 ? 1 : -1, true);
      } else {
        scheduleAutoPlay();
      }
    },
    { passive: true },
  );
}

function getVisibleCount() {
  if (window.innerWidth < 600) {
    return 1;
  }
  if (window.innerWidth < 900) {
    return 2;
  }
  return 3;
}

function getTopResults() {
  return window.innerWidth < 600 ? TOP_RESULTS_MOBILE : TOP_RESULTS_DESKTOP;
}

function getSortedArticles() {
  return [...(scholarData?.articles || [])]
    .sort((a, b) => Number(b.year || 0) - Number(a.year || 0))
    .slice(0, getTopResults());
}

function renderCarousel() {
  const articles = getSortedArticles();
  const track = document.getElementById("carouselTrack");

  if (!track) {
    return;
  }

  pauseAutoPlay();
  visibleCount = getVisibleCount();
  isAnimating = false;

  if (!articles.length) {
    track.innerHTML = '<div class="carousel-empty">No research feed items available.</div>';
    return;
  }

  const cloneCount = Math.min(visibleCount, articles.length);
  const leadingClones = articles.slice(-cloneCount);
  const trailingClones = articles.slice(0, cloneCount);
  const renderedArticles = [...leadingClones, ...articles, ...trailingClones];

  track.style.setProperty("--visible-items", visibleCount);
  track.innerHTML = renderedArticles.map(createCardMarkup).join("");
  currentIndex = cloneCount;

  requestAnimationFrame(() => {
    updateCarouselPosition(false);
    scheduleAutoPlay();
  });
}

function createCardMarkup(article) {
  const scholarQuery = encodeURIComponent(article.title || "");

  return `
    <article class="carousel-card">
      <div class="carousel-card-title">
        <a href="${article.link}" target="_blank" rel="noopener noreferrer">${article.title}</a>
      </div>
      <div class="carousel-card-authors">${article.authors || ""}</div>
      <div class="carousel-card-links">
        <a
          href="mailto:?subject=${encodeURIComponent("Interesting paper: " + article.title)}&body=${encodeURIComponent(article.link || "")}
          "
          class="icon-link gmail"
          aria-label="Email this paper"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 2v.01L12 13 4 6.01V6h16Zm-2 2.06-6 4.5-6-4.5V18h12V8.06Z"/>
          </svg>
        </a>
      </div>
      <div class="carousel-card-publication">
        <div class="publication-source">${article.publication ? article.publication : article.year}</div>
        <div class="publication-info">
          <img
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAsVBMVEVHcEz////O2/X////E1vRzpvpni9Dr8/6rwe9gmfZAhfUzZsFVf8ze6PiavPlWkvY9g/RCh/dLd8mOqNzq8f6IrvJJifU1acM+cMd5mdXk7/3X5fz////I2/wqYr/////p8v+lxPq5zfJvn/L4+/6sxfNkm/dUgdKYsN/1+f+ewf4tfPNdjuGVrd52p/t8rPz9/v/o8P2QuP2Mtf2ixf+gw/+oyP/J3v/o8f/C2f////8srEJGAAAAO3RSTlMADGgeif/5N7X3///4TdL+///+1Wzo////66ivGdz/A0Hhnvovxf//wlL+///9//8jjf///////7P9FQF2P90AAAEWSURBVHgBYiAaAPqiByyJgSiAotW2Hdt2sv+Fze/pWO/k8KY8mU4nQzabL5bzWb+t1pvtbr9e9dnheDpfdrvr7dC1++N53l52r937c28bttlCgNAebxBBns8V7iiy2hbNsBeQEoEfB7o43eO5bSIs/DsxwfE5lQj6WnIwtSBK55xgXWpXsqwISNX0nJ7SYsHzxjtnylQRrWowAuxkWdYCvoX81R1lTmn0nfgEeLKtPFsGvIr5NcKWzk+wUt+7JeeUTzV/SNaizDI+8/rTuZ5fz0X11CCsFagNvIcNvDdHRiMjUaxVpsWoWRLUBiZNox2y1IB0UCuVjP5n1iJSRe1oBk9hV1GKMzTqlq3urntfZag/mm4O+gN/9TJK3hsJ0QAAAABJRU5ErkJggg=="
            alt="Scholar icon"
            class="scholar-icon"
          />
          <a href="https://scholar.google.com/scholar?q=${scholarQuery}" target="_blank" rel="noopener noreferrer">scholar.google.com</a>
        </div>
      </div>
    </article>
  `;
}

function getCardStep() {
  const track = document.getElementById("carouselTrack");
  const card = track.querySelector(".carousel-card");
  if (!card) {
    return 0;
  }
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
  return card.getBoundingClientRect().width + gap;
}

function updateCarouselPosition(smooth = true) {
  const track = document.getElementById("carouselTrack");
  track.style.transition = smooth ? "transform 0.5s ease" : "none";
  track.style.transform = `translateX(-${currentIndex * getCardStep()}px)`;
}

function moveCarousel(direction, userInitiated = false) {
  const articles = getSortedArticles();

  if (articles.length <= visibleCount) {
    if (userInitiated) {
      scheduleAutoPlay();
    }
    return;
  }

  if (isAnimating) {
    if (!userInitiated) {
      return;
    }
    finishCarouselMove();
  }

  pauseAutoPlay();
  isAnimating = true;
  currentIndex += direction;
  updateCarouselPosition(true);

  window.clearTimeout(transitionTimer);
  transitionTimer = window.setTimeout(finishCarouselMove, 550);
}

function handleTransitionEnd(event) {
  if (
    event.target !== document.getElementById("carouselTrack") ||
    event.propertyName !== "transform"
  ) {
    return;
  }

  finishCarouselMove();
}

function finishCarouselMove() {
  if (!isAnimating) {
    return;
  }

  window.clearTimeout(transitionTimer);
  transitionTimer = null;

  const articleCount = getSortedArticles().length;
  const cloneCount = Math.min(visibleCount, articleCount);

  if (currentIndex >= cloneCount + articleCount) {
    currentIndex -= articleCount;
    updateCarouselPosition(false);
  } else if (currentIndex < cloneCount) {
    currentIndex += articleCount;
    updateCarouselPosition(false);
  }

  isAnimating = false;
  scheduleAutoPlay();
}

function scheduleAutoPlay() {
  pauseAutoPlay();

  if (
    isPointerOverCarousel ||
    isFocusWithinCarousel ||
    getSortedArticles().length <= visibleCount
  ) {
    return;
  }

  autoPlayTimer = window.setTimeout(() => {
    moveCarousel(1);
  }, AUTO_PLAY_DELAY);
}

function pauseAutoPlay() {
  window.clearTimeout(autoPlayTimer);
  autoPlayTimer = null;
}

function handleResize() {
  window.clearTimeout(transitionTimer);
  transitionTimer = null;
  isAnimating = false;

  const nextVisibleCount = getVisibleCount();

  if (nextVisibleCount !== visibleCount) {
    renderCarousel();
    return;
  }

  updateCarouselPosition(false);
}

window.addEventListener("beforeunload", () => {
  pauseAutoPlay();
  window.clearTimeout(transitionTimer);
});
