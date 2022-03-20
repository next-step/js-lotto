import { CLASS } from './const/className.js';
import {
  $,
  onCurry,
  rendererCurry,
  eventBinder,
  replaceChild,
} from './dom/index.js';
import { buy } from './service/lotto.js';
import stateWrapper from './store/stateWrapper.js';

import MoneyForm from './views/MoneyForm.js';
import LottoDetailHeader from './views/LottoDetailHeader.js';
import LottoDetailList from './views/LottoDetailList.js';

const initialState = {
  lotto: {
    numbers: [],
    size: 0,
  },
};

const App = () => {
  const $app = $(CLASS.APP);
  const $clonedApp = $app.cloneNode(true);

  const moneyForm = MoneyForm($clonedApp);
  const lottoDetailHeader = LottoDetailHeader($clonedApp);
  const lottoDetailList = LottoDetailList($clonedApp);

  const state = stateWrapper(
    initialState,
    rendererCurry(App, [lottoDetailHeader, lottoDetailList])
  );

  eventBinder([moneyForm, lottoDetailHeader]);

  const on = onCurry($clonedApp);
  on('@buy', ({ detail }) => (state.lotto = buy(detail, state)));
  on('@toggle', ({ detail }) => lottoDetailHeader.toggleStyle(detail));

  replaceChild($app, $clonedApp);
};

export default App;
