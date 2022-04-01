import { getSelector } from '../utils/index.js';
import App from '../app.js';

class LottoListNumber extends App {
  _init() {
    getSelector('.lotto-numbers-toggle-button').addEventListener('click', this.toggleLottoNumbersView.bind(this));
  }
  toggleLottoNumbersView() {
    this.setState({ isShowLottoList: !this.state.isShowLottoList });
  }
  render() {
    const $lottoList = getSelector('#lotto-list');
    const $lottoListUl = getSelector('#lotto-list ul');
    if (!this.state.isShowLottoList) {
      $lottoListUl.classList.remove('flex-col');
      $lottoList.classList.remove('lotto-detail-view');
      return;
    }

    $lottoList.classList.add('lotto-detail-view');
  }
}

export default LottoListNumber;
