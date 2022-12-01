export default class Header extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
  }

  connectedCallback() {
    this.init();
  }

  init() {
    this.template.innerHTML = `
		<link rel="stylesheet" href="./src/css/index.css" />
		<h1 class="text-center">🎱 행운의 로또</h1>`;

    this.shadow.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define('lotto-header', Header);
