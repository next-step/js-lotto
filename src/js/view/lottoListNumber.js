import { getSelector } from './../utils/index.js';
import App from '../app.js';

class LottoNumberRenderer extends App {
  constructor() {
    super();
    this.$lottoList = getSelector('#lotto-list');
    this.$lottoListUl = getSelector('#lotto-list ul');
    this.$lottoToggleBtn = getSelector('.lotto-numbers-toggle-button');
  }
  _init() {
    this.$lottoToggleBtn.addEventListener('click', this.toggleLottoNumbersView.bind(this));
  }
  toggleLottoNumbersView() {
    this.setState({ isShowLottoList: !this.state.isShowLottoList });
  }
  _render() {
    if (!this.state.isShowLottoList) {
      this.$lottoListUl.classList.remove('flex-col');
      this.$lottoList.classList.remove('lotto-detail-view');
      return;
    }

    this.$lottoList.classList.add('lotto-detail-view');
  }
}

export default LottoNumberRenderer;
