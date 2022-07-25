import Controller from './Controller.js';
import LottoModel from './Model.js';
import InputFormView from './views/InputFormView.js';
import LottoResultView from './views/LottoResultView.js';
import LottoListView from './views/LottoListView.js';
import WinningNumbersInputView from './views/WinningNumbersInputView.js';
import LottoModalView from './views/LottoModalView.js';

document.addEventListener('DOMContentLoaded', App);

function App() {
  const model = new LottoModel();
  const views = {
    inputFormView: new InputFormView(),
    lottoResultView: new LottoResultView(),
    lottoListView: new LottoListView(),
    winningNumbersInputView: new WinningNumbersInputView(),
    LottoModalView: new LottoModalView(),
  };

  new Controller(model, views);
}
