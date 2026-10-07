const emailButton = document.querySelector("[data-email-copy]");
const emailDetail = emailButton?.querySelector(".contact-link__detail");
const copyStatus = document.querySelector("#email-copy-status");
let copyResetTimer;

async function copyText(value) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return;
    } catch {
      // Fall through for browsers that expose Clipboard API without write permission.
    }
  }

  const textArea = document.createElement("textarea");
  textArea.value = value;
  textArea.setAttribute("readonly", "");
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.append(textArea);
  textArea.select();
  document.execCommand("copy");
  textArea.remove();
}

emailButton?.addEventListener("click", async () => {
  const email = emailButton.dataset.emailCopy;

  try {
    await copyText(email);
    emailButton.classList.add("is-copied");
    emailDetail.textContent = "Copied to clipboard";
    copyStatus.textContent = `${email} copied to clipboard.`;
    window.clearTimeout(copyResetTimer);
    copyResetTimer = window.setTimeout(() => {
      emailButton.classList.remove("is-copied");
      emailDetail.textContent = email;
    }, 1600);
  } catch {
    copyStatus.textContent = `Copy failed. Email ${email}.`;
  }
});
