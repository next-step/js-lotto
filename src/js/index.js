import Controller from './Controller.js';
import { Lotto, Prize } from './models/index.js';
import {
  InputFormView,
  LottoResultView,
  LottoListView,
  WinningNumbersInputView,
  LottoModalView,
} from './views/index.js';

document.addEventListener('DOMContentLoaded', App);

function App() {
  const model = {
    lotto: new Lotto(),
    prize: new Prize(),
  };

  const views = {
    inputFormView: new InputFormView(),
    lottoResultView: new LottoResultView(),
    lottoListView: new LottoListView(),
    winningNumbersInputView: new WinningNumbersInputView(),
    lottoModalView: new LottoModalView(),
  };

  new Controller(model, views);
}
