// eslint-disable-next-line class-methods-use-this
import Component from '../core/Component.js';

export default class Header extends Component {
  template() {
    this.templateHTML = `
		<div class="d-flex justify-center mt-5">
			<div class="w-100" id="target">
				<h1 class="text-center">🎱 행운의 로또</h1>
			</div>
		</div>
		`;
  }

  render() {
    this.template();
    this.$target.innerHTML = this.templateHTML;
  }
}
