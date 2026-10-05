const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const handoffQuery = window.matchMedia("(min-width: 981px) and (prefers-reduced-motion: no-preference)");

const handoff = document.querySelector("[data-decision-handoff]");

if (handoff) {
  const isChapterOnly = handoff.classList.contains("decision-handoff--chapter-only");
  let handoffFrame = 0;

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const range = (value, start, end) => clamp((value - start) / (end - start));
  const smooth = (value) => value * value * (3 - 2 * value);

  const updateHandoff = () => {
    handoffFrame = 0;

    if (!handoffQuery.matches) {
      document.documentElement.classList.remove("handoff-motion-enabled");
      handoff.style.removeProperty("--handoff-progress");
      handoff.style.removeProperty("--handoff-title");
      handoff.style.removeProperty("--handoff-out-opacity");
      handoff.style.removeProperty("--handoff-blur");
      handoff.style.removeProperty("--handoff-brightness");
      handoff.style.removeProperty("--handoff-out-y");
      handoff.style.removeProperty("--handoff-title-out-y");
      handoff.style.removeProperty("--handoff-scale");
      handoff.style.removeProperty("--handoff-incoming-y");
      handoff.style.removeProperty("--handoff-title-y");
      return;
    }

    document.documentElement.classList.add("handoff-motion-enabled");
    const bounds = handoff.getBoundingClientRect();
    const travel = Math.max(1, bounds.height - window.innerHeight);
    const progress = clamp(-bounds.top / travel);
    const cover = smooth(range(progress, isChapterOnly ? 0.02 : 0.14, isChapterOnly ? 0.62 : 0.82));
    const title = smooth(range(progress, isChapterOnly ? 0.16 : 0.34, isChapterOnly ? 0.58 : 0.74));
    const incomingDistance = isChapterOnly ? 28 : 100;

    handoff.style.setProperty("--handoff-progress", progress.toFixed(4));
    handoff.style.setProperty("--handoff-title", title.toFixed(4));
    handoff.style.setProperty("--handoff-out-opacity", (1 - progress * 0.82).toFixed(4));
    handoff.style.setProperty("--handoff-blur", `${(progress * 8).toFixed(2)}px`);
    handoff.style.setProperty("--handoff-brightness", (1 - progress * 0.56).toFixed(4));
    handoff.style.setProperty("--handoff-out-y", `${(progress * -7).toFixed(2)}svh`);
    handoff.style.setProperty("--handoff-title-out-y", `${(progress * -14).toFixed(2)}svh`);
    handoff.style.setProperty("--handoff-scale", (1 + progress * 0.075).toFixed(4));
    handoff.style.setProperty("--handoff-incoming-y", `${((1 - cover) * incomingDistance).toFixed(2)}%`);
    handoff.style.setProperty("--handoff-title-y", `${((1 - title) * 38).toFixed(2)}px`);
  };

  const requestHandoffUpdate = () => {
    if (handoffFrame) return;
    handoffFrame = requestAnimationFrame(updateHandoff);
  };

  updateHandoff();
  window.addEventListener("scroll", requestHandoffUpdate, { passive: true });
  window.addEventListener("resize", requestHandoffUpdate);
  handoffQuery.addEventListener("change", requestHandoffUpdate);
}

const mediaSlots = [...document.querySelectorAll(".media-placeholder")];
const placeholderVideos = [];

mediaSlots.forEach((slot) => {
  const mediaItems = [...slot.querySelectorAll("video, img")];

  const syncMediaRatio = (media) => {
    if (!slot.hasAttribute("data-adaptive-ratio")) return;

    const width = media.videoWidth || media.naturalWidth;
    const height = media.videoHeight || media.naturalHeight;
    if (!width || !height) return;

    slot.style.setProperty("--media-aspect-ratio", `${width} / ${height}`);
  };

  const activateMedia = (media) => {
    syncMediaRatio(media);
    slot.classList.add("has-media");
    slot.classList.add(media.tagName === "VIDEO" ? "has-video" : "has-image");
  };

  mediaItems.forEach((media) => {
    if (media.tagName === "IMG") {
      media.addEventListener("load", () => activateMedia(media));
      if (media.complete && media.naturalWidth) activateMedia(media);
      return;
    }

    placeholderVideos.push(media);
    media.addEventListener("loadedmetadata", () => syncMediaRatio(media));
    media.addEventListener("loadeddata", () => activateMedia(media));

    if (media.readyState >= 1) syncMediaRatio(media);
    if (media.readyState >= 2) activateMedia(media);

    const poster = media.getAttribute("poster");
    if (poster) {
      const posterImage = new Image();
      posterImage.addEventListener("load", () => activateMedia(media));
      posterImage.src = poster;
    }
  });
});

const managedVideos = [
  ...new Set([...document.querySelectorAll(".product-video-slot video"), ...placeholderVideos]),
];

if (managedVideos.length) {
  const syncVideoMotion = () => {
    managedVideos.forEach((video) => {
      if (motionQuery.matches) {
        video.autoplay = false;
        video.pause();
        return;
      }

      video.autoplay = true;
      video.play().catch(() => {});
    });
  };

  syncVideoMotion();
  motionQuery.addEventListener("change", syncVideoMotion);
}

if (!motionQuery.matches && "IntersectionObserver" in window) {
  const selector = [
    ".case-section > .section-heading",
    ".case-section > .section-copy",
    ".metric-row > div",
    ".challenge-grid > *",
    ".editorial-split-heading",
    ".discovery-evidence > .evidence-figure",
    ".inference-callout",
    ".architecture-figure",
    ".supporting-evidence-grid > .evidence-figure",
    ".stakeholder-grid > article",
    ".resolution-heading",
    ".resolution-grid > article",
    ".editorial-summary__eyebrow",
    ".editorial-summary__statement",
    ".editorial-summary__support",
    ".outcome-heading",
    ".accepted-column",
    ".unlocked-column",
    ".principle-list > li",
    ".decision-header",
    ".decision-rationale > div",
    ".product-figure",
    ".next-project > *",
  ].join(",");
  const revealItems = [...document.querySelectorAll(selector)];

  revealItems.forEach((item) => {
    const relatedItems = [...item.parentElement.children].filter((sibling) => sibling.matches(selector));
    const order = Math.max(0, relatedItems.indexOf(item));
    item.classList.add("case-reveal");
    item.style.setProperty("--reveal-delay", `${Math.min(order, 3) * 65}ms`);
  });

  document.documentElement.classList.add("case-motion-ready");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -10%", threshold: 0.08 },
  );

  revealItems.forEach((item) => observer.observe(item));
}
