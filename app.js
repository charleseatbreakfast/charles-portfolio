const hero = document.querySelector("#hero");
const sceneCamera = document.querySelector("#sceneCamera");
const sceneLayers = [...document.querySelectorAll(".scene-layer")];
const sceneEffects = [...document.querySelectorAll(".scene-effect")];
const hotspotButtons = [...document.querySelectorAll(".project-hotspot")];
const projectButtons = [...document.querySelectorAll("[data-project]")];
const tramHeadlights = [...document.querySelectorAll(".tram-headlight")];
const neonFlickerTargets = [...document.querySelectorAll("[data-neon-flicker]")];

const panel = document.querySelector("#projectPanel");
const panelClose = document.querySelector("#panelClose");
const panelImage = document.querySelector("#panelImage");
const panelEyebrow = document.querySelector("#panelEyebrow");
const panelTitle = document.querySelector("#panelTitle");
const panelSummary = document.querySelector("#panelSummary");
const panelDetail = document.querySelector("#panelDetail");
const panelTags = document.querySelector("#panelTags");
const panelCaseStudyLink = document.querySelector("#panelCaseStudyLink");
const panelActionLabel = document.querySelector("#panelActionLabel");
const status = document.querySelector("#status");
const mobileScrim = document.querySelector("#mobileScrim");

const SOURCE_WIDTH = 1453;
const SOURCE_HEIGHT = 1083;
const INTRO_DURATION = 1950;

const projects = {
  parknshop: {
    title: "PARKnSHOP",
    category: "E-commerce / Supermarket UX",
    description: "Redefining redemption as an attachment strategy.",
    detail:
      "A funnel-led redesign that moved redemption into the moments where shopping intent was already strongest.",
    image: {
      src: "assets/projects/parknshop-redemption/hero-devices.png",
      alt: "PARKnSHOP redemption experience shown across two mobile screens",
    },
    caseStudyHref: "work/parknshop-redemption/index.html",
    tags: ["UX strategy", "E-commerce", "Supermarket UX"],
    layer: "shop",
    focus: { x: "-7vw", y: "1vh", scale: "1.06" },
  },
  fortress: {
    title: "FORTRESS",
    category: "Mobile Product / Interaction & Motion",
    description: "A more coherent and recognisable FORTRESS app experience.",
    detail:
      "Using UI, interaction and motion to connect product behaviour, system feedback and digital brand expression.",
    image: {
      src: "assets/projects/fortress/fortress-hero.png",
      alt: "FORTRESS mobile app experience shown across product screens",
    },
    caseStudyHref: "work/fortress-app/index.html",
    tags: ["Interaction design", "Motion design", "Mobile product"],
    layer: "foreground",
    focus: { x: "-8vw", y: "-4vh", scale: "1.065" },
  },
  aimas: {
    title: "AIMAS",
    category: "0→1 Product / Campaign Orchestration",
    description: "A connected workspace for complex campaign orchestration.",
    detail:
      "A platform concept connecting campaign structure, visual journey building and performance visibility in one coherent product experience.",
    image: {
      src: "assets/projects/aimas/hero.png",
      alt: "AIMAS campaign orchestration dashboard presented on a desktop display",
    },
    caseStudyHref: "work/aimas/index.html",
    tags: ["0→1 product", "Information architecture", "Data product"],
    layer: "billboard",
    focus: { x: "4.5vw", y: "-1vh", scale: "1.055" },
  },
};

let activeProject = null;
let lastTrigger = null;
let motionReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let pointerFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
let targetX = 0;
let targetY = 0;
let currentX = 0;
let currentY = 0;
let animationFrame = null;
const ambientTimeouts = new Set();
const ambientAnimations = new Set();

function getSceneGeometry() {
  const heroRect = hero.getBoundingClientRect();
  const viewportWidth = heroRect.width;
  const viewportHeight = heroRect.height;
  const imageRatio = SOURCE_WIDTH / SOURCE_HEIGHT;
  const viewportRatio = viewportWidth / viewportHeight;

  if (viewportRatio > imageRatio) {
    const renderedWidth = viewportWidth;
    const renderedHeight = viewportWidth / imageRatio;
    return {
      renderedWidth,
      renderedHeight,
      offsetX: 0,
      offsetY: (viewportHeight - renderedHeight) / 2,
    };
  }

  const renderedHeight = viewportHeight;
  const renderedWidth = viewportHeight * imageRatio;
  return {
    renderedWidth,
    renderedHeight,
    offsetX: (viewportWidth - renderedWidth) / 2,
    offsetY: 0,
  };
}

