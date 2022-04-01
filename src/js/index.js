import App from './app.js';
import LottoList from './view/lottoList.js';
import LottoListNumber from './view/lottoListNumber.js';
import LottoWinningForm from './view/lottoWinningForm.js';

class LottoApp extends App {
  _init() {
    new LottoList();
    new LottoListNumber();
    new LottoWinningForm();
  }
}

new LottoApp();
