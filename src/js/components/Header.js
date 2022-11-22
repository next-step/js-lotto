export default class Header extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadow.innerHTML = `
			<link rel="stylesheet" href="./src/css/index.css" />
			<h1 class="text-center">🎱 행운의 로또</h1>`;
  }
}

customElements.define('lotto-header', Header);