function positionSceneElement(element, geometry, prefix) {
  const x = Number(element.dataset.x);
  const y = Number(element.dataset.y);
  const width = Number(element.dataset.w);
  const height = Number(element.dataset.h);

  element.style.setProperty(`--${prefix}-left`, `${geometry.offsetX + x * geometry.renderedWidth}px`);
  element.style.setProperty(`--${prefix}-top`, `${geometry.offsetY + y * geometry.renderedHeight}px`);
  element.style.setProperty(`--${prefix}-width`, `${width * geometry.renderedWidth}px`);
  element.style.setProperty(`--${prefix}-height`, `${height * geometry.renderedHeight}px`);
}

function updateSceneLayout() {
  const geometry = getSceneGeometry();
  hotspotButtons.forEach((button) => positionSceneElement(button, geometry, "hotspot"));
  sceneEffects.forEach((effect) => positionSceneElement(effect, geometry, "effect"));
}

function renderTags(tags) {
  panelTags.replaceChildren(
    ...tags.map((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      return span;
    }),
  );
}

function setButtonStates(projectId) {
  projectButtons.forEach((button) => {
    const isActive = button.dataset.project === projectId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function selectSceneLayer(layerName) {
  sceneLayers.forEach((layer) => {
    layer.classList.toggle("is-selected", layer.dataset.layer === layerName);
  });
}

function renderProject(projectId) {
  const project = projects[projectId];
  panelEyebrow.textContent = project.category;
  panelTitle.textContent = project.title;
  panelSummary.textContent = project.description;
  panelDetail.textContent = project.detail;
  panelImage.src = project.image.src;
  panelImage.alt = project.image.alt;
  panelImage.dataset.project = projectId;
  if (project.caseStudyHref) {
    panelCaseStudyLink.href = project.caseStudyHref;
    panelCaseStudyLink.removeAttribute("aria-disabled");
    panelActionLabel.textContent = "View Case Study";
  } else {
    panelCaseStudyLink.removeAttribute("href");
    panelCaseStudyLink.setAttribute("aria-disabled", "true");
    panelActionLabel.textContent = "Project preview";
  }
  renderTags(project.tags);
}

function openProject(projectId, trigger) {
  const project = projects[projectId];
  if (!project) return;

  const panelWasOpen = panel.classList.contains("is-open");
  activeProject = projectId;
  lastTrigger = trigger ?? lastTrigger;
  renderProject(projectId);
  setButtonStates(projectId);
  selectSceneLayer(project.layer);

  sceneCamera.style.setProperty("--focus-x", project.focus.x);
  sceneCamera.style.setProperty("--focus-y", project.focus.y);
  sceneCamera.style.setProperty("--focus-scale", project.focus.scale);

  hero.dataset.activeProject = projectId;
  hero.classList.add("has-focus");
  panel.setAttribute("aria-hidden", "false");
  if (!panelWasOpen) panel.classList.add("is-open");
  status.textContent = `${project.title} project details opened.`;
}

function closeProject({ restoreFocus = true } = {}) {
  if (!activeProject) return;

  activeProject = null;
  hero.classList.remove("has-focus");
  delete hero.dataset.activeProject;
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
  setButtonStates(null);
  selectSceneLayer(null);

  sceneCamera.style.setProperty("--focus-x", "0vw");
  sceneCamera.style.setProperty("--focus-y", "0vh");
  sceneCamera.style.setProperty("--focus-scale", "1");
  status.textContent = "Project details closed.";

  if (restoreFocus && lastTrigger?.isConnected) {
    lastTrigger.focus({ preventScroll: true });
  }
}

function applyLayerParallax(x, y) {
  sceneLayers.forEach((layer) => {
    const depth = Number(layer.dataset.depth);
    layer.style.setProperty("--layer-x", `${(x * depth).toFixed(2)}px`);
    layer.style.setProperty("--layer-y", `${(y * depth).toFixed(2)}px`);
  });

  hotspotButtons.forEach((hotspot) => {
    const depth = Number(hotspot.dataset.depth);
    hotspot.style.setProperty("--hotspot-parallax-x", `${(x * depth).toFixed(2)}px`);
    hotspot.style.setProperty("--hotspot-parallax-y", `${(y * depth).toFixed(2)}px`);
  });
}

function updateParallax() {
  currentX += (targetX - currentX) * 0.085;
  currentY += (targetY - currentY) * 0.085;
  applyLayerParallax(currentX, currentY);

  if (Math.abs(targetX - currentX) > 0.02 || Math.abs(targetY - currentY) > 0.02) {
    animationFrame = requestAnimationFrame(updateParallax);
  } else {
    animationFrame = null;
  }
}

function queueParallax() {
  if (!animationFrame) animationFrame = requestAnimationFrame(updateParallax);
}

function randomDelay(minimum, maximum) {
  return minimum + Math.random() * (maximum - minimum);
}

function attemptIntroChime() {
  if (motionReduced) return;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;

  let context;
  try {
    context = new AudioContext();
  } catch {
    return;
  }

  const closeContext = () => {
    if (context.state !== "closed") context.close().catch(() => {});
  };
  const play = () => {
    if (context.state !== "running") {
      closeContext();
      return;
    }

    const startAt = context.currentTime + 0.04;
    [0, 0.21].forEach((delay, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      const strikeAt = startAt + delay;

      oscillator.type = index === 0 ? "sine" : "triangle";
      oscillator.frequency.setValueAtTime(index === 0 ? 1320 : 1480, strikeAt);
      oscillator.frequency.exponentialRampToValueAtTime(index === 0 ? 1180 : 1320, strikeAt + 0.25);
      gain.gain.setValueAtTime(0.0001, strikeAt);
      gain.gain.exponentialRampToValueAtTime(0.018, strikeAt + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, strikeAt + 0.28);

      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(strikeAt);
      oscillator.stop(strikeAt + 0.29);
    });

    window.setTimeout(closeContext, 780);
  };

  const blockedAutoplayTimeout = window.setTimeout(closeContext, 700);
  context
    .resume()
    .then(() => {
      window.clearTimeout(blockedAutoplayTimeout);
      play();
    })
    .catch(() => {
      window.clearTimeout(blockedAutoplayTimeout);
      closeContext();
    });
}

function trackAmbientAnimation(animation) {
  ambientAnimations.add(animation);
  const removeAnimation = () => ambientAnimations.delete(animation);
  animation.addEventListener("finish", removeAnimation, { once: true });
  animation.addEventListener("cancel", removeAnimation, { once: true });
}

function scheduleAmbientEvent(callback, minimumDelay, maximumDelay) {
  const timeout = window.setTimeout(() => {
    ambientTimeouts.delete(timeout);
    if (!motionReduced && !document.hidden) callback();
    scheduleAmbientEvent(callback, minimumDelay, maximumDelay);
  }, randomDelay(minimumDelay, maximumDelay));
  ambientTimeouts.add(timeout);
}

function animateHeadlightShift() {
  if (motionReduced || document.hidden) return;

  tramHeadlights.forEach((headlight, index) => {
    const animation = headlight.animate(
      [
        { opacity: 0.38, filter: "brightness(1.08) blur(0.35px)" },
        { opacity: 0.28, filter: "brightness(0.78) blur(0.35px)", offset: 0.46 },
        { opacity: 0.38, filter: "brightness(1.08) blur(0.35px)" },
      ],
      {
        duration: 680 + index * 40,
        easing: "cubic-bezier(0.45, 0, 0.55, 1)",
      },
    );
    trackAmbientAnimation(animation);
  });
}

function animateNeonFlicker() {
  if (motionReduced || document.hidden || neonFlickerTargets.length === 0) return;

  const primary = neonFlickerTargets.find((target) => target.dataset.neonFlicker === "primary");
  const targets = primary ? [primary] : [neonFlickerTargets[0]];
  const secondary = neonFlickerTargets.find((target) => target.dataset.neonFlicker === "secondary");
  if (secondary && Math.random() < 0.32) targets.push(secondary);

  targets.forEach((target, index) => {
    const isPrimaryGlow = target.dataset.neonFlicker === "primary";
    const useDoubleFlicker = Math.random() < 0.46;
    const duration = Math.round(randomDelay(320, 540));
    const options = { duration, delay: index * 45, easing: "linear" };

    if (isPrimaryGlow) {
      const dimLayer = target.querySelector(".neon-character-dim");
      const glowLayer = target.querySelector(".neon-character-glow");
      const dimFrames = useDoubleFlicker
        ? [
            { opacity: 0 },
            { opacity: 0.82, offset: 0.13 },
            { opacity: 0, offset: 0.29 },
            { opacity: 0.58, offset: 0.45 },
            { opacity: 0, offset: 0.64 },
            { opacity: 0 },
          ]
        : [
            { opacity: 0 },
            { opacity: 0.78, offset: 0.22 },
            { opacity: 0, offset: 0.5 },
            { opacity: 0 },
          ];
      const glowFrames = useDoubleFlicker
        ? [
            { opacity: 0.68 },
            { opacity: 0.05, offset: 0.13 },
            { opacity: 0.96, offset: 0.29 },
            { opacity: 0.18, offset: 0.45 },
            { opacity: 0.92, offset: 0.64 },
            { opacity: 0.68 },
          ]
        : [
            { opacity: 0.68 },
            { opacity: 0.08, offset: 0.22 },
            { opacity: 0.96, offset: 0.5 },
            { opacity: 0.68 },
          ];

      [dimLayer.animate(dimFrames, options), glowLayer.animate(glowFrames, options)].forEach(
        trackAmbientAnimation,
      );
      return;
    }

    const baseOpacity = Number.parseFloat(getComputedStyle(target).opacity) || 0.16;
    const animation = target.animate(
      [
        { opacity: baseOpacity, filter: "brightness(1)" },
        { opacity: baseOpacity * 0.6, filter: "brightness(0.72)", offset: 0.14 },
        { opacity: baseOpacity, filter: "brightness(1)", offset: 0.28 },
        { opacity: baseOpacity * 0.66, filter: "brightness(0.78)", offset: 0.42 },
        { opacity: baseOpacity, filter: "brightness(1)", offset: 0.62 },
        { opacity: baseOpacity, filter: "brightness(1)" },
      ],
      options,
    );
    trackAmbientAnimation(animation);
  });
}

function stopAmbientEvents() {
  ambientTimeouts.forEach((timeout) => window.clearTimeout(timeout));
  ambientTimeouts.clear();
  ambientAnimations.forEach((animation) => animation.cancel());
  ambientAnimations.clear();
}

function startAmbientEvents() {
  stopAmbientEvents();
  if (motionReduced || document.hidden) return;
  scheduleAmbientEvent(animateHeadlightShift, 7000, 12000);
  scheduleAmbientEvent(animateNeonFlicker, 3500, 6000);
}

hero.addEventListener("pointermove", (event) => {
  if (motionReduced || !pointerFine) return;
  const heroRect = hero.getBoundingClientRect();
  const x = (event.clientX - heroRect.left) / heroRect.width - 0.5;
  const y = (event.clientY - heroRect.top) / heroRect.height - 0.5;
  targetX = x * -24;
  targetY = y * -16;
  queueParallax();
});

hero.addEventListener("pointerleave", () => {
  targetX = 0;
  targetY = 0;
  queueParallax();
});

projectButtons.forEach((button) => {
  button.addEventListener("click", () => openProject(button.dataset.project, button));
});

panelClose.addEventListener("click", () => closeProject());
mobileScrim.addEventListener("click", () => closeProject({ restoreFocus: false }));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && activeProject) closeProject();
});

window.addEventListener("resize", updateSceneLayout);
window.visualViewport?.addEventListener("resize", updateSceneLayout);

const heroResizeObserver = new ResizeObserver(updateSceneLayout);
heroResizeObserver.observe(hero);

const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
reducedMotionQuery.addEventListener("change", (event) => {
  motionReduced = event.matches;
  if (motionReduced) {
    document.documentElement.classList.remove("is-intro");
    targetX = 0;
    targetY = 0;
    currentX = 0;
    currentY = 0;
    applyLayerParallax(0, 0);
    stopAmbientEvents();
  } else {
    startAmbientEvents();
  }
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) stopAmbientEvents();
  else startAmbientEvents();
});

const pointerQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
pointerQuery.addEventListener("change", (event) => {
  pointerFine = event.matches;
});

updateSceneLayout();
attemptIntroChime();
startAmbientEvents();
window.setTimeout(
  () => document.documentElement.classList.remove("is-intro"),
  motionReduced ? 80 : INTRO_DURATION,
);
