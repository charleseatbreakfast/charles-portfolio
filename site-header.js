class CharlesSiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready === "true") return;

    const activePage = this.getAttribute("active") ?? "";
    const rootPath = this.getAttribute("root") ?? ".";
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
        <div class="header-signoff header-signoff--interactive">
          <span class="header-signoff__message">Design a more<br />human tomorrow</span>
          <button
            class="header-signoff__toggle"
            type="button"
            aria-label="Turn on the headline"
            aria-pressed="false"
          >
            <span class="sr-only">Toggle headline illumination</span>
            <span class="header-signoff__dial" aria-hidden="true"><b></b><b></b><b></b><b></b></span>
          </button>
        </div>
      </header>
    `;

    this.dataset.ready = "true";

    const signoff = this.querySelector(".header-signoff");
    const toggle = this.querySelector(".header-signoff__toggle");
    const storageKey = "charles-signoff-light";
    const readStoredState = () => {
      try {
        return window.localStorage.getItem(storageKey) === "on";
      } catch {
        return false;
      }
    };
    const applyState = (isOn, persist = false) => {
      toggle.setAttribute("aria-pressed", String(isOn));
      toggle.setAttribute("aria-label", isOn ? "Turn off the headline" : "Turn on the headline");
      signoff.classList.toggle("is-on", isOn);
      if (!persist) return;

      try {
        window.localStorage.setItem(storageKey, isOn ? "on" : "off");
      } catch {
        // The visual toggle still works if storage is unavailable.
      }
    };

    applyState(readStoredState());
    toggle.addEventListener("click", () => {
      applyState(toggle.getAttribute("aria-pressed") !== "true", true);
    });

    this.storageListener = (event) => {
      if (event.key === storageKey) applyState(event.newValue === "on");
    };
    window.addEventListener("storage", this.storageListener);
  }

  disconnectedCallback() {
    if (this.storageListener) window.removeEventListener("storage", this.storageListener);
  }
}

customElements.define("site-header", CharlesSiteHeader);
