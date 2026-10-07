class CharlesSiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready === "true") return;

    const activePage = this.getAttribute("active") ?? "";
    const rootPath = this.getAttribute("root") ?? ".";
    const hasInteractiveSignoff = this.hasAttribute("interactive-signoff");
    const fromRoot = (path) => `${rootPath}/${path}`;
    const navigation = [
      { id: "work", label: "Work", href: fromRoot("work.html") },
      { id: "about", label: "About", href: fromRoot("about.html") },
      { id: "contact", label: "Contact", href: fromRoot("contact.html") },
    ];

    const links = navigation
      .map(({ id, label, href }) => {
        const isActive = id === activePage;
        return `<a${isActive ? ' class="is-current" aria-current="page"' : ""} href="${href}">${label}</a>`;
      })
      .join("");

    const signoffControl = hasInteractiveSignoff
      ? `
          <button
            class="header-signoff__toggle"
            type="button"
            aria-label="Turn on the headline"
            aria-pressed="false"
          >
            <span class="sr-only">Toggle headline illumination</span>
            <span class="header-signoff__dial" aria-hidden="true"><b></b><b></b><b></b><b></b></span>
          </button>
        `
      : `<i class="header-signoff__dial" aria-hidden="true"><b></b><b></b><b></b><b></b></i>`;

    this.innerHTML = `
      <div class="header-scrim" aria-hidden="true"></div>
      <header class="site-header">
        <a class="brand" href="${fromRoot("index.html")}" aria-label="Charles.Design — Home">
          <img
            src="${fromRoot("assets/brand/charles-design-logo.png")}"
            alt=""
            width="1904"
            height="129"
            decoding="async"
          />
        </a>
        <nav class="primary-nav" aria-label="Primary navigation">${links}</nav>
        <div class="header-signoff${hasInteractiveSignoff ? " header-signoff--interactive" : ""}">
          <span class="header-signoff__message">Design a more<br />human tomorrow</span>
          ${signoffControl}
        </div>
      </header>
    `;

    this.dataset.ready = "true";

    if (hasInteractiveSignoff) {
      const signoff = this.querySelector(".header-signoff");
      const toggle = this.querySelector(".header-signoff__toggle");

      toggle.addEventListener("click", () => {
        const isOn = toggle.getAttribute("aria-pressed") !== "true";
        toggle.setAttribute("aria-pressed", String(isOn));
        toggle.setAttribute("aria-label", isOn ? "Turn off the headline" : "Turn on the headline");
        signoff.classList.toggle("is-on", isOn);
      });
    }
  }
}

customElements.define("site-header", CharlesSiteHeader);
