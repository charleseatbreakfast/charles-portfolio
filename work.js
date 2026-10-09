const evaluationPanel = document.querySelector(".work-panel--evaluation");
const progressCursor = document.querySelector(".work-progress-cursor");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

function positionProgressCursor(event) {
  const cursorWidth = progressCursor.offsetWidth;
  const cursorHeight = progressCursor.offsetHeight;
  const offsetX = event.clientX + cursorWidth + 32 > window.innerWidth ? -(cursorWidth + 18) : 18;
  const offsetY = event.clientY + cursorHeight + 32 > window.innerHeight ? -(cursorHeight + 18) : 18;

  progressCursor.style.setProperty("--cursor-x", `${event.clientX}px`);
  progressCursor.style.setProperty("--cursor-y", `${event.clientY}px`);
  progressCursor.style.setProperty("--cursor-offset-x", `${offsetX}px`);
  progressCursor.style.setProperty("--cursor-offset-y", `${offsetY}px`);
}

function showProgressCursor(event) {
  if (!finePointer.matches) return;
  positionProgressCursor(event);
  progressCursor.classList.add("is-visible");
}

function hideProgressCursor() {
  progressCursor.classList.remove("is-visible");
}

evaluationPanel.addEventListener("pointerenter", showProgressCursor);
evaluationPanel.addEventListener("pointermove", positionProgressCursor);
evaluationPanel.addEventListener("pointerleave", hideProgressCursor);
window.addEventListener("blur", hideProgressCursor);
