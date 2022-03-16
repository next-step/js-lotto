import { $create } from './utils/dom.js';

class LottoApp {
  constructor($app) {
    this.$app = $app;

    this.render();
  }

  render() {
    const flexBox = $create('div');
    flexBox.className = 'd-flex justify-center mt-5';

    const fullWidthBox = $create('div');
    fullWidthBox.className = 'w-100';

    const title = $create('h1');
    title.className = 'text-center';
    title.textContent = '🎱 행운의 로또';

    fullWidthBox.appendChild(title);
    flexBox.appendChild(fullWidthBox);
    this.$app.appendChild(flexBox);
  }
}

export default LottoApp;
