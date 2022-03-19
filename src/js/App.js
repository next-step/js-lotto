import { CLASS } from './const/className.js';
import {
  $,
  onCurry,
  $Curry,
  rendererCurry,
  eventBinderCurry,
  replaceChild,
} from './dom/index.js';
import { buy } from './service/index.js';
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
  const $find = $Curry($clonedApp);

  const $moneyForm = $find(CLASS.MONEY_FORM);
  const $lottoDetailList = $find(CLASS.LOTTO_DETAIL_LIST);
  const $toggleNumbers = $find(CLASS.TOGGLE_NUMBERS);

  const renderer = rendererCurry(
    App,
    [$clonedApp, LottoDetailHeader],
    [$lottoDetailList, LottoDetailList]
  );

  const state = stateWrapper(initialState, renderer);

  const eventBinder = eventBinderCurry($clonedApp);
  eventBinder([$moneyForm, MoneyForm], [$toggleNumbers, LottoDetailHeader]);

  const on = onCurry($clonedApp);
  on('@buy', ({ detail }) => {
    state.lotto = buy(detail, state);
  });
  on('@toggle', ({ detail }) =>
    LottoDetailHeader.toggleStyle($lottoDetailList, detail)
  );

  return replaceChild($app, $clonedApp);
};

export default App;
