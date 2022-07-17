import Controller from './Controller.js';
import LottoModel from './Model.js';
import InputFormView from './views/InputFormView.js';
import LottoResultView from './views/LottoResultView.js';
import LottoListView from './views/LottoListView.js';

document.addEventListener('DOMContentLoaded', App);

function App() {
  const model = new LottoModel();
  const views = {
    inputFormView: new InputFormView(),
    lottoResultView: new LottoResultView(),
    lottoListView: new LottoListView(),
  };

  new Controller(model, views);
}
