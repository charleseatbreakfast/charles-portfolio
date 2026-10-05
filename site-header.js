class CharlesSiteHeader extends HTMLElement {
  connectedCallback() {
    if (this.dataset.ready === "true") return;

    const activePage = this.getAttribute("active") ?? "";
    const rootPath = this.getAttribute("root") ?? ".";
    const fromRoot = (path) => `${rootPath}/${path}`;
    const navigation = [
      { id: "work", label: "Work", href: fromRoot("index.html#featured-projects") },
      { id: "about", label: "About", href: fromRoot("about.html") },
      { id: "journal", label: "Journal", href: fromRoot("index.html#journal") },
      { id: "contact", label: "Contact", href: fromRoot("index.html#contact") },
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
        <div class="header-signoff">
          <span>Design a more<br />human tomorrow</span>
          <i aria-hidden="true"><b></b><b></b><b></b><b></b></i>
        </div>
      </header>
    `;

    this.dataset.ready = "true";
  }
}

customElements.define("site-header", CharlesSiteHeader);
